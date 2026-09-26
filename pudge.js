(() => {
  const PUDGE_ID='pudge';

  DATA[PUDGE_ID]={name:'PUDGE',hp:10,atk:2,img:'assets/pudge.jpg',skills:[
    {id:'hook',name:'Meat Hook',cd:3,desc:'Притягивает выбранного героя из вражеской линии на переднюю позицию его линии и наносит 2 чистого урона. Проходит сквозь невосприимчивость к эффектам. Перезарядка: 3 хода Pudge.'},
    {id:'rot',name:'Rot',cd:0,desc:'Переключаемая способность. Вокруг Pudge появляется ядовитое облако. В начале каждого общего хода оно наносит 2 магического урона врагу, стоящему прямо напротив Pudge по глубине линии. Если урон проходит, Pudge тоже получает 2 магического урона. Переключение не тратит действие и не имеет перезарядки.'},
    {id:'dismember',name:'Dismember',cd:3,desc:'Разрубает выбранного врага: наносит 1 магического урона + 0.5 за каждые 3 единицы общего здоровья Pudge, лечит Pudge на 1 за каждые полные 6 единиц его общего здоровья и оглушает цель на 1 её активацию. Оглушение проходит сквозь невосприимчивость к эффектам и снимается только сильным развеиванием. Перезарядка: 3 хода Pudge.'}
  ]};

  HERO_ICONS[PUDGE_ID]='assets/pudge_icon.png';
  if(!DRAFT_ORDER.includes(PUDGE_ID)){
    const after=Math.max(0,DRAFT_ORDER.indexOf('lifestealer')+1);
    DRAFT_ORDER.splice(after,0,PUDGE_ID);
  }
  SKILL_ICONS[PUDGE_ID]=['assets/skills/pudge_dismember.png','assets/skills/pudge_rot.png','assets/skills/pudge_hook.png'];
  AUDIO[PUDGE_ID]={turn:['assets/audio/pudge_spawn_01.mp3','assets/audio/pudge_spawn_06.mp3'],skills:{hook:'assets/audio/pudge_meat_hook.mp3',rot:'assets/audio/pudge_rot_loop.mp3',dismember:'assets/audio/pudge_dismember.mp3'}};
  ATTACK_AUDIO[PUDGE_ID]='assets/audio/pudge_attack_combo.mp3';
  ATTACK_IMPACT_MS[PUDGE_ID]=150;


  const PUDGE_AUDIO={
    battle:'assets/audio/pudge_battlebegins_01.mp3',
    spawn:['assets/audio/pudge_spawn_01.mp3','assets/audio/pudge_spawn_06.mp3'],
    skills:{hook:'assets/audio/pudge_meat_hook.mp3',dismember:'assets/audio/pudge_dismember.mp3'},
    voices:{
      hook:['assets/audio/pudge_voice_hook_01.mp3','assets/audio/pudge_voice_hook_02.mp3','assets/audio/pudge_voice_hook_10.mp3'],
      rot:['assets/audio/pudge_voice_rot_07.mp3','assets/audio/pudge_voice_rot_10.mp3'],
      dismember:['assets/audio/pudge_voice_dismember_02.mp3','assets/audio/pudge_voice_dismember_03.mp3','assets/audio/pudge_voice_dismember_12.mp3']
    },
    kill:['assets/audio/pudge_kill_07.mp3','assets/audio/pudge_laugh_05.mp3'],
    silencerKill:'assets/audio/pudge_rival_silencer_12.mp3',
    heart:'assets/audio/pudge_item_heart_04.mp3',
    rotLoop:'assets/audio/pudge_rot_loop.mp3'
  };
  const pudgeSkillAudio=new Audio(),pudgeVoiceAudio=new Audio(),pudgeKillAudio=new Audio(),pudgeItemAudio=new Audio(),pudgeRotLoopAudio=new Audio(PUDGE_AUDIO.rotLoop);
  pudgeSkillAudio.volume=.64;pudgeVoiceAudio.volume=.72;pudgeKillAudio.volume=.72;pudgeItemAudio.volume=.72;
  pudgeRotLoopAudio.volume=.08;pudgeRotLoopAudio.loop=true;pudgeRotLoopAudio.preload='auto';
  function pudgePlay(audio,src,volume=null){if(!src)return;try{audio.pause();audio.currentTime=0;if(volume!==null)audio.volume=volume;audio.src=src+(src.includes('?')?'&':'?')+'v=1873';audio.load();audio.play().catch(()=>{})}catch(_){}}
  function pudgeRandom(list){return Array.isArray(list)&&list.length?list[Math.floor(Math.random()*list.length)]:null}
  function playPudgeAbilityAudio(id){if(id==='hook'||id==='dismember')pudgePlay(pudgeSkillAudio,PUDGE_AUDIO.skills[id],.64);let voice=pudgeRandom(PUDGE_AUDIO.voices[id]);if(voice)pudgePlay(pudgeVoiceAudio,voice,.72)}
  function playPudgeRotPressVoice(){let voice=pudgeRandom(PUDGE_AUDIO.voices.rot);if(voice)pudgePlay(pudgeVoiceAudio,voice,.72)}
  function syncPudgeRotLoop(){let should=!!G&&(G.teams||[]).flat().some(h=>h?.id===PUDGE_ID&&!h.dead&&h.rotOn);try{if(should){pudgeRotLoopAudio.volume=.08;if(pudgeRotLoopAudio.paused){pudgeRotLoopAudio.src=PUDGE_AUDIO.rotLoop+'?v=1873';pudgeRotLoopAudio.loop=true;pudgeRotLoopAudio.load();pudgeRotLoopAudio.play().catch(()=>{})}}else if(!pudgeRotLoopAudio.paused){pudgeRotLoopAudio.pause();pudgeRotLoopAudio.currentTime=0}}catch(_){}}
  function playPudgeKillAudio(victim){if(victim?.id==='silencer'&&Math.random()<.5){pudgePlay(pudgeKillAudio,PUDGE_AUDIO.silencerKill,.72);return 'silencer-rival'}let src=pudgeRandom(PUDGE_AUDIO.kill);if(src)pudgePlay(pudgeKillAudio,src,.72);return 'generic'}


  const oldPlayTurnVoice=playTurnVoice;
  playTurnVoice=function(h,noNet=false){
    if(h?.id!==PUDGE_ID)return oldPlayTurnVoice(h,noNet);
    if(!noNet)window.emitNetVfx?.('audio-turn',h);
    let src;
    if(!h._pudgeBattleVoiceDone){h._pudgeBattleVoiceDone=true;src=PUDGE_AUDIO.battle}else src=pudgeRandom(PUDGE_AUDIO.spawn);
    if(src)pudgePlay(voiceAudio,src,.72);
  };

  const oldAwardHeroKill=awardHeroKill;
  awardHeroKill=function(victim,killer){
    const valid=!!(G&&killer&&victim&&killer.team!==victim.team);
    oldAwardHeroKill(victim,killer);
    if(valid&&killer?.id===PUDGE_ID)playPudgeKillAudio(victim);
  };

  const oldApplyPurchasedItemStats=applyPurchasedItemStats;
  applyPurchasedItemStats=function(h,id){
    oldApplyPurchasedItemStats(h,id);
    if(h?.id===PUDGE_ID&&id==='heart')pudgePlay(pudgeItemAudio,PUDGE_AUDIO.heart,.72);
  };

  const style=document.createElement('style');
  style.textContent=`
    .hero.rot-active .hero-portrait{box-shadow:0 0 0 2px rgba(122,214,76,.85),0 0 26px rgba(82,180,58,.34),inset 0 0 24px rgba(83,154,59,.22)!important}
    .pudge-rot-cloud{position:absolute;inset:-6px;border-radius:16px;pointer-events:none;opacity:0;transition:opacity .18s ease;z-index:17;overflow:hidden}
    .pudge-rot-cloud i{position:absolute;display:block;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(232,255,219,.72),rgba(128,214,90,.36) 38%,rgba(83,152,58,.18) 58%,transparent 76%);filter:blur(3px);animation:pudge-rot-drift 4.2s linear infinite}
    .pudge-rot-cloud i:nth-child(1){width:70px;height:70px;left:-6px;top:18px;animation-delay:0s}
    .pudge-rot-cloud i:nth-child(2){width:94px;height:94px;right:-10px;top:4px;animation-delay:-1.35s}
    .pudge-rot-cloud i:nth-child(3){width:86px;height:86px;left:24px;bottom:-10px;animation-delay:-2.4s}
    .pudge-rot-cloud::before,.pudge-rot-cloud::after{content:'';position:absolute;inset:8px;border-radius:14px}
    .pudge-rot-cloud::before{background:radial-gradient(circle at 50% 55%,rgba(123,216,94,.16),rgba(67,137,51,.06) 48%,transparent 70%);filter:blur(2px)}
    .pudge-rot-cloud::after{box-shadow:inset 0 0 24px rgba(126,216,88,.18),0 0 14px rgba(106,204,79,.18)}
    .hero.rot-active .pudge-rot-cloud{opacity:1}
    .hero.rot-active.rot-pulse .pudge-rot-cloud{animation:pudge-rot-pulse .55s ease-out}
    @keyframes pudge-rot-drift{0%{transform:translate(-6px,8px) scale(.82);opacity:.32}50%{transform:translate(7px,-8px) scale(1.08);opacity:.62}100%{transform:translate(-6px,8px) scale(.82);opacity:.32}}
    @keyframes pudge-rot-pulse{0%{transform:scale(.95);opacity:.75}45%{transform:scale(1.03);opacity:1}100%{transform:scale(1);opacity:1}}

    .pudge-hook-fx{position:fixed;pointer-events:none;z-index:94}
    .pudge-hook-fx .pudge-hook-trail{position:absolute;left:0;top:0;width:var(--trail);height:88px;transform-origin:left center;transform:translateY(-50%) rotate(var(--ang)) scaleX(0);opacity:0;animation:pudge-hook-launch 1.08s cubic-bezier(.22,.78,.22,1) forwards;overflow:visible}
    .pudge-hook-fx .pudge-hook-svg{width:100%;height:100%;overflow:visible;display:block}
    .pudge-hook-fx .pudge-hook-link{fill:rgba(72,72,69,.22);stroke:#d8d8d1;stroke-width:2.4}
    .pudge-hook-fx .pudge-hook-shaft{fill:url(#pudgeHookWood)}
    .pudge-hook-fx .pudge-hook-ring{fill:none;stroke:#d8d3c7;stroke-width:4}
    .pudge-hook-fx .pudge-hook-stem{fill:url(#pudgeHookMetal)}
    .pudge-hook-fx .pudge-hook-main{fill:none;stroke:#e6dfd2;stroke-width:10;stroke-linecap:round;stroke-linejoin:round}
    .pudge-hook-fx .pudge-hook-inner{fill:none;stroke:rgba(92,86,79,.55);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
    .pudge-hook-fx .pudge-hook-tip{fill:url(#pudgeHookMetal)}
    .pudge-hook-fx .pudge-hook-blood{fill:#aa0f0f}
    .hero.hook-pulled{animation:pudge-hook-pulled .62s cubic-bezier(.2,.84,.24,1)}
    @keyframes pudge-hook-launch{0%{opacity:0;transform:translateY(-50%) rotate(var(--ang)) scaleX(0)}8%{opacity:1}38%{opacity:1;transform:translateY(-50%) rotate(var(--ang)) scaleX(1)}82%{opacity:1;transform:translateY(-50%) rotate(var(--ang)) scaleX(.32)}100%{opacity:0;transform:translateY(-50%) rotate(var(--ang)) scaleX(0)}}
    @keyframes pudge-hook-pulled{0%{transform:translateX(0) scale(1)}20%{transform:translateX(-15px) scale(1.02)}52%{transform:translateX(-22px) scale(1.03)}76%{transform:translateX(8px) scale(.99)}100%{transform:translateX(0) scale(1)}}

    .pudge-blood-burst{display:none!important}
    .pudge-blood-splash{position:fixed;pointer-events:none;z-index:96}
    .pudge-blood-splash .blood-drop{position:absolute;width:15px;height:15px;border-radius:52% 48% 55% 45%;background:radial-gradient(circle at 35% 35%,#ffb3b0 0%,#ff5850 18%,#da1818 48%,#790606 78%,rgba(92,0,0,.05) 100%);box-shadow:0 0 12px rgba(176,0,0,.34);left:0;top:0;transform:translate(-50%,-50%);animation:pudge-blood-spray .82s cubic-bezier(.18,.78,.24,1) forwards;animation-delay:var(--delay)}
    .hero.dismember-hit{animation:pudge-dismember-shake 1.65s linear 1}
    @keyframes pudge-blood-spray{0%{opacity:0;transform:translate(-50%,-50%) scale(.25)}14%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.05)}}
    @keyframes pudge-dismember-shake{0%,100%{transform:translateX(0)}12%{transform:translateX(-4px) rotate(-.8deg)}24%{transform:translateX(4px) rotate(.8deg)}36%{transform:translateX(-3px) rotate(-.5deg)}48%{transform:translateX(3px) rotate(.5deg)}60%{transform:translateX(-2px)}72%{transform:translateX(2px)}}
  `;
  document.head.appendChild(style);

  const oldDraftPortraitSrc=draftPortraitSrc;
  draftPortraitSrc=function(id){return id===PUDGE_ID?'assets/pudge.jpg':oldDraftPortraitSrc(id)};
  const oldDraftSlotPortraitSrc=draftSlotPortraitSrc;
  draftSlotPortraitSrc=function(id){return id===PUDGE_ID?'assets/pudge.jpg':oldDraftSlotPortraitSrc(id)};

  const oldMkHero=mkHero;
  mkHero=function(id,team){
    const h=oldMkHero(id,team);
    if(id===PUDGE_ID){h.rotOn=!!h.rotOn;h.dismembered=!!h.dismembered;}
    return h;
  };

  const oldEnsureItemState=ensureItemState;
  ensureItemState=function(){
    oldEnsureItemState();
    if(!G)return;
    for(const team of G.teams||[])for(const h of team||[]){
      if(h.rotOn===undefined)h.rotOn=false;
      if(h.dismembered===undefined)h.dismembered=false;
    }
  };

  function lineDepth(hero){return currentLineOrder(hero.team).indexOf(hero)}
  function heroAtDepth(team,depth){let line=currentLineOrder(team);return depth>=0&&depth<line.length?line[depth]:null}
  function pudgeRotTarget(pudge){if(!pudge||pudge.dead)return null;let depth=lineDepth(pudge);if(depth!==0)return null;return heroAtDepth(1-pudge.team,0)}
  function moveHeroToFront(hero){if(!hero||hero.dead||!G)return false;let arr=G.teams[hero.team]||[],idx=arr.indexOf(hero);if(idx<0)return false;G.front[hero.team]=idx;return true}
  function previewAbilityDamage(target,n,attacker=null,damageType='magic'){let total=(Number(n)||0)+spellBonus(target)+(attacker?itemSpellBonus(attacker):0);if(damageType==='magic'&&effectImmune(target))total=rageMagicDamage(total);return Math.max(0,total)}
  function clearExpiredPudgeStates(){if(!G)return;for(const team of G.teams||[])for(const h of team||[]){if(h?.dismembered&&(Number(h.stun)||0)<=0)h.dismembered=false}}

  function playPudgeRotPulseFx(hero){
    const card=document.getElementById(`hero-${hero.team}-${hero.id}`);
    if(!card)return;
    card.classList.add('rot-pulse');
    setTimeout(()=>card.classList.remove('rot-pulse'),520);
  }
  function playPudgeHookFx(hero,target){
    try{
      const from=heroCenter(hero.team,hero.id),to=heroCenter(target.team,target.id);
      if(!from||!to)return;
      const dx=to.x-from.x,dy=to.y-from.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;
      const hookLen=112;
      const trail=Math.max(90,Math.round(len+hookLen));
      const chainEnd=Math.max(24,Math.round(len));
      const chainStep=8;
      const links=[];
      for(let x=10,i=0; x<=chainEnd; x+=chainStep,i++){
        const rx=(i%2)?4.5:6.5;
        const ry=(i%2)?6.5:4.5;
        links.push(`<ellipse class="pudge-hook-link" cx="${x}" cy="44" rx="${rx}" ry="${ry}"></ellipse>`);
      }
      const base=chainEnd;
      const svg=`<div class="pudge-hook-trail"><svg class="pudge-hook-svg" viewBox="0 0 ${trail} 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="pudgeHookWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#815539"/><stop offset="100%" stop-color="#4c3022"/></linearGradient><linearGradient id="pudgeHookMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#efe8dc"/><stop offset="58%" stop-color="#b7b1a6"/><stop offset="100%" stop-color="#666059"/></linearGradient></defs>${links.join('')}<polygon class="pudge-hook-tip" points="${base+88},19 ${base+103},26 ${base+88},33"/><path class="pudge-hook-shaft" d="M ${base+4} 42 L ${base+40} 42 L ${base+40} 50 L ${base+4} 50 Z"/><polygon class="pudge-hook-shaft" points="${base-6},46 ${base+6},40 ${base+6},52"/><ellipse class="pudge-hook-ring" cx="${base+38}" cy="46" rx="4.5" ry="9"/><rect class="pudge-hook-stem" x="${base+43}" y="38" width="8" height="14" rx="4" ry="4" transform="rotate(6 ${base+47} ${44})"/><path class="pudge-hook-main" d="M ${base+48} 44 Q ${base+60} 18 ${base+90} 14 Q ${base+118} 18 ${base+132} 38 Q ${base+140} 54 ${base+136} 66 Q ${base+126} 86 ${base+100} 90 Q ${base+80} 92 ${base+66} 82 Q ${base+56} 76 ${base+58} 61"/><path class="pudge-hook-inner" d="M ${base+56} 44 Q ${base+67} 22 ${base+91} 19 Q ${base+111} 21 ${base+122} 39 Q ${base+129} 51 ${base+124} 63 Q ${base+116} 78 ${base+96} 81 Q ${base+77} 82 ${base+67} 72"/><circle class="pudge-hook-blood" cx="${base+89}" cy="24" r="3.4"/><circle class="pudge-hook-blood" cx="${base+94}" cy="35" r="2.5"/><circle class="pudge-hook-blood" cx="${base+86}" cy="44" r="2.2"/></svg></div>`;
      const el=addFxNode('pudge-hook-fx',from.x,from.y,svg);
      el.style.setProperty('--trail',trail+'px');
      el.style.setProperty('--ang',ang+'deg');
      const card=document.getElementById(`hero-${target.team}-${target.id}`); if(card){card.classList.add('hook-pulled');setTimeout(()=>card.classList.remove('hook-pulled'),540)}
      setTimeout(()=>{if(el?.isConnected)el.remove()},1120);
    }catch(e){console.warn('Pudge Hook FX failed',e)}
  }
  function playPudgeDismemberFx(hero,target,duration=1750){
    try{
      const card=document.getElementById(`hero-${target.team}-${target.id}`); if(card){card.classList.add('dismember-hit');setTimeout(()=>card.classList.remove('dismember-hit'),Math.max(850,duration-60))}
      const pos=heroCenter(target.team,target.id);
      if(pos){
        const bursts=[[-38,-18,0],[-18,-34,.03],[4,-42,.02],[22,-18,.05],[34,-30,.01],[28,10,.08],[-30,20,.04],[-4,30,.07],[44,4,.02],[-46,8,.06],[16,34,.05]];
        const wave=(delay)=>setTimeout(()=>{ const el=addFxNode('pudge-blood-splash',pos.x,pos.y,bursts.map(([dx,dy,d])=>`<i class="blood-drop" style="--dx:${dx}px;--dy:${dy}px;--delay:${d}s"></i>`).join('')); setTimeout(()=>{if(el?.isConnected)el.remove()},980); },delay);
        [0,260,520,860,1180].forEach(wave);
      }
    }catch(e){console.warn('Pudge Dismember FX failed',e)}
  }

  function triggerPudgeRot(hero){
    if(!G||!hero||hero.dead||!hero.rotOn)return false;
    const target=pudgeRotTarget(hero);
    if(!target||target.dead)return false;
    playPudgeRotPulseFx(hero);
    const dealt=previewAbilityDamage(target,2,hero,'magic');
    if(dealt<=0){addLog(`☣ ${hero.name} обжигает ${target.name} Rot, но урон не проходит.`);return false}
    const selfDealt=Math.max(0,Math.min(previewAbilityDamage(hero,2,hero,'magic'),Math.max(0,(Number(hero.hp)||0)-1)));
    addLog(`☣ ${hero.name} обжигает ${target.name} способностью Rot${selfDealt>0?' и получает ответный урон':''}.`);
    spellDamage(target,2,`${logIcon(PUDGE_ID,'rot')} ${hero.name}: `,hero,{impactDelay:90});
    if(selfDealt>0)spellDamage(hero,selfDealt,'☣ Rot: ',null,{impactDelay:90});
    return true;
  }

  const oldEnsureHeroNode=ensureHeroNode;
  ensureHeroNode=function(h){
    const d=oldEnsureHeroNode(h);
    if(h?.id!==PUDGE_ID)return d;
    const p=d.querySelector('.hero-portrait');
    if(p&&!p.querySelector('.pudge-rot-cloud')){
      const cloud=document.createElement('div');
      cloud.className='pudge-rot-cloud';
      cloud.setAttribute('aria-hidden','true');
      cloud.innerHTML='<i></i><i></i><i></i>';
      p.appendChild(cloud);
    }
    if(p&&!p.querySelector('.pudge-blood-burst')){
      const blood=document.createElement('div');
      blood.className='pudge-blood-burst';
      blood.setAttribute('aria-hidden','true');
      p.appendChild(blood);
    }
    return d;
  };

  const oldInvokerOverlayEffects=invokerOverlayEffects;
  invokerOverlayEffects=function(h){
    const out=oldInvokerOverlayEffects(h)||[];
    if(h?.id===PUDGE_ID&&h.rotOn)out.push({icon:skillIcon(PUDGE_ID,'rot'),tone:'good',count:'ON',label:'Rot: аура активна'});
    if(h?.dismembered&&(Number(h.stun)||0)>0)out.push({icon:skillIcon(PUDGE_ID,'dismember'),tone:'bad',count:h.stun,label:`Dismember: ещё ${h.stun} активац.`});
    return out;
  };

  function applyPudgeVisualState(){
    if(!G)return;
    for(const team of G.teams||[])for(const h of team||[]){
      const card=document.getElementById(`hero-${h.team}-${h.id}`); if(!card)continue;
      card.classList.toggle('rot-active',!!h.rotOn&&!h.dead&&h.id===PUDGE_ID);
    }
  }
  function upsertRotButton(){
    if(!G||targetMode)return;
    const h=active();
    if(!h||h.dead||h.id!==PUDGE_ID)return;
    const acts=document.getElementById('actions'); if(!acts)return;
    const desc=DATA[PUDGE_ID].skills.find(s=>s.id==='rot')?.desc||'';
    let btn=[...acts.querySelectorAll?.('button')||[]].find(b=>b?.dataset?.skillId==='rot'||/Rot/.test(b.textContent||''));
    if(!btn){btn=document.createElement('button');btn.className='skill';btn.dataset.skillId='rot';acts.appendChild(btn)}
    btn.className='skill';
    btn.disabled=isHeroSilenced(h);
    btn.title=desc;
    btn.innerHTML=`<img class="skill-icon" src="${skillIcon(PUDGE_ID,'rot')}"><span>Rot ${h.rotOn?'[ВКЛ]':'[ВЫКЛ]'}</span>`;
    btn.onclick=()=>skill('rot');
  }

  const oldRender=render;
  render=function(){oldRender();try{applyPudgeVisualState();upsertRotButton();syncPudgeRotLoop()}catch(e){console.warn('Pudge render patch failed',e)}};

  const oldRenderTurnQueue=renderTurnQueue;
  renderTurnQueue=function(){
    let q=$('#turnQueue');if(!q||!G)return;
    const icons={phantomlancer:'assets/turn_phantomlancer.webp',techies:'assets/turn_techies.png',morphling:'assets/turn_morphling.png',silencer:'assets/turn_silencer.png',bane:'assets/turn_bane.png',shadowfiend:'assets/turn_shadowfiend.png',lifestealer:'assets/turn_lifestealer.png',pudge:'assets/turn_pudge.png',io:'assets/turn_io.png',tinker:'assets/turn_tinker.png',invoker:'assets/turn_invoker.png',arcwarden:'assets/arcwarden_queue_icon.png',arcwarden_clone:'assets/arcwarden_clone_icon.png',axe:'assets/axe_icon.png',broodmother:'assets/turn_broodmother_mini.png'};
    let seq=turnQueuePreview(7);
    setHTMLCached(q,`<div class="turn-queue-title">ОЧЕРЁДНОСТЬ</div><div class="turn-queue-row">${seq.map((x,i)=>{let src=x.id==='tinker'?window.TINKER_MINI_ICON_DATA:(icons[x.id]||HERO_ICONS[x.id]||DATA[x.id]?.img||'assets/axe_icon.png');return `${i?'<span class="turn-arrow">›</span>':''}<div class="turn-token team-${x.team}${x.current?' now':''}${x.skipped?' skipped':''}" title="${x.name}${x.skipped?' — пропустит ход из-за оглушения/сна':''}"><img src="${src}" alt="${x.name}">${x.skipped?'<span class="skip-mark">🌀</span>':''}</div>`}).join('')}</div>`);
  };

  const oldDispel=dispelNegativeEffects;
  dispelNegativeEffects=function(h,strength='normal'){
    const keepDismember=!!h?.dismembered&&strength!=='strong';
    const prevStun=Number(h?.stun)||0;
    oldDispel(h,strength);
    if(strength==='strong'&&h)h.dismembered=false;
    if(keepDismember){h.stun=Math.max(Number(h.stun)||0,prevStun);h.dismembered=true;}
  };

  const oldBeginActivation=beginActivation;
  beginActivation=function(){
    oldBeginActivation();
    if(!G||G.winner!==null)return;
    clearExpiredPudgeStates();
    const before=active();
    let changed=false;
    for(const team of G.teams||[])for(const hero of team||[]){if(hero?.id===PUDGE_ID&&hero.rotOn&&!hero.dead){if(triggerPudgeRot(hero))changed=true;if(G.winner!==null)return}}
    clearExpiredPudgeStates();
    const now=active();
    if(before!==now&&now&&!now.dead){let base=(now.id==='tinker'&&(now.tinkerMatrixBoostTurns||0)>0)?3:2;G.actions=Math.max(0,base-(now.actionDebt||0));now.actionDebt=0;G.attackUsed=false;changed=true}
    if(changed||before!==now)render();
  };

  const oldSkill=skill;
  skill=function(id){
    const h=active();
    if(h?.id!==PUDGE_ID||!['hook','rot','dismember'].includes(id))return oldSkill(id);
    if(!G||G.resolving||G.winner!==null||targetMode)return;
    if(id!=='rot'&&G.actions<1)return;
    if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}
    if((h.cd?.[id]||0)>1)return;

    if(id==='rot'){
      playPudgeRotPressVoice();
      h.rotOn=!h.rotOn;
      addSkillLog(h,'rot',`${h.name} ${h.rotOn?'включает':'выключает'} Rot. Переключение не тратит действие.`);
      syncPudgeRotLoop();
      render();
      return;
    }
    if(id==='hook'){
      chooseEnemyAny('Выберите врага для Meat Hook',t=>!isForgeSpiritTarget(t),t=>{
        playPudgeAbilityAudio('hook');
        playPudgeHookFx(h,t);
        setTimeout(()=>{if(!G||h.dead)return;moveHeroToFront(t);pureDamage(t,2,`${logIcon(PUDGE_ID,'hook')} ${h.name}: `,h,{impactDelay:120});putOnCooldown(h,'hook');addSkillLog(h,'hook',`${h.name} притягивает ${t.name} способностью Meat Hook на переднюю позицию его линии и наносит 2 чистого урона.`);render();spend();},430);
      },'hook');
      return;
    }
    if(id==='dismember'){
      chooseEnemyAny('Выберите врага для Dismember',t=>!isForgeSpiritTarget(t),t=>{
        playPudgeAbilityAudio('dismember');
        const maxHp=Math.max(0,Number(h.maxHp)||0);
        const bonus=0.5*Math.floor(maxHp/3);
        const dmg=1+bonus;
        const selfHeal=Math.floor(maxHp/6);
        const dismemberDuration=1750;
        playPudgeDismemberFx(h,t,dismemberDuration);
        setTimeout(()=>{if(!G||h.dead)return;spellDamage(t,dmg,`${logIcon(PUDGE_ID,'dismember')} ${h.name}: `,h,{impactDelay:60});if(selfHeal>0)healHero(h,selfHeal,'Dismember');const stunTurns=reducedStunTurns(t,1,{piercesImmunity:true});if(stunTurns>0){t.stun=Math.max(Number(t.stun)||0,stunTurns);t.dismembered=true}putOnCooldown(h,'dismember');addSkillLog(h,'dismember',`${h.name} использует Dismember по ${t.name}: ${dmg} маг. урона${selfHeal>0?`, ${selfHeal} HP лечения Pudge`:''}${stunTurns>0?' и оглушение на 1 активацию (только сильное развеивание)':' без оглушения — цель полностью сократила длительность эффекта'}.`);render();},210);
        setTimeout(()=>{if(!G||h.dead)return;spend();},dismemberDuration);
      },'dismember');
      return;
    }
  };

  try{
    if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(PUDGE_ID))HERO_IDS.push(PUDGE_ID);
    if(HERO_META&&!HERO_META[PUDGE_ID])HERO_META[PUDGE_ID]={name:'PUDGE',icon:'assets/pudge_icon.png'};
  }catch(_){ }
})();
