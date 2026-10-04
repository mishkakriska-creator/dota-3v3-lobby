(()=>{
const ATTR={
 techies:{primary:'intelligence',strength:7,agility:2,intelligence:5},
 morphling:{primary:'agility',strength:8,agility:6,intelligence:2},
 bane:{primary:'intelligence',strength:7,agility:1,intelligence:4},
 io:{primary:'intelligence',strength:7,agility:1,intelligence:6},
 tinker:{primary:'intelligence',strength:6,agility:2,intelligence:6},
 silencer:{primary:'intelligence',strength:7,agility:3,intelligence:6},
 shadowfiend:{primary:'agility',strength:8,agility:4,intelligence:2},
 lifestealer:{primary:'strength',strength:8,agility:6,intelligence:1},
 pudge:{primary:'strength',strength:10,agility:1,intelligence:2},
 abaddon:{primary:'strength',strength:7,agility:2,intelligence:1},
 invoker:{primary:'intelligence',strength:7,agility:1,intelligence:4},
 arcwarden:{primary:'agility',strength:7,agility:3,intelligence:2},
 axe:{primary:'strength',strength:9,agility:1,intelligence:4},
 broodmother:{primary:'agility',strength:8,agility:4,intelligence:1},
 mars:{primary:'strength',strength:9,agility:2,intelligence:1},
 phantomlancer:{primary:'agility',strength:8,agility:4,intelligence:2},
 necrophos:{primary:'intelligence',strength:8,agility:1,intelligence:3},
 ancient_apparition:{primary:'intelligence',strength:7,agility:2,intelligence:4},
 enigma:{primary:'intelligence',strength:7,agility:1,intelligence:1},
 chen:{primary:'intelligence',strength:8,agility:2,intelligence:3},
 earthshaker:{primary:'strength',strength:8,agility:1,intelligence:3},
 huskar:{primary:'strength',strength:8,agility:3,intelligence:1}
};
const GROUPS=[
 {id:'strength',name:'СИЛА',icon:'assets/attributes/strength.png',heroes:['lifestealer','pudge','axe','mars','earthshaker','huskar','abaddon']},
 {id:'agility',name:'ЛОВКОСТЬ',icon:'assets/attributes/agility.png',heroes:['morphling','shadowfiend','arcwarden','broodmother','phantomlancer']},
 {id:'intelligence',name:'ИНТЕЛЛЕКТ',icon:'assets/attributes/intelligence.png',heroes:['techies','bane','io','tinker','silencer','invoker','necrophos','ancient_apparition','enigma','chen']}
];
window.HERO_ATTRIBUTES=ATTR;
window.ATTRIBUTE_GROUPS=GROUPS;

for(const [id,a] of Object.entries(ATTR)){
 if(!DATA[id])continue;
 DATA[id].strength=a.strength;
 DATA[id].agility=a.agility;
 DATA[id].intelligence=a.intelligence;
 DATA[id].primaryAttribute=a.primary;
 DATA[id].hp=a.strength;
}

const count=(h,id)=>(h?.items||[]).filter(x=>x===id).length;
function strengthBonus(h){
 if(!h)return 0;
 let n=0;
 if(h.items?.includes('sange'))n+=1;
 if(h.items?.includes('heart'))n+=2;
 if(h.items?.includes('kaya_sange'))n+=2;
 if(h.items?.includes('sange_yasha'))n+=1;
 n+=count(h,'ultimate_orb');
 if(h.items?.includes('skadi'))n+=2;
 if(h.items?.includes('armlet')&&h.armletActive)n+=2;
 return n;
}
function agilityBonus(h){
 if(!h)return 0;
 let n=0;
 if(h.items?.includes('butterfly'))n+=12;
 if(h.items?.includes('eaglesong'))n+=8;
 if(h.items?.includes('yasha'))n+=6;
 n+=count(h,'ultimate_orb');
 if(h.items?.includes('skadi'))n+=2;
 return n;
}
function intelligenceBonus(h){
 if(!h)return 0;
 let n=count(h,'ultimate_orb');
 if(h.items?.includes('skadi'))n+=2;
 return n;
}
function attrBase(h,key){
 const a=ATTR[h?.id]||ATTR[h?.ownerId]||null;
 return Math.max(0,Number(a?.[key])||0);
}
window.heroAttributeValue=function(h,key){
 if(!h)return 0;
 if(key==='strength')return attrBase(h,key)+strengthBonus(h);
 if(key==='agility')return attrBase(h,key)+agilityBonus(h);
 if(key==='intelligence')return attrBase(h,key)+intelligenceBonus(h);
 return 0;
};
window.magicResistPercentValue=function(h){return Math.max(0,Math.min(95,window.heroAttributeValue(h,'intelligence')*5))};

const previousMkHero=mkHero;
mkHero=function(id,team){
 const h=previousMkHero(id,team);
 const a=ATTR[id];
 if(a){
   h.baseStrength=a.strength;h.baseAgility=a.agility;h.baseIntelligence=a.intelligence;
   h.strength=a.strength;h.agility=a.agility;h.intelligence=a.intelligence;
   h.primaryAttribute=a.primary;
   h.maxHp=a.strength;h.hp=a.strength;h.itemHpBonus=0;
 }
 return h;
};

// Strength replaces the old direct +HP packages. Armlet's existing +2 HP remains a non-attribute active bonus.
itemHpBonus=function(h){return strengthBonus(h)};

const previousSyncItemHpBonus=syncItemHpBonus;
syncItemHpBonus=function(h){
 previousSyncItemHpBonus(h);
 if(!h)return;
 h.strength=attrBase(h,'strength')+strengthBonus(h);
 h.agility=attrBase(h,'agility')+agilityBonus(h);
 h.intelligence=attrBase(h,'intelligence')+intelligenceBonus(h);
};

// These three items now receive repeat chance only through Agility.
itemRepeatPercent=function(h){
 if(!h)return 0;
 let pct=0;
 if(h.items?.includes('yasha_kaya'))pct+=50;
 if(h.items?.includes('sange_yasha'))pct+=30;
 pct+=count(h,'hyperstone')*35;
 if(h.items?.includes('moon_shard'))pct+=70;
 if(h.moonShardConsumed)pct+=40;
 return pct;
};

const previousRepeatAttackPercent=repeatAttackPercent;
repeatAttackPercent=function(h,target=null){
 return Math.max(0,previousRepeatAttackPercent(h,target)+window.heroAttributeValue(h,'agility')*5);
};

// Correct item armor packages after items-expansion's legacy bonuses.
const previousDisplayArmorValue=displayArmorValue;
displayArmorValue=function(h){
 let v=previousDisplayArmorValue(h);
 v-=count(h,'ultimate_orb')*.5;
 if(h?.items?.includes('butterfly'))v-=.5;
 if(h?.items?.includes('yasha'))v+=.5;
 if(h?.items?.includes('sange_yasha'))v+=1;
 return v;
};

// Heart now enters max HP only through +2 Strength, preventing legacy double-application.
applyPurchasedItemStats=function(h,id){
 if(!h)return;
 if(id==='armlet')h.armletActive=false;
 if(id==='daedalus')h.atk=(Number(h.atk)||0)+2;
 syncItemHpBonus(h);
};
removeSoldItemStats=function(h,id){
 if(!h)return;
 if(id==='daedalus')h.atk=Math.max(0,(Number(h.atk)||0)-2);
 syncItemHpBonus(h);
};

// Update only the requested item stat packages; all other effects stay intact.
if(ITEMS.butterfly)ITEMS.butterfly.desc='Даёт +12 к ловкости, +40% уклонения и +1 брони. Собирается из Talisman of Evasion и Eaglesong.';
if(ITEMS.eaglesong)ITEMS.eaglesong.desc='Даёт +8 к ловкости.';
if(ITEMS.ultimate_orb)ITEMS.ultimate_orb.desc='Даёт +1 ко всем атрибутам и +0.5 к урону. Два Ultimate Orb автоматически улучшаются в Eye of Skadi.';
if(ITEMS.skadi)ITEMS.skadi.desc='Даёт +2 ко всем атрибутам, +1 брони и +1 урон. После обычной атаки накладывает на цель на 5 общих ходов эффект: любое лечение по цели уменьшается на 2. Два Ultimate Orb автоматически улучшаются в Eye of Skadi.';
if(ITEMS.sange)ITEMS.sange.desc='Даёт +1 к силе. Все новые отрицательные эффекты на владельце становятся на 1 ход короче.';
if(ITEMS.heart)ITEMS.heart.desc='Даёт +2 к силе. Каждый общий ход восстанавливает 1 HP за каждые полные 5 единиц максимального здоровья владельца. При 10 максимального HP восстанавливает 2 HP за общий ход. Собирается из Ring of Tarrasque.';
if(ITEMS.yasha)ITEMS.yasha.desc='Даёт +6 к ловкости и +0.5 брони.';
if(ITEMS.kaya_sange)ITEMS.kaya_sange.desc='Даёт +2 к силе, сокращает длительность любых отрицательных эффектов на 1 ход и увеличивает урон от способностей на 2. Собирается из Kaya и Sange.';
if(ITEMS.sange_yasha)ITEMS.sange_yasha.desc='Даёт +1 к силе и +1 брони, сокращает длительность любых отрицательных эффектов на 2 хода и даёт 30% шанс после обычной атаки повторить тычку без траты действия. Собирается из Sange и Yasha.';

function makeDraftCard(id){
 const hero=DATA[id];if(!hero)return null;
 const d=document.createElement('button');d.className='draft-card';d.dataset.id=id;
 const mp=Number.isInteger(window.DOTA_NET_PLAYER)?window.DOTA_NET_PLAYER:0;
 d.innerHTML=`<img src="${draftPortraitSrc(id)}" alt="${hero.name}"><div class="draft-card-name">${hero.name}</div><div class="draft-mastery-host">${window.DotaProfile?.masteryBadgeHTML?.(mp,id,true)||''}</div>`;
 d.onclick=()=>openHeroPick(id);
 return d;
}
draft=function(){
 const box=$('#draftCards');if(!box)return;
 box.innerHTML='';
 for(const group of GROUPS){
   const section=document.createElement('section');
   section.className='draft-attribute-group draft-attribute-'+group.id;
   section.dataset.attribute=group.id;
   const head=document.createElement('div');head.className='draft-attribute-head';
   head.innerHTML=`<img src="${group.icon}" alt=""><span>${group.name}</span>`;
   const cards=document.createElement('div');cards.className='draft-attribute-cards';
   for(const id of group.heroes){const card=makeDraftCard(id);if(card)cards.appendChild(card)}
   section.append(head,cards);box.appendChild(section);
 }
 updateDraft();
};
draft();
})();