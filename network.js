// Dota Cards v0.41 — built-in portable multiplayer host.
// If opened through HOST_GAME.bat, the page connects to the local WebSocket server.
(() => {
  const GAME_VERSION='1.86.95';
  const PROTOCOL_VERSION=12;
  const DOTA_SERVER_CONFIG = {
    primary: localStorage.getItem('dota_server_primary') || 'https://dota-3v3-lobby.onrender.com',
    fallbacks: [
      'http://kodama.proxy.rlwy.net:20920',
      'https://lobby-server-nfqg-production.up.railway.app'
    ]
  };
  window.DotaServerConfig = {
    getPrimary:()=>localStorage.getItem('dota_server_primary')||'',
    setPrimary:(url)=>{ if(url) localStorage.setItem('dota_server_primary', String(url).replace(/\/+$/,'')); else localStorage.removeItem('dota_server_primary'); location.reload(); },
    clearPrimary:()=>{ localStorage.removeItem('dota_server_primary'); location.reload(); }
  };

  function serverCandidates(){
    const p=localStorage.getItem('dota_server_primary')||DOTA_SERVER_CONFIG.primary||'';
    const list=[p,...DOTA_SERVER_CONFIG.fallbacks].filter(Boolean);
    return [...new Set(list.map(x=>String(x).replace(/\/+$/,'')))];
  }
  window.DotaServerCandidates=serverCandidates;
  function httpToWs(base){
    if(base.startsWith('https://')) return 'wss://'+base.slice(8);
    if(base.startsWith('http://')) return 'ws://'+base.slice(7);
    if(base.startsWith('wss://')||base.startsWith('ws://')) return base;
    return 'wss://'+base;
  }
  async function fetchFromAny(path, options={}, timeout=10000){
    let lastErr=null;
    for(const base of serverCandidates()){
      const ctrl=new AbortController();
      const t=setTimeout(()=>ctrl.abort(),timeout);
      try{
        const r=await fetch(base+path,{...options,signal:ctrl.signal,cache:'no-store'});
        clearTimeout(t);
        if(!r.ok) throw new Error('HTTP '+r.status);
        return {response:r,base};
      }catch(e){clearTimeout(t);lastErr=e;}
    }
    throw lastErr||new Error('No server available');
  }
  window.DOTA_GAME_VERSION=GAME_VERSION;
  const submittedGlobalMatches=new Set();
  const submittingGlobalMatches=new Map();
  window.DOTA_PROTOCOL_VERSION=PROTOCOL_VERSION;
  const OFFLINE=new URLSearchParams(location.search).has('offline');
  window.DOTA_OFFLINE_MODE=OFFLINE;
  let ws=null, player=null, applying=false, connected=false, versionMismatch=false, leavingMatch=false; window.DOTA_NET_CONNECTED=false; window.DOTA_NET_PLAYER=null;
  let peerVersionState='waiting', versionCheckTimer=null;
  let sendQueued=false,lastPayload='',vfxSeq=0;
  const seenVfx=new Set(), activeVfx=new Map();
  const status=()=>document.getElementById('netStatus');
  function setStatus(t){ if(status()) status().textContent=t; }
  const ROOM_ID=new URLSearchParams(location.search).get('room')||'';
  const waitProfiles=[null,null];
  let peerCompatible=false, waitReleased=false, waitReleaseTimer=null;
  function waitProfileFor(slot){
    if(Number.isInteger(player)&&slot===player){
      try{return window.DotaProfile?.getPublic?.()||waitProfiles[slot]}catch{return waitProfiles[slot]}
    }
    return waitProfiles[slot];
  }
  function renderWaitPlayer(slot){
    const el=document.getElementById('lobbyPlayer'+slot); if(!el)return;
    const p=waitProfileFor(slot);
    el.classList.toggle('local',Number.isInteger(player)&&slot===player);
    if(!p){
      el.classList.add('waiting');
      el.innerHTML=`<div class="lobby-player-search"><span class="lobby-mini-spinner"></span><span>${slot===0?'ПОДКЛЮЧЕНИЕ…':'ИЩЕМ ИГРОКА…'}</span></div>`;
      return;
    }
    el.classList.remove('waiting');
    const rating=Math.max(0,Math.floor(Number(p.rating)||0));
    const rank=String(p.rank||'Без ранга');
    const ri=Math.max(1,Math.min(99,Number(p.rankIndex)||1));
    const avatar=document.createElement('div');avatar.className='lobby-wait-avatar';
    if(p.avatar){const img=document.createElement('img');img.src=p.avatar;img.alt='';avatar.append(img)}else avatar.textContent='?';
    const meta=document.createElement('div');meta.className='lobby-wait-meta';
    const nick=document.createElement('div');nick.className='lobby-wait-nick';nick.textContent=p.nick||('Игрок '+(slot+1));
    const rr=document.createElement('div');rr.className='lobby-wait-rank';
    const icon=document.createElement('img');icon.src=`assets/ranks/rank_${String(ri).padStart(2,'0')}.png`;icon.alt='';
    const txt=document.createElement('div');txt.innerHTML=`<b>${rank}</b><span>${rating} MMR${Number.isFinite(Number(p.wins))?` • Победы: ${Math.max(0,Number(p.wins)||0)}`:''}</span>`;
    rr.append(icon,txt);meta.append(nick,rr);el.innerHTML='';
    if(slot===0)el.append(avatar,meta);else el.append(meta,avatar);
  }
  function renderLobbyWait(){
    if(!ROOM_ID||OFFLINE)return;
    const overlay=document.getElementById('lobbyWaitOverlay'); if(!overlay)return;
    // Profile refreshes happen every 5 seconds. Once the waiting screen has
    // already been released, refresh only the player cards and never reopen it.
    if(!waitReleased){
      overlay.classList.remove('hidden');
      document.body.classList.add('lobby-waiting');
    }
    renderWaitPlayer(0);renderWaitPlayer(1);
  }
  function showLobbySearching(text){
    if(!ROOM_ID||OFFLINE)return;
    clearTimeout(waitReleaseTimer);waitReleased=false;peerCompatible=false;
    const overlay=document.getElementById('lobbyWaitOverlay'); if(!overlay)return;
    overlay.classList.remove('hidden','ready');document.body.classList.add('lobby-waiting');
    document.getElementById('lobbySearchState')?.classList.remove('hidden');
    document.getElementById('lobbyReadyState')?.classList.add('hidden');
    const sub=document.getElementById('lobbyWaitSubtitle');if(sub)sub.textContent=text||'Лобби создано. Ждём второго игрока…';
    renderLobbyWait();
  }
  function maybeReleaseLobbyWait(){
    if(waitReleased||!connected||versionMismatch||!peerCompatible)return;
    const p0=waitProfileFor(0),p1=waitProfileFor(1); if(!p0||!p1)return;
    waitReleased=true;renderLobbyWait();
    const overlay=document.getElementById('lobbyWaitOverlay');if(!overlay)return;
    overlay.classList.add('ready');
    const sub=document.getElementById('lobbyWaitSubtitle');if(sub)sub.textContent='Соперник найден. Соединение установлено.';
    waitReleaseTimer=setTimeout(()=>{overlay.classList.add('hidden');overlay.classList.remove('ready');document.body.classList.remove('lobby-waiting');setStatus(`Сеть: Игрок ${player+1} • соперник подключён`);},1050);
  }
  function refreshLocalWaitProfile(){
    if(!Number.isInteger(player))return;
    try{const p=window.DotaProfile?.getPublic?.();if(p)waitProfiles[player]=p}catch{}
    renderLobbyWait();maybeReleaseLobbyWait();
  }
  function phase(){ return document.getElementById('game')?.classList.contains('hidden')?'draft':'game'; }
  function applyLocks(){
    document.body.classList.toggle('net-guest', connected && player!==0);
    const locked=connected && G && player!==G.team;
    document.body.classList.toggle('net-locked', !!locked);
    if(connected && player!==0 && !G) setStatus(`Сеть: Игрок ${player+1} • ждём, пока хост выберет команды`);
    else if(connected && player!==null) setStatus(`Сеть: Игрок ${player+1}${G?` • ${G.team===player?'ВАШ ХОД':'ход соперника'}`:''}`);
  }
  function wirePayload(){
    // Temporary animation flags (_bombBoom/_mineBoom/_razeFlash/etc.) are local-only.
    // Sending them as authoritative state made remote clients replay old VFX repeatedly.
    return JSON.stringify({type:'state',G,chosen,phase:phase()},(k,v)=>k&&k[0]==='_'?undefined:v);
  }
  function sendState(){
    if(!connected||!ws||ws.readyState!==1||applying)return;
    const payload=wirePayload();
    if(payload===lastPayload)return;
    lastPayload=payload;
    ws.send(payload);
  }
  function scheduleState(){
    if(sendQueued||applying)return;
    sendQueued=true;
    setTimeout(()=>{sendQueued=false;sendState()},24);
  }
  function vfxKey(team,id,kind){return `${team}:${id}:${kind}`}
  function applyNetworkVfxClasses(){
    if(!G)return;
    const now=performance.now();
    for(const [key,until] of activeVfx){
      if(until<=now){activeVfx.delete(key);continue}
      const [team,id,kind]=key.split(':');
      const el=document.getElementById(`hero-${team}-${id}`);
      if(!el)continue;
      if(kind==='bomb')el.classList.add('bomb-boom');
      else if(kind==='mine')el.classList.add('mine-boom');
      else if(kind==='raze')el.classList.add('shadowraze-hit');
    }
  }
  function consumeVfx(events){
    if(!Array.isArray(events))return;
    for(const ev of events){
      if(!ev||!ev.id||seenVfx.has(ev.id))continue;
      seenVfx.add(ev.id);
      if(seenVfx.size>200){const first=seenVfx.values().next().value;seenVfx.delete(first)}
      if(ev.kind==='damage'){if(Date.now()-(ev.at||0)<Math.max(1500,(Number(ev.delay)||0)+1000))window.playDamageFx?.(ev);continue}
      if(ev.kind==='audio-satanic'){if(Date.now()-(ev.at||0)<2500){const h=window.findHero?.(ev.team,ev.heroId);if(h)window.playSatanicSound?.(h,true)}continue}
      if(ev.kind==='audio-attack'){if(Date.now()-(ev.at||0)<2500){const h=window.findHero?.(ev.team,ev.heroId);if(h)window.playAttackSound?.(h,true)}continue}
      if(ev.kind==='audio-skill'){if(Date.now()-(ev.at||0)<2500){const h=window.findHero?.(ev.team,ev.heroId);if(h&&ev.skillId)window.playSkillSound?.(h,ev.skillId,true)}continue}
      if(ev.kind==='audio-turn'){if(Date.now()-(ev.at||0)<3500){const h=window.findHero?.(ev.team,ev.heroId);if(h)window.playTurnVoice?.(h,true)}continue}
      if(ev.kind==='requiem'){if(Date.now()-(ev.at||0)<6000)window.playRequiemFx?.(ev);continue}
      if(ev.kind==='item-dagon'){if(Date.now()-(ev.at||0)<3000)window.playDagonFx?.(ev);continue}
      if(ev.kind?.startsWith('invoker-')){if(Date.now()-(ev.at||0)<4000)window.playInvokerFx?.(ev);continue}
      if(ev.kind==='audio-invoker-spell'){if(Date.now()-(ev.at||0)<3000){const h=window.findHero?.(ev.team,ev.heroId);if(h&&ev.skillId)window.playInvokerSpellCast?.(ev.skillId,h,true)}continue}
      if(ev.kind?.startsWith('brood-')){if(Date.now()-(ev.at||0)<3000)window.playBroodFx?.(ev);continue}
      if(ev.kind==='audio-brood-kill'){if(Date.now()-(ev.at||0)<3500){const h=window.findHero?.(ev.team,ev.heroId);if(h)window.playBroodKillVoice?.(h,true)}continue}
      if(ev.kind==='hero-kill'){if(Date.now()-(ev.at||0)<6000)window.showKillNotice?.(ev);continue}
      if(ev.kind?.startsWith('pl-')){if(Date.now()-(ev.at||0)<6000)window.playPhantomVfx?.(ev);continue}
      if(ev.kind?.startsWith('arc-')){if(Date.now()-(ev.at||0)<6000)window.playArcFx?.(ev);continue}
      if(ev.kind?.startsWith('axe-')){if(Date.now()-(ev.at||0)<4000)window.playAxeFx?.(ev);continue}
      if(ev.kind?.startsWith('abaddon-')){if(Date.now()-(ev.at||0)<4000)window.playAbaddonFx?.({kind:ev.kind.replace('abaddon-',''),...ev});continue}
      if(ev.kind?.startsWith('mars-')){if(Date.now()-(ev.at||0)<5000)window.playMarsFx?.({kind:ev.kind.replace('mars-',''),...ev});continue}
      if(ev.kind?.startsWith('enigma-')){if(Date.now()-(ev.at||0)<5000)window.playEnigmaFx?.(ev);continue}
      if(!Number.isInteger(ev.team)||!ev.heroId||!['bomb','mine','raze'].includes(ev.kind))continue;
      const requested=Math.max(0,Number(ev.delay)||0),elapsed=ev.at?Math.max(0,Date.now()-Number(ev.at||0)):0,wait=Math.max(0,requested-elapsed);
      if(wait>5)setTimeout(()=>{activeVfx.set(vfxKey(ev.team,ev.heroId,ev.kind),performance.now()+760);applyNetworkVfxClasses()},wait);
      else activeVfx.set(vfxKey(ev.team,ev.heroId,ev.kind),performance.now()+760);
    }
    applyNetworkVfxClasses();
  }
  window.emitNetVfx=function(kind,h,extra={}){
    if(!G||!h)return;
    G.netEvents=Array.isArray(G.netEvents)?G.netEvents:[];
    const id=`${G.matchId}:${Date.now()}:${player??'l'}:${++vfxSeq}`;
    seenVfx.add(id);
    G.netEvents.push({...extra,id,kind,team:h.team,heroId:h.id,at:Date.now()});
    if(G.netEvents.length>24)G.netEvents=G.netEvents.slice(-24);
  };
  function globalMatchPayload(){
    if(!G?.matchId||G?.winner==null)return null;
    const p0=waitProfiles[0]||((player===0)?window.DotaProfile?.getPublic?.():null)||{};
    const p1=waitProfiles[1]||((player===1)?window.DotaProfile?.getPublic?.():null)||{};
    return {
      matchId:String(G.matchId),
      winner:Number(G.winner),
      players:[
        {id:String(p0.globalId||p0.id||''),nick:p0.nick||'Игрок 1',rating:Number(p0.rating)||0},
        {id:String(p1.globalId||p1.id||''),nick:p1.nick||'Игрок 2',rating:Number(p1.rating)||0}
      ],
      teams:[
        (G.teams?.[0]||[]).filter(h=>h&&h.id!=='arcwarden_clone').map(h=>h.id).slice(0,3),
        (G.teams?.[1]||[]).filter(h=>h&&h.id!=='arcwarden_clone').map(h=>h.id).slice(0,3)
      ]
    };
  }
  async function submitGlobalMatch(){
    if(OFFLINE||!Number.isInteger(player)||G?.winner==null||!G?.matchId)return false;
    const key=String(G.matchId);
    if(submittedGlobalMatches.has(key))return true;
    if(submittingGlobalMatches.has(key))return submittingGlobalMatches.get(key);
    const job=(async()=>{
      const payload=globalMatchPayload(); if(!payload)return false;
      let last=null;
      for(let attempt=1;attempt<=5;attempt++){
        try{
          const r=await lobbyFetch('/api/match',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true},null);
          let out=null;try{out=await r.json()}catch{}
          if(!r.ok||out?.ok===false)throw new Error(out?.error||('HTTP '+r.status));
          submittedGlobalMatches.add(key);
          console.log('[GLOBAL STATS] match submitted',key,out||{});
          return true;
        }catch(e){
          last=e;
          console.warn('[GLOBAL STATS] submit failed',key,'attempt',attempt,e?.message||e);
          if(attempt<5)await new Promise(r=>setTimeout(r,700*attempt));
        }
      }
      throw last||new Error('global stats submit failed');
    })().catch(e=>{console.error('[GLOBAL STATS] giving up',key,e?.message||e);return false}).finally(()=>submittingGlobalMatches.delete(key));
    submittingGlobalMatches.set(key,job);return job;
  }
  window.DotaSubmitGlobalMatch=submitGlobalMatch;
  const originalRender=window.render;
  window.render=function(){ originalRender(); applyNetworkVfxClasses(); applyLocks(); if(G?.winner!=null&&G?.matchId){
    window.DotaProfile?.recordResult?.(G.matchId,G.winner);
    submitGlobalMatch();
  }
  scheduleState(); };
  window.syncDraftState=()=>scheduleState();
  // A finished host match is retried independently of rendering so a transient HTTP failure cannot lose global stats.
  setInterval(()=>{try{if(!OFFLINE&&Number.isInteger(player)&&G?.winner!=null&&G?.matchId)submitGlobalMatch()}catch{}},3000);

  let toastTimer=null;
  function showHostToast(text){
    const el=document.getElementById('netToast');
    if(!el)return;
    el.textContent='✓ '+text;
    el.classList.remove('hidden','show');
    requestAnimationFrame(()=>el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.classList.add('hidden'),260)},3500);
  }
  function setHostPeerStatus(connectedPeer){
    clearTimeout(versionCheckTimer); versionCheckTimer=null;
    peerVersionState=connectedPeer?'ok':'waiting';
    const el=document.getElementById('hostPeerStatus'),go=document.getElementById('hostContinueBtn');
    if(el){el.classList.toggle('connected',!!connectedPeer);el.classList.remove('incompatible');el.textContent=connectedPeer?'● Игрок 2 подключён • версия совместима':'○ Ожидаем подключения Игрока 2'}
    if(go){go.disabled=!connectedPeer;go.textContent=connectedPeer?'ПЕРЕЙТИ К ВЫБОРУ ГЕРОЕВ':'ЖДЁМ ИГРОКА…'}
  }
  function setHostPeerChecking(){
    if(peerVersionState==='ok')return;
    peerVersionState='checking';
    clearTimeout(versionCheckTimer);
    versionCheckTimer=setTimeout(()=>{if(peerVersionState==='checking')setHostPeerIncompatible(null,null)},4000);
    const el=document.getElementById('hostPeerStatus'),go=document.getElementById('hostContinueBtn');
    if(el){el.classList.remove('connected','incompatible');el.textContent='◌ Игрок 2 подключён • проверяем версию…'}
    if(go){go.disabled=true;go.textContent='ПРОВЕРКА ВЕРСИИ…'}
  }
  function setHostPeerIncompatible(remoteGame,remoteProtocol){
    clearTimeout(versionCheckTimer); versionCheckTimer=null;
    peerVersionState='bad';
    const el=document.getElementById('hostPeerStatus'),go=document.getElementById('hostContinueBtn');
    if(el){el.classList.remove('connected');el.classList.add('incompatible');el.textContent=`✕ Несовместимая версия: ${remoteGame||'не определена'} • протокол ${remoteProtocol??'не указан'}`}
    if(go){go.disabled=true;go.textContent='НЕСОВМЕСТИМАЯ ВЕРСИЯ'}
  }
  function showVersionMismatch(remoteGame,remoteProtocol){
    versionMismatch=true;
    let box=document.getElementById('versionMismatchOverlay');
    if(!box){
      box=document.createElement('div');box.id='versionMismatchOverlay';box.className='version-mismatch-overlay';
      box.innerHTML=`<div class="version-mismatch-card"><h2>НЕСОВМЕСТИМЫЕ ВЕРСИИ</h2><p id="versionMismatchText"></p><p class="version-mismatch-hint">Для сетевой игры у обоих клиентов должна совпадать версия сетевого протокола.</p><button id="versionMismatchBack" type="button">ВЕРНУТЬСЯ В МЕНЮ</button></div>`;
      document.body.appendChild(box);
      box.querySelector('#versionMismatchBack')?.addEventListener('click',()=>window.DotaReturnToMenu?.());
    }
    const txt=box.querySelector('#versionMismatchText');
    if(txt)txt.textContent=`У вас: v${GAME_VERSION} • протокол ${PROTOCOL_VERSION}. Другой игрок: ${remoteGame?'v'+remoteGame:'старая версия'} • протокол ${remoteProtocol??'не указан'}.`;
    box.classList.add('show');
  }
  function checkPeerVersion(m){
    if(!m||m.player===player)return true;
    const remoteProtocol=m.protocolVersion??m.profile?.__protocolVersion;
    const remoteGame=m.gameVersion??m.profile?.__gameVersion;
    if(remoteProtocol===undefined||remoteProtocol===null||String(remoteProtocol)!==String(PROTOCOL_VERSION)){
      if(player===0)setHostPeerIncompatible(remoteGame,remoteProtocol);
      showVersionMismatch(remoteGame,remoteProtocol);
      setStatus('Сеть: несовместимая версия клиента');
      return false;
    }
    if(remoteGame&&String(remoteGame)!==GAME_VERSION){
      setStatus(`Сеть: v${GAME_VERSION} ↔ v${remoteGame} • протокол ${PROTOCOL_VERSION} совместим`);
    }
    if(player===0&&m.player===1)setHostPeerStatus(true);
    return true;
  }

  function sendVersion(){
    if(!connected||!ws||ws.readyState!==1)return;
    try{ws.send(JSON.stringify({type:'version',gameVersion:GAME_VERSION,protocolVersion:PROTOCOL_VERSION}))}catch{}
  }

  function sendProfile(){
    if(!connected||!ws||ws.readyState!==1)return;
    if(!window.DotaProfile?.isReady?.())return;
    try{
      const pub=window.DotaProfile?.getPublic?.();
      if(!pub)return;
      // Put compatibility metadata both outside and inside the public profile. The current server
      // relays profile objects; the nested copy keeps the check working even if a server build
      // rebuilds the outer message and drops unknown top-level fields.
      const profile={...pub,__gameVersion:GAME_VERSION,__protocolVersion:PROTOCOL_VERSION};
      ws.send(JSON.stringify({type:'profile',player,profile,gameVersion:GAME_VERSION,protocolVersion:PROTOCOL_VERSION}));
    }catch{}
  }
  window.addEventListener('dota-profile-ready',()=>{refreshLocalWaitProfile();sendProfile();});
  setInterval(()=>{if(connected&&window.DotaProfile?.isReady?.())sendProfile()},5000);
  function connect(){
    if(location.protocol==='file:'){ setStatus('Сеть: запусти DOTA_CARDS.exe'); return; }
    const qs=new URLSearchParams(location.search);
    const room=(qs.get('room')||'').trim();
    if(!room){ setStatus('Сеть: выбери или создай лобби'); return; }
    {
      const bases=window.DotaServerCandidates();
      let i=0;
      const tryWs=()=>{
        if(i>=bases.length){setStatus('Сеть: не удалось подключиться к серверу');return;}
        const base=bases[i++], url=`${httpToWs(base)}/ws?room=${encodeURIComponent(room)}`;
        try{
          const prev=ws;
          const next=new WebSocket(url);
          if(prev){next.onopen=prev.onopen;next.onclose=prev.onclose;next.onerror=prev.onerror;next.onmessage=prev.onmessage;}
          ws=next;
          let opened=false;
          ws.addEventListener('open',()=>{opened=true},{once:true});
          ws.addEventListener('error',()=>{if(!opened)tryWs()},{once:true});
        }catch(e){tryWs();}
      };
      tryWs();
    }
    ws.onopen=()=>setStatus('Сеть: подключение…');
    ws.onclose=()=>{const localPlayer=player;if(ROOM_ID&&!leavingMatch&&!(typeof G!=='undefined'&&G)){showLobbySearching('Соединение с лобби потеряно.');}const unfinished=!!(typeof G!=='undefined'&&G&&G.winner==null&&document.getElementById('game')&&!document.getElementById('game').classList.contains('hidden'));if(unfinished&&Number.isInteger(localPlayer)&&!versionMismatch&&!leavingMatch){G.winner=localPlayer;window.DotaProfile?.recordResult?.(G.matchId,localPlayer);try{render()}catch{}}connected=false;window.DOTA_NET_CONNECTED=false;window.DOTA_NET_PLAYER=null;lastPayload='';document.body.classList.remove('net-locked','net-guest');if(!versionMismatch)setStatus('Сеть: соединение потеряно');};
    ws.onerror=()=>setStatus('Сеть: ошибка соединения');
    ws.onmessage=e=>{
      let m; try{m=JSON.parse(e.data)}catch{return}
      if(m.type==='hello'){
        versionMismatch=false; connected=true; player=m.player; peerCompatible=false; if(player===0)setHostPeerStatus(false); window.DOTA_NET_CONNECTED=true; window.DOTA_NET_PLAYER=player; lastPayload=''; window.DotaProfile?.setLocalPlayer(player); refreshLocalWaitProfile(); showLobbySearching(player===0?'Лобби создано. Ждём второго игрока…':'Подключаемся к лобби…'); sendVersion(); if(window.DotaProfile?.isReady?.())sendProfile(); window.DotaProfile?.load?.().then(()=>{refreshLocalWaitProfile();sendProfile()})
        if(m.state) receiveState(m.state);
        applyLocks(); return;
      }
      if(m.type==='state') receiveState(m);
      if(m.type==='version'&&Number.isInteger(m.player)){ if(checkPeerVersion(m)){peerCompatible=true;maybeReleaseLobbyWait();} }
      if(m.type==='profile'&&m.profile&&Number.isInteger(m.player)){
        // Compatibility fallback for v0.84-v0.87 servers/clients that carried version data inside profile.
        if(peerVersionState!=='ok' && !checkPeerVersion(m))return;
        waitProfiles[m.player]=m.profile; peerCompatible=true;
        window.DotaProfile?.setRemote(m.player,m.profile); renderLobbyWait(); maybeReleaseLobbyWait();
      }
      if(m.type==='info') {
        const info=String(m.text??m.message??''); if(info)setStatus(info);
        if(/disconnect|отключ|выш|покин/i.test(info)){
          waitProfiles[player===0?1:0]=null; showLobbySearching('Соперник отключился. Снова ищем игрока…'); renderLobbyWait();
          if(player===0){setHostPeerStatus(false);showHostToast('Игрок отключился');if(typeof G!=='undefined'&&G&&G.winner==null&&document.getElementById('game')&&!document.getElementById('game').classList.contains('hidden')){G.winner=0;try{render()}catch{}}}
        } else if(/подключ|заш[её]л|player|join|connect/i.test(info)){
          if(player===0){setHostPeerChecking();showHostToast('Игрок подключился • проверяем версию')}
          sendVersion();sendProfile();
        }
      }
    };
  }
  function receiveState(m){
    if(!m)return;
    // A host restart is a real network state too: clear the old match on every client.
    if(m.phase==='menu'){
      applying=true; targetMode=null; G=null; chosen=[]; draftPreview=null; clearBattlefield(); activeVfx.clear(); seenVfx.clear(); lastPayload=''; applying=false;
      try{ws?.close()}catch{}; setTimeout(()=>{location.href=location.pathname},30); return;
    }
    if(m.phase==='draft'){
      applying=true; targetMode=null; G=null; chosen=Array.isArray(m.chosen)?m.chosen:[]; draftPreview=null;
      clearBattlefield(); activeVfx.clear(); seenVfx.clear(); lastPayload=''; closeInspect(); closeHeroPick();
      document.getElementById('game').classList.add('hidden');
      document.getElementById('draft').classList.remove('hidden');
      updateDraft(); applying=false; applyLocks();
      return;
    }
    if(!m.G)return;
    const previousMatch=G?.matchId;
    const previousActivation=G?`${G.matchId}:${G.team}:${G.teamTurns?.join(',')}`:'';
    const previousWinner=G?.winner;
    const wasGameVisible=!document.getElementById('game').classList.contains('hidden');
    captureDamageFxRects();
    applying=true; targetMode=null; G=m.G; if(Array.isArray(m.chosen)) chosen=m.chosen;
    if(m.phase==='game'){
      document.getElementById('draft').classList.add('hidden');
      document.getElementById('game').classList.remove('hidden');
      // Do NOT destroy/recreate every hero DOM node on each packet. That was the main source
      // of portrait/video stutter and also restarted CSS animations.
      if(!wasGameVisible||previousMatch!==G.matchId){clearBattlefield();activeVfx.clear();seenVfx.clear()}
    }
    originalRender(); consumeVfx(G.netEvents); applyNetworkVfxClasses(); applying=false; applyLocks();
    const activation=`${G.matchId}:${G.team}:${G.teamTurns?.join(',')}`;
    const actor=active(),hasVoice=G.netEvents?.some(e=>e.kind==='audio-turn'&&e.team===actor?.team&&e.heroId===actor?.id&&Date.now()-(e.at||0)<3500);
    if(previousActivation!==activation&&actor&&G.actions>0&&!hasVoice)playTurnVoice(actor,true);
    if(previousWinner==null && G?.winner!=null){ window.DotaProfile?.recordResult?.(G.matchId,G.winner); submitGlobalMatch(); }
  }
  // Return to the real front menu. Hosts first clear authoritative server state; guests simply disconnect.
  window.DotaReturnToMenu=async function(){
    const localPlayer=player,abandon=!!(connected&&Number.isInteger(localPlayer)&&G&&G.winner==null&&document.getElementById('game')&&!document.getElementById('game').classList.contains('hidden'));
    leavingMatch=true;
    if(abandon){try{await fetch('/result',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({matchId:String(G.matchId||''),won:false}),keepalive:true})}catch{}}
    try{
      if(ws&&ws.readyState===1){
        if(player===0) ws.send(JSON.stringify({type:'state',G:null,chosen:[],phase:'menu',reset:true}));
        ws.close();
      }
    }catch{}
    connected=false; window.DOTA_NET_CONNECTED=false; window.DOTA_NET_PLAYER=null;
    setTimeout(()=>{ location.href=location.pathname; },40);
  };
  window.addEventListener('pagehide',()=>{
    if(leavingMatch||!connected||!Number.isInteger(player)||!G||G.winner!=null)return;
    try{const body=JSON.stringify({matchId:String(G.matchId||''),won:false});navigator.sendBeacon('/result',new Blob([body],{type:'application/json'}))}catch{}
  });
  // Guests cannot start the authoritative match, but either player may leave to the main menu.
  document.addEventListener('click',e=>{
    if(!connected)return;
    if(player!==0 && e.target?.id==='startBtn'){e.preventDefault();e.stopImmediatePropagation();return;}
  },true);
  if(OFFLINE){
    setStatus('Режим: офлайн • оба игрока на этом ПК');
    document.body.classList.add('offline-mode');
  }else if(new URLSearchParams(location.search).has('room')){showLobbySearching('Подключаемся к лобби…');connect();}
  else setStatus('Сеть: выбери или создай лобби');
  document.getElementById('lobbyLeaveBtn')?.addEventListener('click',()=>window.DotaReturnToMenu?.());
})();


