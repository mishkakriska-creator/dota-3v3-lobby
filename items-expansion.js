(()=>{
const c=(h,id)=>(h?.items||[]).filter(x=>x===id).length;
Object.assign(ITEMS,{
 spirit_vessel:{name:'Spirit Vessel',cost:7,img:'assets/items/spirit_vessel.png',category:'support',cd:3,active:true,desc:'Активно, стоит 1 действие: выбранный враг на 6 общих ходов теряет 5% текущего HP каждый общий ход и получает на 50% меньше здоровья от лечения, восстановления и вампиризма. Перезарядка: 3 хода героя.'},
 blight_stone:{name:'Blight Stone',cost:5,img:'assets/items/blight_stone.png',category:'misc',desc:'Обычная атака накладывает на цель −0.5 брони на 2 хода её команды. Улучшается в Desolator.'},
 hyperstone:{name:'Hyperstone',cost:6,img:'assets/items/hyperstone.png',category:'misc',desc:'Даёт +35% шанса дополнительной тычки. Два Hyperstone автоматически улучшаются в Moon Shard.'},
 moon_shard:{name:'Moon Shard',cost:12,img:'assets/items/moon_shard.png',category:'weapon',active:true,free:true,desc:'Даёт +70% шанса дополнительной тычки. Можно поглотить без траты действия: слот освобождается, а герой навсегда получает +40%.'},
 ultimate_orb:{name:'Ultimate Orb',cost:6,img:'assets/items/ultimate_orb.png',category:'misc',desc:'Даёт +1 HP, +0.5 брони и +0.5 урона. Два Ultimate Orb автоматически улучшаются в Eye of Skadi.'},
 ring_tarrasque:{name:'Ring of Tarrasque',cost:6,img:'assets/items/ring_of_tarrasque.webp',category:'misc',desc:'Восстанавливает 0.5 HP за каждый общий ход. Улучшается в Heart of Tarrasque.'},
 claymore:{name:'Claymore',cost:4,img:'assets/items/claymore_v2.webp',category:'misc',desc:'Даёт +0.5 к урону. Улучшается в Armlet of Mordiggian.'},
 demon_edge:{name:'Demon Edge',cost:8,img:'assets/items/demon_edge.webp',category:'weapon',desc:'Даёт +1 к урону. Улучшается в Daedalus.'},
 armlet:{name:'Armlet of Mordiggian',cost:10,img:'assets/items/armlet.png',activeImg:'assets/items/armlet_active_v2.png',category:'weapon',active:true,desc:'Пассивно даёт +0.5 к урону. Переключаемый эффект тратит 1 действие: пока включён, даёт +2 HP. Бонус здоровья сохраняется до ручного выключения. Собирается из Claymore.'}
});
ITEMS.butterfly.desc='Даёт +60% шанса дополнительной тычки, +40% уклонения и +1.5 брони. Собирается из Talisman of Evasion и Eaglesong.';
ITEMS.skadi.cost=12;ITEMS.skadi.desc='Даёт +2 HP, +1 брони и +1 урон. После обычной атаки накладывает на цель на 5 общих ходов эффект: любое лечение по цели уменьшается на 2. Два Ultimate Orb автоматически улучшаются в Eye of Skadi.';
ITEM_RECIPES.desolator=['blight_stone'];ITEM_RECIPES.moon_shard=['hyperstone','hyperstone'];ITEM_RECIPES.skadi=['ultimate_orb','ultimate_orb'];ITEM_RECIPES.heart=['ring_tarrasque'];ITEM_RECIPES.armlet=['claymore'];ITEM_RECIPES.daedalus=['crystalys','demon_edge'];
ITEM_UPGRADES.desolator='blight_stone';ITEM_UPGRADES.moon_shard='hyperstone';ITEM_UPGRADES.skadi='ultimate_orb';ITEM_UPGRADES.heart='ring_tarrasque';ITEM_UPGRADES.armlet='claymore';ITEM_UPGRADES.daedalus='crystalys';

const baseEffectiveAtk=effectiveAtk;effectiveAtk=h=>Math.max(0,baseEffectiveAtk(h)+c(h,'ultimate_orb')*.5+(h?.items?.includes('skadi')?1:0)+c(h,'claymore')*.5+c(h,'demon_edge')+(h?.items?.includes('armlet')?.5:0));
const baseDisplayArmorValue=displayArmorValue;displayArmorValue=h=>baseDisplayArmorValue(h)+c(h,'ultimate_orb')*.5+(h?.items?.includes('skadi')?1:0)+(h?.items?.includes('butterfly')?1.5:0);
const baseItemHpBonus=itemHpBonus;itemHpBonus=h=>baseItemHpBonus(h)+c(h,'ultimate_orb')+(h?.items?.includes('skadi')?2:0)+((h?.items?.includes('armlet')&&h.armletActive)?2:0);
const baseItemRepeatPercent=itemRepeatPercent;itemRepeatPercent=h=>baseItemRepeatPercent(h)+c(h,'hyperstone')*35+(h?.items?.includes('moon_shard')?70:0)+(h?.moonShardConsumed?40:0);

const oldEnsure=ensureItemState;ensureItemState=function(){oldEnsure();if(!G)return;for(const row of G.teams||[])for(const h of row){if(h.armletActive===undefined)h.armletActive=false;if(h.moonShardConsumed===undefined)h.moonShardConsumed=false;if(h.spiritVesselTurns===undefined)h.spiritVesselTurns=0;if(h.spiritVesselAppliedTurn===undefined)h.spiritVesselAppliedTurn=0;if(h.spiritVesselSourceTeam===undefined)h.spiritVesselSourceTeam=null;if(h.spiritVesselSourceId===undefined)h.spiritVesselSourceId=null;if(h.blightStoneTurns===undefined)h.blightStoneTurns=0;syncItemHpBonus(h)}};

const oldPurchased=applyPurchasedItemStats;applyPurchasedItemStats=function(h,id){if(id==='armlet')h.armletActive=false;oldPurchased(h,id);syncItemHpBonus(h)};
const oldHeal=healHero;healHero=function(h,n,label,meta={}){if(h&&!h.dead&&(h.spiritVesselTurns||0)>0&&n>0)n*=.5;return oldHeal(h,n,label,meta)};

function blight(a,t){if(!a?.items?.includes('blight_stone')||!t||t.dead||isForgeSpiritTarget(t))return;let d=reducedNegativeTurns(t,2);if(d<=0)return;if((t.blightStoneTurns||0)<=0)t.armor=(Number(t.armor)||0)-.5;t.blightStoneTurns=d;addLog('🪨 Blight Stone: '+t.name+' получает −0.5 брони.')}
const oldAfter=afterSuccessfulBasicHit;afterSuccessfulBasicHit=function(a,t,d=0,o={}){oldAfter(a,t,d,o);if(t&&!t.dead)blight(a,t)};
const oldTick=tickDesolatorForTeam;tickDesolatorForTeam=function(team){oldTick(team);for(const h of G?.teams?.[team]||[])if((h.blightStoneTurns||0)>0&&!--h.blightStoneTurns){h.armor=(Number(h.armor)||0)+.5;addLog('🛡 Blight Stone на '+h.name+' заканчивается.')}};
const oldDispel=dispelNegativeEffects;dispelNegativeEffects=function(h,s='normal'){if(h&&(h.blightStoneTurns||0)>0){h.armor=(Number(h.armor)||0)+.5;h.blightStoneTurns=0}if(h)h.spiritVesselTurns=0;return oldDispel(h,s)};

const q=n=>Math.floor((Math.max(0,Number(n)||0)+1e-9)*4)/4;
function tickEffects(){if(!G)return;for(const row of G.teams||[])for(const h of row){if(!h||h.dead)continue;if((h.spiritVesselTurns||0)>0&&h.spiritVesselAppliedTurn!==(G.turnSerial||0)){let raw=h.hp*.05,amt=raw>0?Math.max(.25,q(raw)):0,src=Number.isInteger(h.spiritVesselSourceTeam)?G.teams?.[h.spiritVesselSourceTeam]?.find(x=>x.id===h.spiritVesselSourceId&&!x.dead)||null:null;if(amt>0)damage(h,Math.min(amt,h.hp),'🧪 Spirit Vessel: ',src,{impactDelay:50});h.spiritVesselTurns=Math.max(0,h.spiritVesselTurns-1)}}}
const oldRad=triggerRadianceAura;triggerRadianceAura=function(team){tickEffects();return oldRad(team)};

const oldPrice=itemPriceForHero;itemPriceForHero=function(id,h){let comps=recipeComponents(id);if(!comps.length)return oldPrice(id,h);let pool=[...(h?.items||[])],d=0;for(const x of comps){let i=pool.indexOf(x);if(i>=0){pool.splice(i,1);d+=ITEMS[x]?.cost||0}}return Math.max(0,(ITEMS[id]?.cost||0)-d)};
removeRecipeComponents=function(h,id){let out=[];for(const x of recipeComponents(id)){let i=h.items.indexOf(x);if(i>=0){h.items.splice(i,1);out.push(x)}}return out};

function buyDup(team,id,up){if(!canUseShop(team))return;let it=ITEMS[id];closeShopsForTargeting(team,id);targetMode={promptText:'Выберите героя для '+it.name,team,frontOnly:false,filter:h=>h.team===team&&!h.dead&&!h.infested&&h.id!=='chen_creeps',onPick:h=>{restoreShopAfterTargeting();if(h.items.includes(up)){alert('У героя уже есть '+ITEMS[up].name+'.');render();return}if((G.gold[team]||0)<it.cost){alert('Недостаточно золота.');render();return}let n=c(h,id);if(!n&&h.items.length>=3){alert('У героя уже максимум 3 предмета.');render();return}G.gold[team]-=it.cost;if(!n)h.items.push(id);else{h.items.splice(h.items.indexOf(id),1);h.items.push(up);addLog('🔨 Два '+it.name+' улучшаются в '+ITEMS[up].name+'.')}syncItemHpBonus(h);render()}};render()}
const oldBuy=buyItem;buyItem=function(team,id){if(id==='hyperstone')return buyDup(team,id,'moon_shard');if(id==='ultimate_orb')return buyDup(team,id,'skadi');return oldBuy(team,id)};

const SOUND={on:'assets/audio/items/armlet_on.mp3',off:'https://dota2.fandom.com/wiki/Special:Redirect/file/Armlet_of_Mordiggian_Unholy_Strength_2.mp3',vessel:'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1f/Spirit_Vessel_Soul_Release_1.mp3/revision/latest?cb=20191227195539'};
function sfx(k){let src=SOUND[k];if(src)playFile(itemAudio,src)}
window.playItemExpansionFx=ev=>{if(ev?.itemAction)sfx(ev.itemAction)};
const oldUse=useItem;useItem=function(h,id){
 if(id==='moon_shard'){if(!h?.items?.includes(id))return;if(h.moonShardConsumed){alert('Moon Shard уже поглощён.');return}h.items.splice(h.items.indexOf(id),1);h.moonShardConsumed=true;addLog('🌙 '+h.name+' поглощает Moon Shard: +40% шанса дополнительной тычки навсегда.');render();return}
 if(id==='armlet'){if(!G||!h||active()!==h||G.actions<1||!h.items?.includes(id))return;h.armletActive=!h.armletActive;syncItemHpBonus(h);let k=h.armletActive?'on':'off';sfx(k);window.emitNetVfx?.('item-expansion',h,{itemAction:k});addLog('🩸 '+h.name+' '+(h.armletActive?'включает':'выключает')+' Armlet: '+(h.armletActive?'+2 HP.':'бонус +2 HP снят.'));render();spend();return}
 if(id==='spirit_vessel'){if(!G||!h||active()!==h||G.actions<1||(h.itemCd?.[id]||0)>1)return;chooseEnemyAny('Выберите врага для Spirit Vessel',t=>!isForgeSpiritTarget(t),t=>{t.spiritVesselTurns=6;t.spiritVesselAppliedTurn=G.turnSerial||0;t.spiritVesselSourceTeam=h.team;t.spiritVesselSourceId=h.id;putItemCooldown(h,id);sfx('vessel');window.emitNetVfx?.('item-expansion',h,{itemAction:'vessel'});spend()});return}
 return oldUse(h,id)
};
try{ensureShopCatalogDOM();bindShopItems();renderShops()}catch(_){}
})();