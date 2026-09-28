(() => {
  const CHEN_ID='chen', SLOT_ID='chen_creeps';
  const CHEN_SKILLS=[
    {id:'persuasion',name:'Holy Persuasion',cd:3,desc:'Призывает одного крипа на выбор: Огр-громила, Дикокрыл-потрошитель, Сатир-мучитель или Сосновый налётчик. Одновременно можно контролировать максимум 2 крипов. Каждый живёт 8 общих ходов. За убийство крипа противник получает 1 золото. Перезарядка: 3 хода Chen.'},
    {id:'favor',name:'Divine Favor',cd:0,passive:true,desc:'Пассивно: все союзники и подконтрольные крипы восстанавливают 0.25 HP каждый общий ход и получают +1 броню.'},
    {id:'hand',name:'Hand of God',cd:4,desc:'Лечит всех союзных героев и подконтрольных крипов на 3 HP, затем ещё 2 общих хода лечит их на 1 HP за общий ход. Перезарядка: 4 хода Chen.'}
  ];
  DATA[CHEN_ID]={name:'CHEN',hp:8,atk:1,img:'assets/chen_art.webp',skills:CHEN_SKILLS};
  DATA[SLOT_ID]={name:'ПОДКОНТРОЛЬНЫЙ КРИП',hp:5,atk:.5,img:'assets/skills/chen_holy_persuasion.webp',skills:[]};
  HERO_ICONS[CHEN_ID]='assets/chen_icon.webp';
  HERO_ICONS[SLOT_ID]='assets/skills/chen_holy_persuasion.webp';
  SKILL_ICONS[CHEN_ID]=['assets/skills/chen_holy_persuasion.webp','assets/skills/chen_divine_favor.webp','assets/skills/chen_hand_of_god.webp'];
  if(!DRAFT_ORDER.includes(CHEN_ID))DRAFT_ORDER.push(CHEN_ID);
  if(typeof draft==='function')draft();

  const CREEPS={
    ogre:{name:'ОГР-ГРОМИЛА',hp:5,atk:.5,portrait:'assets/portraits/chen_ogre.webm',icon:'assets/skills/chen_ogre_smash.webp',skill:'Ogre Smash!'},
    wildwing:{name:'ДИКОКРЫЛ-ПОТРОШИТЕЛЬ',hp:4,atk:.5,portrait:'assets/portraits/chen_wildwing.webm',icon:'assets/skills/chen_hurricane.webp',skill:'Hurricane'},
    satyr:{name:'САТИР-МУЧИТЕЛЬ',hp:5,atk:.5,portrait:'assets/portraits/chen_satyr.webm',icon:'assets/skills/chen_shockwave.webp',skill:'Shockwave'},
    pinecone:{name:'СОСНОВЫЙ НАЛЁТЧИК',hp:4,atk:.5,portrait:'assets/portraits/chen_pinecone.webm',icon:'assets/skills/chen_seed_shot.webp',skill:'Seed Shot'}
  };
  const CREEP_ORDER=['ogre','wildwing','satyr','pinecone'];

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
  function makeCreep(kind){const d=CREEPS[kind];return{uid:`chen_${kind}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind,hp:d.hp,maxHp:d.hp,life:8,hotTurns:0}}
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
    if(!isChenSlot(h))return baseDamage(h,n,src,attacker,fx);
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
  beginActivation=function(){const r=baseBeginActivation();if(G&&G.winner===null){tickChenGlobal();render()}return r};

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
    else{slot=makeSlot(chen.team,kind);G.teams[chen.team].push(slot)}
    putOnCooldown(chen,'persuasion');addSkillLog(chen,'persuasion',`${chen.name} подчиняет ${CREEPS[kind].name} на 8 общих ходов.`);spend();render();
  }
  function switchCreep(slot,index){if(!slot||active()!==slot||targetMode||index===slot.chenCreepIndex||!slot.chenCreeps?.[index])return;storeSlot(slot);slot.chenCreepIndex=index;syncSlot(slot);render()}

  function lineEnemyAtSameDepth(slot){const depth=currentLineOrder(slot.team).indexOf(slot);const enemies=currentLineOrder(1-slot.team);return depth>=0?enemies[depth]||null:null}
  function moveForwardOne(target){
    if(!target||target.dead||isForgeSpiritTarget(target))return false;const order=currentLineOrder(target.team),d=order.indexOf(target);if(d<=0)return false;
    const ahead=order[d-1],arr=G.teams[target.team],a=arr.indexOf(target),b=arr.indexOf(ahead);if(a<0||b<0)return false;[arr[a],arr[b]]=[arr[b],arr[a]];return true;
  }
  function directionChoice(slot,target){
    const order=currentLineOrder(target.team),d=order.indexOf(target),canF=d>0,canB=d>=0&&d<order.length-1;
    const ov=document.createElement('div');ov.className='chen-direction-overlay';ov.innerHTML=`<div class="chen-direction-panel"><b>HURRICANE — направление</b><span>${target.name}</span><div><button data-dir="forward" ${canF?'':'disabled'}>ТОЛКНУТЬ ВПЕРЁД</button><button data-dir="back" ${canB?'':'disabled'}>ТОЛКНУТЬ НАЗАД</button></div><button class="chen-direction-cancel">Отмена</button></div>`;document.body.appendChild(ov);
    ov.querySelector('.chen-direction-cancel').onclick=()=>ov.remove();
    ov.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{const dir=b.dataset.dir,moved=dir==='forward'?moveForwardOne(target):knockBackOne(target);ov.remove();addLog(`${creepLogIcon('wildwing')}<span>Hurricane: ${target.name} ${moved?(dir==='forward'?'сдвинут вперёд на 1 позицию':'отброшен назад на 1 позицию'):'остаётся на месте'}.</span>`);spend();render()});
  }
  function useCreepSkill(slot){
    if(!G||active()!==slot||slot.dead||G.actions<1||targetMode)return;const c=currentCreep(slot);if(!c)return;const kind=c.kind;
    if(kind==='ogre'){
      const t=frontHero(1-slot.team);if(!t||t.dead){alert('Нет переднего врага для Ogre Smash!.');return}
      damage(t,.5,`${creepLogIcon(kind)} Ogre Smash!: `,slot,{impactDelay:100});t.stun=Math.max(Number(t.stun)||0,1);addLog(`${creepLogIcon(kind)}<span>Ogre Smash! оглушает ${t.name} на 1 активацию.</span>`);spend();return;
    }
    if(kind==='satyr'){
      const targets=currentLineOrder(1-slot.team).filter(x=>!x.dead);if(!targets.length)return;for(const t of targets)spellDamage(t,.75,`${creepLogIcon(kind)} Shockwave: `,slot,{impactDelay:120});addLog(`${creepLogIcon(kind)}<span>Shockwave проходит по вражеской линии и наносит каждому задетому врагу 0.75 урона.</span>`);spend();return;
    }
    if(kind==='wildwing'){
      const opts=currentLineOrder(1-slot.team).slice(0,2);if(!opts.length)return;targetMode={promptText:'Выберите первого или второго врага для Hurricane',filter:h=>opts.includes(h),onPick:t=>directionChoice(slot,t),team:1-slot.team,frontOnly:false,icon:creepIcon(kind)};render();return;
    }
    if(kind==='pinecone'){
      chooseEnemyAny('Выберите врага для Seed Shot',()=>true,t=>{const hit=[t];damage(t,.5,`${creepLogIcon(kind)} Seed Shot: `,slot,{impactDelay:100});let pool=currentLineOrder(1-slot.team).filter(x=>!x.dead&&!hit.includes(x));for(let i=0;i<2&&pool.length;i++){const n=pool.splice(Math.floor(Math.random()*pool.length),1)[0];hit.push(n);setTimeout(()=>damage(n,.5,`${creepLogIcon(kind)} Seed Shot — отскок: `,slot,{impactDelay:80}),180*(i+1))}addLog(`${creepLogIcon(kind)}<span>Seed Shot поражает ${hit.map(x=>x.name).join(' → ')} по 0.5 урона.</span>`);spend()},'');if(targetMode){targetMode.icon=creepIcon(kind);render()}return;
    }
  }

  const baseSkill=skill;
  skill=function(id){
    const h=active();if(h?.id!==CHEN_ID)return baseSkill(id);
    if(!G||G.resolving||G.winner!==null||targetMode||G.actions<1)return;if(isHeroSilenced(h)){alert('Chen обезмолвлен и не может использовать способности.');return}if((h.cd?.[id]||0)>1)return;
    armTargetSkillHint(h,id);
    if(id==='persuasion'){summonChoice(h);return}
    if(id==='hand'){healChenTeam(h.team,3,'Hand of God');setHandHot(h.team,2);putOnCooldown(h,'hand');addSkillLog(h,'hand',`${h.name} использует Hand of God: вся команда и подконтрольные крипы получают 3 HP, затем ещё 2 общих хода будут лечиться на 1 HP.`);spend();return}
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
    const b=document.createElement('button');b.className='skill chen-creep-skill';b.innerHTML=`<img class="skill-icon" src="${d.icon}"><span>${d.skill}</span>`;b.disabled=G.actions<1;b.onclick=()=>useCreepSkill(h);acts.appendChild(b);
    if((h.chenCreeps||[]).length>1){const sw=document.createElement('button');sw.className='skill chen-switch-creep';sw.innerHTML='<span>↔ СМЕНИТЬ КРИПА</span>';sw.disabled=false;sw.onclick=()=>switchCreep(h,((h.chenCreepIndex||0)+1)%h.chenCreeps.length);acts.appendChild(sw)}
  }
  const baseRender=render;
  render=function(){
    if(G)for(const team of G.teams||[])for(const h of team||[])if(isChenSlot(h)&&!h.dead)syncSlot(h);
    const r=baseRender();if(G){for(const team of G.teams||[])for(const h of team||[])if(isChenSlot(h)&&!h.dead)patchCard(h);patchActions()}return r;
  };

  try{if(Array.isArray(HERO_IDS)&&!HERO_IDS.includes(CHEN_ID))HERO_IDS.push(CHEN_ID);if(HERO_META&&!HERO_META[CHEN_ID])HERO_META[CHEN_ID]={name:'CHEN',icon:'assets/chen_icon.webp'}}catch(_){}
})();