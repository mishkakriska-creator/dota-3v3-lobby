(()=>{
  const ID='necrophos';
  const CDN='https://cdn.cloudflare.steamstatic.com/apps/dota2';
  const DRAFT=CDN+'/images/dota_react/heroes/necrolyte.png';
  const PORTRAIT='assets/portraits/necrolyte_animated_hq.webm?v=1';
  const ICON='assets/turn_necrophos.png?v=1';
  const SKILLS={
    pulse:CDN+'/images/dota_react/abilities/necrolyte_death_pulse.png',
    heart:CDN+'/images/dota_react/abilities/necrolyte_heartstopper_aura.png',
    scythe:CDN+'/images/dota_react/abilities/necrolyte_reapers_scythe.png'
  };
  const SFX={
    pulse:'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a7/Necrophos_Death_Pulse.mp3/revision/latest?cb=20191216020945',
    scythe:'https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a9/Necrophos_Reaper%27s_Scythe.mp3/revision/latest?cb=20191216020948',
    launch:'https://static.wikia.nocookie.net/dota2_gamepedia/images/d/db/Necrophos_projectile_launch1.mp3/revision/latest',
    impact:'https://static.wikia.nocookie.net/dota2_gamepedia/images/6/62/Necrophos_projectile_impact1.mp3/revision/latest'
  };
  const VOICES={
    turn:[
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/2a/Necr_attack_09_ru.mp3/revision/latest?cb=20170413075038',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/e/ef/Necr_move_14_ru.mp3/revision/latest?cb=20170413075954',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/21/Necr_ability_reap_01_ru.mp3/revision/latest?cb=20170413074909',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/f/f1/Necr_ability_tox_02_ru.mp3/revision/latest?cb=20170413074936',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/f/f3/Necr_spawn_02_ru.mp3/revision/latest?cb=20170413080651'
    ],
    scythe:[
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/d/d4/Necr_ability_reap_03_ru.mp3/revision/latest?cb=20170413074918',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/7/76/Necr_ability_reap_02_ru.mp3/revision/latest?cb=20170413074913',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/21/Necr_ability_reap_01_ru.mp3/revision/latest?cb=20170413074909'
    ],
    kill:[
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/2d/Necr_kill_11_ru.mp3/revision/latest?cb=20170413075608',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/8/85/Necr_kill_07_ru.mp3/revision/latest?cb=20170413075548',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/25/Necr_kill_02_ru.mp3/revision/latest?cb=20170413075523'
    ],
    pudge:[
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/2/2e/Necr_pudge_04_ru.mp3/revision/latest?cb=20170413080340',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/9/99/Necr_pudge_03_ru.mp3/revision/latest?cb=20170413080335',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/d/db/Necr_pudge_02_ru.mp3/revision/latest?cb=20170413080330',
      'https://static.wikia.nocookie.net/dota2_ru_gamepedia/images/f/fc/Necr_pudge_01_ru.mp3/revision/latest?cb=20170413080325'
    ]
  };

  DATA[ID]={name:'NECROPHOS',hp:8,atk:1,img:DRAFT,skills:[
    {id:'death_pulse',name:'Death Pulse',cd:1,desc:'Necrophos выпускает волну смерти: наносит 1 урон переднему врагу и врагу сразу за ним, восстанавливает 1 HP себе и союзнику сразу позади Necrophos. Перезарядка: 1 ход Necrophos.'},
    {id:'heartstopper',name:'Heartstopper Aura — ПАССИВНАЯ',cd:0,passive:true,desc:'ПАССИВНАЯ. Каждый общий ход: если Necrophos стоит первым в своей линии, передний и второй враг теряют по 20% своего максимального HP; если Necrophos стоит вторым — эффект получает только передний враг. За каждое убийство любым способом Necrophos получает +0.5 восстановления HP каждый общий ход на 3 общих хода.'},
    {id:'reapers_scythe',name:"Reaper's Scythe",cd:4,desc:"Выбранная цель получает 1 урон за каждое недостающее HP от её максимального здоровья. Если Reaper's Scythe убивает врага, Necrophos навсегда получает +0.5 восстановления HP каждый общий ход. Перезарядка: 4 хода Necrophos."}
  ]};
  HERO_ICONS[ID]=ICON;
  SKILL_ICONS[ID]=[SKILLS.pulse,SKILLS.heart,SKILLS.scythe];
  AUDIO[ID]=AUDIO[ID]||{};
  AUDIO[ID].turn=VOICES.turn;
  if(!DRAFT_ORDER.includes(ID)){
    const at=Math.max(0,DRAFT_ORDER.indexOf('chen')+1);
    if(at>0)DRAFT_ORDER.splice(at,0,ID); else DRAFT_ORDER.push(ID);
  }
  try{
    if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(ID))HERO_IDS.push(ID);
    if(HERO_META&&!HERO_META[ID])HERO_META[ID]={name:'NECROPHOS',icon:ICON};
  }catch(_){}

  const style=document.createElement('style');
  style.textContent=`
    .necro-heartstopper-badge{position:absolute!important;left:9px!important;right:auto!important;top:38px!important;z-index:35!important;display:block!important;width:34px!important;height:34px!important;min-width:34px!important;max-width:34px!important;min-height:34px!important;max-height:34px!important;padding:0!important;border-radius:7px!important;background:rgba(10,22,13,.9)!important;border:1px solid rgba(117,255,92,.58)!important;color:#efffe9!important;box-shadow:0 0 10px rgba(77,255,75,.24)!important;overflow:hidden!important;pointer-events:none!important}
    .necro-heartstopper-badge img{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;min-width:100%!important;min-height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;border-radius:6px!important}
    .necro-heartstopper-badge span{position:absolute!important;left:0!important;right:0!important;bottom:0!important;display:block!important;width:100%!important;height:9px!important;min-width:0!important;max-width:none!important;background:rgba(4,12,6,.74)!important;color:#f3ffe9!important;font:900 6.5px/9px system-ui!important;text-align:center!important;white-space:nowrap!important;overflow:hidden!important}
    .necro-pulse-fx,.necro-scythe-fx,.necro-heartstopper-fx{position:fixed;pointer-events:none;z-index:2147483645}
    .necro-pulse-fx .ring{position:absolute;left:-42px;top:-42px;width:84px;height:84px;border-radius:50%;border:4px solid rgba(155,255,92,.92);box-shadow:0 0 22px rgba(104,255,86,.72),inset 0 0 20px rgba(112,255,91,.35);animation:necro-pulse-ring 2.28s ease-out forwards}
    .necro-pulse-fx .ring.r2{animation-delay:.18s;border-width:2px}
    .necro-pulse-fx .core{position:absolute;left:-24px;top:-24px;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle,#efffcf 0,#adff73 28%,rgba(79,214,70,.62) 55%,transparent 74%);filter:blur(.5px);animation:necro-pulse-core 2.15s ease-out forwards}
    .necro-pulse-orb{position:fixed;width:38px;height:38px;margin:-19px 0 0 -19px;background:transparent;box-shadow:none;pointer-events:none;z-index:2147483646;overflow:visible}
    .necro-pulse-orb svg{display:block;width:38px;height:38px;overflow:visible;filter:drop-shadow(0 0 6px #75ff75) drop-shadow(0 0 13px rgba(70,255,70,.62))}
    .necro-pulse-orb .skull-shell{fill:#8dff6a;stroke:#dfffd2;stroke-width:2}
    .necro-pulse-orb .skull-eye{fill:#16361b}
    .necro-pulse-orb .skull-jaw{fill:#6ce95d;stroke:#d5ffcb;stroke-width:1.4}
    .necro-pulse-impact{position:fixed;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;border:3px solid rgba(133,255,101,.86);box-shadow:0 0 22px rgba(92,255,88,.62),inset 0 0 20px rgba(77,255,91,.3);pointer-events:none;z-index:2147483646;animation:necro-impact .72s ease-out forwards}
    @keyframes necro-pulse-ring{0%{opacity:0;transform:scale(.35)}15%{opacity:1}100%{opacity:0;transform:scale(2.2)}}
    @keyframes necro-pulse-core{0%{opacity:.2;transform:scale(.4)}20%{opacity:1}100%{opacity:0;transform:scale(1.5)}}
    @keyframes necro-impact{0%{opacity:1;transform:scale(.25)}100%{opacity:0;transform:scale(1.45)}}
    .necro-scythe-fx{width:290px;height:155px;margin:-78px 0 0 -145px;transform-origin:50% 55%;filter:drop-shadow(0 0 14px rgba(91,255,81,.6));animation:necro-scythe-wrap 4.02s ease-out forwards}
    .necro-scythe-fx .trail{position:absolute;left:5px;top:24px;width:278px;height:104px;border-radius:50%;border-top:14px solid rgba(102,255,83,.96);border-left:4px solid rgba(62,211,67,.42);transform:rotate(7deg);box-shadow:0 -5px 22px rgba(78,255,72,.48)}
    .necro-scythe-fx .trail::before{content:'';position:absolute;left:18px;top:-19px;width:238px;height:80px;border-radius:50%;border-top:6px solid rgba(228,255,211,.88);transform:rotate(-3deg)}
    .necro-scythe-fx .trail::after{content:'';position:absolute;left:28px;top:-4px;width:205px;height:66px;border-radius:50%;border-top:22px solid rgba(37,210,70,.2);filter:blur(7px)}
    .necro-scythe-fx .scythe-svg{position:absolute;left:39px;top:-9px;width:205px;height:180px;overflow:visible;filter:drop-shadow(0 0 8px rgba(138,255,100,.92)) drop-shadow(0 0 18px rgba(67,217,65,.52));transform-origin:52% 76%;animation:necro-scythe-blade 4.02s ease-out forwards}
    .necro-scythe-fx .scythe-handle{stroke:#6ea34d;stroke-width:11;stroke-linecap:round}
    .necro-scythe-fx .scythe-handle-hi{stroke:#d7ffad;stroke-width:3.5;stroke-linecap:round;opacity:.72}
    .necro-scythe-fx .scythe-blade{fill:#dfffd2;stroke:#7fe45e;stroke-width:3}
    .necro-scythe-fx .scythe-blade-hi{fill:none;stroke:#ffffff;stroke-width:2.4;opacity:.78}
    .necro-scythe-fx .impact{position:absolute;left:50%;top:58%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:radial-gradient(circle,rgba(235,255,216,.66) 0 8%,rgba(116,255,94,.34) 23%,rgba(64,202,69,.13) 52%,transparent 72%);animation:necro-scythe-impact 4.02s ease-out forwards}
    @keyframes necro-scythe-wrap{0%{opacity:0;transform:translateX(-95px) scale(.72) rotate(-18deg)}12%{opacity:1;transform:translateX(-58px) scale(.9) rotate(-10deg)}54%{opacity:1;transform:translateX(-20px) scale(1) rotate(-4deg)}63%{opacity:1;transform:translateX(8px) scale(1.04) rotate(8deg)}78%{opacity:.9;transform:translateX(28px) scale(1.03) rotate(12deg)}100%{opacity:0;transform:translateX(70px) scale(1.06) rotate(14deg)}}
    @keyframes necro-scythe-blade{0%{transform:rotate(-42deg) scale(.88);opacity:0}12%{transform:rotate(-31deg) scale(.96);opacity:1}54%{transform:rotate(-22deg) scale(1);opacity:1}63%{transform:rotate(42deg) scale(1.05);opacity:1}78%{transform:rotate(53deg) scale(1.02);opacity:.82}100%{transform:rotate(58deg) scale(.98);opacity:0}}
    @keyframes necro-scythe-impact{0%,57%{opacity:0;transform:scale(.35)}63%{opacity:1;transform:scale(1)}76%{opacity:.72;transform:scale(1.25)}100%{opacity:0;transform:scale(1.65)}}
    .necro-heartstopper-fx{width:74px;height:74px;margin:-37px 0 0 -37px;border-radius:50%;background:radial-gradient(circle,rgba(198,255,155,.5),rgba(73,181,62,.18) 52%,transparent 72%);border:2px solid rgba(124,255,92,.58);animation:necro-heartstop .75s ease-out forwards}
    @keyframes necro-heartstop{0%{opacity:0;transform:scale(.45)}28%{opacity:1}100%{opacity:0;transform:scale(1.5)}}
  `;
  document.head.appendChild(style);

  function playRemote(src,vol=.72){
    if(!src)return;
    try{const a=new Audio(src);a.preload='auto';a.volume=vol;a.play().catch(()=>{});return a}catch(_){}
  }
  function playNecroVoice(list,index=null,vol=.78){
    if(!Array.isArray(list)||!list.length)return -1;
    const i=Number.isInteger(index)?Math.max(0,Math.min(list.length-1,index)):Math.floor(Math.random()*list.length);
    try{playFile(abilityVoiceAudio,list[i])}catch(_){playRemote(list[i],vol)}
    return i;
  }
  function playNecroKillVoice(victim,killer,noNet=false,setName=null,index=null){
    let set=setName;
    if(!set)set=(victim?.id==='pudge'&&Math.random()<.5)?'pudge':'kill';
    const list=VOICES[set]||VOICES.kill;
    const i=playNecroVoice(list,index,.8);
    if(!noNet&&killer&&i>=0)window.emitNetVfx?.('necro-kill-voice',killer,{voiceSet:set,voiceIndex:i});
  }
  function center(h){
    if(!h)return null;
    const el=document.querySelector(`#hero-${h.team}-${h.id} .hero-portrait`);
    const r=el?.getBoundingClientRect?.();return r&&r.width?{x:r.left+r.width/2,y:r.top+r.height/2}:null;
  }
  function fxRoot(){
    let root=document.getElementById('necroFxRoot');
    if(!root){root=document.createElement('div');root.id='necroFxRoot';root.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483645';document.body.appendChild(root)}
    return root;
  }
  function addFx(cls,x,y,html=''){
    const el=document.createElement('div');el.className=cls;el.style.left=x+'px';el.style.top=y+'px';el.innerHTML=html;fxRoot().appendChild(el);return el;
  }
  function fmtNecro(n){const v=Math.round((Number(n)||0)*100)/100;return Number.isInteger(v)?String(v):String(v).replace(/0+$/,'').replace(/\.$/,'')}
  function targetRef(h){return h?{team:h.team,id:h.id}:null}
  function fromRef(r){return r&&Number.isInteger(r.team)?(G?.teams?.[r.team]||[]).find(h=>h.id===r.id&&!h.dead)||null:null}
  function pulseFx(caster,targets=[]){
    const c=center(caster);if(!c)return;
    const base=addFx('necro-pulse-fx',c.x,c.y,'<i class="ring"></i><i class="ring r2"></i><i class="core"></i>');
    setTimeout(()=>base.remove(),2580);
    targets.forEach((t,idx)=>{
      const p=center(t);if(!p)return;
      setTimeout(()=>{
        const orb=addFx('necro-pulse-orb',c.x,c.y,`<svg viewBox="0 0 64 64" aria-hidden="true"><path class="skull-shell" d="M32 5C18 5 9 15 9 28c0 10 5 17 13 20v8h6v-7h8v7h6v-8c8-3 13-10 13-20C55 15 46 5 32 5Z"/><ellipse class="skull-eye" cx="23" cy="29" rx="6" ry="7"/><ellipse class="skull-eye" cx="41" cy="29" rx="6" ry="7"/><path class="skull-jaw" d="M22 43h20v10c-3 4-17 4-20 0Z"/><path d="M32 35l-4 6h8Z" fill="#1b3b20"/><path d="M27 46v7M32 46v8M37 46v7" stroke="#214525" stroke-width="2"/></svg>`);
        const dx=p.x-c.x,dy=p.y-c.y;
        orb.animate([{transform:'translate(-50%,-50%) scale(.6)',opacity:.25},{transform:`translate(calc(-50% + ${dx*.48}px),calc(-50% + ${dy*.48}px)) scale(1.15)`,opacity:1,offset:.55},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.9)`,opacity:1}],{duration:900,easing:'cubic-bezier(.2,.72,.2,1)',fill:'forwards'});
        setTimeout(()=>{orb.remove();const hit=addFx('necro-pulse-impact',p.x,p.y,'');setTimeout(()=>hit.remove(),760)},860);
      },idx*85);
    });
  }
  function scytheFx(target){
    const p=center(target);if(!p)return;
    const el=addFx('necro-scythe-fx',p.x,p.y,`<i class="trail"></i><svg class="scythe-svg" viewBox="0 0 220 190" aria-hidden="true"><path class="scythe-handle" d="M139 171L89 60"/><path class="scythe-handle-hi" d="M136 169L88 63"/><path class="scythe-blade" d="M87 63C70 36 43 20 14 18c21-9 55-8 83 7 18 10 31 24 39 39-18-8-34-9-49-1Z"/><path class="scythe-blade-hi" d="M24 20c31 1 60 13 85 34"/></svg><i class="impact"></i>`);
    setTimeout(()=>el.remove(),4200);
  }
  function heartFx(target){
    const p=center(target);if(!p)return;const el=addFx('necro-heartstopper-fx',p.x,p.y,'');setTimeout(()=>el.remove(),800);
  }
  window.playNecrophosFx=function(ev){
    if(!ev)return;
    const caster=fromRef({team:ev.team,id:ev.heroId});
    if(ev.kind==='necro-pulse'){pulseFx(caster,(ev.targets||[]).map(fromRef).filter(Boolean));return}
    if(ev.kind==='necro-scythe'){const t=fromRef({team:ev.targetTeam,id:ev.targetId});if(t)scytheFx(t);return}
    if(ev.kind==='necro-heartstop'){const t=fromRef({team:ev.targetTeam,id:ev.targetId});if(t)heartFx(t);return}
    if(ev.kind==='necro-kill-voice'){playNecroVoice(VOICES[ev.voiceSet]||VOICES.kill,Number(ev.voiceIndex),.8);return}
  };

  const oldMkHero=mkHero;
  mkHero=function(id,team){
    const h=oldMkHero(id,team);
    if(id===ID){
      h.staticPortrait=false;
      h.portrait=PORTRAIT;
      h.img=DRAFT;
      h.necroKillRegenTimers=[];
      h.necroPermanentRegen=0;
      h._necroScytheVictim=null;
    }
    return h;
  };
  const oldBattlePortraitSrcFor=battlePortraitSrcFor;
  battlePortraitSrcFor=function(id){return id===ID?PORTRAIT:oldBattlePortraitSrcFor(id)};
  const oldDraftPortraitSrc=draftPortraitSrc;
  draftPortraitSrc=function(id){return id===ID?DRAFT:oldDraftPortraitSrc(id)};
  const oldDraftSlotPortraitSrc=draftSlotPortraitSrc;
  draftSlotPortraitSrc=function(id){return id===ID?DRAFT:oldDraftSlotPortraitSrc(id)};
  if(typeof miniHeroIcon==='function'){
    const oldMiniHeroIcon=miniHeroIcon;
    miniHeroIcon=function(id){return id===ID?ICON:oldMiniHeroIcon(id)};
  }

  const oldPlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h?.id!==ID)return oldPlayAttackSound(h,noNet);
    if(!noNet)window.emitNetVfx?.('audio-attack',h);
    playRemote(SFX.launch,.68);
    setTimeout(()=>playRemote(SFX.impact,.66),620);
  };
  ATTACK_IMPACT_MS[ID]=620;

  const oldPlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(h?.id!==ID)return oldPlaySkillSound(h,id,noNet);
    if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:id});
    if(id==='death_pulse')playRemote(SFX.pulse,.78);
    else if(id==='reapers_scythe'){playRemote(SFX.scythe,.78);playNecroVoice(VOICES.scythe,null,.82)}
  };

  function necro(team){
    return (G?.teams?.[team]||[]).find(h=>h.id===ID&&!h.dead&&!h.infested)||null;
  }
  function allyBehind(h){
    const line=currentLineOrder(h.team),i=line.indexOf(h);
    return i>=0&&i+1<line.length?line[i+1]:null;
  }
  function heartTargets(h){
    const depth=currentLineOrder(h.team).indexOf(h),enemy=currentLineOrder(1-h.team);
    if(depth===0)return enemy.slice(0,2);
    if(depth===1)return enemy.slice(0,1);
    return [];
  }
  function tickNecro(){
    if(!G||G.winner!==null)return;
    for(let t=0;t<2;t++){
      const h=necro(t);if(!h)continue;
      const timers=Array.isArray(h.necroKillRegenTimers)?h.necroKillRegenTimers:[];
      const temp=.5*timers.length,perm=Math.max(0,Number(h.necroPermanentRegen)||0),regen=temp+perm;
      if(regen>0)healHero(h,regen,'Heartstopper Aura');
      h.necroKillRegenTimers=timers.map(x=>Number(x)-1).filter(x=>x>0);

      for(const target of heartTargets(h)){
        if(!target||target.dead)continue;
        const raw=Math.max(0,(Number(target.maxHp)||0)*.2),amount=Math.max(.25,Math.floor((raw+1e-9)*4)/4); // floor to 0.25: 1.6 -> 1.5
        heartFx(target);
        window.emitNetVfx?.('necro-heartstop',h,{targetTeam:target.team,targetId:target.id});
        pureDamage(target,amount,`${logIcon(ID,'heartstopper')} Heartstopper Aura: `,h,{impactDelay:110});
        if(G.winner!==null)break;
      }
    }
  }

  const oldAwardHeroKill=awardHeroKill;
  awardHeroKill=function(victim,killer){
    const valid=!!(G&&victim&&killer&&killer.team!==victim.team);
    oldAwardHeroKill(victim,killer);
    if(!valid||killer?.id!==ID)return;
    playNecroKillVoice(victim,killer);
    killer.necroKillRegenTimers=Array.isArray(killer.necroKillRegenTimers)?killer.necroKillRegenTimers:[];
    killer.necroKillRegenTimers.push(3);
    addLog(`${logIcon(ID,'heartstopper')} ${killer.name}: убийство даёт +0.5 HP за общий ход на 3 общих хода.`);
    if(killer._necroScytheVictim===victim){
      killer.necroPermanentRegen=Math.max(0,Number(killer.necroPermanentRegen)||0)+.5;
      addLog(`${logIcon(ID,'reapers_scythe')} ${killer.name}: убийство Reaper's Scythe навсегда даёт +0.5 HP за каждый общий ход (всего +${killer.necroPermanentRegen}).`);
    }
  };

  const oldBeginActivation=beginActivation;
  beginActivation=function(){
    oldBeginActivation();
    if(!G||G.winner!==null)return;
    tickNecro();
    if(G&&G.winner===null)render();
  };

  const oldEnsureHeroNode=ensureHeroNode;
  ensureHeroNode=function(h){
    const d=oldEnsureHeroNode(h);
    if(h?.id===ID){
      const p=d.querySelector('.hero-portrait');
      if(p){
        const v=p.querySelector('video');
        if(v&&v.getAttribute('src')!==PORTRAIT){v.src=PORTRAIT;v.play().catch(()=>{})}
      }
      if(p&&!p.querySelector('.necro-heartstopper-badge')){
        const b=document.createElement('div');b.className='necro-heartstopper-badge';b.innerHTML=`<img src="${SKILLS.heart}" alt=""><span></span>`;p.appendChild(b);
      }
    }
    return d;
  };
  const oldRender=render;
  render=function(){
    oldRender();
    if(!G)return;
    for(const t of [0,1]){
      const h=necro(t),node=h?document.getElementById(`hero-${t}-${ID}`):null,b=node?.querySelector('.necro-heartstopper-badge span');
      if(b){
        const temp=(h.necroKillRegenTimers||[]).length*.5,perm=Number(h.necroPermanentRegen)||0,total=temp+perm;
        b.textContent=total>0?`+${fmtNecro(total)}`:'20%';
      }
    }
  };

  const oldSkill=skill;
  skill=function(id){
    const h=active?.();
    if(!h||h.id!==ID)return oldSkill(id);
    if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return;
    if(!DATA[ID].skills.some(s=>s.id===id&&!s.passive))return;
    if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}
    if((h.cd[id]||0)>1)return;
    armTargetSkillHint(h,id);

    if(id==='death_pulse'){
      const enemies=currentLineOrder(1-h.team).slice(0,2),ally=allyBehind(h),targets=[...enemies];
      playSkillSound(h,id);
      pulseFx(h,targets);
      window.emitNetVfx?.('necro-pulse',h,{targets:targets.map(targetRef)});
      putOnCooldown(h,id);
      G.resolving='necrophos-pulse';render();
      const match=G;
      setTimeout(()=>{
        if(G!==match)return;
        enemies.forEach(t=>{if(t&&!t.dead)spellDamage(t,1,`${logIcon(ID,'death_pulse')} Death Pulse: `,h,{impactDelay:30})});
        if(!h.dead)healHero(h,1,'Death Pulse');
        if(ally&&!ally.dead)healHero(ally,1,'Death Pulse');
        addSkillLog(h,id,`${h.name} выпускает Death Pulse: наносит по 1 урона ${enemies.length} враг${enemies.length===1?'у':'ам'} и лечит себя${ally?` и ${ally.name}`:''} на 1 HP.`);
        G.resolving=false;spend();render();
      },900);
      return;
    }

    if(id==='reapers_scythe'){
      chooseEnemy("Выберите врага для Reaper's Scythe",()=>true,t=>{
        const missing=Math.round(Math.max(0,(Number(t.maxHp)||0)-(Number(t.hp)||0))*100)/100;
        playSkillSound(h,id);
        scytheFx(t);
        window.emitNetVfx?.('necro-scythe',h,{targetTeam:t.team,targetId:t.id});
        putOnCooldown(h,id);
        G.resolving='necrophos-scythe';render();
        const match=G;
        setTimeout(()=>{
          if(G!==match)return;
          if(!t.dead){
            h._necroScytheVictim=t;
            try{pureDamage(t,missing,`${logIcon(ID,'reapers_scythe')} Reaper's Scythe: `,h,{impactDelay:40})}
            finally{h._necroScytheVictim=null}
          }
          addSkillLog(h,id,`${h.name} поражает ${t.name} Reaper's Scythe: ${fmtNecro(missing)} урона за ${fmtNecro(missing)} недостающего HP.`);
          G.resolving=false;spend();render();
        },2520);
      },id);return;
    }
    return oldSkill(id);
  };

  requestAnimationFrame(()=>{try{draft();updateDraft()}catch(_){}});
})();