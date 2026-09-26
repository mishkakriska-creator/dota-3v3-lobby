
(() => {
  const ARC_ID='arcwarden', ARC_CLONE_ID='arcwarden_clone';
  const ARC_SKILLS=[
    {id:'spark',name:'Spark Wraith',cd:1,desc:'Выберите переднего врага. Arc Warden сразу выпускает Spark Wraith: после короткой задержки цель получает 2 урона. Если способность использует Tempest Double, призрак сработает только в следующий ход этой команды, но нанесёт 3 урона. Перезарядка: 1 ход героя.'},
    {id:'field',name:'Magnetic Field',cd:2,desc:'Создаёт купол на передней позиции своей команды. Пока Magnetic Field активен, герой, стоящий впереди, получает 100% уклонения от обычных атак. Эффект держится 2 хода команды. Перезарядка: 2 хода героя.'},
    {id:'tempest',name:'Tempest Double',cd:3,desc:'Призывает Tempest Double позади Arc Warden. В следующий ход команды активируется именно двойник. У него собственные перезарядки способностей и предметов, те же предметы, текущие характеристики и отдельная карточка. Tempest Double живёт 4 хода команды. Перезарядка: 3 хода Arc Warden.'}
  ];
  DATA[ARC_ID]={name:'ARC WARDEN',hp:7,atk:1,img:'assets/arcwarden.jpg',skills:ARC_SKILLS};
  DATA[ARC_CLONE_ID]={name:'TEMPEST DOUBLE',hp:7,atk:1,img:'assets/arcwarden.jpg',skills:ARC_SKILLS};
  HERO_ICONS[ARC_ID]='assets/arcwarden_icon.png';
  HERO_ICONS[ARC_CLONE_ID]='assets/arcwarden_clone_icon.png';
  if(!DRAFT_ORDER.includes(ARC_ID))DRAFT_ORDER.push(ARC_ID);
  // game.js builds the draft immediately before this extension loads, so rebuild it now that Arc Warden is registered.
  if(typeof draft==='function')draft();
  SKILL_ICONS[ARC_ID]=['assets/skills/arcwarden_spark.png','assets/skills/arcwarden_field.png','assets/skills/arcwarden_tempest.png'];
  SKILL_ICONS[ARC_CLONE_ID]=SKILL_ICONS[ARC_ID];
  AUDIO[ARC_ID]={turn:['assets/audio/arcwarden_spawn_01.mp3','assets/audio/arcwarden_spawn_02.mp3','assets/audio/arcwarden_battlebegins_03.mp3'],skills:{spark:'assets/audio/arcwarden_spark_wraith.mp3',field:'assets/audio/arcwarden_magnetic_field.mp3',tempest:'assets/audio/arcwarden_tempest_double.mp3'}};
  AUDIO[ARC_CLONE_ID]=AUDIO[ARC_ID];
  ATTACK_AUDIO[ARC_ID]='assets/audio/arcwarden_attack_pre.mp3';
  ATTACK_AUDIO[ARC_CLONE_ID]='assets/audio/arcwarden_attack_pre.mp3';
  ATTACK_IMPACT_MS[ARC_ID]=260;
  ATTACK_IMPACT_MS[ARC_CLONE_ID]=260;

  const sparkCastAudio=new Audio();
  const sparkHitAudio=new Audio();
  const arcAttackPre=new Audio(), arcAttackLaunch=new Audio(), arcAttackHit=new Audio();
  const arcVoicePool=new Set();
  const ARC_VOICES={
    spark:['assets/audio/arcwarden_spark_voice_01.mp3','assets/audio/arcwarden_spark_voice_07.mp3'],
    field:['assets/audio/arcwarden_field_voice_01.mp3','assets/audio/arcwarden_field_voice_05.mp3'],
    tempest:['assets/audio/arcwarden_tempest_01.mp3','assets/audio/arcwarden_tempest_02.mp3'],
    kill:['assets/audio/arcwarden_laugh_02.mp3','assets/audio/arcwarden_kill_01.mp3','assets/audio/arcwarden_kill_11.mp3'],
    tempestEnd:['assets/audio/arcwarden_tempest_end_01.mp3'],
    tempestKilled:['assets/audio/arcwarden_tempest_killed_01.mp3']
  };
  [sparkCastAudio,sparkHitAudio,arcAttackPre,arcAttackLaunch,arcAttackHit].forEach(a=>{a.preload='auto'});
  sparkCastAudio.volume=.62; sparkHitAudio.volume=.70;
  arcAttackPre.volume=.48; arcAttackLaunch.volume=.55; arcAttackHit.volume=.55;

  const isArcHero=h=>!!h&&(h.id===ARC_ID||h.id===ARC_CLONE_ID);
  const isArcClone=h=>!!h&&h.id===ARC_CLONE_ID;
  const ensureArcState=()=>{
    if(!G)return;
    G.arcFieldTurns=Array.isArray(G.arcFieldTurns)?G.arcFieldTurns:[0,0];
    G.arcSparkQueue=Array.isArray(G.arcSparkQueue)?G.arcSparkQueue:[];
    G.arcSparkUid=Number.isFinite(G.arcSparkUid)?G.arcSparkUid:0;
  };
  const activeSparkFx=new Map();
  const sparkKey=id=>String(id||'');
  const arcCloneNode=team=>document.getElementById(`hero-${team}-${ARC_CLONE_ID}`);
  const removeArcCloneNode=team=>arcCloneNode(team)?.remove();

  function playAudio(a,src){try{playFile(a,src)}catch(e){}}
  function playArcSparkCast(){playAudio(sparkCastAudio,'assets/audio/arcwarden_spark_wraith.mp3')}
  function playArcSparkHit(){try{sparkCastAudio.pause();sparkCastAudio.currentTime=0}catch(e){} playAudio(sparkHitAudio,'assets/audio/arcwarden_spark_wraith_target.mp3')}
  function playArcAttackCombo(){playAudio(arcAttackPre,'assets/audio/arcwarden_attack_pre.mp3'); setTimeout(()=>playAudio(arcAttackLaunch,'assets/audio/arcwarden_attack_launch.mp3'),90); setTimeout(()=>playAudio(arcAttackHit,'assets/audio/arcwarden_attack_hit.mp3'),170)}
  function playArcVoice(list){if(!Array.isArray(list)||!list.length)return;const src=list[Math.floor(Math.random()*list.length)];const a=new Audio(src+'?v=148');a.volume=.72;a.preload='auto';arcVoicePool.add(a);const done=()=>arcVoicePool.delete(a);a.onended=done;a.onerror=done;a.play().catch(done)}

  const basePlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(isArcHero(h)){
      if(!noNet)window.emitNetVfx?.('audio-attack',h);
      playArcAttackCombo();
      return;
    }
    return basePlayAttackSound(h,noNet);
  };

  const basePlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(isArcHero(h)){
      if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:id});
      if(id==='spark'){playArcSparkCast();playArcVoice(ARC_VOICES.spark);return}
      if(id==='field'){playFile(sfxAudio,'assets/audio/arcwarden_magnetic_field.mp3');playArcVoice(ARC_VOICES.field);return}
      if(id==='tempest'){playFile(sfxAudio,'assets/audio/arcwarden_tempest_double.mp3');playArcVoice(ARC_VOICES.tempest);return}
    }
    return basePlaySkillSound(h,id,noNet);
  };

  function pickSparkTargetEntry(entry){
    if(!G)return null;
    if(entry.acquireOnTrigger){
      return active?.()||frontHero(entry.targetTeam)||living(entry.targetTeam)[0]||forgeSpiritTargets(entry.targetTeam)[0]||null;
    }
    if(entry.summonOwnerId){
      const owner=findHero(entry.targetTeam,entry.summonOwnerId);
      if(owner&&isForgeSpiritTarget(owner.forgeSpirit))return owner.forgeSpirit;
    }
    const direct=findHero(entry.targetTeam,entry.targetId);
    return direct||frontHero(entry.targetTeam)||living(entry.targetTeam)[0]||forgeSpiritTargets(entry.targetTeam)[0]||null;
  }
  function cleanupArcClone(team){
    if(!G)return;
    const arr=G.teams[team];
    for(let i=arr.length-1;i>=0;i--){
      const hero=arr[i];
      if(hero.id!==ARC_CLONE_ID)continue;
      const owner=findHero(team,hero.ownerId||ARC_ID);
      hero.tempestTurns=Math.max(0,Number(hero.tempestTurns||0)-1);
      if(hero.tempestTurns<=0||!owner||owner.dead){
        const expired=hero.tempestTurns<=0&&owner&&!owner.dead;
        const wasFront=G.front[team]===i;
        if(expired){playArcVoice(ARC_VOICES.tempestEnd);window.emitNetVfx?.('arc-clone-end',hero,{})}
        arr.splice(i,1);if(i<G.front[team])G.front[team]--;
        removeArcCloneNode(team);
        addLog(`🌩 Tempest Double ${team===G.team?'исчезает':'рассеивается'}.`);
        if(wasFront||G.front[team]>=arr.length)G.front[team]=Math.max(0,Math.min(G.front[team],arr.length-1));
      }
    }
  }
  function resolveQueuedSpark(team){
    if(!G)return;
    ensureArcState();
    const left=[];
    for(const entry of G.arcSparkQueue){
      if((entry.triggerTeam??entry.ownerTeam)!==team){left.push(entry);continue}
      if((entry.enemyActivationsToWait||0)>0){
        entry.enemyActivationsToWait--;
        left.push(entry);
        continue;
      }
      const ownerTeam=(entry.ownerTeam??(team===0?1:0));
      const caster=findHero(ownerTeam,entry.casterId)||findHero(ownerTeam,ARC_CLONE_ID)||findHero(ownerTeam,ARC_ID);
      const target=pickSparkTargetEntry(entry);
      if(!caster||!target||target.dead){
        window.playArcFx?.({kind:'arc-spark-clear',sparkId:entry.sparkId});
        window.emitNetVfx?.('arc-spark-clear',{team:team,id:entry.casterId,name:'ARC WARDEN'},{sparkId:entry.sparkId});
        continue;
      }
      const summonOwnerId=isForgeSpiritTarget(target)?target.ownerId:null;
      window.playArcFx?.({kind:'arc-spark-fire',team:caster.team,heroId:caster.id,targetTeam:target.team,targetId:target.id,summonOwnerId,delay:120,travelMs:340,sparkId:entry.sparkId,at:Date.now(),fromClone:true});
      window.emitNetVfx?.('arc-spark-fire',caster,{targetTeam:target.team,targetId:target.id,summonOwnerId,delay:120,travelMs:340,sparkId:entry.sparkId,fromClone:true});
      (window.enigmaGroupedSpellDamage||spellDamage)(target,entry.damage||3,`${logIcon(ARC_ID,'spark')} ${caster.name}: `,caster,{impactDelay:460});
      addLog(`${logIcon(ARC_ID,'spark')}<span>Spark Wraith срывается с места, находит ${target.name} и наносит ${entry.damage||3} урона.</span>`);
    }
    G.arcSparkQueue=left;
  }
  function protectedByField(target){
    ensureArcState();
    if(!target||!G||target.dead)return false;
    return !isForgeSpiritTarget(target) && G.arcFieldTurns?.[target.team]>0 && frontHero(target.team)===target;
  }

  const baseAttackMisses=attackMisses;
  attackMisses=function(attacker,target){
    if(protectedByField(target)){
      const pierce=typeof evasionPierceChance==='function'?evasionPierceChance(attacker,target):0;
      if(pierce>0&&Math.random()<pierce){addLog(`🎯 ${attacker.name} пробивает Magnetic Field${attacker.items?.includes('mkb')?' благодаря Monkey King Bar':' благодаря Bloodthorn'}.`);return false}
      addLog(`🛡 ${target.name} уклоняется от атаки благодаря Magnetic Field.`);
      return true;
    }
    return baseAttackMisses(attacker,target);
  };

  const baseDamage=damage;
  damage=function(h,n,src='',attacker=null,fx={}){
    const wasDead=!!h?.dead;
    const out=baseDamage(h,n,src,attacker,fx);
    if(G&&!wasDead&&h?.dead&&h.id===ARC_CLONE_ID){
      playArcVoice(ARC_VOICES.tempestKilled);window.emitNetVfx?.('arc-clone-killed',h,{});
      const arr=G.teams[h.team],idx=arr.indexOf(h),wasFront=G.front[h.team]===idx;
      if(idx>=0)arr.splice(idx,1);
      removeArcCloneNode(h.team);
      if(idx>=0&&idx<G.front[h.team])G.front[h.team]--;if(wasFront||G.front[h.team]>=arr.length)G.front[h.team]=Math.max(0,Math.min(G.front[h.team],arr.length-1));
      checkWin();if(G.winner===null)render();
    }
    if(G&&!wasDead&&h?.dead&&h.id!==ARC_CLONE_ID&&!isForgeSpiritTarget(h)&&isArcHero(attacker)){
      playArcVoice(ARC_VOICES.kill);window.emitNetVfx?.('arc-kill-voice',attacker,{});
    }
    if(G&&h&&h.id===ARC_ID&&h.dead){
      const arr=G.teams[h.team];
      const idx=arr.findIndex(x=>x.id===ARC_CLONE_ID);
      if(idx>=0){arr.splice(idx,1);if(idx<G.front[h.team])G.front[h.team]--;G.front[h.team]=Math.max(0,Math.min(G.front[h.team],arr.length-1));removeArcCloneNode(h.team);checkWin();if(G.winner===null)render();}
    }
    return out;
  };

  const baseBeginActivation=beginActivation;
  beginActivation=function(){
    if(!G)return baseBeginActivation();
    ensureArcState();
    if((G.arcFieldTurns[G.team]||0)>0){G.arcFieldTurns[G.team]--; if(G.arcFieldTurns[G.team]===0)addLog(`🛡 Magnetic Field команды ${G.team+1} рассеивается.`)}
    cleanupArcClone(G.team);
    resolveQueuedSpark(G.team);
    checkWin();
    if(G.winner!==null){render();return;}
    return baseBeginActivation();
  };

  function createTempestDouble(owner){
    const clone=mkHero(ARC_CLONE_ID,owner.team);
    clone.name='TEMPEST DOUBLE';
    clone.ownerId=owner.id;
    clone.tempestTurns=5;
    clone.maxHp=owner.maxHp;
    clone.hp=Math.max(1,Math.min(owner.maxHp,owner.hp));
    clone.atk=owner.atk;
    clone.baseAtk=owner.baseAtk;
    clone.armor=owner.armor;
    clone.morphShiftArmor=owner.morphShiftArmor||0;
    clone.items=[...(owner.items||[])];
    clone.itemHpBonus=owner.itemHpBonus||0;
    clone.itemCd={};
    clone.cd={};
    clone.portrait='assets/portraits/arcwarden.webm';
    clone.img='assets/arcwarden.jpg';
    clone.staticPortrait=false;
    return clone;
  }

  const baseSkill=skill;
  skill=function(id){
    if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return baseSkill(id);
    const h=active();
    if(!isArcHero(h))return baseSkill(id);
    if(!DATA[h.id].skills.some(s=>s.id===id&&!s.passive))return;
    if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}
    if((h.cd[id]||0)>1)return;
    if(id==='spark'){
      chooseEnemy('Выберите переднего врага для Spark Wraith',()=>true,t=>{
        playSkillSound(h,'spark');
        putOnCooldown(h,'spark');
        ensureArcState();
        const summonOwnerId=isForgeSpiritTarget(t)?t.ownerId:null;
        const sparkId=`spark_${++G.arcSparkUid}_${h.team}_${Date.now()}`;
        if(isArcClone(h)){
          G.arcSparkQueue.push({ownerTeam:h.team,triggerTeam:1-h.team,casterId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId,damage:3,sparkId,acquireOnTrigger:true,enemyActivationsToWait:1});
          window.playArcFx?.({kind:'arc-spark-plant',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId,sparkId,waiting:true,at:Date.now()});
          window.emitNetVfx?.('arc-spark-plant',h,{targetTeam:t.team,targetId:t.id,summonOwnerId,sparkId,waiting:true});
          addSkillLog(h,'spark',`${h.name} оставляет Spark Wraith: первый ближайший ход противника призрак просто ждёт. После ротации линии, когда ход снова вернётся противнику, он атакует нового переднего героя и наносит 3 урона.`);
          spend();
          return;
        }
        window.playArcFx?.({kind:'arc-spark-fire',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId,delay:60,travelMs:310,sparkId,at:Date.now(),instant:true});
        window.emitNetVfx?.('arc-spark-fire',h,{targetTeam:t.team,targetId:t.id,summonOwnerId,delay:60,travelMs:310,sparkId,instant:true});
        spellDamage(t,2,`${logIcon(ARC_ID,'spark')} ${h.name}: `,h,{impactDelay:370});
        addSkillLog(h,'spark',`${h.name} создаёт Spark Wraith рядом с ${t.name} — призрак сразу бросается в атаку.`);
        spend();
      },'spark');
      return;
    }
    if(id==='field'){
      ensureArcState();
      playSkillSound(h,'field');
      G.arcFieldTurns[h.team]=2;
      window.playArcFx?.({kind:'arc-field-cast',team:h.team,heroId:h.id});
      window.emitNetVfx?.('arc-field-cast',h,{});
      putOnCooldown(h,'field');
      addSkillLog(h,'field',`${h.name} создаёт Magnetic Field на передней позиции своей команды на 2 хода команды.`);
      spend();
      return;
    }
    if(id==='tempest'){
      if(isArcClone(h)){alert('Tempest Double не может призвать ещё одного двойника.');return}
      let arr=G.teams[h.team];
      if(arr.some(x=>x.id===ARC_CLONE_ID&&!x.dead)){alert('Tempest Double уже активен.');return}
      playSkillSound(h,'tempest');
      const idx=arr.indexOf(h), clone=createTempestDouble(h);
      arr.splice(idx+1,0,clone);
      putOnCooldown(h,'tempest');
      window.playArcFx?.({kind:'arc-double',team:h.team,heroId:h.id});
      window.emitNetVfx?.('arc-double',h,{});
      addSkillLog(h,'tempest',`${h.name} создаёт Tempest Double. В следующий ход команды активируется двойник.`);
      spend();
      return;
    }
    return baseSkill(id);
  };

  const baseRender=render;
  render=function(){
    baseRender();
    if(!G)return;
    ensureArcState();
    for(const team of [0,1]){
      const teamBox=document.getElementById(`team${team}`);
      if(teamBox)teamBox.classList.toggle('has-four', (G.teams?.[team]?.length||0)>=4);
      const front=frontHero(team);
      G.teams[team].forEach(hero=>{
        const card=document.getElementById(`hero-${team}-${hero.id}`); if(!card)return;
        card.classList.toggle('arc-tempest-card',hero.id===ARC_CLONE_ID);
        let cloneMark=card.querySelector('.arc-clone-marker');
        if(hero.id===ARC_CLONE_ID){
          if(!cloneMark){cloneMark=document.createElement('img');cloneMark.className='arc-clone-marker';cloneMark.src='assets/arcwarden_clone_icon.png';cloneMark.alt='Tempest Double';card.querySelector('.hero-portrait')?.appendChild(cloneMark)}
        }else cloneMark?.remove();
        const status=card.querySelector('.status');
        if(hero.id===ARC_CLONE_ID && status)status.innerHTML += statusBadge(`Двойник: ${Math.max(0,(hero.tempestTurns||1)-1)} ход.`, 'good arc-tempest-badge', skillIcon(ARC_ID,'tempest'));
        if(front===hero && (G.arcFieldTurns[team]||0)>0){
          card.classList.add('arc-protected');
          if(status)status.innerHTML += statusBadge(`Magnetic Field: ${G.arcFieldTurns[team]} ход.`, 'good arc-field-badge', skillIcon(ARC_ID,'field'));
        } else card.classList.remove('arc-protected');
      });
    }
  };

  renderTurnQueue=function(){
    let q=$('#turnQueue');if(!q||!G)return;
    const icons={phantomlancer:'assets/turn_phantomlancer.webp',techies:'assets/turn_techies.png',morphling:'assets/turn_morphling.png',silencer:'assets/turn_silencer.png',bane:'assets/turn_bane.png',shadowfiend:'assets/turn_shadowfiend.png',lifestealer:'assets/turn_lifestealer.png',io:'assets/turn_io.png',invoker:'assets/turn_invoker.png',arcwarden:'assets/arcwarden_queue_icon.png',arcwarden_clone:'assets/arcwarden_clone_icon.png'};
    const cloneActive=(G.teams||[]).some(arr=>arr.some(h=>h.id===ARC_CLONE_ID&&!h.dead));
    let seq=turnQueuePreview(cloneActive?8:7);
    q.innerHTML=`<div class="turn-queue-title">ОЧЕРЁДНОСТЬ</div><div class="turn-queue-row">${seq.map((x,i)=>`${i?'<span class="turn-arrow">›</span>':''}<div class="turn-token team-${x.team}${x.current?' now':''}${x.skipped?' skipped':''}" title="${x.name}${x.skipped?' — пропустит ход из-за оглушения/сна':''}"><img src="${icons[x.id]||HERO_ICONS[x.id]||''}" alt="${x.name}">${x.skipped?'<span class="skip-mark">🌀</span>':''}</div>`).join('')}</div>`;
  };

  window.playArcFx=function(ev){
    if(ev.kind==='arc-kill-voice'){playArcVoice(ARC_VOICES.kill);return}
    if(ev.kind==='arc-clone-end'){playArcVoice(ARC_VOICES.tempestEnd);return}
    if(ev.kind==='arc-clone-killed'){playArcVoice(ARC_VOICES.tempestKilled);return}
    const layer=combatLayer();
    const cleanup=(el,ms=1200)=>setTimeout(()=>{if(el?.isConnected)el.remove()},ms);
    const stamp=(cls,x,y,ms=1000)=>{const el=document.createElement('div');el.className=cls;el.style.left=x+'px';el.style.top=y+'px';layer.appendChild(el);cleanup(el,ms);return el};
    const removeSpark=(sparkId)=>{
      const key=sparkKey(sparkId);
      const old=activeSparkFx.get(key);
      if(old){old.remove();activeSparkFx.delete(key);}
    };
    const spawnSpark=(sparkId,target,waiting=false)=>{
      removeSpark(sparkId);
      const el=document.createElement('div');
      el.className='arc-spark-wraith'+(waiting?' waiting':'');
      el.style.left=(target.x-54)+'px';
      el.style.top=(target.y-42)+'px';
      if(sparkId)el.dataset.sparkId=sparkId;
      layer.appendChild(el);
      if(sparkId)activeSparkFx.set(sparkKey(sparkId),el);
      return el;
    };
    const releaseSpark=(target,sparkId,instant=false,travelMs=310)=>{
      let el=sparkId?activeSparkFx.get(sparkKey(sparkId)):null;
      let prep=110;
      let hadWaiting=false;
      if(!el){
        el=spawnSpark(sparkId,target,false);
        el.classList.add('instant');
        prep=instant?55:95;
      }else if(el.classList.contains('waiting')){
        hadWaiting=true;
        prep=165;
      }
      el.classList.remove('waiting');
      if(hadWaiting)el.classList.add('arming');
      const startX=parseFloat(el.style.left)||target.x-54;
      const startY=parseFloat(el.style.top)||target.y-42;
      const dx=(target.x-startX);
      const dy=(target.y-startY);
      const launch=()=>{
        el.classList.remove('arming');
        el.style.setProperty('--dx', `${dx}px`);
        el.style.setProperty('--dy', `${dy}px`);
        el.style.setProperty('--spark-travel', `${travelMs}ms`);
        el.classList.add('attack');
        setTimeout(()=>{stamp('arc-spark-fx',target.x,target.y,920);playArcSparkHit();}, travelMs);
        setTimeout(()=>{if(el.isConnected)el.remove(); if(sparkId)activeSparkFx.delete(sparkKey(sparkId));}, travelMs+260);
      };
      if(prep>0)setTimeout(launch,prep); else launch();
    };
    if(ev.kind==='arc-field-cast'){
      const front=frontHero(ev.team);
      const c=heroCenter(ev.team,front?.id||ev.heroId); if(!c)return; stamp('arc-field-cast-fx',c.x,c.y,1100); return;
    }
    if(ev.kind==='arc-double'){
      const c=heroCenter(ev.team,ev.heroId); if(!c)return; stamp('arc-double-fx',c.x,c.y,1100); return;
    }
    if(ev.kind==='arc-spark-clear'){ removeSpark(ev.sparkId); return; }
    if(ev.kind==='arc-spark-plant'){
      const target=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId); if(!target)return;
      spawnSpark(ev.sparkId,target,true);
      return;
    }
    if(ev.kind!=='arc-spark-fire')return;
    const target=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId); if(!target)return;
    const requested=Math.max(0,Number(ev.delay)||0),elapsed=ev.at?Math.max(0,Date.now()-Number(ev.at||0)):0,delay=Math.max(0,requested-elapsed);
    const run=()=>releaseSpark(target,ev.sparkId,!!ev.instant,Math.max(180,Number(ev.travelMs)||310));
    if(delay>5)setTimeout(run,delay); else run();
  };

})();
