// Requiem's release is aligned to the supplied recording and existing sound.
const REQUIEM_TIMING={charge:1680,travel:220,burst:2700,settle:260};
const combatSounds=new Set();
function combatLayer(){let layer=document.getElementById('combatFx');if(!layer){layer=document.createElement('div');layer.id='combatFx';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer)}return layer}
function clearCombatFx(){document.getElementById('combatFx')?.remove();document.querySelectorAll('.damage-flash').forEach(x=>x.remove());for(const s of combatSounds)s.pause();combatSounds.clear()}
function combatRect(team,id){return document.querySelector(`#hero-${team}-${id} .hero-portrait`)?.getBoundingClientRect()}
let previousDamageRects={match:null,rects:new Map()};
function captureDamageFxRects(){
 previousDamageRects={match:G?.matchId,rects:new Map()};
 for(const hero of document.querySelectorAll('.battlefield .hero'))for(const kind of ['hero-portrait','forge-spirit-card']){const el=hero.querySelector('.'+kind);if(el)previousDamageRects.rects.set(`#${hero.id} .${kind}`,el.getBoundingClientRect())}
}
function playDamageFx(ev){
 if(!(ev.amount>0)&&!ev.blocked)return;
 const match=G?.matchId,selector=ev.summon?`#hero-${ev.team}-${ev.heroId} .forge-spirit-card`:`#hero-${ev.team}-${ev.heroId} .hero-portrait`;
 const initial=document.querySelector(selector)?.getBoundingClientRect()||(previousDamageRects.match===match?previousDamageRects.rects.get(selector):null);
 const delay=Math.max(0,(Number(ev.delay)||0)-(ev.at?Math.max(0,Date.now()-ev.at):0));
 const run=()=>{if(!G||G.matchId!==match)return;const portrait=document.querySelector(selector);if(!portrait&&!initial)return;
 const fx=document.createElement('div');fx.className='damage-flash'+(ev.blocked?' damage-block':'');fx.style.cssText='inset:0;width:100%;height:100%;z-index:40;pointer-events:none';
 const label=document.createElement('b');label.className='damage-number';label.textContent=ev.blocked?'БЛОК':'−'+ev.amount;fx.appendChild(label);
 if(portrait)portrait.appendChild(fx);else{fx.style.cssText=`position:fixed;left:${initial.left}px;top:${initial.top}px;width:${initial.width}px;height:${initial.height}px;pointer-events:none`;combatLayer().appendChild(fx)}setTimeout(()=>fx.remove(),560)};
 if(delay>5)setTimeout(run,delay);else run();
}
function playRequiemFx(ev){
  const from=combatRect(ev.team,ev.heroId),to=ev.summonOwnerId?document.querySelector(`#hero-${ev.targetTeam}-${ev.summonOwnerId} .forge-spirit-card`)?.getBoundingClientRect():combatRect(ev.targetTeam,ev.targetId);if(!from||!to)return;
  const layer=combatLayer(),match=G?.matchId;
  const audio=new Audio(AUDIO.shadowfiend.skills.souls);audio.volume=.72;combatSounds.add(audio);audio.onended=audio.onerror=()=>combatSounds.delete(audio);audio.play().catch(()=>combatSounds.delete(audio));
  const x=from.left+from.width/2,y=from.top+from.height*.62,tx=to.left+to.width/2,ty=to.top+to.height*.55;
  const ring=document.createElement('div');ring.className='requiem-charge';ring.style.cssText=`left:${x}px;top:${y}px;--charge:${REQUIEM_TIMING.charge}ms`;
  ring.innerHTML='<i class="requiem-core"></i>'+Array.from({length:12},(_,i)=>`<i class="requiem-particle" style="--angle:${i*30}deg;--delay:${i%4*110}ms"></i>`).join('');layer.appendChild(ring);
  setTimeout(()=>{
    if(G?.matchId!==match||!layer.isConnected){ring.remove();return}
    ring.remove();
    const burst=document.createElement('div');burst.className='requiem-burst';burst.style.cssText=`left:${x}px;top:${y}px`;
    burst.innerHTML='<i class="requiem-wave"></i>'+Array.from({length:16},(_,i)=>`<i class="requiem-soul" style="--angle:${i*22.5}deg"></i>`).join('');layer.appendChild(burst);
    const bolt=document.createElement('div');bolt.className='requiem-bolt';bolt.style.left=x+'px';bolt.style.top=y+'px';bolt.style.setProperty('--direction',Math.atan2(ty-y,tx-x)*180/Math.PI+'deg');layer.appendChild(bolt);
    bolt.animate([{translate:'0 0',opacity:1},{translate:`${tx-x}px ${ty-y}px`,opacity:1}],{duration:REQUIEM_TIMING.travel,fill:'forwards'});
    setTimeout(()=>bolt.remove(),REQUIEM_TIMING.travel+80);setTimeout(()=>burst.remove(),REQUIEM_TIMING.burst);
  },REQUIEM_TIMING.charge);
}
async function castRequiem(h,t){
  if(!G||G.resolving||G.winner!==null||G.actions<1)return;
  const match=G;G.resolving='requiem';putOnCooldown(h,'souls');
  const ev={team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null};
  playRequiemFx(ev);window.emitNetVfx?.('requiem',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:ev.summonOwnerId});render();
  try{
    await new Promise(r=>setTimeout(r,REQUIEM_TIMING.charge+REQUIEM_TIMING.travel));if(G!==match)return;
    (window.enigmaGroupedSpellDamage||spellDamage)(t,3+(h.sfKills||0),`${logIcon(h.id,'souls')} ${h.name}: `,h);
    if(!t.dead&&!isForgeSpiritTarget(t)&&canReceiveNegativeEffect(t)){
      const arr=G.teams[t.team],cur=arr.indexOf(t);let next=-1;
      for(let step=1;step<arr.length;step++){const i=(cur+step)%arr.length;if(!arr[i].dead&&!arr[i].infested){next=i;break}}
      if(next>=0){[arr[cur],arr[next]]=[arr[next],arr[cur]];G.front[t.team]=cur}
    }
    addSkillLog(h,'souls',`${h.name} использует Requiem of Souls и отбрасывает вражескую цель на 1 позицию назад.`);render();
    await new Promise(r=>setTimeout(r,REQUIEM_TIMING.settle));
  }finally{if(G===match){G.resolving=false;spend();render()}}
}


