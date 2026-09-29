(()=>{
  const ID='necrophos';
  const CDN='https://cdn.cloudflare.steamstatic.com/apps/dota2';
  const DRAFT=CDN+'/images/dota_react/heroes/necrolyte.png';
  const PORTRAIT=CDN+'/videos/dota_react/heroes/renders/necrolyte.webm';
  const ICON=DRAFT;
  const SKILLS={
    pulse:CDN+'/images/dota_react/abilities/necrolyte_death_pulse.png',
    heart:CDN+'/images/dota_react/abilities/necrolyte_heartstopper_aura.png',
    scythe:CDN+'/images/dota_react/abilities/necrolyte_reapers_scythe.png'
  };
  const SFX={
    pulse:'assets/audio/necrophos_death_pulse.mp3',
    scythe:'https://dota2.fandom.com/wiki/Special:Redirect/file/Reaper%27s_Scythe.mp3',
    launch:'assets/audio/necrophos_attack_launch.mp3',
    impact:'assets/audio/necrophos_attack_impact.mp3'
  };

  DATA[ID]={name:'NECROPHOS',hp:8,atk:1,img:DRAFT,skills:[
    {id:'death_pulse',name:'Death Pulse',cd:1,desc:'Necrophos выпускает волну смерти: наносит 1 урон переднему врагу и врагу сразу за ним, восстанавливает 1 HP себе и союзнику сразу позади Necrophos. Перезарядка: 1 ход Necrophos.'},
    {id:'heartstopper',name:'Heartstopper Aura — ПАССИВНАЯ',cd:0,passive:true,desc:'ПАССИВНАЯ. Каждый общий ход: если Necrophos стоит первым в своей линии, передний и второй враг теряют по 20% своего максимального HP; если Necrophos стоит вторым — эффект получает только передний враг. За каждое убийство любым способом Necrophos получает +0.5 восстановления HP каждый общий ход на 3 общих хода.'},
    {id:'reapers_scythe',name:"Reaper's Scythe",cd:4,desc:"Выбранная цель получает 1 урон за каждое недостающее HP от её максимального здоровья. Если Reaper's Scythe убивает врага, Necrophos навсегда получает +0.5 восстановления HP каждый общий ход. Перезарядка: 4 хода Necrophos."}
  ]};
  HERO_ICONS[ID]=ICON;
  SKILL_ICONS[ID]=[SKILLS.pulse,SKILLS.heart,SKILLS.scythe];
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
    .necro-heartstopper-badge{position:absolute;right:7px;top:7px;z-index:35;display:flex;align-items:center;gap:4px;padding:3px 6px;border-radius:999px;background:rgba(15,28,18,.82);border:1px solid rgba(117,255,92,.48);color:#caffb9;font:800 9px/1 system-ui;box-shadow:0 0 12px rgba(77,255,75,.18);pointer-events:none}
    .necro-heartstopper-badge img{width:16px;height:16px;border-radius:4px}
    .necro-pulse-fx,.necro-scythe-fx,.necro-heartstopper-fx{position:fixed;pointer-events:none;z-index:2147483645}
    .necro-pulse-fx .ring{position:absolute;left:-42px;top:-42px;width:84px;height:84px;border-radius:50%;border:4px solid rgba(155,255,92,.92);box-shadow:0 0 22px rgba(104,255,86,.72),inset 0 0 20px rgba(112,255,91,.35);animation:necro-pulse-ring 2.28s ease-out forwards}
    .necro-pulse-fx .ring.r2{animation-delay:.18s;border-width:2px}
    .necro-pulse-fx .core{position:absolute;left:-24px;top:-24px;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle,#efffcf 0,#adff73 28%,rgba(79,214,70,.62) 55%,transparent 74%);filter:blur(.5px);animation:necro-pulse-core 2.15s ease-out forwards}
    .necro-pulse-orb{position:fixed;width:25px;height:25px;margin:-12.5px 0 0 -12.5px;border-radius:50%;background:radial-gradient(circle,#f4ffd9 0 18%,#a7ff70 28%,#48d95f 55%,rgba(36,150,61,.15) 73%,transparent 76%);box-shadow:0 0 14px #77ff76;pointer-events:none;z-index:2147483646}
    .necro-pulse-impact{position:fixed;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;border:3px solid rgba(133,255,101,.86);box-shadow:0 0 22px rgba(92,255,88,.62),inset 0 0 20px rgba(77,255,91,.3);pointer-events:none;z-index:2147483646;animation:necro-impact .72s ease-out forwards}
    @keyframes necro-pulse-ring{0%{opacity:0;transform:scale(.35)}15%{opacity:1}100%{opacity:0;transform:scale(2.2)}}
    @keyframes necro-pulse-core{0%{opacity:.2;transform:scale(.4)}20%{opacity:1}100%{opacity:0;transform:scale(1.5)}}
    @keyframes necro-impact{0%{opacity:1;transform:scale(.25)}100%{opacity:0;transform:scale(1.45)}}
    .necro-scythe-fx{width:170px;height:190px;margin:-120px 0 0 -85px;transform-origin:50% 82%;animation:necro-scythe-swing 4.02s cubic-bezier(.18,.76,.18,1) forwards}
    .necro-scythe-fx .shaft{position:absolute;left:80px;top:36px;width:11px;height:148px;border-radius:7px;background:linear-gradient(90deg,#182313,#91d84d 43%,#253a18 78%);box-shadow:0 0 12px rgba(124,255,71,.42);transform:rotate(23deg)}
    .necro-scythe-fx .blade{position:absolute;left:29px;top:17px;width:119px;height:72px;border-radius:85% 8% 70% 12%;border-top:12px solid #d9f3cf;border-right:7px solid #87c971;transform:rotate(-19deg);filter:drop-shadow(0 0 9px rgba(142,255,91,.7))}
    .necro-scythe-fx .blade::after{content:'';position:absolute;right:-6px;top:-11px;width:88px;height:15px;border-radius:90% 5% 80% 10%;background:linear-gradient(90deg,#f4fff0,#9bd178 58%,transparent);transform:rotate(7deg)}
    .necro-scythe-fx .glow{position:absolute;left:45px;top:42px;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,rgba(215,255,181,.5),rgba(85,215,67,.22) 45%,transparent 72%);filter:blur(4px);animation:necro-scythe-glow 3.95s ease-in-out forwards}
    @keyframes necro-scythe-swing{0%{opacity:0;transform:rotate(-65deg) scale(.72)}12%{opacity:1;transform:rotate(-38deg) scale(.94)}63%{opacity:1;transform:rotate(-32deg) scale(1)}78%{opacity:1;transform:rotate(42deg) scale(1.06)}100%{opacity:0;transform:rotate(58deg) scale(1.06)}}
    @keyframes necro-scythe-glow{0%,100%{opacity:.15;transform:scale(.7)}55%{opacity:1;transform:scale(1.18)}}
    .necro-heartstopper-fx{width:74px;height:74px;margin:-37px 0 0 -37px;border-radius:50%;background:radial-gradient(circle,rgba(198,255,155,.5),rgba(73,181,62,.18) 52%,transparent 72%);border:2px solid rgba(124,255,92,.58);animation:necro-heartstop .75s ease-out forwards}
    @keyframes necro-heartstop{0%{opacity:0;transform:scale(.45)}28%{opacity:1}100%{opacity:0;transform:scale(1.5)}}
  `;
  document.head.appendChild(style);

  function playRemote(src,vol=.72){
    if(!src)return;
    try{const a=new Audio(src);a.preload='auto';a.volume=vol;a.play().catch(()=>{});return a}catch(_){}
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
  function targetRef(h){return h?{team:h.team,id:h.id}:null}
  function fromRef(r){return r&&Number.isInteger(r.team)?(G?.teams?.[r.team]||[]).find(h=>h.id===r.id&&!h.dead)||null:null}
  function pulseFx(caster,targets=[]){
    const c=center(caster);if(!c)return;
    const base=addFx('necro-pulse-fx',c.x,c.y,'<i class="ring"></i><i class="ring r2"></i><i class="core"></i>');
    setTimeout(()=>base.remove(),2580);
    targets.forEach((t,idx)=>{
      const p=center(t);if(!p)return;
      setTimeout(()=>{
        const orb=addFx('necro-pulse-orb',c.x,c.y,'');
        const dx=p.x-c.x,dy=p.y-c.y;
        orb.animate([{transform:'translate(-50%,-50%) scale(.6)',opacity:.25},{transform:`translate(calc(-50% + ${dx*.48}px),calc(-50% + ${dy*.48}px)) scale(1.15)`,opacity:1,offset:.55},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.9)`,opacity:1}],{duration:900,easing:'cubic-bezier(.2,.72,.2,1)',fill:'forwards'});
        setTimeout(()=>{orb.remove();const hit=addFx('necro-pulse-impact',p.x,p.y,'');setTimeout(()=>hit.remove(),760)},860);
      },idx*85);
    });
  }
  function scytheFx(target){
    const p=center(target);if(!p)return;
    const el=addFx('necro-scythe-fx',p.x,p.y,'<i class="glow"></i><i class="shaft"></i><i class="blade"></i>');
    setTimeout(()=>el.remove(),4100);
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
  };

  const oldMkHero=mkHero;
  mkHero=function(id,team){
    const h=oldMkHero(id,team);
    if(id===ID){
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
    else if(id==='reapers_scythe')playRemote(SFX.scythe,.74);
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
        const amount=Math.max(.25,Math.round((Number(target.maxHp)||0)*.2*100)/100);
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
        b.textContent=total>0?`+${total}/ход`:'20%';
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
        const missing=Math.max(0,(Number(t.maxHp)||0)-(Number(t.hp)||0));
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
          addSkillLog(h,id,`${h.name} поражает ${t.name} Reaper's Scythe: ${missing} урона за ${missing} недостающего HP.`);
          G.resolving=false;spend();render();
        },2520);
      },id);return;
    }
    return oldSkill(id);
  };

  requestAnimationFrame(()=>{try{draft();updateDraft()}catch(_){}});
})();