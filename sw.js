const CACHE='dota-cards-shell-v7';
const CORE=['./','./index.html','./style.css?v=18790','./visual-fixes.css?v=18880','./game.js?v=18850','./profile.js?v=18820','./network.js?v=18790','./lifecycle.js?v=18820','./assets/dota_app_icon.png','./assets/dota_app_icon_192.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request);const c=await caches.open(CACHE);if(new URL(e.request.url).origin===location.origin)c.put(e.request,r.clone()).catch(()=>{});return r}catch{return (await caches.match(e.request))||Response.error()}})())});