function rectCenter(r){return r?{x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height}:null}
function heroCenter(team,id,summonOwnerId=null){if(summonOwnerId){return rectCenter(document.querySelector(`#hero-${team}-${summonOwnerId} .forge-spirit-card`)?.getBoundingClientRect())}return rectCenter(combatRect(team,id))}
function addFxNode(cls,x,y,html=''){const layer=combatLayer();const el=document.createElement('div');el.className=cls;el.style.left=x+'px';el.style.top=y+'px';if(html)el.innerHTML=html;layer.appendChild(el);return el}
function teamLineMetrics(team){let cards=[...document.querySelectorAll(`#team${team} .hero .hero-portrait`)].map(n=>n.getBoundingClientRect()).filter(Boolean);if(!cards.length)return null;let minX=Math.min(...cards.map(r=>r.left+r.width*.2)),maxX=Math.max(...cards.map(r=>r.left+r.width*.8)),y=cards.reduce((a,r)=>a+r.top+r.height*.58,0)/cards.length,w=cards.reduce((a,r)=>a+r.width,0)/cards.length,h=cards.reduce((a,r)=>a+r.height,0)/cards.length;return{minX,maxX,y,w,h}}
function frontAnchorCenter(team){let hero=typeof frontHero==='function'?frontHero(team):null;return hero?heroCenter(team,hero.id):null}
function playInvokerFx(ev){const target=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId), caster=heroCenter(ev.team,ev.heroId);if(!target)return;const cleanup=(el,ms=1400)=>setTimeout(()=>{if(el?.isConnected)el.remove()},ms);
  if(ev.kind==='invoker-emp'){
    const orb=addFxNode('invk-emp',target.x,target.y,'<i class="invk-emp-core"></i><i class="invk-emp-ring"></i><i class="invk-emp-charge"></i>'+Array.from({length:8},(_,i)=>`<i class="invk-emp-bolt" style="--a:${i*45}deg"></i>`).join('')+'<i class="invk-emp-blast"></i>');
    cleanup(orb,1750);return;
  }
  if(ev.kind==='invoker-sunstrike'){
    const warn=addFxNode('invk-sunstrike',target.x,target.y,'<i class="invk-ss-mark"></i><i class="invk-ss-core"></i><i class="invk-ss-beam"></i><i class="invk-ss-burst"></i>');
    cleanup(warn,1700);return;
  }
  if(ev.kind==='invoker-meteor'){
    const line=teamLineMetrics(ev.targetTeam)||{minX:target.x-60,maxX:target.x+60,y:target.y};
    const dir=(caster&&caster.x>target.x)?-1:1;
    const dropX=dir>0?line.minX-30:line.maxX+30, impactY=line.y-6, startX=dropX-(180*dir), startY=impactY-210, endX=dir>0?line.maxX+84:line.minX-84;
    const meteor=addFxNode('invk-meteor',startX,startY,'<i class="invk-meteor-trail"></i><i class="invk-meteor-rock"></i><i class="invk-meteor-burst"></i><i class="invk-meteor-scatter"></i>');
    meteor.classList.add(dir>0?'dir-right':'dir-left');
    meteor.animate([{transform:'translate(0,0)'},{transform:`translate(${dropX-startX}px,${impactY-startY}px)`}],{duration:760,easing:'cubic-bezier(.16,.8,.24,1)',fill:'forwards'});
    setTimeout(()=>{meteor.classList.add('rolling');meteor.animate([{transform:`translate(${dropX-startX}px,${impactY-startY}px)`},{transform:`translate(${endX-startX}px,${impactY-startY}px)`}],{duration:980,easing:'cubic-bezier(.18,.72,.24,1)',fill:'forwards'})},760);
    cleanup(meteor,2050);return;
  }
  if(ev.kind==='invoker-tornado'){
    const tor=addFxNode('invk-tornado',target.x,target.y,'<i class="invk-tornado-col"></i><i class="invk-tornado-ring r1"></i><i class="invk-tornado-ring r2"></i><i class="invk-tornado-ring r3"></i>');
    cleanup(tor,1300);return;
  }
  if(ev.kind==='invoker-deafblast'){
    if(!caster)return;
    const dx=target.x-caster.x, dy=target.y-caster.y, dist=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI;
    const wave=addFxNode('invk-deafblast',caster.x,caster.y,'<i class="invk-db-wave"></i>');
    wave.style.width=Math.max(180,dist)+'px'; wave.style.setProperty('--ang',ang+'deg');
    cleanup(wave,900);return;
  }
  if(ev.kind==='invoker-alacrity'){
    const al=addFxNode('invk-alacrity',target.x,target.y,'<i class="invk-alacrity-body"></i><i class="invk-alacrity-orb o1"></i><i class="invk-alacrity-orb o2"></i><i class="invk-alacrity-orb o3"></i>');
    cleanup(al,1800);return;
  }
  if(ev.kind==='invoker-icewall'){
    const wall=addFxNode('invk-icewall',target.x,target.y,'<i class="invk-icewall-main"></i><i class="invk-icewall-freeze"></i>');
    cleanup(wall,1450);return;
  }
}

