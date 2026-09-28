(() => {
  const CHEN_ID='chen', SLOT_ID='chen_creeps';
  const CHEN_SKILLS=[
    {id:'persuasion',name:'Holy Persuasion',cd:3,desc:'Призывает одного крипа на выбор: Огр-громила, Дикокрыл-потрошитель, Сатир-мучитель или Сосновый налётчик. Одновременно можно контролировать максимум 2 крипов. Каждый живёт 8 общих ходов. За убийство крипа противник получает 1 золото. Перезарядка: 3 хода Chen.'},
    {id:'favor',name:'Divine Favor',cd:0,passive:true,desc:'Пассивно: все союзники и подконтрольные крипы восстанавливают 0.25 HP каждый общий ход и получают +1 броню.'},
    {id:'hand',name:'Hand of God',cd:4,desc:'Лечит всех союзных героев и подконтрольных крипов на 3 HP, затем ещё 2 общих хода лечит их на 1 HP за общий ход. Перезарядка: 4 хода Chen.'}
  ];
  DATA[CHEN_ID]={name:'CHEN',hp:8,atk:1,img:'assets/chen_draft_v2.webp',skills:CHEN_SKILLS};
  DATA[SLOT_ID]={name:'ПОДКОНТРОЛЬНЫЙ КРИП',hp:5,atk:.5,img:'assets/skills/chen_holy_persuasion.webp',skills:[]};
  HERO_ICONS[CHEN_ID]='assets/chen_icon_v2.webp';
  HERO_ICONS[SLOT_ID]='assets/skills/chen_holy_persuasion.webp';
  SKILL_ICONS[CHEN_ID]=['assets/skills/chen_holy_persuasion.webp','assets/skills/chen_divine_favor.webp','assets/skills/chen_hand_of_god.webp'];
  if(!DRAFT_ORDER.includes(CHEN_ID))DRAFT_ORDER.push(CHEN_ID);
  if(typeof draft==='function')draft();

  const CREEPS={
    ogre:{name:'ОГР-ГРОМИЛА',hp:5,atk:.5,portrait:'assets/portraits/chen_ogre.webm?v=4',icon:'assets/skills/chen_ogre_smash.webp',rosterIcon:'assets/chen_creep_ogre.webp',skill:'Ogre Smash!',skillDesc:'Оглушает переднего врага на 1 активацию и наносит ему 0.5 урона.'},
    wildwing:{name:'ДИКОКРЫЛ-ПОТРОШИТЕЛЬ',hp:4,atk:.5,portrait:'assets/portraits/chen_wildwing.webm?v=4',icon:'assets/skills/chen_hurricane.webp',rosterIcon:'assets/chen_creep_wildwing.webp',skill:'Hurricane',skillDesc:'Выбирает первого или второго врага и толкает его вперёд или назад на 1 позицию.'},
    satyr:{name:'САТИР-МУЧИТЕЛЬ',hp:5,atk:.5,portrait:'assets/portraits/chen_satyr.webm?v=4',icon:'assets/skills/chen_shockwave.webp',rosterIcon:'assets/chen_creep_satyr.webp',skill:'Shockwave',skillDesc:'Шоковая волна проходит по вражеской линии и наносит всем задетым врагам 0.75 урона.'},
    pinecone:{name:'СОСНОВЫЙ НАЛЁТЧИК',hp:4,atk:.5,portrait:'assets/portraits/chen_pinecone.webm?v=4',icon:'assets/skills/chen_seed_shot.webp',rosterIcon:'assets/chen_creep_pinecone.webp',skill:'Seed Shot',skillDesc:'Наносит выбранной цели 0.5 урона и может отскочить ещё в случайных врагов, нанося по 0.5.'}
  };
  const CREEP_ORDER=['ogre','wildwing','satyr','pinecone'];
  const CHEN_AUDIO_SRC='assets/audio/chen_audio_sprite.ogg?v=3';
  const CHEN_AUDIO_CLIPS={
    spawn1:[.200,.836],spawn2:[1.216,2.272],cast1:[3.668,1.646],item04:[5.494,2.090],
    test:[7.764,2.862],holyp1:[10.806,2.220],holyp3:[13.206,2.299],
    hand0:[15.685,2.727],hand1:[18.592,2.727],hand2:[21.499,2.727],hand5:[24.406,2.728],
    handv1:[27.313,2.247],handv2:[29.740,2.455],handv3:[32.375,2.430],
    kill1:[34.984,2.639],kill4:[37.803,1.881],kill11:[39.863,2.195],
    attack:[42.238,1.658]
  };
  function playChenClip(key,volume=.72){
    const clip=CHEN_AUDIO_CLIPS[key];if(!clip)return;
    const a=new Audio(CHEN_AUDIO_SRC);a.preload='auto';a.volume=volume;
    let started=false;
    const start=()=>{if(started)return;started=true;try{a.currentTime=clip[0]}catch(_){}
      a.play().catch(()=>{});setTimeout(()=>{try{a.pause();a.removeAttribute('src');a.load()}catch(_){}},Math.ceil(clip[1]*1000)+100)};
    if(a.readyState>=1)start();else a.addEventListener('loadedmetadata',start,{once:true});
  }
  function playChenRandom(keys,volume=.72){if(!keys?.length)return;playChenClip(keys[Math.floor(Math.random()*keys.length)],volume)}
  const CREEP_REMOTE_SFX={
    ogre:[['https://dota2.fandom.com/wiki/Special:Redirect/file/Ogre_Bruiser_Ogre_Smash%21_1.mp3',0],['https://dota2.fandom.com/wiki/Special:Redirect/file/Ogre_Bruiser_Ogre_Smash%21_2.mp3',1850]],
    satyr:[['https://dota2.fandom.com/wiki/Special:Redirect/file/Satyr_Tormenter_Shockwave_1.mp3',0],['https://dota2.fandom.com/wiki/Special:Redirect/file/Satyr_Tormenter_Shockwave_2.mp3',550]],
    wildwing:[['https://dota2.fandom.com/wiki/Special:Redirect/file/Wildwing_Ripper_Hurricane_1.mp3',0]],
    pinecone:[['https://dota2.fandom.com/wiki/Special:Redirect/file/Warpine_Raider_Seed_Shot_1.mp3',0],['https://dota2.fandom.com/wiki/Special:Redirect/file/Warpine_Raider_Seed_Shot_2.mp3',300]]
  };
  function playCreepSkillSound(kind){
    const parts=CREEP_REMOTE_SFX[kind]||[];
    parts.forEach(([src,delay])=>setTimeout(()=>{try{const a=new Audio(src);a.volume=.72;a.preload='auto';a.play().catch(()=>{});if(kind==='wildwing')setTimeout(()=>{try{a.pause();a.removeAttribute('src');a.load()}catch(_){}},2600)}catch(_){}},delay||0));
  }

  function creepFxLayer(){
    let layer=document.getElementById('combatFx');
    if(!layer){layer=document.createElement('div');layer.id='combatFx';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer)}
    return layer;
  }
  function creepFxPoint(h){
    if(!h)return null;let el=null;
    if(typeof isForgeSpiritTarget==='function'&&isForgeSpiritTarget(h)){
      const owner=typeof forgeSpiritOwner==='function'?forgeSpiritOwner(h):null;
      if(owner)el=document.querySelector(`#hero-${h.team}-${owner.id} .forge-spirit-card`);
    }else el=document.querySelector(`#hero-${h.team}-${h.id} .hero-portrait`);
    const r=el?.getBoundingClientRect?.();return r?{x:r.left+r.width/2,y:r.top+r.height/2}:null;
  }
  function pulseCreepCast(slot){
    const node=document.getElementById(`hero-${slot.team}-${SLOT_ID}`);if(!node)return;
    node.classList.remove('chen-creep-cast');void node.offsetWidth;node.classList.add('chen-creep-cast');
    setTimeout(()=>node.classList.remove('chen-creep-cast'),620);
  }
  function playSeedShotFx(slot,targets){
    pulseCreepCast(slot);
    const points=[creepFxPoint(slot),...(targets||[]).map(creepFxPoint)].filter(Boolean);
    if(points.length<2)return;
    const layer=creepFxLayer(),match=G?.matchId;
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1],dx=b.x-a.x,dy=b.y-a.y,delay=i*190;
      setTimeout(()=>{
        if(!G||G.matchId!==match)return;
        const nut=document.createElement('div');nut.className='chen-seed-shot-fx';nut.style.left=a.x+'px';nut.style.top=a.y+'px';nut.innerHTML='<i></i>';layer.appendChild(nut);
        nut.animate([
          {transform:'translate(-50%,-50%) rotate(0deg) scale(.82)',opacity:.35},
          {transform:`translate(calc(-50% + ${dx*.5}px),calc(-50% + ${dy*.5-42}px)) rotate(190deg) scale(1.08)`,opacity:1,offset:.55},
          {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(380deg) scale(.92)`,opacity:1}
        ],{duration:230,easing:'cubic-bezier(.18,.72,.24,1)',fill:'forwards'});
        setTimeout(()=>{
          if(!nut.isConnected)return;
          const impact=document.createElement('div');impact.className='chen-seed-shot-impact';impact.style.left=b.x+'px';impact.style.top=b.y+'px';layer.appendChild(impact);setTimeout(()=>impact.remove(),360);
        },205);
        setTimeout(()=>nut.remove(),300);
      },delay);
    }
  }
  function creepTargetRef(h){
    if(!h)return null;
    if(typeof isForgeSpiritTarget==='function'&&isForgeSpiritTarget(h))return{team:h.team,id:h.id||'forge_spirit',summon:true,ownerId:h.ownerId};
    return{team:h.team,id:h.id};
  }
  function creepTargetFromRef(ref){
    if(!ref||!Number.isInteger(ref.team))return null;
    if(ref.summon){
      const owner=typeof findHero==='function'?findHero(ref.team,ref.ownerId):null;
      return owner?.forgeSpirit||null;
    }
    if(ref.id===SLOT_ID)return slotForTeam(ref.team);
    return typeof findHero==='function'?findHero(ref.team,ref.id):null;
  }
  window.playChenSeedShotFx=function(ev){
    if(!ev||!Number.isInteger(ev.team))return;
    const slot=slotForTeam(ev.team);if(!slot)return;
    const targets=(Array.isArray(ev.targets)?ev.targets:[]).map(creepTargetFromRef).filter(Boolean);
    playSeedShotFx(slot,targets);
  };
  try{ATTACK_IMPACT_MS[CHEN_ID]=1080}catch(_){}

  const baseAbilitySheetHTML=abilitySheetHTML;
  abilitySheetHTML=function(id,useSplash=false){
    const html=baseAbilitySheetHTML(id,useSplash);if(id!==CHEN_ID)return html;
    const roster='<div class="chen-persuasion-roster">'+
      CREEP_ORDER.map(k=>{const c=CREEPS[k];return '<span class="chen-creep-roster-card"><span class="chen-creep-roster-head"><img src="'+c.rosterIcon+'" alt=""><b>'+c.name.replace('ОГР-ГРОМИЛА','Огр‑громила').replace('ДИКОКРЫЛ-ПОТРОШИТЕЛЬ','Дикокрыл‑потрошитель').replace('САТИР-МУЧИТЕЛЬ','Сатир‑мучитель').replace('СОСНОВЫЙ НАЛЁТЧИК','Сосновый налётчик')+'</b></span><small><strong>'+c.skill+':</strong> '+c.skillDesc+'</small></span>'}).join('')+
      '</div>';
    const needle='<div class="ability-desc">'+CHEN_SKILLS[0].desc+'</div>';
    return html.replace(needle,needle+roster);
  };

  const basePlayTurnVoice=playTurnVoice;
  playTurnVoice=function(h,noNet=false){
    if(!h)return;
    if(G&&active()!==h)return;
    if(h.id===SLOT_ID)return;
    if(h.id!==CHEN_ID)return basePlayTurnVoice(h,noNet);
    if(!noNet)window.emitNetVfx?.('audio-turn',h);
    playChenRandom(['spawn1','spawn2','cast1','item04'],.72);
  };
  const basePlayAttackSound=playAttackSound;
  playAttackSound=function(h,noNet=false){
    if(h?.id!==CHEN_ID)return basePlayAttackSound(h,noNet);
    if(!noNet)window.emitNetVfx?.('audio-attack',h);
    playChenClip('attack',.70);
  };
  const basePlaySkillSound=playSkillSound;
  playSkillSound=function(h,id,noNet=false){
    if(h?.id!==CHEN_ID)return basePlaySkillSound(h,id,noNet);
    if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:id});
    if(id==='persuasion'){playChenClip('test',.74);playChenRandom(['holyp1','holyp3'],.72);return}
    if(id==='hand'){playChenRandom(['hand0','hand1','hand2','hand5'],.76);playChenRandom(['handv1','handv2','handv3'],.72);return}
  };


  function chenForTeam(team){return (G?.teams?.[team]||[]).find(h=>h?.id===CHEN_ID&&!h.dead)||null}
  function slotForTeam(team){return (G?.teams?.[team]||[]).find(h=>h?.id===SLOT_ID&&!h.dead)||null}
  function isChenSlot(h){return !!h&&h.id===SLOT_ID}
  function currentCreep(slot){return slot?.chenCreeps?.[slot.chenCreepIndex||0]||null}
  function creepIcon(kind){return CREEPS[kind]?.icon||''}

  function syncSlot(slot){
    if(!slot)return;
    slot.chenCreeps=Array.isArray(slot.chenCreeps)?slot.chenCreeps:[];
    if(!slot.chenCreeps.length){slot.dead=true;slot.hp=0;return}
    slot.chenCreepIndex=Math.max(0,Math.min(slot.chenCreeps.length-1,Number(slot.chenCreepIndex)||0));
    const c=currentCreep(slot),d=CREEPS[c.kind];
    slot.dead=false;slot.name=d.name;slot.maxHp=c.maxHp;slot.hp=c.hp;slot.atk=d.atk;slot.baseAtk=d.atk;slot.armor=0;slot.portrait=d.portrait;slot.img='assets/skills/chen_holy_persuasion.webp';slot.staticPortrait=false;
  }
  function storeSlot(slot){const c=currentCreep(slot);if(!c)return;c.hp=Math.max(0,Number(slot.hp)||0);c.maxHp=Math.max(1,Number(slot.maxHp)||c.maxHp)}
  function makeCreep(kind){const d=CREEPS[kind];return{uid:`chen_${kind}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind,hp:d.hp,maxHp:d.hp,life:8,hotTurns:0,skillCd:0}}
  function makeSlot(team,kind){const slot=mkHero(SLOT_ID,team);slot.chenCreeps=[makeCreep(kind)];slot.chenCreepIndex=0;slot.ownerId=CHEN_ID;slot.items=[];slot.cd={};slot.itemCd={};syncSlot(slot);return slot}
  function removeSlotFromTeam(slot){
    if(!G||!slot)return;const arr=G.teams[slot.team],idx=arr.indexOf(slot);if(idx<0)return;
    const oldFront=G.front[slot.team]||0;arr.splice(idx,1);
    if(!arr.length){G.front[slot.team]=0;return}
    if(idx<oldFront)G.front[slot.team]=Math.max(0,oldFront-1);else if(idx===oldFront)G.front[slot.team]=oldFront%arr.length;else G.front[slot.team]=oldFront%arr.length;
    document.getElementById(`hero-${slot.team}-${SLOT_ID}`)?.remove();
  }
  function retireCreep(slot,index,{killed=false,attacker=null,expired=false}={}){
    if(!slot?.chenCreeps?.[index])return;
    const dead=slot.chenCreeps[index],name=CREEPS[dead.kind].name;
    slot.chenCreeps.splice(index,1);
    if(killed){const rewardTeam=1-slot.team;G.gold[rewardTeam]=(G.gold[rewardTeam]||0)+1;addLog(`${goldIcon()} Игрок ${rewardTeam+1} получает 1 золото за убийство ${name}.`)}
    if(expired)addLog(`${creepLogIcon(dead.kind)}<span>${name} исчезает: закончились 8 общих ходов.</span>`);
    if(!slot.chenCreeps.length){slot.dead=true;slot.hp=0;removeSlotFromTeam(slot);checkWin();return}
    slot.chenCreepIndex=Math.min(slot.chenCreepIndex||0,slot.chenCreeps.length-1);syncSlot(slot);
  }
  function creepLogIcon(kind){const src=creepIcon(kind);return src?`<img class="log-skill-icon" src="${src}" alt="">`:''}

  const baseDamage=damage;
  damage=function(h,n,src='',attacker=null,fx={}){
    if(!isChenSlot(h)){
      const wasAlive=!!h&&!h.dead&&(Number(h.hp)||0)>0;
      const out=baseDamage(h,n,src,attacker,fx);
      if(wasAlive&&h&&(h.dead||(Number(h.hp)||0)<=0)&&(attacker?.id===CHEN_ID||isChenSlot(attacker))&&!h._chenKillVoice){
        h._chenKillVoice=true;playChenRandom(['kill1','kill4','kill11'],.74);
      }
      return out;
    }
    if(!h||h.dead)return;storeSlot(h);n=Math.max(0,Number(n)||0);
    if(n>0){try{playDamageFx({team:h.team,heroId:h.id,amount:n,delay:Math.max(0,Number(fx?.impactDelay)||0)})}catch(_){} }
    h.hp=Math.max(0,(Number(h.hp)||0)-n);storeSlot(h);addLog(`${src}${h.name} получает ${n} урона.`);
    if(h.hp<=0){const idx=h.chenCreepIndex||0;h.dead=true;setTimeout(()=>{if(!G)return;retireCreep(h,idx,{killed:true,attacker});render()},0)}
    render();
  };

  const baseDisplayArmor=displayArmorValue;
  displayArmorValue=function(target){let v=baseDisplayArmor(target);if(target&&chenForTeam(target.team))v+=1;return v};

  function healCreepState(c,n){if(!c||n<=0)return 0;const before=c.hp;c.hp=Math.min(c.maxHp,c.hp+n);return c.hp-before}
  function healChenTeam(team,n,label){
    for(const h of G?.teams?.[team]||[]){
      if(h.dead)continue;
      if(isChenSlot(h)){storeSlot(h);for(const c of h.chenCreeps||[])healCreepState(c,n);syncSlot(h)}
      else healHero(h,n,label);
    }
  }
  function setHandHot(team,turns){for(const h of G?.teams?.[team]||[]){if(isChenSlot(h)){for(const c of h.chenCreeps||[])c.hotTurns=Math.max(c.hotTurns||0,turns)}else h.chenHandHotTurns=Math.max(h.chenHandHotTurns||0,turns)}}
  function tickChenGlobal(){
    if(!G)return;
    for(let team=0;team<2;team++){
      const chen=chenForTeam(team);
      if(chen){
        for(const h of G.teams[team]||[]){if(h.dead)continue;if(isChenSlot(h)){storeSlot(h);for(const c of h.chenCreeps||[])healCreepState(c,.25);syncSlot(h)}else healHero(h,.25,'Divine Favor')}
      }
      for(const h of [...(G.teams[team]||[])]){
        if(isChenSlot(h)&&!h.dead){
          storeSlot(h);
          for(let i=h.chenCreeps.length-1;i>=0;i--){const c=h.chenCreeps[i];c.life=Math.max(0,(c.life||0)-1);if((c.hotTurns||0)>0){healCreepState(c,1);c.hotTurns--}if(c.life<=0)retireCreep(h,i,{expired:true})}
          if(G.teams[team].includes(h))syncSlot(h);
        }else if(!h.dead&&(h.chenHandHotTurns||0)>0){healHero(h,1,'Hand of God');h.chenHandHotTurns--}
      }
    }
  }
  const baseBeginActivation=beginActivation;
  beginActivation=function(){const r=baseBeginActivation();if(G&&G.winner===null){const h=active();if(isChenSlot(h)){for(const c of h.chenCreeps||[])if(c.skillCd>0)c.skillCd=Math.max(0,c.skillCd-1)}tickChenGlobal();render()}return r};

  function summonChoice(chen){
    if(slotForTeam(chen.team)?.chenCreeps?.length>=2){alert('У Chen уже максимум 2 подконтрольных крипа.');return}
    document.querySelector('.chen-choice-overlay')?.remove();
    const ov=document.createElement('div');ov.className='chen-choice-overlay';
    ov.innerHTML=`<div class="chen-choice-panel"><div class="chen-choice-title"><img src="${skillIcon(CHEN_ID,'persuasion')}" alt=""><b>HOLY PERSUASION</b><button type="button" class="chen-choice-close">×</button></div><div class="chen-choice-grid">${CREEP_ORDER.map(k=>{const c=CREEPS[k];return `<button type="button" data-chen-creep="${k}"><video src="${c.portrait}" autoplay muted loop playsinline></video><b>${c.name}</b><span>❤️ ${c.hp} · ⚔️ ${c.atk}</span><small>${c.skill}</small></button>`}).join('')}</div></div>`;
    document.body.appendChild(ov);ov.querySelector('.chen-choice-close').onclick=()=>ov.remove();
    ov.querySelectorAll('[data-chen-creep]').forEach(b=>b.onclick=()=>{const kind=b.dataset.chenCreep;ov.remove();summonCreep(chen,kind)});
  }
  function summonCreep(chen,kind){
    let slot=slotForTeam(chen.team);
    if(slot){storeSlot(slot);if(slot.chenCreeps.length>=2)return;slot.chenCreeps.push(makeCreep(kind));syncSlot(slot)}
    else{
      slot=makeSlot(chen.team,kind);
      const arr=G.teams[chen.team],front=G.front[chen.team]||0,chenIndex=arr.indexOf(chen);
      const insertAt=chenIndex>=0?chenIndex+1:arr.length;
      // The controlled-creep card lives directly behind Chen in the CURRENT circular line,
      // not at the very back of the whole team.
      arr.splice(insertAt,0,slot);
      if(insertAt<=front)G.front[chen.team]=front+1;
    }
    putOnCooldown(chen,'persuasion');addSkillLog(chen,'persuasion',`${chen.name} подчиняет ${CREEPS[kind].name} на 8 общих ходов.`);spend();render();
  }
  function switchCreep(slot,index){if(!slot||active()!==slot||targetMode||index===slot.chenCreepIndex||!slot.chenCreeps?.[index])return;storeSlot(slot);slot.chenCreepIndex=index;syncSlot(slot);render()}

  function lineEnemyAtSameDepth(slot){const depth=currentLineOrder(slot.team).indexOf(slot);const enemies=currentLineOrder(1-slot.team);return depth>=0?enemies[depth]||null:null}
  function moveForwardOne(target){
    if(!target||target.dead||isForgeSpiritTarget(target))return false;const order=currentLineOrder(target.team),d=order.indexOf(target);if(d<=0)return false;
    const ahead=order[d-1],arr=G.teams[target.team],a=arr.indexOf(target),b=arr.indexOf(ahead);if(a<0||b<0)return false;[arr[a],arr[b]]=[arr[b],arr[a]];return true;
  }
  function markCreepSkillUsed(slot){const c=currentCreep(slot);if(c)c.skillCd=2}
  function directionChoice(slot,target){
    const order=currentLineOrder(target.team),d=order.indexOf(target),canF=d>0,canB=d>=0&&d<order.length-1;
    const ov=document.createElement('div');ov.className='chen-direction-overlay';ov.innerHTML=`<div class="chen-direction-panel"><b>HURRICANE — направление</b><span>${target.name}</span><div><button data-dir="forward" ${canF?'':'disabled'}>ТОЛКНУТЬ ВПЕРЁД</button><button data-dir="back" ${canB?'':'disabled'}>ТОЛКНУТЬ НАЗАД</button></div><button class="chen-direction-cancel">Отмена</button></div>`;document.body.appendChild(ov);
    ov.querySelector('.chen-direction-cancel').onclick=()=>ov.remove();
    ov.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{playCreepSkillSound('wildwing');pulseCreepCast(slot);const dir=b.dataset.dir,moved=dir==='forward'?moveForwardOne(target):knockBackOne(target);ov.remove();markCreepSkillUsed(slot);addLog(`${creepLogIcon('wildwing')}<span>Hurricane: ${target.name} ${moved?(dir==='forward'?'сдвинут вперёд на 1 позицию':'отброшен назад на 1 позицию'):'остаётся на месте'}.</span>`);spend();render()});
  }
  function useCreepSkill(slot){
    if(!G||active()!==slot||slot.dead||G.actions<1||targetMode)return;const c=currentCreep(slot);if(!c||c.skillCd>0)return;const kind=c.kind;
    if(kind==='ogre'){
      const t=frontHero(1-slot.team);if(!t||t.dead){alert('Нет переднего врага для Ogre Smash!.');return}
      playCreepSkillSound(kind);pulseCreepCast(slot);damage(t,.5,`${creepLogIcon(kind)} Ogre Smash!: `,slot,{impactDelay:100});t.stun=Math.max(Number(t.stun)||0,1);addLog(`${creepLogIcon(kind)}<span>Ogre Smash! оглушает ${t.name} на 1 активацию.</span>`);markCreepSkillUsed(slot);spend();return;
    }
    if(kind==='satyr'){
      const targets=currentLineOrder(1-slot.team).filter(x=>!x.dead);if(!targets.length)return;playCreepSkillSound(kind);pulseCreepCast(slot);for(const t of targets)spellDamage(t,.75,`${creepLogIcon(kind)} Shockwave: `,slot,{impactDelay:120});addLog(`${creepLogIcon(kind)}<span>Shockwave проходит по вражеской линии и наносит каждому задетому врагу 0.75 урона.</span>`);markCreepSkillUsed(slot);spend();return;
    }
    if(kind==='wildwing'){
      const opts=currentLineOrder(1-slot.team).slice(0,2);if(!opts.length)return;targetMode={promptText:'Выберите первого или второго врага для Hurricane',filter:h=>opts.includes(h),onPick:t=>directionChoice(slot,t),team:1-slot.team,frontOnly:false,icon:creepIcon(kind)};render();return;
    }
    if(kind==='pinecone'){
      chooseEnemyAny('Выберите врага для Seed Shot',()=>true,t=>{
        const hit=[t],pool=currentLineOrder(1-slot.team).filter(x=>!x.dead);
        // Each bounce rolls independently. The same hero — including the first target —
        // may be selected again on the next bounce.
        for(let i=0;i<2&&pool.length;i++)hit.push(pool[Math.floor(Math.random()*pool.length)]);
        playCreepSkillSound(kind);playSeedShotFx(slot,hit);
        window.emitNetVfx?.('chen-seed-shot',slot,{targets:hit.map(creepTargetRef).filter(Boolean)});
        damage(t,.5,`${creepLogIcon(kind)} Seed Shot: `,slot,{impactDelay:210});
        for(let i=1;i<hit.length;i++){const n=hit[i];setTimeout(()=>damage(n,.5,`${creepLogIcon(kind)} Seed Shot — отскок: `,slot,{impactDelay:30}),190*i)}
        addLog(`${creepLogIcon(kind)}<span>Seed Shot поражает ${hit.map(x=>x.name).join(' → ')} по 0.5 урона.</span>`);markCreepSkillUsed(slot);spend()
      },'');if(targetMode){targetMode.icon=creepIcon(kind);render()}return;
    }
  }

  const baseSkill=skill;
  skill=function(id){
    const h=active();if(h?.id!==CHEN_ID)return baseSkill(id);
    if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return;if(isHeroSilenced(h)){alert('Chen обезмолвлен и не может использовать способности.');return}if((h.cd?.[id]||0)>1)return;
    armTargetSkillHint(h,id);
    if(id==='persuasion'){playSkillSound(h,'persuasion');summonChoice(h);return}
    if(id==='hand'){playSkillSound(h,'hand');healChenTeam(h.team,3,'Hand of God');setHandHot(h.team,2);putOnCooldown(h,'hand');addSkillLog(h,'hand',`${h.name} использует Hand of God: вся команда и подконтрольные крипы получают 3 HP, затем ещё 2 общих хода будут лечиться на 1 HP.`);spend();return}
    return baseSkill(id);
  };

  function patchCard(slot){
    const node=document.getElementById(`hero-${slot.team}-${SLOT_ID}`);if(!node)return;syncSlot(slot);
    const v=node.querySelector('.hero-portrait video');if(v&&v.dataset.chenSrc!==slot.portrait){v.dataset.chenSrc=slot.portrait;v.src=slot.portrait;v.load();v.play().catch(()=>{})}
    node.classList.add('chen-creep-slot');
    let tabs=node.querySelector('.chen-creep-tabs');if(!tabs){tabs=document.createElement('div');tabs.className='chen-creep-tabs';node.querySelector('.hero-portrait')?.appendChild(tabs)}
    tabs.innerHTML=(slot.chenCreeps||[]).map((c,i)=>`<button type="button" data-creep-index="${i}" class="${i===(slot.chenCreepIndex||0)?'selected':''}" title="${CREEPS[c.kind].name}"><video src="${CREEPS[c.kind].portrait}" autoplay muted loop playsinline></video><span>${c.hp}/${c.maxHp}</span><small>${c.life}</small></button>`).join('');
    tabs.classList.toggle('solo',(slot.chenCreeps||[]).length<2);
    tabs.querySelectorAll('button').forEach(b=>{b.disabled=active()!==slot||!!targetMode;b.onclick=e=>{e.preventDefault();e.stopPropagation();switchCreep(slot,Number(b.dataset.creepIndex))}});
    const inspect=node.querySelector('.inspect-hero');if(inspect){inspect.textContent=(slot.chenCreeps||[]).length>1?'ПЕРЕКЛЮЧИТЬ КРИПА':'КРИП';inspect.disabled=true}
    const status=node.querySelector('.status');if(status){const c=currentCreep(slot);status.innerHTML=`<span class="status-badge good"><img src="${creepIcon(c.kind)}" alt=""><span>${c.life} общ. ход.</span></span>`}
  }
  function patchActions(){
    const h=active();if(!isChenSlot(h)||h.dead||targetMode)return;const acts=document.getElementById('actions');if(!acts)return;
    acts.querySelectorAll('.skill').forEach(x=>x.remove());const c=currentCreep(h);if(!c)return;const d=CREEPS[c.kind];
    const b=document.createElement('button');b.className='skill chen-creep-skill';b.innerHTML=`<img class="skill-icon" src="${d.icon}"><span>${d.skill}${c.skillCd>0?` [КД ${c.skillCd}]`:''}</span>`;b.disabled=G.actions<1||c.skillCd>0;b.onclick=()=>useCreepSkill(h);acts.appendChild(b);
    if((h.chenCreeps||[]).length>1){const sw=document.createElement('button');sw.className='skill chen-switch-creep';sw.innerHTML='<span>↔ СМЕНИТЬ КРИПА</span>';sw.disabled=false;sw.onclick=()=>switchCreep(h,((h.chenCreepIndex||0)+1)%h.chenCreeps.length);acts.appendChild(sw)}
  }
  const baseRender=render;
  render=function(){
    if(G)for(const team of G.teams||[])for(const h of team||[])if(isChenSlot(h)&&!h.dead)syncSlot(h);
    const r=baseRender();if(G){for(const team of G.teams||[])for(const h of team||[])if(isChenSlot(h)&&!h.dead)patchCard(h);patchActions()}return r;
  };

  try{if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(CHEN_ID))HERO_IDS.push(CHEN_ID);if(HERO_META&&!HERO_META[CHEN_ID])HERO_META[CHEN_ID]={name:'CHEN',icon:'assets/chen_icon_v2.webp'}}catch(_){}
})();