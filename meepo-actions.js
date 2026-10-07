(()=>{
const M=window.Meepo3v3;if(!M)return;
const baseBasicAttack=basicAttack,baseSkill=skill,baseSpend=spend,baseBeginActivation=beginActivation;

function next(h){
 const n=M.units(h).find(u=>u.actions>0);
 if(n){h.meepoSel=n.uid;G.actions=n.actions;G.attackUsed=n.attackUsed;M.sync(h);render();return}
 G.actions=0;render();const g=G,s=G.turnSerial;setTimeout(()=>{if(G===g&&G.turnSerial===s)endTurn()},300);
}
function spendUnit(h,u){u.actions=Math.max(0,u.actions-1);G.actions=u.actions;render();if(!u.actions)next(h)}
M.spendUnit=spendUnit;M.spend=spendUnit;

function chooseHost(h,u,consume){
 const enemies=(G.teams?.[1-h.team]||[]).filter(x=>!x.dead&&!x.infested);
 targetMode={
  promptText:'Куда насесть Meepo '+(u.i+1)+'?',team:1-h.team,frontOnly:false,icon:M.V,
  filter:x=>enemies.includes(x),
  onPick:t=>{
   if(!u.host&&M.lines(h).length<=1){alert('Один Meepo всегда должен оставаться в линии.');return}
   u.host={team:t.team,id:t.id};if(h.meepoLine===u.uid)h.meepoLine=M.lines(h)[0]?.uid;
   consume();M.sync(h);render();
  }
 };
 render();
}
M.chooseHost=(h,u)=>chooseHost(h,u,()=>spendUnit(h,u));

function meepoUnitNode(h,u){
 if(!h||!u)return null;
 const direct=document.querySelector('[data-meepo-team="'+h.team+'"][data-meepo-unit="'+u.uid+'"]');
 if(direct)return direct;
 const base=document.querySelector('.hero[data-team="'+h.team+'"][data-meepo-base-unit="'+u.uid+'"]');
 if(base)return base;
 return null;
}
function poofGhost(node,label){
 if(!node)return null;
 const r=node.getBoundingClientRect(),g=document.createElement('div');
 g.className='meepo-poof-ghost';
 g.style.left=r.left+'px';g.style.top=r.top+'px';g.style.width=r.width+'px';g.style.height=r.height+'px';
 g.innerHTML='<div class="meepo-poof-ghost-core"><img src="'+M.D+'" alt=""><b>'+label+'</b></div>';
 document.body.appendChild(g);
 return {el:g,rect:r};
}
function animatePoofSwap(h,source,target,onSwap,onDone){
 const a=poofGhost(meepoUnitNode(h,source),'M'+(source.i+1));
 const b=poofGhost(meepoUnitNode(h,target),'M'+(target.i+1));
 if(!a||!b){a?.el.remove();b?.el.remove();onSwap();onDone();return}
 const dx=b.rect.left-a.rect.left,dy=b.rect.top-a.rect.top;
 const dx2=a.rect.left-b.rect.left,dy2=a.rect.top-b.rect.top;
 const dur=620,swapAt=360;
 let aa=null,bb=null;
 try{
  aa=a.el.animate([
   {offset:0,transform:'translate3d(0,0,0) scale(1)',filter:'brightness(1) drop-shadow(0 0 0 rgba(83,214,255,0))',opacity:1},
   {offset:.35,transform:'translate3d('+(dx*.35)+'px,'+(dy*.35-24)+'px,0) scale(.88)',filter:'brightness(1.55) drop-shadow(0 0 12px rgba(83,214,255,.9))',opacity:.95},
   {offset:.58,transform:'translate3d('+(dx*.58)+'px,'+(dy*.58-12)+'px,0) scale(.68)',filter:'brightness(2) drop-shadow(0 0 20px rgba(83,214,255,1))',opacity:.72},
   {offset:1,transform:'translate3d('+dx+'px,'+dy+'px,0) scale(1)',filter:'brightness(1.15) drop-shadow(0 0 5px rgba(83,214,255,.6))',opacity:1}
  ],{duration:dur,easing:'cubic-bezier(.3,.8,.2,1)',fill:'forwards'});
  bb=b.el.animate([
   {offset:0,transform:'translate3d(0,0,0) scale(1)',filter:'brightness(1) drop-shadow(0 0 0 rgba(166,108,255,0))',opacity:1},
   {offset:.35,transform:'translate3d('+(dx2*.35)+'px,'+(dy2*.35+24)+'px,0) scale(.88)',filter:'brightness(1.55) drop-shadow(0 0 12px rgba(166,108,255,.9))',opacity:.95},
   {offset:.58,transform:'translate3d('+(dx2*.58)+'px,'+(dy2*.58+12)+'px,0) scale(.68)',filter:'brightness(2) drop-shadow(0 0 20px rgba(166,108,255,1))',opacity:.72},
   {offset:1,transform:'translate3d('+dx2+'px,'+dy2+'px,0) scale(1)',filter:'brightness(1.15) drop-shadow(0 0 5px rgba(166,108,255,.6))',opacity:1}
  ],{duration:dur,easing:'cubic-bezier(.3,.8,.2,1)',fill:'forwards'});
 }catch(_){}
 setTimeout(onSwap,swapAt);
 setTimeout(()=>{try{aa?.cancel();bb?.cancel()}catch(_){}a.el.remove();b.el.remove();onDone()},dur+40);
}
function finishPoof(h,source,target,mode){
 M.normalize?.(h);
 if(!h||!source||!target||source===target||source.dead||target.dead||M.poofAnimating)return;
 M.poofAnimating=true;
 M.poofSelect=null;
 render();
 animatePoofSwap(h,source,target,()=>{
  // The actual swap, damage and sound happen together at the animation impact.
  const before=[source.host?{...source.host}:null,target.host?{...target.host}:null];
  const z=source.host;source.host=target.host;target.host=z;
  M.normalize?.(h);
  if(h.meepoLine===source.uid&&target&&!target.host)h.meepoLine=target.uid;
  else if(h.meepoLine===target.uid&&source&&!source.host)h.meepoLine=source.uid;
  if(!M.lines(h).length){source.host=null;h.meepoLine=source.uid}
  window.playMeepoPoof?.();
  for(const ref of before){
   if(!ref)continue;
   const t=(G.teams?.[ref.team]||[]).find(x=>x.id===ref.id&&!x.dead);
   if(t)spellDamage(t,1,'🌀 Poof: ',h,{impactDelay:0});
  }
  source.poofCd=1;
  addSkillLog(h,'poof','Meepo '+(source.i+1)+' меняется местами с Meepo '+(target.i+1)+'.');
  M.sync(h);render();
 },()=>{
  M.poofAnimating=false;
  if(mode==='assist')M.consumeAssist(h,source);else spendUnit(h,source);
  M.sync(h);render();
 });
}
M.poofSelectActive=()=>{
 if(M.poofAnimating)return false;
 const st=M.poofSelect;if(!st||!G)return false;
 const h=M.root(st.team);if(h)M.normalize?.(h);
 const source=h&&M.by(h,st.sourceUid);
 if(!h||!source||source.dead||source.poofCd>0)return false;
 if(st.mode==='assist')return M.assistAvailable(h)&&M.assistSelected(h)?.uid===source.uid;
 return active?.()===h&&G.team===h.team&&source.actions>0;
};
M.canPoofTarget=(h,u)=>{
 if(!M.poofSelectActive()||!h||!u||u.dead)return false;
 const st=M.poofSelect;return h.team===st.team&&u.uid!==st.sourceUid;
};
M.startPoof=(h,u,mode='turn')=>{
 if(M.poofAnimating)return;
 M.normalize?.(h);
 if(!h||!u||u.dead||u.poofCd>0||!M.units(h).includes(u))return;
 if(M.poofSelectActive()&&M.poofSelect?.sourceUid===u.uid){M.poofSelect=null;render();return}
 M.attackSelect=null;
 M.poofSelect={team:h.team,sourceUid:u.uid,mode,serial:G.turnSerial};
 render();
};
M.pickPoofTarget=(h,u)=>{
 M.normalize?.(h);
 if(!M.canPoofTarget(h,u))return;
 const st=M.poofSelect,source=M.by(h,st.sourceUid);
 if(source)finishPoof(h,source,u,st.mode);
};

function meepoAttackOwn(h,u,t){
 const p=Object.assign({},h,{name:'Meepo '+(u.i+1)});playAttackSound(p);
 if(attackMisses(p,t)){addLog('💨 '+p.name+' промахивается по '+t.name+'.');u.attackUsed=true;spendUnit(h,u);return}
 const hit=attackDamageInfo(p,t,physicalBaseDamage(p,t,effectiveAtk(h)),{allowCrit:true});
 const total=quarterValue((Number(hit.damage)||0)+.5,{minPositive:false});
 const info=Object.assign({},hit,{tags:[...(hit.tags||[]),'Ransack +0.5 чист.']});
 damage(t,total,attackSourceLabel(p,info),h,{impactDelay:attackImpactMs(h)});
 M.heal(h,.5);
 afterSuccessfulBasicHit(h,t,total);
 u.attackUsed=true;G.attackUsed=true;spendUnit(h,u);
}
function meepoAttackAssist(h,u,t){
 if(!M.assistAvailable(h)||M.assistSelected(h)!==u||!t)return;
 const p=Object.assign({},h,{name:'Meepo '+(u.i+1),team:h.team});playAttackSound(p);
 if(attackMisses(p,t))addLog('💨 '+p.name+' промахивается по '+t.name+'.');
 else{
  const hit=attackDamageInfo(p,t,physicalBaseDamage(p,t,effectiveAtk(h)),{allowCrit:true});
  const total=quarterValue((Number(hit.damage)||0)+.5,{minPositive:false});
  const info=Object.assign({},hit,{tags:[...(hit.tags||[]),'Ransack +0.5 чист.']});
  damage(t,total,attackSourceLabel(p,info),h,{impactDelay:attackImpactMs(h)});
  M.heal(h,.5);
  afterSuccessfulBasicHit(h,t,total);
 }
 M.consumeAssist(h,u);
}

M.switch=(h,u)=>{if(!h||!u||u.dead)return;h.meepoSel=u.uid;G.actions=u.actions;G.attackUsed=u.attackUsed;M.sync(h);render()};

M.assistAvailable=h=>{
 if(!h||!G||G.winner!==null)return false;
 const a=active?.(),st=M.assistState;
 return !!a&&!a.dead&&a.team===h.team&&a.id!==M.ID&&st?.serial===G.turnSerial&&st.team===h.team&&!st.used&&M.units(h).some(u=>u.host);
};
M.assistSelected=h=>{
 if(!M.assistAvailable(h))return null;
 let u=M.by(h,M.assistState.selectedUid);
 if(!u||!u.host||u.dead){u=M.units(h).find(x=>x.host);if(u)M.assistState.selectedUid=u.uid}
 return u||null;
};
M.selectAssist=(h,u)=>{if(M.assistAvailable(h)&&u?.host){M.assistState.selectedUid=u.uid;M.poofSelect=null;render()}};
M.consumeAssist=(h,u)=>{
 if(!M.assistState||M.assistState.serial!==G.turnSerial)return;
 M.assistState.used=true;M.assistState.selectedUid=u?.uid||M.assistState.selectedUid;M.poofSelect=null;render();
};
M.assistAttack=h=>{const u=M.assistSelected(h),t=u&&M.host(u);if(u&&t)meepoAttackAssist(h,u,t)};
M.assistPoof=h=>{const u=M.assistSelected(h);if(u&&u.poofCd<=0)M.startPoof(h,u,'assist')};
M.assistRehost=h=>{
 const u=M.assistSelected(h);if(!u)return;
 chooseHost(h,u,()=>M.consumeAssist(h,u));
};
M.assistReturn=h=>{
 const u=M.assistSelected(h);if(!u||!u.host)return;
 u.host=null;if(!h.meepoLine)h.meepoLine=u.uid;M.consumeAssist(h,u);M.sync(h);render();
};

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
  if(u.host){const t=M.host(u);if(t)meepoAttackOwn(h,u,t);return}
  chooseEnemy('Цель Meepo '+(u.i+1),()=>true,t=>meepoAttackOwn(h,u,t));return;
 }
 const m=G?M.root(1-G.team):null;if(!m)return baseBasicAttack();
 if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;
 if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}
 if(!h||h.dead)return;
 if((h.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}
 if(M.attackSelectActive()){M.clearAttackSelect();return}
 M.poofSelect=null;M.attackSelect={attackerTeam:h.team,attackerId:h.id,meepoTeam:m.team};render();
};
skill=function(id){
 const h=G&&active?.();if(h?.id!==M.ID)return baseSkill(id);
 const u=M.sel(h);if(!u||u.actions<1||targetMode)return;
 if(id==='poof'&&u.poofCd<=0&&!isHeroSilenced(h))M.startPoof(h,u,'turn');
};
spend=function(){const h=G&&active?.();if(h?.id!==M.ID)return baseSpend();const u=M.sel(h);if(u)spendUnit(h,u)};