function playBroodFx(ev){const target=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId),caster=heroCenter(ev.team,ev.heroId);if(!target||!caster)return;const cleanup=(el,ms=1400)=>setTimeout(()=>{if(el?.isConnected)el.remove()},ms);if(ev.kind==='brood-spiderlings'){const dx=target.x-caster.x,dy=target.y-caster.y,ang=Math.atan2(dy,dx)*180/Math.PI;const web=Array.from({length:8},(_,i)=>`<i class="brood-web-spoke s${i}"></i>`).join('')+'<i class="brood-web-ring r1"></i><i class="brood-web-ring r2"></i>';const shot=addFxNode('brood-webshot',caster.x,caster.y,`<i class="brood-webshot-core"></i><i class="brood-webshot-trail"></i><span class="brood-web-impact">${web}</span>`);shot.style.setProperty('--ang',ang+'deg');shot.animate([{transform:'translate(-50%,-50%) scale(.9)'},{transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`}],{duration:430,easing:'cubic-bezier(.16,.78,.24,1)',fill:'forwards'});setTimeout(()=>shot.classList.add('impact'),350);cleanup(shot,1200);return}}

function playDagonFx(ev){
  const from=heroCenter(ev.team,ev.heroId),to=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId);if(!from||!to)return;
  try{const audio=new Audio('assets/audio/dagon.mp3');audio.volume=.22;combatSounds.add(audio);audio.onended=audio.onerror=()=>combatSounds.delete(audio);audio.play().catch(()=>combatSounds.delete(audio))}catch{}
  const dx=to.x-from.x,dy=to.y-from.y,dist=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;
  const beam=addFxNode('dagon-beam',from.x,from.y,'<i class="dagon-ray"></i><i class="dagon-core"></i>');
  beam.style.width=dist+'px';beam.style.setProperty('--ang',ang+'deg');
  const impact=addFxNode('dagon-impact',to.x,to.y,'<i></i><b></b>');
  setTimeout(()=>beam.remove(),520);setTimeout(()=>impact.remove(),760);
}
window.playDamageFx=playDamageFx;window.playRequiemFx=playRequiemFx;window.playInvokerFx=playInvokerFx;window.playBroodFx=playBroodFx;window.playDagonFx=playDagonFx;


window.playAbaddonFx=function(ev){
 const target=heroCenter(ev.targetTeam,ev.targetId,ev.summonOwnerId),caster=heroCenter(ev.team,ev.heroId)||target;if(!target&&!caster)return;const cleanup=(el,ms=1400)=>setTimeout(()=>{if(el?.isConnected)el.remove()},ms);
 if(ev.kind==='mist-coil'){
   const from=caster||target,to=target||caster;if(!from||!to)return;const dx=to.x-from.x,dy=to.y-from.y,ang=Math.atan2(dy,dx)*180/Math.PI,dist=Math.max(40,Math.hypot(dx,dy));
   const bolt=addFxNode('abaddon-mist-coil',from.x,from.y,'<i class="abaddon-mist-trail"></i><i class="abaddon-mist-core"></i><i class="abaddon-mist-impact"></i>');
   bolt.style.setProperty('--ang',ang+'deg');bolt.style.setProperty('--dist',dist+'px');bolt.animate([{transform:'translate(-50%,-50%) scale(.9)'},{transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`}],{duration:380,easing:'cubic-bezier(.18,.78,.26,1)',fill:'forwards'});setTimeout(()=>bolt.classList.add('impact'),250);cleanup(bolt,980);return;
 }
 if(ev.kind==='aphotic-shield'){
   const shield=addFxNode('abaddon-aphotic-shield',target.x,target.y,'<i class="abaddon-shield-body"></i><i class="abaddon-shield-line l1"></i><i class="abaddon-shield-line l2"></i><i class="abaddon-shield-line l3"></i><i class="abaddon-shield-ring"></i>');
   cleanup(shield,1550);return;
 }
 if(ev.kind==='borrowed-time'){
   const aura=addFxNode('abaddon-borrowed-time',target.x,target.y,'<i class="abaddon-bt-core"></i><i class="abaddon-bt-ring r1"></i><i class="abaddon-bt-ring r2"></i><i class="abaddon-bt-ring r3"></i>');
   cleanup(aura,1650);return;
 }
}


