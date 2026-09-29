const CACHE='dota-cards-shell-v117';
const ASSET_CACHE='dota-cards-assets-v3';
const CORE=['./','./index.html','./style.css?v=18790','./chen.css?v=19429','./visual-fixes.css?v=19461','./enigma.css?v=19000','./arc-warden.css?v=19350','./game.js?v=19473','./combat-fx.js?v=18890','./necrophos.js?v=19444','./assets/portraits/necrolyte_animated_hq.webm?v=1','./assets/turn_necrophos.png?v=1','./arc-warden.js?v=19422','./profile.js?v=19422','./enigma.js?v=19421','./chen.js?v=19433','./items-expansion.js?v=19445','./assets/items/spirit_vessel.png','./assets/items/blight_stone.png','./assets/items/hyperstone.png','./assets/items/moon_shard.png','./assets/items/ultimate_orb.png','./assets/items/armlet.png','./assets/audio/items/armlet_on.mp3','./network.js?v=19477','./preload.js?v=19023','./lifecycle.js?v=19451','./assets/audio/chen_audio_sprite.ogg?v=2','./assets/audio/necrophos_attack_launch.mp3','./assets/audio/necrophos_attack_impact.mp3','./assets/audio/necrophos_death_pulse.mp3','./assets/audio/necrophos_reapers_scythe.mp3','./assets/dota_app_icon.png','./assets/dota_app_icon_192.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE&&k!==ASSET_CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&u.pathname.includes('/assets/')){
    e.respondWith((async()=>{
      const c=await caches.open(ASSET_CACHE);
      const cached=await c.match(e.request,{ignoreSearch:true});
      const refresh=fetch(new Request(e.request,{cache:'no-store'})).then(async r=>{
        if(r&&r.ok)await c.put(e.request,r.clone()).catch(()=>{});
        return r;
      }).catch(()=>null);
      if(cached){
        e.waitUntil(refresh.then(()=>{}));
        return cached;
      }
      return (await refresh)||Response.error();
    })());
    return;
  }
  e.respondWith((async()=>{try{const fresh=new Request(e.request,{cache:'no-store'});const r=await fetch(fresh);const c=await caches.open(CACHE);if(u.origin===location.origin)c.put(e.request,r.clone()).catch(()=>{});return r}catch{return (await caches.match(e.request))||Response.error()}})());
});