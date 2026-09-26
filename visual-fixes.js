// v1.59: media nodes survive renders; only actual line changes animate.
(()=>{
 const game=document.getElementById('game'),shops=document.createElement('div');shops.className='shop-docks';game.prepend(shops);for(const id of ['shop0','shop1'])shops.appendChild(document.getElementById(id));
 const oldEnsure=ensureHeroNode;ensureHeroNode=function(h){const d=oldEnsure(h),p=d.querySelector('.hero-portrait');if(!p.querySelector('.portrait-statuses')){const s=document.createElement('div');s.className='portrait-statuses';for(const sel of ['.silence-overlay','.sticky-bomb-overlay','.item-debuff-overlay','.sf-mark-overlay','.sf-presence-overlay','.tether-status-overlay','.invoker-effect-overlays']){const e=p.querySelector(sel);if(e)s.appendChild(e)}if(h.id==='axe'){p.querySelector('.axe-call-aura img')?.remove();const icon=document.createElement('img');icon.className='axe-call-token';icon.src='assets/skills/axe_call.png';icon.title="Berserker's Call: +3 брони и перенаправление атак";s.appendChild(icon)}p.appendChild(s)}return d};
 const previous=renderTeam,layouts=new WeakMap(),moves=new WeakMap();renderTeam=function(t,sel){const box=document.querySelector(sel),key=G.matchId+':'+currentLineOrder(t).map(h=>h.id).join(','),changed=layouts.get(box)!==key,before=changed?new Map([...box.children].map(e=>[e,e.getBoundingClientRect()])):null;
 const ids=new Set(G.teams[t].map(h=>`hero-${t}-${h.id}`));for(const e of [...box.children])if(!ids.has(e.id)){e.querySelectorAll('video').forEach(v=>{v.onpause=null;v.pause()});e.remove()}box.classList.toggle('has-four',G.teams[t].length>=4);previous(t,sel);
 if(changed){const nodes=[...box.children];nodes.forEach(n=>moves.get(n)?.cancel());const after=new Map(nodes.map(n=>[n,n.getBoundingClientRect()]));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)for(const n of nodes){const a=before.get(n),b=after.get(n);if(!a||n.classList.contains('dead'))continue;const x=a.left-b.left,y=a.top-b.top;if(Math.abs(x)+Math.abs(y)>1)moves.set(n,n.animate([{translate:`${x}px ${y}px`},{translate:'0px 0px'}],{duration:280,easing:'cubic-bezier(.22,.75,.25,1)'}))}layouts.set(box,key)}
 };
})();


// WEB MOBILE: iOS/PWA may suspend autoplaying WebM portraits while the app is backgrounded.
// Explicitly revive all in-game video media when the page becomes active again.
(()=>{
  let reviveTimer=0;
  function reviveGameVideos(){
    clearTimeout(reviveTimer);
    const run=()=>{
      document.querySelectorAll('#game video').forEach(v=>{
        if(!v.isConnected)return;
        try{
          v.muted=true;v.defaultMuted=true;v.playsInline=true;v.autoplay=true;v.loop=true;
          if(v.readyState===0||v.networkState===3)v.load();
          const p=v.play();if(p&&typeof p.catch==='function')p.catch(()=>{});
        }catch(_){}
      });
    };
    run();
    requestAnimationFrame(run);
    [90,320,900].forEach(ms=>setTimeout(run,ms));
    reviveTimer=setTimeout(run,1500);
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)reviveGameVideos()});
  window.addEventListener('pageshow',reviveGameVideos);
  window.addEventListener('focus',reviveGameVideos);
  window.addEventListener('orientationchange',()=>setTimeout(reviveGameVideos,120));
  window.reviveDotaPortraitVideos=reviveGameVideos;
})();
