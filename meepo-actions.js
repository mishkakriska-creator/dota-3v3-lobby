(()=>{
const M=window.Meepo3v3;if(!M)return;
const baseBasicAttack=basicAttack,baseSkill=skill,baseSpend=spend;

function pick(h,title,filter,cb){
 const pool=M.units(h).filter(filter||(()=>true)),o=document.createElement('div');
 o.className='meepo-pick';
 o.innerHTML='<div><b>'+title+'</b>'+pool.map(u=>'<button data-u="'+u.uid+'">Meepo '+(u.i+1)+' ❤️'+compactStatNum(u.hp)+(u.host?' @ '+(M.host(u)?.name||'враг'):' • линия')+'</button>').join('')+'<button data-x>ОТМЕНА</button></div>';
 document.body.appendChild(o);
 o.querySelector('[data-x]').onclick=()=>o.remove();
 o.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{const u=M.by(h,b.dataset.u);o.remove();if(u)cb(u)});
}
function next(h){
 const n=M.units(h).find(u=>u.actions>0);
 if(n){h.meepoSel=n.uid;G.actions=n.actions;G.attackUsed=n.attackUsed;M.sync(h);render();return}
 G.actions=0;render();const g=G,s=G.turnSerial;setTimeout(()=>{if(G===g&&G.turnSerial===s)endTurn()},300);
}
function spendUnit(h,u){u.actions=Math.max(0,u.actions-1);G.actions=u.actions;render();if(!u.actions)next(h)}
M.spendUnit=spendUnit;M.spend=spendUnit;

function chooseHost(h,u){
 const enemies=(G.teams?.[1-h.team]||[]).filter(x=>!x.dead&&!x.infested);
 targetMode={promptText:'Куда насесть Meepo '+(u.i+1)+'?',team:1-h.team,frontOnly:false,icon:M.V,filter:x=>enemies.includes(x),onPick:t=>{
  if(!u.host&&M.lines(h).length<=1){alert('Один Meepo всегда должен оставаться в линии.');return}
  u.host={team:t.team,id:t.id};if(h.meepoLine===u.uid)h.meepoLine=M.lines(h)[0]?.uid;spendUnit(h,u);M.sync(h);render();
 }};
 render();
}
function poof(h,u){
 pick(h,'Poof: выбрать второго Meepo',x=>x!==u,o=>{
  for(const x of[u,o]){const t=M.host(x);if(t)spellDamage(t,1,'🌀 Poof: ',h,{impactDelay:80})}
  const z=u.host;u.host=o.host;o.host=z;
  if(h.meepoLine===u.uid)h.meepoLine=o.uid;else if(h.meepoLine===o.uid)h.meepoLine=u.uid;
  u.poofCd=1;addSkillLog(h,'poof','Meepo '+(u.i+1)+' меняется местами с Meepo '+(o.i+1)+'.');
  spendUnit(h,u);M.sync(h);render();
 });
}
function meepoAttack(h,u,t){
 pureDamage(t,.5,'🪓 Ransack: ',h,{impactDelay:30});M.heal(h,.5);
 if(t.dead){u.attackUsed=true;spendUnit(h,u);return}
 const p=Object.assign({},h,{name:'Meepo '+(u.i+1)});playAttackSound(p);
 if(attackMisses(p,t)){addLog('💨 '+p.name+' промахивается по '+t.name+'.');u.attackUsed=true;spendUnit(h,u);return}
 const hit=attackDamageInfo(p,t,physicalBaseDamage(p,t,effectiveAtk(h)),{allowCrit:true});
 damage(t,hit.damage,attackSourceLabel(p,hit),h,{impactDelay:attackImpactMs(h)});afterSuccessfulBasicHit(h,t,hit.damage);
 u.attackUsed=true;G.attackUsed=true;spendUnit(h,u);
}
M.switch=(h,u)=>{h.meepoSel=u.uid;if(!u.host)h.meepoLine=u.uid;G.actions=u.actions;G.attackUsed=u.attackUsed;M.sync(h);render()};
M.chooseHost=chooseHost;
M.clearAttackSelect=(doRender=true)=>{M.attackSelect=null;if(doRender)render()};
M.attackSelectActive=()=>{
 const st=M.attackSelect;if(!st||!G||G.winner!==null||G.attackUsed||G.actions<1)return false;
 const a=active?.();return !!a&&!a.dead&&a.team===st.attackerTeam&&a.id===st.attackerId;
};
M.canAttackUnit=(m,u)=>{
 if(!M.attackSelectActive()||!m||!u||u.dead||u.hp<=0)return false;
 const st=M.attackSelect;if(m.team!==st.meepoTeam||m.team===st.attackerTeam)return false;
 if(u.host)return true;
 return frontHero(m.team)===m;
};
function normalAttackHero(a,t){
 M.attackSelect=null;if(!a||!t||t.dead)return render();
 G.attackUsed=true;playAttackSound(a);
 if(attackMisses(a,t)){addLog('💨 '+a.name+' промахивается по '+t.name+'.');baseSpend();return}
 const hit=attackDamageInfo(a,t,physicalBaseDamage(a,t),{allowCrit:true});
 damage(t,hit.damage,attackSourceLabel(a,hit),a,{impactDelay:attackImpactMs(a)});afterSuccessfulBasicHit(a,t,hit.damage);baseSpend();
}
function normalAttackMeepo(a,m,u){
 M.attackSelect=null;if(!a||!m||!u||!M.units(m).includes(u))return render();
 G.attackUsed=true;playAttackSound(a);
 const proxy=Object.assign({},m,{name:'Meepo '+(u.i+1),hp:u.hp,maxHp:u.maxHp});
 if(attackMisses(a,proxy)){addLog('💨 '+a.name+' промахивается по Meepo '+(u.i+1)+'.');baseSpend();return}
 const hit=attackDamageInfo(a,proxy,physicalBaseDamage(a,proxy),{allowCrit:true});
 M.hit(m,u,hit.damage,attackSourceLabel(a,hit),a,false);if(!m.dead)afterSuccessfulBasicHit(a,m,hit.damage);baseSpend();
}
M.attackHero=t=>{
 if(!M.attackSelectActive())return;
 const st=M.attackSelect,a=active?.(),f=frontHero(st.meepoTeam);
 if(!a||!f||t!==f||f.id===M.ID||!canBasicAttackTarget(a,f))return;
 normalAttackHero(a,f);
};
M.attackUnit=(m,u)=>{if(M.canAttackUnit(m,u)){const a=active?.();if(a)normalAttackMeepo(a,m,u)}};

basicAttack=function(){
 const h=G&&active?.();
 if(h?.id===M.ID){
  const u=M.sel(h);if(!u||u.attackUsed||u.actions<1)return;
  if(u.host){const t=M.host(u);if(t)meepoAttack(h,u,t);return}
  chooseEnemy('Цель Meepo '+(u.i+1),()=>true,t=>meepoAttack(h,u,t));return;
 }
 const m=G?M.root(1-G.team):null;if(!m)return baseBasicAttack();
 if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;
 if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}
 if(!h||h.dead)return;
 if((h.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}
 if(M.attackSelectActive()){M.clearAttackSelect();return}
 M.attackSelect={attackerTeam:h.team,attackerId:h.id,meepoTeam:m.team};render();
};
skill=function(id){
 const h=G&&active?.();if(h?.id!==M.ID)return baseSkill(id);
 const u=M.sel(h);if(!u||u.actions<1||targetMode)return;
 if(id==='poof'&&u.poofCd<=0&&!isHeroSilenced(h)){window.playMeepoPoof?.();poof(h,u)}
};
spend=function(){const h=G&&active?.();if(h?.id!==M.ID)return baseSpend();const u=M.sel(h);if(u)spendUnit(h,u)};

document.addEventListener('click',e=>{
 if(!M.attackSelectActive())return;
 const unitButton=e.target?.closest?.('[data-meepo-attack-unit].meepo-unit-attackable');
 if(unitButton){
  const m=M.root(Number(unitButton.dataset.meepoTeam)),u=m&&M.by(m,unitButton.dataset.meepoAttackUnit);
  if(m&&u){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.attackUnit(m,u)}
  return;
 }
 const heroCard=e.target?.closest?.('.hero.meepo-normal-attack-target');
 if(heroCard){
  const team=Number(heroCard.dataset.team),id=heroCard.dataset.hero,t=G?.teams?.[team]?.find(x=>x.id===id&&!x.dead);
  if(t){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.attackHero(t)}
 }
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&M.attackSelect)M.clearAttackSelect()},true);
})();