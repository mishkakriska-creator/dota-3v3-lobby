(() => {
  const ENIGMA_ID='enigma';
  const ENIGMA_SKILLS=[
    {id:'midnight_pulse',name:'Midnight Pulse',cd:3,desc:'Enigma создаёт Midnight Pulse на передней позиции врага на 3 общих хода. В начале каждого общего хода зона наносит стоящим в ней врагам 10% от их текущего здоровья. Урон округляется вниз до четверти HP: .75 / .50 / .25 / целого значения. Если Black Hole собрал на передней позиции нескольких врагов, Midnight Pulse поражает каждого из них. Перезарядка: 3 хода Enigma.'},
    {id:'black_hole',name:'Black Hole',cd:7,desc:'Enigma засасывает всех живых врагов к центру Black Hole на 3 общих хода и заставляет вражескую команду пропустить 1 следующий общий ход. Пока Black Hole активен, любой направленный в одного из засосанных врагов скилл действует на всю группу с полным уроном и эффектами. В начале каждого общего хода каждый враг получает 0.50 чистого урона. Перезарядка: 7 ходов Enigma.'}
  ];
  DATA[ENIGMA_ID]={name:'ENIGMA',hp:7,atk:1,img:'assets/enigma_portrait.png',skills:ENIGMA_SKILLS};
  HERO_ICONS[ENIGMA_ID]='assets/enigma_icon.png';
  SKILL_ICONS[ENIGMA_ID]=['assets/skills/enigma_midnight_pulse.png','assets/skills/enigma_black_hole.png'];
  const ENIGMA_AUDIO={
    turn:['assets/audio/enigma_move_13_ru.mp3','assets/audio/enigma_spawn_06_ru.mp3'],
    skills:{midnight_pulse:'assets/audio/enigma_midnight_pulse_cast.mp3',black_hole:'assets/audio/enigma_black_hole_cast.mp3'},
    kill:['assets/audio/enigma_kill_01_ru.mp3','assets/audio/enigma_kill_05_ru.mp3','assets/audio/enigma_kill_09_ru.mp3'],
    ioRival:['assets/audio/enigma_rival_14_ru.mp3','assets/audio/enigma_rival_15_ru.mp3','assets/audio/enigma_rival_16_ru.mp3','assets/audio/enigma_rival_17_ru.mp3'],
    pudgeSpecial:'assets/audio/enigma_killspecial_01_ru.mp3'
  };
  const ENIGMA_ATTACK_AUDIO={pre:'assets/audio/enigma_attack_pre.mp3',launch:'assets/audio/enigma_attack_launch.mp3',impact:'assets/audio/enigma_attack_impact.mp3'};
  AUDIO[ENIGMA_ID]={turn:ENIGMA_AUDIO.turn,skills:ENIGMA_AUDIO.skills};
  ATTACK_AUDIO[ENIGMA_ID]=ENIGMA_ATTACK_AUDIO.pre;
  ATTACK_IMPACT_MS[ENIGMA_ID]=280;
  if(!DRAFT_ORDER.includes(ENIGMA_ID))DRAFT_ORDER.push(ENIGMA_ID);
  if(typeof draftPortraitSrc==='function'){
    const oldDraftPortraitSrc=draftPortraitSrc;
    draftPortraitSrc=function(id){return id===ENIGMA_ID?'assets/enigma_portrait.png':oldDraftPortraitSrc(id)};
  }
  if(typeof draftSlotPortraitSrc==='function'){
    const oldDraftSlotPortraitSrc=draftSlotPortraitSrc;
    draftSlotPortraitSrc=function(id){return id===ENIGMA_ID?'assets/enigma_portrait.png':oldDraftSlotPortraitSrc(id)};
  }

  const oldPlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h?.id!==ENIGMA_ID)return oldPlayAttackSound(h,noNet);
    if(!h)return;
    if(!noNet)window.emitNetVfx?.('audio-attack',h);
    try{
      attackAudio.pause();attackAudio.currentTime=0;attackAudio.src=ENIGMA_ATTACK_AUDIO.pre+'?v=185';attackAudio.load();attackAudio.play().catch(()=>{});
      nativeSetTimeout(()=>playFile(sfxAudio,ENIGMA_ATTACK_AUDIO.launch),90);
      nativeSetTimeout(()=>playFile(miscAudio,ENIGMA_ATTACK_AUDIO.impact),Math.max(180,attackImpactMs(h)));
    }catch(e){}
  };

  function ensureEnigmaState(){
    if(!G)return;
    if(G.enigmaBlackHoleTurns===undefined)G.enigmaBlackHoleTurns=0;
    if(G.enigmaBlackHoleTeam===undefined)G.enigmaBlackHoleTeam=null;
    if(G.enigmaBlackHoleEnemyTeam===undefined)G.enigmaBlackHoleEnemyTeam=null;
    if(G.enigmaBlackHoleCasterId===undefined)G.enigmaBlackHoleCasterId=null;
    if(G.enigmaBlackHoleAnimatingUntil===undefined)G.enigmaBlackHoleAnimatingUntil=0;
    if(G.enigmaMidnightPulseTurns===undefined)G.enigmaMidnightPulseTurns=0;
    if(G.enigmaMidnightPulseTeam===undefined)G.enigmaMidnightPulseTeam=null;
    if(G.enigmaMidnightPulseCasterId===undefined)G.enigmaMidnightPulseCasterId=null;
    if(G.enigmaBlackHoleSkipEnemyTurns===undefined)G.enigmaBlackHoleSkipEnemyTurns=0;
  }
  function blackHoleActive(team=null){
    if(!G||(Number(G.enigmaBlackHoleTurns)||0)<=0||!Number.isInteger(G.enigmaBlackHoleEnemyTeam))return false;
    return team===null||team===undefined||G.enigmaBlackHoleEnemyTeam===team;
  }
  function blackHoleVictims(team=G?.enigmaBlackHoleEnemyTeam){
    if(!G||!Number.isInteger(team))return [];
    return (G.teams?.[team]||[]).filter(h=>h&&!h.dead&&!h.infested&&(Number(h.hp)||0)>0);
  }
  function midnightPulseActive(team=null){
    if(!G||(Number(G.enigmaMidnightPulseTurns)||0)<=0||!Number.isInteger(G.enigmaMidnightPulseTeam))return false;
    return team===null||team===undefined||G.enigmaMidnightPulseTeam===team;
  }
  function midnightPulseTargets(team=G?.enigmaMidnightPulseTeam){
    if(!G||!Number.isInteger(team))return [];
    return blackHoleActive(team)?blackHoleVictims(team):[frontHero(team)].filter(h=>h&&!h.dead&&!h.infested&&(Number(h.hp)||0)>0);
  }
  window.enigmaBlackHoleActive=blackHoleActive;
  window.enigmaDirectedTargets=team=>blackHoleActive(team)?blackHoleVictims(team):[];

  const enigmaKillAudio=new Audio();enigmaKillAudio.volume=.72;
  function randomFrom(list){return Array.isArray(list)&&list.length?list[Math.floor(Math.random()*list.length)]:null}
  function chooseEnigmaKillSrc(victim){
    if(victim?.id==='io'&&Math.random()<.5)return randomFrom(ENIGMA_AUDIO.ioRival);
    if(victim?.id==='pudge'&&Math.random()<.5)return ENIGMA_AUDIO.pudgeSpecial;
    return randomFrom(ENIGMA_AUDIO.kill);
  }
  function playEnigmaKillVoice(victim,killer=null,noNet=false,forcedSrc=''){
    const src=forcedSrc||chooseEnigmaKillSrc(victim);if(!src)return null;
    playFile(enigmaKillAudio,src);
    if(!noNet&&killer)window.emitNetVfx?.('enigma-kill-audio',killer,{audioSrc:src,targetId:victim?.id||null,targetTeam:victim?.team});
    return src;
  }
  window.playEnigmaKillVoice=playEnigmaKillVoice;

  function pulseAmount(h){
    const raw=Math.max(0,Number(h?.hp)||0)*.10;
    return Math.max(0,Math.floor((raw+1e-9)*4)/4);
  }
  function clone(v){
    if(v===undefined)return undefined;
    try{return structuredClone(v)}catch(_){try{return JSON.parse(JSON.stringify(v))}catch(__){return v}}
  }
  function effectSnapshot(h){
    if(!h)return{};
    const fields=['stun','sleep','nightmare','nightmareSkipped','nightmareCasterId','nightmareCasterTeam','silence','gripped','dismembered','tinkerBlindTurns','coldSnapTurns','burnTurns','disarmTurns','tornadoAirborne','tornadoLandingDamage','iceWallTurns','skadiTurns','skadiAppliedTurn','desolatorTurns','sfMarks','broodBiteTimers','magicDebuff'];
    const o={};for(const k of fields)o[k]=clone(h[k]);o.cd=clone(h.cd||{});o.armor=Number(h.armor)||0;return o;
  }
  function same(a,b){try{return JSON.stringify(a)===JSON.stringify(b)}catch(_){return a===b}}
  function mirrorEffectChanges(primary,before,victims){
    if(!primary||!before)return;
    const numericMax=['stun','silence','tinkerBlindTurns','coldSnapTurns','burnTurns','disarmTurns','tornadoAirborne','tornadoLandingDamage','iceWallTurns','skadiTurns','desolatorTurns'];
    const booleans=['sleep','nightmare','nightmareSkipped','gripped','dismembered'];
    for(const v of victims){
      if(!v||v===primary||v.dead)continue;
      for(const k of numericMax){if(!same(before[k],primary[k]))v[k]=Math.max(Number(v[k])||0,Number(primary[k])||0)}
      for(const k of booleans){if(!same(before[k],primary[k]))v[k]=!!primary[k]}
      if(!same(before.nightmareCasterId,primary.nightmareCasterId))v.nightmareCasterId=primary.nightmareCasterId;
      if(!same(before.nightmareCasterTeam,primary.nightmareCasterTeam))v.nightmareCasterTeam=primary.nightmareCasterTeam;
      if(!same(before.skadiAppliedTurn,primary.skadiAppliedTurn))v.skadiAppliedTurn=primary.skadiAppliedTurn;
      if(!same(before.magicDebuff,primary.magicDebuff))v.magicDebuff=clone(primary.magicDebuff);
      if((Number(primary.armor)||0)!==(Number(before.armor)||0))v.armor=(Number(v.armor)||0)+((Number(primary.armor)||0)-(Number(before.armor)||0));
      for(const k of ['sfMarks','broodBiteTimers']){
        const a=Array.isArray(before[k])?before[k]:[],b=Array.isArray(primary[k])?primary[k]:[];
        if(b.length>a.length){v[k]=Array.isArray(v[k])?v[k]:[];v[k].push(...clone(b.slice(a.length)))}
      }
      const oldCd=before.cd||{},newCd=primary.cd||{};v.cd=v.cd||{};
      for(const key of new Set([...Object.keys(oldCd),...Object.keys(newCd)])){
        const delta=(Number(newCd[key])||0)-(Number(oldCd[key])||0);
        if(delta)v.cd[key]=Math.max(0,(Number(v.cd[key])||0)+delta);
      }
    }
  }

  let selectingSkillId=null;
  let directedCtx=null;
  const nativeSetTimeout=window.setTimeout.bind(window);
  function runWithDirectedContext(ctx,fn){
    const prev=directedCtx;directedCtx=ctx;
    const before=effectSnapshot(ctx.primary);
    const oldTimeout=window.setTimeout;
    window.setTimeout=function(cb,ms,...args){
      if(typeof cb!=='function')return nativeSetTimeout(cb,ms,...args);
      return nativeSetTimeout(()=>runWithDirectedContext(ctx,()=>cb(...args)),ms);
    };
    try{return fn()}finally{
      mirrorEffectChanges(ctx.primary,before,ctx.victims);
      window.setTimeout=oldTimeout;
      directedCtx=prev;
    }
  }
  function wrapDirectedPick(onPick,skillId){
    if(typeof onPick!=='function')return onPick;
    return primary=>{
      if(!primary||!blackHoleActive(primary.team))return onPick(primary);
      const victims=blackHoleVictims(primary.team);
      if(victims.length<2)return onPick(primary);
      const ctx={primary,victims,skillId:String(skillId||''),routing:false,spent:false};
      return runWithDirectedContext(ctx,()=>onPick(primary));
    };
  }

  const baseAbilityDamage=abilityDamage;
  abilityDamage=function(target,n,src='',attacker=null,fx={},damageType='magic'){
    const ctx=directedCtx;
    if(ctx&&target===ctx.primary&&!ctx.routing){
      ctx.routing=true;let out;
      try{for(const victim of ctx.victims.filter(v=>v&&!v.dead))out=baseAbilityDamage(victim,n,src,attacker,fx,damageType)}finally{ctx.routing=false}
      return out;
    }
    return baseAbilityDamage(target,n,src,attacker,fx,damageType);
  };
  const baseDamage=damage;
  function baseDamageWithEnigmaKill(target,n,src='',attacker=null,fx={}){
    const wasAlive=!!target&&!target.dead&&(Number(target.hp)||0)>0;
    const out=baseDamage(target,n,src,attacker,fx);
    if(wasAlive&&target?.dead&&attacker?.id===ENIGMA_ID)playEnigmaKillVoice(target,attacker);
    return out;
  }
  damage=function(target,n,src='',attacker=null,fx={}){
    const ctx=directedCtx;
    if(ctx&&target===ctx.primary&&!ctx.routing){
      ctx.routing=true;let out;
      try{for(const victim of ctx.victims.filter(v=>v&&!v.dead))out=baseDamageWithEnigmaKill(victim,n,src,attacker,fx)}finally{ctx.routing=false}
      return out;
    }
    return baseDamageWithEnigmaKill(target,n,src,attacker,fx);
  };
  const baseSpend=spend;
  spend=function(){
    if(directedCtx){if(directedCtx.spent)return;directedCtx.spent=true}
    return baseSpend();
  };
  const basePlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(directedCtx){if(directedCtx.soundPlayed)return;directedCtx.soundPlayed=true}
    return basePlaySkillSound(h,id,noNet);
  };

  const baseChooseEnemy=chooseEnemy;
  chooseEnemy=function(promptText,filter=()=>true,onPick=null,spellId=''){
    const skillId=selectingSkillId||spellId;
    if(skillId&&G&&blackHoleActive(1-G.team)){
      const team=1-G.team,realFilter=h=>canTargetHero(h,spellId)&&filter(h),opts=blackHoleVictims(team).filter(realFilter);
      if(!opts.length){alert('Нет допустимой цели.');return null}
      targetMode={promptText,filter:realFilter,onPick:wrapDirectedPick(onPick,skillId),team,frontOnly:false,enigmaBlackHole:true};render();return null;
    }
    return baseChooseEnemy(promptText,filter,onPick,spellId);
  };
  const baseChooseEnemyAny=chooseEnemyAny;
  chooseEnemyAny=function(promptText,filter=()=>true,onPick=null,spellId=''){
    const skillId=selectingSkillId||spellId;
    if(skillId&&G&&blackHoleActive(1-G.team)){
      const team=1-G.team,realFilter=h=>canTargetHero(h,spellId)&&filter(h),opts=blackHoleVictims(team).filter(realFilter);
      if(!opts.length){alert('Нет подходящих целей.');return null}
      targetMode={promptText,filter:realFilter,onPick:wrapDirectedPick(onPick,skillId),team,frontOnly:false,enigmaBlackHole:true};render();return null;
    }
    return baseChooseEnemyAny(promptText,filter,onPick,spellId);
  };
  const baseChooseHeroes=chooseHeroes;
  chooseHeroes=function(promptText,teams=[G.team],filter=()=>true,onPick=null,spellId=''){
    const skillId=selectingSkillId||spellId;
    if(skillId&&Array.isArray(teams)&&teams.includes(1-G.team)&&blackHoleActive(1-G.team)){
      return baseChooseHeroes(promptText,teams,filter,wrapDirectedPick(onPick,skillId),spellId);
    }
    return baseChooseHeroes(promptText,teams,filter,onPick,spellId);
  };
  const baseChooseMistCoilTarget=chooseMistCoilTarget;
  chooseMistCoilTarget=function(promptText,onPick){
    const skillId=selectingSkillId;
    return baseChooseMistCoilTarget(promptText,skillId?wrapDirectedPick(onPick,skillId):onPick);
  };

  // Spirit Lance deals its damage after an awaited animation, outside the normal target callback.
  // This helper is also useful for any later async targeted spell implementation.
  window.enigmaGroupedSpellDamage=function(target,n,src='',attacker=null,fx={},type='magic'){
    if(target&&blackHoleActive(target.team)){
      const victims=blackHoleVictims(target.team);
      if(victims.length>1){for(const v of victims){if(type==='pure')baseAbilityDamage(v,n,src,attacker,fx,'pure');else baseAbilityDamage(v,n,src,attacker,fx,'magic')}return}
    }
    return type==='pure'?baseAbilityDamage(target,n,src,attacker,fx,'pure'):baseAbilityDamage(target,n,src,attacker,fx,'magic');
  };

  function ensureBlackHoleFx(){
    let bf=document.querySelector('#game .battlefield');if(!bf)return null;
    let fx=document.getElementById('enigmaBlackHoleFx');
    if(!fx){fx=document.createElement('div');fx.id='enigmaBlackHoleFx';fx.innerHTML='<i class="enigma-bh-a"></i><i class="enigma-bh-b"></i><i class="enigma-bh-core"></i><i class="enigma-bh-beam"></i><i class="enigma-bh-dust d1"></i><i class="enigma-bh-dust d2"></i><i class="enigma-bh-dust d3"></i>';bf.appendChild(fx)}
    return fx;
  }
  function removeBlackHoleFx(){document.getElementById('enigmaBlackHoleFx')?.remove()}
  function positionBlackHoleFx(){
    if(!G||!blackHoleActive()){removeBlackHoleFx();return}
    const bf=document.querySelector('#game .battlefield'),team=G.enigmaBlackHoleEnemyTeam,front=frontHero(team),card=front?document.getElementById(`hero-${team}-${front.id}`):null,fx=ensureBlackHoleFx();
    if(!bf||!card||!fx)return;
    const br=bf.getBoundingClientRect(),cr=card.getBoundingClientRect(),w=Math.max(210,Math.min(320,cr.width*1.36)),h=Math.max(210,Math.min(320,cr.height*.72));
    fx.style.left=(cr.left-br.left+cr.width/2-w/2)+'px';
    fx.style.top=(cr.top-br.top+cr.height/2-h/2)+'px';
    fx.style.width=w+'px';fx.style.height=h+'px';
  }
  const suctionAnimations=new Map();
  function clearBoardClasses(){
    document.querySelectorAll('.team.enigma-black-hole-team').forEach(x=>x.classList.remove('enigma-black-hole-team'));
    document.querySelectorAll('.hero.enigma-black-hole-victim').forEach(x=>{x.classList.remove('enigma-black-hole-victim');x.style.removeProperty('--bh-stack');x.style.removeProperty('--bh-z');x.style.removeProperty('--bh-left');x.style.removeProperty('--bh-top');x.style.removeProperty('--bh-center-left');x.style.removeProperty('--bh-center-top');x.style.removeProperty('--bh-angle');x.style.removeProperty('--bh-radius');x.style.removeProperty('--bh-period')});
  }
  function updateEnigmaBoardFx(){
    clearBoardClasses();
    if(!G||!blackHoleActive()){removeBlackHoleFx();return}
    const team=G.enigmaBlackHoleEnemyTeam,box=document.getElementById(`team${team}`),victims=blackHoleVictims(team),front=frontHero(team),frontNode=front?document.getElementById(`hero-${team}-${front.id}`):null;if(!box||!victims.length||!frontNode)return;
    box.classList.add('enigma-black-hole-team');
    const animating=Date.now()<(Number(G.enigmaBlackHoleAnimatingUntil)||0),boxRect=box.getBoundingClientRect(),frontRect=frontNode.getBoundingClientRect();
    const centerLeft=Math.max(0,frontRect.left-boxRect.left+frontRect.width/2),centerTop=Math.max(0,frontRect.top-boxRect.top+frontRect.height/2);
    if(!animating){
      const count=Math.max(1,victims.length);
      victims.forEach((h,i)=>{const d=document.getElementById(`hero-${team}-${h.id}`);if(!d)return;const a=suctionAnimations.get(d);if(a){try{a.cancel()}catch(_){}suctionAnimations.delete(d)}d.classList.add('enigma-black-hole-victim');d.style.setProperty('--bh-stack',String(i));d.style.setProperty('--bh-z',String(h===active(team)?80:58+i));d.style.setProperty('--bh-center-left',centerLeft+'px');d.style.setProperty('--bh-center-top',centerTop+'px');const baseAngle=(-82 + (360/count)*i);const radius=Math.max(42,Math.min(68, frontRect.width*.34 + (i%2?8:0)));const period=(3.8 + i*.35).toFixed(2)+'s';d.style.setProperty('--bh-angle',baseAngle+'deg');d.style.setProperty('--bh-radius',radius+'px');d.style.setProperty('--bh-period',period)});
    }
    positionBlackHoleFx();
  }
  function releaseBlackHoleVictims(team){
    if(!Number.isInteger(team))return;
    const box=document.getElementById(`team${team}`);
    if(!box)return;
    const nodes=[...box.querySelectorAll('.hero.enigma-black-hole-victim')];
    if(!nodes.length){box.classList.remove('enigma-black-hole-team');return}
    const before=new Map(nodes.map(d=>[d,d.getBoundingClientRect()]));
    for(const d of nodes){
      const a=suctionAnimations.get(d);if(a){try{a.cancel()}catch(_){}suctionAnimations.delete(d)}
      d.classList.remove('enigma-black-hole-victim');
      for(const k of['--bh-stack','--bh-z','--bh-left','--bh-top','--bh-center-left','--bh-center-top','--bh-angle','--bh-radius','--bh-period'])d.style.removeProperty(k);
    }
    box.classList.remove('enigma-black-hole-team');
    // Cards return to their real line slots. Animate the reflow instead of leaving the
    // WebAnimation fill state hanging over the board after Black Hole ends.
    requestAnimationFrame(()=>{
      for(const d of nodes){
        if(!d?.isConnected)continue;
        const a=before.get(d),b=d.getBoundingClientRect();if(!a||!b)continue;
        const dx=(a.left+a.width/2)-(b.left+b.width/2),dy=(a.top+a.height/2)-(b.top+b.height/2);
        try{d.animate([
          {translate:`${dx}px ${dy}px`,scale:'.90',rotate:'-4deg',filter:'brightness(.82) saturate(1.35)'},
          {translate:'0 0',scale:'1',rotate:'0deg',filter:'brightness(1) saturate(1)'}
        ],{duration:620,easing:'cubic-bezier(.18,.82,.18,1)',fill:'none'})}catch(_){}
      }
    });
  }

  function flyEnemiesIntoHole(team){
    const victims=blackHoleVictims(team),front=frontHero(team),frontNode=front?document.getElementById(`hero-${team}-${front.id}`):null;if(!frontNode)return;
    const tr=frontNode.getBoundingClientRect(),tx=tr.left+tr.width/2,ty=tr.top+tr.height/2,count=Math.max(1,victims.length);
    victims.forEach((h,i)=>{const d=document.getElementById(`hero-${team}-${h.id}`);if(!d)return;const r=d.getBoundingClientRect(),sx=r.left+r.width/2,sy=r.top+r.height/2;const baseAngle=(-82 + (360/count)*i)*(Math.PI/180),radius=Math.max(42,Math.min(68, tr.width*.34 + (i%2?8:0)));const targetX=tx+Math.cos(baseAngle)*radius,targetY=ty+Math.sin(baseAngle)*Math.max(18,radius*.50);const dx=targetX-sx,dy=targetY-sy;const sign=((team===0?-1:1)*(i%2===0?1:-1));const arcX=Math.max(48,Math.abs(dx)*.24)*sign,arcY=-Math.max(44,Math.min(110,Math.abs(dy)*.28));try{const old=suctionAnimations.get(d);if(old)old.cancel();const a=d.animate([
      {translate:'0 0',scale:'1',rotate:'0deg',filter:'brightness(1) saturate(1) blur(0px)',offset:0},
      {translate:`${dx*.14+arcX*.70}px ${dy*.10+arcY}px`,scale:'.99',rotate:`${sign*8}deg`,filter:'brightness(.97) saturate(1.08)',offset:.18},
      {translate:`${dx*.56+arcX*.24}px ${dy*.46+arcY*.28}px`,scale:'.94',rotate:`${sign*19}deg`,filter:'brightness(.86) saturate(1.20)',offset:.56},
      {translate:`${dx}px ${dy}px`,scale:'.89',rotate:`${sign*28}deg`,filter:'brightness(.78) saturate(1.46) blur(.45px)',offset:1}
    ],{duration:840+i*80,easing:'cubic-bezier(.18,.82,.14,1)',fill:'forwards'});suctionAnimations.set(d,a)}catch(_){}});
  }

  function playMidnightPulseFx(team){
    const bf=document.querySelector('#game .battlefield'),front=frontHero(team),card=front?document.getElementById(`hero-${team}-${front.id}`):null;if(!bf||!card)return;
    const br=bf.getBoundingClientRect(),cr=card.getBoundingClientRect();
    const fx=document.createElement('div');
    fx.className='enigma-midnight-pulse-fx';
    fx.innerHTML='<i class="mp-haze"></i><i class="mp-ring r1"></i><i class="mp-ring r2"></i><i class="mp-ring r3"></i><i class="mp-ring r4"></i><i class="mp-ring r5"></i><b class="mp-core"></b>';
    const cx=(cr.left-br.left)+(cr.width/2);
    const cy=(cr.top-br.top)+(cr.height*0.84);
    const cw=cr.width,ch=cr.height;
    let w=Math.max(236,Math.min(360,cw*1.9)),h=Math.max(118,Math.min(182,ch*.34));
    fx.style.left=(cx-w/2)+'px';
    fx.style.top=(cy-h/2)+'px';
    fx.style.width=w+'px';
    fx.style.height=h+'px';
    bf.appendChild(fx);
    nativeSetTimeout(()=>fx.remove(),2300);
  }
  window.playEnigmaFx=function(ev){
    if(!ev)return;
    if(ev.kind==='enigma-kill-audio'){playEnigmaKillVoice(null,null,true,String(ev.audioSrc||''));return}
    if(ev.kind==='enigma-black-hole-start'||ev.kind==='black-hole-start'){const team=Number(ev.targetTeam);nativeSetTimeout(()=>{flyEnemiesIntoHole(team);positionBlackHoleFx()},20);return}
    if(ev.kind==='enigma-midnight-pulse'||ev.kind==='midnight-pulse'){playMidnightPulseFx(Number(ev.targetTeam));return}
  };

  const baseBeginActivation=beginActivation;
  beginActivation=function(){
    ensureEnigmaState();
    if(G&&G.winner===null&&midnightPulseActive()){
      const team=G.enigmaMidnightPulseTeam;
      const pulseCaster=(G.teams?.[0]||[]).concat(G.teams?.[1]||[]).find(h=>h&&h.id===G.enigmaMidnightPulseCasterId)||null;
      const targets=midnightPulseTargets(team);
      if(targets.length){
        playMidnightPulseFx(team);
        for(const t of [...targets]){if(t&& !t.dead){const amount=pulseAmount(t);if(amount>0)baseDamageWithEnigmaKill(t,amount,`${logIcon(ENIGMA_ID,'midnight_pulse')} Midnight Pulse: `,pulseCaster,{impactDelay:120});}}
      }
      G.enigmaMidnightPulseTurns=Math.max(0,(Number(G.enigmaMidnightPulseTurns)||0)-1);
      if(G.enigmaMidnightPulseTurns<=0){
        addLog(`${logIcon(ENIGMA_ID,'midnight_pulse')}<span>Midnight Pulse затухает.</span>`);
        G.enigmaMidnightPulseTeam=null;G.enigmaMidnightPulseCasterId=null;
      }
      if(G.winner!==null)return;
    }
    if(G&&G.winner===null&&blackHoleActive()){
      const caster=G.teams?.[G.enigmaBlackHoleTeam]?.find(h=>h.id===G.enigmaBlackHoleCasterId)||null;
      const victims=blackHoleVictims();
      for(const v of [...victims]){if(!v.dead)baseDamageWithEnigmaKill(v,.5,`${logIcon(ENIGMA_ID,'black_hole')} Black Hole: `,caster,{damageType:'pure',impactDelay:80})}
      G.enigmaBlackHoleTurns=Math.max(0,(Number(G.enigmaBlackHoleTurns)||0)-1);
      if(G.enigmaBlackHoleTurns<=0){
        addLog(`${logIcon(ENIGMA_ID,'black_hole')}<span>Black Hole исчезает, враги возвращаются в линию.</span>`);
        const releasedTeam=G.enigmaBlackHoleEnemyTeam;releaseBlackHoleVictims(releasedTeam);G.enigmaBlackHoleTeam=null;G.enigmaBlackHoleEnemyTeam=null;G.enigmaBlackHoleCasterId=null;G.enigmaBlackHoleAnimatingUntil=0;G.enigmaBlackHoleSkipEnemyTurns=0;removeBlackHoleFx();
      }
      if(G.winner!==null)return;
    }
    if(G&&G.winner===null&&Number(G.enigmaBlackHoleSkipEnemyTurns||0)>0&&G.team===G.enigmaBlackHoleEnemyTeam){
      const h=active?.();
      addLog(`${logIcon(ENIGMA_ID,'black_hole')}<span>${h?.name||'Вражеский герой'} пропускает активацию из-за Black Hole.</span>`);
      G.enigmaBlackHoleSkipEnemyTurns=Math.max(0,Number(G.enigmaBlackHoleSkipEnemyTurns||0)-1);
      G.actions=0;render();nativeSetTimeout(()=>{if(G&&G.winner===null)endTurn(true)},650);return;
    }
    return baseBeginActivation();
  };

  const previousSkill=skill;
  skill=function(id){
    if(!G)return previousSkill(id);
    const h=active?.();
    if(h?.id===ENIGMA_ID&&['midnight_pulse','black_hole'].includes(id)){
      if(G.resolving||G.winner!==null||G.actions<1||targetMode)return;
      if(isHeroSilenced(h)){alert('Enigma обезмолвлен и не может использовать способность.');return}
      if((h.cd[id]||0)>1)return;
      ensureEnigmaState();
      if(id==='midnight_pulse'){
        playSkillSound(h,'midnight_pulse');
        const enemyTeam=1-h.team;
        if(!(blackHoleActive(enemyTeam)?blackHoleVictims(enemyTeam):[frontHero(enemyTeam)].filter(Boolean)).length){alert('Нет подходящей цели.');return}
        playMidnightPulseFx(enemyTeam);window.emitNetVfx?.('enigma-midnight-pulse',h,{targetTeam:enemyTeam,targetId:frontHero(enemyTeam)?.id||null});
        G.enigmaMidnightPulseTurns=3;G.enigmaMidnightPulseTeam=enemyTeam;G.enigmaMidnightPulseCasterId=h.id;
        putOnCooldown(h,'midnight_pulse');addSkillLog(h,'midnight_pulse',`${h.name} создаёт Midnight Pulse на передней позиции врага на 3 общих хода. В начале каждого общего хода зона наносит 10% от текущего HP.`);spend();render();return;
      }
      if(id==='black_hole'){
        playSkillSound(h,'black_hole');
        const enemyTeam=1-h.team;G.enigmaBlackHoleTurns=3;G.enigmaBlackHoleTeam=h.team;G.enigmaBlackHoleEnemyTeam=enemyTeam;G.enigmaBlackHoleCasterId=h.id;G.enigmaBlackHoleAnimatingUntil=Date.now()+900;G.enigmaBlackHoleSkipEnemyTurns=1;
        ensureBlackHoleFx();flyEnemiesIntoHole(enemyTeam);window.emitNetVfx?.('enigma-black-hole-start',h,{targetTeam:enemyTeam,targetId:frontHero(enemyTeam)?.id||null});
        putOnCooldown(h,'black_hole');addSkillLog(h,'black_hole',`${h.name} открывает Black Hole на 3 общих хода: враги стягиваются к центру, плавают вокруг воронки, пропускают 1 следующий общий ход и получают по 0.50 чистого урона каждый общий ход.`);spend();nativeSetTimeout(()=>{if(G&&blackHoleActive(enemyTeam)){render();positionBlackHoleFx()}},920);return;
      }
    }
    selectingSkillId=String(id||'');
    // Auto-positioned Shadowraze is still a directed positional spell. If Black Hole puts everyone
    // on the front position, the Raze impact is echoed to the whole packed group.
    let autoCtx=null;
    if(h&&blackHoleActive(1-h.team)&&['raze_near','raze_mid','raze_far'].includes(id)){
      const victims=blackHoleVictims(1-h.team),primary=frontHero(1-h.team);if(primary&&victims.length>1)autoCtx={primary,victims,skillId:id,routing:false,spent:false};
    }
    try{return autoCtx?runWithDirectedContext(autoCtx,()=>previousSkill(id)):previousSkill(id)}finally{selectingSkillId=null}
  };

  if(typeof castInvokedSpell==='function'){
    const baseCastInvokedSpell=castInvokedSpell;
    castInvokedSpell=function(h,id){selectingSkillId=String(id||'');try{return baseCastInvokedSpell(h,id)}finally{selectingSkillId=null}};
  }

  const baseOverlay=invokerOverlayEffects;
  invokerOverlayEffects=function(h){
    const out=baseOverlay(h);
    if(h&&!h.dead&&blackHoleActive(h.team))out.push({icon:'assets/skills/enigma_black_hole.png',tone:'bad',count:G.enigmaBlackHoleTurns,label:`Black Hole: герой плавает вокруг общей воронки • ещё ${G.enigmaBlackHoleTurns} общ. ход.`});
    if(h&&!h.dead&&midnightPulseActive(h.team))out.push({icon:'assets/skills/enigma_midnight_pulse.png',tone:'bad',count:G.enigmaMidnightPulseTurns,label:`Midnight Pulse: зона на передней позиции • ещё ${G.enigmaMidnightPulseTurns} общ. ход.`});
    return out;
  };

  const baseRender=render;
  render=function(){
    const r=baseRender();
    updateEnigmaBoardFx();
    const effects=document.getElementById('effects');
    if(effects&&G&&midnightPulseActive())effects.insertAdjacentHTML('beforeend',`<br><span class="enigma-field-line"><img src="assets/skills/enigma_midnight_pulse.png" alt=""> Midnight Pulse: ещё <b>${G.enigmaMidnightPulseTurns}</b> общ. ход. • зона на передней позиции врага</span>`);
    if(effects&&G&&blackHoleActive())effects.insertAdjacentHTML('beforeend',`<br><span class="enigma-field-line"><img src="assets/skills/enigma_black_hole.png" alt=""> Black Hole: ещё <b>${G.enigmaBlackHoleTurns}</b> общ. ход. • враги плавают вокруг общей воронки</span>`);
    return r;
  };
  window.render=render;
  window.addEventListener('resize',()=>{updateEnigmaBoardFx();positionBlackHoleFx()});

  // game.js rendered the draft before this extension existed.
  if(typeof draft==='function')draft();
})();
