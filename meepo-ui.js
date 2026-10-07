(()=>{
const M=window.Meepo3v3;if(!M)return;
const baseAbilitySheetHTML=abilitySheetHTML;
abilitySheetHTML=function(id,useSplash=false){
 if(id!==M.ID)return baseAbilitySheetHTML(id,useSplash);
 const h=DATA[id],src=window.MeepoMedia?.video||M.D;
 const media='<video class="ability-hero-icon meepo-ability-video" src="'+src+'" poster="'+M.D+'" autoplay muted loop playsinline preload="auto"></video>';
 return '<div class="ability-head">'+media+'<div><div class="ability-kicker">ГЕРОЙ</div><div class="ability-hero-name">'+h.name+'</div><div class="ability-base-stats">❤️ '+h.hp+' HP · ⚔️ '+h.atk+' урона</div></div></div><div class="ability-list">'+h.skills.map(sk=>'<section class="ability-row"><img class="ability-icon" src="'+skillIcon(id,sk.id)+'" alt=""><div class="ability-copy"><div class="ability-name">'+sk.name+'</div><div class="ability-desc">'+sk.desc+'</div></div></section>').join('')+'</div>';
};
function play(v){if(!v)return;v.muted=true;v.playsInline=true;v.play?.().catch(()=>{})}
function patch(h){
 const n=document.getElementById('hero-'+h.team+'-'+M.ID);if(!n)return;
 const attackMode=M.attackSelectActive?.()||false,lineAttackable=attackMode&&frontHero(h.team)===h,ls=M.lines(h),p=n.querySelector('.hero-portrait');
 let tabs=p?.querySelector('.meepo-tabs');
 if(!tabs&&p){tabs=document.createElement('div');tabs.className='meepo-tabs';p.appendChild(tabs)}
 if(tabs){
  tabs.innerHTML=ls.map(u=>{const can=M.canAttackUnit?.(h,u);return '<button type="button" data-u="'+u.uid+'" data-meepo-team="'+h.team+'" data-meepo-attack-unit="'+u.uid+'" class="'+(h.meepoLine===u.uid?'on ':'')+(can?'meepo-unit-attackable':'')+'">M'+(u.i+1)+' ❤️'+compactStatNum(u.hp)+'</button>'}).join('');
  tabs.style.display=(ls.length>1||lineAttackable)?'flex':'none';
  tabs.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const u=M.by(h,b.dataset.u);if(!u)return;if(M.canAttackUnit?.(h,u)){M.attackUnit(h,u);return}if(G.team===h.team&&active()===h&&!targetMode&&!M.attackSelect)M.switch(h,u)});
 }
 for(const u of M.units(h).filter(x=>x.host)){
  const t=M.host(u),c=t&&document.getElementById('hero-'+t.team+'-'+t.id);if(!c)continue;
  let st=Array.from(c.children).find(x=>x.classList?.contains('meepo-hosts'));if(!st){st=document.createElement('div');st.className='meepo-hosts';c.appendChild(st)}
  const q=document.createElement('button');q.type='button';q.dataset.meepoTeam=String(h.team);q.dataset.meepoAttackUnit=u.uid;
  if(M.canAttackUnit?.(h,u))q.classList.add('meepo-unit-attackable');
  const src=window.MeepoMedia?.video||'';
  q.innerHTML=(src?'<video src="'+src+'" poster="'+M.D+'" autoplay muted loop playsinline preload="auto"></video>':'<img src="'+M.D+'">')+'<span>❤️'+compactStatNum(u.hp)+' ⚔️'+effectiveAtk(h)+'</span>';
  q.onclick=e=>{e.preventDefault();e.stopPropagation();if(M.canAttackUnit?.(h,u)){M.attackUnit(h,u);return}if(G.team===h.team&&active()===h&&!targetMode&&!M.attackSelect)M.switch(h,u)};
  st.appendChild(q);play(q.querySelector('video'));
 }
}
const oldR=render;
render=function(){
 document.querySelectorAll('.meepo-hosts').forEach(x=>x.remove());
 document.querySelectorAll('.meepo-normal-attack-target').forEach(x=>x.classList.remove('meepo-normal-attack-target'));
 if(M.attackSelect&&!M.attackSelectActive?.())M.attackSelect=null;
 for(const t of[0,1]){const h=M.root(t);if(h){M.spawn(h);M.sync(h)}}
 const r=oldR();
 for(const t of[0,1]){const h=M.root(t);if(h)patch(h)}
 if(M.attackSelectActive?.()){
  const st=M.attackSelect,f=frontHero(st.meepoTeam);
  if(f&&f.id!==M.ID&&canBasicAttackTarget(active(),f))document.getElementById('hero-'+f.team+'-'+f.id)?.classList.add('meepo-normal-attack-target');
  const lab=document.getElementById('actionsLabel');if(lab)lab.textContent='Выберите цель атаки: передний герой или доступный Meepo';
 }
 const h=G&&active?.();
 if(h?.id===M.ID&&!targetMode&&!M.attackSelect){
  const u=M.sel(h),a=document.getElementById('actions');
  if(a&&u){
   const at=a.querySelector('.attack');if(at){at.textContent='⚔️ Атака Meepo '+(u.i+1)+' ('+effectiveAtk(h)+')';at.disabled=u.attackUsed||u.actions<1;at.onclick=basicAttack}
   a.querySelectorAll('.skill').forEach(x=>{if((x.textContent||'').includes('Poof')){x.disabled=u.poofCd>0||u.actions<1||isHeroSilenced(h);const sp=x.querySelector('span');if(sp)sp.textContent='Poof'+(u.poofCd?' [КД '+u.poofCd+']':'')}});
   const z=document.createElement('button');z.className='skill';z.innerHTML='<img class="skill-icon" src="'+M.V+'"><span>'+(u.host?'СЛЕЗТЬ / ПЕРЕСЕСТЬ':'НАСЕСТЬ')+'</span>';z.disabled=u.actions<1;
   z.onclick=()=>{if(!u.host)return M.chooseHost(h,u);const o=document.createElement('div');o.className='meepo-pick';o.innerHTML='<div><b>Meepo '+(u.i+1)+'</b><button data-line>ВЕРНУТЬСЯ В ЛИНИЮ</button><button data-move>НАСЕСТЬ НА ДРУГОГО</button><button data-x>ОТМЕНА</button></div>';document.body.appendChild(o);o.querySelector('[data-x]').onclick=()=>o.remove();o.querySelector('[data-move]').onclick=()=>{o.remove();M.chooseHost(h,u)};o.querySelector('[data-line]').onclick=()=>{o.remove();u.host=null;M.spend(h,u);if(!h.meepoLine)h.meepoLine=u.uid;M.sync(h);render()}};
   a.appendChild(z);
   const sw=document.createElement('button');sw.className='skill';sw.textContent='↔ СМЕНИТЬ МИПО';sw.onclick=()=>{const pool=M.units(h),i=pool.indexOf(u);M.switch(h,pool[(i+1)%pool.length])};a.appendChild(sw);
   const lab=document.getElementById('actionsLabel');if(lab)lab.textContent='Meepo '+(u.i+1)+': действия '+u.actions+'/2';
  }
 }
 document.querySelectorAll('.meepo-ability-video').forEach(play);
 return r;
};
const st=document.createElement('style');
st.textContent='.meepo-tabs{position:absolute;left:3px;right:3px;bottom:4px;z-index:14;display:flex;gap:2px}.meepo-tabs button{flex:1;font:800 8px system-ui;padding:2px;background:#102126;color:#fff;border:1px solid #55d6c8;border-radius:4px}.meepo-tabs button.on{outline:2px solid #ffd34d}.hero>.meepo-hosts{position:absolute!important;left:4px!important;right:4px!important;top:4px!important;bottom:auto!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;gap:3px!important;z-index:40!important;pointer-events:none!important}.hero>.meepo-hosts button{pointer-events:auto!important;width:44%!important;max-width:58px!important;padding:2px!important;background:#071216!important;color:#fff!important;border:1px solid #55d6c8!important;border-radius:5px!important}.hero>.meepo-hosts img,.hero>.meepo-hosts video{width:100%!important;height:40px!important;object-fit:cover!important;display:block!important;border-radius:3px!important}.hero>.meepo-hosts span{display:block!important;font:800 8px/1.1 system-ui!important;white-space:nowrap!important;margin-top:2px!important}.meepo-unit-attackable,.hero.meepo-normal-attack-target{cursor:crosshair!important}.meepo-unit-attackable{outline:2px solid #ffcf45!important;box-shadow:0 0 10px rgba(255,207,69,.85)!important}.hero.meepo-normal-attack-target{box-shadow:0 0 0 2px #ffcf45,0 0 18px rgba(255,207,69,.55)!important}.meepo-ability-video{display:block!important;width:100px!important;height:64px!important;min-width:100px!important;max-width:100px!important;object-fit:cover!important;object-position:center!important;border-radius:8px!important}.meepo-pick{position:fixed;inset:0;z-index:2147483646;background:#0008;display:grid;place-items:center}.meepo-pick>div{background:#101722;border:1px solid #405574;border-radius:12px;padding:14px;display:grid;gap:7px;min-width:260px;color:#fff}.meepo-pick button{padding:8px;background:#1a2638;color:#fff;border:1px solid #455b78;border-radius:7px}';
document.head.appendChild(st);try{draft()}catch(_){}
})();