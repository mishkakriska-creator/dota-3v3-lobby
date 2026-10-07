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
function cloneUnitHTML(h,u){
 const selected=h.meepoSel===u.uid&&active?.()===h?'<i class="meepo-clone-check">✓</i>':'';
 return '<button type="button" class="'+unitClasses(h,u)+' meepo-clone-unit" data-meepo-team="'+h.team+'" data-meepo-unit="'+u.uid+'"><span class="meepo-clone-avatar"><img src="'+M.D+'" alt=""><b class="meepo-clone-index">'+(u.i+1)+'</b>'+selected+'</span><small class="meepo-clone-hp">♥ '+compactStatNum(u.hp)+'</small></button>';
}
function hostUnitHTML(h,u){
 const selected=h.meepoSel===u.uid&&active?.()===h?'<i class="meepo-host-check">✓</i>':'';
 const media=window.MeepoMedia?.video
  ? '<video src="'+window.MeepoMedia.video+'" poster="'+M.D+'" autoplay muted loop playsinline preload="auto"></video>'
  : '<img src="'+M.D+'" alt="">';
 return '<button type="button" class="'+unitClasses(h,u)+' meepo-host-unit" data-meepo-team="'+h.team+'" data-meepo-unit="'+u.uid+'">'+selected+media+'<span><b>Meepo '+(u.i+1)+'</b> ❤️'+compactStatNum(u.hp)+' · ⚔️'+compactStatNum(effectiveAtk(h))+'</span></button>';
}
function patchLine(h){
 const card=document.getElementById('hero-'+h.team+'-'+M.ID);if(!card)return;
 card.querySelectorAll('.meepo-line-pods,.meepo-clone-stack,.meepo-main-selected-badge').forEach(x=>x.remove());
 card.classList.remove('meepo-main-selected','meepo-base-unit-attackable','meepo-base-poof-target','meepo-base-poof-source');
 delete card.dataset.meepoBaseUnit;
 const lineUnits=M.lines(h),base=M.line(h)||lineUnits[0]||null;
 if(!base)return;
 card.dataset.meepoBaseUnit=base.uid;
 if(M.canAttackUnit?.(h,base))card.classList.add('meepo-base-unit-attackable');
 if(M.canPoofTarget?.(h,base))card.classList.add('meepo-base-poof-target');
 if(M.poofSelectActive?.()&&M.poofSelect?.team===h.team&&M.poofSelect?.sourceUid===base.uid)card.classList.add('meepo-base-poof-source');
 if(h.meepoSel===base.uid&&active?.()===h){
  card.classList.add('meepo-main-selected');
  const badge=document.createElement('div');
  badge.className='meepo-main-selected-badge';
  badge.textContent='M'+(base.i+1)+' ✓';
  card.appendChild(badge);
 }
 const clones=lineUnits.filter(x=>x.uid!==base.uid);
 if(!clones.length)return;
 const stack=document.createElement('div');stack.className='meepo-clone-stack';
 stack.innerHTML=clones.map(x=>cloneUnitHTML(h,x)).join('');
 card.appendChild(stack);
 stack.querySelectorAll('[data-meepo-unit]').forEach(b=>{
  const unit=M.by(h,b.dataset.meepoUnit);if(unit)b.onclick=e=>unitClick(h,unit,e);
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
 document.querySelectorAll('.meepo-hosts,.meepo-assist-panel,.meepo-clone-stack,.meepo-main-selected-badge,.meepo-line-pods').forEach(x=>x.remove());
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
.meepo-line-pods{position:absolute;left:6px;right:6px;bottom:6px;display:flex;justify-content:center;align-items:flex-end;gap:4px;z-index:22;pointer-events:none}
.meepo-line-unit{pointer-events:auto!important;position:relative!important;flex:0 0 38px!important;width:38px!important;height:47px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;padding:2px!important;background:rgba(5,15,20,.92)!important;border:1px solid rgba(83,214,200,.7)!important;border-radius:8px!important;color:#fff!important;box-shadow:0 3px 10px rgba(0,0,0,.5)!important;overflow:visible!important;transition:transform .12s ease,box-shadow .12s ease,border-color .12s ease!important}
.meepo-line-avatar{position:relative!important;display:block!important;width:32px!important;height:32px!important;min-width:32px!important}
.meepo-line-avatar img{display:block!important;width:32px!important;height:32px!important;min-width:32px!important;max-width:32px!important;object-fit:cover!important;object-position:center!important;border-radius:6px!important}
.meepo-line-index{position:absolute!important;left:-3px!important;top:-3px!important;width:14px!important;height:14px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#10262c!important;border:1px solid #64d8cc!important;color:#fff!important;font:900 8px/14px system-ui!important;box-shadow:0 1px 4px #000!important}
.meepo-line-hp{display:block!important;width:100%!important;text-align:center!important;font:900 8px/10px system-ui!important;color:#f1f6fb!important;white-space:nowrap!important}
.meepo-line-primary{border-color:#78b9c9!important}
.meepo-selected{border:2px solid #ffd34d!important;box-shadow:0 0 0 1px rgba(255,211,77,.18),0 0 14px rgba(255,211,77,.8)!important;transform:translateY(-3px) scale(1.05)!important;z-index:4!important}
.meepo-selected .meepo-line-index{background:#ffd34d!important;border-color:#fff0a4!important;color:#181100!important}
.meepo-selected-check{position:absolute!important;right:-4px!important;top:-4px!important;width:14px!important;height:14px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#ffd34d!important;color:#181100!important;border:1px solid #fff0a4!important;font:1000 9px/14px system-ui!important;font-style:normal!important;box-shadow:0 1px 5px #000!important}
.meepo-poof-source{outline:2px solid #a66cff!important;box-shadow:0 0 15px rgba(166,108,255,.95)!important}
.battlefield .hero>.meepo-hosts{position:absolute!important;left:50%!important;right:auto!important;top:-72px!important;bottom:auto!important;transform:translateX(-50%)!important;width:max-content!important;max-width:none!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;gap:5px!important;z-index:66!important;overflow:visible!important;pointer-events:none!important}
.meepo-host-unit{pointer-events:auto!important;position:relative!important;width:58px!important;max-width:58px!important;padding:3px!important;background:linear-gradient(180deg,rgba(10,31,37,.98),rgba(4,15,20,.98))!important;color:#fff!important;border:1px solid #55d6c8!important;border-radius:8px!important;box-shadow:0 6px 16px rgba(0,0,0,.58),0 0 10px rgba(85,214,200,.14)!important}
.meepo-host-unit img,.meepo-host-unit video{width:100%!important;height:42px!important;object-fit:cover!important;object-position:center!important;display:block!important;border-radius:5px!important}
.meepo-host-unit span{display:block!important;font:800 7px/1.1 system-ui!important;white-space:nowrap!important;margin-top:3px!important;text-align:center!important}
.meepo-unit-attackable,.hero.meepo-normal-attack-target{cursor:crosshair!important}
.meepo-unit-attackable{outline:2px solid #ffcf45!important;box-shadow:0 0 12px rgba(255,207,69,.95)!important}
.meepo-poof-target{outline:2px solid #62d8ff!important;box-shadow:0 0 14px rgba(98,216,255,.95)!important;cursor:pointer!important}
.meepo-assist-selected{border-color:#b080ff!important;box-shadow:0 0 12px rgba(176,128,255,.8)!important}
.hero.meepo-normal-attack-target{box-shadow:0 0 0 2px #ffcf45,0 0 18px rgba(255,207,69,.55)!important}
.meepo-assist-panel{flex:1 1 100%;display:flex;align-items:center;gap:8px;padding:7px 8px;border:1px solid #55718a;border-radius:9px;background:linear-gradient(180deg,#142333,#0d1722);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.meepo-assist-title{display:flex;align-items:center;gap:7px;min-width:150px}.meepo-assist-title img{width:44px!important;height:30px!important;object-fit:cover!important;border-radius:5px!important}.meepo-assist-title b,.meepo-assist-title small{display:block}.meepo-assist-title b{font-size:12px}.meepo-assist-title small{font-size:9px;color:#aebed0;margin-top:2px}
.meepo-assist-buttons{display:flex;gap:5px;flex-wrap:wrap}.meepo-assist-buttons button{border:1px solid #435873;background:#1b2a3e;color:#fff;border-radius:6px;padding:6px 8px;font:800 9px system-ui}.meepo-assist-buttons button:disabled{opacity:.45}
.meepo-pick{position:fixed;inset:0;z-index:2147483646;background:#0008;display:grid;place-items:center}.meepo-pick>div{background:#101722;border:1px solid #405574;border-radius:12px;padding:14px;display:grid;gap:7px;min-width:260px;color:#fff}.meepo-pick button{padding:8px;background:#1a2638;color:#fff;border:1px solid #455b78;border-radius:7px}
html.dota-landscape-mobile .meepo-line-pods{gap:3px!important;bottom:4px!important}
html.dota-landscape-mobile .meepo-line-unit{flex-basis:32px!important;width:32px!important;height:40px!important;padding:1px!important}
html.dota-landscape-mobile .meepo-line-avatar,html.dota-landscape-mobile .meepo-line-avatar img{width:27px!important;height:27px!important;min-width:27px!important;max-width:27px!important}
html.dota-landscape-mobile .meepo-line-index,html.dota-landscape-mobile .meepo-selected-check{width:12px!important;height:12px!important;font-size:7px!important;line-height:12px!important}
html.dota-landscape-mobile .meepo-line-hp{font-size:7px!important;line-height:8px!important}
.meepo-assist-panel{font-size:10px}
`;
st.textContent+="\n/* Meepo line layout v7: the full card is the line Meepo; only extra clones float above it. */\n.meepo-line-pods{display:none!important}\n.hero.meepo-main-selected{box-shadow:0 0 0 2px #ffd34d,0 0 20px rgba(255,211,77,.62)!important}\n.hero.meepo-base-unit-attackable{cursor:crosshair!important;box-shadow:0 0 0 2px #ffcf45,0 0 18px rgba(255,207,69,.55)!important}\n.hero.meepo-base-poof-target{cursor:pointer!important;box-shadow:0 0 0 2px #62d8ff,0 0 18px rgba(98,216,255,.65)!important}\n.hero.meepo-base-poof-source{box-shadow:0 0 0 2px #a66cff,0 0 18px rgba(166,108,255,.75)!important}\n.meepo-main-selected-badge{position:absolute!important;top:5px!important;left:50%!important;transform:translateX(-50%)!important;z-index:47!important;background:#ffd34d!important;color:#1b1400!important;border:1px solid #fff0a4!important;border-radius:5px!important;padding:2px 6px!important;font:1000 7px/1.25 system-ui!important;letter-spacing:.3px!important;box-shadow:0 2px 7px rgba(0,0,0,.7)!important;pointer-events:none!important}\n.hero>.meepo-clone-stack{position:absolute!important;top:31px!important;left:5px!important;right:5px!important;z-index:46!important;display:flex!important;justify-content:center!important;align-items:flex-start!important;gap:5px!important;pointer-events:none!important}\n.meepo-clone-unit{pointer-events:auto!important;position:relative!important;width:43px!important;height:49px!important;flex:0 0 43px!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:2px!important;padding:2px!important;background:rgba(5,15,20,.94)!important;border:1px solid rgba(83,214,200,.82)!important;border-radius:7px!important;color:#fff!important;box-shadow:0 3px 10px rgba(0,0,0,.58)!important;overflow:visible!important}\n.meepo-clone-avatar{position:relative!important;display:block!important;width:37px!important;height:34px!important}\n.meepo-clone-avatar img{display:block!important;width:37px!important;height:34px!important;min-width:37px!important;max-width:37px!important;object-fit:cover!important;object-position:center!important;border-radius:5px!important}\n.meepo-clone-index{position:absolute!important;left:-3px!important;top:-3px!important;width:14px!important;height:14px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#10262c!important;border:1px solid #64d8cc!important;color:#fff!important;font:900 8px/14px system-ui!important;box-shadow:0 1px 4px #000!important}\n.meepo-clone-hp{display:block!important;width:100%!important;text-align:center!important;font:900 8px/10px system-ui!important;color:#f1f6fb!important;white-space:nowrap!important}\n.meepo-clone-unit.meepo-selected{border:2px solid #ffd34d!important;box-shadow:0 0 0 1px rgba(255,211,77,.2),0 0 15px rgba(255,211,77,.85)!important;transform:translateY(-2px)!important}\n.meepo-clone-unit.meepo-selected .meepo-clone-index{background:#ffd34d!important;border-color:#fff0a4!important;color:#181100!important}\n.meepo-clone-check{position:absolute!important;right:-4px!important;top:-4px!important;width:14px!important;height:14px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#ffd34d!important;color:#181100!important;border:1px solid #fff0a4!important;font:1000 9px/14px system-ui!important;font-style:normal!important;box-shadow:0 1px 5px #000!important}\n.meepo-clone-unit.meepo-unit-attackable{outline:2px solid #ffcf45!important}\n.meepo-clone-unit.meepo-poof-target{outline:2px solid #62d8ff!important}\n.meepo-clone-unit.meepo-poof-source{outline:2px solid #a66cff!important}\nhtml.dota-landscape-mobile .hero>.meepo-clone-stack{top:27px!important;gap:3px!important}\nhtml.dota-landscape-mobile .meepo-clone-unit{width:35px!important;height:42px!important;flex-basis:35px!important;padding:1px!important}\nhtml.dota-landscape-mobile .meepo-clone-avatar,html.dota-landscape-mobile .meepo-clone-avatar img{width:31px!important;height:29px!important;min-width:31px!important;max-width:31px!important}\nhtml.dota-landscape-mobile .meepo-clone-hp{font-size:7px!important;line-height:8px!important}\n";
st.textContent+="\n.meepo-host-check{position:absolute!important;right:-4px!important;top:-5px!important;width:14px!important;height:14px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#ffd34d!important;color:#171100!important;border:1px solid #fff1a8!important;font:1000 9px/14px system-ui!important;font-style:normal!important;z-index:4!important;box-shadow:0 1px 5px #000!important}\n.meepo-selected-badge{display:none!important}\n.meepo-poof-ghost{position:fixed!important;z-index:2147483646!important;pointer-events:none!important;overflow:visible!important;transform-origin:center!important}\n.meepo-poof-ghost-core{width:100%!important;height:100%!important;display:grid!important;place-items:center!important;position:relative!important;border-radius:9px!important;background:radial-gradient(circle at 50% 50%,rgba(103,225,255,.38),rgba(64,83,130,.18) 50%,rgba(10,17,29,.05) 72%)!important}\n.meepo-poof-ghost-core img{width:min(56px,90%)!important;height:min(48px,82%)!important;object-fit:cover!important;border-radius:7px!important;border:1px solid rgba(132,229,255,.88)!important;box-shadow:0 0 14px rgba(93,216,255,.8)!important}\n.meepo-poof-ghost-core b{position:absolute!important;bottom:-8px!important;left:50%!important;transform:translateX(-50%)!important;background:#162231!important;color:#e9fbff!important;border:1px solid #69d8f4!important;border-radius:4px!important;padding:1px 4px!important;font:900 7px/1.2 system-ui!important}\nhtml.dota-landscape-mobile .battlefield .hero>.meepo-hosts{top:-57px!important;gap:3px!important}\nhtml.dota-landscape-mobile .meepo-host-unit{width:45px!important;max-width:45px!important;padding:2px!important}\nhtml.dota-landscape-mobile .meepo-host-unit img,html.dota-landscape-mobile .meepo-host-unit video{height:32px!important}\n";
st.textContent+="\n.meepo-poof-fx{position:fixed!important;width:116px!important;height:116px!important;transform:translate(-50%,-50%)!important;z-index:2147483646!important;pointer-events:none!important;overflow:visible!important;opacity:0!important}\n.meepo-poof-fx.go{opacity:1!important}\n.meepo-poof-core,.meepo-poof-ring,.meepo-poof-smoke,.meepo-poof-spark{position:absolute!important;left:50%!important;top:50%!important;pointer-events:none!important}\n.meepo-poof-core{width:26px!important;height:26px!important;border-radius:50%!important;transform:translate(-50%,-50%) scale(.15)!important;background:radial-gradient(circle,#fff 0 15%,#eafcff 20%,#7bdcff 42%,#7d67ff 67%,rgba(89,38,178,.12) 83%,transparent 100%)!important;box-shadow:0 0 12px #fff,0 0 24px #73dcff,0 0 42px rgba(131,91,255,.95)!important}\n.meepo-poof-ring{width:48px!important;height:48px!important;border-radius:50%!important;transform:translate(-50%,-50%) scale(.3)!important;border:3px solid rgba(126,225,255,.9)!important;box-shadow:0 0 12px rgba(112,221,255,.9),inset 0 0 9px rgba(144,100,255,.75)!important}\n.meepo-poof-ring.r2{width:68px!important;height:68px!important;border-color:rgba(152,103,255,.72)!important}\n.meepo-poof-smoke{width:78px!important;height:78px!important;border-radius:50%!important;transform:translate(-50%,-50%) scale(.35)!important;background:radial-gradient(circle,rgba(255,255,255,.45) 0 10%,rgba(103,218,255,.36) 26%,rgba(117,70,220,.38) 46%,rgba(50,25,96,.24) 62%,transparent 76%)!important;filter:blur(4px)!important}\n.meepo-poof-fx.charge.go .meepo-poof-core{animation:meepoPoofChargeCore .36s ease-in forwards!important}\n.meepo-poof-fx.charge.go .meepo-poof-ring.r1{animation:meepoPoofChargeRing .38s ease-out forwards!important}\n.meepo-poof-fx.charge.go .meepo-poof-ring.r2{animation:meepoPoofChargeRing2 .42s ease-out forwards!important}\n.meepo-poof-fx.charge.go .meepo-poof-smoke{animation:meepoPoofChargeSmoke .42s ease-out forwards!important}\n.meepo-poof-fx.burst.go .meepo-poof-core{animation:meepoPoofBurstCore .58s cubic-bezier(.13,.72,.19,1) forwards!important}\n.meepo-poof-fx.burst.go .meepo-poof-ring.r1{animation:meepoPoofBurstRing .62s ease-out forwards!important}\n.meepo-poof-fx.burst.go .meepo-poof-ring.r2{animation:meepoPoofBurstRing2 .72s ease-out forwards!important}\n.meepo-poof-fx.burst.go .meepo-poof-smoke{animation:meepoPoofBurstSmoke .72s ease-out forwards!important}\n.meepo-poof-spark{width:5px!important;height:22px!important;margin-left:-2.5px!important;margin-top:-11px!important;border-radius:50%!important;background:linear-gradient(to top,rgba(130,74,255,0),#a8edff 55%,#fff)!important;filter:drop-shadow(0 0 5px #7fdcff)!important;opacity:0!important;transform-origin:50% 11px!important}\n.meepo-poof-fx.burst.go .meepo-poof-spark{animation:meepoPoofSpark .56s ease-out forwards!important}\n.meepo-poof-spark.s0{--r:0deg}.meepo-poof-spark.s1{--r:36deg}.meepo-poof-spark.s2{--r:72deg}.meepo-poof-spark.s3{--r:108deg}.meepo-poof-spark.s4{--r:144deg}.meepo-poof-spark.s5{--r:180deg}.meepo-poof-spark.s6{--r:216deg}.meepo-poof-spark.s7{--r:252deg}.meepo-poof-spark.s8{--r:288deg}.meepo-poof-spark.s9{--r:324deg}\n@keyframes meepoPoofChargeCore{0%{transform:translate(-50%,-50%) scale(.15);opacity:.15}70%{transform:translate(-50%,-50%) scale(.72);opacity:.95}100%{transform:translate(-50%,-50%) scale(.5);opacity:.7}}\n@keyframes meepoPoofChargeRing{0%{transform:translate(-50%,-50%) scale(.2);opacity:0}45%{opacity:.9}100%{transform:translate(-50%,-50%) scale(.78);opacity:.32}}\n@keyframes meepoPoofChargeRing2{0%{transform:translate(-50%,-50%) scale(.2);opacity:0}55%{opacity:.72}100%{transform:translate(-50%,-50%) scale(.6);opacity:.24}}\n@keyframes meepoPoofChargeSmoke{0%{transform:translate(-50%,-50%) scale(.2);opacity:0}100%{transform:translate(-50%,-50%) scale(.72);opacity:.6}}\n@keyframes meepoPoofBurstCore{0%{transform:translate(-50%,-50%) scale(.25);opacity:.2}20%{transform:translate(-50%,-50%) scale(1.2);opacity:1}45%{transform:translate(-50%,-50%) scale(2.2);opacity:.9}100%{transform:translate(-50%,-50%) scale(3.15);opacity:0}}\n@keyframes meepoPoofBurstRing{0%{transform:translate(-50%,-50%) scale(.28);opacity:1}55%{opacity:.9}100%{transform:translate(-50%,-50%) scale(1.85);opacity:0}}\n@keyframes meepoPoofBurstRing2{0%{transform:translate(-50%,-50%) scale(.18);opacity:.9}100%{transform:translate(-50%,-50%) scale(1.48);opacity:0}}\n@keyframes meepoPoofBurstSmoke{0%{transform:translate(-50%,-50%) scale(.35);opacity:.95}55%{opacity:.72}100%{transform:translate(-50%,-50%) scale(2.05);opacity:0}}\n@keyframes meepoPoofSpark{0%{transform:translate(-50%,-50%) rotate(var(--r)) translateY(-6px) scaleY(.45);opacity:0}18%{opacity:1}100%{transform:translate(-50%,-50%) rotate(var(--r)) translateY(-58px) scaleY(1.25);opacity:0}}\n";
document.head.appendChild(st);
try{draft()}catch(_){}
})();