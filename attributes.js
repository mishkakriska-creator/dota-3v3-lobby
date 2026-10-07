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
 huskar:{primary:'strength',strength:8,agility:3,intelligence:1},
 meepo:{primary:'agility',strength:7,agility:6,intelligence:1}
};
const GROUPS=[
 {id:'strength',name:'СИЛА',icon:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png',heroes:['lifestealer','pudge','axe','mars','earthshaker','huskar','abaddon']},
 {id:'agility',name:'ЛОВКОСТЬ',icon:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png',heroes:['morphling','shadowfiend','arcwarden','broodmother','phantomlancer','meepo']},
 {id:'intelligence',name:'ИНТЕЛЛЕКТ',icon:'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png',heroes:['techies','bane','io','tinker','silencer','invoker','necrophos','ancient_apparition','enigma','chen']}
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
 return n;
}
function nonAttributeHpBonus(h){return h?.items?.includes('armlet')&&h.armletActive?2:0}
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
 const id=h?.id==='arcwarden_clone'?'arcwarden':h?.id;const a=ATTR[id]||null;
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
itemHpBonus=function(h){return strengthBonus(h)+nonAttributeHpBonus(h)};

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

// Battle card attribute strip
function renderBattleCardAttributes(h,node){
 if(!h||!node)return;
 const row=node.querySelector('.battle-card-attributes');
 if(!row)return;
 const values={
  strength:window.heroAttributeValue(h,'strength'),
  agility:window.heroAttributeValue(h,'agility'),
  intelligence:window.heroAttributeValue(h,'intelligence')
 };
 const primary=h.primaryAttribute||ATTR[h.id==='arcwarden_clone'?'arcwarden':h.id]?.primary||'';
 row.innerHTML=['strength','agility','intelligence'].map(key=>{
  const label=key==='strength'?'Сила':key==='agility'?'Ловкость':'Интеллект';
  const icon=GROUPS.find(g=>g.id===key)?.icon||'';
  return `<span class="battle-card-attribute ${key} ${key===primary?'primary':''}" title="${label}"><img class="battle-card-attribute-icon" src="${icon}" alt=""><b>${values[key]}</b></span>`;
 }).join('');
}
const previousAttributeRenderTeam=renderTeam;
renderTeam=function(t,sel){
 previousAttributeRenderTeam(t,sel);
 for(const h of (G?.teams?.[t]||[])){
  const node=document.getElementById(`hero-${h.team}-${h.id}`);
  if(node)renderBattleCardAttributes(h,node);
 }
};

const attributeCardStyle=document.createElement('style');
attributeCardStyle.textContent=`
.battlefield .hero .hero-name{order:1!important}
.battlefield .hero .stats{order:2!important}
.battlefield .hero .hpbar{order:3!important}
.battlefield .hero .status{order:4!important}
.battlefield .hero .item-inventory{order:5!important}
.battlefield .hero .battle-card-attributes{
 order:6!important;
 position:static!important;
 display:flex!important;
 align-items:center!important;
 justify-content:center!important;
 gap:9px!important;
 width:100%!important;
 min-height:18px!important;
 margin:auto 0 4px!important;
 padding:0!important;
 line-height:1!important;
 flex:0 0 auto!important;
 pointer-events:none!important;
}
.battlefield .hero .inspect-hero{
 order:7!important;
 margin:0!important;
}
.battle-card-attribute{
 display:inline-flex!important;
 align-items:center!important;
 justify-content:center!important;
 gap:3px!important;
 min-width:29px!important;
 color:#eef2f8!important;
 font-size:12px!important;
 font-weight:900!important;
 text-shadow:0 1px 2px #000!important;
}
.hero .battle-card-attribute img.battle-card-attribute-icon{
 display:block!important;
 width:15px!important;
 height:15px!important;
 min-width:15px!important;
 min-height:15px!important;
 max-width:15px!important;
 max-height:15px!important;
 flex:0 0 15px!important;
 object-fit:contain!important;
 object-position:center!important;
 image-rendering:auto!important;
 transform:none!important;
 filter:none!important;
 background:none!important;
 background-color:transparent!important;
 border:0!important;
 outline:0!important;
 box-shadow:none!important;
 border-radius:0!important;
 padding:0!important;
 margin:0!important;
 opacity:1!important;
}

.huskar-life-break-flyer .battle-card-attribute img.battle-card-attribute-icon,
.hero.enigma-black-hole-victim .battle-card-attribute img.battle-card-attribute-icon,
.hero.enigma-black-hole-mobile-victim .battle-card-attribute img.battle-card-attribute-icon{
 display:block!important;
 width:15px!important;
 height:15px!important;
 min-width:15px!important;
 min-height:15px!important;
 max-width:15px!important;
 max-height:15px!important;
 flex:0 0 15px!important;
 object-fit:contain!important;
 object-position:center!important;
 transform:none!important;
 filter:none!important;
 background:none!important;
 border:0!important;
 border-radius:0!important;
 box-shadow:none!important;
 padding:0!important;
 margin:0!important;
 opacity:1!important;
}
html.dota-landscape-mobile .battlefield .hero .battle-card-attributes{gap:5px!important;min-height:14px!important;margin:auto 0 3px!important}
html.dota-landscape-mobile .battle-card-attribute{gap:2px!important;min-width:22px!important;font-size:10px!important}
html.dota-landscape-mobile .hero .battle-card-attribute img.battle-card-attribute-icon{
 width:12px!important;height:12px!important;min-width:12px!important;min-height:12px!important;max-width:12px!important;max-height:12px!important;flex-basis:12px!important
}
html.dota-android .battle-card-attribute{min-width:20px!important;font-size:9px!important}
html.dota-android .hero .battle-card-attribute img.battle-card-attribute-icon{
 width:11px!important;height:11px!important;min-width:11px!important;min-height:11px!important;max-width:11px!important;max-height:11px!important;flex-basis:11px!important
}
`;
document.head.appendChild(attributeCardStyle);

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