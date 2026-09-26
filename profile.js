(()=>{
 const HELPER='/profile';
 const RESULT='/result';
 let localPlayer=0, remotes={}, local={nick:'',avatar:'',rating:0,wins:0,losses:0}, ready=false, loading=null, localSig='';
 const recordedMatches=new Set();
 const GLOBAL_ID_KEY='dota_cards_global_player_id_v1';
 function globalId(){let id='';try{id=localStorage.getItem(GLOBAL_ID_KEY)||'';if(!id){id=(globalThis.crypto?.randomUUID?.()||('p-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)));localStorage.setItem(GLOBAL_ID_KEY,id)}}catch{id='p-'+Math.random().toString(36).slice(2)}return id}
 const HERO_IDS=['techies','morphling','bane','io','tinker','silencer','shadowfiend','lifestealer','invoker','arcwarden','phantomlancer','axe','broodmother','mars','enigma'];
 const HERO_META={techies:{name:'TECHIES',icon:'assets/hero_portraits_v166/techies.png'},morphling:{name:'MORPHLING',icon:'assets/hero_portraits_v166/morphling.png'},bane:{name:'BANE',icon:'assets/hero_portraits_v166/bane.png'},io:{name:'IO',icon:'assets/io.jpg'},tinker:{name:'TINKER',icon:'assets/tinker_draft.png'},silencer:{name:'SILENCER',icon:'assets/hero_portraits_v166/silencer.png'},shadowfiend:{name:'SHADOW FIEND',icon:'assets/hero_portraits_v166/shadowfiend.png'},lifestealer:{name:'LIFESTEALER',icon:'assets/hero_portraits_v166/lifestealer.png'},invoker:{name:'INVOKER',icon:'assets/invoker.jpg'},arcwarden:{name:'ARC WARDEN',icon:'assets/arcwarden.jpg'},phantomlancer:{name:'PHANTOM LANCER',icon:'assets/phantomlancer.png'},axe:{name:'AXE',icon:'assets/axe.jpg'},broodmother:{name:'BROODMOTHER',icon:'assets/hero_portraits_v166/broodmother.png'},mars:{name:'MARS',icon:'assets/mars_draft.png'},enigma:{name:'ENIGMA',icon:'assets/enigma_portrait.png'}};
 const MASTERY_KEY='dota_cards_hero_mastery_v1';
 const MASTERY_BACKUP_KEY='dota_cards_hero_mastery_backup_v1';
 const MASTERY_WIN_XP=100, MASTERY_LOSS_XP=35, MASTERY_MAX_LEVEL=30;
 const MASTERY_TIERS=[
  {min:1,max:5,key:'bronze',name:'Бронза',icon:'assets/mastery/bronze.png'},
  {min:6,max:11,key:'silver',name:'Серебро',icon:'assets/mastery/silver.png'},
  {min:12,max:17,key:'gold',name:'Золото',icon:'assets/mastery/gold.png'},
  {min:18,max:24,key:'platinum',name:'Платина',icon:'assets/mastery/platinum.png'},
  {min:25,max:29,key:'master',name:'Мастер',icon:'assets/mastery/master.png'},
  {min:30,max:30,key:'grandmaster',name:'Грандмастер',icon:'assets/mastery/grandmaster.png'}
 ];
 function readMastery(){try{let a=JSON.parse(localStorage.getItem(MASTERY_KEY)||'{}'),b=JSON.parse(localStorage.getItem(MASTERY_BACKUP_KEY)||'{}'),out={};for(const id of HERO_IDS){let va=a?.[id],vb=b?.[id],xa=Math.max(0,Math.floor(Number(typeof va==='object'?va?.xp:va)||0)),xb=Math.max(0,Math.floor(Number(typeof vb==='object'?vb?.xp:vb)||0)),xp=Math.max(xa,xb);if(xp)out[id]=xp}return out}catch{return {}}}
 function saveMastery(){try{let s=JSON.stringify(localMastery);localStorage.setItem(MASTERY_KEY,s);localStorage.setItem(MASTERY_BACKUP_KEY,s)}catch{}}
 function cleanMastery(raw){let out={};for(const id of HERO_IDS){let v=raw?.[id],xp=Math.max(0,Math.floor(Number(typeof v==='object'?v?.xp:v)||0));if(xp)out[id]=xp}return out}
 const MASTERY_GRANDMASTER_XP=13600;
 const MASTERY_OLD_GRANDMASTER_XP=11600;
 function xpForLevel(level){level=Math.max(1,Math.min(MASTERY_MAX_LEVEL,Math.floor(Number(level)||1)));if(level<=1)return 0;if(level>=MASTERY_MAX_LEVEL)return MASTERY_GRANDMASTER_XP;let oldTotal=0;for(let l=1;l<level;l++)oldTotal+=120+20*(l-1);return Math.round(oldTotal*MASTERY_GRANDMASTER_XP/MASTERY_OLD_GRANDMASTER_XP)}
 function xpToNext(level){level=Math.max(1,Math.min(MASTERY_MAX_LEVEL-1,Math.floor(Number(level)||1)));return xpForLevel(level+1)-xpForLevel(level)}
 function masteryLevelForXp(xp){xp=Math.max(0,Math.floor(Number(xp)||0));let lvl=1;while(lvl<MASTERY_MAX_LEVEL&&xp>=xpForLevel(lvl+1))lvl++;return lvl}
 function masteryTierForLevel(level){level=Math.max(1,Math.min(MASTERY_MAX_LEVEL,Math.floor(Number(level)||1)));return MASTERY_TIERS.find(t=>level>=t.min&&level<=t.max)||MASTERY_TIERS[0]}
 function masteryInfoFromXp(xp){xp=Math.max(0,Math.floor(Number(xp)||0));let level=masteryLevelForXp(xp),tier=masteryTierForLevel(level),floor=xpForLevel(level),next=level>=MASTERY_MAX_LEVEL?floor:xpForLevel(level+1);return {xp,level,tier,tierName:tier.name,icon:tier.icon,levelXp:Math.max(0,xp-floor),nextXp:level>=MASTERY_MAX_LEVEL?0:next-floor,progress:level>=MASTERY_MAX_LEVEL?1:Math.max(0,Math.min(1,(xp-floor)/Math.max(1,next-floor)))} }
 let localMastery=readMastery();
 const RANKS=[
  {mmr:0,name:'Без ранга',icon:1},
  {mmr:50,name:'Рекрут 1',icon:2},{mmr:150,name:'Рекрут 2',icon:3},{mmr:300,name:'Рекрут 3',icon:4},{mmr:450,name:'Рекрут 4',icon:5},{mmr:600,name:'Рекрут 5',icon:6},
  {mmr:800,name:'Страж 1',icon:7},{mmr:900,name:'Страж 2',icon:8},{mmr:1100,name:'Страж 3',icon:9},{mmr:1250,name:'Страж 4',icon:10},{mmr:1400,name:'Страж 5',icon:11},
  {mmr:1600,name:'Рыцарь 1',icon:12},{mmr:1700,name:'Рыцарь 2',icon:13},{mmr:1850,name:'Рыцарь 3',icon:14},{mmr:2000,name:'Рыцарь 4',icon:15},{mmr:2200,name:'Рыцарь 5',icon:16},
  {mmr:2400,name:'Герой 1',icon:17},{mmr:2500,name:'Герой 2',icon:18},{mmr:2600,name:'Герой 3',icon:19},{mmr:2800,name:'Герой 4',icon:20},{mmr:2950,name:'Герой 5',icon:21},
  {mmr:3100,name:'Легенда 1',icon:22},{mmr:3250,name:'Легенда 2',icon:23},{mmr:3400,name:'Легенда 3',icon:24},{mmr:3600,name:'Легенда 4',icon:25},{mmr:3700,name:'Легенда 5',icon:26},
  {mmr:3850,name:'Властелин 1',icon:27},{mmr:4000,name:'Властелин 2',icon:28},{mmr:4200,name:'Властелин 3',icon:29},{mmr:4300,name:'Властелин 4',icon:30},{mmr:4500,name:'Властелин 5',icon:31},
  {mmr:4700,name:'Божество 1',icon:32},{mmr:4850,name:'Божество 2',icon:33},{mmr:5000,name:'Божество 3',icon:34},{mmr:5250,name:'Божество 4',icon:35},{mmr:5400,name:'Божество 5',icon:36},
  {mmr:6000,name:'Титан',icon:37},{mmr:7000,name:'Титан II',icon:38},{mmr:8000,name:'Титан III',icon:39}
 ];
 function mmrFromWL(w,l){return Math.max(0,(Math.max(0,Math.floor(Number(w)||0))*40)-(Math.max(0,Math.floor(Number(l)||0))*20))}
 function rankEntryFor(v){v=Math.max(0,Math.floor(Number(v)||0));let out=RANKS[0];for(const r of RANKS){if(v>=r.mmr)out=r;else break}return out}
 function rankIndexFor(v){return rankEntryFor(v).icon}
 function rankFor(v){return rankEntryFor(v).name}
 function rankIconFor(v){return `assets/ranks/rank_${String(rankIndexFor(v)).padStart(2,'0')}.png`}
 function blank(n){return {nick:'Игрок '+(n+1),avatar:'',rating:0,wins:0,losses:0,rank:rankFor(0),rankIndex:1,heroMastery:{}}}
 function safeAvatar(v){v=typeof v==='string'?v:'';return /^data:image\/(?:png|jpe?g|webp);base64,[a-zA-Z0-9+/=]+$/.test(v)&&v.length<900000?v:''}
 function clean(p,n){
   const nick=String(p?.nick||('Игрок '+(n+1))).trim().slice(0,24)||('Игрок '+(n+1));
   const wins=Math.max(0,Math.floor(Number(p?.wins)||0));
   const losses=Math.max(0,Math.floor(Number(p?.losses)||0));
   const explicitRating=p?.rating;
   const rating=Math.max(0,Math.floor(Number(explicitRating!=null?explicitRating:mmrFromWL(wins,losses))||0));
   return {globalId:String(p?.globalId||globalId()),nick,avatar:safeAvatar(p?.avatar),rating,wins,losses,rank:rankFor(rating),rankIndex:rankIndexFor(rating),heroMastery:cleanMastery(p?.heroMastery)};
 }
 function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 function getPublic(){return clean({...local,heroMastery:localMastery},localPlayer)}
 function setLocalPlayer(n){localPlayer=Number.isInteger(n)?n:0;render()}
 function setRemote(n,p){if(n===localPlayer||!p)return;remotes[n]=clean(p,n);render()}
 function dataFor(n){if(n===localPlayer)return getPublic();return remotes[n]||blank(n)}
 function html(p){
   const av=p.avatar?`<img src="${p.avatar}" alt="">`:`<div class="side-profile-fallback">?</div>`;
   const rankIcon=rankIconFor(p.rating);
   const title=`${p.rank} • ${p.rating} MMR • Победы: ${p.wins} • Поражения: ${p.losses}`;
   return `<span class="side-profile-avatar">${av}</span><span class="side-profile-name">${esc(p.nick)}</span><span class="side-profile-rank-icon" title="${title}"><img src="${rankIcon}" alt="${esc(p.rank)}"></span>`;
 }
 function renderMenu(){
   const el=document.getElementById('menuProfileStats'); if(!el)return;
   const p=getPublic();
   const icon=rankIconFor(p.rating);
   el.innerHTML=`<span class="mp-profile-rank"><img src="${icon}" alt=""></span><span><b>${esc(p.nick||'Профиль')}</b><small>${esc(p.rank)} • ${p.rating} MMR • Победы: ${p.wins} • Поражения: ${p.losses}</small></span>`;
 }
 function render(){[0,1].forEach(n=>{for(const id of ['playerProfile'+n,'draftProfile'+n]){let el=document.getElementById(id);if(el){el.innerHTML=html(dataFor(n));el.classList.add('profile-clickable');el.title='Открыть профиль и лучшие тиры героев';el.onclick=()=>openMasteryProfile(n)}}});renderMenu();let menu=document.getElementById('menuProfileStats');if(menu){menu.classList.add('profile-clickable');menu.title='Открыть профиль и лучшие тиры героев';menu.onclick=()=>openMasteryProfile(localPlayer)}window.refreshMasteryUI?.()}
 async function load(){
   if(loading)return loading;
   loading=(async()=>{
     const wasReady=ready, before=localSig;
     try{
       const r=await fetch(HELPER,{cache:'no-store'});if(!r.ok)throw 0;
       const p=await r.json();
       const serverMastery=cleanMastery(p?.heroMastery||{}),merged={...serverMastery};
       for(const id of HERO_IDS)merged[id]=Math.max(Number(serverMastery[id])||0,Number(localMastery[id])||0);
       localMastery=cleanMastery(merged);saveMastery();
       if(JSON.stringify(serverMastery)!==JSON.stringify(localMastery)){
         fetch(HELPER,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({heroMastery:localMastery})}).catch(()=>{});
       }
       const next=clean({...p,heroMastery:localMastery},localPlayer); const nextReady=!!String(p?.nick||'').trim();
       if(nextReady){local=next;ready=true}else if(!ready){local=blank(localPlayer);ready=false}
     }catch{ if(!ready){local=blank(localPlayer);ready=false} }
     localSig=JSON.stringify({nick:local.nick,avatar:local.avatar,rating:local.rating,wins:local.wins,losses:local.losses,heroMastery:localMastery});
     render();
     if(ready && (!wasReady || localSig!==before)) window.dispatchEvent(new CustomEvent('dota-profile-ready',{detail:{profile:getPublic(),ready:true}}));
     return getPublic();
   })();
   try{return await loading}finally{loading=null}
 }
 async function retryLoad(){while(!ready){await load();if(!ready)await new Promise(r=>setTimeout(r,1200))}}
 async function recordResult(matchId,winner){
   if(!window.DOTA_NET_CONNECTED||window.DOTA_OFFLINE_MODE)return false;
   if(!Number.isInteger(window.DOTA_NET_PLAYER))return false;
   const key=String(matchId||''); if(!key||recordedMatches.has(key))return false;
   recordedMatches.add(key);
   try{
     const won=window.DOTA_NET_PLAYER===winner;
     const r=await fetch(RESULT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({matchId:key,won})}); if(!r.ok)throw 0;
     let serverProfile=await r.json();
     const gain=won?MASTERY_WIN_XP:MASTERY_LOSS_XP;
     try{
       const team=(typeof G!=='undefined'&&G?.teams?.[localPlayer])?G.teams[localPlayer]:[];
       const heroes=[...new Set(team.filter(h=>h&&h.id!=='arcwarden_clone').map(h=>h.id).filter(id=>HERO_IDS.includes(id)))];
       for(const id of heroes)localMastery[id]=Math.max(0,Math.floor(Number(localMastery[id])||0))+gain;
       saveMastery();
       if(heroes.length)window.dispatchEvent(new CustomEvent('dota-mastery-gain',{detail:{heroes,gain,won}}));
       const mr=await fetch(HELPER,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({heroMastery:localMastery})});
       if(mr.ok)serverProfile=await mr.json();
     }catch{}
     local=clean({...serverProfile,heroMastery:localMastery},localPlayer); ready=true; render();
     window.dispatchEvent(new CustomEvent('dota-profile-ready',{detail:{profile:getPublic(),ready}}));
     return true;
   }catch{recordedMatches.delete(key);return false}
 }
 function topMasteriesForProfile(p,limit=5,includeZero=false){
   const mastery=cleanMastery(p?.heroMastery||{});
   let rows=HERO_IDS.map(id=>({id,xp:Math.max(0,Math.floor(Number(mastery[id])||0)),info:masteryInfoFromXp(mastery[id]||0)})).filter(x=>includeZero||x.xp>0).sort((a,b)=>b.xp-a.xp||b.info.level-a.info.level||HERO_IDS.indexOf(a.id)-HERO_IDS.indexOf(b.id));
   return Number.isFinite(limit)?rows.slice(0,limit):rows;
 }
 function masteryProfileRowsHTML(p,limit=5,includeZero=false,heroIds=null){
   let top;
   if(Array.isArray(heroIds)){
     const mastery=cleanMastery(p?.heroMastery||{});
     const ids=[...new Set(heroIds.map(id=>id==='arcwarden_clone'?'arcwarden':id).filter(id=>HERO_IDS.includes(id)))];
     top=ids.map(id=>({id,xp:Math.max(0,Math.floor(Number(mastery[id])||0)),info:masteryInfoFromXp(mastery[id]||0)})).filter(x=>includeZero||x.xp>0);
     if(Number.isFinite(limit))top=top.slice(0,limit);
   }else top=topMasteriesForProfile(p,limit,includeZero);
   if(!top.length)return '<div class="profile-mastery-empty">На героях пока нет опыта мастерства.</div>';
   return top.map((x,i)=>{let m=x.info,meta=HERO_META[x.id]||{name:x.id.toUpperCase(),icon:''},left=m.level>=MASTERY_MAX_LEVEL?'MAX':`${Math.max(0,m.nextXp-m.levelXp)} XP до ${m.level+1}`;return `<div class="profile-mastery-row tier-${m.tier.key}"><span class="profile-mastery-place">${i+1}</span><img class="profile-mastery-hero" src="${meta.icon}" alt=""><span class="profile-mastery-copy"><b>${esc(meta.name)}</b><small>${esc(m.tierName)} • уровень ${m.level} • ${m.xp} XP</small><i><span style="width:${Math.round(m.progress*100)}%"></span></i></span><span class="profile-mastery-tier"><img src="${m.icon}" alt="${esc(m.tierName)}"><b>${m.level}</b><small>${left}</small></span></div>`}).join('');
 }
 function ensureMasteryProfileModal(){
   let modal=document.getElementById('mastery-profile-modal');if(modal)return modal;
   modal=document.createElement('div');modal.id='mastery-profile-modal';modal.className='profile-mastery-modal hidden';modal.innerHTML='<div class="profile-mastery-box"><button class="profile-mastery-close" type="button">×</button><div class="profile-mastery-head"></div><div class="profile-mastery-list"></div></div>';
   modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.profile-mastery-close'))modal.classList.add('hidden')});document.body.appendChild(modal);return modal;
 }
 function openMasteryProfile(playerIndex){
   const n=Number.isInteger(playerIndex)?playerIndex:localPlayer,p=dataFor(n),modal=ensureMasteryProfileModal(),av=p.avatar?`<img src="${p.avatar}" alt="">`:'<div class="profile-mastery-avatar-fallback">?</div>',rank=rankIconFor(p.rating);
   const gameVisible=typeof G!=='undefined'&&G&&document.getElementById('game')&&!document.getElementById('game').classList.contains('hidden');
   const matchHeroes=gameVisible?(G?.teams?.[n]||[]).filter(h=>h&&h.id!=='arcwarden_clone').map(h=>h.id):null;
   const subtitle=gameVisible?'Герои в матче':'Все тиры героев';
   modal.querySelector('.profile-mastery-head').innerHTML=`<span class="profile-mastery-avatar">${av}</span><span class="profile-mastery-title"><b>${esc(p.nick)}</b><small>${esc(p.rank)} • ${p.rating} MMR • ${p.wins}–${p.losses}</small><em>${subtitle}</em></span><img class="profile-mastery-rank" src="${rank}" alt="">`;
   modal.querySelector('.profile-mastery-list').innerHTML=masteryProfileRowsHTML(p,Number.POSITIVE_INFINITY,true,matchHeroes);modal.classList.remove('hidden');
 }
 function masteryInfoFor(playerIndex,heroId){if(heroId==='arcwarden_clone')heroId='arcwarden';let p=dataFor(Number.isInteger(playerIndex)?playerIndex:localPlayer),xp=Math.max(0,Math.floor(Number(p?.heroMastery?.[heroId])||0));return masteryInfoFromXp(xp)}
 function masteryBadgeHTML(playerIndex,heroId,compact=false){let m=masteryInfoFor(playerIndex,heroId),title=`${m.tierName} • уровень ${m.level} • ${m.xp} XP${m.level<MASTERY_MAX_LEVEL?` • ${m.nextXp-m.levelXp} XP до уровня ${m.level+1}`:' • максимальный уровень'}`;return `<span class="hero-mastery ${compact?'compact':''} tier-${m.tier.key}" title="${esc(title)}"><img src="${m.icon}" alt="${esc(m.tierName)}"><b>${m.level}</b></span>`}
 window.DotaProfile={getPublic,setLocalPlayer,setRemote,render,load,recordResult,rankFor,rankIndexFor,rankIconFor,mmrFromWL,masteryInfoFor,masteryBadgeHTML,masteryLevelForXp,xpForLevel,xpToNext,topMasteriesForProfile,masteryProfileRowsHTML,openMasteryProfile,isReady:()=>ready};
 document.addEventListener('DOMContentLoaded',()=>{render();retryLoad();setInterval(()=>load(),4000)});
})();
