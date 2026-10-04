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
  const VOICE={
    turn:['assets/audio/huskar_spawn_01.mp3','assets/audio/huskar_kill_01.mp3','assets/audio/huskar_level_02.mp3'],
    spear:'assets/audio/huskar_brnspear.mp3',
    kill:['assets/audio/huskar_kill_01.mp3','assets/audio/huskar_kill_05.mp3','assets/audio/huskar_kill_07.mp3','assets/audio/huskar_kill_08.mp3'],
    item:'assets/audio/huskar_item_02.mp3'
  };
  const aPre=new Audio(),aImpact=new Audio(),aSpear=new Audio(),aLife=new Audio(),aVoice=new Audio();
  [aPre,aImpact,aSpear,aLife,aVoice].forEach(a=>{a.preload='auto';a.volume=.82});
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
  function playVoiceSrc(src,h,noNet=false){
    if(!src)return;
    playFile(aVoice,src,.88);
    if(!noNet&&h)window.emitNetVfx?.('huskar-voice',h,{voiceSrc:src});
  }
  function randomVoice(list){return list?.length?list[Math.floor(Math.random()*list.length)]:null}
  function playHuskarKillVoice(h,noNet=false){playVoiceSrc(randomVoice(VOICE.kill),h,noNet)}
  function playHuskarItemVoice(h,noNet=false){playVoiceSrc(VOICE.item,h,noNet)}

  AUDIO[ID]={...(AUDIO[ID]||{}),turn:VOICE.turn};

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

  function q25(v){return typeof quarterValue==='function'?quarterValue(v):Math.max(.25,Math.round((Math.max(0,Number(v)||0))*4)/4)}
  function missingHp(h){return q25(Math.max(0,(Number(h?.maxHp)||0)-(Number(h?.hp)||0)))}
  function missingWholeHp(h){return Math.max(0,Math.floor(missingHp(h)+1e-9))}
  function bloodMagicResist(h){return h?.id===ID?missingWholeHp(h)*.25:0}
  function bloodRepeat(h){return h?.id===ID?missingWholeHp(h)*30:0}

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
          const missing=missingWholeHp(h);
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
    if(ev.kind==='huskar-voice'){if(ev.voiceSrc)playVoiceSrc(ev.voiceSrc,hero,true);return}
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
    const dir=dx>=0?1:-1;
    const impactMs=1140,totalMs=1780;
    a.classList.add('huskar-life-break-dashing');
    b.classList.add('huskar-life-break-target');
    const oldZ=a.style.zIndex;a.style.zIndex='9999';

    const trail=document.createElement('div');
    trail.className='huskar-life-break-trail';
    trail.style.left=(ar.left+ar.width/2)+'px';
    trail.style.top=(ar.top+ar.height/2)+'px';
    trail.style.setProperty('--trail-x',dx+'px');
    trail.style.setProperty('--trail-y',dy+'px');
    document.body.appendChild(trail);

    let anim=null;
    try{
      anim=a.animate([
        {offset:0,transform:'translate(0,0) scale(1) rotate(0deg)',filter:'brightness(1)'},
        {offset:.10,transform:'translate('+(-dir*18)+'px,8px) scale(.96) rotate('+(-dir*3)+'deg)',filter:'brightness(1.05)'},
        {offset:.25,transform:'translate('+(-dir*10)+'px,-18px) scale(1.02) rotate('+(dir*4)+'deg)',filter:'brightness(1.15) drop-shadow(0 0 8px rgba(255,90,18,.7))'},
        {offset:.58,transform:'translate('+(dx*.56)+'px,'+(dy*.56-42)+'px) scale(1.07) rotate('+(dir*8)+'deg)',filter:'brightness(1.25) drop-shadow(0 0 18px rgba(255,70,10,.95))'},
        {offset:.64,transform:'translate('+(dx*.94)+'px,'+(dy*.94-7)+'px) scale(1.10) rotate('+(dir*3)+'deg)',filter:'brightness(1.5) drop-shadow(0 0 25px rgba(255,40,0,1))'},
        {offset:.69,transform:'translate('+(dx*.88)+'px,'+(dy*.88+5)+'px) scale(1.03) rotate('+(-dir*2)+'deg)',filter:'brightness(1.15)'},
        {offset:.84,transform:'translate('+(dx*.20)+'px,'+(dy*.20-10)+'px) scale(1.01) rotate(0deg)',filter:'brightness(1.05)'},
        {offset:1,transform:'translate(0,0) scale(1) rotate(0deg)',filter:'brightness(1)'}
      ],{duration:totalMs,easing:'cubic-bezier(.18,.72,.19,1)',fill:'none'});
    }catch(_){}

    setTimeout(()=>{
      b.classList.add('huskar-life-break-impact');
      const ring=document.createElement('div');ring.className='huskar-life-break-ring';
      ring.style.left=(br.left+br.width/2)+'px';ring.style.top=(br.top+br.height/2)+'px';
      document.body.appendChild(ring);setTimeout(()=>ring.remove(),520);
    },impactMs-30);
    setTimeout(()=>b.classList.remove('huskar-life-break-impact'),impactMs+230);
    setTimeout(()=>{
      try{anim?.cancel()}catch(_){}
      a.classList.remove('huskar-life-break-dashing');b.classList.remove('huskar-life-break-target');
      a.style.zIndex=oldZ;trail.remove();
    },totalMs+60);

    if(!noNet)window.emitNetVfx?.('huskar-life-break-dash',caster,{targetTeam:target.team,targetId:target.id});
    return impactMs;
  }

  const baseSkill=skill;
  skill=function(id){
    const h=G&&active?.();
    if(!h||h.id!==ID)return baseSkill(id);

    if(id==='burning_spear'){
      if(!G||G.resolving||G.winner!==null||targetMode)return;
      if(isHeroSilenced(h)){alert('Huskar обезмолвлен и не может переключить Burning Spear.');return}
      h.huskarBurningSpear=!h.huskarBurningSpear;
      if(Math.random()<.10)playVoiceSrc(VOICE.spear,h,false);
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
        const targetHp=q25(Math.max(0,Number(t.hp)||0));
        const selfHp=q25(Math.max(0,Number(h.hp)||0));
        playLifeBreakAudio(h,false);
        const impactDelay=animateLifeBreak(h,t,false)||320;
        putOnCooldown(h,'life_break');
        setTimeout(()=>{
          if(!G||h.dead||!t)return;
          spellDamage(t,q25(targetHp*.5),'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break: ',h,{impactDelay:0});
          if(!h.dead)spellDamage(h,q25(selfHp*.5),'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break (самоурон): ',null,{impactDelay:0});
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
        setTimeout(()=>{if(G){G.resolving=false;spend();render()}},1840);
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

  const basePerformFreeRepeatAttack=performFreeRepeatAttack;
  performFreeRepeatAttack=function(attacker,target){
    const spear=attacker?.id===ID&&!!attacker.huskarBurningSpear;
    const beforeDead=!!target?.dead;
    const ok=basePerformFreeRepeatAttack(attacker,target);
    if(spear&&ok&&!beforeDead&&target&&!target.dead)addSpearStack(target,attacker);
    return ok;
  };

  const baseDamage=damage;
  damage=function(target,n,src='',attacker=null,fx={}){
    const wasAlive=!!target&&!target.dead;
    const out=baseDamage(target,n,src,attacker,fx);
    if(wasAlive&&target?.dead&&attacker?.id===ID&&target.id!=='arcwarden_clone'&&target.id!=='phantomlancer_illusion')playHuskarKillVoice(attacker,false);
    return out;
  };

  const prevItemPurchased=window.onDotaItemPurchased;
  window.onDotaItemPurchased=function(hero,itemId){
    try{prevItemPurchased?.(hero,itemId)}catch(_){}
    if(hero?.id===ID&&itemId==='heart')playHuskarItemVoice(hero,false);
  };

  const baseOverlay=invokerOverlayEffects;
  invokerOverlayEffects=function(h){
    const out=baseOverlay(h);
    if(!h)return out;
    if(h.id===ID){
      const missing=missingWholeHp(h);
      out.push({icon:SKILLS.blood,tone:'good',count:missing?String(missing):'',label:"Berserker's Blood: "+(missing*.25)+" магрезиста • "+(missing*.25)+" HP/общ. ход • +"+(missing*30)+"% повторной атаки"});
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
    #game .hero.huskar-life-break-dashing{position:relative!important;z-index:9999!important;will-change:transform,filter;pointer-events:none}
    #game .hero.huskar-life-break-target{z-index:80!important}
    #game .hero.huskar-life-break-target.huskar-life-break-impact{animation:huskarTargetImpact .26s ease-out!important;filter:brightness(1.9) saturate(1.55) drop-shadow(0 0 20px rgba(255,55,8,.98))!important}
    .huskar-life-break-trail{position:fixed;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;pointer-events:none;z-index:9997;background:radial-gradient(circle,#fff6bc 0 8%,#ff9d1c 18%,rgba(255,47,0,.65) 42%,transparent 72%);box-shadow:0 0 18px #ffb126,0 0 44px #ff3e00;animation:huskarTrail 1.2s ease-in forwards}
    .huskar-life-break-ring{position:fixed;width:34px;height:34px;margin:-17px 0 0 -17px;border:5px solid #ffd36c;border-radius:50%;pointer-events:none;z-index:10000;box-shadow:0 0 20px #ffb01f,0 0 46px #ff4300;animation:huskarRing .48s ease-out forwards}
    @keyframes huskarTrail{0%{transform:translate(0,0) scale(.35);opacity:.2}25%{opacity:.85}95%{transform:translate(var(--trail-x),var(--trail-y)) scale(1.3);opacity:.55}100%{transform:translate(var(--trail-x),var(--trail-y)) scale(1.8);opacity:0}}
    @keyframes huskarRing{0%{transform:scale(.3);opacity:1}100%{transform:scale(4.2);opacity:0}}
    @keyframes huskarTargetImpact{0%{transform:translateX(0) scale(1)}30%{transform:translateX(9px) scale(.94)}62%{transform:translateX(-6px) scale(1.04)}100%{transform:translateX(0) scale(1)}}
  `;
  document.head.appendChild(style);

  try{draft()}catch(_){}
})();