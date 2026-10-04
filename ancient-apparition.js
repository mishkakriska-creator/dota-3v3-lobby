(()=>{
  const ID='ancient_apparition';
  const DRAFT='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/ancient_apparition.png';
  const PORTRAIT='assets/ancient_apparition/ancient_apparition_portrait_user_original.webm?v=7';
  let AA_PORTRAIT_URL=PORTRAIT;
  let AA_PORTRAIT_PROMISE=null;
  async function loadUploadedAAPortrait(){
    return PORTRAIT;
  }
  const ICON='assets/ancient_apparition/ancient_apparition_icon_v2.png';
  const SKILLS={
    vortex:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/ancient_apparition_ice_vortex.png',
    touch:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/ancient_apparition_chilling_touch.png',
    blast:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/ancient_apparition_ice_blast.png'
  };
  const SFX={
    attackLaunch:'https://dota2.fandom.com/wiki/Special:Redirect/file/Ancient_Apparition_projectile_launch2.mp3',
    attackImpact:'https://dota2.fandom.com/wiki/Special:Redirect/file/Ancient_Apparition_projectile_impact2.mp3',
    vortex:'https://dota2.fandom.com/wiki/Special:Redirect/file/Ice_Vortex_cast.mp3',
    touch:'https://dota2.fandom.com/wiki/Special:Redirect/file/Chilling_Touch.mp3',
    blastRelease:'https://dota2.fandom.com/wiki/Special:Redirect/file/Release_%28Ice_Blast%29.mp3',
    blastTarget:'https://dota2.fandom.com/wiki/Special:Redirect/file/Ice_Blast_target.mp3'
  };
  const VOICE_BASE='https://dota2.fandom.com/wiki/Special:Redirect/file/';
  const VOICES={
    turn:[
      VOICE_BASE+'Vo_ancient_apparition_appa_spawn_01.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_spawn_02.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_spawn_03.mp3'
    ],
    vortex:[
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_vortex_01.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_vortex_02.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_vortex_03.mp3'
    ],
    touch:[
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_touch_02.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_touch_04.mp3'
    ],
    blast:[
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_iceblast_01.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_ability_iceblast_06.mp3'
    ],
    kill:[
      VOICE_BASE+'Vo_ancient_apparition_appa_kill_01.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_kill_02.mp3',
      VOICE_BASE+'Vo_ancient_apparition_appa_kill_03.mp3'
    ],
    mekanism:VOICE_BASE+'Vo_ancient_apparition_appa_item_02.mp3',
    skadi:VOICE_BASE+'Vo_ancient_apparition_appa_item_03.mp3',
    purchase:VOICE_BASE+'Vo_ancient_apparition_appa_purch_02.mp3'
  };
  const VORTEX_TURNS=4, BLAST_TURNS=4, BLAST_TRAVEL_MS=1500;

  DATA[ID]={name:'ANCIENT APPARITION',hp:7,atk:1,img:DRAFT,staticPortrait:false,skills:[
    {id:'ice_vortex',name:'Ice Vortex',cd:2,desc:'Создаёт вихрь ледяной энергии перед вражеской линией на 4 общих хода. Герой, находящийся впереди линии, получает 0.25 магического урона за общий ход и получает на 20% больше магического урона. Перезарядка: 2 хода Ancient Apparition.'},
    {id:'chilling_touch',name:'Chilling Touch',cd:2,desc:'Усиливает следующую атаку: Ancient Apparition может выбрать первого или второго врага в линии. Это обычная атака — на неё работают криты, вампиризм и атакующие эффекты — и она дополнительно наносит 1.5 магического урона. Использование считается обычной атакой этого хода. Перезарядка: 2 хода Ancient Apparition.'},
    {id:'ice_blast',name:'Ice Blast',cd:4,desc:'Отправляет ледяной шар в выбранную карточку. При взрыве цель получает 1 магический урон. Все враги на пути до цели получают застывшую кровь на 4 общих хода: 0.5 магического урона за общий ход, полная блокировка лечения и восстановления здоровья. Если здоровье поражённого героя падает ниже 20% от максимального, он мгновенно разбивается и погибает. Перезарядка: 4 хода Ancient Apparition.'}
  ]};
  HERO_ICONS[ID]=ICON;
  SKILL_ICONS[ID]=[SKILLS.vortex,SKILLS.touch,SKILLS.blast];
  AUDIO[ID]={turn:[...VOICES.turn],skills:{ice_vortex:SFX.vortex,chilling_touch:SFX.touch,ice_blast:SFX.blastRelease},voices:{ice_vortex:VOICES.vortex,chilling_touch:VOICES.touch,ice_blast:VOICES.blast},killVoices:VOICES.kill};
  ATTACK_AUDIO[ID]=SFX.attackLaunch;
  ATTACK_IMPACT_MS[ID]=360;

  if(!DRAFT_ORDER.includes(ID)){
    const at=Math.max(DRAFT_ORDER.indexOf('necrophos')+1,DRAFT_ORDER.length);
    DRAFT_ORDER.splice(at,0,ID);
  }
  try{
    if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(ID))HERO_IDS.push(ID);
    if(HERO_META&&!HERO_META[ID])HERO_META[ID]={name:'ANCIENT APPARITION',icon:ICON};
  }catch(_){}

  const style=document.createElement('style');
  style.textContent=
    '.aa-vortex-field{position:absolute;left:50%;top:42%;width:92px;height:66px;transform:translate(-50%,-50%);z-index:24;pointer-events:none;opacity:.78;filter:drop-shadow(0 0 10px #69d9ff)}'+
    '.aa-vortex-field:before,.aa-vortex-field:after{content:"";position:absolute;inset:7px;border-radius:50%;border:4px solid rgba(178,239,255,.9);border-left-color:transparent;border-bottom-color:rgba(70,167,255,.28);animation:aaVortexSpin 1.25s linear infinite;box-shadow:0 0 18px rgba(75,193,255,.7),inset 0 0 18px rgba(111,218,255,.45)}'+
    '.aa-vortex-field:after{inset:17px;animation-direction:reverse;animation-duration:.82s;border-width:3px;opacity:.9}'+
    '@keyframes aaVortexSpin{to{transform:rotate(360deg)}}'+
    '.aa-fx{position:fixed;pointer-events:none;z-index:2147483646}'+
    '.aa-vortex-cast{width:130px;height:100px;margin:-50px 0 0 -65px;border-radius:50%;background:radial-gradient(circle,rgba(230,252,255,.88) 0 7%,rgba(90,207,255,.5) 23%,rgba(71,132,255,.18) 51%,transparent 72%);border:3px solid rgba(173,239,255,.9);animation:aaVortexCast 1.55s ease-out forwards}'+
    '.aa-vortex-cast:after{content:"";position:absolute;inset:12px;border-radius:50%;border:6px dashed rgba(210,248,255,.88);animation:aaVortexSpin .7s linear infinite}'+
    '@keyframes aaVortexCast{0%{opacity:0;transform:scale(.2) rotate(-35deg)}18%{opacity:1}100%{opacity:0;transform:scale(1.55) rotate(110deg)}}'+
    '.aa-touch-cast{width:118px;height:118px;margin:-59px 0 0 -59px;border-radius:50%;background:radial-gradient(circle,#fff 0 7%,rgba(160,239,255,.95) 9% 18%,rgba(78,180,255,.55) 30%,rgba(74,93,255,.16) 56%,transparent 72%);box-shadow:0 0 18px #bdf6ff,0 0 45px #55bfff88;animation:aaTouchPulse 1.25s ease-out forwards}'+
    '.aa-touch-cast:before,.aa-touch-cast:after{content:"";position:absolute;left:42px;top:-18px;width:8px;height:128px;background:linear-gradient(transparent,#dff8ff,transparent);transform:rotate(30deg);filter:blur(1px)}'+
    '.aa-touch-cast:after{transform:rotate(-36deg)}'+
    '@keyframes aaTouchPulse{0%{opacity:0;transform:scale(.35)}22%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.42)}}'+
    '.aa-touch-projectile{width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;background:radial-gradient(circle,#fff 0 11%,#c9f7ff 20%,#80dfff 38%,#467aff 62%,transparent 76%);box-shadow:0 0 18px #bff7ff,0 0 42px #58bfff,0 0 75px rgba(62,91,255,.65)}'+
    '.aa-touch-impact{width:106px;height:106px;margin:-53px 0 0 -53px;border-radius:50%;border:5px solid #d8f8ff;background:radial-gradient(circle,rgba(255,255,255,.92) 0 6%,rgba(102,211,255,.34) 25%,transparent 58%);box-shadow:0 0 28px #a8efff,0 0 58px #4e9fff,inset 0 0 28px #7ad9ff;animation:aaImpact .85s ease-out forwards}'+
    '.aa-blast-orb{width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;background:radial-gradient(circle,#fff 0 7%,#dcfaff 15%,#7edbff 31%,#3f8fff 49%,rgba(52,70,255,.3) 67%,transparent 76%);border:2px solid rgba(210,249,255,.8);box-shadow:0 0 25px #c4f5ff,0 0 62px #4498ff,0 0 96px rgba(66,82,255,.5)}'+
    '.aa-blast-orb:after{content:"";position:absolute;left:-72px;top:21px;width:84px;height:12px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(160,227,255,.72),#fff);filter:blur(3px)}'+
    '.aa-blast-impact{width:210px;height:210px;margin:-105px 0 0 -105px;border-radius:50%;background:radial-gradient(circle,#fff 0 4%,rgba(213,250,255,.98) 8%,rgba(127,224,255,.72) 20%,rgba(74,151,255,.42) 37%,rgba(76,90,255,.14) 58%,transparent 74%);box-shadow:0 0 34px #bff5ff,0 0 85px rgba(65,144,255,.72);animation:aaBlastImpact 1.5s cubic-bezier(.12,.7,.2,1) forwards}'+
    '.aa-blast-impact:before,.aa-blast-impact:after{content:"";position:absolute;left:101px;top:-30px;width:8px;height:268px;background:linear-gradient(transparent,#fff 22%,#a9efff 43%,#4f9dff 70%,transparent);transform:rotate(46deg);filter:drop-shadow(0 0 7px #9fe7ff)}'+
    '.aa-blast-impact:after{transform:rotate(-47deg)}'+
    '.aa-blast-frosted{filter:saturate(.58) brightness(1.12) drop-shadow(0 0 10px #82dfff)!important}'+
    '.aa-shatter{width:130px;height:130px;margin:-65px 0 0 -65px;animation:aaShatter .85s ease-out forwards;background:repeating-conic-gradient(from 4deg,transparent 0 9deg,rgba(212,248,255,.94) 10deg 13deg,transparent 14deg 27deg);filter:drop-shadow(0 0 8px #8ee5ff)}'+
    '.aa-ice-shard{position:fixed;width:6px;height:34px;margin:-17px 0 0 -3px;background:linear-gradient(#fff,#9ee8ff 55%,rgba(84,128,255,.15));clip-path:polygon(50% 0,100% 75%,55% 100%,0 76%);filter:drop-shadow(0 0 5px #85dfff);pointer-events:none;z-index:2147483647}'+
    '@keyframes aaImpact{0%{opacity:1;transform:scale(.25) rotate(0)}65%{opacity:.9}100%{opacity:0;transform:scale(1.8) rotate(24deg)}}'+
    '@keyframes aaBlastImpact{0%{opacity:0;transform:scale(.18) rotate(-20deg)}18%{opacity:1}100%{opacity:0;transform:scale(1.65) rotate(28deg)}}'+
    '@keyframes aaShatter{0%{opacity:1;transform:scale(.25) rotate(0)}100%{opacity:0;transform:scale(1.8) rotate(38deg)}}';
  document.head.appendChild(style);
  const portraitStyle=document.createElement('style');
  portraitStyle.textContent=`
    #game .hero[data-hero="ancient_apparition"] .hero-name{
      font-size:10.5px!important;
      letter-spacing:-.55px!important;
      white-space:nowrap!important;
      overflow:visible!important;
      text-overflow:clip!important;
      max-width:none!important;
      transform:scaleX(.92);
      transform-origin:left center;
    }
    #game .hero[data-hero="ancient_apparition"] .hero-name-row{overflow:visible!important}
    #game .hero[data-hero="ancient_apparition"] .hero-portrait video{
      width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;
    }
  `;
  document.head.appendChild(portraitStyle);


  const attackLaunchAudio=new Audio(),attackImpactAudio=new Audio(),skillAudio=new Audio(),blastTargetAudio=new Audio();
  [attackLaunchAudio,attackImpactAudio,skillAudio,blastTargetAudio].forEach(a=>{a.preload='auto';a.volume=.74});
  function playAAFile(a,src,vol=.74){
    if(!src)return;
    try{a.pause();a.currentTime=0;a.volume=vol;playFile(a,src)}catch(_){try{a.src=src;a.play().catch(()=>{})}catch(__){}}
  }
  function playAAVoice(src,noNet=false,hero=null){
    if(!src)return;
    playAAFile(abilityVoiceAudio,src,.78);
    if(!noNet&&hero)window.emitNetVfx?.('aa-voice',hero,{voiceSrc:src});
  }
  function playAARandomVoice(list,noNet=false,hero=null){
    if(!Array.isArray(list)||!list.length)return null;
    const src=list[Math.floor(Math.random()*list.length)];
    playAAVoice(src,noNet,hero);return src;
  }
  function center(h){
    if(!h)return null;
    const el=document.querySelector('#hero-'+h.team+'-'+h.id+' .hero-portrait')||document.getElementById('hero-'+h.team+'-'+h.id);
    const r=el&&el.getBoundingClientRect?el.getBoundingClientRect():null;
    return r&&r.width?{x:r.left+r.width/2,y:r.top+r.height/2,el}:null;
  }
  function fxRoot(){
    let root=document.getElementById('aaFxRoot');
    if(!root){root=document.createElement('div');root.id='aaFxRoot';root.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483646';document.body.appendChild(root)}
    return root;
  }
  function fx(cls,x,y){
    const el=document.createElement('div');el.className='aa-fx '+cls;el.style.left=x+'px';el.style.top=y+'px';fxRoot().appendChild(el);return el;
  }
  function fromRef(r){
    return r&&Number.isInteger(r.team)?(G&&G.teams&&G.teams[r.team]||[]).find(h=>h.id===r.id&&!h.dead)||null:null;
  }
  function targetRef(h){return h?{team:h.team,id:h.id}:null}
  function aaVortexActiveOn(h){
    if(!G||!h||h.dead)return false;
    const v=Array.isArray(G.aaVortex)?G.aaVortex[h.team]:null;
    if(!v||v.turns<=0)return false;
    return currentLineOrder(h.team)[0]===h;
  }
  function syncVortexDom(){
    document.querySelectorAll('.aa-vortex-field').forEach(x=>x.remove());
    if(!G||!Array.isArray(G.aaVortex))return;
    for(let team=0;team<2;team++){
      const v=G.aaVortex[team];if(!v||v.turns<=0)continue;
      const h=currentLineOrder(team)[0];if(!h)continue;
      const host=document.querySelector('#hero-'+team+'-'+h.id+' .hero-portrait');if(!host)continue;
      if(getComputedStyle(host).position==='static')host.style.position='relative';
      const el=document.createElement('i');el.className='aa-vortex-field';el.title='Ice Vortex: +20% получаемого магического урона';host.appendChild(el);
    }
  }
  function vortexCastFx(team){
    const h=currentLineOrder(team)[0];const p=center(h);if(!p)return;
    const el=fx('aa-vortex-cast',p.x,p.y);setTimeout(()=>el.remove(),1650);
  }
  function touchFx(caster,target){
    const a=center(caster),b=center(target);if(!a||!b)return;
    const cast=fx('aa-touch-cast',a.x,a.y);setTimeout(()=>cast.remove(),1450);
    setTimeout(()=>{
      const orb=fx('aa-touch-projectile',a.x,a.y),dx=b.x-a.x,dy=b.y-a.y;
      orb.animate([{transform:'translate(-50%,-50%) scale(.65)',opacity:.25},{transform:'translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px)) scale(1.05)',opacity:1}],{duration:520,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'});
      setTimeout(()=>{orb.remove();const hit=fx('aa-touch-impact',b.x,b.y);for(let i=0;i<12;i++){const sh=fx('aa-ice-shard',b.x,b.y),ang=(Math.PI*2*i/12)+(Math.random()-.5)*.28,dist=38+Math.random()*55;sh.animate([{transform:'translate(-50%,-50%) rotate('+(ang*57.3)+'deg) scale(.7)',opacity:1},{transform:'translate(calc(-50% + '+Math.cos(ang)*dist+'px),calc(-50% + '+Math.sin(ang)*dist+'px)) rotate('+(ang*57.3+90)+'deg) scale(1.15)',opacity:0}],{duration:620+Math.random()*220,easing:'cubic-bezier(.15,.7,.2,1)',fill:'forwards'});setTimeout(()=>sh.remove(),900)}setTimeout(()=>hit.remove(),900)},500);
    },170);
  }
  function blastFx(caster,target,path=[]){
    const a=center(caster),b=center(target);if(!a||!b)return;
    const orb=fx('aa-blast-orb',a.x,a.y),dx=b.x-a.x,dy=b.y-a.y;
    orb.animate([{transform:'translate(-50%,-50%) scale(.65)',opacity:.25},{transform:'translate(calc(-50% + '+(dx*.45)+'px),calc(-50% + '+(dy*.45)+'px)) scale(1.12)',opacity:1,offset:.56},{transform:'translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px)) scale(.9)',opacity:1}],{duration:BLAST_TRAVEL_MS,easing:'cubic-bezier(.12,.62,.18,1)',fill:'forwards'});
    setTimeout(()=>{
      orb.remove();playAAFile(blastTargetAudio,SFX.blastTarget,.82);
      const hit=fx('aa-blast-impact',b.x,b.y);for(let i=0;i<22;i++){const sh=fx('aa-ice-shard',b.x,b.y),ang=(Math.PI*2*i/22)+(Math.random()-.5)*.22,dist=70+Math.random()*105;sh.style.width=(4+Math.random()*5)+'px';sh.style.height=(24+Math.random()*44)+'px';sh.animate([{transform:'translate(-50%,-50%) rotate('+(ang*57.3)+'deg) scale(.55)',opacity:1},{transform:'translate(calc(-50% + '+Math.cos(ang)*dist+'px),calc(-50% + '+Math.sin(ang)*dist+'px)) rotate('+(ang*57.3+120)+'deg) scale(1.25)',opacity:0}],{duration:900+Math.random()*500,easing:'cubic-bezier(.08,.72,.16,1)',fill:'forwards'});setTimeout(()=>sh.remove(),1500)}setTimeout(()=>hit.remove(),1600);
      path.map(fromRef).filter(Boolean).forEach(h=>{
        const node=document.getElementById('hero-'+h.team+'-'+h.id);
        if(node){node.classList.add('aa-blast-frosted');setTimeout(()=>node.classList.remove('aa-blast-frosted'),2250)}
      });
    },BLAST_TRAVEL_MS);
  }
  function shatterFx(target){
    const p=center(target);if(!p)return;const el=fx('aa-shatter',p.x,p.y);setTimeout(()=>el.remove(),950);
  }
  window.playAncientApparitionFx=function(ev){
    if(!ev)return;
    if(ev.kind==='aa-vortex-cast'){vortexCastFx(Number(ev.targetTeam));return}
    if(ev.kind==='aa-chilling-touch'){const c=fromRef({team:ev.team,id:ev.heroId}),t=fromRef({team:ev.targetTeam,id:ev.targetId});if(c&&t)touchFx(c,t);return}
    if(ev.kind==='aa-ice-blast'){const c=fromRef({team:ev.team,id:ev.heroId}),t=fromRef({team:ev.targetTeam,id:ev.targetId});if(c&&t)blastFx(c,t,ev.path||[]);return}
    if(ev.kind==='aa-shatter'){const t=fromRef({team:ev.targetTeam,id:ev.targetId})||{team:ev.targetTeam,id:ev.targetId};shatterFx(t);return}
    if(ev.kind==='aa-voice'){if(ev.voiceSrc)playAAVoice(ev.voiceSrc,true,null);return}
  };

  const baseMkHero=mkHero;
  mkHero=function(id,team){
    const h=baseMkHero(id,team);
    if(id===ID){h.staticPortrait=false;h.portrait='';h.img=DRAFT;h.aaIceBlastTurns=0;h.aaIceBlastAppliedTurn=0;h.aaIceBlastSourceTeam=null;h.aaIceBlastSourceId=null}
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

  const basePlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h&&h.id===ID){
      if(!noNet)window.emitNetVfx&&window.emitNetVfx('audio-attack',h);
      playAAFile(attackLaunchAudio,SFX.attackLaunch,.72);
      setTimeout(()=>playAAFile(attackImpactAudio,SFX.attackImpact,.7),330);
      return;
    }
    return basePlayAttackSound(h,noNet);
  };
  const basePlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(h&&h.id===ID){
      if(!noNet)window.emitNetVfx&&window.emitNetVfx('audio-skill',h,{skillId:id});
      if(id==='ice_vortex'){
        playAAFile(skillAudio,SFX.vortex,.78);
        if(!noNet&&Math.random()<.5)playAARandomVoice(VOICES.vortex,false,h);
      }else if(id==='chilling_touch'){
        playAAFile(skillAudio,SFX.touch,.78);
        if(!noNet)playAARandomVoice(VOICES.touch,false,h);
      }else if(id==='ice_blast'){
        playAAFile(skillAudio,SFX.blastRelease,.82);
        if(!noNet)playAARandomVoice(VOICES.blast,false,h);
      }
      return;
    }
    return basePlaySkillSound(h,id,noNet);
  };

  window.playAncientApparitionKillVoice=function(killer,victim,noNet=false){
    if(!killer||killer.id!==ID)return;
    playAARandomVoice(VOICES.kill,noNet,killer);
  };

  const previousItemPurchased=window.onDotaItemPurchased;
  window.onDotaItemPurchased=function(hero,itemId){
    try{previousItemPurchased?.(hero,itemId)}catch(_){}
    if(!hero||hero.id!==ID)return;
    if(itemId==='mekanism'){playAAVoice(VOICES.mekanism,false,hero);return}
    if(itemId==='skadi'){playAAVoice(VOICES.skadi,false,hero);return}
    if(Math.random()<.5)playAAVoice(VOICES.purchase,false,hero);
  };

  function aaSourceFor(h){
    if(!G||!h||!Number.isInteger(h.aaIceBlastSourceTeam))return null;
    return (G.teams[h.aaIceBlastSourceTeam]||[]).find(x=>x.id===h.aaIceBlastSourceId)||null;
  }
  function aaCheckShatter(h,attacker=null){
    if(!G||!h||h.dead||(h.aaIceBlastTurns||0)<=0||h._aaShattering||!(h.maxHp>0))return false;
    if((Number(h.hp)||0)/(Number(h.maxHp)||1)>=.20)return false;
    if(typeof effectImmune==='function'&&effectImmune(h)){
      addLog(logIcon(ID,'ice_blast')+'<span>'+h.name+' ниже порога Ice Blast, но находится под неуязвимостью.</span>');
      return false;
    }
    h._aaShattering=true;
    const caster=aaSourceFor(h)||attacker||null;
    shatterFx(h);window.emitNetVfx&&window.emitNetVfx('aa-shatter',caster||{team:h.team,id:ID},{targetTeam:h.team,targetId:h.id});
    addLog(logIcon(ID,'ice_blast')+'<span>'+h.name+' падает ниже 20% здоровья и разбивается от Ice Blast.</span>');
    h.aaIceBlastTurns=0;
    // SHATTER is an execution, not magical/physical/pure damage: bypass armor, magic resistance and Huskar's Berserker's Blood.
    h.hp=0;h.dead=true;
    if(caster)awardHeroKill(h,caster);
    if(h.id==='io')breakTether(h,true);
    if(h.tetheredBy){const io=findHero(h.team,h.tetheredBy);if(io)breakTether(io,true)}
    if(caster?.id===ID)window.playAncientApparitionKillVoice?.(caster,h);
    addLog('❄️ Ice Blast — SHATTER: '+h.name+' разбивается и погибает.');
    const deadFront=h;active(h.team);if(G.winner===null)marsArenaWallHit(h.team,deadFront);checkWin();if(G.winner===null)render();
    h._aaShattering=false;
    return true;
  }

  window.aaCheckShatter=aaCheckShatter;

  const baseDamage=damage;
  damage=function(h,n,src='',attacker=null,fx={}){
    let amount=Math.max(0,Number(n)||0),label=src;
    if(h&&fx&&fx.damageType==='magic'&&aaVortexActiveOn(h)&&!fx.ignoreAaVortexAmp){
      const before=amount;amount=Math.round(before*1.2*4)/4;
      label+='[Ice Vortex ×1.2: '+before+'→'+amount+'] ';
    }
    const out=baseDamage(h,amount,label,attacker,fx);
    if(h&&!h.dead&&(h.aaIceBlastTurns||0)>0&&!fx.fromAaShatter)aaCheckShatter(h,attacker);
    return out;
  };

  const baseHealHero=healHero;
  healHero=function(h,n,label,meta={}){
    if(h&&!h.dead&&(h.aaIceBlastTurns||0)>0&&Number(n)>0){
      addLog(logIcon(ID,'ice_blast')+'<span>Ice Blast не даёт '+h.name+' восстановить здоровье'+(label?' ('+label+')':'')+'.</span>');
      return 0;
    }
    return baseHealHero(h,n,label,meta);
  };

  function applyBlastDebuff(target,caster){
    if(!target||target.dead)return 0;
    const turns=reducedNegativeTurns(target,BLAST_TURNS);
    if(turns<=0){addLog('🛡 '+target.name+' невосприимчив к эффекту Ice Blast.');return 0}
    target.aaIceBlastTurns=Math.max(Number(target.aaIceBlastTurns)||0,turns);
    target.aaIceBlastAppliedTurn=G&&G.turnSerial||0;
    target.aaIceBlastSourceTeam=caster.team;
    target.aaIceBlastSourceId=caster.id;
    return turns;
  }
  function tickAA(){
    if(!G||G.winner!==null)return;
    const serial=G.turnSerial||0;
    G.aaVortex=Array.isArray(G.aaVortex)?G.aaVortex:[null,null];
    for(let team=0;team<2;team++){
      const v=G.aaVortex[team];
      if(!v||v.turns<=0||v.appliedTurn===serial)continue;
      const target=currentLineOrder(team)[0]||null;
      const caster=(G.teams[v.casterTeam]||[]).find(h=>h.id===v.casterId&&!h.dead)||null;
      if(target&&!target.dead)spellDamage(target,.25,logIcon(ID,'ice_vortex')+' Ice Vortex: ',caster,{impactDelay:35,ignoreAaVortexAmp:true});
      v.turns=Math.max(0,v.turns-1);
      if(v.turns<=0){G.aaVortex[team]=null;addLog(logIcon(ID,'ice_vortex')+'<span>Ice Vortex перед линией игрока '+(team+1)+' рассеивается.</span>')}
    }
    for(const team of G.teams||[])for(const h of team||[]){
      if(h.dead||(h.aaIceBlastTurns||0)<=0||h.aaIceBlastAppliedTurn===serial)continue;
      const caster=aaSourceFor(h);
      spellDamage(h,.5,logIcon(ID,'ice_blast')+' Ice Blast: ',caster,{impactDelay:45});
      if(h.dead)continue;
      h.aaIceBlastTurns=Math.max(0,h.aaIceBlastTurns-1);
      if(h.aaIceBlastTurns<=0){h.aaIceBlastSourceTeam=null;h.aaIceBlastSourceId=null;addLog(logIcon(ID,'ice_blast')+'<span>Ice Blast на '+h.name+' заканчивается.</span>')}
    }
    syncVortexDom();
  }

  if(typeof invokerOverlayEffects==='function'){
    const baseOverlayEffects=invokerOverlayEffects;
    invokerOverlayEffects=function(h){
      const out=baseOverlayEffects(h);
      if(h&&!h.dead&&aaVortexActiveOn(h)){
        const v=G.aaVortex[h.team];out.push({icon:SKILLS.vortex,tone:'bad',count:v.turns,label:'Ice Vortex: +20% получаемого магического урона • ещё '+v.turns+' общ. ход.'});
      }
      if(h&&!h.dead&&(h.aaIceBlastTurns||0)>0)out.push({icon:SKILLS.blast,tone:'bad',count:h.aaIceBlastTurns,label:'Ice Blast: лечение заблокировано • 0.5 маг. урона за общий ход • смерть ниже 20% HP.'});
      return out;
    };
  }

  const baseBeginActivation=beginActivation;
  beginActivation=function(){
    const r=baseBeginActivation();
    if(G&&G.winner===null){tickAA();render()}
    return r;
  };
  async function forceAAPortraitMotion(){
    const node=document.querySelector('#game .hero[data-hero="ancient_apparition"] .hero-portrait');
    const v=node?.querySelector('video');
    if(!v)return;
    node.classList.remove('video-pending');
    v.muted=true;v.defaultMuted=true;v.autoplay=true;v.loop=true;v.playsInline=true;
    v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('autoplay','');v.setAttribute('loop','');
    const wanted=await loadUploadedAAPortrait();
    if(!v.isConnected||!wanted)return;
    if(v.src!==wanted&&v.getAttribute('src')!==wanted){
      try{v.pause()}catch(_){}
      v.src=wanted;v.preload='auto';
      try{v.load()}catch(_){}
    }
    const kick=()=>{try{if(v.currentTime>=v.duration-.05&&Number.isFinite(v.duration))v.currentTime=0;const p=v.play();if(p?.catch)p.catch(()=>{})}catch(_){}};
    if(v.readyState>=2)kick();else{
      v.addEventListener('loadeddata',kick,{once:true});
      v.addEventListener('canplay',kick,{once:true});
    }
    v.onended=()=>{try{v.currentTime=0;v.play().catch(()=>{})}catch(_){}};
    clearTimeout(v.__aaKick);v.__aaKick=setTimeout(kick,120);
    clearInterval(v.__aaKeepAlive);
    v.__aaKeepAlive=setInterval(()=>{if(!document.hidden&&v.isConnected&&v.paused)kick()},700);
  }
  const baseRender=render;
  render=function(){const r=baseRender();syncVortexDom();setTimeout(forceAAPortraitMotion,0);return r};
  document.addEventListener('pointerdown',()=>setTimeout(forceAAPortraitMotion,0),{passive:true});
  document.addEventListener('touchstart',()=>setTimeout(forceAAPortraitMotion,0),{passive:true});

  async function chillingAttack(h,t){
    if(!G||!h||!t||h.dead||t.dead)return;
    G.attackUsed=true;G.resolving='aa-chilling-touch';render();
    playSkillSound(h,'chilling_touch');
    window.playAncientApparitionFx({kind:'aa-chilling-touch',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id});
    window.emitNetVfx&&window.emitNetVfx('aa-chilling-touch',h,{targetTeam:t.team,targetId:t.id});
    playAttackSound(h);
    if(attackMisses(h,t)){
      addLog('💨 Chilling Touch: '+h.name+' промахивается по '+t.name+'.');
      putOnCooldown(h,'chilling_touch');G.resolving=false;spend();return;
    }
    const hit=attackDamageInfo(h,t,physicalBaseDamage(h,t),{allowCrit:true});
    damage(t,hit.damage,attackSourceLabel(h,hit,'❄️ Chilling Touch'),h,{impactDelay:360});
    afterSuccessfulBasicHit(h,t,hit.damage);
    if(!t.dead)spellDamage(t,1.5,logIcon(ID,'chilling_touch')+' Chilling Touch: ',h,{impactDelay:400});
    const repeats=!t.dead?rollRepeatAttackCount(h,t):0;
    if(!t.dead&&repeats>0)await performFreeRepeatAttacks(h,t,repeats);
    putOnCooldown(h,'chilling_touch');G.resolving=false;spend();render();
  }

  const baseSkill=skill;
  skill=function(id){
    if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return baseSkill(id);
    const h=active();
    if(!h||h.id!==ID)return baseSkill(id);
    if(!DATA[ID].skills.some(s=>s.id===id))return;
    if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}
    if((h.cd[id]||0)>1)return;
    armTargetSkillHint(h,id);

    if(id==='ice_vortex'){
      playSkillSound(h,id);putOnCooldown(h,id);
      G.aaVortex=Array.isArray(G.aaVortex)?G.aaVortex:[null,null];
      const targetTeam=1-h.team;
      G.aaVortex[targetTeam]={turns:VORTEX_TURNS,appliedTurn:G.turnSerial||0,casterTeam:h.team,casterId:h.id};
      window.playAncientApparitionFx({kind:'aa-vortex-cast',team:h.team,heroId:h.id,targetTeam});
      window.emitNetVfx&&window.emitNetVfx('aa-vortex-cast',h,{targetTeam});
      addSkillLog(h,id,h.name+' создаёт Ice Vortex перед вражеской линией на '+VORTEX_TURNS+' общих хода.');
      spend();render();return;
    }

    if(id==='chilling_touch'){
      const allowed=currentLineOrder(1-h.team).slice(0,2);
      chooseEnemyAny('Chilling Touch: выберите первого или второго врага',t=>allowed.includes(t),t=>chillingAttack(h,t),'chilling_touch');
      return;
    }

    if(id==='ice_blast'){
      chooseEnemyAny('Ice Blast: выберите карточку во вражеской линии',t=>!isForgeSpiritTarget(t),t=>{
        const line=currentLineOrder(t.team),idx=line.indexOf(t);
        if(idx<0)return;
        const path=line.slice(0,idx+1),refs=path.map(targetRef);
        playSkillSound(h,id);putOnCooldown(h,id);
        G.resolving='aa-ice-blast';render();
        window.playAncientApparitionFx({kind:'aa-ice-blast',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,path:refs});
        window.emitNetVfx&&window.emitNetVfx('aa-ice-blast',h,{targetTeam:t.team,targetId:t.id,path:refs});
        setTimeout(()=>{
          if(!G)return;
          path.forEach(x=>{if(x&&!x.dead)applyBlastDebuff(x,h)});
          if(t&&!t.dead)spellDamage(t,1,logIcon(ID,'ice_blast')+' Ice Blast: ',h,{impactDelay:0});
          path.forEach(x=>{if(x&&!x.dead)aaCheckShatter(x,h)});
          addSkillLog(h,id,h.name+' запускает Ice Blast в '+t.name+': эффект застывшей крови получают '+path.filter(x=>!x.dead).map(x=>x.name).join(', ')+'.');
          G.resolving=false;spend();render();
        },BLAST_TRAVEL_MS);
      },'ice_blast');
      return;
    }
    return baseSkill(id);
  };

  if(typeof draft==='function')draft();
  setTimeout(()=>{try{draft();render()}catch(_){}},0);
})();