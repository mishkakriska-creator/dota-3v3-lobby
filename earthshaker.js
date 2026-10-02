(()=>{
  const ID='earthshaker';
  const DRAFT='assets/earthshaker_v2/draft.png?v=2';
  const PORTRAIT='assets/earthshaker_v2/portrait.webm?v=2';
  const ICON='assets/earthshaker_v2/turn.png?v=2';
  const SKILLS={
    fissure:'assets/earthshaker_v2/fissure.png?v=2',
    totem:'assets/earthshaker_v2/enchant_totem.png?v=2',
    aftershock:'assets/earthshaker_v2/aftershock.png?v=2',
    echo:'assets/earthshaker_v2/echo_slam.png?v=2'
  };
  const SFX={
    fissure:'assets/audio/earthshaker_fissure.mp3?v=1',
    totem:'assets/audio/earthshaker_enchant_totem.mp3?v=1',
    echo:'assets/audio/earthshaker_echo_slam.mp3?v=1',
    preattack:'assets/audio/earthshaker_preattack.mp3?v=1',
    impact:'assets/audio/earthshaker_attack_impact.mp3?v=1'
  };

  const VOICE={
    turn:['assets/audio/earthshaker_spawn_01.mp3?v=1','assets/audio/earthshaker_spawn_02.mp3?v=1','assets/audio/earthshaker_move_06.mp3?v=1'],
    fissure:['assets/audio/earthshaker_fissure_voice_01.mp3?v=1','assets/audio/earthshaker_fissure_voice_02.mp3?v=1'],
    totem:['assets/audio/earthshaker_enchant_voice_01.mp3?v=1','assets/audio/earthshaker_enchant_voice_02.mp3?v=1'],
    echo:['assets/audio/earthshaker_echo_voice_02.mp3?v=1','assets/audio/earthshaker_echo_voice_03.mp3?v=1'],
    kill:['assets/audio/earthshaker_kill_01.mp3?v=1','assets/audio/earthshaker_kill_02.mp3?v=1'],
    rivalChen:['assets/audio/earthshaker_rival_14.mp3?v=1','assets/audio/earthshaker_rival_15.mp3?v=1'],
    rivalPL:['assets/audio/earthshaker_rival_20.mp3?v=1','assets/audio/earthshaker_rival_21.mp3?v=1'],
    heart:'assets/audio/earthshaker_item_03.mp3?v=1'
  };

  DATA[ID]={
    name:'EARTHSHAKER',hp:8,atk:1,img:DRAFT,staticPortrait:false,
    skills:[
      {id:'fissure',name:'Fissure',cd:3,desc:'Разбивает землю тотемом: все враги получают 1 магического урона. Перед Earthshaker появляется непроходимая каменная борозда на 3 общих хода. Пока она стоит, обычной тычкой Earthshaker атаковать нельзя; способности и модифицированные атаки с выбором цели проходят через борозду. При 10 жетонах Aftershock борозда держится 4 общих хода, при 20 — 6.'},
      {id:'enchant_totem',name:'Enchant Totem',cd:2,desc:'Заряжает тотем: следующая обычная атака Earthshaker получает +100% урона. При 10 жетонах Aftershock бонус становится +150%, при 20 — +200%.'},
      {id:'aftershock',name:'Aftershock',cd:0,passive:true,desc:'За каждую попавшую обычную атаку по Earthshaker или его союзнику получает 1 жетон. Учитываются дополнительные тычки, иллюзии, паучки, крипы и Forge Spirit. На 10 жетонах усиливает Fissure, Enchant Totem и Echo Slam; на 20 жетонах усиливает их ещё раз. Каждое использование способности Earthshaker имеет 40% шанс оглушить переднего врага на 1 активацию.'},
      {id:'echo_slam',name:'Echo Slam',cd:4,desc:'Ударные волны поражают всю вражескую линию. Каждый живой враг даёт по 0.5 магического урона, и итоговый урон получает каждый враг. Паучки, крипы Chen, Forge Spirit, иллюзии и клон Arc Warden тоже увеличивают число целей для расчёта. При 10 жетонах каждый враг добавляет ещё +1 урона, при 20 — ещё +2.'}
    ]
  };
  HERO_ICONS[ID]=ICON;
  SKILL_ICONS[ID]=[SKILLS.fissure,SKILLS.totem,SKILLS.aftershock,SKILLS.echo];
  AUDIO[ID]={skills:{fissure:SFX.fissure,enchant_totem:SFX.totem,echo_slam:SFX.echo}};
  ATTACK_AUDIO[ID]=SFX.preattack;
  ATTACK_IMPACT_MS[ID]=340;
  if(!DRAFT_ORDER.includes(ID))DRAFT_ORDER.push(ID);
  try{
    if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(ID))HERO_IDS.push(ID);
    if(HERO_META&&!HERO_META[ID])HERO_META[ID]={name:'EARTHSHAKER',icon:ICON};
  }catch(_){}

  const baseMkHero=mkHero;
  mkHero=function(id,team){
    const h=baseMkHero(id,team);
    if(id===ID){
      h.staticPortrait=false;h.portrait=PORTRAIT;h.img=DRAFT;
      h.esAftershock=0;h.esFissureTurns=0;h.esFissureAppliedTurn=0;
      h.esTotemReady=false;h.esTotemBonus=100;
    }
    return h;
  };
  const baseBattlePortraitSrcFor=battlePortraitSrcFor;
  battlePortraitSrcFor=function(id){return id===ID?PORTRAIT:baseBattlePortraitSrcFor(id)};
  const baseDraftPortraitSrc=draftPortraitSrc;
  draftPortraitSrc=function(id){return id===ID?DRAFT:baseDraftPortraitSrc(id)};
  const baseDraftSlotPortraitSrc=draftSlotPortraitSrc;
  draftSlotPortraitSrc=function(id){return id===ID?DRAFT:baseDraftSlotPortraitSrc(id)};
  if(typeof miniHeroIcon==='function'){
    const baseMiniHeroIcon=miniHeroIcon;
    miniHeroIcon=function(id){return id===ID?ICON:baseMiniHeroIcon(id)};
  }

  const aPre=new Audio(),aImpact=new Audio(),aSkill=new Audio(),aVoice=new Audio();
  [aPre,aImpact,aSkill,aVoice].forEach(a=>{a.preload='auto';a.volume=.78});
  function playEs(a,src,vol=.78){
    if(!src)return;
    try{a.pause();a.currentTime=0;a.src=src;a.volume=vol;const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(_){}
  }
  function randomVoice(list){return Array.isArray(list)&&list.length?list[Math.floor(Math.random()*list.length)]:null}
  function playVoice(src,h=null,noNet=false){if(!src)return;playEs(aVoice,src,.86);if(!noNet&&h)window.emitNetVfx?.('es-voice',h,{voiceSrc:src})}
  window.playEarthshakerVoice=function(src){if(src)playVoice(src,null,true)};
  function playRandomVoice(list,h,noNet=false){const src=randomVoice(list);if(src)playVoice(src,h,noNet);return src}

  const basePlayTurnVoice=playTurnVoice;
  playTurnVoice=function(h,noNet=false){
    if(h?.id!==ID)return basePlayTurnVoice(h,noNet);
    if(G&&active()!==h)return;
    if(noNet)return;
    playRandomVoice(VOICE.turn,h,false);
  };

  const basePlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h?.id!==ID)return basePlayAttackSound(h,noNet);
    if(!noNet)window.emitNetVfx?.('audio-attack',h);
    playEs(aPre,SFX.preattack,.72);
    setTimeout(()=>playEs(aImpact,SFX.impact,.82),260);
  };
  const basePlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(h?.id!==ID)return basePlaySkillSound(h,id,noNet);
    if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:id});
    if(id==='fissure'){playEs(aSkill,SFX.fissure,.82);if(!noNet&&Math.random()<.50)playRandomVoice(VOICE.fissure,h,false)}
    else if(id==='enchant_totem'){playEs(aSkill,SFX.totem,.82);if(!noNet&&Math.random()<.50)playRandomVoice(VOICE.totem,h,false)}
    else if(id==='echo_slam'){playEs(aSkill,SFX.echo,.84);if(!noNet)playRandomVoice(VOICE.echo,h,false)}
  };

  function shakerForTeam(team){return (G?.teams?.[team]||[]).find(h=>h?.id===ID&&!h.dead)||null}
  function addAftershockToken(team,n=1,label=''){
    const es=shakerForTeam(team);if(!es)return;
    const before=Math.max(0,Number(es.esAftershock)||0);
    es.esAftershock=Math.min(20,before+Math.max(0,Number(n)||0));
    if(es.esAftershock!==before){
      if(before<20&&es.esAftershock>=20)addLog('🟠 Aftershock Earthshaker достигает 20 жетонов: максимальное усиление способностей.');
      else if(before<10&&es.esAftershock>=10)addLog('🟠 Aftershock Earthshaker достигает 10 жетонов: способности усилены.');
      if(label)console.debug('Earthshaker Aftershock +'+n,label);
    }
  }
  window.registerEarthshakerBasicHit=function(target,attacker,kind='attack'){
    if(!target||!attacker||attacker.team===target.team)return;
    addAftershockToken(target.team,1,kind);
  };

  const baseAfterSuccessfulBasicHit=afterSuccessfulBasicHit;
  afterSuccessfulBasicHit=function(attacker,target,dealtDamage=0,opts={}){
    const out=baseAfterSuccessfulBasicHit(attacker,target,dealtDamage,opts);
    try{window.registerEarthshakerBasicHit?.(target,attacker,'basic')}catch(_){}
    return out;
  };
  const baseDamage=damage;
  damage=function(h,n,src='',attacker=null,fx={}){
    const wasAlive=!!h&&!h.dead&&(Number(h.hp)||0)>0;
    try{
      if(h&&attacker&&attacker.team!==h.team){
        const s=String(src||'');
        if(s.includes('Паучок')||s.includes('Forge Spirit'))window.registerEarthshakerBasicHit?.(h,attacker,s.includes('Паучок')?'spider':'forge');
      }
    }catch(_){}
    const out=baseDamage(h,n,src,attacker,fx);
    try{
      if(wasAlive&&h&&(h.dead||(Number(h.hp)||0)<=0)&&attacker?.id===ID&&!h._earthshakerKillVoice){
        h._earthshakerKillVoice=true;
        let special=null;
        if(h.id==='chen'&&Math.random()<.50)special=VOICE.rivalChen;
        else if(h.id==='phantomlancer'&&Math.random()<.50)special=VOICE.rivalPL;
        playRandomVoice(special||VOICE.kill,attacker,false);
      }
    }catch(_){}
    return out;
  };

  function aftershockTier(h){const n=Math.max(0,Number(h?.esAftershock)||0);return n>=20?2:n>=10?1:0}
  function fissureDuration(h){return aftershockTier(h)===2?6:aftershockTier(h)===1?4:3}
  function totemBonus(h){return aftershockTier(h)===2?200:aftershockTier(h)===1?150:100}
  function echoPerUnit(h){return .5+(aftershockTier(h)===2?2:aftershockTier(h)===1?1:0)}

  function tryAftershockStun(h){
    if(!h||h.dead||Math.random()>=.40)return false;
    const t=frontHero(1-h.team);if(!t||t.dead||!canReceiveNegativeEffect(t))return false;
    const turns=reducedStunTurns(t,1);if(turns<=0)return false;
    t.stun=Math.max(Number(t.stun)||0,turns);
    addLog('<img class="log-skill-icon" src="'+SKILLS.aftershock+'" alt=""> Aftershock: '+t.name+' оглушён на '+turns+' активацию.');
    window.playEarthshakerFx?.({kind:'es-aftershock',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id});
    window.emitNetVfx?.('es-aftershock',h,{targetTeam:t.team,targetId:t.id});
    return true;
  }

  function enemyTargets(team){
    const out=[];
    for(const h of G?.teams?.[1-team]||[]){
      if(h&&!h.dead&&!h.infested)out.push(h);
      if(h?.forgeSpirit&&!h.forgeSpirit.dead&&h.forgeSpirit.turns>0)out.push(h.forgeSpirit);
    }
    return out;
  }
  function echoUnitCount(team){
    let n=0;
    for(const h of G?.teams?.[1-team]||[]){
      if(!h||h.dead||h.infested)continue;
      if(h.id==='chen_creeps')n+=Math.max(1,Array.isArray(h.chenCreeps)?h.chenCreeps.length:1);else n+=1;
      if(h.id==='broodmother')n+=Array.isArray(h.broodlingTimers)?h.broodlingTimers.length:0;
      if(h.forgeSpirit&&!h.forgeSpirit.dead&&h.forgeSpirit.turns>0)n+=1;
    }
    return Math.max(0,n);
  }

  const baseCanBasicAttackTarget=canBasicAttackTarget;
  canBasicAttackTarget=function(attacker,target){
    if(!baseCanBasicAttackTarget(attacker,target))return false;
    if(target?.id===ID&&(target.esFissureTurns||0)>0&&attacker?.team!==target.team)return false;
    return true;
  };

  function targetRef(h){
    if(!h)return null;
    if(typeof isForgeSpiritTarget==='function'&&isForgeSpiritTarget(h))return{team:h.team,id:h.id,ownerId:h.ownerId,summon:true};
    return{team:h.team,id:h.id};
  }
  function fromRef(r){
    if(!r||!Number.isInteger(r.team))return null;
    if(r.summon){const owner=(G?.teams?.[r.team]||[]).find(x=>x.id===r.ownerId);return owner?.forgeSpirit||null}
    return (G?.teams?.[r.team]||[]).find(x=>x.id===r.id)||null;
  }
  function center(h){
    if(!h)return null;let el=null;
    if(typeof isForgeSpiritTarget==='function'&&isForgeSpiritTarget(h)){
      const owner=(G?.teams?.[h.team]||[]).find(x=>x.id===h.ownerId);
      el=owner&&document.querySelector('#hero-'+h.team+'-'+owner.id+' .forge-spirit-card');
    }else el=document.querySelector('#hero-'+h.team+'-'+h.id+' .hero-portrait');
    const r=el?.getBoundingClientRect?.();return r&&r.width?{x:r.left+r.width/2,y:r.top+r.height/2,el}:null;
  }
  function fxRoot(){let root=document.getElementById('earthshakerFxRoot');if(!root){root=document.createElement('div');root.id='earthshakerFxRoot';root.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483645';document.body.appendChild(root)}return root}
  function fx(cls,x,y){const el=document.createElement('div');el.className='es-fx '+cls;el.style.left=x+'px';el.style.top=y+'px';fxRoot().appendChild(el);return el}
  function fissureFx(caster,targets=[]){
    const a=center(caster),b=center(targets[0]||frontHero(1-caster.team));if(!a||!b)return;
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.max(110,Math.hypot(dx,dy)*.78),ang=Math.atan2(dy,dx)*180/Math.PI;
    const line=fx('es-fissure-cast',a.x,a.y);line.style.width=len+'px';line.style.transform='translateY(-50%) rotate('+ang+'deg)';
    for(let i=0;i<10;i++){const rock=document.createElement('i');rock.style.left=(8+i*9)+'%';rock.style.animationDelay=(i*32)+'ms';line.appendChild(rock)}
    setTimeout(()=>line.remove(),1150);
  }
  function totemFx(caster){const p=center(caster);if(!p)return;const e=fx('es-totem-cast',p.x,p.y);e.innerHTML='<i></i><b></b>';setTimeout(()=>e.remove(),1050)}
  function echoFx(caster,targets=[]){
    const p=center(caster);if(!p)return;const e=fx('es-echo-cast',p.x,p.y);e.innerHTML='<i></i><i></i><i></i><b></b>';setTimeout(()=>e.remove(),1600);
    targets.map(fromRef).filter(Boolean).forEach((t,i)=>{const q=center(t);if(!q)return;setTimeout(()=>{const hit=fx('es-echo-hit',q.x,q.y);setTimeout(()=>hit.remove(),780)},120+i*55)});
  }
  function aftershockFx(target){const p=center(target);if(!p)return;const e=fx('es-aftershock-hit',p.x,p.y);setTimeout(()=>e.remove(),750)}
  window.playEarthshakerFx=function(ev){
    if(!ev)return;const c=fromRef({team:Number(ev.team),id:ev.heroId});
    if(ev.kind==='es-fissure'&&c){fissureFx(c,(ev.targets||[]).map(fromRef).filter(Boolean));return}
    if(ev.kind==='es-enchant-totem'&&c){totemFx(c);return}
    if(ev.kind==='es-echo-slam'&&c){echoFx(c,ev.targets||[]);return}
    if(ev.kind==='es-aftershock'){const t=fromRef({team:Number(ev.targetTeam),id:ev.targetId});if(t)aftershockFx(t)}
  };

  const style=document.createElement('style');
  style.textContent=`
    #game .hero[data-hero="earthshaker"] .hero-portrait video{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important}
    #game .hero[data-hero="earthshaker"].es-totem-ready{filter:drop-shadow(0 0 8px rgba(255,157,39,.88))}
    .es-aftershock-counter{position:absolute;right:3px;bottom:3px;z-index:45;display:flex;align-items:center;gap:2px;padding:2px 4px;border-radius:7px;background:rgba(30,14,4,.82);border:1px solid rgba(255,159,50,.85);box-shadow:0 0 7px rgba(255,120,20,.5);font:700 9px/1 Arial;color:#ffd08a}
    .es-aftershock-counter img{width:13px;height:13px;border-radius:2px}
    .es-totem-ready-badge{position:absolute;left:3px;bottom:3px;z-index:45;width:18px;height:18px;border-radius:50%;border:1px solid #ffd17c;background:#5b2808 url('${SKILLS.totem}') center/cover no-repeat;box-shadow:0 0 8px #ff9a2e;animation:esTotemBadge .8s ease-in-out infinite alternate}
    @keyframes esTotemBadge{to{transform:scale(1.12);box-shadow:0 0 14px #ffb548}}
    #earthshakerFieldRoot{position:fixed;inset:0;pointer-events:none;z-index:35}
    .es-fissure-live{position:fixed;height:20px;transform-origin:left center;filter:drop-shadow(0 3px 5px rgba(0,0,0,.75));opacity:.96}
    .es-fissure-live:before{content:"";position:absolute;inset:4px 0;background:linear-gradient(90deg,#4a2712,#9f5624 18%,#5d3218 38%,#bd6d2f 56%,#4b2711 78%,#9b5525);clip-path:polygon(0 58%,7% 18%,14% 57%,22% 5%,31% 62%,42% 20%,53% 75%,63% 12%,72% 57%,84% 7%,92% 62%,100% 28%,100% 84%,0 88%);box-shadow:0 0 12px #ff7b20}
    .es-fissure-live:after{content:"";position:absolute;left:2%;right:2%;top:8px;height:4px;background:#ff9a32;box-shadow:0 0 12px #ff7a18,0 0 22px rgba(255,92,16,.7);opacity:.72}
    .es-fx{position:fixed;pointer-events:none}.es-fissure-cast{height:32px;transform-origin:left center}
    .es-fissure-cast:before{content:"";position:absolute;left:0;right:0;top:13px;height:6px;background:linear-gradient(90deg,#fff0a6,#ff9b24 20%,#ff6a12 70%,rgba(255,81,10,.15));box-shadow:0 0 12px #ff9b22,0 0 26px #f45a0f;clip-path:polygon(0 45%,7% 0,13% 62%,22% 15%,31% 77%,42% 18%,52% 72%,62% 4%,72% 68%,82% 22%,91% 80%,100% 30%,100% 70%,0 75%);animation:esCrack 1s ease-out forwards}
    .es-fissure-cast i{position:absolute;top:7px;width:16px;height:22px;background:linear-gradient(135deg,#a5662c,#4b2915);clip-path:polygon(50% 0,100% 55%,75% 100%,12% 86%,0 35%);filter:drop-shadow(0 2px 3px #000);animation:esRock .65s cubic-bezier(.2,.8,.2,1) both}
    @keyframes esRock{0%{transform:translateY(22px) scale(.35);opacity:0}55%{transform:translateY(-7px) scale(1.15);opacity:1}100%{transform:translateY(0) scale(1);opacity:.85}}
    @keyframes esCrack{0%{clip-path:inset(0 100% 0 0);opacity:.2}25%{clip-path:inset(0 0 0 0);opacity:1}100%{opacity:0}}
    .es-totem-cast{width:126px;height:126px;margin:-63px 0 0 -63px;border-radius:50%;background:radial-gradient(circle,rgba(255,246,182,.95) 0 8%,rgba(255,172,48,.52) 20%,rgba(255,95,10,.18) 47%,transparent 70%);box-shadow:0 0 26px #ff9f2a;animation:esTotemPulse 1s ease-out forwards}
    .es-totem-cast i{position:absolute;left:54px;top:-24px;width:18px;height:150px;border-radius:9px;background:linear-gradient(90deg,#5c2b0d,#ffb64a 35%,#fff0a4 50%,#d36a18 68%,#5a280c);transform:rotate(7deg);box-shadow:0 0 20px #ff8b1b}
    .es-totem-cast b{position:absolute;inset:18px;border:4px solid rgba(255,190,67,.75);border-radius:50%;animation:esRing .7s linear infinite}
    @keyframes esTotemPulse{0%{opacity:0;transform:scale(.45)}25%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.38)}}@keyframes esRing{to{transform:rotate(360deg)}}
    .es-echo-cast{width:70px;height:70px;margin:-35px 0 0 -35px}.es-echo-cast i{position:absolute;inset:0;border:5px solid rgba(255,172,47,.92);border-radius:50%;box-shadow:0 0 18px #ff8a18,inset 0 0 18px #ffb52a;animation:esEchoRing 1.25s ease-out forwards}.es-echo-cast i:nth-child(2){animation-delay:.18s}.es-echo-cast i:nth-child(3){animation-delay:.36s}
    .es-echo-cast b{position:absolute;left:28px;top:28px;width:14px;height:14px;border-radius:50%;background:#fff2a1;box-shadow:0 0 25px #ff7a15;animation:esEchoCore .75s ease-out forwards}@keyframes esEchoRing{0%{opacity:1;transform:scale(.25)}100%{opacity:0;transform:scale(5.2)}}@keyframes esEchoCore{to{opacity:0;transform:scale(4)}}
    .es-echo-hit{width:82px;height:82px;margin:-41px 0 0 -41px;border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 8px,rgba(255,178,50,.8) 9px 11px,transparent 12px 18px);box-shadow:0 0 24px rgba(255,110,20,.8);animation:esEchoHit .72s ease-out forwards}@keyframes esEchoHit{0%{opacity:.2;transform:scale(.25)}35%{opacity:1}100%{opacity:0;transform:scale(1.7)}}
    .es-aftershock-hit{width:94px;height:58px;margin:-29px 0 0 -47px;border-bottom:6px solid #f0a03a;box-shadow:0 8px 20px rgba(255,113,20,.75);animation:esShock .7s ease-out forwards}.es-aftershock-hit:before,.es-aftershock-hit:after{content:"";position:absolute;bottom:-5px;width:42px;height:25px;border-top:4px solid #ffb34b;transform:skewX(-35deg) rotate(-8deg)}.es-aftershock-hit:after{right:0;transform:skewX(35deg) rotate(8deg)}@keyframes esShock{0%{opacity:1;transform:scale(.35)}100%{opacity:0;transform:scale(1.5)}}
  `;
  document.head.appendChild(style);

  function fieldRoot(){let r=document.getElementById('earthshakerFieldRoot');if(!r){r=document.createElement('div');r.id='earthshakerFieldRoot';document.body.appendChild(r)}return r}
  function syncEarthshakerUi(){
    document.querySelectorAll('.es-fissure-live').forEach(x=>x.remove());if(!G)return;
    for(let team=0;team<2;team++){
      const h=shakerForTeam(team);if(!h)continue;const card=document.getElementById('hero-'+team+'-'+ID),portrait=card?.querySelector('.hero-portrait');
      if(card)card.classList.toggle('es-totem-ready',!!h.esTotemReady);
      if(portrait){
        if(getComputedStyle(portrait).position==='static')portrait.style.position='relative';
        let counter=portrait.querySelector('.es-aftershock-counter');if(!counter){counter=document.createElement('span');counter.className='es-aftershock-counter';counter.innerHTML='<img src="'+SKILLS.aftershock+'" alt=""><b>0</b>';portrait.appendChild(counter)}
        counter.querySelector('b').textContent=String(Math.max(0,Number(h.esAftershock)||0));counter.title='Aftershock: '+Math.max(0,Number(h.esAftershock)||0)+'/20';
        let ready=portrait.querySelector('.es-totem-ready-badge');if(h.esTotemReady&&!ready){ready=document.createElement('span');ready.className='es-totem-ready-badge';ready.title='Enchant Totem заряжен: +'+h.esTotemBonus+'% к следующей атаке';portrait.appendChild(ready)}if(!h.esTotemReady&&ready)ready.remove();
      }
      if((h.esFissureTurns||0)>0){
        const a=center(h),enemy=center(frontHero(1-team));if(!a||!enemy)continue;const dx=enemy.x-a.x,dy=enemy.y-a.y,dist=Math.hypot(dx,dy),start=54,len=Math.max(75,Math.min(190,dist*.38)),ang=Math.atan2(dy,dx);
        const line=document.createElement('div');line.className='es-fissure-live';line.style.left=(a.x+Math.cos(ang)*start)+'px';line.style.top=(a.y+Math.sin(ang)*start)+'px';line.style.width=len+'px';line.style.transform='translateY(-50%) rotate('+(ang*180/Math.PI)+'deg)';line.title='Fissure: '+h.esFissureTurns+' общ. ход.';fieldRoot().appendChild(line);
      }
    }
  }

  const baseRender=render;render=function(){const r=baseRender();requestAnimationFrame(syncEarthshakerUi);return r};window.addEventListener('resize',()=>requestAnimationFrame(syncEarthshakerUi));
  const baseBeginActivation=beginActivation;
  beginActivation=function(){
    if(G){const nextSerial=(G.turnSerial||0)+1;for(const team of G.teams||[])for(const h of team||[]){if(h?.id===ID&&(h.esFissureTurns||0)>0&&h.esFissureAppliedTurn!==nextSerial){h.esFissureTurns=Math.max(0,h.esFissureTurns-1);if(h.esFissureTurns<=0)addLog('<img class="log-skill-icon" src="'+SKILLS.fissure+'" alt=""> Fissure Earthshaker исчезает.')}}}
    return baseBeginActivation();
  };

  const baseBasicAttack=basicAttack;
  basicAttack=function(){
    if(!G||active()?.id!==ID||!active()?.esTotemReady)return baseBasicAttack();
    if(G.resolving||G.winner!==null||G.actions<1||targetMode)return;if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}
    const a=active();if((a.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}
    chooseEnemy('Выберите врага для усиленной атаки Enchant Totem',t=>canBasicAttackTarget(a,t),async t=>{
      G.attackUsed=true;G.resolving='multiattack';const bonus=Math.max(100,Number(a.esTotemBonus)||totemBonus(a)),mult=1+bonus/100;a.esTotemReady=false;playAttackSound(a);
      if(attackMisses(a,t)){addLog('💨 Enchant Totem: '+a.name+' промахивается по '+t.name+', заряд потрачен.');G.resolving=false;spend();return}
      const raw=Math.max(0,effectiveAtk(a)*mult);let hit=attackDamageInfo(a,t,physicalBaseDamage(a,t,raw),{allowCrit:false});
      if(a.items?.includes('daedalus')||a.items?.includes('crystalys')){const critId=a.items?.includes('daedalus')?'daedalus':'crystalys';if(Math.random()<.30){const critMult=critId==='daedalus'?2:1.5;hit.damage=physicalBaseDamage(a,t,raw*critMult);hit.tags.push('КРИТ '+ITEMS[critId].name+' ×'+critMult)}}
      hit.tags.unshift('Enchant Totem +'+bonus+'%');damage(t,hit.damage,attackSourceLabel(a,hit,'🔨'),a,{impactDelay:attackImpactMs(a)});afterSuccessfulBasicHit(a,t,hit.damage);
      const count=rollRepeatAttackCount(a,t);if(!t.dead&&count>0)await performFreeRepeatAttacks(a,t,count);G.resolving=false;spend();
    });
  };

  const baseSkill=skill;
  skill=function(id){
    const h=G&&active?.();if(!h||h.id!==ID||!['fissure','enchant_totem','echo_slam'].includes(id))return baseSkill(id);
    if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return;if(isHeroSilenced(h)){alert('Earthshaker обезмолвлен и не может использовать способности.');return}if((h.cd?.[id]||0)>1)return;
    if(id==='fissure'){
      playSkillSound(h,id);tryAftershockStun(h);const targets=enemyTargets(h.team),refs=targets.map(targetRef).filter(Boolean);h.esFissureTurns=fissureDuration(h);h.esFissureAppliedTurn=G.turnSerial||0;
      window.playEarthshakerFx?.({kind:'es-fissure',team:h.team,heroId:h.id,targets:refs});window.emitNetVfx?.('es-fissure',h,{targets:refs});
      for(const t of targets){if(!t.dead)spellDamage(t,1,'<img class="log-skill-icon" src="'+SKILLS.fissure+'" alt=""> Fissure: ',h,{impactDelay:190})}
      putOnCooldown(h,id);addSkillLog(h,id,h.name+' создаёт Fissure на '+h.esFissureTurns+' общих хода и наносит всем врагам 1 магического урона.');spend();return;
    }
    if(id==='enchant_totem'){
      playSkillSound(h,id);tryAftershockStun(h);h.esTotemBonus=totemBonus(h);h.esTotemReady=true;window.playEarthshakerFx?.({kind:'es-enchant-totem',team:h.team,heroId:h.id});window.emitNetVfx?.('es-enchant-totem',h);putOnCooldown(h,id);addSkillLog(h,id,h.name+' заряжает тотем: следующая обычная атака получает +'+h.esTotemBonus+'% урона.');spend();return;
    }
    if(id==='echo_slam'){
      playSkillSound(h,id);tryAftershockStun(h);const units=echoUnitCount(h.team),per=echoPerUnit(h),dmg=Math.round(units*per*100)/100,targets=enemyTargets(h.team),refs=targets.map(targetRef).filter(Boolean);
      window.playEarthshakerFx?.({kind:'es-echo-slam',team:h.team,heroId:h.id,targets:refs,units,dmg});window.emitNetVfx?.('es-echo-slam',h,{targets:refs,units,dmg});
      for(const t of targets){if(!t.dead)spellDamage(t,dmg,'<img class="log-skill-icon" src="'+SKILLS.echo+'" alt=""> Echo Slam ('+units+' × '+per+'): ',h,{impactDelay:260})}
      putOnCooldown(h,id);addSkillLog(h,id,h.name+' использует Echo Slam: '+units+' вражеских единиц × '+per+' = '+dmg+' магического урона каждой цели.');spend();return;
    }
  };

  const baseOnDotaItemPurchased=window.onDotaItemPurchased;
  window.onDotaItemPurchased=function(h,id){
    try{baseOnDotaItemPurchased?.(h,id)}catch(_){}
    if(h?.id===ID&&id==='heart')playVoice(VOICE.heart,h,false);
  };

  try{draft()}catch(_){}
})();
