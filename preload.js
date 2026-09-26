// v0.90: only visual/critical assets block the lobby. Voice/SFX audio warms in the background.
(() => {
  const loader=document.getElementById('assetLoader'), bar=document.getElementById('assetLoaderBar'), text=document.getElementById('assetLoaderText');
  if(!loader)return;
  const critical=[
    'assets/ui/gold.png',
    'assets/mastery/bronze.png','assets/mastery/silver.png','assets/mastery/gold.png','assets/mastery/platinum.png','assets/mastery/master.png','assets/mastery/grandmaster.png',
    'assets/phantomlancer.png','assets/turn_phantomlancer.webp','assets/skills/phantomlancer1.png','assets/skills/phantomlancer2.png','assets/portraits/phantomlancer.webm','assets/portraits/phantomlancer_illusion.webm',
    'assets/items/satanic.png','assets/items/assault.png','assets/items/crystalys.png','assets/items/daedalus.png','assets/items/bloodthorn.png','assets/items/desolator.png','assets/items/monkey_king_bar.png','assets/items/radiance.png','assets/items/yasha.png','assets/items/sange_and_yasha.png','assets/items/yasha_and_kaya.png','assets/items/orchid.png','assets/items/heart_of_tarrasque.png','assets/items/sange.png','assets/items/morbid_mask.png','assets/items/talisman_of_evasion.png','assets/items/vladmir.png','assets/items/witch_blade.png','assets/items/parasma.png','assets/items/refresher.png','assets/items/dagon.png','assets/items/kaya.png','assets/items/kaya_and_sange.png','assets/shop_categories/weapons.png','assets/shop_categories/armor.png','assets/shop_categories/magic.png','assets/shop_categories/support.png','assets/shop_categories/misc.png',
    
    'assets/hero_portraits_v166/techies.png','assets/hero_portraits_v166/morphling.png','assets/hero_portraits_v166/bane.png','assets/hero_portraits_v166/silencer.png','assets/hero_portraits_v166/shadowfiend.png','assets/hero_portraits_v166/lifestealer.png',
    'assets/pudge.jpg','assets/pudge_icon.png','assets/turn_pudge.png','assets/skills/pudge_hook.png','assets/skills/pudge_rot.png','assets/skills/pudge_dismember.png','assets/portraits/pudge.webm',
    'assets/io.jpg','assets/io_icon.png','assets/tinker_draft.png','assets/tinker_icon.png','assets/turn_tinker.png',
    'assets/proximity_mine.png','assets/silence_overlay.png',
    'assets/skills/bane1.png','assets/skills/bane2.png','assets/skills/lifestealer1.png','assets/skills/lifestealer_rage.png','assets/skills/lifestealer2.png',
    'assets/skills/morphling1.png','assets/skills/morphling2.png','assets/skills/morphling3.png','assets/skills/shadowfiend1.png','assets/skills/shadowfiend2.png','assets/skills/shadowraze_status.png',
    'assets/skills/tinker_laser.png','assets/skills/tinker_missile.png','assets/skills/tinker_defense_matrix.png','assets/skills/tinker_rearm.png','assets/skills/silencer1.png','assets/skills/silencer2.png','assets/skills/techies1.png','assets/skills/techies2.png','assets/skills/io_tether.png','assets/skills/io_spirits.png','assets/skills/io_relocate.png','assets/skills/io_break_tether.png',
    'assets/turn_bane.png','assets/turn_tinker.png','assets/turn_lifestealer.png','assets/turn_morphling.png','assets/turn_shadowfiend.png','assets/turn_silencer.png','assets/turn_techies.png','assets/turn_io.png','assets/turn_broodmother_mini.png',
    'assets/enigma_portrait.png','assets/enigma_icon.png','assets/turn_enigma.png','assets/skills/enigma_midnight_pulse.png','assets/skills/enigma_black_hole.png',
    'assets/portraits/bane.webm','assets/portraits/tinker.webm','assets/portraits/lifestealer.webm','assets/portraits/morphling.webm','assets/portraits/shadowfiend.webm','assets/portraits/silencer.webm','assets/portraits/techies.webm','assets/portraits/io.webm',
    'assets/arcwarden.jpg','assets/arcwarden_icon.png','assets/arcwarden_clone_icon.png','assets/skills/arcwarden_spark.png','assets/skills/arcwarden_field.png','assets/skills/arcwarden_tempest.png','assets/portraits/arcwarden.webm','assets/portraits/arcwarden_clone.webm',
    'assets/abaddon_portrait.png','assets/abaddon_icon.png','assets/turn_abaddon.png','assets/portraits/abaddon.webm','assets/skills/abaddon_mist_coil.png','assets/skills/abaddon_aphotic_shield.png','assets/skills/abaddon_borrowed_time.png',
    'assets/axe.jpg','assets/axe_icon.png','assets/turn_axe.png','assets/skills/axe_call.png','assets/skills/axe_helix.png','assets/skills/axe_culling.png','assets/portraits/axe.webm'
  ];
  const lazy=[
    'assets/audio/phantomlancer_turn1.mp3','assets/audio/phantomlancer_turn2.mp3','assets/audio/phantomlancer_laugh.mp3','assets/audio/phantomlancer_attack.mp3','assets/audio/phantomlancer_lance.mp3','assets/audio/phantomlancer_spawn.mp3','assets/audio/phantomlancer_death.mp3',
    'assets/audio/background_music.mp3','assets/audio/bane_attack.mp3','assets/audio/bane_skill1.mp3','assets/audio/bane_skill2.mp3','assets/audio/bane_turn1.mp3','assets/audio/bane_turn2.mp3',
    'assets/audio/lifestealer_attack.mp3','assets/audio/lifestealer_skill2.mp3','assets/audio/lifestealer_turn1.mp3','assets/audio/lifestealer_turn2.mp3',
    'assets/audio/morphling_attack.mp3','assets/audio/morphling_skill1.mp3','assets/audio/morphling_skill2.mp3','assets/audio/morphling_skill3.mp3','assets/audio/morphling_turn1.mp3','assets/audio/morphling_turn2.mp3',
    'assets/audio/shadowfiend_attack.mp3','assets/audio/shadowfiend_raze_voice1.mp3','assets/audio/shadowfiend_raze_voice2.mp3','assets/audio/shadowfiend_skill1.mp3','assets/audio/shadowfiend_skill2.mp3','assets/audio/shadowfiend_turn1.mp3','assets/audio/shadowfiend_turn2.mp3',
    'assets/audio/silencer_attack.mp3','assets/audio/silencer_skill1.mp3','assets/audio/silencer_skill2.mp3','assets/audio/silencer_turn1.mp3','assets/audio/silencer_turn2.mp3',
    'assets/audio/techies_attack.mp3','assets/audio/techies_mine_approach.mp3','assets/audio/techies_mine_explode.mp3','assets/audio/techies_mine_place.mp3','assets/audio/techies_skill1.mp3','assets/audio/techies_skill2.mp3','assets/audio/techies_turn1.mp3','assets/audio/techies_turn2.mp3',
    'assets/audio/satanic.mp3','assets/audio/refresher_orb.mp3','assets/audio/items/guardian_greaves.mp3','assets/audio/items/pipe_of_insight.mp3','assets/audio/io_spawn.mp3','assets/audio/invoker_voice_cold_snap_1.mp3','assets/audio/invoker_voice_emp_1.mp3','assets/audio/invoker_voice_emp_2.mp3','assets/audio/invoker_voice_ice_wall_1.mp3','assets/audio/invoker_voice_ghost_walk_1.mp3','assets/audio/invoker_voice_ghost_walk_2.mp3','assets/audio/invoker_voice_tornado_1.mp3','assets/audio/invoker_voice_tornado_2.mp3','assets/audio/io_spirits_cast.mp3','assets/audio/io_spirit_hit.mp3','assets/audio/io_tether_break.mp3','assets/audio/io_tether_attach.mp3','assets/audio/io_attack_pre.mp3','assets/audio/io_attack_launch.mp3','assets/audio/io_attack_impact.mp3',
    'assets/audio/enigma_move_13_ru.mp3','assets/audio/enigma_spawn_06_ru.mp3','assets/audio/enigma_midnight_pulse_cast.mp3','assets/audio/enigma_black_hole_cast.mp3','assets/audio/enigma_kill_01_ru.mp3','assets/audio/enigma_kill_05_ru.mp3','assets/audio/enigma_kill_09_ru.mp3','assets/audio/enigma_rival_14_ru.mp3','assets/audio/enigma_rival_15_ru.mp3','assets/audio/enigma_rival_16_ru.mp3','assets/audio/enigma_rival_17_ru.mp3','assets/audio/enigma_killspecial_01_ru.mp3',
    'assets/audio/pudge_attack_combo.mp3','assets/audio/pudge_meat_hook.mp3','assets/audio/pudge_rot_loop.mp3','assets/audio/pudge_dismember.mp3','assets/audio/pudge_spawn_01.mp3','assets/audio/pudge_spawn_06.mp3','assets/audio/pudge_battlebegins_01.mp3','assets/audio/pudge_voice_hook_01.mp3','assets/audio/pudge_voice_hook_02.mp3','assets/audio/pudge_voice_hook_10.mp3','assets/audio/pudge_voice_rot_07.mp3','assets/audio/pudge_voice_rot_10.mp3','assets/audio/pudge_voice_dismember_02.mp3','assets/audio/pudge_voice_dismember_03.mp3','assets/audio/pudge_voice_dismember_12.mp3','assets/audio/pudge_kill_07.mp3','assets/audio/pudge_laugh_05.mp3','assets/audio/pudge_rival_silencer_12.mp3','assets/audio/pudge_item_heart_04.mp3','assets/audio/abaddon_attack_combo.mp3','assets/audio/abaddon_turn_levelup_01.mp3','assets/audio/abaddon_turn_spawn_02.mp3','assets/audio/mist_coil_cast.mp3','assets/audio/aphotic_shield_cast.mp3','assets/audio/borrowed_time_cast.mp3','assets/audio/abaddon_voice_mist_coil_02.mp3','assets/audio/abaddon_voice_mist_coil_06.mp3','assets/audio/abaddon_voice_aphotic_shield_01.mp3','assets/audio/abaddon_voice_aphotic_shield_05.mp3','assets/audio/abaddon_voice_borrowed_time_02.mp3','assets/audio/abaddon_voice_borrowed_time_07.mp3','assets/audio/abaddon_kill_06.mp3','assets/audio/abaddon_kill_09.mp3','assets/audio/abaddon_rival_bane_12.mp3','assets/audio/abaddon_rival_axe_14.mp3','assets/audio/abaddon_rival_silencer_09.mp3','assets/audio/tinker_defense_matrix.mp3','assets/audio/lifestealer_rage.mp3','assets/audio/tinker_spawn_01.mp3','assets/audio/tinker_spawn_04.mp3','assets/audio/tinker_voice_laser_01.mp3','assets/audio/tinker_voice_laser_04.mp3','assets/audio/tinker_voice_missile_01.mp3','assets/audio/tinker_voice_missile_05.mp3','assets/audio/tinker_voice_rearm_01.mp3','assets/audio/tinker_voice_rearm_09.mp3','assets/audio/tinker_laser.mp3','assets/audio/tinker_heat_missile.mp3','assets/audio/tinker_heat_missile_target.mp3','assets/audio/tinker_rearm_fx.mp3','assets/audio/tinker_kill_11.mp3','assets/audio/axe_preattack1.mp3','assets/audio/axe_attack1.mp3','assets/audio/axe_berserkers_call.mp3','assets/audio/axe_counter_helix.mp3','assets/audio/axe_culling_blade.mp3','assets/audio/axe_culling_blade_fail.mp3','assets/audio/axe_turn1.mp3','assets/audio/axe_turn2.mp3','assets/audio/axe_berserk_voice1.mp3','assets/audio/axe_berserk_voice2.mp3','assets/audio/axe_kill_07.mp3','assets/audio/axe_kill_01.mp3','assets/audio/axe_deny_15.mp3','assets/audio/mars_attack_combo.mp3','assets/audio/mars_spear_cast.mp3','assets/audio/mars_spear_target.mp3','assets/audio/mars_rebuke.mp3','assets/audio/mars_arena_combo.mp3','assets/audio/mars_wall_hit.mp3','assets/audio/mars_turn_01.mp3','assets/audio/mars_turn_02.mp3','assets/audio/mars_turn_03.mp3','assets/audio/mars_voice_spear_01.mp3','assets/audio/mars_voice_spear_02.mp3','assets/audio/mars_voice_rebuke_01.mp3','assets/audio/mars_voice_rebuke_02.mp3','assets/audio/mars_voice_arena_06.mp3','assets/audio/mars_voice_arena_09.mp3','assets/audio/mars_kill_01.mp3','assets/audio/mars_kill_12.mp3','assets/audio/mars_rival_abaddon.mp3','assets/audio/mars_rival_arcwarden.mp3','assets/audio/mars_rival_axe.mp3','assets/audio/mars_rival_bane.mp3','assets/audio/mars_rival_lifestealer.mp3','assets/audio/enigma_attack_pre.mp3','assets/audio/enigma_attack_launch.mp3','assets/audio/enigma_attack_impact.mp3'
  ];
  let done=0;
  const update=()=>{const pct=Math.round(done/critical.length*100);bar.style.width=pct+'%';text.textContent=`Подготавливаю графику… ${pct}% (${done}/${critical.length})`};
  async function warm(url){try{const r=await fetch(url,{cache:'force-cache'});if(r.ok)await r.blob()}catch(_){} }
  function startBackgroundGameWarm(){
    if(typeof window.DotaWarmAllGameAssets!=='function')return;
    let st=document.getElementById('assetWarmStatus');
    if(!st){
      st=document.createElement('div');st.id='assetWarmStatus';
      st.style.cssText='position:fixed;right:14px;bottom:58px;z-index:9998;min-width:210px;padding:9px 11px;border:1px solid #35445b;border-radius:10px;background:#0d131df2;color:#dfe8f6;font:600 11px Segoe UI,Arial,sans-serif;box-shadow:0 8px 28px #0008;pointer-events:none';
      st.innerHTML='<span>Ресурсы матча: 0%</span><i style="display:block;height:4px;margin-top:6px;border-radius:99px;background:#283247;overflow:hidden"><b style="display:block;height:100%;width:0;background:#7aa2ff;border-radius:inherit"></b></i>';
      document.body.appendChild(st);
    }
    const label=st.querySelector('span'),fill=st.querySelector('b');
    window.DotaWarmAllGameAssets((pct)=>{
      if(!st.isConnected)return;
      label.textContent='Ресурсы матча: '+pct+'%';fill.style.width=pct+'%';
    }).then(()=>{
      if(!st.isConnected)return;
      label.textContent='Ресурсы матча готовы';fill.style.width='100%';
      setTimeout(()=>st.remove(),1400);
    }).catch(()=>st.remove());
  }
  async function run(){
    const q=[...critical];const workers=Array.from({length:10},async()=>{while(q.length){await warm(q.shift());done++;update()}});await Promise.all(workers);
    text.textContent='Готово';bar.style.width='100%';
    setTimeout(()=>loader.classList.add('asset-loader-done'),100);
    setTimeout(()=>{loader.remove();startBackgroundGameWarm()},380);
  }
  update();run();
})();