function marsArenaPersistentNode(){return document.getElementById('marsArenaPersistent')}
function ensureMarsArenaPersistent(){
  let el=marsArenaPersistentNode();
  if(el)return el;
  el=document.createElement('div');
  el.id='marsArenaPersistent';
  el.className='mars-arena-v79';
  const segs=Array.from({length:18},(_,i)=>`<i class="m79-seg s${i+1}"></i>`).join('');
  const gapSmokes=Array.from({length:8},(_,i)=>`<i class="m79-gap-smoke g${i+1}"></i>`).join('');
  el.innerHTML=`
    <i class="m79-backglow"></i>
    <i class="m79-smoke m79-smoke-back"></i>
    <i class="m79-floor"></i>
    <i class="m79-floor-inner"></i>
    <i class="m79-hoop"></i>
    <i class="m79-inner-ring"></i>
    ${segs}
    ${gapSmokes}
    <i class="m79-smoke m79-smoke-front"></i>`;
  let bf=document.querySelector('#game .battlefield')||document.querySelector('.battlefield')||document.body;
  bf.appendChild(el);
  return el;
}
function setArenaBox(node,left,top,width,height){
  if(!node)return;
  node.style.left=Math.round(left)+'px';
  node.style.top=Math.round(top)+'px';
  node.style.width=Math.max(1,Math.round(width))+'px';
  node.style.height=Math.max(1,Math.round(height))+'px';
}
function updateMarsArenaPersistent(){
  const active=typeof marsArenaActive==='function'&&marsArenaActive();
  let el=marsArenaPersistentNode();
  if(!active){if(el&&!el.classList.contains('ending'))el.remove();return}
  const team=G?.marsArenaTeam,enemyTeam=G?.marsArenaEnemyTeam;
  const ownFront=Number.isInteger(team)&&typeof frontHero==='function'?frontHero(team):null;
  const enemyFront=Number.isInteger(enemyTeam)&&typeof frontHero==='function'?frontHero(enemyTeam):null;
  const ownCardRect=ownFront?document.querySelector(`#hero-${team}-${ownFront.id}`)?.getBoundingClientRect?.():null;
  const enemyCardRect=enemyFront?document.querySelector(`#hero-${enemyTeam}-${enemyFront.id}`)?.getBoundingClientRect?.():null;
  const bf=document.querySelector('#game .battlefield')||document.querySelector('.battlefield');
  if(!ownCardRect||!enemyCardRect||!bf){if(el)el.style.display='none';return}
  el=el||ensureMarsArenaPersistent();el.style.display='block';
  const br=bf.getBoundingClientRect();
  const L=ownCardRect.left<enemyCardRect.left?ownCardRect:enemyCardRect;
  const R=L===ownCardRect?enemyCardRect:ownCardRect;
  const cardW=Math.min(L.width,R.width), cardH=Math.min(L.height,R.height);
  const left=L.left-br.left, right=R.right-br.left;
  const top=Math.min(L.top,R.top)-br.top, bottom=Math.max(L.bottom,R.bottom)-br.top;
  const cx=(left+right)/2, cy=Math.max(cardH*.58, Math.min(br.height-cardH*.08, (top+bottom)/2 + cardH*.24));
  const rx=Math.max(176,Math.min(br.width*.42,(right-left)/2 + cardW*.40));
  const ry=Math.max(118,Math.min(br.height*.24,cardH*.24));
  el.style.left='0px';el.style.top='0px';el.style.width=br.width+'px';el.style.height=br.height+'px';
  el.style.setProperty('--m79-cx',Math.round(cx)+'px');
  el.style.setProperty('--m79-cy',Math.round(cy)+'px');
  el.style.setProperty('--m79-rx',Math.round(rx)+'px');
  el.style.setProperty('--m79-ry',Math.round(ry)+'px');

  const backglow=el.querySelector('.m79-backglow');
  setArenaBox(backglow,cx-rx-56,cy-ry-48,rx*2+112,ry*2+96);
  setArenaBox(el.querySelector('.m79-smoke-back'),cx-rx-24,cy-ry-26,rx*2+48,ry*1.56);
  setArenaBox(el.querySelector('.m79-smoke-front'),cx-rx-18,cy+ry*.04,rx*2+36,Math.max(90,ry*.78));

  const floorW=rx*1.92,floorH=Math.max(88,ry*.82),floorLeft=cx-floorW/2,floorTop=cy+ry*.22;
  setArenaBox(el.querySelector('.m79-floor'),floorLeft,floorTop,floorW,floorH);
  setArenaBox(el.querySelector('.m79-floor-inner'),floorLeft+floorW*.09,floorTop+floorH*.08,floorW*.82,floorH*.68);
  setArenaBox(el.querySelector('.m79-hoop'),cx-rx*.98,cy+ry*.18,rx*1.96,Math.max(54,ry*.54));
  setArenaBox(el.querySelector('.m79-inner-ring'),cx-rx*.78,cy-ry*.02,rx*1.56,Math.max(92,ry*.84));

  const segAngles=[214,226,238,250,262,276,292,308,324,36,52,68,84,100,116,130,144,156];
  const segs=[...el.querySelectorAll('.m79-seg')];
  const visibleCols=[];
  const mobileArena=window.matchMedia?.('(orientation:landscape) and (max-height:600px)')?.matches;
  segs.forEach((seg,i)=>{
    const deg=segAngles[i%segAngles.length],ang=deg*Math.PI/180;
    const ex=cx+Math.cos(ang)*rx*.97;
    const ey=cy+Math.sin(ang)*ry*.98;
    const upper=ey<cy;
    if(!upper){seg.style.display='none';return}
    seg.style.display='block';
    let h,w,lift,left,top;
    if(mobileArena){
      h=Math.max(88,Math.min(138,cardH*.26 + (1-Math.abs(Math.sin(ang)))*18 + 28));
      w=Math.max(34,Math.min(52,cardW*.24 + 2));
      lift=Math.max(18,Math.min(54,cardH*.10 + (cy-ey)*.20));
      left=ex-w/2;
      top=Math.max(2,Math.min(br.height-h-6,ey-h*.42-lift));
    }else{
      h=Math.max(154,Math.min(248,cardH*.40 + (1-Math.abs(Math.sin(ang)))*32 + 40));
      w=Math.max(64,Math.min(88,cardW*.36 + 4));
      lift=Math.max(102,Math.min(214,cardH*.40 + (cy-ey)*.72));
      left=ex-w/2;
      top=ey-h/2-lift;
    }
    setArenaBox(seg,left,top,w,h);
    seg.style.transform='rotate(0deg)';
    seg.style.zIndex='3';
    visibleCols.push({x:ex,y:ey,w,h,left,top});
  });
  visibleCols.sort((a,b)=>a.x-b.x);
  const gapSmokes=[...el.querySelectorAll('.m79-gap-smoke')];
  gapSmokes.forEach((smoke,i)=>{
    if(i>=visibleCols.length-1){smoke.style.display='none';return}
    const a=visibleCols[i],b=visibleCols[i+1];
    smoke.style.display='block';
    const gap=Math.max(20,b.x-a.x-(a.w+b.w)/2);
    const sw=Math.max(44,Math.min(92,gap*.88));
    const sh=Math.max(38,Math.min(78,sw*.82));
    const sx=(a.x+b.x)/2-sw/2;
    const sy=Math.min(a.top,b.top)+Math.min(a.h,b.h)*.18;
    setArenaBox(smoke,sx,sy,sw,sh);
    smoke.style.zIndex='2';
  });
}
function marsArenaLoop(){try{updateMarsArenaPersistent()}catch(_){ }requestAnimationFrame(marsArenaLoop)}
requestAnimationFrame(marsArenaLoop);

