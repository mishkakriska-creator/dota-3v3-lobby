/* Dota Cards 1.08 launcher lifecycle. Never changes match state. */
(() => {
  if (window.top !== window) return;
  let socket, token, leaving = false, reconnect;
  const WEB_STATIC=/\.github\.io$/i.test(location.hostname);
  if(location.pathname==='/profile-editor'){const css=document.createElement('link');css.rel='stylesheet';css.href='/visual-fixes.css?v=176';document.head.appendChild(css)}
  const bar = document.createElement('div');
  bar.id='webLifecycleBar';
  bar.style.cssText = 'position:fixed;right:14px;bottom:12px;z-index:10000;display:flex;gap:8px;align-items:center;padding:8px;border:1px solid #3a4358;border-radius:12px;background:#11151ef2;color:#fff;font:12px Segoe UI,sans-serif';
  const label = document.createElement('span');
  label.textContent = WEB_STATIC ? '1.86.94 • WEB' : '1.86.0 • Tinker';
  bar.append(label);
  function button(text, action) {
    const b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'font:600 12px Segoe UI,sans-serif;border:0;border-radius:7px;padding:7px 10px;cursor:pointer';
    b.onclick = action; bar.append(b); return b;
  }
  button(location.pathname === '/profile-editor' ? 'К игре' : 'Профиль', () => {
    if(WEB_STATIC){window.DotaProfile?.openEditor?.();return;}
    if (window.DOTA_NET_CONNECTED && !confirm('Переход к профилю разорвёт подключение к матчу. Продолжить?')) return;
    location.href = location.pathname === '/profile-editor' ? '/index.html' : '/profile-editor';
  });
  const exit = button('Выйти из игры', async () => {
    if (!confirm('Завершить игру и её фоновые процессы? Текущий матч будет прерван.')) return;
    exit.disabled = true;
    try {
      const response = await fetch('/_launcher/exit', {method:'POST',headers:{'X-Dota-Token':token}});
      if (!response.ok) throw new Error('exit');
      leaving = true; clearTimeout(reconnect); socket?.close();
      document.body.replaceChildren();
      const msg = document.createElement('p');
      msg.textContent = 'Игра закрывается, фоновые процессы завершатся через несколько секунд. Эту вкладку можно закрыть.';
      msg.style.cssText = 'padding:40px;color:#fff;font:20px Segoe UI,sans-serif';
      document.body.style.background = '#0b0d12'; document.body.append(msg);
    } catch {exit.disabled = false;label.textContent = 'Не удалось завершить. Закройте все вкладки игры и подождите 15 секунд.';}
  });
  async function renderProfileMasteryPanel() {
    if (location.pathname !== '/profile-editor' || document.getElementById('profileMasteryPanel')) return;
    const HEROES=[
      ['techies','TECHIES','assets/hero_portraits_v166/techies.png'],['morphling','MORPHLING','assets/hero_portraits_v166/morphling.png'],['bane','BANE','assets/hero_portraits_v166/bane.png'],['io','IO','assets/io_icon.png'],['tinker','TINKER','assets/tinker_icon.png'],['silencer','SILENCER','assets/hero_portraits_v166/silencer.png'],['shadowfiend','SHADOW FIEND','assets/hero_portraits_v166/shadowfiend.png'],['lifestealer','LIFESTEALER','assets/hero_portraits_v166/lifestealer.png'],['invoker','INVOKER','assets/invoker_icon.png'],['arcwarden','ARC WARDEN','assets/arcwarden_icon.png'],['phantomlancer','PHANTOM LANCER','assets/phantomlancer.png'],['axe','AXE','assets/axe.jpg'],['broodmother','BROODMOTHER','assets/hero_portraits_v166/broodmother.png'],['mars','MARS','assets/mars_draft.png'],['enigma','ENIGMA','assets/enigma_portrait.png']
    ];
    const TIERS=[
      [1,5,'Бронза','assets/mastery/bronze.png'],[6,11,'Серебро','assets/mastery/silver.png'],[12,17,'Золото','assets/mastery/gold.png'],[18,24,'Платина','assets/mastery/platinum.png'],[25,29,'Мастер','assets/mastery/master.png'],[30,30,'Грандмастер','assets/mastery/grandmaster.png']
    ];
    const oldGM=11600, gm=13600;
    const xpForLevel=l=>{l=Math.max(1,Math.min(30,Math.floor(Number(l)||1)));if(l<=1)return 0;if(l>=30)return gm;let old=0;for(let x=1;x<l;x++)old+=120+20*(x-1);return Math.round(old*gm/oldGM)};
    const info=xp=>{xp=Math.max(0,Math.floor(Number(xp)||0));let level=1;while(level<30&&xp>=xpForLevel(level+1))level++;let t=TIERS.find(t=>level>=t[0]&&level<=t[1])||TIERS[0],floor=xpForLevel(level),next=level>=30?floor:xpForLevel(level+1);return{xp,level,name:t[2],icon:t[3],progress:level>=30?1:Math.max(0,Math.min(1,(xp-floor)/Math.max(1,next-floor))),left:level>=30?'MAX':`${Math.max(0,next-xp)} XP до ${level+1}`}};
    let raw={};try{let srv=await fetch('/profile',{cache:'no-store'}).then(r=>r.ok?r.json():null).catch(()=>null);raw=srv?.heroMastery||JSON.parse(localStorage.getItem('dota_cards_hero_mastery_v1')||'{}')||{}}catch{}
    let top=HEROES.map(([id,name,icon])=>({id,name,icon,m:info(typeof raw[id]==='object'?raw[id]?.xp:raw[id])})).sort((a,b)=>b.m.xp-a.m.xp||b.m.level-a.m.level);
    const panel=document.createElement('section');panel.id='profileMasteryPanel';
    panel.innerHTML=`<div class="pm-title"><b>ВСЕ ТИРЫ ГЕРОЕВ</b><span>Полный список мастерства</span></div><div class="pm-list">${top.length?top.map((x,i)=>`<div class="pm-row"><strong>${i+1}</strong><img class="pm-hero" src="/${x.icon}" alt=""><span><b>${x.name}</b><small>${x.m.name} • уровень ${x.m.level} • ${x.m.xp} XP</small><i><em style="width:${Math.round(x.m.progress*100)}%"></em></i></span><span class="pm-tier"><img src="/${x.m.icon}" alt=""><b>${x.m.level}</b><small>${x.m.left}</small></span></div>`).join(''):'<div class="pm-empty">Сыграй сетевые матчи героями — здесь появятся твои тиры.</div>'}</div>`;
    const css=document.createElement('style');css.textContent=`
      #profileMasteryPanel{max-width:680px;margin:18px auto 86px;padding:16px;border:1px solid #35445b;border-radius:16px;background:linear-gradient(180deg,#141c29,#0d131c);color:#f4f6fa;font-family:Segoe UI,Arial,sans-serif;box-shadow:0 14px 40px #0005}
      #profileMasteryPanel .pm-title{display:flex;justify-content:space-between;align-items:baseline;padding:0 2px 10px;border-bottom:1px solid #29364a}#profileMasteryPanel .pm-title b{font-size:15px;color:#ffd166}#profileMasteryPanel .pm-title span{font-size:10px;color:#8595ab;text-transform:uppercase;letter-spacing:.1em}
      #profileMasteryPanel .pm-list{display:flex;flex-direction:column;gap:8px;margin-top:10px}.pm-row{display:grid;grid-template-columns:24px 46px minmax(0,1fr) 82px;gap:9px;align-items:center;padding:8px;border:1px solid #28374b;border-radius:11px;background:#101722}.pm-row>strong{color:#728199;text-align:center}.pm-hero{width:44px;height:44px;object-fit:cover;border-radius:8px;border:1px solid #46566d}.pm-row>span:nth-of-type(1){display:flex;flex-direction:column;gap:3px;min-width:0}.pm-row>span:nth-of-type(1)>b{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pm-row>span:nth-of-type(1)>small{font-size:9px;color:#a6b1c2}.pm-row i{display:block;height:5px;background:#293142;border-radius:99px;overflow:hidden}.pm-row i em{display:block;height:100%;background:linear-gradient(90deg,#627dff,#ca6cff);border-radius:99px}.pm-tier{position:relative;display:grid;justify-items:center}.pm-tier>img{width:40px;height:40px;object-fit:contain}.pm-tier>b{position:absolute;top:26px;left:50%;transform:translateX(-50%);min-width:16px;height:16px;padding:0 3px;display:grid;place-items:center;border-radius:99px;background:#090d13;border:1px solid #ffffffbd;font-size:8px}.pm-tier>small{margin-top:2px;font-size:7px;color:#8f9caf;white-space:nowrap}.pm-empty{padding:22px;text-align:center;color:#8391a5;border:1px dashed #304057;border-radius:10px}@media(max-width:600px){#profileMasteryPanel{margin-left:12px;margin-right:12px}.pm-row{grid-template-columns:20px 40px minmax(0,1fr) 64px}.pm-hero{width:38px;height:38px}.pm-tier>img{width:34px;height:34px}.pm-tier>b{top:22px}}
    `;
    document.head.append(css);(document.querySelector('main')||document.body).append(panel);
  }
  function connect() {
    if (leaving) return;
    socket = new WebSocket(`ws://${location.host}/_launcher/live?token=${encodeURIComponent(token)}`);
    socket.onopen = () => {label.textContent = '1.86.0 • Tinker';};
    socket.onclose = () => {
      if (leaving) return;
      label.textContent = 'Связь с запускателем потеряна';
      reconnect = setTimeout(connect, 1000);
    };
  }
  // pagehide handles both tab close and page navigation; a 15s server grace
  // permits reload/offline/join/profile navigation. A restored BFCache page reconnects.
  window.addEventListener('pagehide', () => {leaving = true;clearTimeout(reconnect);socket?.close();});
  window.addEventListener('pageshow', e => {if(e.persisted && token){leaving=false;connect();}});
  fetch('/_launcher/config',{cache:'no-store'}).then(r => {
    if(!r.ok) throw new Error('Legacy launcher');return r.json();
  }).then(config => {
    token=config.token;
    // Reserve room so the exit toolbar does not cover combat action buttons.
    const style=document.createElement('style');
    style.textContent='body{padding-bottom:64px}#game .action-panel{bottom:68px!important}';
    document.head.append(style);document.body.append(bar);renderProfileMasteryPanel();connect();
  }).catch(() => {
    if(WEB_STATIC){
      exit.style.display='none';
      label.textContent='1.86.94 • WEB';
      const style=document.createElement('style');style.textContent='body{padding-bottom:64px}#game .action-panel{bottom:68px!important}';document.head.append(style);
      if(!bar.isConnected)document.body.append(bar);
    }
  });
})();
