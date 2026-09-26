// Phantom Lancer — rules run only on the acting client; VFX events contain no damage.
DATA.phantomlancer={name:'PHANTOM LANCER',hp:7,atk:2,img:'assets/phantomlancer.png',skills:[
  {id:'lance',name:'Spirit Lance',cd:1,desc:'Магическое копьё наносит переднему врагу 1 урон и создаёт иллюзию Juxtapose. Иллюзия сразу атакует ту же цель и наносит на 50% меньше урона, чем оригинал, после чего может продолжить цепочку. После применения недоступно всю следующую активацию Phantom Lancer; снова готово через одну активацию.'},
  {id:'juxtapose',name:'Juxtapose — ПАССИВНАЯ',cd:0,passive:true,desc:'Обычная атака с шансом 50% создаёт иллюзию. Она сразу атакует ту же цель и наносит на 50% меньше урона, чем оригинал. Иллюзия копирует предметы Phantom Lancer и их атакующие пассивные эффекты; если у оригинала нет предметов, у копии их тоже нет. После её удара следующая копия появляется с шансом 40%, затем 30%, 20% и 10%. Каждая копия исчезает после удара. При гибели цели цепочка прекращается. Безмолвие не отключает пассивную способность.'}
]};
HERO_ICONS.phantomlancer='assets/phantomlancer.png';
DRAFT_ORDER.push('phantomlancer');
SKILL_ICONS.phantomlancer=['assets/skills/phantomlancer1.png','assets/skills/phantomlancer2.png'];
AUDIO.phantomlancer={turn:['assets/audio/phantomlancer_turn1.mp3','assets/audio/phantomlancer_turn2.mp3'],skills:{lance:'assets/audio/phantomlancer_lance.mp3'}};
ATTACK_AUDIO.phantomlancer='assets/audio/phantomlancer_attack.mp3';

