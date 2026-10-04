(()=>{
  const ID='huskar';
  const DRAFT='assets/huskar/huskar_draft.png?v=1';
  const PORTRAIT='assets/portraits/huskar.webm?v=1';
  const ICON='assets/turn_huskar.png?v=1';
  const SKILLS={
    spear:'assets/skills/huskar_burning_spear.png?v=1',
    blood:'assets/skills/huskar_berserkers_blood.png?v=1',
    life:'assets/skills/huskar_life_break.png?v=1'
  };
  const SFX={
    pre:'assets/audio/huskar_preattack.mp3?v=1',
    impact:'assets/audio/huskar_impact.mp3?v=1',
    spear:'assets/audio/huskar_burning_spear.mp3?v=1',
    life:'assets/audio/huskar_life_break.mp3?v=1'
  };
  const aPre=new Audio(),aImpact=new Audio(),aSpear=new Audio(),aLife=new Audio();
  [aPre,aImpact,aSpear,aLife].forEach(a=>{a.preload='auto';a.volume=.82});
  function playFile(a,src,vol=.82){try{a.pause();a.currentTime=0;a.src=src;a.volume=vol;const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(_){}}
  function playNormalAttackAudio(h,noNet=false){
    playFile(aPre,SFX.pre,.78);
    setTimeout(()=>playFile(aImpact,SFX.impact,.84),Math.max(120,Math.min(360,typeof attackImpactMs==='function'?attackImpactMs(h):220)));
    if(!noNet)window.emitNetVfx?.('huskar-attack-audio',h,{spear:false});
  }
  function playSpearAttackAudio(h,noNet=false){
    playFile(aSpear,SFX.spear,.86);
    if(!noNet)window.emitNetVfx?.('huskar-attack-audio',h,{spear:true});
  }
  function playLifeBreakAudio(h,noNet=false){
    playFile(aLife,SFX.life,.9);
    if(!noNet)window.emitNetVfx?.('huskar-life-break',h);
  }

  DATA[ID]={
    name:'HUSKAR',hp:8,atk:1,img:DRAFT,staticPortrait:false,
    skills:[
      {id:'burning_spear',name:'Burning Spear — ПЕРЕКЛЮЧАЕМАЯ',cd:0,desc:'ПЕРЕКЛЮЧАЕМАЯ. Не тратит действие. Если Huskar нажимает обычную атаку с включённой способностью, он жертвует 0.25 HP и при попадании накладывает стак горения: 0.25 чистого урона каждый общий ход в течение 4 общих ходов. Стаки складываются и не развеиваются.'},
      {id:'berserkers_blood',name:"Berserker's Blood — ПАССИВНАЯ",cd:0,passive:true,desc:'ПАССИВНАЯ. За каждое недостающее HP Huskar получает +0.25 сопротивления магии, восстанавливает 0.25 HP каждый общий ход и получает +30% к шансу повторной тычки.'},
      {id:'life_break',name:'Life Break',cd:2,desc:'Huskar прыгает на выбранного врага. Цель теряет 50% текущего HP магическим уроном, Huskar также получает магический урон в размере 50% своего текущего HP. Цель получает −30% к повторению тычки на 3 общих хода. Этот дебафф снимается обычным и сильным развеиванием. Перезарядка: 2 хода героя.'}
    ]
  };
  HERO_ICONS[ID]=ICON;
  SKILL_ICONS[ID]=[SKILLS.spear,SKILLS.blood,SKILLS.life];
  if(!DRAFT_ORDER.includes(ID))DRAFT_ORDER.push(ID);

  const baseMkHero=mkHero;
  mkHero=function(id,team){
    const h=baseMkHero(id,team);
    if(id===ID){
      h.staticPortrait=false;
      h.portrait=PORTRAIT;
      h.img=DRAFT;
      h.huskarBurningSpear=false;
      h.huskarBurnStacks=[];
      h.huskarLifeBreakTurns=0;
      h.huskarLifeBreakAppliedTurn=0;
    }
    return h;
  };

  const baseBattlePortraitSrcFor=typeof battlePortraitSrcFor==='function'?battlePortraitSrcFor:null;
  if(baseBattlePortraitSrcFor)battlePortraitSrcFor=function(id){return id===ID?PORTRAIT:baseBattlePortraitSrcFor(id)};
  const baseDraftPortraitSrc=draftPortraitSrc;
  draftPortraitSrc=function(id){return id===ID?DRAFT:baseDraftPortraitSrc(id)};
  const baseDraftSlotPortraitSrc=draftSlotPortraitSrc;
  draftSlotPortraitSrc=function(id){return id===ID?DRAFT:baseDraftSlotPortraitSrc(id)};

  function missingHp(h){return Math.max(0,(Number(h?.maxHp)||0)-(Number(h?.hp)||0))}
  function bloodMagicResist(h){return h?.id===ID?missingHp(h)*.25:0}
  function bloodRepeat(h){return h?.id===ID?missingHp(h)*30:0}

  const baseMagicResistValue=magicResistValue;
  magicResistValue=function(h){return baseMagicResistValue(h)+bloodMagicResist(h)};

  const baseRepeatAttackPercent=repeatAttackPercent;
  repeatAttackPercent=function(h,target=null){
    let pct=baseRepeatAttackPercent(h,target)+bloodRepeat(h);
    if((h?.huskarLifeBreakTurns||0)>0)pct-=30;
    return Math.max(0,pct);
  };

  const baseDispelNegativeEffects=dispelNegativeEffects;
  dispelNegativeEffects=function(h,strength='normal'){
    const out=baseDispelNegativeEffects(h,strength);
    if(h&&(h.huskarLifeBreakTurns||0)>0){
      h.huskarLifeBreakTurns=0;
      h.huskarLifeBreakAppliedTurn=0;
      addLog('<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break: снижение повторной атаки с '+h.name+' развеяно.');
    }
    return out;
  };

  function addSpearStack(target,caster){
    if(!target||target.dead)return;
    target.huskarBurnStacks=Array.isArray(target.huskarBurnStacks)?target.huskarBurnStacks:[];
    target.huskarBurnStacks.push({turns:4,appliedTurn:G?.turnSerial||0,sourceTeam:caster.team,sourceId:caster.id});
    addLog('<img class="log-skill-icon" src="'+SKILLS.spear+'" alt=""> Burning Spear: '+target.name+' получает стак горения ('+target.huskarBurnStacks.length+').');
  }

  function tickHuskarEffects(){
    if(!G)return;
    const serial=G.turnSerial||0;
    for(const team of G.teams||[]){
      for(const h of team||[]){
        if(!h)continue;

        if(!h.dead&&h.id===ID){
          const missing=missingHp(h);
          const regen=missing*.25;
          if(regen>0)healHero(h,regen,"Berserker's Blood");
        }

        if(!h.dead&&Array.isArray(h.huskarBurnStacks)&&h.huskarBurnStacks.length){
          const next=[];
          for(const st of h.huskarBurnStacks){
            if(!st||st.turns<=0)continue;
            if(st.appliedTurn===serial){next.push(st);continue}
            const caster=(G.teams?.[st.sourceTeam]||[]).find(x=>x?.id===st.sourceId)||null;
            damage(h,.25,'<img class="log-skill-icon" src="'+SKILLS.spear+'" alt=""> Burning Spear: ',caster,{impactDelay:35,damageType:'pure'});
            st.turns=Math.max(0,(Number(st.turns)||0)-1);
            st.appliedTurn=serial;
            if(st.turns>0&&!h.dead)next.push(st);
            if(h.dead)break;
          }
          h.huskarBurnStacks=next;
        }

        if((h.huskarLifeBreakTurns||0)>0&&h.huskarLifeBreakAppliedTurn!==serial){
          h.huskarLifeBreakTurns=Math.max(0,(Number(h.huskarLifeBreakTurns)||0)-1);
          h.huskarLifeBreakAppliedTurn=serial;
        }
      }
    }
  }

  const baseBeginActivation=beginActivation;
  beginActivation=function(){
    const out=baseBeginActivation();
    if(G&&G.winner===null){
      tickHuskarEffects();
      render();
    }
    return out;
  };

  const basePlayAttackSound=playAttackSound;
  playAttackSound=function(hero,noNet=false){
    if(hero?.id!==ID)return basePlayAttackSound(hero,noNet);
    if(hero.huskarBurningSpear)playSpearAttackAudio(hero,noNet);
    else playNormalAttackAudio(hero,noNet);
  };
  window.playHuskarFx=function(ev){
    if(!ev)return;
    const hero=window.findHero?.(ev.team,ev.heroId)||null;
    if(ev.kind==='huskar-attack-audio'){if(hero){if(ev.spear)playSpearAttackAudio(hero,true);else playNormalAttackAudio(hero,true)}return}
    if(ev.kind==='huskar-life-break'){if(hero)playLifeBreakAudio(hero,true);return}
    if(ev.kind==='huskar-life-break-dash'){
      const target=window.findHero?.(ev.targetTeam,ev.targetId)||null;
      if(hero&&target)animateLifeBreak(hero,target,true);
    }
  };

  function heroNode(h){return h?document.getElementById('hero-'+h.team+'-'+h.id):null}
  function animateLifeBreak(caster,target,noNet=false){
    const a=heroNode(caster),b=heroNode(target);if(!a||!b)return 0;
    const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();
    const dx=(br.left+br.width/2)-(ar.left+ar.width/2),dy=(br.top+br.height/2)-(ar.top+ar.height/2);
    a.classList.add('huskar-life-break-dashing');
    b.classList.add('huskar-life-break-target');
    a.style.setProperty('--huskar-dx',dx+'px');
    a.style.setProperty('--huskar-dy',dy+'px');
    requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.add('huskar-life-break-hit')));
    setTimeout(()=>{b.classList.add('huskar-life-break-impact');},300);
    setTimeout(()=>{
      a.classList.remove('huskar-life-break-hit');
      b.classList.remove('huskar-life-break-impact');
    },430);
    setTimeout(()=>{
      a.classList.remove('huskar-life-break-dashing');
      b.classList.remove('huskar-life-break-target');
      a.style.removeProperty('--huskar-dx');a.style.removeProperty('--huskar-dy');
    },720);
    if(!noNet)window.emitNetVfx?.('huskar-life-break-dash',caster,{targetTeam:target.team,targetId:target.id});
    return 320;
  }

  const baseSkill=skill;
  skill=function(id){
    const h=G&&active?.();
    if(!h||h.id!==ID)return baseSkill(id);

    if(id==='burning_spear'){
      if(!G||G.resolving||G.winner!==null||targetMode)return;
      if(isHeroSilenced(h)){alert('Huskar обезмолвлен и не может переключить Burning Spear.');return}
      h.huskarBurningSpear=!h.huskarBurningSpear;
      addSkillLog(h,id,'Burning Spear '+(h.huskarBurningSpear?'включён.':'выключен.'));
      render();
      return;
    }

    if(id==='life_break'){
      if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return;
      if(isHeroSilenced(h)){alert('Huskar обезмолвлен и не может использовать Life Break.');return}
      if((h.cd?.life_break||0)>1)return;
      chooseEnemyAny('Выберите цель для Life Break',()=>true,t=>{
        if(!t||t.dead)return;
        G.resolving='huskar-life-break';
        const targetHp=Math.max(0,Number(t.hp)||0);
        const selfHp=Math.max(0,Number(h.hp)||0);
        playLifeBreakAudio(h,false);
        const impactDelay=animateLifeBreak(h,t,false)||320;
        putOnCooldown(h,'life_break');
        setTimeout(()=>{
          if(!G||h.dead||!t)return;
          spellDamage(t,targetHp*.5,'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break: ',h,{impactDelay:0});
          if(!h.dead)spellDamage(h,selfHp*.5,'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break (самоурон): ',null,{impactDelay:0});
          if(!t.dead&&canReceiveNegativeEffect(t)){
            const turns=reducedNegativeTurns(t,3);
            if(turns>0){
              t.huskarLifeBreakTurns=Math.max(Number(t.huskarLifeBreakTurns)||0,turns);
              t.huskarLifeBreakAppliedTurn=G?.turnSerial||0;
            }
          }
          addSkillLog(h,'life_break',h.name+' использует Life Break: 50% текущего HP цели и 50% своего текущего HP магическим уроном; цель получает −30% повторной атаки на 3 общих хода.');
          render();
        },impactDelay);
        setTimeout(()=>{if(G){G.resolving=false;spend();render()}},760);
      },'life_break');
      return;
    }

    return baseSkill(id);
  };

  const baseBasicAttack=basicAttack;
  basicAttack=function(){
    const a=G&&active?.();
    if(!a||a.id!==ID)return baseBasicAttack();
    if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;
    if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}
    if((a.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}

    const spearOn=!!a.huskarBurningSpear;
    chooseEnemy(spearOn?'Выберите врага для атаки с Burning Spear':'Выберите врага для обычной атаки',t=>canBasicAttackTarget(a,t),async t=>{
      G.attackUsed=true;
      G.resolving='multiattack';

      if(spearOn&&!a.dead){
        const before=Math.max(0,Number(a.hp)||0);
        a.hp=Math.max(.25,before-.25);
        addLog('<img class="log-skill-icon" src="'+SKILLS.spear+'" alt=""> '+a.name+' жертвует '+(before-a.hp)+' HP для Burning Spear.');
      }

      playAttackSound(a);
      if(attackMisses(a,t)){
        addLog('💨 '+a.name+' промахивается по '+t.name+'.');
        G.resolving=false;spend();return;
      }

      const hit=attackDamageInfo(a,t,physicalBaseDamage(a,t),{allowCrit:true});
      damage(t,hit.damage,attackSourceLabel(a,hit,spearOn?'🔥 Burning Spear':undefined),a,{impactDelay:attackImpactMs(a)});
      afterSuccessfulBasicHit(a,t,hit.damage);
      if(spearOn&&!t.dead)addSpearStack(t,a);

      const count=rollRepeatAttackCount(a,t);
      if(!t.dead&&count>0)await performFreeRepeatAttacks(a,t,count);
      G.resolving=false;
      spend();
    });
  };

  const baseOverlay=invokerOverlayEffects;
  invokerOverlayEffects=function(h){
    const out=baseOverlay(h);
    if(!h)return out;
    if(h.id===ID){
      const missing=missingHp(h);
      out.push({icon:SKILLS.blood,tone:'good',count:missing?String(Math.round(missing*100)/100):'',label:"Berserker's Blood: "+(missing*.25)+" магрезиста • "+(missing*.25)+" HP/общ. ход • +"+(missing*30)+"% повторной атаки"});
      if(h.huskarBurningSpear)out.push({icon:SKILLS.spear,tone:'good',count:'ON',label:'Burning Spear включён: следующая обычная атака стоит 0.25 HP и накладывает горение.'});
    }
    if(Array.isArray(h.huskarBurnStacks)&&h.huskarBurnStacks.length){
      out.push({icon:SKILLS.spear,tone:'bad',count:String(h.huskarBurnStacks.length),label:'Burning Spear: '+h.huskarBurnStacks.length+' стак(ов) по 0.25 чистого урона за общий ход.'});
    }
    if((h.huskarLifeBreakTurns||0)>0){
      out.push({icon:SKILLS.life,tone:'bad',count:String(h.huskarLifeBreakTurns),label:'Life Break: −30% к повторению тычки • '+h.huskarLifeBreakTurns+' общих ход.'});
    }
    return out;
  };

  const baseRender=render;
  render=function(){
    const out=baseRender();
    try{
      const h=G&&active?.();
      if(h?.id===ID){
        const acts=document.getElementById('actions');
        let buttons=[...document.querySelectorAll('#actions button.skill')];
        let btn=buttons.find(x=>x.textContent.includes('Burning Spear'));
        if(!btn&&acts){
          btn=document.createElement('button');
          btn.className='skill huskar-free-toggle';
          btn.innerHTML='<img class="skill-icon" src="'+SKILLS.spear+'"><span>Burning Spear</span>';
          btn.title=DATA[ID].skills[0].desc;
          btn.onclick=()=>skill('burning_spear');
          acts.prepend(btn);
          buttons=[...document.querySelectorAll('#actions button.skill')];
        }
        btn=btn||buttons.find(x=>x.textContent.includes('Burning Spear'));
        if(btn){
          btn.classList.toggle('selected',!!h.huskarBurningSpear);
          const span=btn.querySelector('span');
          if(span)span.textContent='Burning Spear '+(h.huskarBurningSpear?'[ВКЛ]':'[ВЫКЛ]');
          btn.disabled=isHeroSilenced(h);
        }
      }
    }catch(_){}
    return out;
  };

  const style=document.createElement('style');
  style.textContent=`
    #game .hero[data-hero="huskar"] .hero-portrait video{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}
    #actions button.skill.selected{box-shadow:0 0 0 2px #ff7a1a inset,0 0 14px rgba(255,100,20,.55);border-color:#ff9b45!important}
    #game .hero.huskar-life-break-dashing{position:relative!important;z-index:999!important;transition:transform .30s cubic-bezier(.18,.88,.28,1.18),filter .18s ease!important;will-change:transform;pointer-events:none}
    #game .hero.huskar-life-break-dashing.huskar-life-break-hit{transform:translate(var(--huskar-dx),var(--huskar-dy)) scale(1.06)!important;filter:drop-shadow(0 0 16px rgba(255,77,20,.95)) brightness(1.18)!important}
    #game .hero.huskar-life-break-dashing:not(.huskar-life-break-hit){transform:translate(0,0) scale(1)!important}
    #game .hero.huskar-life-break-target{z-index:80!important}
    #game .hero.huskar-life-break-target.huskar-life-break-impact{animation:huskarTargetImpact .22s ease-out!important;filter:brightness(1.8) saturate(1.45) drop-shadow(0 0 16px rgba(255,64,18,.95))!important}
    @keyframes huskarTargetImpact{0%{transform:translateX(0) scale(1)}35%{transform:translateX(7px) scale(.97)}70%{transform:translateX(-5px) scale(1.02)}100%{transform:translateX(0) scale(1)}}
  `;
  document.head.appendChild(style);

  try{draft()}catch(_){}
})();