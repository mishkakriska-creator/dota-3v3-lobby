const CACHE='dota-cards-shell-v152';
const ASSET_CACHE='dota-cards-assets-persistent-v1';
const CORE=['./','./index.html','./style.css?v=18790','./chen.css?v=19429','./visual-fixes.css?v=19465','./enigma.css?v=19000','./arc-warden.css?v=19350','./game.js?v=19483','./combat-fx.js?v=18890','./necrophos.js?v=19446','./ancient-apparition.js?v=19462','./assets/ancient_apparition/ancient_apparition_icon_v2.png','./assets/ancient_apparition/hq_chunks/c00.txt','./assets/ancient_apparition/hq_chunks/c01.txt','./assets/ancient_apparition/hq_chunks/c02.txt','./assets/ancient_apparition/hq_chunks/c03.txt','./assets/ancient_apparition/hq_chunks/c04.txt','./assets/ancient_apparition/hq_chunks/c05.txt','./assets/ancient_apparition/hq_chunks/c06.txt','./assets/ancient_apparition/hq_chunks/c07.txt','./assets/ancient_apparition/hq_chunks/c08.txt','./assets/portraits/necrolyte_animated_hq.webm?v=1','./assets/turn_necrophos.png?v=1','./arc-warden.js?v=19424','./profile.js?v=19436','./enigma.js?v=19424','./chen.js?v=19435','./huskar.js?v=19720','./items-expansion.js?v=19460','./ancient-apparition.js?v=19400','./assets/items/spirit_vessel.png','./assets/items/blight_stone.png','./assets/items/hyperstone.png','./assets/items/moon_shard.png','./assets/items/ultimate_orb.png','./assets/items/armlet.png','./assets/audio/items/armlet_on.mp3','./network.js?v=19720','./preload.js?v=19560','./lifecycle.js?v=19453','./assets/audio/chen_audio_sprite.ogg?v=2','./assets/audio/necrophos_attack_launch.mp3','./assets/audio/necrophos_attack_impact.mp3','./assets/audio/necrophos_death_pulse.mp3','./assets/audio/necrophos_reapers_scythe.mp3','./assets/dota_app_icon.png','./assets/dota_app_icon_192.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  const legacy=(await caches.keys()).filter(k=>/^dota-cards-assets-v\d+$/.test(k));
  const dest=await caches.open(ASSET_CACHE);
  for(const name of legacy){
    try{
      const src=await caches.open(name);
      for(const req of await src.keys()){
        if(await dest.match(req,{ignoreSearch:true}))continue;
        const res=await src.match(req);
        if(res)await dest.put(req,res.clone());
      }
    }catch(_){}
  }
  for(const k of await caches.keys())if(k!==CACHE&&k!==ASSET_CACHE)await caches.delete(k);
  await self.clients.claim();
})())});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&u.pathname.includes('/assets/')){
    e.respondWith((async()=>{
      const c=await caches.open(ASSET_CACHE);
      const cached=await c.match(e.request,{ignoreSearch:true});
      const refresh=fetch(new Request(e.request,{cache:'no-cache'})).then(async r=>{
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