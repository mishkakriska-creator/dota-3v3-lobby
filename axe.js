(() => {
  const AXE_ID='axe';
  const AXE_VOICES={
    call:['assets/audio/axe_berserk_voice1.mp3','assets/audio/axe_berserk_voice2.mp3'],
    kill:['assets/audio/axe_kill_07.mp3','assets/audio/axe_kill_01.mp3'],
    deny:['assets/audio/axe_deny_15.mp3']
  };

  DATA[AXE_ID]={name:'AXE',hp:8,atk:1,img:'assets/axe.jpg',skills:[
    {id:'call',name:"Berserker's Call",cd:3,desc:'Axe получает +3 брони и на 3 общих хода вынуждает врагов при их активации бесплатно ударять его с руки, где бы он ни стоял. Такая вынужденная атака не тратит действие. Перезарядка: 3 хода Axe.'},
    {id:'helix',name:'Counter Helix — ПАССИВНАЯ',cd:0,passive:true,desc:'После каждого 2-го полученного удара с руки Axe мгновенно прокручивается и наносит 2 чистого урона тому, кто нанёс второй удар.'},
    {id:'culling',name:'Culling Blade',cd:4,desc:'Разрубает выбранного врага на 2 чистого урона. Убивает сквозь невосприимчивость к эффектам, уклонение и Borrowed Time Abaddon. За каждое убийство этим навыком Axe получает +2 брони до конца матча. Если цель не убита — перезарядка 4 хода Axe; если убита — перезарядки нет.'}
  ]};

  HERO_ICONS[AXE_ID]='assets/axe_icon.png';
  if(!DRAFT_ORDER.includes(AXE_ID))DRAFT_ORDER.push(AXE_ID);
  SKILL_ICONS[AXE_ID]=['assets/skills/axe_call.png','assets/skills/axe_helix.png','assets/skills/axe_culling.png'];
  AUDIO[AXE_ID]={
    turn:['assets/audio/axe_turn1.mp3','assets/audio/axe_turn2.mp3'],
    skills:{call:'assets/audio/axe_berserkers_call.mp3',helix:'assets/audio/axe_counter_helix.mp3',culling:'assets/audio/axe_culling_blade.mp3',culling_fail:'assets/audio/axe_culling_blade_fail.mp3'},
    voices:AXE_VOICES
  };
  ATTACK_AUDIO[AXE_ID]='assets/audio/axe_attack1.mp3';
  ATTACK_IMPACT_MS[AXE_ID]=230;

  try{
    if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(AXE_ID))HERO_IDS.push(AXE_ID);
    if(HERO_META&&!HERO_META[AXE_ID])HERO_META[AXE_ID]={name:'AXE',icon:'assets/axe_icon.png'};
  }catch(_){ }

  const style=document.createElement('style');
  style.textContent=`
    .hero.axe-called .hero-portrait{box-shadow:0 0 0 2px rgba(255,110,72,.88),0 0 26px rgba(255,74,36,.45),inset 0 0 26px rgba(255,76,43,.18)!important}
    .axe-call-aura{position:absolute;inset:-4px;border-radius:14px;pointer-events:none;opacity:0;transition:opacity .2s ease;z-index:18}
    .axe-call-aura::before{content:'';position:absolute;inset:0;border-radius:14px;border:2px solid rgba(255,128,92,.92);box-shadow:0 0 0 1px rgba(255,210,170,.28),0 0 20px rgba(255,95,56,.38),inset 0 0 24px rgba(255,74,34,.18);animation:axe-call-pulse 1.05s ease-in-out infinite}
    .axe-call-aura::after{content:'';position:absolute;inset:7px;border-radius:11px;background:conic-gradient(from 0deg,rgba(255,210,170,.02),rgba(255,96,48,.28),rgba(255,210,170,.02),rgba(255,96,48,.22),rgba(255,210,170,.02));filter:blur(1px);animation:axe-call-spin 2.2s linear infinite}
    .axe-call-aura img{position:absolute;right:7px;top:7px;width:26px;height:26px;border-radius:8px;background:rgba(20,10,10,.72);padding:2px;box-shadow:0 0 10px rgba(255,88,44,.34)}
    .hero.axe-called .axe-call-aura{opacity:1}
    @keyframes axe-call-pulse{0%,100%{transform:scale(1);opacity:.92}50%{transform:scale(1.018);opacity:1}}
    @keyframes axe-call-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

    .axe-call-fx,.axe-helix-fx,.axe-culling-fx{position:fixed;pointer-events:none;z-index:93}
    .axe-call-fx i{position:absolute;border-radius:50%}
    .axe-call-fx .ring{left:-54px;top:-54px;width:108px;height:108px;border:4px solid rgba(255,132,90,.9);box-shadow:0 0 20px rgba(255,86,44,.42),inset 0 0 12px rgba(255,196,160,.25);animation:axe-call-ring .72s ease-out forwards}
    .axe-call-fx .ring.r2{left:-72px;top:-72px;width:144px;height:144px;border-width:2px;opacity:.7;animation-duration:.9s}
    .axe-call-fx .burst{left:-18px;top:-18px;width:36px;height:36px;background:radial-gradient(circle,#fff1d0 0%,#ff9d6f 36%,rgba(255,72,34,.24) 70%,transparent 76%);box-shadow:0 0 24px rgba(255,102,54,.66);animation:axe-call-burst .78s ease-out forwards}
    .axe-call-fx .spike{position:absolute;left:-4px;top:-56px;width:8px;height:112px;border-radius:99px;background:linear-gradient(180deg,transparent,rgba(255,224,190,.95) 16%,rgba(255,118,56,.85) 38%,transparent 74%);transform:rotate(var(--ang));animation:axe-call-spike .75s ease-out forwards}
    @keyframes axe-call-ring{0%{opacity:0;transform:scale(.35)}20%{opacity:1}100%{opacity:0;transform:scale(1.24)}}
    @keyframes axe-call-burst{0%{opacity:0;transform:scale(.15)}24%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.3)}}
    @keyframes axe-call-spike{0%{opacity:0;transform:rotate(var(--ang)) scaleY(.35)}18%{opacity:1}100%{opacity:0;transform:rotate(var(--ang)) scaleY(1.1)}}

    .axe-helix-fx .halo{position:absolute;left:-72px;top:-72px;width:144px;height:144px;border-radius:50%;background:radial-gradient(circle,rgba(255,225,190,.08),rgba(255,109,52,.18) 45%,rgba(255,67,26,.05) 66%,transparent 72%);box-shadow:0 0 26px rgba(255,100,44,.28);animation:axe-helix-halo .52s ease-out forwards}
    .axe-helix-fx .blade{position:absolute;left:-88px;top:-13px;width:176px;height:26px;transform:rotate(var(--ang));transform-origin:center center;animation:axe-helix-swing .56s cubic-bezier(.2,.82,.2,1) forwards}
    .axe-helix-fx .blade::before{content:'';position:absolute;left:0;top:3px;width:176px;height:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,214,170,.05),rgba(255,245,225,.85) 18%,rgba(255,115,58,.92) 42%,rgba(255,44,16,.44) 72%,transparent 100%);filter:blur(.35px);box-shadow:0 0 16px rgba(255,118,48,.44)}
    .axe-helix-fx .blade::after{content:'';position:absolute;right:-2px;top:-2px;width:34px;height:30px;border-radius:50% 45% 55% 45%;background:radial-gradient(circle at 30% 50%,#fff6e6 0%,#ffd4ae 30%,#ff944e 58%,rgba(255,72,28,.42) 78%,transparent 82%);box-shadow:0 0 16px rgba(255,118,48,.45)}
    @keyframes axe-helix-halo{0%{opacity:0;transform:scale(.45)}18%{opacity:1}100%{opacity:0;transform:scale(1.12)}}
    @keyframes axe-helix-swing{0%{opacity:0;transform:rotate(var(--ang)) scale(.35)}18%{opacity:1}100%{opacity:0;transform:rotate(calc(var(--ang) + 170deg)) scale(1.05)}}

    .axe-culling-fx .slash{position:absolute;left:-94px;top:-10px;width:188px;height:20px;border-radius:999px;transform:rotate(var(--ang));transform-origin:center center;animation:axe-culling-slash .48s cubic-bezier(.18,.82,.24,1) forwards}
    .axe-culling-fx .slash::before{content:'';position:absolute;inset:0;border-radius:999px;background:linear-gradient(90deg,rgba(255,220,192,0),rgba(255,244,228,.9) 14%,rgba(255,125,60,.95) 46%,rgba(255,42,20,.85) 78%,transparent 100%);box-shadow:0 0 16px rgba(255,88,42,.55),0 0 30px rgba(255,48,28,.24)}
    .axe-culling-fx .impact{position:absolute;left:-58px;top:-58px;width:116px;height:116px;border-radius:50%;background:radial-gradient(circle,#fff4de 0%,#ffd3a8 14%,#ff8f50 34%,rgba(255,58,26,.62) 54%,transparent 72%);box-shadow:0 0 24px rgba(255,86,46,.58);animation:axe-culling-impact .62s ease-out forwards}
    .axe-culling-fx .ring{position:absolute;left:-74px;top:-18px;width:148px;height:36px;border-radius:50%;border:3px solid rgba(255,166,104,.78);box-shadow:0 0 14px rgba(255,87,42,.55);animation:axe-culling-ring .62s ease-out forwards}
    .axe-culling-fx.fail .impact{background:radial-gradient(circle,#fff3db 0%,#ffd4aa 14%,#ffc76a 36%,rgba(255,153,58,.42) 58%,transparent 74%);box-shadow:0 0 20px rgba(255,162,58,.48)}
    @keyframes axe-culling-slash{0%{opacity:0;transform:rotate(var(--ang)) scaleX(.1)}18%{opacity:1}72%{opacity:1;transform:rotate(var(--ang)) scaleX(1)}100%{opacity:0;transform:rotate(var(--ang)) translateX(18px) scaleX(1)}}
    @keyframes axe-culling-impact{0%{opacity:0;transform:scale(.22)}24%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}
    @keyframes axe-culling-ring{0%{opacity:0;transform:scale(.25)}30%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.85)}}
  `;
  document.head.appendChild(style);

  function playAxeKillVoice(){playRandomVoice(AXE_VOICES.kill)}
  function findBerserkerCallTarget(team){return (G?.teams?.[team]||[]).find(h=>h.id===AXE_ID&&!h.dead&&(h.axeCallTurns||0)>0&&!h.infested)||null}
  function isAxeCallActive(h){return !!h&&h.id===AXE_ID&&!h.dead&&(h.axeCallTurns||0)>0}
  function expireAxeCall(h){if(!h)return;let bonus=Number(h.axeCallArmor)||0;if(bonus){h.armor=(Number(h.armor)||0)-bonus;h.axeCallArmor=0}h.axeCallTurns=0;h.axeCallAppliedTurn=0;addLog(`🪓 Berserker's Call на ${h.name} заканчивается.`)}
  function redirectBasicAttackTarget(attacker,target,announce=true){
    const forced=findBerserkerCallTarget(1-attacker.team);
    if(!forced||forced===target||effectImmune(attacker))return target;
    if(announce)addLog(`🪓 Berserker's Call: атака ${attacker.name} перенаправляется на ${forced.name}.`);
    return forced;
  }
  function tickAxeCallDurations(){
    if(!G)return;
    for(const team of G.teams||[]){
      for(const hero of team||[]){
        if(!hero||hero.id!==AXE_ID||hero.dead||(hero.axeCallTurns||0)<=0)continue;
        if(hero.axeCallAppliedTurn===(G.turnSerial||0))continue;
        hero.axeCallTurns=Math.max(0,(hero.axeCallTurns||0)-1);
        if(hero.axeCallTurns<=0)expireAxeCall(hero);
      }
    }
  }
  function playAxeAttackCombo(){
    playFile(attackAudio,'assets/audio/axe_preattack1.mp3');
    setTimeout(()=>playFile(sfxAudio,'assets/audio/axe_attack1.mp3'),105);
  }
  function performForcedCallAttack(attacker,axe){
    if(!attacker||!axe||attacker.dead||axe.dead)return false;if(effectImmune(attacker)){addLog(`🩸 Rage: ${attacker.name} игнорирует Berserker's Call.`);return false}
    if((attacker.disarmTurns||0)>0){addLog(`🪓 Berserker's Call тянет ${attacker.name} к атаке, но он обезоружен.`);return false}
    if(attacker.sleep||attacker.nightmare){addLog(`🪓 ${attacker.name} под эффектом сна и не может выполнить вынужденную атаку по ${axe.name}.`);return false}
    addLog(`🪓 Berserker's Call: ${attacker.name} вынужденно атакует ${axe.name} с руки. Эта атака не тратит действие.`);
    playAttackSound(attacker);
    if(attackMisses(attacker,axe)){addLog(`💨 ${attacker.name} промахивается по ${axe.name}.`);return true}
    const hit=attackDamageInfo(attacker,axe,physicalBaseDamage(attacker,axe),{allowCrit:true});
    damage(axe,hit.damage,attackSourceLabel(attacker,hit),attacker,{impactDelay:attackImpactMs(attacker)});
    afterSuccessfulBasicHit(attacker,axe,hit.damage);
    const repeats=rollRepeatAttackCount(attacker);
    if(!axe.dead&&repeats>0){G.resolving='multiattack';performFreeRepeatAttacks(attacker,axe,repeats).finally(()=>{if(G){G.resolving=false;render()}})}
    return true;
  }
  function playAxeFx(ev){
    if(!ev||typeof addFxNode!=='function'||typeof heroCenter!=='function')return;
    const cleanup=(el,ms)=>setTimeout(()=>el?.remove(),ms);
    if(ev.kind==='axe-call'){
      const c=heroCenter(ev.team,ev.heroId); if(!c)return;
      const el=addFxNode('axe-call-fx',c.x,c.y,'<i class="ring"></i><i class="ring r2"></i><i class="burst"></i>'+
        Array.from({length:8},(_,i)=>`<i class="spike" style="--ang:${i*45}deg"></i>`).join(''));
      cleanup(el,920);return;
    }
    if(ev.kind==='axe-helix'){
      const c=heroCenter(ev.team,ev.heroId); if(!c)return;
      playFile(miscAudio,'assets/audio/axe_counter_helix.mp3');
      const el=addFxNode('axe-helix-fx',c.x,c.y,'<i class="halo"></i>'+
        Array.from({length:3},(_,i)=>`<i class="blade" style="--ang:${i*120}deg"></i>`).join(''));
      const card=document.getElementById(`hero-${ev.team}-${ev.heroId}`);
      card?.querySelector('.hero-portrait > video')?.animate([{rotate:'0deg'},{rotate:'360deg'}],{duration:520,easing:'cubic-bezier(.2,.82,.2,1)'});
      cleanup(el,650);return;
    }
    if(ev.kind==='axe-culling'){
      const from=heroCenter(ev.team,ev.heroId),to=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId); if(!from||!to)return;
      playFile(miscAudio,ev.fail?'assets/audio/axe_culling_blade_fail.mp3':'assets/audio/axe_culling_blade.mp3');
      const dx=to.x-from.x,dy=to.y-from.y,ang=Math.atan2(dy,dx)*180/Math.PI;
      const el=addFxNode('axe-culling-fx'+(ev.fail?' fail':''),to.x,to.y,'<i class="slash"></i><i class="impact"></i><i class="ring"></i>');
      el.style.setProperty('--ang',ang+'deg');
      const card=document.getElementById(`hero-${ev.team}-${ev.heroId}`);
      card?.animate([{transform:'translateX(0)'},{transform:`translate(${Math.cos(Math.atan2(dy,dx))*14}px,${Math.sin(Math.atan2(dy,dx))*6}px)`,offset:.5},{transform:'translateX(0)'}],{duration:420,easing:'ease-out'});
      cleanup(el,720);return;
    }
  }
  window.playAxeFx=playAxeFx;

  const oldMkHero=mkHero;
  mkHero=function(id,team){
    const h=oldMkHero(id,team);
    if(id===AXE_ID){
      h.axeCallTurns=0;
      h.axeCallAppliedTurn=0;
      h.axeCallArmor=0;
      h.axeHelixHits=0;
      h.axeCullKills=0;
      h._axeSuppressNextKillVoice=false;
    }
    return h;
  };

  const oldDraftPortraitSrc=draftPortraitSrc;
  draftPortraitSrc=function(id){return id===AXE_ID?'assets/axe.jpg':oldDraftPortraitSrc(id)};
  const oldDraftSlotPortraitSrc=draftSlotPortraitSrc;
  draftSlotPortraitSrc=function(id){return id===AXE_ID?'assets/axe.jpg':oldDraftSlotPortraitSrc(id)};

  const oldEnsureHeroNode=ensureHeroNode;
  ensureHeroNode=function(h){
    const d=oldEnsureHeroNode(h);
    if(h?.id===AXE_ID){
      const portrait=d.querySelector('.hero-portrait');
      if(portrait&&!portrait.querySelector('.axe-call-aura')){
        const aura=document.createElement('div');
        aura.className='axe-call-aura';
        aura.innerHTML='<img src="assets/skills/axe_call.png" alt="Berserker\'s Call">';
        portrait.appendChild(aura);
      }
    }
    return d;
  };

  const oldRenderTeam=renderTeam;
  renderTeam=function(t,sel){
    oldRenderTeam(t,sel);
    for(const hero of G?.teams?.[t]||[]){
      const node=document.getElementById(`hero-${t}-${hero.id}`);
      if(!node)continue;
      node.classList.toggle('axe-called',isAxeCallActive(hero));
      const aura=node.querySelector('.axe-call-aura');
      if(aura)aura.title=isAxeCallActive(hero)?`Berserker's Call: ${hero.axeCallTurns} общ. ход.`:'';
      if(hero.id===AXE_ID){let meter=node.querySelector('.axe-helix-meter');if(!meter){meter=document.createElement('span');meter.className='axe-helix-meter';node.querySelector('.hero-body').appendChild(meter)}meter.textContent=`Helix ${hero.axeHelixHits||0}/2`;meter.title='На второй полученной тычке — 2 чистого урона последнему атакующему.';}
    }
  };

  const oldRenderTurnQueue=renderTurnQueue;
  renderTurnQueue=function(){
    if(!G)return oldRenderTurnQueue();
    let q=$('#turnQueue');if(!q)return;
    const icons={phantomlancer:'assets/turn_phantomlancer.webp',techies:'assets/turn_techies.png',morphling:'assets/turn_morphling.png',silencer:'assets/turn_silencer.png',bane:'assets/turn_bane.png',shadowfiend:'assets/turn_shadowfiend.png',lifestealer:'assets/turn_lifestealer.png',io:'assets/turn_io.png',invoker:'assets/turn_invoker.png',arcwarden:'assets/arcwarden_queue_icon.png',arcwarden_clone:'assets/arcwarden_clone_icon.png',axe:'assets/axe_icon.png',broodmother:'assets/turn_broodmother_mini.png'};
    let seq=turnQueuePreview(7);
    setHTMLCached(q,`<div class="turn-queue-title">ОЧЕРЁДНОСТЬ</div><div class="turn-queue-row">${seq.map((x,i)=>`${i?'<span class="turn-arrow">›</span>':''}<div class="turn-token team-${x.team}${x.current?' now':''}${x.skipped?' skipped':''}" title="${x.name}${x.skipped?' — пропустит ход из-за оглушения/сна':''}"><img src="${icons[x.id]||HERO_ICONS[x.id]||DATA[x.id]?.img||icons.techies}" alt="${x.name}">${x.skipped?'<span class="skip-mark">🌀</span>':''}</div>`).join('')}</div>`);
  };

  const oldPlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h?.id!==AXE_ID)return oldPlayAttackSound(h,noNet);
    if(!h)return;
    if(!noNet)window.emitNetVfx?.('audio-attack',h);
    playAxeAttackCombo();
  };

  const oldPlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(h?.id!==AXE_ID)return oldPlaySkillSound(h,id,noNet);
    if(!h)return;
    if(id==='call'){
      if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:id});
      playFile(sfxAudio,'assets/audio/axe_berserkers_call.mp3');
      playRandomVoice(AXE_VOICES.call);
      return;
    }
    return oldPlaySkillSound(h,id,noNet);
  };

  const oldDamage=damage;
  damage=function(h,n,src='',attacker=null,fx={}){
    const wasDead=!!h?.dead;
    oldDamage(h,n,src,attacker,fx);
    if(attacker?.id===AXE_ID&&!wasDead&&h?.dead){
      if(attacker._axeSuppressNextKillVoice)attacker._axeSuppressNextKillVoice=false;
      else playAxeKillVoice();
    }
  };

  const oldAfterSuccessfulBasicHit=afterSuccessfulBasicHit;
  afterSuccessfulBasicHit=function(attacker,target,dealtDamage=0){
    // Resolve lifesteal from the landed hit before the defender retaliates.
    if(satanicActive(attacker)&&dealtDamage>0)healHero(attacker,dealtDamage,'Satanic');
    const hungerHealed=attacker?.id==='broodmother'&&(typeof broodHungerActive==='function'?broodHungerActive(attacker):((attacker.broodHungerTurns||0)>0&&!attacker.dead));
    if(hungerHealed&&dealtDamage>0)healHero(attacker,dealtDamage,'Insatiable Hunger');
    registerAxeBasicHit(attacker,target);
    oldAfterSuccessfulBasicHit(attacker,target,dealtDamage,{hungerHealed});
  };
  function registerAxeBasicHit(attacker,target,{illusion=false,spiderIndex=null}={}){
    if(!attacker||!target||target.id!==AXE_ID||target.dead)return;
    target.axeHelixHits=(target.axeHelixHits||0)+1;
    if(target.axeHelixHits<2)return;
    target.axeHelixHits=0;
    if(!attacker.dead){
      const spiderHit=attacker.id==='broodmother'&&Number.isInteger(spiderIndex)&&Array.isArray(attacker.broodlingHp)&&spiderIndex>=0&&spiderIndex<attacker.broodlingHp.length;
      const summonOwnerId=isForgeSpiritTarget(attacker)?attacker.ownerId:null;
      playAxeFx({kind:'axe-helix',team:target.team,heroId:target.id,targetTeam:attacker.team,targetId:attacker.id,summonOwnerId});
      window.emitNetVfx?.('axe-helix',target,{targetTeam:attacker.team,targetId:attacker.id,summonOwnerId});
      if(spiderHit){
        const before=Math.max(0,Number(attacker.broodlingHp[spiderIndex]??2));
        const after=Math.max(0,before-2);
        attacker.broodlingHp[spiderIndex]=after;
        if(after<=0){
          playSkillSound(attacker,'spiderDeath');
          attacker.broodlingHp.splice(spiderIndex,1);
          attacker.broodlingTimers.splice(spiderIndex,1);
          addLog(`${logIcon(AXE_ID,'helix')}<span>${target.name} прокручивается Counter Helix и убивает паучка ${attacker.name} за его отдельный удар.</span>`);
        }else addLog(`${logIcon(AXE_ID,'helix')}<span>${target.name} прокручивается Counter Helix и наносит паучку ${attacker.name} 2 чистого урона (${after}/2 HP).</span>`);
        render();
      }else{
        const wasActive=attacker===active();
        pureDamage(attacker,2,`${logIcon(AXE_ID,'helix')} ${target.name}: `,target,{impactDelay:220});
        if(wasActive&&attacker.dead)attacker._fellDuringAttack=true;
        addLog(`${logIcon(AXE_ID,'helix')}<span>${target.name} прокручивается Counter Helix и бьёт ${attacker.name}${illusion?' (ответ за удар его иллюзии)':''} на 2 чистого урона.</span>`);
      }
      return true;
    }
    return false;
  }
  window.registerAxeBasicHit=registerAxeBasicHit;
  window.redirectAxeAttack=redirectBasicAttackTarget;

  const oldBasicAttack=basicAttack;
  basicAttack=function(){
    if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;
    if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}
    let a=active();
    if((a.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}
    chooseEnemy('Выберите врага для обычной атаки',t=>canBasicAttackTarget(a,t),async t=>{
      t=redirectBasicAttackTarget(a,t,true);
      if(a.id==='phantomlancer'){performPhantomAttack(a,t);return}
      G.attackUsed=true;G.resolving='multiattack';playAttackSound(a);
      if(attackMisses(a,t)){addLog(`💨 ${a.name} промахивается по ${t.name}.`);G.resolving=false;spend();return}
      let hit=attackDamageInfo(a,t,physicalBaseDamage(a,t),{allowCrit:true});
      damage(t,hit.damage,attackSourceLabel(a,hit),a,{impactDelay:attackImpactMs(a)});
      afterSuccessfulBasicHit(a,t,hit.damage);
      let repeats=rollRepeatAttackCount(a);
      if(!t.dead&&repeats>0)await performFreeRepeatAttacks(a,t,repeats);
      G.resolving=false;spend();
    });
  };

  const oldPerformFreeRepeatAttack=performFreeRepeatAttack;
  performFreeRepeatAttack=function(attacker,target){
    return oldPerformFreeRepeatAttack(attacker,redirectBasicAttackTarget(attacker,target,true));
  };

  const oldSkill=skill;
  skill=function(id){
    const h=active?.();
    if(h?.id!==AXE_ID||!['call','helix','culling'].includes(id))return oldSkill(id);
    if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;
    if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}
    if((h.cd[id]||0)>1)return;

    if(id==='helix'){
      alert('Counter Helix — пассивная способность. Она срабатывает автоматически после каждого 2-го полученного удара с руки.');
      return;
    }
    if(id==='call'){
      if(h.axeCallArmor>0){h.armor=(Number(h.armor)||0)-Number(h.axeCallArmor||0);h.axeCallArmor=0}
      h.armor=(Number(h.armor)||0)+3;
      h.axeCallArmor=3;
      h.axeCallTurns=3;
      h.axeCallAppliedTurn=G.turnSerial||0;
      playSkillSound(h,'call');
      playAxeFx({kind:'axe-call',team:h.team,heroId:h.id});
      window.emitNetVfx?.('axe-call',h,{});
      putOnCooldown(h,'call');
      addSkillLog(h,'call',`${h.name} использует Berserker's Call: +3 брони и на 3 общих хода заставляет врагов при их активации бесплатно бить его с руки.`);
      spend();
      return;
    }
    if(id==='culling'){
      chooseEnemy('Выберите цель для Culling Blade',()=>true,t=>{
        const isSummon=isForgeSpiritTarget(t);
        const summonOwnerId=isForgeSpiritTarget(t)?t.ownerId:null;
        const cullDamage=2+spellBonus(t)+itemSpellBonus(h),willKill=(Number(t.hp)||0)<=cullDamage;
        playAxeFx({kind:'axe-culling',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId,fail:willKill?0:1});
        window.emitNetVfx?.('axe-culling',h,{targetTeam:t.team,targetId:t.id,summonOwnerId,fail:willKill?0:1});
        if(willKill)h._axeSuppressNextKillVoice=true;
        pureDamage(t,2,`${logIcon(AXE_ID,'culling')} ${h.name}: `,h,{impactDelay:380,ignoreBorrowedTime:true});
        if(!t.dead)h._axeSuppressNextKillVoice=false;
        if(t.dead){
          playAxeKillVoice();
          if(!isSummon){
            h.armor=(Number(h.armor)||0)+2;
            h.axeCullKills=(h.axeCullKills||0)+1;
            addSkillLog(h,'culling',`${h.name} добивает ${t.name} Culling Blade и навсегда получает +2 брони (всего бонусов: ${h.axeCullKills}).`);
          }else addSkillLog(h,'culling',`${h.name} разрубает ${t.name} Culling Blade. Перезарядки нет.`);
        }else{
          putOnCooldown(h,'culling');
          addSkillLog(h,'culling',`${h.name} наносит ${t.name} ${cullDamage} чистого урона Culling Blade, но не добивает его. Перезарядка: 4 хода Axe.`);
        }
        spend();
      });
      return;
    }
  };

  const oldBeginActivation=beginActivation;
  beginActivation=function(){
    oldBeginActivation();
    if(!G||G.winner!==null||G.resolving)return;
    const h=active?.();
    if(!h||h.dead||G.actions<=0)return;
    const enemyAxe=findBerserkerCallTarget(1-h.team);
    if(!enemyAxe)return;
    if((h.tornadoAirborne||0)>0||(h.stun||0)>0)return;
    if(h.sleep&&h.nightmare)return;
    performForcedCallAttack(h,enemyAxe);
    if(h.dead&&G.winner===null){delete h._fellDuringAttack;endTurn(true,h);return}
    render();
  };

  requestAnimationFrame(()=>{try{draft();updateDraft()}catch(_){}});

  const oldEndTurn=endTurn;
  endTurn=function(skipSwap=false,actorOverride=null){
    if(!G||G.resolving||G.winner!==null)return;
    tickAxeCallDurations();
    return oldEndTurn(skipSwap,actorOverride);
  };
})();