window.playMarsFx=function(ev){const cleanup=(el,ms=1400)=>setTimeout(()=>{if(el?.isConnected)el.remove()},ms);if(!ev)return;const kind=ev.kind;const caster=heroCenter(ev.team,ev.heroId),target=(ev.targetId?heroCenter(ev.targetTeam,ev.targetId):null);if(kind==='arena-start'){ensureMarsArenaPersistent();updateMarsArenaPersistent();for(const ms of [0,50,140,260,420])setTimeout(()=>{try{updateMarsArenaPersistent()}catch(_){ }},ms);requestAnimationFrame(()=>{try{updateMarsArenaPersistent()}catch(_){ }});const node=marsArenaPersistentNode();if(node){const r=node.getBoundingClientRect(),burst=addFxNode('mars-arena-summon',r.left+r.width/2,r.top+r.height/2,'<i class="mars-arena-summon-ring"></i><i class="mars-arena-summon-flash"></i><i class="mars-arena-summon-dust"></i>');cleanup(burst,1350)}return}if(kind==='arena-end'){const node=marsArenaPersistentNode();if(node){node.classList.add('ending');setTimeout(()=>node.remove(),900);const r=node.getBoundingClientRect(),burst=addFxNode('mars-arena-collapse',r.left+r.width/2,r.top+r.height/2,'<i class="mars-arena-collapse-core"></i><i class="mars-arena-collapse-wave"></i><i class="mars-arena-collapse-dust"></i>');cleanup(burst,1150)}return}if(kind==='wall-hit'){if(!target)return;const burst=addFxNode('mars-wall-hit',target.x,target.y,'<i class="mars-wall-hit-core"></i><i class="mars-wall-hit-ring"></i><i class="mars-wall-hit-shards"></i>');cleanup(burst,920);return}if(kind==='rebuke'){if(!caster||!target)return;const dx=target.x-caster.x,dy=target.y-caster.y,dist=Math.max(140,Math.hypot(dx,dy)+20),ang=Math.atan2(dy,dx)*180/Math.PI;const wave=addFxNode('mars-rebuke',caster.x,caster.y,'<i class="mars-rebuke-sweep"></i><i class="mars-rebuke-edge"></i><i class="mars-rebuke-impact"></i>');wave.style.width=dist+'px';wave.style.setProperty('--ang',ang+'deg');if(ev.arenaHit)wave.classList.add('arena-hit');cleanup(wave,980);return}if(kind==='spear'){if(!caster||!target)return;const metrics=teamLineMetrics(ev.targetTeam)||{minX:target.x-80,maxX:target.x+80,y:target.y};const dir=target.x>=caster.x?1:-1;const targetRect=ev.targetId?combatRect(ev.targetTeam,ev.targetId):null;const endX=ev.pin&&targetRect?(dir>0?targetRect.right+28:targetRect.left-28):(dir>0?metrics.maxX+92:metrics.minX-92),endY=target.y;const dx1=target.x-caster.x,dy1=target.y-caster.y,dx2=endX-caster.x,dy2=endY-caster.y;const spear=addFxNode('mars-spear',caster.x,caster.y,'<i class="mars-spear-tail"></i><i class="mars-spear-trail"></i><i class="mars-spear-flare"></i><i class="mars-spear-head"></i><i class="mars-spear-chain"></i><i class="mars-spear-victim"></i>');spear.style.setProperty('--ang',Math.atan2(dy2,dx2)*180/Math.PI+'deg');spear.style.setProperty('--dir',String(dir));spear.classList.toggle('from-right',dir<0);spear.classList.toggle('from-left',dir>0);if(ev.pin)spear.classList.add('pinned');spear.animate([{transform:'translate(-50%,-50%) scale(.94)',opacity:0},{transform:`translate(calc(-50% + ${dx1*.16}px), calc(-50% + ${dy1*.16}px)) scale(1)`,opacity:1,offset:.12},{transform:`translate(calc(-50% + ${dx1}px), calc(-50% + ${dy1}px))`,opacity:1,offset:(ev.pin?0.43:0.34)},{transform:`translate(calc(-50% + ${dx2}px), calc(-50% + ${dy2}px))`,opacity:1}],{duration:ev.pin?700:740,easing:'cubic-bezier(.18,.78,.22,1)',fill:'forwards'});if(ev.pin){const card=document.querySelector(`#hero-${ev.targetTeam}-${ev.targetId}`);if(card){const push=dir>0?14:-14;card.animate([{transform:'translateX(0)'},{transform:`translateX(${push}px)`,offset:.54},{transform:`translateX(${push}px)`,offset:.82},{transform:'translateX(0)'}],{duration:900,easing:'cubic-bezier(.18,.78,.22,1)'})}}setTimeout(()=>spear.classList.add('impaled'),ev.pin?165:180);setTimeout(()=>{const impact=addFxNode(`mars-spear-impact ${dir>0?'from-left':'from-right'}`,endX,endY,'<i class="mars-spear-impact-core"></i><i class="mars-spear-impact-ring"></i>'+(ev.pin?'<i class="mars-spear-impact-pin"></i><i class="mars-spear-impact-slash"></i>':''));impact.style.setProperty('--dir',String(dir));cleanup(impact,980)},ev.pin?500:545);cleanup(spear,980);return}}
window.updateMarsArenaPersistent=updateMarsArenaPersistent;