beginActivation=function(){
 baseBeginActivation();
 if(!G)return;
 const a=active?.();
 for(const t of[0,1]){
  const h=M.root(t);if(!h)continue;
  if(a&&a.team===h.team&&a.id!==M.ID&&M.units(h).some(u=>u.host)){
   const hosted=M.units(h).filter(u=>u.host);
   M.assistState={serial:G.turnSerial,team:h.team,used:false,selectedUid:hosted[0]?.uid||null};
  }else if(M.assistState?.team===h.team&&M.assistState.serial!==G.turnSerial){
   M.assistState=null;
  }
 }
 render();
};

document.addEventListener('click',e=>{
 const target=e.target?.closest?.('[data-meepo-unit]');
 if(target){
  const h=M.root(Number(target.dataset.meepoTeam)),u=h&&M.by(h,target.dataset.meepoUnit);
  if(h&&u){
   if(M.canAttackUnit?.(h,u)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.attackUnit(h,u);return}
   if(M.canPoofTarget?.(h,u)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.pickPoofTarget(h,u);return}
  }
 }
 const baseCard=e.target?.closest?.('.hero[data-meepo-base-unit]');
 if(baseCard){
  const h=M.root(Number(baseCard.dataset.team)),u=h&&M.by(h,baseCard.dataset.meepoBaseUnit);
  if(h&&u){
   if(M.canAttackUnit?.(h,u)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.attackUnit(h,u);return}
   if(M.canPoofTarget?.(h,u)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.pickPoofTarget(h,u);return}
  }
 }
 if(!M.attackSelectActive())return;
 const heroCard=e.target?.closest?.('.hero.meepo-normal-attack-target');
 if(heroCard){
  const team=Number(heroCard.dataset.team),id=heroCard.dataset.hero,t=G?.teams?.[team]?.find(x=>x.id===id&&!x.dead);
  if(t){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();M.attackHero(t)}
 }
},true);
document.addEventListener('keydown',e=>{
 if(e.key!=='Escape')return;
 if(M.poofSelect){M.poofSelect=null;render();return}
 if(M.attackSelect)M.clearAttackSelect();
},true);
})();