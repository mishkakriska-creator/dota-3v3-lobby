(()=>{
 const q=window.__meepoHQ;
 if(!q||!q.attack||!q.poof)return;
 const attack='data:audio/ogg;base64,'+q.attack;
 const poof='data:audio/ogg;base64,'+q.poof;
 if(window.MeepoMedia){window.MeepoMedia.attack=attack;window.MeepoMedia.poof=poof}
 window.playMeepoPoof=()=>{try{const a=new Audio(poof);a.volume=1;a.play().catch(()=>{})}catch(_){}};
 const old=window.playAttackSound;
 if(typeof old==='function'){
   window.playAttackSound=function(h){
     if(h?.id==='meepo'){
       try{const a=new Audio(attack);a.volume=1;a.play().catch(()=>{})}catch(_){}
       return;
     }
     return old.apply(this,arguments);
   };
 }
})();