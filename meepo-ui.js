(()=>{
const M=window.Meepo3v3;if(!M)return;

const baseAbilitySheetHTML=abilitySheetHTML;
abilitySheetHTML=function(id,useSplash=false){
 if(id!==M.ID)return baseAbilitySheetHTML(id,useSplash);
 const h=DATA[id],heroArt=draftPortraitSrc(id);
 return '<div class="ability-head"><img class="ability-hero-icon meepo-sheet-icon" src="'+heroArt+'" alt="MEEPO"><div><div class="ability-kicker">ГЕРОЙ</div><div class="ability-hero-name">'+h.name+'</div><div class="ability-base-stats">❤️ '+h.hp+' HP · ⚔️ '+h.atk+' урона</div></div></div><div class="ability-list">'+h.skills.map(sk=>'<section class="ability-row"><img class="ability-icon" src="'+skillIcon(id,sk.id)+'" alt=""><div class="ability-copy"><div class="ability-name">'+sk.name+'</div><div class="ability-desc">'+sk.desc+'</div></div></section>').join('')+'</div>';
};

function unitClasses(h,u){
 const cls=['meepo-unit-card'];
 if(M.canAttackUnit?.(h,u))cls.push('meepo-unit-attackable');
 if(M.canPoofTarget?.(h,u))cls.push('meepo-poof-target');
 if(M.assistAvailable?.(h)&&M.assistSelected?.(h)?.uid===u.uid)cls.push('meepo-assist-selected');
 if(h.meepoLine===u.uid)cls.push('meepo-line-primary');
 if(h.meepoSel===u.uid&&active?.()===h)cls.push('meepo-selected');
 if(M.poofSelectActive?.()&&M.poofSelect?.team===h.team&&M.poofSelect?.sourceUid===u.uid)cls.push('meepo-poof-source');
 return cls.join(' ');
}
function unitClick(h,u,e){
 e?.preventDefault?.();e?.stopPropagation?.();
 if(M.canAttackUnit?.(h,u)){M.attackUnit(h,u);return}
 if(M.canPoofTarget?.(h,u)){M.pickPoofTarget(h,u);return}
 if(M.assistAvailable?.(h)&&u.host){M.selectAssist(h,u);return}
 if(G?.team===h.team&&active?.()===h&&!targetMode&&!M.attackSelect&&!M.poofSelect)M.switch(h,u);
}
function lineUnitHTML(h,u){
 const selected=h.meepoSel===u.uid&&active?.()===h?'<em class="meepo-selected-badge">ВЫБРАН</em>':'';
 return '<button type="button" class="'+unitClasses(h,u)+' meepo-line-unit" data-meepo-team="'+h.team+'" data-meepo-unit="'+u.uid+'">'+selected+'<img src="'+M.D+'" alt=""><span class="meepo-unit-copy"><b>Meepo '+(u.i+1)+'</b><small>❤️ '+compactStatNum(u.hp)+'/'+compactStatNum(u.maxHp)+' · ⚔️ '+compactStatNum(effectiveAtk(h))+'</small></span></button>';
}
function hostUnitHTML(h,u){
 const selected=h.meepoSel===u.uid&&active?.()===h?'<em class="meepo-selected-badge">ВЫБРАН</em>':'';
 const media=window.MeepoMedia?.video
  ? '<video src="'+window.MeepoMedia.video+'" poster="'+M.D+'" autoplay muted loop playsinline preload="auto"></video>'
  : '<img src="'+M.D+'" alt="">';
 return '<button type="button" class="'+unitClasses(h,u)+' meepo-host-unit" data-meepo-team="'+h.team+'" data-meepo-unit="'+u.uid+'">'+selected+media+'<span><b>Meepo '+(u.i+1)+'</b> ❤️'+compactStatNum(u.hp)+' · ⚔️'+compactStatNum(effectiveAtk(h))+'</span></button>';
}
function patchLine(h){
 const card=document.getElementById('hero-'+h.team+'-'+M.ID);if(!card)return;
 const portrait=card.querySelector('.hero-portrait'),ls=M.lines(h);
 let pods=portrait?.querySelector('.meepo-line-pods');
 if(!pods&&portrait){pods=document.createElement('div');pods.className='meepo-line-pods';portrait.appendChild(pods)}
 if(!pods)return;
 const targeting=M.attackSelectActive?.()||M.poofSelectActive?.();
 const shouldShow=ls.length>1||(targeting&&ls.some(u=>M.canAttackUnit?.(h,u)||M.canPoofTarget?.(h,u)));
 pods.innerHTML=shouldShow?ls.map(u=>lineUnitHTML(h,u)).join(''):'';
 pods.style.display=shouldShow?'flex':'none';
 pods.querySelectorAll('[data-meepo-unit]').forEach(b=>{
  const u=M.by(h,b.dataset.meepoUnit);if(u)b.onclick=e=>unitClick(h,u,e);
 });
}
function patchHosted(h){
 for(const u of M.units(h).filter(x=>x.host)){
  const t=M.host(u),card=t&&document.getElementById('hero-'+t.team+'-'+t.id);if(!card)continue;
  let stack=Array.from(card.children).find(x=>x.classList?.contains('meepo-hosts'));
  if(!stack){stack=document.createElement('div');stack.className='meepo-hosts';card.appendChild(stack)}
  const wrap=document.createElement('div');wrap.innerHTML=hostUnitHTML(h,u);
  const b=wrap.firstElementChild;stack.appendChild(b);
  b.onclick=e=>unitClick(h,u,e);
  const v=b.querySelector('video');if(v){v.muted=true;v.playsInline=true;v.play().catch(()=>{})}
 }
}
function patchAssistPanel(h){
 if(!M.assistAvailable?.(h))return;
 const u=M.assistSelected(h),host=u&&M.host(u),actions=document.getElementById('actions');if(!u||!host||!actions)return;
 const panel=document.createElement('div');panel.className='meepo-assist-panel';
 const poofOn=M.poofSelectActive?.()&&M.poofSelect?.mode==='assist'&&M.poofSelect?.sourceUid===u.uid;
 panel.innerHTML='<div class="meepo-assist-title"><img src="'+M.D+'" alt=""><div><b>Meepo '+(u.i+1)+'</b><small>1 отдельное действие · на '+host.name+'</small></div></div><div class="meepo-assist-buttons"><button type="button" data-act="attack">⚔️ АТАКА</button><button type="button" data-act="poof">'+(poofOn?'✕ ОТМЕНИТЬ POOF':'🌀 POOF')+'</button><button type="button" data-act="move">↗ ПЕРЕСЕСТЬ</button><button type="button" data-act="line">↩ В ЛИНИЮ</button></div>';
 actions.appendChild(panel);
 panel.querySelector('[data-act="attack"]').onclick=()=>M.assistAttack(h);
 const pb=panel.querySelector('[data-act="poof"]');pb.disabled=(u.poofCd||0)>0;pb.onclick=()=>M.assistPoof(h);
 panel.querySelector('[data-act="move"]').onclick=()=>M.assistRehost(h);
 panel.querySelector('[data-act="line"]').onclick=()=>M.assistReturn(h);
}
const oldR=render;
render=function(){
 document.querySelectorAll('.meepo-hosts,.meepo-assist-panel').forEach(x=>x.remove());
 document.querySelectorAll('.meepo-normal-attack-target').forEach(x=>x.classList.remove('meepo-normal-attack-target'));
 if(M.attackSelect&&!M.attackSelectActive?.())M.attackSelect=null;
 if(M.poofSelect&&!M.poofSelectActive?.())M.poofSelect=null;
 for(const t of[0,1]){const h=M.root(t);if(h){M.spawn(h);M.normalize?.(h);M.sync(h)}}
 const r=oldR();
 for(const t of[0,1]){const h=M.root(t);if(h){patchLine(h);patchHosted(h)}}
 if(M.attackSelectActive?.()){
  const st=M.attackSelect,f=frontHero(st.meepoTeam);
  if(f&&f.id!==M.ID&&canBasicAttackTarget(active(),f))document.getElementById('hero-'+f.team+'-'+f.id)?.classList.add('meepo-normal-attack-target');
  const lab=document.getElementById('actionsLabel');if(lab)lab.textContent='Атака: нажмите переднего героя или доступного Meepo';
 }
 if(M.poofSelectActive?.()){
  const lab=document.getElementById('actionsLabel');if(lab)lab.textContent='Poof: нажмите другого Meepo';
 }
 const h=G&&active?.();
 if(h?.id===M.ID&&!targetMode&&!M.attackSelect){
  const u=M.sel(h),actions=document.getElementById('actions');
  if(actions&&u){
   const at=actions.querySelector('.attack');
   if(at){at.textContent='⚔️ Атака Meepo '+(u.i+1)+' ('+effectiveAtk(h)+')';at.disabled=u.attackUsed||u.actions<1||!!M.poofSelect;at.onclick=basicAttack}
   actions.querySelectorAll('.skill').forEach(x=>{
    if((x.textContent||'').includes('Poof')||(x.textContent||'').includes('POOF')){
     const poofOn=M.poofSelectActive?.()&&M.poofSelect?.sourceUid===u.uid;
     x.disabled=(u.poofCd>0||u.actions<1||isHeroSilenced(h))&&!poofOn;
     const sp=x.querySelector('span');if(sp)sp.textContent=poofOn?'Отменить Poof':'Poof'+(u.poofCd?' [КД '+u.poofCd+']':'');
    }
   });
   const z=document.createElement('button');z.className='skill';z.innerHTML='<img class="skill-icon" src="'+M.V+'"><span>'+(u.host?'СЛЕЗТЬ / ПЕРЕСЕСТЬ':'НАСЕСТЬ')+'</span>';z.disabled=u.actions<1||!!M.poofSelect;
   z.onclick=()=>{
    if(!u.host)return M.chooseHost(h,u);
    const o=document.createElement('div');o.className='meepo-pick';o.innerHTML='<div><b>Meepo '+(u.i+1)+'</b><button data-line>ВЕРНУТЬСЯ В ЛИНИЮ</button><button data-move>НАСЕСТЬ НА ДРУГОГО</button><button data-x>ОТМЕНА</button></div>';
    document.body.appendChild(o);o.querySelector('[data-x]').onclick=()=>o.remove();o.querySelector('[data-move]').onclick=()=>{o.remove();M.chooseHost(h,u)};o.querySelector('[data-line]').onclick=()=>{o.remove();u.host=null;M.spend(h,u);if(!h.meepoLine)h.meepoLine=u.uid;M.sync(h);render()};
   };
   actions.appendChild(z);
   const sw=document.createElement('button');sw.className='skill';sw.textContent='↔ СМЕНИТЬ МИПО';sw.disabled=!!M.poofSelect;
   sw.onclick=()=>{const pool=M.units(h),i=pool.indexOf(u);M.switch(h,pool[(i+1)%pool.length])};actions.appendChild(sw);
   if(!M.poofSelect){const lab=document.getElementById('actionsLabel');if(lab)lab.textContent='Meepo '+(u.i+1)+': действия '+u.actions+'/2'}
  }
 }else if(h&&h.id!==M.ID){
  const own=M.root(h.team);if(own)patchAssistPanel(own);
 }
 return r;
};
const st=document.createElement('style');
st.textContent=`
.meepo-sheet-icon{object-fit:cover!important;object-position:center!important}
.meepo-line-pods{position:absolute;left:5px;right:5px;bottom:5px;display:flex;justify-content:center;gap:5px;z-index:22;pointer-events:none}
.meepo-line-unit{pointer-events:auto;flex:1;min-width:0;max-width:74px;display:grid;grid-template-columns:30px 1fr;align-items:center;gap:4px;padding:3px;background:linear-gradient(180deg,rgba(14,31,39,.95),rgba(5,15,20,.96));border:1px solid rgba(83,214,200,.8);border-radius:7px;color:#fff;box-shadow:0 3px 10px rgba(0,0,0,.45)}
.meepo-line-unit img{width:30px!important;height:34px!important;min-width:30px!important;object-fit:cover!important;object-position:center!important;border-radius:4px!important}
.meepo-unit-copy{min-width:0;text-align:left;line-height:1.05}.meepo-unit-copy b{display:block;font:900 9px system-ui}.meepo-unit-copy small{display:block;font:800 7px system-ui;white-space:nowrap;margin-top:3px}
.meepo-line-primary{border-color:#7da9c7!important}
.meepo-selected{position:relative!important;border:2px solid #ffd34d!important;box-shadow:0 0 0 1px rgba(255,211,77,.25),0 0 18px rgba(255,211,77,.9)!important;transform:translateY(-1px)!important}
.meepo-selected-badge{position:absolute;top:-7px;left:50%;transform:translateX(-50%);z-index:4;background:#ffd34d;color:#1a1400;border-radius:4px;padding:1px 4px;font:900 6px/1.4 system-ui;font-style:normal;letter-spacing:.25px;white-space:nowrap;box-shadow:0 1px 5px #000}
.meepo-poof-source{outline:2px solid #a66cff!important;box-shadow:0 0 15px rgba(166,108,255,.95)!important}
.hero>.meepo-hosts{position:absolute!important;left:4px!important;right:4px!important;top:4px!important;bottom:auto!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;gap:4px!important;z-index:40!important;pointer-events:none!important}
.meepo-host-unit{pointer-events:auto!important;width:46%!important;max-width:62px!important;padding:2px!important;background:rgba(5,18,23,.96)!important;color:#fff!important;border:1px solid #55d6c8!important;border-radius:6px!important;box-shadow:0 3px 12px rgba(0,0,0,.55)!important}
.meepo-host-unit img,.meepo-host-unit video{width:100%!important;height:39px!important;object-fit:cover!important;object-position:center!important;display:block!important;border-radius:4px!important}
.meepo-host-unit span{display:block!important;font:800 7px/1.1 system-ui!important;white-space:nowrap!important;margin-top:2px!important}
.meepo-unit-attackable,.hero.meepo-normal-attack-target{cursor:crosshair!important}
.meepo-unit-attackable{outline:2px solid #ffcf45!important;box-shadow:0 0 12px rgba(255,207,69,.95)!important}
.meepo-poof-target{outline:2px solid #62d8ff!important;box-shadow:0 0 14px rgba(98,216,255,.95)!important;cursor:pointer!important}
.meepo-assist-selected{border-color:#b080ff!important;box-shadow:0 0 12px rgba(176,128,255,.8)!important}
.hero.meepo-normal-attack-target{box-shadow:0 0 0 2px #ffcf45,0 0 18px rgba(255,207,69,.55)!important}
.meepo-assist-panel{flex:1 1 100%;display:flex;align-items:center;gap:8px;padding:7px 8px;border:1px solid #55718a;border-radius:9px;background:linear-gradient(180deg,#142333,#0d1722);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.meepo-assist-title{display:flex;align-items:center;gap:7px;min-width:150px}.meepo-assist-title img{width:44px!important;height:30px!important;object-fit:cover!important;border-radius:5px!important}.meepo-assist-title b,.meepo-assist-title small{display:block}.meepo-assist-title b{font-size:12px}.meepo-assist-title small{font-size:9px;color:#aebed0;margin-top:2px}
.meepo-assist-buttons{display:flex;gap:5px;flex-wrap:wrap}.meepo-assist-buttons button{border:1px solid #435873;background:#1b2a3e;color:#fff;border-radius:6px;padding:6px 8px;font:800 9px system-ui}.meepo-assist-buttons button:disabled{opacity:.45}
.meepo-pick{position:fixed;inset:0;z-index:2147483646;background:#0008;display:grid;place-items:center}.meepo-pick>div{background:#101722;border:1px solid #405574;border-radius:12px;padding:14px;display:grid;gap:7px;min-width:260px;color:#fff}.meepo-pick button{padding:8px;background:#1a2638;color:#fff;border:1px solid #455b78;border-radius:7px}
html.dota-landscape-mobile .meepo-line-unit{max-width:56px;grid-template-columns:22px 1fr;padding:2px;gap:2px}html.dota-landscape-mobile .meepo-line-unit img{width:22px!important;height:26px!important;min-width:22px!important}html.dota-landscape-mobile .meepo-unit-copy small{font-size:6px}.meepo-assist-panel{font-size:10px}
`;
document.head.appendChild(st);
try{draft()}catch(_){}
})();