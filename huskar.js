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
        const targetHp=Math.max(0,Number(t.hp)||0);
        const selfHp=Math.max(0,Number(h.hp)||0);
        spellDamage(t,targetHp*.5,'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break: ',h,{impactDelay:240});
        if(!h.dead)spellDamage(h,selfHp*.5,'<img class="log-skill-icon" src="'+SKILLS.life+'" alt=""> Life Break (самоурон): ',null,{impactDelay:240});
        if(!t.dead&&canReceiveNegativeEffect(t)){
          const turns=reducedNegativeTurns(t,3);
          if(turns>0){
            t.huskarLifeBreakTurns=Math.max(Number(t.huskarLifeBreakTurns)||0,turns);
            t.huskarLifeBreakAppliedTurn=G?.turnSerial||0;
          }
        }
        putOnCooldown(h,'life_break');
        addSkillLog(h,'life_break',h.name+' использует Life Break: 50% текущего HP цели и 50% своего текущего HP магическим уроном; цель получает −30% повторной атаки на 3 общих хода.');
        spend();
        render();
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
        const buttons=[...document.querySelectorAll('#actions button.skill')];
        const btn=buttons.find(x=>x.textContent.includes('Burning Spear'));
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
  `;
  document.head.appendChild(style);

  try{draft()}catch(_){}
})();