// Public lobby front menu — no VPN/IP entry required.
(() => {
  const menu=document.getElementById('mpMenu'),create=document.getElementById('createGameBtn'),browse=document.getElementById('connectGameBtn'),offline=document.getElementById('offlineGameBtn');
  const leaderboardBtn=document.getElementById('leaderboardBtn'),heroStatsBtn=document.getElementById('heroStatsBtn');
  const leaderboardPanel=document.getElementById('leaderboardPanel'),heroStatsPanel=document.getElementById('heroStatsPanel');
  const leaderboardList=document.getElementById('leaderboardList'),heroStatsList=document.getElementById('heroStatsList');
  const leaderboardError=document.getElementById('leaderboardError'),heroStatsError=document.getElementById('heroStatsError');
  const refreshLeaderboard=document.getElementById('refreshLeaderboardBtn'),refreshHeroStats=document.getElementById('refreshHeroStatsBtn');
  const hostPanel=document.getElementById('hostPanel'),connectPanel=document.getElementById('connectPanel'),hostContinue=document.getElementById('hostContinueBtn');
  const err=document.getElementById('connectError'),list=document.getElementById('lobbyList'),refresh=document.getElementById('refreshLobbiesBtn'),hostTitle=document.getElementById('hostLobbyTitle');
  if(!menu)return;
  function hidePanels(){hostPanel.classList.add('hidden');connectPanel.classList.add('hidden');leaderboardPanel?.classList.add('hidden');heroStatsPanel?.classList.add('hidden')}
  function enterRoom(id){location.href=location.pathname+'?room='+encodeURIComponent(id)}
  function netErrorLabel(e){
    if(!navigator.onLine)return 'нет подключения к интернету';
    if(e?.name==='AbortError')return 'сервер не ответил вовремя';
    const msg=String(e?.message||e||'ошибка сети');
    if(/Failed to fetch|NetworkError|Load failed/i.test(msg))return 'соединение с игровым сервером не установлено';
    return msg;
  }
  async function fetchOnce(base,path,options={},timeoutMs=10000){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{return await fetch(base+path,{...options,signal:controller.signal,cache:options.cache||'no-store'})}
    finally{clearTimeout(timer)}
  }
  async function lobbyFetch(path,options={},onAttempt){
    const waits=[8000,12000,18000]; let lastError=null;
    const bases=window.DotaServerCandidates();
    let attempt=0,total=bases.length*waits.length;
    for(const base of bases){
      for(let i=0;i<waits.length;i++){
        attempt++;
        try{
          onAttempt?.(attempt,total,base);
          const r=await fetchOnce(base,path,options,waits[i]);
          if(r.ok||r.status<500)return r;
          lastError=new Error('HTTP '+r.status+' @ '+base);
        }catch(e){lastError=e}
        if(i<waits.length-1)await new Promise(r=>setTimeout(r,500*(i+1)));
      }
    }
    throw lastError||new Error('соединение с игровым сервером не установлено');
  }
  async function loadLobbies(){
    err.textContent='';list.innerHTML='<div class="mp-help">Загрузка лобби…</div>';
    if(refresh){refresh.disabled=true;refresh.textContent='ОБНОВЛЕНИЕ…'}
    try{
      const r=await lobbyFetch('/api/lobbies',{cache:'no-store'},(n,total)=>{if(refresh)refresh.textContent=`ПОПЫТКА ${n}/${total}…`;list.innerHTML=`<div class="mp-help">Подключение к серверу • попытка ${n}/${total}</div>`});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const j=await r.json(),rooms=Array.isArray(j.lobbies)?j.lobbies:[],open=rooms.filter(x=>(Number(x.players)||0)<2);
      if(!open.length){list.innerHTML='<div class="mp-help">Открытых лобби пока нет.</div>';return}
      list.innerHTML='';
      for(const room of open){
        const p=room.hostProfile||{};
        const row=document.createElement('div');row.className='mp-lobby-row';
        const avatar=document.createElement('div');avatar.className='mp-lobby-avatar';
        if(p.avatar){const img=document.createElement('img');img.src=p.avatar;img.alt='';avatar.append(img)}else avatar.textContent='?';
        const meta=document.createElement('div');meta.className='mp-lobby-meta';
        const name=document.createElement('b');name.textContent=p.nick||room.name||('Игрок • '+room.id);
        const rank=document.createElement('div');rank.className='mp-lobby-rank';
        const ri=Math.max(1,Math.min(99,Number(p.rankIndex)||1));
        const rankImg=document.createElement('img');rankImg.src=`assets/ranks/rank_${String(ri).padStart(2,'0')}.png`;rankImg.alt='';
        const rankText=document.createElement('span');rankText.textContent=`${p.rank||'Без ранга'} • ${Number(p.rating)||0} MMR`;
        rank.append(rankImg,rankText);meta.append(name,rank);
        const join=document.createElement('button');join.type='button';join.className='mp-lobby-join';join.textContent='ПОДКЛЮЧИТЬСЯ';join.addEventListener('click',()=>enterRoom(room.id));
        row.append(avatar,meta,join);list.append(row);
      }
    }catch(e){list.innerHTML='';err.textContent='Не удалось получить список лобби: '+netErrorLabel(e)}
    finally{if(refresh){refresh.disabled=false;refresh.textContent='ОБНОВИТЬ'}}
  }
  
  const HERO_DISPLAY={
    techies:'TECHIES',morphling:'MORPHLING',bane:'BANE',io:'IO',tinker:'TINKER',silencer:'SILENCER',
    shadowfiend:'SHADOW FIEND',lifestealer:'LIFESTEALER',pudge:'PUDGE',abaddon:'ABADDON',invoker:'INVOKER',
    arcwarden:'ARC WARDEN',axe:'AXE',broodmother:'BROODMOTHER',phantomlancer:'PHANTOM LANCER',mars:'MARS',enigma:'ENIGMA'
  };
  function rankIconPath(i){i=Math.max(1,Math.min(99,Number(i)||1));return `assets/ranks/rank_${String(i).padStart(2,'0')}.png`}
  async function loadLeaderboard(){
    leaderboardError.textContent='';leaderboardList.innerHTML='<div class="mp-help">Загрузка топа…</div>';
    if(refreshLeaderboard){refreshLeaderboard.disabled=true;refreshLeaderboard.textContent='ОБНОВЛЕНИЕ…'}
    try{
      const r=await lobbyFetch('/api/leaderboard',{cache:'no-store'});
      const j=await r.json(),players=Array.isArray(j.players)?j.players:[];
      leaderboardList.innerHTML='';
      if(!players.length){leaderboardList.innerHTML='<div class="mp-help">Рейтинг пока пуст.</div>';return}
      for(const p of players){
        const row=document.createElement('div');row.className='mp-global-row';
        const place=document.createElement('div');place.className='mp-global-place';place.textContent='#'+(p.place||'?');
        const meta=document.createElement('div');meta.className='mp-global-main';
        const nick=document.createElement('b');nick.textContent=p.nick||'Игрок';
        const rank=document.createElement('div');rank.className='mp-global-rank';
        const img=document.createElement('img');img.src=rankIconPath(p.rankIndex);img.alt='';
        const txt=document.createElement('span');txt.textContent=`${p.rank||'Без ранга'} • ${Number(p.rating)||0} MMR`;
        rank.append(img,txt);meta.append(nick,rank);row.append(place,meta);leaderboardList.append(row);
      }
    }catch(e){leaderboardList.innerHTML='';leaderboardError.textContent='Не удалось загрузить топ мира: '+netErrorLabel(e)}
    finally{if(refreshLeaderboard){refreshLeaderboard.disabled=false;refreshLeaderboard.textContent='ОБНОВИТЬ'}}
  }
  async function loadHeroStats(){
    heroStatsError.textContent='';heroStatsList.innerHTML='<div class="mp-help">Загрузка статистики…</div>';
    if(refreshHeroStats){refreshHeroStats.disabled=true;refreshHeroStats.textContent='ОБНОВЛЕНИЕ…'}
    try{
      const r=await lobbyFetch('/api/heroes',{cache:'no-store'});
      const j=await r.json(),heroes=Array.isArray(j.heroes)?j.heroes:[];
      heroStatsList.innerHTML='';
      if(!heroes.length){heroStatsList.innerHTML='<div class="mp-help">Статистики пока нет.</div>';return}
      for(const h of heroes){
        const row=document.createElement('div');row.className='mp-global-row mp-hero-winrate-row';
        const hero=document.createElement('div');hero.className='mp-hero-winrate-main';
        const portrait=document.createElement('img');portrait.className='mp-hero-winrate-portrait';
        const heroId=String(h.heroId||'');
        try{portrait.src=(typeof draftPortraitSrc==='function'?draftPortraitSrc(heroId):'')||''}catch{portrait.src=''}
        portrait.alt=HERO_DISPLAY[heroId]||heroId.toUpperCase();
        const name=document.createElement('b');name.textContent=HERO_DISPLAY[heroId]||heroId.toUpperCase();
        hero.append(portrait,name);
        const wr=document.createElement('div');wr.className='mp-global-winrate';wr.textContent=`${Number(h.winrate||0).toFixed(1)}%`;
        row.append(hero,wr);heroStatsList.append(row);
      }
    }catch(e){heroStatsList.innerHTML='';heroStatsError.textContent='Не удалось загрузить винрейт героев: '+netErrorLabel(e)}
    finally{if(refreshHeroStats){refreshHeroStats.disabled=false;refreshHeroStats.textContent='ОБНОВИТЬ'}}
  }
  leaderboardBtn?.addEventListener('click',()=>{hidePanels();leaderboardPanel?.classList.remove('hidden');loadLeaderboard()});
  heroStatsBtn?.addEventListener('click',()=>{hidePanels();heroStatsPanel?.classList.remove('hidden');loadHeroStats()});
  refreshLeaderboard?.addEventListener('click',loadLeaderboard);
  refreshHeroStats?.addEventListener('click',loadHeroStats);
  document.querySelectorAll('[data-close-panel]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.closePanel)?.classList.add('hidden')));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){connectPanel?.classList.add('hidden');leaderboardPanel?.classList.add('hidden');heroStatsPanel?.classList.add('hidden')}});

  create.addEventListener('click',async()=>{
    hidePanels();hostPanel.classList.remove('hidden');create.disabled=true;
    const peer=document.getElementById('hostPeerStatus'),go=document.getElementById('hostContinueBtn');
    if(peer){peer.classList.remove('connected','incompatible');peer.textContent='○ Создаю лобби…'}
    if(go){go.disabled=true;go.textContent='ЖДЁМ ИГРОКА…'}
    try{
      const profile=window.DotaProfile?.getPublic?.()||{};
      const lobbyName=(profile.nick||'Игрок')+' — Dota 3v3';
      const hostProfile={nick:profile.nick||'Игрок',avatar:profile.avatar||'',rating:Number(profile.rating)||0,rank:profile.rank||'Без ранга',rankIndex:Number(profile.rankIndex)||1};
      const r=await lobbyFetch('/api/lobbies',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:lobbyName,hostProfile})},(n,total)=>{if(peer)peer.textContent=`◌ Связь с сервером • попытка ${n}/${total}`});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const room=await r.json();
      if(!room?.id)throw new Error('сервер не вернул ID лобби');
      if(hostTitle)hostTitle.textContent=`Лобби: ${room.name||room.id}`;
      enterRoom(room.id);
    }catch(e){
      create.disabled=false;
      if(peer)peer.textContent='✕ Не удалось создать лобби: '+netErrorLabel(e);
      if(hostTitle)hostTitle.textContent='Ошибка создания лобби';
    }
  });
  browse.addEventListener('click',()=>{hidePanels();connectPanel.classList.remove('hidden');loadLobbies()});refresh?.addEventListener('click',loadLobbies);
  offline?.addEventListener('click',()=>{const version=String(window.DOTA_GAME_VERSION||'1.86.93'),build=version.replace(/\D/g,'');location.href=location.pathname+'?offline=1&build='+encodeURIComponent(build)});
  hostContinue.addEventListener('click',()=>menu.classList.add('hidden'));const qs=new URLSearchParams(location.search);if(qs.has('room')||qs.has('offline'))menu.classList.add('hidden');if(qs.has('offline')){const draftText=document.querySelector('#draft > p');if(draftText)draftText.textContent='Офлайн-режим: управляй обеими командами на этом ПК. Нажми на портрет, чтобы открыть полную карту.'}
})();
