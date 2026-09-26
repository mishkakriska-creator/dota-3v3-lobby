// Gold and kills are match state. Notifications only display their immutable events.
function goldIcon(){return '<span class="gold-icon" aria-hidden="true"></span>'}
function canonicalHeroId(id){return id==='arcwarden_clone'?'arcwarden':id}
function miniHeroIcon(id){id=canonicalHeroId(id);if(id==='phantomlancer')return 'assets/turn_phantomlancer.webp';if(id==='arcwarden')return 'assets/turn_arcwarden_v167.png';if(id==='tinker')return 'assets/turn_tinker.png';if(id==='broodmother')return 'assets/turn_broodmother_mini.png';return `assets/turn_${id}.png`} 
function clearKillFeed(){document.getElementById('killFeed')?.remove()}
function showKillNotice(ev){
  const killerId=canonicalHeroId(ev.killerId),heroId=canonicalHeroId(ev.heroId);
  if(!DATA[killerId]||!DATA[heroId])return;
  let feed=document.getElementById('killFeed');
  if(!feed){feed=document.createElement('div');feed.id='killFeed';feed.setAttribute('role','log');feed.setAttribute('aria-live','polite');document.body.appendChild(feed)}
  const row=document.createElement('div');row.className=`kill-notice killer-team-${ev.killerTeam}`;
  row.setAttribute('aria-label',`${DATA[killerId].name} убивает ${DATA[heroId].name}. Игрок ${ev.killerTeam+1} получает ${ev.reward} золота.`);
  row.innerHTML=`<img class="kill-hero killer" src="${miniHeroIcon(killerId)}" title="${DATA[killerId].name}" alt="${DATA[killerId].name}"><svg class="kill-sword" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 25 25 3 27 12 12 27Z" fill="#edf4dc"/><path d="m6 19 10 8-3 3-10-8Z" fill="#b3baa6"/><path d="m7 25-4 5" stroke="#d4d9c6" stroke-width="4"/></svg><img class="kill-hero victim" src="${miniHeroIcon(heroId)}" title="${DATA[heroId].name}" alt="${DATA[heroId].name}"><strong>+${ev.reward}</strong>${goldIcon()}${ev.firstBlood?'<span class="kill-firstblood">FIRST BLOOD</span>':''}`;
  feed.appendChild(row);while(feed.children.length>4)feed.firstElementChild.remove();
  setTimeout(()=>{row.classList.add('leaving');setTimeout(()=>row.remove(),250)},5500);
}
function awardHeroKill(victim,killer){
  if(!G||!killer||killer.team===victim.team)return;
  ensureItemState();
  const streakBonus=2*(victim.kills||0);
  const isFirstBlood=!G.firstBloodDone;
  const reward=(isFirstBlood?6:4)+streakBonus;
  killer.kills=(killer.kills||0)+1;
  G.gold[killer.team]+=reward;
  if(isFirstBlood)G.firstBloodDone=true;
  const event={kind:'hero-kill',team:victim.team,heroId:victim.id,killerTeam:killer.team,killerId:killer.id,reward,firstBlood:isFirstBlood};
  showKillNotice(event);
  if(killer.id==='broodmother')window.playBroodKillVoice?.(killer);
  if(killer.id==='abaddon')window.playAbaddonKillVoice?.(victim,killer);
  window.emitNetVfx?.('hero-kill',victim,{killerTeam:killer.team,killerId:killer.id,reward,firstBlood:isFirstBlood});
  addLog(`${goldIcon()} ${killer.name} убивает ${victim.name}: +${reward} золота Игроку ${killer.team+1}${isFirstBlood?' • ПЕРВАЯ КРОВЬ!':''}${streakBonus?` • стрик-бонус +${streakBonus}`:''}.`);
}