const PL_TIMING={attack:575,lance:570,spawn:160,fade:200};
const plWait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const plRoll=percent=>Math.random()*100<percent;
const plSounds=new Set();
function plSound(name){
  const audio=new Audio(`assets/audio/phantomlancer_${name}.mp3`);
  audio.volume=name==='laugh'?.72:.55;
  plSounds.add(audio);audio.onended=audio.onerror=()=>plSounds.delete(audio);
  audio.play().catch(()=>plSounds.delete(audio));
}
function clearPhantomFx(){
  document.getElementById('phantomFx')?.remove();
  for(const a of plSounds)a.pause();plSounds.clear();
}
function plLayer(){
  let el=document.getElementById('phantomFx');
  if(!el){el=document.createElement('div');el.id='phantomFx';el.setAttribute('aria-hidden','true');document.body.appendChild(el)}
  return el;
}
function plRect(team,id){if(String(id).startsWith('forge_spirit_')){let owner=id.slice('forge_spirit_'.length);return document.querySelector(`#hero-${team}-${owner} .forge-spirit-card`)?.getBoundingClientRect()}return document.querySelector(`#hero-${team}-${id} .hero-portrait`)?.getBoundingClientRect()}
function plBurst(x,y){
  const el=document.createElement('i');el.className='pl-impact';el.style.left=x+'px';el.style.top=y+'px';plLayer().appendChild(el);
  setTimeout(()=>el.remove(),400);
}
function playPhantomVfx(ev){
  if(ev.kind==='pl-kill'){plSound('laugh');return}
  const r=plRect(ev.team,ev.heroId);if(!r)return;
  const cx=r.left+r.width/2,cy=r.top+r.height*.52;
  const layer=plLayer(),token=G?.matchId;
  const later=(fn,ms)=>setTimeout(()=>{if(G?.matchId===token&&layer.isConnected)fn()},ms);
  if(ev.kind==='pl-lance'){
    const from=plRect(ev.sourceTeam,'phantomlancer');if(!from)return;
    plSound('lance');
    const x=from.left+from.width/2,y=from.top+from.height*.52;
    const angle=Math.atan2(cy-y,cx-x)*180/Math.PI;
    const el=document.createElement('div');el.className='pl-projectile';
    el.innerHTML='<svg viewBox="0 0 150 50"><path d="M4 26 25 24 46 27 65 23 86 26 105 24 135 25"/><path d="M16 28 36 27 55 24 74 26 99 25 137 25"/><circle cx="113" cy="16" r="1.6"/><circle cx="124" cy="31" r="1.9"/><circle cx="134" cy="11" r="1.5"/><circle cx="144" cy="32" r="1.3"/><circle cx="93" cy="21" r="1"/></svg><i></i>';
    el.style.left=x+'px';el.style.top=y+'px';el.style.setProperty('--angle',angle+'deg');layer.appendChild(el);
    el.animate([{transform:`translate(0,0) rotate(${angle}deg)`},{transform:`translate(${cx-x}px,${cy-y}px) rotate(${angle}deg)`}],{duration:PL_TIMING.lance,easing:'ease-in',fill:'forwards'});
    later(()=>{el.remove();plBurst(cx,cy)},PL_TIMING.lance);return;
  }
  if(ev.kind==='pl-attack'){
    plSound('attack');
    const from=plRect(ev.sourceTeam,'phantomlancer');
    if(from){const card=document.getElementById(`hero-${ev.sourceTeam}-phantomlancer`);const dx=(cx>from.left?1:-1)*14;card?.animate([{transform:'translateX(0)'},{transform:`translateX(${dx}px)`,offset:.8},{transform:'translateX(0)'}],{duration:PL_TIMING.attack+160})}
    later(()=>plBurst(cx,cy),PL_TIMING.attack);return;
  }
  if(ev.kind!=='pl-clone')return;
  plSound('spawn');
  const theta=(ev.angle||0)*Math.PI*2;
  const w=Math.min(94,innerWidth*.17),h=w*1.15;
  const x=Math.max(8,Math.min(innerWidth-w-8,cx+Math.cos(theta)*(r.width*.65+46)-w/2));
  const y=Math.max(8,Math.min(innerHeight-h-8,cy+Math.sin(theta)*(r.height*.35+34)-h/2));
  const dx=cx-(x+w/2),dy=cy-(y+h/2),angle=Math.atan2(dy,dx)*180/Math.PI;
  const el=document.createElement('div');el.className='pl-clone';el.style.cssText=`left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
  const v=document.createElement('video');v.src='assets/portraits/phantomlancer_illusion.webm';v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;
  const spear=document.createElement('i');spear.className='pl-spear';spear.style.setProperty('--angle',angle+'deg');
  el.append(v,spear);layer.appendChild(el);v.play().catch(()=>{});
  const impact=PL_TIMING.spawn+PL_TIMING.attack;
  el.animate([{opacity:0,transform:'scale(.55)'},{opacity:.94,transform:'scale(1)',offset:.18},{opacity:.94,transform:'translate(0,0)',offset:.60},{opacity:1,transform:`translate(${dx*.43}px,${dy*.43}px)`,offset:.79},{opacity:0,transform:`translate(${dx*.24}px,${dy*.24}px) scale(.7)`}],{duration:impact+PL_TIMING.fade,fill:'forwards'});
  spear.animate([{translate:'0 0'},{translate:`${Math.cos(angle*Math.PI/180)*24}px ${Math.sin(angle*Math.PI/180)*24}px`},{translate:'0 0'}],{delay:impact-140,duration:270});
  later(()=>plSound('attack'),PL_TIMING.spawn);
  later(()=>{plBurst(cx,cy);plSound('death')},impact);
  later(()=>{v.pause();el.remove()},impact+PL_TIMING.fade);
}
function phantomEvent(kind,target,source,extra={}){
  const ev={kind,team:target.team,heroId:target.id,sourceTeam:source.team,...extra};
  playPhantomVfx(ev);window.emitNetVfx?.(kind,target,{sourceTeam:source.team,...extra});
}
function plIllusionAttacker(owner){
  // Every illusion gets its own snapshot of PL's items. Item cooldown mutations on the
  // illusion stay on the illusion and never leak back into the real hero.
  return {...owner,id:'phantomlancer_illusion',name:`Иллюзия ${owner.name}`,items:[...(owner.items||[])],itemCd:{...(owner.itemCd||{})},hp:1,maxHp:1,dead:false};
}
function plIllusionHit(owner,target,prefix='🔱 Иллюзия'){
  const illusion=plIllusionAttacker(owner);
  if(attackMisses(illusion,target))return {landed:false,illusion};
  const hit=attackDamageInfo(illusion,target,physicalBaseDamage(illusion,target,effectiveAtk(illusion)/2),{allowCrit:true,illusion:true});
  damage(target,hit.damage,attackSourceLabel(illusion,hit,prefix),owner);
  window.registerAxeBasicHit?.(illusion,target,{illusion:true});
  if(!target.dead)afterSuccessfulBasicHit(illusion,target,hit.damage);
  return {landed:true,illusion};
}
async function performPhantomAttack(attacker,target,lance=false){
  if(!G||G.resolving||G.winner!==null||G.actions<1||attacker.dead||target.dead)return;
  const match=G,valid=()=>G===match;
  G.resolving=true;
  if(lance)putOnCooldown(attacker,'lance');else G.attackUsed=true;
  try{
    const runHeroHit=async(prefix='⚔️',repeatFx=false)=>{
      if(repeatFx){
        addLog(`⚡ ${attacker.name} повторяет тычку без траты действия.`);
        phantomEvent('pl-attack',target,attacker);render();
        await plWait(PL_TIMING.attack);if(!valid()||target.dead||attacker.dead)return false;
      }
      if(attackMisses(attacker,target)){
        addLog(`💨 ${repeatFx?'Повторная атака':attacker.name+' промахивается'} ${repeatFx?attacker.name+' ':'по '} ${target.name}.`.replace('  ',' '));
        return false;
      }
      const hit=attackDamageInfo(attacker,target,physicalBaseDamage(attacker,target,effectiveAtk(attacker)),{allowCrit:true});
      damage(target,hit.damage,attackSourceLabel(attacker,hit,prefix),attacker);
      afterSuccessfulBasicHit(attacker,target,hit.damage);
      return !target.dead;
    };
    const maybeHeroRepeat=async()=>{
      const repeat=yashaRepeatChance(attacker);
      if(attacker.dead||target.dead||repeat<=0||Math.random()>=repeat)return false;
      await plWait(150);if(!valid()||target.dead||attacker.dead)return false;
      return await runHeroHit('⚡ Повтор',true);
    };
    const maybeCloneRepeat=async()=>{
      const repeat=yashaRepeatChance(attacker);
      if(attacker.dead||target.dead||repeat<=0||Math.random()>=repeat)return;
      await plWait(120);if(!valid()||target.dead||attacker.dead)return;
      addLog(`⚡ Иллюзия ${attacker.name} повторяет тычку.`);
      phantomEvent('pl-clone',target,attacker,{angle:Math.random()});render();
      await plWait(PL_TIMING.spawn+PL_TIMING.attack);if(!valid()||target.dead||attacker.dead)return;
      const repeated=plIllusionHit(attacker,target,'⚡🔱 Повтор');
      if(!repeated.landed){addLog(`💨 Повторная атака иллюзии ${attacker.name} промахивается по ${target.name}.`);return}
      render();
      await plWait(PL_TIMING.fade);if(!valid())return;
    };
    const runCloneChain=async(startChance)=>{
      let chance=startChance;
      for(let count=0;count<5&&!attacker.dead&&!target.dead&&G.winner===null;count++){
        if(chance<100&&!plRoll(chance))break;
        phantomEvent('pl-clone',target,attacker,{angle:Math.random()});render();
        await plWait(PL_TIMING.spawn+PL_TIMING.attack);if(!valid())return;
        const cloneHit=plIllusionHit(attacker,target,'🔱 Иллюзия');
        if(!cloneHit.landed){addLog(`💨 Иллюзия ${attacker.name} промахивается по ${target.name}.`);break;}
        render();
        await maybeCloneRepeat();if(!valid())return;
        await plWait(PL_TIMING.fade);if(!valid())return;
        chance=40-count*10;
      }
    };

    phantomEvent(lance?'pl-lance':'pl-attack',target,attacker);render();
    await plWait(lance?PL_TIMING.lance:PL_TIMING.attack);if(!valid())return;

    let landed=false;
    if(lance){
      landed=true;
      (window.enigmaGroupedSpellDamage||spellDamage)(target,1,`${logIcon(attacker.id,'lance')} Spirit Lance: `,attacker);
    }else{
      landed=await runHeroHit('⚔️',false);
      if(landed){
        const repeatLanded=await maybeHeroRepeat();
        if(repeatLanded&&valid()&&!target.dead&&!attacker.dead)await runCloneChain(50);
      }
    }
    render();
    if(landed&&valid()&&!target.dead&&!attacker.dead)await runCloneChain(lance?100:50);
  }finally{
    if(valid()){G.resolving=false;spend();render()}
  }
}

draft();

window.playPhantomVfx=playPhantomVfx;
