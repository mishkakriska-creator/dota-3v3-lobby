window.TINKER_MINI_ICON_DATA='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF8ElEQVR4AcRWaWxUVRT+3pvOlE5Xi8WymgrUFiGCDUsqW4QCQUJTExNUCDFIZAkBUSSA+EOj0AAGIYag4hJCAFFRwQjEYluWggTKYgvUAm1p7UIXYUqXaec973emM3ntdAKIiS/33O8s3/nu6e20b3T8z89/MYD5MD/DwwzAg81VS6bxfPHpPKj9mwHksMUzUrAtozdSQqsFGQOQmsL7Xg8ygIjPmjkOqzOGYdDfV9Do9iizKfNIzDzreIBB7ncAc8XcqXh79rMYGFKDvs2l0Ow26BGRcLS5BRkzzzp55HcMoiD40oOX/BVzxsRRuF1dijtlZYhvqUOIpsPWbkBzNSHMaBVkzDzr5JHPPqXCm1PQ/brXAOa89OEIbajCuNh2DIloUwe2QWtth91hg8NwI6TxjiBj5sOMNuGRzz72w/srURC4uhvAVDSx6cmDUVl0F2drXNidr+HQjUiEh0XDEeZUnzYDdsOAzR4haMKQPOvkkc8+9lPHp9mBCryr6wDmlJmT8fKsqSCS8kG6E/vnDgCRtvNKKNxmuyrpMEwdIT0iBQFd8qyTR/P1QT3UpHXomiolq+sAkqxt8ghS5P3UDbAacz/c6IlW9dMbugGP7REQGTPPupVPnzlq0kTYsgUMcLXWDVrmkFtycP6kNFht1Zyv5TaOVMXDaNfQrjkEGfMgHmjl02cP9ahLs5yv7s0aBfETnQaedPpvzc9yGxrQWgtBf9brkE/zRsH3gBvoSqWIBk3S9MXp2EIcdjh69ACxIyVg5SV4GiQXbLvnACi8CKs5r9X4taJDPLA5NBD9STqWHsfNMmaCWtABRqy/gLUnV0hjvfoTKwmLQnNbm+Q25g3DqOmzoYeGoaf9tiBj5tlDHvnsg3rW7ZwL6ik3YAUM0MdsE9LjqeOlic3bd76K3Z9mYPOe17DmxyY090vAuNHz8IVrOj4uHC3ImHnWySOffezn4dSjsE+fPk3nZjEtLy8PpSdzxZhffFzD5luvYGtZOl460h9NAyeiX2wP/HpmH9bOfwdzZr8ryJh51skjn33sp45Pk/oq9n6olNN1AJWCFMcO60cfveNSkfxEEhKfSkF0zAA0N9lxuqACfHjo4dPbQVy34Q1s2boG2Qc/Ex757GM/uT495Yu+QlndDSAF31ZaU4W9B3ag7lYtPlyw2m+TR74I2tTRrwtmfVOOEWPSpS2uZAcKC87iyz2bwH5JBtmCDnD8UjkWvnUQMbGJGDN2Pk4Unkedq7mTzK5Dn2Pv4R0gsrBx+SdYsugjHLzeivpTmbh6KQe6LYolUE8cqNdIh0MIOgAPryzLAWxeSlhYOLJOHUHWuTM4duEY3vtqPQpKanC5vEGQMfORUQl4IWOlDLF5YgT61h3jOTj95lAxCSybV92SUK7JwxXC1KIxeFAqqiquwKnegPlF55F7LhsHco/isbgEJCUOxtDkZEHGzLNeXl+P8VMWYFl2IybEVWPbpEj8fq5UjLpW624Aqd8p2Yc+/YejuCgXdrsOTb37U0amqy8jHiQlPQOnHbDrIWhpbRVkzHyI5gF5MTGPIu355TKE75+44XPkBO+me6HTrm3bOANN5qOStGkaPJ529B0wBteKTkC5MDxu1Lvq4QwPxfXiC4KMmWedPPKjYuIxLX0llmS3YGlOE5Zmu6ipcfOZ7nO64v7vNuFqSTHCI/qobz9eWmzPOHhMTW6kpbEFuUf3o+KvPwUZ86ZYJ496docu/RMyNsAwPEwFmFc5IA08NyQeR79dhsLyu+jV62m47xaj6NLPcLmuITwyAQ0NN3D+7C8oLsgVZMw86+SRzz72U4d63RwT/HWsq6tPGz4Ql3NWY0tmGkoqKmF66jF2wiLUVt7EmZPfU4/XKcaYedbJI5997KcO9djQ1YLegEfJVjf28vG1rJ8ykZ+fL/G+XQuJikHwm9aRFx75qiIc6lBPxQEr6AC//VGJi8V51gaKyQdUJekrCFjWup9DHeoFsFUi2ABstpqi+hfz/qAbp2udsdU6tQQboBPpYYJ79f4DAAD//3syNucAAAAGSURBVAMAfV7DX1IW2H0AAAAASUVORK5CYII=';
const DATA={
 techies:{name:'TECHIES',hp:7,atk:2,img:'assets/hero_portraits_v166/techies.png',skills:[
  {id:'bomb',name:'Sticky Bomb',cd:3,desc:'Techies прикрепляет к переднему врагу липкую бомбу. Через 1 общий ход она взрывается и наносит 2 урона. Перезарядка: 3 хода Techies.'},
  {id:'mine',name:'Proximity Mines',cd:2,desc:'Techies устанавливает мину перед вражеской линией. В начале следующего хода этой команды мина взрывается и наносит 4 урона герою, который в этот момент стоит впереди. Перезарядка: 2 хода Techies.'}]},
 morphling:{name:'MORPHLING',hp:7,atk:1,img:'assets/hero_portraits_v166/morphling.png',skills:[
  {id:'agi',name:'Attribute Shift (урон)',cd:0,desc:'Morphling переносит 1 очко из здоровья в урон: получает +1 к урону, теряет 1 максимального и текущего здоровья и получает +30% к шансу дополнительной тычки без траты действия. Шанс может превышать 100%: каждые полные 100% гарантируют ещё одну тычку, остаток проверяется на следующую. Без перезарядки.'},
  {id:'str',name:'Attribute Shift (здоровье)',cd:0,desc:'Morphling переносит 1 очко урона в здоровье: получает +1 максимального и текущего здоровья, теряет 1 урон и уменьшает шанс дополнительной тычки на 30% (не ниже 0%). Нельзя использовать при 0 урона; максимум — 9 HP. Без перезарядки.'},
  {id:'morph',name:'Morph',cd:2,desc:'Morphling принимает форму выбранного переднего противника и наносит именно обычную тычку с текущим уроном цели. Это считается атакой: работают атакующие эффекты Morphling и базовые пассивные модификаторы атаки скопированного героя. Последняя способность героя (2-я при двух способностях, 3-я при трёх и т.д.) не копируется. Перезарядка: 2 хода Morphling.'}]},
 bane:{name:'BANE',hp:6,atk:1,img:'assets/hero_portraits_v166/bane.png',skills:[
  {id:'sleep',name:'Nightmare',cd:2,desc:'Bane погружает переднего врага в сон. Цель пропускает свою следующую активацию и после неё остаётся во сне до начала своей следующей активации. Пока цель спит, обычной атакой её может бить только сам Bane; его союзники не могут. Способностями цель выбирать можно. Перезарядка: 2 хода Bane.'},
  {id:'grip',name:"Fiend's Grip",cd:5,desc:'Bane хватает переднего врага: наносит 2 урона и оглушает его на 2 его активации. Перезарядка: 5 ходов Bane.'}]},
 silencer:{name:'SILENCER',hp:6,atk:2,img:'assets/hero_portraits_v166/silencer.png',skills:[
  {id:'silence',name:'Last Word',cd:2,desc:'Silencer накладывает безмолвие на переднего врага. Во время следующей активации цель не может использовать способности, но продолжает нормально двигаться в линии. Перезарядка: 2 хода Silencer.'},
  {id:'global',name:'Global Silence',cd:3,desc:'Накладывает безмолвие на всю вражескую команду. Используется в любой ход своей команды, пока Silencer жив; тратит 1 действие Silencer. Перезарядка: 3 хода Silencer.'}]},
 shadowfiend:{name:'SHADOW FIEND',hp:8,atk:1,img:'assets/hero_portraits_v166/shadowfiend.png',skills:[
  {id:'raze_near',name:'Shadowraze (ближний)',cd:1,desc:'Автоматически поражает переднего врага: наносит 1 урон +1 за каждый уже наложенный на него стак Shadowraze, затем добавляет новый стак. Перезарядка: 1 ход Shadow Fiend.'},
  {id:'raze_mid',name:'Shadowraze (средний)',cd:1,desc:'Автоматически поражает среднего врага: наносит 1 урон +1 за каждый уже наложенный на него стак Shadowraze, затем добавляет новый стак. Если в линии осталось только 2 врага, бьёт дальнюю цель. Перезарядка: 1 ход Shadow Fiend.'},
  {id:'raze_far',name:'Shadowraze (дальний)',cd:1,desc:'Автоматически поражает самого дальнего врага: наносит 1 урон +1 за каждый уже наложенный на него стак Shadowraze, затем добавляет новый стак. Перезарядка: 1 ход Shadow Fiend.'},
  {id:'presence',name:'Presence of the Dark Lord — ПАССИВНАЯ',cd:0,passive:true,desc:'ПАССИВНАЯ. Shadow Fiend снижает броню на 1 врагам, которые стоят перед ним во вражеской линии. Если Shadow Fiend стоит первым у себя, аура задевает переднего и второго врага; если вторым — только переднего; если третьим — не задевает никого.'},
  {id:'souls',name:'Requiem of Souls',cd:2,desc:'Shadow Fiend высвобождает души: наносит переднему врагу 3 урона, +1 за каждого героя, ранее убитого Shadow Fiend, и отбрасывает цель ровно на 1 позицию назад. Перезарядка: 2 хода Shadow Fiend.'}]},
 lifestealer:{name:'LIFESTEALER',hp:8,atk:2,img:'assets/hero_portraits_v166/lifestealer.png',skills:[
  {id:'lifesteal',name:'Feast — ПАССИВНАЯ',cd:0,passive:true,desc:'ПАССИВНАЯ. После каждой обычной атаки Lifestealer восстанавливает себе 1 здоровье, но не выше своего максимума.'},
  {id:'rage',name:'Rage',cd:4,desc:'Lifestealer применяет на себя нормальное развеивание и получает невосприимчивость к эффектам на 6 общих ходов. Пока Rage активен, Lifestealer получает 100% сопротивления магии: весь магический урон полностью блокируется. Чистый урон проходит полностью. Fiend’s Grip и Global Silence проходят сквозь невосприимчивость. Перезарядка: 4 хода Lifestealer.'},
  {id:'infest',name:'Infest',cd:3,desc:'Lifestealer вселяется в выбранного союзника и восстанавливает 2 здоровья. Пока он внутри, его нельзя выбрать целью и он не получает урон. Через 1 ход команды выходит и становится сразу позади носителя. Перезарядка: 3 хода Lifestealer.'}]},
 io:{name:'IO',hp:7,atk:1,img:'assets/io.jpg',skills:[
  {id:'tether',name:'Tether',cd:0,desc:'Io привязывается к выбранному союзнику. Пока связь активна, в начале каждого общего хода союзник восстанавливает 1 здоровье. Любое лечение, которое получает Io, дополнительно передаётся привязанному союзнику. Если связь уже активна, способность превращается в Break Tether и мгновенно разрывает связь без траты действия.'},
  {id:'spirits',name:'Spirits',cd:2,desc:'Если шариков нет, Io призывает 2 Spirits, каждый на 6 общих ходов. Если уже есть хотя бы 1 шарик, повторный каст доводит их количество до 3; старые шарики сохраняют свой оставшийся срок, а новые получают собственные 6 ходов. Если Io стоит впереди линии, один шар сразу наносит переднему врагу 1 урон и взрывается. Перезарядка: 2 хода Io.'},
  {id:'relocate',name:'Relocate',cd:3,desc:'Io меняется местами с союзником, связанным Tether. Союзник занимает текущую позицию Io, а Io переносится на прежнее место союзника. Текущая активация Io сразу заканчивается; в следующий ход этой команды активируется именно перенесённый союзник. Перезарядка: 3 хода Io.'}] },
 tinker:{name:'TINKER',hp:6,atk:1,img:'assets/tinker_draft.png',skills:[
  {id:'laser',name:'Laser',cd:2,desc:'Tinker стреляет лазером в выбранного врага, наносит 2 чистого урона и ослепляет его на 3 общих хода. Пока длится ослепление, цель имеет 100% шанс промаха. Перезарядка: 2 хода Tinker.'},
  {id:'missile',name:'Heat-Seeking Missile',cd:2,desc:'Tinker выпускает две ракеты: одну в выбранную цель, вторую — в случайного врага. Каждая ракета наносит 1 магический урон. Если вражеский герой остался один, обе ракеты летят в него. Перезарядка: 2 хода Tinker.'},
  {id:'matrix',name:'Defense Matrix',cd:2,desc:'Tinker накладывает на себя щит на 1 урон на 6 общих ходов: следующий входящий урон уменьшается на 1, после чего щит ломается. Когда щит ломается, на 2 общих хода активируется бонус действий: если Tinker успевает получить ход до окончания таймера, у него будет 3 действия вместо 2. Перезарядка: 2 хода Tinker.'},
  {id:'rearm',name:'Rearm',cd:0,desc:'Tinker сбрасывает перезарядки всех своих способностей и предметов. Не тратит действие и обновляет сам себя.'}]},
 axe:{name:'AXE',hp:8,atk:1,img:'assets/axe.jpg',skills:[
  {id:'call',name:"Berserker's Call",cd:3,desc:'Axe получает +3 брони и на 3 общих хода вынуждает врагов при их активации бесплатно ударять его с руки, где бы он ни стоял. Такая вынужденная атака не тратит действие. Перезарядка: 3 хода Axe.'},
  {id:'helix',name:'Counter Helix — ПАССИВНАЯ',cd:0,passive:true,desc:'После каждого 2-го полученного удара с руки Axe мгновенно прокручивается и наносит 2 чистого урона тому, кто нанёс второй удар.'},
  {id:'culling',name:'Culling Blade',cd:4,desc:'Разрубает выбранного врага на 2 чистого урона. Убивает сквозь невосприимчивость к эффектам, уклонение и Borrowed Time Abaddon. За каждое убийство этим навыком Axe получает +2 брони до конца матча. Если цель не убита — перезарядка 4 хода Axe; если убита — перезарядки нет.'}]},
 invoker:{name:'INVOKER',hp:7,atk:1,img:'assets/invoker.jpg',skills:[
  {id:'invoke',name:'Invoke',cd:0,desc:'Открывает мини-игру Invoke. Сначала появляется экран подготовки; 3-секундный отсчёт начинается только после кнопки «Начать колдовать». Каждая тройка Q/W/E создаёт заклинание, порядок сфер не важен. После мини-игры число действий Invoker равно числу собранных заклинаний.'},
  {id:'coldsnap',name:'Cold Snap',cd:1,invokerSpell:true,desc:'QQQ. Накладывает на выбранного врага Cold Snap на 3 общих хода. Каждый отдельный тик урона по цели дополнительно наносит 0.25 урона.'},
  {id:'emp',name:'E.M.P',cd:2,invokerSpell:true,desc:'WWW. После короткой задержки наносит выбранному врагу 0.5 урона и продлевает уже идущие перезарядки его способностей на 1 ход этого героя.'},
  {id:'sunstrike',name:'Sun Strike',cd:2,invokerSpell:true,desc:'EEE. Наносит 1 урон любому герою в линии соперника. Если цель в Tornado, опускает её и наносит на 1 урон больше.'},
  {id:'forge',name:'Forge Spirit',cd:3,invokerSpell:true,desc:'EEQ. Призывает рядом с карточкой Invoker отдельного Forge Spirit на 4 общих хода: 4 HP и 1 урон. Дух не получает собственного хода и не меняет очередь, но враги могут выбирать его целью. В ход Invoker дух может ударить выбранную цель на 1 и снизить её броню на 1.'},
  {id:'icewall',name:'Ice Wall',cd:1,invokerSpell:true,desc:'QQE. Создаёт небольшую ледяную стену, обмораживает выбранного врага, оглушает его на 1 ход и наносит 0.5 урона.'},
  {id:'ghostwalk',name:'Ghost Walk',cd:4,invokerSpell:true,desc:'QQW. Делает Invoker невидимым на 6 общих ходов. В невидимости его нельзя выбрать целью; за каждые 3 общих хода восстанавливает 1 HP.'},
  {id:'meteor',name:'Chaos Meteor',cd:2,invokerSpell:true,desc:'EEW. Наносит цели 2 урона и накладывает горение на всю вражескую команду: 0.25 урона в каждый общий ход. Если цель в Tornado, опускает её и наносит на 1 урон больше.'},
  {id:'tornado',name:'Tornado',cd:2,invokerSpell:true,desc:'WWQ. Поднимает выбранного врага в воздух на 1 общий ход. Если за это время применить Sun Strike или Chaos Meteor, цель опустится и получит от них на 1 урон больше; иначе при приземлении получает 0.5 урона.'},
  {id:'deafblast',name:'Deafening Blast',cd:2,invokerSpell:true,desc:'QWE. Наносит 1 урон, отбрасывает выбранного врага назад в линии на 1 позицию и обезоруживает его на 3 общих хода.'},
  {id:'alacrity',name:'Alacrity',cd:3,invokerSpell:true,desc:'WWE. Даёт выбранному герою +1 к урону на 6 общих ходов.'}
 ]}
};

DATA.broodmother={name:'BROODMOTHER',hp:8,atk:1,img:'assets/hero_portraits_v166/broodmother.png',skills:[
 {id:'hunger',name:'Insatiable Hunger',cd:2,desc:'Broodmother на 4 общих хода получает +1 к урону обычных атак и 100% вампиризм. Наличие паучков не отключает вампиризм: сама Broodmother лечится только от своей атаки, а паучки во время Hunger получают +0.5 урона и хилят только себя от своей тычки. Перезарядка: 2 хода Broodmother.'},
 {id:'bite',name:'Incapacitating Bite — ПАССИВНАЯ',cd:0,passive:true,desc:'ПАССИВНАЯ. Когда Broodmother попадает обычной атакой по герою, цель получает 1 стак ослепления на 6 общих ходов. Каждый стак даёт 10% шанса промаха, максимум 60%.'},
 {id:'spiderlings',name:'Spawn Spiderlings',cd:3,desc:'Broodmother бросает кокон в переднего врага, наносит 1 урон и через 1 свой ход получает 2 паучков. У каждого паучка 2 HP. Паучки живут 6 общих ходов, принимают урон вместо Broodmother и при её обычной атаке автоматически кусают ту же цель, не тратя действие. Перезарядка: 3 хода Broodmother.'}]};

DATA.arcwarden={name:'ARC WARDEN',hp:7,atk:1,img:'assets/arcwarden.jpg',skills:[
 {id:'spark',name:'Spark Wraith',cd:1,desc:'Выберите переднего врага. Arc Warden сразу выпускает Spark Wraith: после короткой задержки цель получает 2 урона. Если способность использует Tempest Double, призрак сработает только в следующий ход этой команды, но нанесёт 3 урона. Перезарядка: 1 ход героя.'},
 {id:'field',name:'Magnetic Field',cd:2,desc:'Создаёт купол на передней позиции своей команды. Пока Magnetic Field активен, герой, стоящий впереди, получает 100% уклонения от обычных атак. Эффект держится 2 хода команды. Перезарядка: 2 хода героя.'},
 {id:'tempest',name:'Tempest Double',cd:3,desc:'Призывает Tempest Double позади Arc Warden. В следующий ход команды активируется именно двойник. У него собственные перезарядки способностей и предметов. Tempest Double живёт 4 хода команды. Перезарядка: 3 хода Arc Warden.'}
]};

DATA.abaddon={name:'ABADDON',hp:7,atk:1,img:'assets/abaddon_portrait.png',skills:[
 {id:'mist_coil',name:'Mist Coil',cd:3,desc:'Abaddon ценой собственного здоровья выпускает сгусток тумана. По союзнику: лечит на 2 HP и наносит самому Abaddon 1 урон. По врагу: наносит 2 магического урона и наносит самому Abaddon 1 урон. Перезарядка: 3 хода Abaddon.'},
 {id:'aphotic_shield',name:'Aphotic Shield',cd:3,desc:'Даёт выбранному союзнику универсальный щит на 2 урона и накладывает сильное развеивание. Когда щит ломают, он взрывается и наносит 1 урон тому, кто его сломал. Перезарядка: 3 хода Abaddon.'},
 {id:'borrowed',name:'Borrowed Time',cd:5,desc:'Можно нажать вручную или способность срабатывает автоматически, если здоровье Abaddon падает ниже 2. Даёт бессмертие на 4 общих хода и не позволяет опуститься ниже 1 HP. Пока эффект активен, любой входящий урон превращается в лечение. Перезарядка: 5 ходов Abaddon.'}
]};
DATA.mars={name:'MARS',hp:9,atk:2,img:'assets/mars_draft.png',skills:[
 {id:'spear',name:'Spear of Mars',cd:3,desc:'Mars бросает во переднего врага пламенное копьё: наносит 1 магический урон и отталкивает цель в самый конец линии. Если цель находится в Arena of Blood, копьё протыкает её и дополнительно оглушает на 1 активацию. Перезарядка: 3 хода Mars.'},
 {id:'rebuke',name:"God's Rebuke",cd:3,desc:'Mars бьёт щитом переднего врага и наносит физический критический урон ровно в размере 150% от своей текущей тычки. Это не обычная атака +150%, а итоговые 150%. На удар работает вампиризм. Если цель находится в Arena of Blood, она дополнительно получает 1 магический урон от стены арены. Перезарядка: 3 хода Mars.'},
 {id:'arena',name:'Arena of Blood',cd:5,desc:'Mars призывает Arena of Blood на 4 общих хода. Передний враг внутри арены не может уйти назад при обычной смене линии и продолжает получать свои ходы. Если его место занимает следующий враг, тот получает 1 магический урон от стены. Spear of Mars внутри арены дополнительно оглушает цель на 1 активацию, а God’s Rebuke наносит ещё 1 магический урон от стены. Перезарядка: 5 ходов Mars.'}
]};

const ITEMS={
 satanic:{name:'Satanic',cost:11,img:'assets/items/satanic.png',category:'weapon',cd:3,active:true,free:true,desc:'В свой ход без траты действия применяет нормальное развеивание и даёт 100% вампиризм от атак до конца текущего хода. Fiend’s Grip нормальным развеиванием не снимается. Перезарядка: 3 хода героя. Собирается из Morbid Mask.'},
 assault:{name:'Assault Cuirass',cost:12,img:'assets/items/assault.png',category:'armor',desc:'Аура: +1 броня всей команде, включая владельца. Если владелец впереди своей линии, передний враг получает −1 брони. Одинаковые ауры не складываются.'},
 crystalys:{name:'Crystalys',cost:6,img:'assets/items/crystalys.png',category:'weapon',desc:'30% шанс при обычной атаке нанести критический урон в размере 150% от текущей тычки. Дробная часть округляется вниз.'},
 daedalus:{name:'Daedalus',cost:10,img:'assets/items/daedalus.png',category:'weapon',desc:'Даёт +1 к урону. 30% шанс при обычной атаке нанести критический урон в размере 200% от текущей тычки. Дробная часть округляется вниз.'},
 bloodthorn:{name:'Bloodthorn',cost:11,img:'assets/items/bloodthorn.png',category:'weapon',cd:3,active:true,desc:'Активно, стоит 1 действие: обезмолвливает переднюю цель на 2 хода команды цели. По окончании второго такого хода наносит 60% всего урона, полученного целью во время эффекта, с округлением вниз. Пока эффект активен, обычные атаки и атаки иллюзий по цели наносят ещё +1 урон, а при наличии уклонения имеют 40% шанс пробить его.'},
 desolator:{name:'Desolator',cost:10,img:'assets/items/desolator.png',category:'weapon',desc:'Даёт +1 к урону. После попадания обычной атакой накладывает на цель Desolator на 2 хода её команды: броня цели снижена на 2. Повторное попадание обновляет длительность, но не складывает снижение брони.'},
 mkb:{name:'Monkey King Bar',cost:8,img:'assets/items/monkey_king_bar.png',category:'weapon',desc:'Обычные атаки с шансом 80% проходят сквозь любые источники уклонения, включая Magnetic Field.'},
 radiance:{name:'Radiance',cost:10,img:'assets/items/radiance.png',category:'weapon',desc:'Даёт +20% уклонения. Если владелец стоит впереди своей линии, в начале хода вражеской команды её передний герой получает 1 урон от ауры Radiance. Собирается из Talisman of Evasion.'},
 yasha:{name:'Yasha',cost:10,img:'assets/items/yasha.png',category:'weapon',desc:'После обычной атаки с шансом 30% владелец мгновенно повторяет тычку по той же цели без траты действия.'},
 sange_yasha:{name:'Sange and Yasha',cost:18,img:'assets/items/sange_and_yasha.png',category:'armor',desc:'Даёт +1 к здоровью, сокращает длительность любых отрицательных эффектов на 2 хода и даёт 30% шанс после обычной атаки повторить тычку без траты действия. Собирается из Sange и Yasha.'},
 yasha_kaya:{name:'Yasha and Kaya',cost:18,img:'assets/items/yasha_and_kaya.png',category:'weapon',desc:'50% шанс после обычной атаки повторить тычку без траты действия. Урон от способностей +1. Каждая обычная атака имеет 10% шанс дополнительно нанести 1 магический урон, который считается уроном от способности. Собирается из Yasha и Kaya.'},
 witch:{name:'Witch Blade',cost:3,img:'assets/items/witch_blade.png',category:'magic',cd:2,desc:'Когда владелец попадает обычной атакой и предмет готов, цель получает эффект на 1 свой ход. Пока эффект активен, урон от заклинаний по цели увеличен на 1. Перезарядка: 2 хода владельца.'},
 parasma:{name:'Parasma',cost:7,img:'assets/items/parasma.png',category:'magic',cd:2,desc:'После обычной атаки накладывает на 1 ход эффект: заклинания наносят цели +2 урона. Не складывается с Witch Blade/Parasma. Перезарядка: 2 хода владельца.'},
 orchid:{name:'Orchid Malevolence',cost:6,img:'assets/items/orchid.png',category:'magic',cd:3,active:true,desc:'Активно, стоит 1 действие: обезмолвливает переднюю цель на 2 хода команды цели. По окончании второго такого хода наносит 30% всего урона, полученного целью во время эффекта, с округлением вниз.'},
 refresher:{name:'Refresher Orb',cost:12,img:'assets/items/refresher.png',category:'magic',cd:4,active:true,desc:'Активно: сбрасывает перезарядку всех способностей владельца. Использование предмета не тратит действие. Перезарядка: 4 хода владельца.'},
 dagon:{name:'Dagon',cost:9,img:'assets/items/dagon.png',category:'magic',cd:2,active:true,desc:'Активно, стоит 1 действие: стреляет магическим зарядом в выбранного врага и наносит 3 урона. Перезарядка: 2 хода владельца.'},
 kaya:{name:'Kaya',cost:8,img:'assets/items/kaya.png',category:'magic',desc:'Увеличивает урон от способностей владельца на 1.'},
 kaya_sange:{name:'Kaya and Sange',cost:16,img:'assets/items/kaya_and_sange.png',category:'magic',desc:'Даёт +2 к здоровью, сокращает длительность любых отрицательных эффектов на 1 ход и увеличивает урон от способностей на 2. Собирается из Kaya и Sange.'},
 morbid:{name:'Morbid Mask',cost:4,img:'assets/items/morbid_mask.png',category:'misc',desc:'Личный вампиризм: после обычной атаки владелец восстанавливает 1 HP. Складывается с другими источниками лечения.'},
 talisman:{name:'Talisman of Evasion',cost:5,img:'assets/items/talisman_of_evasion.png',category:'misc',desc:'Даёт владельцу +15% уклонения.'},
 cloak:{name:'Cloak',cost:3,img:'assets/items/cloak.png',category:'misc',desc:'Даёт владельцу 0.5 сопротивления магии.'},
 eaglesong:{name:'Eaglesong',cost:10,img:'assets/items/eaglesong.png',category:'misc',desc:'Даёт +40% шанса на дополнительную тычку после обычной атаки.'},
 vladmir:{name:"Vladmir's Offering",cost:6,img:'assets/items/vladmir.png',category:'support',desc:'Аура: все союзники после обычной атаки восстанавливают 1 HP. Складывается с другими источниками лечения. На команду действует только одна такая аура.'},
 mekanism:{name:'Mekansm',cost:5,img:'assets/items/mekansm.png',category:'support',cd:3,active:true,desc:'Активно, стоит 1 действие: лечит всю команду на 2 HP. Перезарядка: 3 хода героя.'},
 greaves:{name:'Guardian Greaves',cost:10,img:'assets/items/guardian_greaves.png',category:'support',cd:3,active:true,desc:'Активно, стоит 1 действие: применяет нормальное развеивание на владельца и лечит всю команду на 3 HP. Перезарядка: 3 хода героя. Собирается из Mekansm.'},
 pipe:{name:'Pipe of Insight',cost:6,img:'assets/items/pipe_of_insight.png',category:'support',cd:3,active:true,desc:'Даёт 1 сопротивления магии. Активно, стоит 1 действие: даёт всей команде щит на 2 от магического урона на 5 общих ходов. Перезарядка: 3 хода героя. Собирается из Cloak.'},
 heart:{name:'Heart of Tarrasque',cost:8,img:'assets/items/heart_of_tarrasque.png',category:'armor',desc:'Даёт +2 к максимальному здоровью, но при покупке не лечит владельца. Каждый общий ход восстанавливает 1 HP за каждые полные 5 единиц максимального здоровья владельца. Например, при 10 максимального HP восстанавливает 2 HP за общий ход.'},
 sange:{name:'Sange',cost:8,img:'assets/items/sange.png',category:'armor',desc:'Даёт +1 к максимальному и текущему здоровью. Все новые отрицательные эффекты на владельце становятся на 1 ход короче.'},
 skadi:{name:'Eye of Skadi',cost:8,img:'assets/items/eye_of_skadi.png',category:'weapon',desc:'После попадания обычной атакой накладывает на цель эффект на 5 общих ходов: любое лечение по этой цели уменьшается на 2.'},
 butterfly:{name:'Butterfly',cost:13,img:'assets/items/butterfly.png',category:'weapon',desc:'Даёт +60% шанса на дополнительную тычку после обычной атаки и +40% уклонения. Собирается из Eaglesong.'}
};
const ITEM_RECIPES={
 daedalus:['crystalys'],bloodthorn:['orchid'],parasma:['witch'],vladmir:['morbid'],satanic:['morbid'],radiance:['talisman'],
 greaves:['mekanism'],pipe:['cloak'],butterfly:['eaglesong'],
 sange_yasha:['sange','yasha'],kaya_sange:['kaya','sange'],yasha_kaya:['yasha','kaya']
};
const ITEM_UPGRADES=Object.fromEntries(Object.entries(ITEM_RECIPES).map(([k,v])=>[k,v[0]]));
let chosen=[],G=null,targetMode=null,draftPreview=null;
let shopTargetResume=null;
function setHTMLCached(el,html){if(!el)return;if(el._dotaCachedHTML===html)return;el._dotaCachedHTML=html;el.innerHTML=html}
function closeShopsForTargeting(team,id){let panel=document.getElementById(`shop${team}`);shopTargetResume={team,id,wasOpen:!!panel?.classList?.contains?.('open')};document.querySelectorAll('.shop-panel.open').forEach(x=>x.classList.remove('open'));document.body.classList.add('shop-targeting')}
function restoreShopAfterTargeting(){let st=shopTargetResume;shopTargetResume=null;document.body.classList.remove('shop-targeting');if(!st?.wasOpen)return;let panel=document.getElementById(`shop${st.team}`);if(panel){panel.classList.add('open');if(st.id)showShopItemInfo(st.team,st.id)}}

function dotaPhoneLike(vw,vh){
 try{return (matchMedia('(pointer:coarse)').matches||/iPhone|iPod|Android.+Mobile/i.test(navigator.userAgent||''))&&Math.min(vw,vh)<=700}catch(_){return false}
}
async function lockDotaLandscape(){
 try{
  if(screen.orientation?.lock)await screen.orientation.lock('landscape');
 }catch(_){}
}
function syncBattleResponsiveVars(logicalW,logicalH){
 try{
  const root=document.documentElement,bf=document.querySelector('#game .battlefield');
  const mobile=root.classList.contains('dota-landscape-mobile');
  if(!mobile||!bf){
   root.classList.remove('dota-landscape-compact','dota-landscape-roomy');
   if(bf)for(const k of ['--team0-card-w','--team1-card-w','--battle-card-h','--battle-mid-w','--battle-card-gap','--battle-column-gap'])bf.style.removeProperty(k);
   return;
  }

  logicalW=Number(logicalW)||parseFloat(getComputedStyle(root).getPropertyValue('--dota-vw'))||window.innerWidth||844;
  logicalH=Number(logicalH)||parseFloat(getComputedStyle(root).getPropertyValue('--dota-vh'))||window.innerHeight||390;

  const counts=G?[0,1].map(t=>Math.max(1,(G.teams?.[t]||[]).filter(h=>!h.infested).length)):[3,3];
  const maxUnits=Math.max(...counts);
  const clamp=(a,v,b)=>Math.max(a,Math.min(b,v));

  const compact=logicalH<=400||logicalW<=860;
  const roomy=logicalH>=410&&logicalW>=880;

  const middle=maxUnits>3
    ?clamp(40,Math.round(logicalW*.048),44)
    :clamp(46,Math.round(logicalW*.054),50);

  const columnGap=2;
  const outerAllowance=6;
  const sideWidth=Math.max(140,(logicalW-middle-outerAllowance-columnGap*2)/2);
  const cardGap=maxUnits>3?2:3;

  const widthFor=n=>{
   const raw=Math.floor((sideWidth-6-cardGap*Math.max(0,n-1))/Math.max(1,n));
   if(n>=4)return clamp(88,raw,92);
   return clamp(roomy?118:116,raw,roomy?122:120);
  };

  const cardH=maxUnits>3
    ?clamp(232,Math.round(logicalH*.565),236)
    :clamp(roomy?236:232,Math.round(logicalH*.58),roomy?240:236);

  bf.style.setProperty('--team0-card-w',widthFor(counts[0])+'px');
  bf.style.setProperty('--team1-card-w',widthFor(counts[1])+'px');
  bf.style.setProperty('--battle-card-h',cardH+'px');
  bf.style.setProperty('--battle-mid-w',middle+'px');
  bf.style.setProperty('--battle-card-gap',cardGap+'px');
  bf.style.setProperty('--battle-column-gap',columnGap+'px');

  root.classList.toggle('dota-landscape-compact',compact);
  root.classList.toggle('dota-landscape-roomy',roomy);
 }catch(_){}
}
function syncDotaViewport(){
 try{
  const vv=window.visualViewport;
  const physicalH=Math.max(1,Math.round(vv?.height||window.innerHeight||document.documentElement.clientHeight||0));
  const physicalW=Math.max(1,Math.round(vv?.width||window.innerWidth||document.documentElement.clientWidth||0));
  const phone=dotaPhoneLike(physicalW,physicalH);
  const forcedPortrait=phone&&physicalH>physicalW;
  const logicalW=forcedPortrait?physicalH:physicalW;
  const logicalH=forcedPortrait?physicalW:physicalH;
  const root=document.documentElement;
  const landscapePhone=phone&&logicalW>logicalH;
  const shortLandscape=landscapePhone&&(logicalH<=400||(logicalW<=860&&logicalH<=430));
  root.classList.toggle('dota-force-landscape',forcedPortrait);
  root.classList.toggle('dota-landscape-mobile',landscapePhone);
  root.classList.toggle('dota-landscape-short',shortLandscape);
  root.style.setProperty('--dota-physical-vw',physicalW+'px');
  root.style.setProperty('--dota-physical-vh',physicalH+'px');
  root.style.setProperty('--dota-vw',logicalW+'px');
  root.style.setProperty('--dota-vh',logicalH+'px');
  const header=document.querySelector('#app>header');
  const hh=Math.max(0,Math.round(header?.getBoundingClientRect?.().height||0));
  root.style.setProperty('--dota-header-h',hh+'px');
  if(document.body){
   document.body.style.setProperty('--dota-physical-vw',physicalW+'px');
   document.body.style.setProperty('--dota-physical-vh',physicalH+'px');
   document.body.style.setProperty('--dota-vw',logicalW+'px');
   document.body.style.setProperty('--dota-vh',logicalH+'px');
   document.body.style.setProperty('--dota-header-h',hh+'px');
   document.body.offsetHeight;
  }
  syncBattleResponsiveVars(logicalW,logicalH);
 }catch(_){}
}
syncDotaViewport();
window.addEventListener('load',()=>{syncDotaViewport();lockDotaLandscape()});
window.addEventListener('pageshow',()=>{syncDotaViewport();requestAnimationFrame(syncDotaViewport);setTimeout(syncDotaViewport,80);lockDotaLandscape()});
window.addEventListener('resize',syncDotaViewport);
window.addEventListener('orientationchange',()=>{setTimeout(syncDotaViewport,20);setTimeout(syncDotaViewport,120);setTimeout(syncDotaViewport,320);lockDotaLandscape()});
window.visualViewport?.addEventListener?.('resize',syncDotaViewport);
window.addEventListener('pointerdown',lockDotaLandscape,{once:true,capture:true});
window.addEventListener('touchstart',lockDotaLandscape,{once:true,capture:true,passive:true});
function draftTeamForPick(i){return i%2}
function localDraftPlayer(){return window.DOTA_OFFLINE_MODE?draftTeamForPick(chosen.length):(Number.isInteger(window.DOTA_NET_PLAYER)?window.DOTA_NET_PLAYER:0)}
function draftTurn(){return draftTeamForPick(chosen.length)}
function canLocalDraftPick(){return chosen.length<6 && localDraftPlayer()===draftTurn()}
function draftTeamHeroes(team){return chosen.filter((_,i)=>draftTeamForPick(i)===team)}
function renderDraftSlots(){
 for(let team=0;team<2;team++){
  const box=document.getElementById(`draftSlots${team}`);if(!box)continue;
  const picks=draftTeamHeroes(team);
  for(let i=0;i<3;i++){
   const id=picks[i]||'';
   let slot=box.children[i];
   if(!slot){slot=document.createElement('div');box.appendChild(slot)}
   const key=`${team}:${id}:${i}`;
   if(slot.dataset.renderKey===key)continue;
   slot.dataset.renderKey=key;
   slot.className='draft-slot'+(id?' filled':'');
   if(id){
    slot.dataset.team=String(team);slot.dataset.hero=id;
    slot.innerHTML=`<img src="${draftSlotPortraitSrc(id)}" alt="${DATA[id].name}" decoding="async"><div class="draft-slot-name">${DATA[id].name}</div><div class="draft-mastery-host">${window.DotaProfile?.masteryBadgeHTML?.(team,id,true)||''}</div>`;
   }else{
    delete slot.dataset.team;delete slot.dataset.hero;
    slot.innerHTML=`<div class="draft-slot-empty">${i+1}</div>`;
   }
  }
  while(box.children.length>3)box.lastElementChild.remove();
 }
}
const AUDIO={
 bane:{turn:['assets/audio/bane_turn1.mp3','assets/audio/bane_turn2.mp3'],skills:{sleep:'assets/audio/bane_skill1.mp3',grip:'assets/audio/bane_skill2.mp3'}},
 techies:{turn:['assets/audio/techies_turn1.mp3','assets/audio/techies_turn2.mp3'],skills:{bomb:'assets/audio/techies_skill1.mp3',mine:'assets/audio/techies_skill2.mp3'}},
 morphling:{turn:['assets/audio/morphling_turn1.mp3','assets/audio/morphling_turn2.mp3'],skills:{agi:'assets/audio/morphling_skill1.mp3',str:'assets/audio/morphling_skill2.mp3',morph:'assets/audio/morphling_skill3.mp3'}},
 silencer:{turn:['assets/audio/silencer_turn1.mp3','assets/audio/silencer_turn2.mp3'],skills:{silence:'assets/audio/silencer_skill1.mp3',global:'assets/audio/silencer_skill2.mp3'}},
 shadowfiend:{turn:['assets/audio/shadowfiend_turn1.mp3','assets/audio/shadowfiend_turn2.mp3'],skills:{raze:'assets/audio/shadowfiend_skill1.mp3',raze_near:'assets/audio/shadowfiend_skill1.mp3',raze_mid:'assets/audio/shadowfiend_skill1.mp3',raze_far:'assets/audio/shadowfiend_skill1.mp3',souls:'assets/audio/shadowfiend_skill2.mp3'},razeVoice:['assets/audio/shadowfiend_raze_voice1.mp3','assets/audio/shadowfiend_raze_voice2.mp3']},
 lifestealer:{turn:['assets/audio/lifestealer_turn1.mp3','assets/audio/lifestealer_turn2.mp3'],skills:{rage:'assets/audio/lifestealer_rage.mp3',infest:'assets/audio/lifestealer_skill2.mp3'}},
 io:{turn:['assets/audio/io_spawn.mp3'],skills:{tether:'assets/audio/io_tether_attach.mp3',spirits:'assets/audio/io_spirits_cast.mp3',relocate:'assets/audio/io_spawn.mp3',break:'assets/audio/io_tether_break.mp3'},spiritsHit:'assets/audio/io_spirit_hit.mp3'},
 tinker:{turn:['assets/audio/tinker_spawn_01.mp3','assets/audio/tinker_spawn_04.mp3'],skills:{laser:'assets/audio/tinker_laser.mp3',missile:null,matrix:'assets/audio/tinker_defense_matrix.mp3',rearm:'assets/audio/tinker_rearm_fx.mp3'},voices:{laser:['assets/audio/tinker_voice_laser_01.mp3','assets/audio/tinker_voice_laser_04.mp3'],missile:['assets/audio/tinker_voice_missile_01.mp3','assets/audio/tinker_voice_missile_05.mp3'],rearm:['assets/audio/tinker_voice_rearm_01.mp3','assets/audio/tinker_voice_rearm_09.mp3']},killVoices:['assets/audio/tinker_kill_11.mp3'],missileImpact:'assets/audio/tinker_heat_missile_target.mp3'},
 invoker:{turn:['assets/audio/invoker_spawn_02.mp3','assets/audio/invoker_spawn_04.mp3'],skills:{invoke:'assets/audio/invoker_invoke.mp3',coldsnap:'assets/audio/invoker_cold_snap.mp3',emp:'assets/audio/invoker_emp.mp3',sunstrike:'assets/audio/invoker_sun_strike.mp3',forge:'assets/audio/invoker_forge_spirit.mp3',icewall:'assets/audio/invoker_ice_wall.mp3',ghostwalk:'assets/audio/invoker_ghost_walk.mp3',meteor:'assets/audio/invoker_chaos_meteor.mp3',tornado:'assets/audio/invoker_tornado.mp3',deafblast:'assets/audio/invoker_deafening_blast.mp3',alacrity:'assets/audio/invoker_alacrity.mp3'},voices:{coldsnap:['assets/audio/invoker_voice_cold_snap_1.mp3'],emp:['assets/audio/invoker_voice_emp_1.mp3','assets/audio/invoker_voice_emp_2.mp3'],sunstrike:['assets/audio/invoker_voice_sun_strike_1.mp3'],forge:['assets/audio/invoker_voice_forge_spirit_1.mp3','assets/audio/invoker_voice_forge_spirit_2.mp3'],icewall:['assets/audio/invoker_voice_ice_wall_1.mp3'],ghostwalk:['assets/audio/invoker_voice_ghost_walk_1.mp3','assets/audio/invoker_voice_ghost_walk_2.mp3'],meteor:['assets/audio/invoker_voice_chaos_meteor_1.mp3','assets/audio/invoker_voice_chaos_meteor_2.mp3'],tornado:['assets/audio/invoker_voice_tornado_1.mp3','assets/audio/invoker_voice_tornado_2.mp3'],deafblast:['assets/audio/invoker_voice_deafening_blast_1.mp3','assets/audio/invoker_voice_deafening_blast_2.mp3'],alacrity:['assets/audio/invoker_voice_alacrity_1.mp3','assets/audio/invoker_voice_alacrity_2.mp3']},killVoices:['assets/audio/invoker_kill_01.mp3','assets/audio/invoker_kill_05.mp3','assets/audio/invoker_kill_laugh_05.mp3']},
 broodmother:{turn:['assets/audio/broodmother_turn_spawn_01.mp3','assets/audio/broodmother_turn_attack_10.mp3','assets/audio/broodmother_turn_hunger_03.mp3'],skills:{hunger:'assets/audio/broodmother_hunger_cast.mp3',spiderlings:'assets/audio/broodmother_spawn_cast.mp3',spiderDeath:'assets/audio/broodmother_spider_death.mp3'},voices:{hunger:['assets/audio/broodmother_hunger_voice_02.mp3'],spiderlings:['assets/audio/broodmother_spawn_voice_03.mp3','assets/audio/broodmother_spawn_voice_04.mp3','assets/audio/broodmother_spawn_voice_05.mp3']},killVoices:['assets/audio/broodmother_kill_01.mp3','assets/audio/broodmother_kill_03.mp3','assets/audio/broodmother_kill_11.mp3']},
 abaddon:{turn:['assets/audio/abaddon_turn_levelup_01.mp3','assets/audio/abaddon_turn_spawn_02.mp3'],skills:{mist_coil:'assets/audio/mist_coil_cast.mp3',aphotic_shield:'assets/audio/aphotic_shield_cast.mp3',borrowed:'assets/audio/borrowed_time_cast.mp3'},voices:{mist_coil:['assets/audio/abaddon_voice_mist_coil_02.mp3','assets/audio/abaddon_voice_mist_coil_06.mp3'],aphotic_shield:['assets/audio/abaddon_voice_aphotic_shield_01.mp3','assets/audio/abaddon_voice_aphotic_shield_05.mp3'],borrowed:['assets/audio/abaddon_voice_borrowed_time_02.mp3','assets/audio/abaddon_voice_borrowed_time_07.mp3']},killVoices:['assets/audio/abaddon_kill_06.mp3','assets/audio/abaddon_kill_09.mp3'],rivalVoices:{bane:'assets/audio/abaddon_rival_bane_12.mp3',axe:'assets/audio/abaddon_rival_axe_14.mp3',silencer:'assets/audio/abaddon_rival_silencer_09.mp3'}},
 mars:{turn:['assets/audio/mars_turn_01.mp3','assets/audio/mars_turn_02.mp3','assets/audio/mars_turn_03.mp3'],skills:{spear:'assets/audio/mars_spear_cast.mp3',rebuke:'assets/audio/mars_rebuke.mp3',arena:'assets/audio/mars_arena_combo.mp3'},voices:{spear:['assets/audio/mars_voice_spear_01.mp3','assets/audio/mars_voice_spear_02.mp3'],rebuke:['assets/audio/mars_voice_rebuke_01.mp3','assets/audio/mars_voice_rebuke_02.mp3'],arena:['assets/audio/mars_voice_arena_06.mp3','assets/audio/mars_voice_arena_09.mp3']},killVoices:['assets/audio/mars_kill_01.mp3','assets/audio/mars_kill_12.mp3'],rivalVoices:{abaddon:'assets/audio/mars_rival_abaddon.mp3',arcwarden:'assets/audio/mars_rival_arcwarden.mp3',axe:'assets/audio/mars_rival_axe.mp3',bane:'assets/audio/mars_rival_bane.mp3',lifestealer:'assets/audio/mars_rival_lifestealer.mp3'},spearImpact:'assets/audio/mars_spear_target.mp3',wall:'assets/audio/mars_wall_hit.mp3'},
 axe:{turn:['assets/audio/axe_turn1.mp3','assets/audio/axe_turn2.mp3'],skills:{call:'assets/audio/axe_berserkers_call.mp3',helix:'assets/audio/axe_counter_helix.mp3',culling:'assets/audio/axe_culling_blade.mp3'}}
};
let sfxAudio=new Audio(), voiceAudio=new Audio(), abilityVoiceAudio=new Audio(), mineAudio=new Audio(), attackAudio=new Audio(), itemAudio=new Audio(), miscAudio=new Audio(), matrixAudio=new Audio(), bgmAudio=new Audio('assets/audio/background_music.mp3');
sfxAudio.volume=.72;voiceAudio.volume=.72;abilityVoiceAudio.volume=.72;mineAudio.volume=.72;attackAudio.volume=.68;itemAudio.volume=.22;miscAudio.volume=.48;matrixAudio.volume=.72;bgmAudio.volume=.10;bgmAudio.loop=true;bgmAudio.preload='auto';
const ATTACK_AUDIO={bane:'assets/audio/bane_attack.mp3',silencer:'assets/audio/silencer_attack.mp3',morphling:'assets/audio/morphling_attack.mp3',techies:'assets/audio/techies_attack.mp3',lifestealer:'assets/audio/lifestealer_attack.mp3',shadowfiend:'assets/audio/shadowfiend_attack.mp3',invoker:'assets/audio/invoker_attack.mp3',tinker:'assets/audio/tinker_projectile_launch.mp3',axe:'assets/audio/axe_attack1.mp3',broodmother:'assets/audio/broodmother_attack_combo.mp3',abaddon:'assets/audio/abaddon_attack_combo.mp3',mars:'assets/audio/mars_attack_combo.mp3'};
const ATTACK_IMPACT_MS={bane:300,silencer:500,morphling:70,techies:550,lifestealer:90,shadowfiend:250,io:280,phantomlancer:575,invoker:240,tinker:280,forge_spirit:280,axe:230,broodmother:550,abaddon:220};
const SKILL_IMPACT_MS={shadowfiend:{raze:180}};
function attackImpactMs(h){return ATTACK_IMPACT_MS[h?.id]??120}
const IO_ATTACK_AUDIO={pre:'assets/audio/io_attack_pre.mp3',launch:'assets/audio/io_attack_launch.mp3',impact:'assets/audio/io_attack_impact.mp3'};
function ensureMusic(){if(!bgmAudio.paused)return;bgmAudio.play().catch(()=>{})}
function playAttackSound(h,noNet=false){if(!h)return;if(!noNet)window.emitNetVfx?.('audio-attack',h);if(h?.id==='io'){playFile(attackAudio,IO_ATTACK_AUDIO.pre);setTimeout(()=>playFile(sfxAudio,IO_ATTACK_AUDIO.launch),120);setTimeout(()=>playFile(miscAudio,IO_ATTACK_AUDIO.impact),280);return}playFile(attackAudio,ATTACK_AUDIO[h.id])}
document.addEventListener('pointerdown',ensureMusic,{once:true});
const MINE_AUDIO={place:'assets/audio/techies_mine_place.mp3',approach:'assets/audio/techies_mine_approach.mp3',explode:'assets/audio/techies_mine_explode.mp3'};
function playMineSound(kind){playFile(mineAudio,MINE_AUDIO[kind])}
function playFile(a,src){if(!src)return;if(typeof playDecodedMatchAudio==='function'&&playDecodedMatchAudio(a,src))return;try{a.pause();a.currentTime=0;const key=audioCacheKey(src);if(audioCacheKey(a.dataset?.dotaSrc||'')!==key){a.src=src;a.dataset.dotaSrc=src;a.preload='auto';a.load()}a.play().catch(()=>{})}catch(e){}}
let matrixFadeToken=0;
function playMatrixSound(){let src=AUDIO.tinker?.skills?.matrix;if(!src)return;let token=++matrixFadeToken;try{matrixAudio.pause();matrixAudio.currentTime=0;matrixAudio.volume=.72;matrixAudio.src=src;matrixAudio.load();matrixAudio.play().catch(()=>{});let fadeStart=4200,fadeDuration=6200;setTimeout(()=>{let started=performance.now();let step=now=>{if(token!==matrixFadeToken||matrixAudio.paused)return;let t=Math.max(0,Math.min(1,(now-started)/fadeDuration));matrixAudio.volume=.72*(1-t);if(t<1)requestAnimationFrame(step);else{matrixAudio.volume=0;try{matrixAudio.pause()}catch(_){}}};requestAnimationFrame(step)},fadeStart)}catch(e){}}
function playSkillSound(h,id,noNet=false){if(!h)return;let audioId=id;if(h.id==='shadowfiend'&&['raze_near','raze_mid','raze_far'].includes(id))audioId='raze';if(!noNet)window.emitNetVfx?.('audio-skill',h,{skillId:audioId});if(h.id==='mars'){let mars=AUDIO.mars||{},voices=mars.voices?.[audioId]||[];if(audioId==='spear'){playFile(sfxAudio,mars.skills?.spear);if(mars.spearImpact)setTimeout(()=>playFile(miscAudio,mars.spearImpact),330)}else if(audioId==='rebuke')playFile(sfxAudio,mars.skills?.rebuke);else if(audioId==='arena')playFile(sfxAudio,mars.skills?.arena);else playFile(sfxAudio,mars.skills?.[audioId]||mars.skills?.[id]);if(voices.length){let idx=Math.floor(Math.random()*voices.length);playFile(abilityVoiceAudio,voices[idx])}return}if(h.id==='tinker'&&audioId==='matrix')playMatrixSound();else playFile(sfxAudio,AUDIO[h.id]?.skills?.[audioId]||AUDIO[h.id]?.skills?.[id]);if(h.id==='shadowfiend'&&audioId==='raze'){let a=AUDIO.shadowfiend?.razeVoice||[];if(a.length){let idx=Math.floor(Math.random()*a.length);playFile(abilityVoiceAudio,a[idx])}}if(h.id==='broodmother'&&['hunger','spiderlings'].includes(audioId)){let a=AUDIO.broodmother?.voices?.[audioId]||[];if(a.length){let idx=Math.floor(Math.random()*a.length);playFile(abilityVoiceAudio,a[idx])}}if(h.id==='tinker'&&['laser','missile','rearm'].includes(audioId)){let a=AUDIO.tinker?.voices?.[audioId]||[];if(a.length){let idx=Math.floor(Math.random()*a.length);playFile(abilityVoiceAudio,a[idx])}}if(h.id==='abaddon'&&['mist_coil','aphotic_shield','borrowed'].includes(audioId)){let a=AUDIO.abaddon?.voices?.[audioId]||[];if(a.length){let idx=Math.floor(Math.random()*a.length);playFile(abilityVoiceAudio,a[idx])}}}

function playRandomVoice(list){if(!Array.isArray(list)||!list.length)return;let idx=Math.floor(Math.random()*list.length);playFile(abilityVoiceAudio,list[idx])}
function playInvokerSpellCast(id,caster=null,noNet=false){caster=caster||active?.();if(!noNet&&caster)window.emitNetVfx?.('audio-invoker-spell',caster,{skillId:id});let sounds=AUDIO.invoker?.skills||{};if(sounds[id])playFile(sfxAudio,sounds[id]);let voices=AUDIO.invoker?.voices?.[id];if(voices?.length)playRandomVoice(voices)}
function playInvokerKillVoice(){playRandomVoice(AUDIO.invoker?.killVoices||[])}
function playBroodKillVoice(h,noNet=false){if(!h||h.id!=='broodmother')return;if(!noNet)window.emitNetVfx?.('audio-brood-kill',h);playRandomVoice(AUDIO.broodmother?.killVoices||[])}
function playTinkerKillVoice(){playRandomVoice(AUDIO.tinker?.killVoices||[])}
function playAbaddonKillVoice(victim,killer=null){
 const ab=AUDIO.abaddon||{};
 const rival=ab.rivalVoices?.[victim?.id]||null;
 if(rival&&Math.random()<.5){playFile(abilityVoiceAudio,rival);return 'rival'}
 playRandomVoice(ab.killVoices||[]);return 'generic'
}
function playMarsWallHitSound(){let src=AUDIO.mars?.wall;if(src)playFile(miscAudio,src)}
function playMarsKillVoice(victim,killer=null){
 const mars=AUDIO.mars||{};
 const rival=mars.rivalVoices?.[victim?.id]||null;
 if(rival&&Math.random()<.5){playFile(abilityVoiceAudio,rival);return 'rival'}
 playRandomVoice(mars.killVoices||[]);return 'generic'
}
function playSpiritsHitSound(){playFile(miscAudio,AUDIO.io?.spiritsHit)}
function ioSpiritTimers(io){if(!io||io.id!=='io')return [];if(!Array.isArray(io.spiritTimers)){let count=Math.max(0,Number(io.spirits)||0),ttl=Math.max(1,(Number(io.spiritsTurns)||6)*2);io.spiritTimers=Array.from({length:count},()=>ttl)}io.spiritTimers=io.spiritTimers.map(x=>Math.max(0,Number(x)||0)).filter(x=>x>0).sort((a,b)=>a-b);io.spirits=io.spiritTimers.length;io.spiritsTurns=io.spiritTimers.length?Math.max(...io.spiritTimers):0;return io.spiritTimers}
function syncIoSpiritSummary(io){let timers=ioSpiritTimers(io);io.spirits=timers.length;io.spiritsTurns=timers.length?Math.max(...timers):0;return timers}
function triggerIoSpiritHit(io){let timers=syncIoSpiritSummary(io);if(!io||io.dead||io.id!=='io'||timers.length<=0)return false;let front=frontHero(io.team);if(front!==io)return false;let enemy=frontHero(1-io.team);if(!enemy||enemy.dead)return false;playSpiritsHitSound();addLog(`🌀 Spirits наносят 1 урон ${enemy.name}.`);spellDamage(enemy,1,`${logIcon('io','spirits')} ${io.name}: `,io,{impactDelay:30});timers.sort((a,b)=>a-b).shift();io.spiritTimers=timers;syncIoSpiritSummary(io);return true}

function heroViewportCenter(h){
 let owner=isForgeSpiritTarget(h)?forgeSpiritOwner(h):h;
 let sel=owner?document.querySelector(`#hero-${owner.team}-${owner.id} .hero-portrait`):null;
 let rect=sel?.getBoundingClientRect?.();
 if(!rect||rect.width<=0||rect.height<=0)return null;
 return {x:rect.left+rect.width/2,y:rect.top+rect.height/2};
}
function tinkerFxRoot(){
 let root=document.getElementById('tinkerFxRoot');
 if(!root){
  root=document.createElement('div');root.id='tinkerFxRoot';
  root.style.cssText='position:fixed;inset:0;pointer-events:none;overflow:visible;z-index:2147483646;contain:layout style;';
  document.body.appendChild(root);
 }
 return root;
}
function playTinkerLaserFx(caster,target,duration=640){
 let from=heroViewportCenter(caster),to=heroViewportCenter(target),root=tinkerFxRoot();
 if(!from||!to||!root)return false;
 let svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox',`0 0 ${Math.max(1,window.innerWidth)} ${Math.max(1,window.innerHeight)}`);
 svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;';
 let group=document.createElementNS('http://www.w3.org/2000/svg','g');
 group.style.transformOrigin=`${from.x}px ${from.y}px`;
 group.style.transformBox='fill-box';
 const line=(width,stroke,opacity)=>{let x=document.createElementNS('http://www.w3.org/2000/svg','line');x.setAttribute('x1',from.x);x.setAttribute('y1',from.y);x.setAttribute('x2',to.x);x.setAttribute('y2',to.y);x.setAttribute('stroke',stroke);x.setAttribute('stroke-width',width);x.setAttribute('stroke-linecap','round');x.setAttribute('opacity',opacity);return x};
 group.append(line(24,'#30b9ff','.16'),line(14,'#53d3ff','.34'),line(8,'#baf6ff','.82'),line(3,'#ffffff','1'));
 let impact=document.createElementNS('http://www.w3.org/2000/svg','circle');impact.setAttribute('cx',to.x);impact.setAttribute('cy',to.y);impact.setAttribute('r','8');impact.setAttribute('fill','#ffffff');impact.setAttribute('stroke','#72dcff');impact.setAttribute('stroke-width','4');impact.setAttribute('opacity','0');
 let impactGlow=document.createElementNS('http://www.w3.org/2000/svg','circle');impactGlow.setAttribute('cx',to.x);impactGlow.setAttribute('cy',to.y);impactGlow.setAttribute('r','18');impactGlow.setAttribute('fill','none');impactGlow.setAttribute('stroke','#8ae8ff');impactGlow.setAttribute('stroke-width','5');impactGlow.setAttribute('opacity','0');
 svg.append(group,impactGlow,impact);
 root.appendChild(svg);
 try{
  group.animate([
   {opacity:0,transform:'scaleX(0.04)'},
   {opacity:1,transform:'scaleX(1)',offset:.34},
   {opacity:1,transform:'scaleX(1)',offset:.72},
   {opacity:0,transform:'scaleX(1)'}
  ],{duration,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
  impact.animate([
   {opacity:0,r:6},
   {opacity:1,r:14,offset:.22},
   {opacity:.78,r:11,offset:.55},
   {opacity:0,r:18}
  ],{duration:Math.round(duration*.56),delay:Math.round(duration*.2),easing:'ease-out',fill:'forwards'});
  impactGlow.animate([
   {opacity:0,r:10},
   {opacity:.85,r:22,offset:.26},
   {opacity:.3,r:28,offset:.7},
   {opacity:0,r:34}
  ],{duration:Math.round(duration*.7),delay:Math.round(duration*.16),easing:'ease-out',fill:'forwards'});
 }catch(_){group.style.opacity='1';impact.setAttribute('opacity','1');impactGlow.setAttribute('opacity','.6')}
 setTimeout(()=>svg.remove(),duration+120);
 return true;
}
function animateMissile(caster,target,delay=0,duration=820){
 let from=heroViewportCenter(caster),to=heroViewportCenter(target),root=tinkerFxRoot();
 if(!from||!to||!root)return false;
 setTimeout(()=>{
  let dx=to.x-from.x,dy=to.y-from.y,ang=Math.atan2(dy,dx)*180/Math.PI;
  let m=document.createElement('div');
  m.className='tinker-missile';
  m.style.cssText=`position:absolute;left:${from.x}px;top:${from.y}px;width:34px;height:14px;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%) rotate(${ang}deg);transform-origin:center;border-radius:50% 9px 9px 50%;background:linear-gradient(90deg,#8e99ae 0%,#f5f8ff 34%,#bac8e8 72%,#5d6da0 100%);border:1px solid rgba(255,255,255,.72);box-shadow:0 0 7px #fff,0 0 16px #78caff;`;
  let flame=document.createElement('i');flame.style.cssText='position:absolute;right:100%;top:50%;width:34px;height:12px;transform:translateY(-50%);background:linear-gradient(90deg,rgba(255,83,26,0),rgba(255,107,36,.55),#ffd56a);filter:blur(2px);clip-path:polygon(0 50%,100% 0,100% 100%);';m.appendChild(flame);
  let core=document.createElement('b');core.style.cssText='position:absolute;right:5px;top:50%;width:7px;height:7px;transform:translateY(-50%);border-radius:50%;background:#a8e8ff;box-shadow:0 0 8px #fff;';m.appendChild(core);
  root.appendChild(m);
  let finished=false;const finish=()=>{if(finished)return;finished=true;playFile(miscAudio,AUDIO.tinker?.missileImpact);let boom=document.createElement('div');boom.style.cssText=`position:absolute;left:${to.x}px;top:${to.y}px;width:18px;height:18px;transform:translate(-50%,-50%);border-radius:50%;background:#fff6b8;box-shadow:0 0 12px #fff,0 0 26px #ffac4f,0 0 42px #ff6633;`;root.appendChild(boom);try{boom.animate([{transform:'translate(-50%,-50%) scale(.35)',opacity:1},{transform:'translate(-50%,-50%) scale(2.4)',opacity:0}],{duration:260,easing:'ease-out',fill:'forwards'})}catch(_){}setTimeout(()=>boom.remove(),300);m.remove()};
  try{let a=m.animate([{left:`${from.x}px`,top:`${from.y}px`,transform:`translate(-50%,-50%) rotate(${ang}deg) scale(.92)`},{left:`${to.x}px`,top:`${to.y}px`,transform:`translate(-50%,-50%) rotate(${ang}deg) scale(1.06)`}],{duration,easing:'cubic-bezier(.18,.66,.2,1)',fill:'forwards'});a.onfinish=finish;setTimeout(finish,duration+80)}catch(_){m.style.transition=`left ${duration}ms linear,top ${duration}ms linear`;requestAnimationFrame(()=>{m.style.left=`${to.x}px`;m.style.top=`${to.y}px`});setTimeout(finish,duration)}
 },delay);
 return true;
}
function playTurnVoice(h,noNet=false){if(!h)return;let a=AUDIO[h.id]?.turn||[];if(!a.length)return;if(!noNet)window.emitNetVfx?.('audio-turn',h);let last=h._lastVoice??-1,idx=a.length===1?0:Math.floor(Math.random()*a.length);if(a.length>1&&idx===last)idx=(idx+1)%a.length;h._lastVoice=idx;playFile(voiceAudio,a[idx])}

const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function statusBadge(label,cls='',icon=''){return `<span class="status-badge${cls?` ${cls}`:''}">${icon?`<img src="${icon}" alt="">`:''}<span>${esc(label)}</span></span>`}
function invokerOverlayEffects(h){let out=[];if(satanicActive(h))out.push({icon:ITEMS.satanic.img,tone:'good',count:'',label:'Satanic: 100% вампиризм от атак до конца хода'});const add=(key,tone,count,label,icon=null)=>out.push({icon:icon||skillIcon('invoker',key),tone,count,label});if((h.tinkerMatrixShield||false))out.push({icon:skillIcon('tinker','matrix'),tone:'good',count:h.tinkerMatrixShieldTurns||6,label:`Defense Matrix: щит на 1 урон • ещё ${h.tinkerMatrixShieldTurns||6} общ. ход.`});if((h.tinkerMatrixBoostTurns||0)>0)out.push({icon:skillIcon('tinker','matrix'),tone:'good',count:`+${h.tinkerMatrixBoostTurns}`,label:`Defense Matrix: +1 действие ещё ${h.tinkerMatrixBoostTurns} общ. ход.`});if((h.rageTurns||0)>0)out.push({icon:skillIcon('lifestealer','rage'),tone:'good',count:h.rageTurns,label:`Rage: невосприимчивость к эффектам и 100% сопротивления магии • ${h.rageTurns} общ. ход.`});if((h.aphoticShield||0)>0)out.push({icon:skillIcon('abaddon','aphotic_shield'),tone:'good',count:h.aphoticShield,label:`Aphotic Shield: поглощает ещё ${h.aphoticShield} урона.`});if((h.borrowedTimeTurns||0)>0)out.push({icon:skillIcon('abaddon','borrowed'),tone:'good',count:h.borrowedTimeTurns,label:`Borrowed Time: ${h.borrowedTimeTurns} общ. хода. Входящий урон лечит Abaddon.`});if((h.pipeShield||0)>0&&h.pipeShieldTurns>0)out.push({icon:ITEMS.pipe.img,tone:'good',count:h.pipeShield,label:`Pipe of Insight: щит от магического урона ${h.pipeShield} • ещё ${h.pipeShieldTurns} общ. ход.`});if((h.skadiTurns||0)>0)out.push({icon:ITEMS.skadi.img,tone:'bad',count:h.skadiTurns,label:`Eye of Skadi: любое лечение уменьшено на 2 • ещё ${h.skadiTurns} общ. ход.`});if(marsArenaActive()&&!h.dead&&((h.id==='mars'&&h.team===G.marsArenaTeam)||(h===frontHero(G.marsArenaEnemyTeam))))out.push({icon:skillIcon('mars','arena'),tone:h.team===G.marsArenaTeam?'good':'bad',count:G.marsArenaTurns,label:`Arena of Blood: ещё ${G.marsArenaTurns} общ. ход.`});if((h.tinkerBlindTurns||0)>0)out.push({icon:skillIcon('tinker','laser'),tone:'bad',count:h.tinkerBlindTurns,label:`Laser: ослепление ещё ${h.tinkerBlindTurns} общ. ход.`});if((h.desolatorTurns||0)>0)out.push({icon:ITEMS.desolator.img,tone:'bad',count:h.desolatorTurns,label:`Desolator: броня −2 • ${h.desolatorTurns} ход. команды цели`});if(h.sleep)add('sleep','bad','',`Nightmare: ${h.nightmareSkipped?'цель уже пропустила ход и всё ещё спит до своей следующей активации':'цель спит и пропустит следующую активацию'}`,'assets/skills/bane1.png');if((h.alacrityTurns||0)>0)add('alacrity','good',h.alacrityTurns,`Alacrity: +1 урон • ${h.alacrityTurns} ход.`);if(broodHungerActive(h))add('hunger','good',Math.max(1,Math.ceil((h.broodHungerTurns||0)/2)),`Insatiable Hunger: +1 урон и 100% вампиризм • ещё ${Math.max(1,Math.ceil((h.broodHungerTurns||0)/2))} общ. ход.`,skillIcon('broodmother','hunger'));if((h.broodBiteTimers?.length||0)>0)add('bite','bad',`${Math.min(60,(h.broodBiteTimers?.length||0)*10)}%`,`Incapacitating Bite: ${Math.min(60,(h.broodBiteTimers?.length||0)*10)}% промаха • ${Math.min(6,h.broodBiteTimers?.length||0)} стак(ов)`,skillIcon('broodmother','bite'));if((h.ghostWalkTurns||0)>0)add('ghostwalk','good',h.ghostWalkTurns,`Ghost Walk: ${h.ghostWalkTurns} ход.`);if((h.coldSnapTurns||0)>0)add('coldsnap','bad',h.coldSnapTurns,`Cold Snap: ${h.coldSnapTurns} ход.`);if((h.burnTurns||0)>0)add('meteor','bad',h.burnTurns,`Горение: ${h.burnTurns} ход.`);if((h.disarmTurns||0)>0)add('deafblast','bad',h.disarmTurns,`Deafening Blast: обезоружен ${h.disarmTurns} ход.`);if((h.tornadoAirborne||0)>0)add('tornado','bad',h.tornadoAirborne,`Tornado: в воздухе ${h.tornadoAirborne} ход.`);if((h.iceWallTurns||0)>0)add('icewall','bad',h.iceWallTurns,`Ice Wall: обморожен ${h.iceWallTurns} ход.`);return out}

const INVOKER_COMBOS={qqq:'coldsnap',www:'emp',eee:'sunstrike',eeq:'forge',eqq:'icewall',qqw:'ghostwalk',eew:'meteor',qww:'tornado',eqw:'deafblast',eww:'alacrity'};
function invokerComboKey(combo){return [...String(combo||'').toLowerCase()].sort().join('')}
function invokerSpellFromCombo(combo){return INVOKER_COMBOS[invokerComboKey(combo)]||null}
function broodHungerActive(h){return !!(h?.id==='broodmother'&&!h.dead&&(((h.broodHungerTurns||0)>0)||h.broodHungerImmediate))}
function effectiveAtk(h){let itemAtk=(h?.items?.includes('desolator')?1:0),broodBonus=broodHungerActive(h)?1:0;return Math.max(0,(Number(h?.atk)||0)+itemAtk+((h?.alacrityTurns||0)>0?1:0)+broodBonus)}
function compactStatNum(v){const n=Number(v)||0,r=Math.round(n*100)/100;return Number.isInteger(r)?String(r):String(r).replace(/0+$/,'').replace(/\.$/,'')}
function isForgeSpiritTarget(t){return !!t&&t.kind==='forgeSpirit'&&!t.dead&&(Number(t.hp)||0)>0&&(Number(t.turns)||0)>0}
function forgeSpiritOwner(spirit){return isForgeSpiritTarget(spirit)?G?.teams?.[spirit.team]?.find(h=>h.id===spirit.ownerId&&!h.dead)||null:null}
function forgeSpiritTargets(team){if(!G)return[];let out=[];for(const owner of G.teams[team]||[]){if(isForgeSpiritTarget(owner.forgeSpirit))out.push(owner.forgeSpirit)}return out}
function canTargetHero(h,spellId=''){if(!h||h.dead||h.infested)return false;if(isForgeSpiritTarget(h)){if((h.tornadoAirborne||0)>0&&!['sunstrike','meteor'].includes(spellId))return false;return true}if((h.ghostWalkTurns||0)>0)return false;if((h.tornadoAirborne||0)>0&&!['sunstrike','meteor'].includes(spellId))return false;return true}
function enemyTargetPool(allHeroes=false,spellId=''){let team=1-G.team,heroes=allHeroes?living(team):[frontHero(team)].filter(Boolean);return heroes.filter(h=>canTargetHero(h,spellId)).concat(forgeSpiritTargets(team))}
function chooseEnemyAny(promptText,filter=()=>true,onPick=null,spellId=''){let realFilter=h=>canTargetHero(h,spellId)&&filter(h);let opts=enemyTargetPool(true,spellId).filter(realFilter);if(!opts.length){alert('Нет подходящих целей.');return null}targetMode={promptText,filter:realFilter,onPick,team:1-G.team,frontOnly:false};render();return null}
function heroSkillName(heroId,id){return DATA[heroId]?.skills?.find(s=>s.id===id)?.name||id}
function currentLineOrder(team){let arr=G?.teams?.[team]||[],start=G?.front?.[team]||0,out=[];for(let i=0;i<arr.length;i++){let idx=(start+i)%arr.length,h=arr[idx];if(h&&!h.dead&&!h.infested)out.push(h)}return out}
function lineDepthOf(hero){if(!hero||!G)return-1;return currentLineOrder(hero.team).findIndex(x=>x===hero)}
function marsArenaActive(){return !!G&&(G.marsArenaTurns||0)>0&&Number.isInteger(G.marsArenaEnemyTeam)}
function marsArenaCaster(){if(!marsArenaActive())return null;return G.teams?.[G.marsArenaTeam]?.find(h=>h.id===G.marsArenaCasterId&&!h.dead)||null}
function knockToBack(target){if(!target||target.dead||isForgeSpiritTarget(target))return false;let moved=false,guard=0;while(guard++<6){let order=currentLineOrder(target.team),d=order.indexOf(target);if(d<0||d>=order.length-1)break;if(!knockBackOne(target))break;moved=true}return moved}
function marsArenaWallHit(team,previousFront=null){if(!marsArenaActive()||team!==G.marsArenaEnemyTeam)return false;let next=frontHero(team);if(!next||next.dead||next===previousFront)return false;let caster=marsArenaCaster();playMarsWallHitSound();window.playMarsFx?.({kind:'wall-hit',team:caster?.team??(1-next.team),heroId:caster?.id||'mars',targetTeam:next.team,targetId:next.id});if(caster)window.emitNetVfx?.('mars-wall-hit',caster,{targetTeam:next.team,targetId:next.id});addLog(`${logIcon('mars','arena')}<span>${next.name} врезается в стену Arena of Blood и получает 1 магический урон.</span>`);spellDamage(next,1,`${logIcon('mars','arena')} Arena of Blood: `,caster,{impactDelay:120});return true}

function shadowfiendPresencePenalty(target){if(!target||!G||effectImmune(target))return 0;let enemyTeam=1-target.team,enemyLine=currentLineOrder(enemyTeam),sf=enemyLine.find(h=>h.id==='shadowfiend');if(!sf||sf.dead)return 0;let sfDepth=lineDepthOf(sf),targetDepth=lineDepthOf(target);if(sfDepth<0||targetDepth<0)return 0;let affectedCount=Math.max(0,2-sfDepth);return targetDepth<affectedCount?1:0}
function shadowfiendRazeTarget(team,mode){let order=currentLineOrder(team);if(!order.length)return null;if(mode==='near')return order[0]||null;if(mode==='mid')return order[Math.min(1,order.length-1)]||null;if(mode==='far')return order[order.length-1]||null;return null}
function assaultArmorBonus(h){
 if(!G||!h||h.dead)return 0;
 const own=G.teams[h.team].some(x=>!x.dead&&!x.infested&&x.items?.includes('assault'))?1:0;
 const enemy=frontHero(1-h.team);
 return own-(h===frontHero(h.team)&&enemy&&!enemy.dead&&enemy.items?.includes('assault')?1:0);
}
function satanicActive(h){return !!G&&h?.satanicSerial===G.turnSerial&&G.team===h.team&&!h.dead}
function effectImmune(h){return !!h&&!h.dead&&(h.rageTurns||0)>0}
function canReceiveNegativeEffect(h,{piercesImmunity=false}={}){return !!h&&!h.dead&&(!effectImmune(h)||piercesImmunity)}
function dispelNegativeEffects(h,strength='normal'){
 if(!h)return;
 if(h.desolatorTurns>0)h.armor=(Number(h.armor)||0)+2;
 for(const k of ['silence','coldSnapTurns','burnTurns','disarmTurns','tornadoAirborne','tornadoLandingDamage','iceWallTurns','desolatorTurns','actionDebt','tinkerBlindTurns'])h[k]=0;
 h.sleep=false;h.nightmare=false;h.nightmareSkipped=false;h.nightmareCasterId=null;h.nightmareCasterTeam=null;
 // Fiend's Grip is the first strong-dispel-only effect in the prototype.
 if(strength==='strong'||!h.gripped){h.stun=0;h.gripped=false}
 h.itemSilence=null;h.magicDebuff=null;h.sfMarks=[];h.broodBiteTimers=[];
 const idx=G?.teams?.[h.team]?.indexOf(h)??-1;if(idx>=0)G.bombs=G.bombs.filter(b=>!(b.team===h.team&&b.idx===idx));
}
function strongDispel(h){dispelNegativeEffects(h,'strong')}
function rageMagicDamage(n){return 0}
function playSatanicSound(h,noNet=false){playFile(itemAudio,'assets/audio/satanic.mp3');if(!noNet)window.emitNetVfx?.('audio-satanic',h)}
function displayArmorValue(target){return Number(target?.armor||0)-shadowfiendPresencePenalty(target)+assaultArmorBonus(target)}
function physicalBaseDamage(attacker,target,base=effectiveAtk(attacker)){let armor=displayArmorValue(target);return Math.max(0,base-armor)}
function knockBackOne(target){if(isForgeSpiritTarget(target))return false;let arr=G.teams[target.team],idx=arr.indexOf(target);if(idx<0)return false;for(let i=idx+1;i<arr.length;i++){if(!arr[i].dead&&!arr[i].infested){[arr[idx],arr[i]]=[arr[i],arr[idx]];return true}}return false}
function consumeInvokedSpell(h,id){h.invokedSpells=Array.isArray(h.invokedSpells)?h.invokedSpells:[];let i=h.invokedSpells.indexOf(id);if(i>=0)h.invokedSpells.splice(i,1)}
function invokerEffectField(key){return key==='tornado'?'tornadoAirborne':key+'Turns'}
function markInvokerEffect(target,key,turns){let field=invokerEffectField(key);let negativeKeys=new Set(['coldSnap','burn','disarm','tornado','iceWall']);let finalTurns=negativeKeys.has(key)?reducedNegativeTurns(target,turns):turns;target[field]=Math.max(Number(target[field])||0,finalTurns);target[key+'AppliedTurn']=G?.turnSerial||0;return finalTurns}
function processInvokerStartEffects(){if(!G)return;for(const team of G.teams){for(const hero of team){if(!hero.dead){if((hero.burnTurns||0)>0&&hero.burnAppliedTurn!==(G.turnSerial||0))spellDamage(hero,.25,'🔥 Chaos Meteor: ',null,{impactDelay:30});if((hero.ghostWalkTurns||0)>0&&hero.ghostWalkAppliedTurn!==(G.turnSerial||0)){hero.ghostWalkTicks=(hero.ghostWalkTicks||0)+1;if(hero.ghostWalkTicks%3===0)healHero(hero,1,'Ghost Walk')}}let spirit=hero.forgeSpirit;if(isForgeSpiritTarget(spirit)&&(spirit.burnTurns||0)>0&&spirit.burnAppliedTurn!==(G.turnSerial||0))damage(spirit,.25,'🔥 Chaos Meteor: ',null,{impactDelay:30})}}}
function tickInvokerEndEffects(){if(!G)return;const serial=G.turnSerial||0;for(const team of G.teams){for(const hero of team){if(!hero.dead){const tick=(key,onExpire)=>{let field=invokerEffectField(key),applied=key+'AppliedTurn';if((hero[field]||0)>0&&hero[applied]!==serial){hero[field]--;if(hero[field]<=0){hero[field]=0;onExpire?.()}}};tick('coldSnap');tick('burn');tick('disarm');tick('alacrity',()=>{hero.alacrityTurns=0;hero.alacrityAppliedTurn=0});tick('iceWall');tick('ghostWalk',()=>addLog(`👁️ ${hero.name} выходит из Ghost Walk.`));tick('tornado',()=>{let fall=Number(hero.tornadoLandingDamage||0);hero.tornadoLandingDamage=0;if(fall>0&&!hero.dead)spellDamage(hero,fall,'🌪 Tornado: ',null,{impactDelay:40});addLog(`🌪 ${hero.name} приземляется.`)})}if(isForgeSpiritTarget(hero.forgeSpirit)){let spirit=hero.forgeSpirit;const stick=(key,onExpire)=>{let field=invokerEffectField(key),applied=key+'AppliedTurn';if((spirit[field]||0)>0&&spirit[applied]!==serial){spirit[field]--;if(spirit[field]<=0){spirit[field]=0;onExpire?.()}}};stick('coldSnap');stick('burn');stick('disarm');stick('iceWall');stick('tornado',()=>{let fall=Number(spirit.tornadoLandingDamage||0);spirit.tornadoLandingDamage=0;if(fall>0&&isForgeSpiritTarget(spirit))damage(spirit,fall,'🌪 Tornado: ',null,{impactDelay:40})});if(isForgeSpiritTarget(hero.forgeSpirit)&&spirit.appliedTurn!==serial){spirit.turns--;if(spirit.turns<=0){spirit.dead=true;hero.forgeSpirit=null;addLog(`🔥 Forge Spirit у ${hero.name} исчезает.`)}}}}}}
function finishTornadoCombo(target,spellName){if((target.tornadoAirborne||0)>0){target.tornadoAirborne=0;target.tornadoLandingDamage=0;addLog(`🌪 ${spellName} сбивает ${target.name} с Tornado.`);return 1}return 0}
function castInvokedSpell(h,id){if(!G||G.winner!==null||targetMode||!h||h.dead||h.invoking||G.actions<1)return;if(isHeroSilenced(h)){alert('Invoker обезмолвлен и не может использовать заклинания.');return}if((h.cd?.[id]||0)>1)return;const icon=logIcon('invoker',id);function done(){putOnCooldown(h,id);consumeInvokedSpell(h,id);spend()}
if(id==='coldsnap'){chooseEnemy('Выберите цель для Cold Snap',()=>true,t=>{playInvokerSpellCast('coldsnap',h);let dur=markInvokerEffect(t,'coldSnap',3);addLog(`${icon}<span>${h.name} накладывает Cold Snap на ${t.name} на ${dur} общих хода.</span>`);done()});return}
if(id==='emp'){chooseEnemy('Выберите цель для E.M.P',()=>true,t=>{playInvokerSpellCast('emp',h);window.playInvokerFx?.({kind:'invoker-emp',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});window.emitNetVfx?.('invoker-emp',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});spellDamage(t,0.5,`${icon} ${h.name}: `,h,{impactDelay:1380});if(!isForgeSpiritTarget(t)&&canReceiveNegativeEffect(t))Object.keys(t.cd||{}).forEach(k=>{if((t.cd[k]||0)>1&&abilityCd(t,k)>0)t.cd[k]+=1});addLog(`${icon}<span>E.M.P наносит 0.5 урона${isForgeSpiritTarget(t)?'.':` и увеличивает активные КД ${t.name} на 1 ход героя.`}</span>`);done()});return}
if(id==='sunstrike'){chooseEnemyAny('Выберите цель для Sun Strike',()=>true,t=>{playInvokerSpellCast('sunstrike',h);window.playInvokerFx?.({kind:'invoker-sunstrike',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});window.emitNetVfx?.('invoker-sunstrike',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});let bonus=finishTornadoCombo(t,'Sun Strike');pureDamage(t,1+bonus,`${icon} ${h.name}: `,h,{impactDelay:1320});done()},'sunstrike');return}
if(id==='forge'){playInvokerSpellCast('forge',h);h.forgeSpirit={kind:'forgeSpirit',id:`forge_spirit_${h.id}`,ownerId:h.id,team:h.team,name:'FORGE SPIRIT',hp:4,maxHp:4,atk:1,armor:0,turns:4,appliedTurn:G.turnSerial||0,used:false,dead:false,magicDebuff:null,itemSilence:null};addLog(`${icon}<span>${h.name} призывает Forge Spirit: 4 HP, 1 урон, 4 общих хода.</span>`);done();return}
if(id==='icewall'){chooseEnemy('Выберите цель для Ice Wall',()=>true,t=>{playInvokerSpellCast('icewall',h);let summonOwnerId=isForgeSpiritTarget(t)?t.ownerId:null;window.playInvokerFx?.({kind:'invoker-icewall',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId});window.emitNetVfx?.('invoker-icewall',h,{targetTeam:t.team,targetId:t.id,summonOwnerId});let wallTurns=markInvokerEffect(t,'iceWall',1);spellDamage(t,.5,`${icon} ${h.name}: `,h,{impactDelay:420});if(isForgeSpiritTarget(t))t.stunOwnerTurns=Math.max(t.stunOwnerTurns||0,reducedStunTurns(t,1));else t.stun=Math.max(t.stun,reducedStunTurns(t,1));addLog(`${icon}<span>${t.name} оглушён Ice Wall на ${reducedStunTurns(t,1)} ход.${wallTurns>0?` Обморожение: ${wallTurns} ход.`:''}</span>`);done()});return}
if(id==='ghostwalk'){playInvokerSpellCast('ghostwalk',h);markInvokerEffect(h,'ghostWalk',4);h.ghostWalkTicks=0;addLog(`${icon}<span>${h.name} уходит в Ghost Walk на 6 общих ходов.</span>`);done();return}
if(id==='meteor'){chooseEnemy('Выберите цель для Chaos Meteor',()=>true,t=>{playInvokerSpellCast('meteor',h);window.playInvokerFx?.({kind:'invoker-meteor',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});window.emitNetVfx?.('invoker-meteor',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:t.ownerId});let bonus=finishTornadoCombo(t,'Chaos Meteor');spellDamage(t,2+bonus,`${icon} ${h.name}: `,h,{impactDelay:880});for(const enemy of living(1-h.team))markInvokerEffect(enemy,'burn',4);for(const spirit of forgeSpiritTargets(1-h.team))markInvokerEffect(spirit,'burn',4);addLog(`${icon}<span>Chaos Meteor поджигает всю команду противника.</span>`);done()},'meteor');return}
if(id==='tornado'){chooseEnemy('Выберите цель для Tornado',()=>true,t=>{playInvokerSpellCast('tornado',h);let summonOwnerId=isForgeSpiritTarget(t)?t.ownerId:null;window.playInvokerFx?.({kind:'invoker-tornado',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId});window.emitNetVfx?.('invoker-tornado',h,{targetTeam:t.team,targetId:t.id,summonOwnerId});let airTurns=markInvokerEffect(t,'tornado',1);t.tornadoLandingDamage=airTurns>0?.5:0;addLog(`${icon}<span>${t.name} поднят в Tornado на ${airTurns} общий ход.</span>`);done()});return}
if(id==='deafblast'){chooseEnemy('Выберите цель для Deafening Blast',()=>true,t=>{playInvokerSpellCast('deafblast',h);let summonOwnerId=isForgeSpiritTarget(t)?t.ownerId:null;window.playInvokerFx?.({kind:'invoker-deafblast',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId});window.emitNetVfx?.('invoker-deafblast',h,{targetTeam:t.team,targetId:t.id,summonOwnerId});spellDamage(t,1,`${icon} ${h.name}: `,h,{impactDelay:360});let moved=canReceiveNegativeEffect(t)?knockBackOne(t):false,disarmTurns=markInvokerEffect(t,'disarm',3);addLog(`${icon}<span>${t.name} получает 1 урон от Deafening Blast${moved?', отлетает назад на 1 позицию':''} и обезоруживается на ${disarmTurns} общих хода.</span>`);done()});return}
if(id==='alacrity'){chooseAlly('Выберите союзника для Alacrity',()=>true,t=>{playInvokerSpellCast('alacrity',h);window.playInvokerFx?.({kind:'invoker-alacrity',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id});window.emitNetVfx?.('invoker-alacrity',h,{targetTeam:t.team,targetId:t.id});markInvokerEffect(t,'alacrity',4);addLog(`${icon}<span>${t.name} получает Alacrity: +1 урона на 6 общих ходов.</span>`);done()});return}}
function localControlsTeam(team){return !window.DOTA_NET_CONNECTED||window.DOTA_NET_PLAYER===team}
function invokeGame(hero){if(document.getElementById('invoke-overlay')||!localControlsTeam(hero.team))return;hero.turnUsed=hero.turnUsed||{};hero.turnUsed.invoke=true;hero.invoking=true;G.actions=0;render();const overlay=document.createElement('div');overlay.id='invoke-overlay';overlay.tabIndex=0;overlay.innerHTML=`<div class="invoke-panel"><div class="invoke-head"><b>INVOKE</b><span id="invoke-time">3.0</span></div><div class="invoke-ready">Нажми кнопку, когда будешь готов. Отсчёт ещё не идёт.</div><button id="invoke-start" class="invoke-start">НАЧАТЬ КОЛДОВАТЬ</button><div class="invoke-orbs locked"><button data-orb="q" disabled><img src="assets/skills/invoker_quas.png"><span>Q</span></button><button data-orb="w" disabled><img src="assets/skills/invoker_wex.png"><span>W</span></button><button data-orb="e" disabled><img src="assets/skills/invoker_exort.png"><span>E</span></button></div><div class="invoke-seq" id="invoke-seq"></div><div class="invoke-found" id="invoke-found"></div><div class="invoke-tip">После старта — 3 секунды. Q / W / E работают и с клавиатуры, и мышкой.</div></div>`;document.body.appendChild(overlay);setTimeout(()=>overlay.focus(),0);let cur=[],found=[],started=false,timer=null;const timeEl=overlay.querySelector('#invoke-time'),seqEl=overlay.querySelector('#invoke-seq'),foundEl=overlay.querySelector('#invoke-found'),orbBox=overlay.querySelector('.invoke-orbs');function paint(){seqEl.innerHTML=cur.map(ch=>`<span>${ch.toUpperCase()}</span>`).join('');foundEl.innerHTML=found.map(id=>`<div class="invoke-found-spell"><img src="${skillIcon('invoker',id)}"><span>${heroSkillName('invoker',id)}</span></div>`).join('')||'<i>Пока пусто</i>'}
function press(ch){if(!started)return;cur.push(ch);if(cur.length===3){let spell=invokerSpellFromCombo(cur.join(''));if(spell&&!found.includes(spell))found.push(spell);cur=[]}paint()}
function finish(){if(timer)clearInterval(timer);window.removeEventListener('keydown',onKey,true);overlay.remove();hero.invoking=false;hero.invokedSpells=found.slice();G.actions=found.length;addLog(`${logIcon('invoker','invoke')}<span>${hero.name} завершает Invoke: ${found.length?found.map(id=>heroSkillName('invoker',id)).join(', '):'ничего не наколдовано'} • действий: ${found.length}.</span>`);render();if(found.length===0)setTimeout(()=>{if(G&&active()===hero&&!hero.invoking&&G.actions===0)endTurn(false)},350)}
function onKey(e){if(!started)return;let map={KeyQ:'q',KeyW:'w',KeyE:'e'};let k=map[e.code]||({q:'q',w:'w',e:'e','й':'q','ц':'w','у':'e'}[(e.key||'').toLowerCase()]||'');if(k){e.preventDefault();e.stopPropagation();press(k)}}
let lastOrbTouchAt=0;overlay.querySelectorAll('[data-orb]').forEach(btn=>{btn.style.touchAction='manipulation';btn.onclick=()=>{if(Date.now()-lastOrbTouchAt<450)return;press(btn.dataset.orb)};btn.addEventListener('touchend',e=>{if(!started||btn.disabled)return;e.preventDefault();e.stopPropagation();lastOrbTouchAt=Date.now();press(btn.dataset.orb)},{passive:false})});overlay.querySelector('#invoke-start').onclick=()=>{if(started)return;started=true;overlay.querySelector('.invoke-ready').textContent='КОЛДУЙ!';overlay.querySelector('#invoke-start').remove();orbBox.classList.remove('locked');orbBox.querySelectorAll('button').forEach(b=>b.disabled=false);window.addEventListener('keydown',onKey,true);let left=3;timeEl.textContent=left.toFixed(1);timer=setInterval(()=>{left=Math.max(0,left-.05);timeEl.textContent=left.toFixed(1);if(left<=0)finish()},50)};paint()}
function castForgeSpiritAttack(h){if(!isForgeSpiritTarget(h?.forgeSpirit)||h.forgeSpirit.used||(h.forgeSpirit.disarmTurns||0)>0||(h.forgeSpirit.tornadoAirborne||0)>0)return;chooseEnemy('Выберите цель для Forge Spirit',t=>!t.sleep,t=>{let spirit=h.forgeSpirit;t=window.redirectAxeAttack?.(spirit,t)||t;playFile(miscAudio,'assets/audio/forge_spirit_attack.mp3');if(attackMisses(spirit,t)){addLog(`💨 Forge Spirit промахивается по ${t.name}.`)}else{let hit=attackDamageInfo(spirit,t,physicalBaseDamage(spirit,t,spirit.atk),{allowCrit:false});damage(t,hit.damage,`<img class="log-skill-icon" src="assets/skills/invoker_forge.png" alt=""> Forge Spirit${hit.tags.length?` [${hit.tags.join(' • ')}]`:''}: `,h,{impactDelay:580});window.registerAxeBasicHit?.(spirit,t);if(!t.dead){t.armor=(Number(t.armor)||0)-1;addLog(`🔥 Forge Spirit снижает броню ${t.name} до ${t.armor}.`)}}spirit.used=true;render()})}
function updateDraft(){
 $$('.draft-card').forEach(d=>{
  const idx=chosen.indexOf(d.dataset.id), picked=idx>=0;
  d.classList.toggle('selected',picked);
  d.classList.toggle('picked-p1',picked&&draftTeamForPick(idx)===0);
  d.classList.toggle('picked-p2',picked&&draftTeamForPick(idx)===1);
  d.disabled=picked;
 });
 renderDraftSlots();
 const p1=draftTeamHeroes(0),p2=draftTeamHeroes(1),turn=draftTurn();
 if(chosen.length<6){
  const mine=canLocalDraftPick();
  $('#draftStatus').innerHTML=`Игрок 1: <b>${p1.length}/3</b> • Игрок 2: <b>${p2.length}/3</b> • Сейчас выбирает <b>Игрок ${turn+1}</b>${mine?' — ваш пик':''}`;
 }else $('#draftStatus').innerHTML=`Игрок 1: <b>3/3</b> • Игрок 2: <b>3/3</b> • Драфт завершён`;
 $('#startBtn').disabled=chosen.length!==6 || (!window.DOTA_OFFLINE_MODE && Number.isInteger(window.DOTA_NET_PLAYER) && window.DOTA_NET_PLAYER!==0);
 window.syncDraftState?.();
}
const HERO_ICONS={techies:'assets/hero_portraits_v166/techies.png',morphling:'assets/hero_portraits_v166/morphling.png',bane:'assets/hero_portraits_v166/bane.png',silencer:'assets/hero_portraits_v166/silencer.png',shadowfiend:'assets/hero_portraits_v166/shadowfiend.png',lifestealer:'assets/hero_portraits_v166/lifestealer.png',abaddon:'assets/abaddon_icon.png',io:'assets/io_icon.png',tinker:'assets/tinker_icon.png',invoker:'assets/invoker_icon.png',arcwarden:'assets/arcwarden_icon.png',axe:'assets/axe_icon.png',broodmother:'assets/broodmother_icon.png',mars:'assets/turn_mars.png'};
function draftPortraitSrc(id){ if(id==='invoker') return 'assets/invoker.jpg'; if(id==='axe') return 'assets/axe.jpg'; if(id==='broodmother') return 'assets/hero_portraits_v166/broodmother.png'; if(id==='tinker') return 'assets/tinker_draft.png'; if(id==='abaddon') return 'assets/abaddon_portrait.png'; if(id==='mars') return 'assets/mars_draft.png'; return HERO_ICONS[id]||DATA[id]?.img||'' }
function draftSlotPortraitSrc(id){if(id==='invoker')return 'assets/invoker.jpg';if(id==='axe')return 'assets/axe.jpg';if(id==='broodmother')return 'assets/hero_portraits_v166/broodmother.png';if(id==='tinker')return 'assets/tinker_draft.png';if(id==='abaddon')return 'assets/abaddon_portrait.png';if(id==='mars')return 'assets/mars_draft.png';return HERO_ICONS[id]||DATA[id]?.img||''}
function findHero(team,id){return G?.teams?.[team]?.find(h=>h.id===id&&!h.dead)||null}
function tetherTarget(io){return io?.tetherTargetId?findHero(io.team,io.tetherTargetId):null}
function breakTether(io,silent=false){if(!io?.tetherTargetId)return;let ally=tetherTarget(io);if(ally)ally.tetheredBy=null;io.tetherTargetId=null;if(!silent){playSkillSound(io,'break');addLog(`🔗 ${io.name} разрывает связь Tether.`)}}
function abilitySheetHTML(id,useSplash=false){let h=DATA[id],heroArt=(h?.img||HERO_ICONS[id]);return `<div class="ability-head"><img class="ability-hero-icon" src="${heroArt}" alt=""><div><div class="ability-kicker">ГЕРОЙ</div><div class="ability-hero-name">${h.name}</div><div class="ability-base-stats">❤️ ${h.hp} HP · ⚔️ ${h.atk} урона</div></div></div><div class="ability-list">${h.skills.map((sk,i)=>`<section class="ability-row"><img class="ability-icon" src="${skillIcon(id,sk.id)}" alt=""><div class="ability-copy"><div class="ability-name">${sk.name}</div><div class="ability-desc">${sk.desc}</div></div></section>`).join('')}</div>`}
function openHeroPick(id){
 draftPreview=id;$('#heroPickSheet').innerHTML=abilitySheetHTML(id,true);
 let btn=$('#confirmHeroPick'),picked=chosen.includes(id);
 btn.textContent=picked?'ГЕРОЙ УЖЕ ВЫБРАН':(window.DOTA_OFFLINE_MODE?`ВЫБРАТЬ ЗА ИГРОКА ${draftTurn()+1}`:'ВЫБРАТЬ ГЕРОЯ');
 btn.disabled=picked||chosen.length>=6||!canLocalDraftPick();
 $('#heroPickModal').classList.remove('hidden');
}
function closeHeroPick(){draftPreview=null;$('#heroPickModal').classList.add('hidden')}
const DRAFT_ORDER=['techies','morphling','bane','io','tinker','silencer','shadowfiend','lifestealer','abaddon','invoker','arcwarden','axe','broodmother','mars'];
function draft(){
 const box=$('#draftCards');box.innerHTML='';
 DRAFT_ORDER.filter(id=>DATA[id]).forEach(id=>{let h=DATA[id],d=document.createElement('button');d.className='draft-card';d.dataset.id=id;let mp=Number.isInteger(window.DOTA_NET_PLAYER)?window.DOTA_NET_PLAYER:0;d.innerHTML=`<img src="${draftPortraitSrc(id)}" alt="${h.name}"><div class="draft-card-name">${h.name}</div><div class="draft-mastery-host">${window.DotaProfile?.masteryBadgeHTML?.(mp,id,true)||''}</div>`;d.onclick=()=>openHeroPick(id);box.appendChild(d)});
 updateDraft()
}
window.refreshMasteryUI=function(){
 try{
  let mp=Number.isInteger(window.DOTA_NET_PLAYER)?window.DOTA_NET_PLAYER:0;
  document.querySelectorAll('#draftCards .draft-card[data-id]').forEach(d=>{let id=d.dataset.id,host=d.querySelector('.draft-mastery-host');if(host)host.innerHTML=window.DotaProfile?.masteryBadgeHTML?.(mp,id,true)||''});
  document.querySelectorAll('.draft-slot.filled[data-hero]').forEach(slot=>{let team=Number(slot.dataset.team),id=slot.dataset.hero,host=slot.querySelector('.draft-mastery-host');if(host)host.innerHTML=window.DotaProfile?.masteryBadgeHTML?.(team,id,true)||''});
  if(G){for(let t=0;t<2;t++)for(const h of G.teams[t]||[]){let node=document.getElementById(`hero-${t}-${h.id}`),host=node?.querySelector('.hero-mastery-slot');if(host)host.innerHTML=window.DotaProfile?.masteryBadgeHTML?.(t,h.id,true)||''}}
 }catch{}
};
function mkHero(id,team){let d=DATA[id],portrait=(id==='broodmother'?'assets/portraits/broodmother.webm':(d.staticPortrait||`assets/portraits/${id}.webm`));return{id,team,name:d.name,img:d.img,portrait,staticPortrait:!!d.staticPortrait,maxHp:d.hp,hp:d.hp,atk:d.atk,baseAtk:d.atk,armor:0,morphShiftArmor:0,dead:false,stun:0,sleep:false,nightmare:false,nightmareSkipped:false,silence:0,cd:{},itemCd:{},items:[],magicDebuff:null,itemSilence:null,actionDebt:0,sfMarks:[],sfKills:0,kills:0,gripped:false,infested:false,infestHost:null,infestTurns:0,turnUsed:{},tetherTargetId:null,tetheredBy:null,spirits:0,spiritsTurns:0,spiritTimers:[],alacrityTurns:0,coldSnapTurns:0,burnTurns:0,disarmTurns:0,ghostWalkTurns:0,ghostWalkTicks:0,tornadoAirborne:0,tornadoLandingDamage:0,invokedSpells:[],forgeSpirit:null,invoking:false,desolatorTurns:0,itemHpBonus:0,broodHungerTurns:0,broodHungerImmediate:false,broodHungerAppliedTurn:0,broodEggTurns:0,broodlingTimers:[],broodlingHp:[],broodBiteTimers:[],tinkerBlindTurns:0,morphRepeatPct:0,rageTurns:0,rageAppliedTurn:0,tinkerMatrixShield:false,tinkerMatrixShieldTurns:0,tinkerMatrixShieldAppliedTurn:0,tinkerMatrixBoostTurns:0,tinkerMatrixBoostAppliedTurn:0,nightmareCasterId:null,nightmareCasterTeam:null,pipeShield:0,pipeShieldTurns:0,pipeShieldAppliedTurn:0,aphoticShield:0,borrowedTimeTurns:0,borrowedTimeAppliedTurn:0,skadiTurns:0,skadiAppliedTurn:0,marsArenaTurns:0,marsArenaAppliedTurn:0}}
function clearBattlefield(){window.clearPhantomFx?.();window.clearKillFeed?.();window.clearCombatFx?.();['#team0','#team1'].forEach(sel=>{let box=$(sel);if(box){box.querySelectorAll("video").forEach(v=>{v.onpause=null;v.pause();v.removeAttribute("src");v.load()});box.replaceChildren()}});let q=$('#turnQueue');if(q)q.innerHTML='';let log=$('#log');if(log)log.innerHTML='';let effects=$('#effects');if(effects)effects.innerHTML=''}
let matchAssetWarmKey='',matchAssetWarmPromise=null,matchPreloadHost=null;
const matchPreloadImages=new Map(),matchPreloadVideos=new Map(),matchPreloadAudios=new Map();
const decodedMatchAudio=new Map(),decodedMatchAudioJobs=new Map();
let allGameAssetWarmPromise=null;
function audioCacheKey(src){return String(src||'').split('?')[0]}
function ensureDotaAudioContext(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;
    window.__dotaAudioCtx=window.__dotaAudioCtx||new AC();
    return window.__dotaAudioCtx;
  }catch(_){return null}
}
function decodeMatchAudioBuffer(url,arrayBuffer){
  const key=audioCacheKey(url);if(!key||decodedMatchAudio.has(key))return Promise.resolve(decodedMatchAudio.get(key)||null);
  if(decodedMatchAudioJobs.has(key))return decodedMatchAudioJobs.get(key);
  const ctx=ensureDotaAudioContext();if(!ctx)return Promise.resolve(null);
  const job=Promise.resolve().then(()=>ctx.decodeAudioData(arrayBuffer.slice(0))).then(buf=>{decodedMatchAudio.set(key,buf);return buf}).catch(()=>null).finally(()=>decodedMatchAudioJobs.delete(key));
  decodedMatchAudioJobs.set(key,job);return job;
}
function warmDecodedMatchAudio(url){
  const key=audioCacheKey(url);if(!key||decodedMatchAudio.has(key))return Promise.resolve(decodedMatchAudio.get(key)||null);
  if(decodedMatchAudioJobs.has(key))return decodedMatchAudioJobs.get(key);
  return fetch(key,{cache:'force-cache'}).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(ab=>decodeMatchAudioBuffer(key,ab)).catch(()=>null);
}
function playDecodedMatchAudio(channel,src){
  const key=audioCacheKey(src),buf=decodedMatchAudio.get(key),ctx=ensureDotaAudioContext();
  if(!buf||!ctx||ctx.state!=='running')return false;
  try{
    if(channel.__dotaBufferSource){try{channel.__dotaBufferSource.stop()}catch(_){}}
    const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buf;gain.gain.value=Math.max(0,Number(channel?.volume??.72));source.connect(gain);gain.connect(ctx.destination);source.start(0);channel.__dotaBufferSource=source;source.onended=()=>{if(channel.__dotaBufferSource===source)channel.__dotaBufferSource=null};return true;
  }catch(_){return false}
}
window.DotaAudioCache={warm:warmDecodedMatchAudio,resume:()=>{const c=ensureDotaAudioContext();return c?.resume?.()}};

const MATCH_AUDIO_INDEX={"bane":["assets/audio/bane_attack.mp3","assets/audio/bane_skill1.mp3","assets/audio/bane_skill2.mp3","assets/audio/bane_turn1.mp3","assets/audio/bane_turn2.mp3"],"techies":["assets/audio/techies_attack.mp3","assets/audio/techies_mine_approach.mp3","assets/audio/techies_mine_explode.mp3","assets/audio/techies_mine_place.mp3","assets/audio/techies_skill1.mp3","assets/audio/techies_skill2.mp3","assets/audio/techies_turn1.mp3","assets/audio/techies_turn2.mp3"],"morphling":["assets/audio/morphling_attack.mp3","assets/audio/morphling_skill1.mp3","assets/audio/morphling_skill2.mp3","assets/audio/morphling_skill3.mp3","assets/audio/morphling_turn1.mp3","assets/audio/morphling_turn2.mp3"],"silencer":["assets/audio/silencer_attack.mp3","assets/audio/silencer_skill1.mp3","assets/audio/silencer_skill2.mp3","assets/audio/silencer_turn1.mp3","assets/audio/silencer_turn2.mp3"],"shadowfiend":["assets/audio/shadowfiend_attack.mp3","assets/audio/shadowfiend_raze_voice1.mp3","assets/audio/shadowfiend_raze_voice2.mp3","assets/audio/shadowfiend_skill1.mp3","assets/audio/shadowfiend_skill2.mp3","assets/audio/shadowfiend_turn1.mp3","assets/audio/shadowfiend_turn2.mp3"],"lifestealer":["assets/audio/lifestealer_attack.mp3","assets/audio/lifestealer_rage.mp3","assets/audio/lifestealer_skill2.mp3","assets/audio/lifestealer_turn1.mp3","assets/audio/lifestealer_turn2.mp3"],"io":["assets/audio/io_attack_impact.mp3","assets/audio/io_attack_launch.mp3","assets/audio/io_attack_pre.mp3","assets/audio/io_spawn.mp3","assets/audio/io_spirit_hit.mp3","assets/audio/io_spirits_cast.mp3","assets/audio/io_tether_attach.mp3","assets/audio/io_tether_break.mp3"],"tinker":["assets/audio/heat_seeking_missile_target.mp3","assets/audio/tinker_defense_matrix.mp3","assets/audio/tinker_heat_missile.mp3","assets/audio/tinker_heat_missile_target.mp3","assets/audio/tinker_kill_11.mp3","assets/audio/tinker_laser.mp3","assets/audio/tinker_laser_impact.mp3","assets/audio/tinker_projectile_launch.mp3","assets/audio/tinker_rearm_fx.mp3","assets/audio/tinker_spawn_01.mp3","assets/audio/tinker_spawn_04.mp3","assets/audio/tinker_voice_laser_01.mp3","assets/audio/tinker_voice_laser_04.mp3","assets/audio/tinker_voice_missile_01.mp3","assets/audio/tinker_voice_missile_05.mp3","assets/audio/tinker_voice_rearm_01.mp3","assets/audio/tinker_voice_rearm_09.mp3"],"invoker":["assets/audio/forge_spirit_attack.mp3","assets/audio/invoker_alacrity.mp3","assets/audio/invoker_attack.mp3","assets/audio/invoker_chaos_meteor.mp3","assets/audio/invoker_cold_snap.mp3","assets/audio/invoker_deafening_blast.mp3","assets/audio/invoker_emp.mp3","assets/audio/invoker_forge_spirit.mp3","assets/audio/invoker_ghost_walk.mp3","assets/audio/invoker_ice_wall.mp3","assets/audio/invoker_invoke.mp3","assets/audio/invoker_kill_01.mp3","assets/audio/invoker_kill_05.mp3","assets/audio/invoker_kill_laugh_05.mp3","assets/audio/invoker_spawn_02.mp3","assets/audio/invoker_spawn_04.mp3","assets/audio/invoker_sun_strike.mp3","assets/audio/invoker_tornado.mp3","assets/audio/invoker_voice_alacrity_1.mp3","assets/audio/invoker_voice_alacrity_2.mp3","assets/audio/invoker_voice_chaos_meteor_1.mp3","assets/audio/invoker_voice_chaos_meteor_2.mp3","assets/audio/invoker_voice_cold_snap_1.mp3","assets/audio/invoker_voice_deafening_blast_1.mp3","assets/audio/invoker_voice_deafening_blast_2.mp3","assets/audio/invoker_voice_emp_1.mp3","assets/audio/invoker_voice_emp_2.mp3","assets/audio/invoker_voice_forge_spirit_1.mp3","assets/audio/invoker_voice_forge_spirit_2.mp3","assets/audio/invoker_voice_ghost_walk_1.mp3","assets/audio/invoker_voice_ghost_walk_2.mp3","assets/audio/invoker_voice_ice_wall_1.mp3","assets/audio/invoker_voice_sun_strike_1.mp3","assets/audio/invoker_voice_tornado_1.mp3","assets/audio/invoker_voice_tornado_2.mp3"],"broodmother":["assets/audio/broodmother_attack_combo.mp3","assets/audio/broodmother_hunger_cast.mp3","assets/audio/broodmother_hunger_voice_02.mp3","assets/audio/broodmother_kill_01.mp3","assets/audio/broodmother_kill_03.mp3","assets/audio/broodmother_kill_11.mp3","assets/audio/broodmother_spawn_cast.mp3","assets/audio/broodmother_spawn_voice_03.mp3","assets/audio/broodmother_spawn_voice_04.mp3","assets/audio/broodmother_spawn_voice_05.mp3","assets/audio/broodmother_spider_death.mp3","assets/audio/broodmother_turn_attack_10.mp3","assets/audio/broodmother_turn_hunger_03.mp3","assets/audio/broodmother_turn_spawn_01.mp3"],"abaddon":["assets/audio/abaddon_attack_combo.mp3","assets/audio/abaddon_kill_06.mp3","assets/audio/abaddon_kill_09.mp3","assets/audio/abaddon_rival_axe_14.mp3","assets/audio/abaddon_rival_bane_12.mp3","assets/audio/abaddon_rival_silencer_09.mp3","assets/audio/abaddon_turn_levelup_01.mp3","assets/audio/abaddon_turn_spawn_02.mp3","assets/audio/abaddon_voice_aphotic_shield_01.mp3","assets/audio/abaddon_voice_aphotic_shield_05.mp3","assets/audio/abaddon_voice_borrowed_time_02.mp3","assets/audio/abaddon_voice_borrowed_time_07.mp3","assets/audio/abaddon_voice_mist_coil_02.mp3","assets/audio/abaddon_voice_mist_coil_06.mp3","assets/audio/aphotic_shield_cast.mp3","assets/audio/borrowed_time_cast.mp3","assets/audio/mist_coil_cast.mp3"],"mars":["assets/audio/mars_arena_blood.mp3","assets/audio/mars_arena_combo.mp3","assets/audio/mars_arena_start.mp3","assets/audio/mars_attack02.mp3","assets/audio/mars_attack_combo.mp3","assets/audio/mars_kill_01.mp3","assets/audio/mars_kill_12.mp3","assets/audio/mars_large_blade_whoosh.mp3","assets/audio/mars_rebuke.mp3","assets/audio/mars_rival_abaddon.mp3","assets/audio/mars_rival_arcwarden.mp3","assets/audio/mars_rival_axe.mp3","assets/audio/mars_rival_bane.mp3","assets/audio/mars_rival_lifestealer.mp3","assets/audio/mars_spear_cast.mp3","assets/audio/mars_spear_target.mp3","assets/audio/mars_turn_01.mp3","assets/audio/mars_turn_02.mp3","assets/audio/mars_turn_03.mp3","assets/audio/mars_voice_arena_06.mp3","assets/audio/mars_voice_arena_09.mp3","assets/audio/mars_voice_rebuke_01.mp3","assets/audio/mars_voice_rebuke_02.mp3","assets/audio/mars_voice_spear_01.mp3","assets/audio/mars_voice_spear_02.mp3","assets/audio/mars_wall_hit.mp3"],"axe":["assets/audio/axe_attack1.mp3","assets/audio/axe_berserk_voice1.mp3","assets/audio/axe_berserk_voice2.mp3","assets/audio/axe_berserkers_call.mp3","assets/audio/axe_counter_helix.mp3","assets/audio/axe_culling_blade.mp3","assets/audio/axe_culling_blade_fail.mp3","assets/audio/axe_deny_15.mp3","assets/audio/axe_kill_01.mp3","assets/audio/axe_kill_07.mp3","assets/audio/axe_preattack1.mp3","assets/audio/axe_turn1.mp3","assets/audio/axe_turn2.mp3"],"phantomlancer":["assets/audio/phantomlancer_attack.mp3","assets/audio/phantomlancer_death.mp3","assets/audio/phantomlancer_lance.mp3","assets/audio/phantomlancer_laugh.mp3","assets/audio/phantomlancer_spawn.mp3","assets/audio/phantomlancer_turn1.mp3","assets/audio/phantomlancer_turn2.mp3"],"pudge":["assets/audio/pudge_attack_combo.mp3","assets/audio/pudge_battlebegins_01.mp3","assets/audio/pudge_dismember.mp3","assets/audio/pudge_item_heart_04.mp3","assets/audio/pudge_kill_07.mp3","assets/audio/pudge_laugh_05.mp3","assets/audio/pudge_meat_hook.mp3","assets/audio/pudge_rival_silencer_12.mp3","assets/audio/pudge_rot_loop.mp3","assets/audio/pudge_spawn_01.mp3","assets/audio/pudge_spawn_06.mp3","assets/audio/pudge_voice_dismember_02.mp3","assets/audio/pudge_voice_dismember_03.mp3","assets/audio/pudge_voice_dismember_12.mp3","assets/audio/pudge_voice_hook_01.mp3","assets/audio/pudge_voice_hook_02.mp3","assets/audio/pudge_voice_hook_10.mp3","assets/audio/pudge_voice_rot_07.mp3","assets/audio/pudge_voice_rot_10.mp3"],"arcwarden":["assets/audio/arcwarden_attack_hit.mp3","assets/audio/arcwarden_attack_launch.mp3","assets/audio/arcwarden_attack_pre.mp3","assets/audio/arcwarden_battlebegins_03.mp3","assets/audio/arcwarden_field_voice_01.mp3","assets/audio/arcwarden_field_voice_05.mp3","assets/audio/arcwarden_kill_01.mp3","assets/audio/arcwarden_kill_11.mp3","assets/audio/arcwarden_laugh_02.mp3","assets/audio/arcwarden_magnetic_field.mp3","assets/audio/arcwarden_spark_voice_01.mp3","assets/audio/arcwarden_spark_voice_07.mp3","assets/audio/arcwarden_spark_wraith.mp3","assets/audio/arcwarden_spark_wraith_target.mp3","assets/audio/arcwarden_spawn_01.mp3","assets/audio/arcwarden_spawn_02.mp3","assets/audio/arcwarden_tempest_01.mp3","assets/audio/arcwarden_tempest_02.mp3","assets/audio/arcwarden_tempest_double.mp3","assets/audio/arcwarden_tempest_end_01.mp3","assets/audio/arcwarden_tempest_killed_01.mp3"],"enigma":["assets/audio/enigma_attack_impact.mp3","assets/audio/enigma_attack_launch.mp3","assets/audio/enigma_attack_pre.mp3","assets/audio/enigma_black_hole_cast.mp3","assets/audio/enigma_kill_01_ru.mp3","assets/audio/enigma_kill_05_ru.mp3","assets/audio/enigma_kill_09_ru.mp3","assets/audio/enigma_killspecial_01_ru.mp3","assets/audio/enigma_midnight_pulse_cast.mp3","assets/audio/enigma_move_13_ru.mp3","assets/audio/enigma_rival_14_ru.mp3","assets/audio/enigma_rival_15_ru.mp3","assets/audio/enigma_rival_16_ru.mp3","assets/audio/enigma_rival_17_ru.mp3","assets/audio/enigma_spawn_06_ru.mp3"]};
function battlePortraitSrcFor(id){
  const d=DATA[id]||{};
  if(d.staticPortrait)return d.img||d.portrait||'';
  return id==='broodmother'?'assets/portraits/broodmother.webm':`assets/portraits/${id}.webm`;
}
function ensureMatchPreloadHost(){
  if(matchPreloadHost?.isConnected)return matchPreloadHost;
  matchPreloadHost=document.createElement('div');
  matchPreloadHost.className='match-preload-cache';
  matchPreloadHost.setAttribute('aria-hidden','true');
  matchPreloadHost.style.cssText='position:fixed;left:-10000px;top:0;width:4px;height:4px;overflow:hidden;opacity:.001;pointer-events:none;z-index:-1';
  document.body.appendChild(matchPreloadHost);
  return matchPreloadHost;
}
function clearMatchPreloadCache(){
  for(const v of matchPreloadVideos.values()){try{v.pause();v.removeAttribute('src');v.load();v.remove()}catch(_){}}
  for(const a of matchPreloadAudios.values()){try{a.pause();a.removeAttribute('src');a.load();a.remove()}catch(_){}}
  matchPreloadImages.clear();matchPreloadVideos.clear();matchPreloadAudios.clear();
  matchPreloadHost?.remove();matchPreloadHost=null;
}
function pruneMatchPreloadCacheForBattle(){
  for(const [url,v] of [...matchPreloadVideos.entries()]){
    try{v.pause();v.removeAttribute('src');v.load();v.remove()}catch(_){}
    matchPreloadVideos.delete(url);
  }
  for(const [url,a] of [...matchPreloadAudios.entries()]){
    try{a.pause();a.removeAttribute('src');a.load();a.remove()}catch(_){}
    matchPreloadAudios.delete(url);
  }
  matchPreloadImages.clear();
}
function preloadMatchImage(url){
  if(!url)return Promise.resolve();
  if(matchPreloadImages.has(url)){
    const img=matchPreloadImages.get(url);
    if(img.complete&&img.naturalWidth)return img.decode?.().catch(()=>{})||Promise.resolve();
    return new Promise(resolve=>{const done=()=>resolve();img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});setTimeout(done,6000)});
  }
  return new Promise(resolve=>{
    const img=new Image(),done=()=>{try{img.decode?.().catch(()=>{})}catch(_){}resolve()};
    matchPreloadImages.set(url,img);img.decoding='async';img.loading='eager';img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});img.src=url;
    if(img.complete)done();
  });
}
function preloadMatchVideo(url){
  if(!url)return Promise.resolve();
  if(matchPreloadVideos.has(url)){
    const v=matchPreloadVideos.get(url);
    return v.readyState>=3?Promise.resolve():new Promise(resolve=>{const done=()=>resolve();v.addEventListener('canplay',done,{once:true});v.addEventListener('error',done,{once:true});setTimeout(done,9000)});
  }
  return new Promise(resolve=>{
    const host=ensureMatchPreloadHost(),v=document.createElement('video');let settled=false;
    matchPreloadVideos.set(url,v);
    v.muted=true;v.defaultMuted=true;v.playsInline=true;v.preload='auto';v.loop=true;
    v.style.cssText='position:absolute;width:2px;height:2px;opacity:.001;pointer-events:none';
    const done=()=>{
      if(settled)return;settled=true;clearTimeout(timer);
      // Force the first frames through the decoder, then keep the media element alive
      // so iOS/Safari does not throw the buffer away before the battle opens.
      try{
        const p=v.play();
        if(p?.then)p.then(()=>{try{v.pause();v.currentTime=0}catch(_){} }).catch(()=>{});
      }catch(_){}
      resolve();
    };
    v.addEventListener('canplaythrough',done,{once:true});
    v.addEventListener('canplay',done,{once:true});
    v.addEventListener('loadeddata',()=>{if(v.readyState>=3)done()},{once:true});
    v.addEventListener('error',done,{once:true});
    host.appendChild(v);v.src=url;try{v.load()}catch(_){}
    const timer=setTimeout(done,12000);
  });
}
function preloadMatchAudio(url){
  if(!url)return Promise.resolve();
  if(matchPreloadAudios.has(url)){
    const a=matchPreloadAudios.get(url);
    return a.readyState>=3?Promise.resolve():new Promise(resolve=>{const done=()=>resolve();a.addEventListener('canplaythrough',done,{once:true});a.addEventListener('error',done,{once:true});setTimeout(done,8000)});
  }
  return new Promise(resolve=>{
    const host=ensureMatchPreloadHost(),a=document.createElement('audio');let settled=false;
    matchPreloadAudios.set(url,a);a.preload='auto';a.muted=true;
    const done=()=>{if(settled)return;settled=true;clearTimeout(timer);resolve()};
    a.addEventListener('canplaythrough',done,{once:true});
    a.addEventListener('canplay',done,{once:true});
    a.addEventListener('loadeddata',()=>{if(a.readyState>=3)done()},{once:true});
    a.addEventListener('error',done,{once:true});
    host.appendChild(a);a.src=url;try{a.load()}catch(_){}
    // Keep the network response cached and decode selected-match sounds now, not on first cast.
    fetch(audioCacheKey(url),{cache:'force-cache'}).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(ab=>Promise.allSettled([decodeMatchAudioBuffer(url,ab),Promise.resolve()])).then(done).catch(()=>{});
    const timer=setTimeout(done,10000);
  });
}
function selectedMatchAudioUrls(ids){
  const urls=new Set(['assets/audio/background_music.mp3']);
  const collect=v=>{
    if(!v)return;
    if(typeof v==='string'&&v.startsWith('assets/audio/'))urls.add(v);
    else if(Array.isArray(v))v.forEach(collect);
    else if(typeof v==='object')Object.values(v).forEach(collect);
  };
  for(const id of ids){
    collect(AUDIO[id]);
    collect(ATTACK_AUDIO[id]);
    for(const src of MATCH_AUDIO_INDEX[id]||[])urls.add(src);
    if(id==='io')collect(IO_ATTACK_AUDIO);
  }
  return [...urls];
}
function unlockMatchAudio(){
  // Must run synchronously from the "Начать бой" tap on iOS.
  const probe=selectedMatchAudioUrls([...new Set(chosen)].filter(Boolean))[0]||'assets/audio/background_music.mp3';
  const channels=[sfxAudio,voiceAudio,abilityVoiceAudio,mineAudio,attackAudio,itemAudio,miscAudio,matrixAudio,bgmAudio];
  for(const a of channels){
    try{
      const oldVol=a.volume,oldMuted=a.muted;
      a.volume=0;a.muted=false;
      if(!a.src)a.src=probe;
      a.preload='auto';a.load();
      const p=a.play();
      if(p?.then)p.then(()=>{try{a.pause();a.currentTime=0;a.volume=oldVol;a.muted=oldMuted}catch(_){}}).catch(()=>{a.volume=oldVol;a.muted=oldMuted});
      else{a.pause();a.currentTime=0;a.volume=oldVol;a.muted=oldMuted}
    }catch(_){}
  }
  try{
    const ctx=ensureDotaAudioContext();
    if(ctx){
      ctx.resume?.();
      const b=ctx.createBuffer(1,1,22050),s=ctx.createBufferSource();s.buffer=b;s.connect(ctx.destination);s.start(0);
    }
  }catch(_){}
}
function warmChosenBattleAssets(showOverlay=false){
  const ids=[...new Set(chosen)].filter(Boolean),key=ids.join('|');
  if(key!==matchAssetWarmKey||!matchAssetWarmPromise){
    // Keep already warmed media alive for the whole page session. New draft picks
    // only add missing assets instead of throwing away decoded portraits/audio.
    matchAssetWarmKey=key;
    const tasks=[];
    for(const id of ids){
      const d=DATA[id]||{};
      tasks.push(preloadMatchImage(d.img||draftPortraitSrc(id)||''));
      tasks.push(preloadMatchVideo(battlePortraitSrcFor(id)));if(id==='arcwarden')tasks.push(preloadMatchVideo('assets/portraits/arcwarden_clone.webm'));
      for(const sk of d.skills||[]){const icon=skillIcon(id,sk.id);if(icon)tasks.push(preloadMatchImage(icon))}
    }
    tasks.push((async()=>{for(const src of selectedMatchAudioUrls(ids))await preloadMatchAudio(src)})());
    matchAssetWarmPromise=Promise.allSettled(tasks);
  }
  if(!showOverlay)return matchAssetWarmPromise;
  let overlay=document.getElementById('matchPrepOverlay');
  if(!overlay){overlay=document.createElement('div');overlay.id='matchPrepOverlay';overlay.className='match-prep-overlay';overlay.innerHTML='<div class="match-prep-box"><b>ПОДГОТОВКА МАТЧА</b><span>Загружаю портреты, анимации и звуки…</span><i><em></em></i></div>';document.body.appendChild(overlay)}
  overlay.classList.add('show');
  const bar=overlay.querySelector('em'),copy=overlay.querySelector('span');let pct=8;
  bar.style.width=pct+'%';
  const tick=setInterval(()=>{pct=Math.min(94,pct+Math.max(.7,(95-pct)*.055));bar.style.width=pct+'%'},100);
  const started=Date.now();
  return Promise.resolve(matchAssetWarmPromise).catch(()=>{}).then(()=>new Promise(r=>setTimeout(r,Math.max(0,500-(Date.now()-started))))).finally(()=>{
    clearInterval(tick);bar.style.width='100%';copy.textContent='Готово';
    setTimeout(()=>{overlay.classList.remove('show');setTimeout(()=>overlay.remove(),180)},100);
  });
}
function gameplayAudioUrls(){
  const urls=new Set(['assets/audio/background_music.mp3']);
  const collect=v=>{if(!v)return;if(typeof v==='string'&&v.startsWith('assets/audio/'))urls.add(audioCacheKey(v));else if(Array.isArray(v))v.forEach(collect);else if(typeof v==='object')Object.values(v).forEach(collect)};
  Object.values(MATCH_AUDIO_INDEX).forEach(collect);collect(AUDIO);collect(ATTACK_AUDIO);collect(IO_ATTACK_AUDIO);
  return [...urls];
}
function warmAudioNetworkOnly(url){return fetch(audioCacheKey(url),{cache:'force-cache'}).then(r=>r.ok?r.blob():null).catch(()=>null)}
function warmVideoNetworkOnly(url){return fetch(url,{cache:'force-cache'}).then(r=>r.ok?r.blob():null).catch(()=>null)}
function warmAllGameAssets(onProgress){
  if(allGameAssetWarmPromise)return allGameAssetWarmPromise;
  const ids=[...new Set([...DRAFT_ORDER,...Object.keys(DATA)])].filter(id=>DATA[id]);
  const jobs=[];
  for(const id of ids){
    const d=DATA[id]||{};
    jobs.push(()=>preloadMatchImage(d.img||draftPortraitSrc(id)||''));
    jobs.push(()=>warmVideoNetworkOnly(battlePortraitSrcFor(id)));
    for(const sk of d.skills||[]){const icon=skillIcon(id,sk.id);if(icon)jobs.push(()=>preloadMatchImage(icon))}
  }
  ['assets/portraits/forge_spirit.webm','assets/portraits/spiderling.webm','assets/portraits/arcwarden_clone.webm','assets/portraits/phantomlancer_illusion.webm'].forEach(url=>jobs.push(()=>warmVideoNetworkOnly(url)));
  gameplayAudioUrls().forEach(url=>jobs.push(()=>warmAudioNetworkOnly(url)));
  let done=0;const total=Math.max(1,jobs.length),q=[...jobs];
  const report=()=>{try{onProgress?.(Math.round(done/total*100),done,total)}catch(_){}};
  const worker=async()=>{while(q.length){const job=q.shift();try{await job()}catch(_){}done++;report()}};
  report();allGameAssetWarmPromise=Promise.all(Array.from({length:(window.innerHeight<=700?4:8)},worker)).then(()=>{report();return true});return allGameAssetWarmPromise;
}
window.DotaWarmAllGameAssets=warmAllGameAssets;
function resumeGameAudioFromGesture(){try{ensureDotaAudioContext()?.resume?.()}catch(_){}}
window.addEventListener('pointerdown',resumeGameAudioFromGesture,{once:true,capture:true});
window.addEventListener('touchstart',resumeGameAudioFromGesture,{once:true,capture:true,passive:true});
window.addEventListener('keydown',resumeGameAudioFromGesture,{once:true,capture:true});

async function start(){if(chosen.length!==6){alert('Сначала завершите драфт: по 3 героя каждому игроку.');return}unlockMatchAudio();ensureMusic();clearBattlefield();let p1=draftTeamHeroes(0),p2=draftTeamHeroes(1);G={matchId:Date.now()+Math.random(),teams:[p1.map(x=>mkHero(x,0)),p2.map(x=>mkHero(x,1))],front:[0,0],team:0,actions:2,attackUsed:false,round:0,bombs:[],mines:[false,false],gold:[0,0],teamTurns:[0,0],winner:null,log:[],holdFrontOnce:[false,false],turnSerial:0,firstBloodDone:false,marsArenaTurns:0,marsArenaAppliedTurn:0,marsArenaTeam:null,marsArenaEnemyTeam:null,marsArenaCasterId:null,enigmaBlackHoleTurns:0,enigmaBlackHoleTeam:null,enigmaBlackHoleEnemyTeam:null,enigmaBlackHoleCasterId:null,enigmaBlackHoleAnimatingUntil:0};$('#draft').classList.add('hidden');$('#game').classList.remove('hidden');document.documentElement.classList.add('game-running');document.body.classList.add('game-running');try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch(_){window.scrollTo(0,0)};beginActivation();const refit=()=>{try{document.body.offsetHeight;window.dispatchEvent(new Event('resize'));render()}catch(_){}};requestAnimationFrame(()=>requestAnimationFrame(refit));setTimeout(refit,120);setTimeout(refit,420);setTimeout(()=>{try{pruneMatchPreloadCacheForBattle()}catch(_){}},1600)}
function living(team){return G.teams[team].filter(h=>!h.dead&&!h.infested)}
function active(team=G.team){let arr=G.teams[team],start=G.front[team];for(let i=0;i<arr.length;i++){let idx=(start+i)%arr.length;if(!arr[idx].dead&&!arr[idx].infested){G.front[team]=idx;return arr[idx]}}return null}
function frontHero(team){return active(team)}
function enemyHeroes(){let h=frontHero(1-G.team);return h&&!h.dead?[h]:[]}
function logIcon(heroId,skillId){let src=skillIcon(heroId,skillId);return src?`<img class=\"log-skill-icon\" src=\"${src}\" alt=\"\">`:''}
function addLog(t){G.log.unshift(t);G.log=G.log.slice(0,30)}
function addSkillLog(h,id,text){addLog(`${logIcon(h.id,id)}<span>${text}</span>`) }
function abilityCd(h,id){let s=DATA[h.id].skills.find(x=>x.id===id);return s?.cd??(DATA[h.id].skills.findIndex(x=>x.id===id)===0?1:2)}
function putOnCooldown(h,id){let n=abilityCd(h,id);if(n<=0)return;let extra=((h.id==='invoker'||h.id==='bane')?2:1)+(h.id==='phantomlancer'&&id==='lance'?1:0);if(h.id==='shadowfiend'&&['raze_near','raze_mid','raze_far'].includes(id))extra=2;h.cd[id]=n+extra}
function ensureItemState(){if(!G)return;G.gold=Array.isArray(G.gold)?G.gold:[0,0];G.teamTurns=Array.isArray(G.teamTurns)?G.teamTurns:[0,0];if(G.firstBloodDone===undefined)G.firstBloodDone=false;for(const team of G.teams||[])for(const h of team){h.items=Array.isArray(h.items)?h.items:[];h.itemCd=h.itemCd||{};if(h.magicDebuff===undefined)h.magicDebuff=null;if(h.itemSilence===undefined)h.itemSilence=null;if(h.desolatorTurns===undefined)h.desolatorTurns=0;if(h.itemHpBonus===undefined)h.itemHpBonus=0;if(h.broodHungerTurns===undefined)h.broodHungerTurns=0;if(h.broodHungerImmediate===undefined)h.broodHungerImmediate=false;if(h.broodHungerAppliedTurn===undefined)h.broodHungerAppliedTurn=0;if(h.broodEggTurns===undefined)h.broodEggTurns=0;if(!Array.isArray(h.broodlingTimers))h.broodlingTimers=[];if(!Array.isArray(h.broodlingHp))h.broodlingHp=(h.broodlingTimers||[]).map(()=>2);if(h.broodlingHp.length<h.broodlingTimers.length)h.broodlingHp=h.broodlingHp.concat(Array.from({length:h.broodlingTimers.length-h.broodlingHp.length},()=>2));if(h.broodlingHp.length>h.broodlingTimers.length)h.broodlingHp=h.broodlingHp.slice(0,h.broodlingTimers.length);h.broodlingHp=h.broodlingHp.map(v=>Math.min(2,Math.max(0,Number(v??2))));if(!Array.isArray(h.broodBiteTimers))h.broodBiteTimers=[];if(h.tinkerBlindTurns===undefined)h.tinkerBlindTurns=0;if(h.morphRepeatPct===undefined)h.morphRepeatPct=0;if(h.id==='morphling'&&(Number(h.morphShiftArmor)||0)>0){h.armor=(Number(h.armor)||0)-(Number(h.morphShiftArmor)||0);h.morphShiftArmor=0;}if(h.rageTurns===undefined)h.rageTurns=0;if(h.rageAppliedTurn===undefined)h.rageAppliedTurn=0;if(h.tinkerMatrixShield===undefined)h.tinkerMatrixShield=false;if(h.tinkerMatrixShieldTurns===undefined)h.tinkerMatrixShieldTurns=h.tinkerMatrixShield?6:0;if(h.tinkerMatrixShieldAppliedTurn===undefined)h.tinkerMatrixShieldAppliedTurn=0;if(h.tinkerMatrixBoostTurns===undefined)h.tinkerMatrixBoostTurns=0;if(h.tinkerMatrixBoostAppliedTurn===undefined)h.tinkerMatrixBoostAppliedTurn=0;if(h.nightmareCasterId===undefined)h.nightmareCasterId=null;if(h.nightmareCasterTeam===undefined)h.nightmareCasterTeam=null;if(h.pipeShield===undefined)h.pipeShield=0;if(h.pipeShieldTurns===undefined)h.pipeShieldTurns=(h.pipeShield||0)>0?5:0;if(h.pipeShieldAppliedTurn===undefined)h.pipeShieldAppliedTurn=0;if(h.aphoticShield===undefined)h.aphoticShield=0;if(h.borrowedTimeTurns===undefined)h.borrowedTimeTurns=0;if(h.borrowedTimeAppliedTurn===undefined)h.borrowedTimeAppliedTurn=0;if(h.skadiTurns===undefined)h.skadiTurns=0;if(h.skadiAppliedTurn===undefined)h.skadiAppliedTurn=0;if(h.marsArenaTurns===undefined)h.marsArenaTurns=0;if(h.marsArenaAppliedTurn===undefined)h.marsArenaAppliedTurn=0;if(h.itemSilence&&h.itemSilence.turnsLeft===undefined){h.itemSilence.turnsLeft=Math.max(1,Math.ceil((Number(h.itemSilence.ticks)||2)/2));delete h.itemSilence.ticks}syncItemHpBonus(h)}}
function itemCooldown(h,id){return ITEMS[id]?.cd||0}
function putItemCooldown(h,id){let n=itemCooldown(h,id);if(n>0)h.itemCd[id]=n+1}
function spellBonus(target){return target?.magicDebuff?.bonus||0}
function itemSpellBonus(h){if(!h)return 0;if(h.items?.includes('kaya_sange'))return 2;if(h.items?.includes('yasha_kaya'))return 1;if(h.items?.includes('kaya'))return 1;return 0}
function itemHpBonus(h){if(!h)return 0;if(h.items?.includes('kaya_sange'))return 2;if(h.items?.includes('sange_yasha'))return 1;if(h.items?.includes('sange'))return 1;return 0}
function syncItemHpBonus(h){if(!h)return;let want=itemHpBonus(h),have=Number(h.itemHpBonus||0),d=want-have;if(!d)return;h.itemHpBonus=want;h.maxHp=Math.max(1,h.maxHp+d);if(d>0)h.hp=Math.min(h.maxHp,h.hp+d);else h.hp=Math.min(h.hp,h.maxHp)}
function magicResistValue(h){if(!h)return 0;let res=0;if(h.items?.includes('cloak'))res+=0.5;if(h.items?.includes('pipe'))res+=1;return res}
function healingReductionValue(h){return Math.max(0,(Number(h?.skadiTurns)||0)>0?2:0)}
function applyPipeShield(target,amount=2,turns=5){if(!target||target.dead)return;target.pipeShield=Math.max(Number(target.pipeShield)||0,amount);target.pipeShieldTurns=Math.max(Number(target.pipeShieldTurns)||0,turns);target.pipeShieldAppliedTurn=G?.turnSerial||0}
function applyAphoticShield(target,amount=2){if(!target||target.dead)return;target.aphoticShield=Math.max(0,Number(target.aphoticShield)||0);target.aphoticShield=Math.max(target.aphoticShield,amount)}
function triggerAphoticShieldBurst(holder,attacker){if(!holder||holder.dead||!attacker||attacker.dead||attacker===holder)return;addLog(`${logIcon('abaddon','aphotic_shield')}<span>Aphotic Shield на ${holder.name} взрывается и наносит 1 урон ${attacker.name}.</span>`);spellDamage(attacker,1,`${logIcon('abaddon','aphotic_shield')} ${holder.name}: `,holder,{impactDelay:90})}
function activateBorrowedTime(target){if(!target||target.dead||target.id!=='abaddon'||(target.borrowedTimeTurns||0)>0)return false;target.borrowedTimeTurns=4;target.borrowedTimeAppliedTurn=G?.turnSerial||0;putOnCooldown(target,'borrowed');playSkillSound(target,'borrowed');addLog(`${logIcon('abaddon','borrowed')}<span>${target.name} активирует Borrowed Time на 4 общих хода.</span>`);window.playAbaddonFx?.({kind:'borrowed-time',team:target.team,heroId:target.id,targetTeam:target.team,targetId:target.id});window.emitNetVfx?.('abaddon-borrowed-time',target,{targetTeam:target.team,targetId:target.id});return true}
function teamHeroes(team){return (G?.teams?.[team]||[]).filter(h=>h&&!h.dead)}
function hasNegativeEffectResistance(h){return !!h?.items?.some(id=>['sange','sange_yasha','kaya_sange'].includes(id))}
function reducedNegativeTurns(h,n,opts={}){if(!canReceiveNegativeEffect(h,opts))return 0;return Math.max(0,Math.floor(Number(n)||0)-(h?.items?.includes('sange_yasha')?2:hasNegativeEffectResistance(h)?1:0))}
function hasStunResistance(h){return hasNegativeEffectResistance(h)}
function reducedStunTurns(h,n,opts={}){return reducedNegativeTurns(h,n,opts)}
function abilityDamage(target,n,src='',attacker=null,fx={},damageType='magic'){let b=spellBonus(target),k=itemSpellBonus(attacker),total=n+b+k,tag='';if(b)tag+=`[+${b} от ${target.magicDebuff.name}] `;if(k)tag+=`[+${k} от ${attacker?.items?.includes('kaya_sange')?'Kaya and Sange':attacker?.items?.includes('yasha_kaya')?'Yasha and Kaya':'Kaya'}] `;if(damageType==='magic'){if(effectImmune(target)){let before=total;total=rageMagicDamage(total);tag+=`[Rage 100%: ${before}→${total}] `}else{let resist=magicResistValue(target);if(resist>0){let before=total;total=Math.max(0,total-resist);tag+=`[магрезист ${resist}: ${before}→${total}] `}if((Number(target?.pipeShield)||0)>0&&total>0){let shield=Math.max(0,Number(target.pipeShield)||0),before=total,blocked=Math.min(shield,total);target.pipeShield=Math.max(0,shield-blocked);if(target.pipeShield<=0)target.pipeShieldTurns=0;total=Math.max(0,total-blocked);tag+=`[Pipe ${blocked}: ${before}→${total}] `}}}damage(target,total,src+tag,attacker,Object.assign({},fx,{damageType}))}
function spellDamage(target,n,src='',attacker=null,fx={}){abilityDamage(target,n,src,attacker,fx,'magic')}
function pureDamage(target,n,src='',attacker=null,fx={}){abilityDamage(target,n,src,attacker,fx,'pure')}
function teamHasVlad(team){return G.teams[team].some(h=>!h.dead&&Array.isArray(h.items)&&h.items.includes('vladmir'))}
function itemSilenceTurns(deb){return Math.max(0,Number(deb?.turnsLeft??0)||0)}
function isHeroSilenced(h){return !!h&&((h.silence||0)>0||itemSilenceTurns(h.itemSilence)>0)}
function healHero(h,n,label,meta={}){if(!h||h.dead||n<=0)return 0;let raw=Math.max(0,Number(n)||0),reduction=healingReductionValue(h),final=Math.max(0,raw-reduction);if(reduction>0)addLog(`❄️ Eye of Skadi снижает лечение ${h.name} на ${reduction}${raw!==final?`: ${raw}→${final}`:''}.`);if(final<=0)return 0;let before=h.hp;h.hp=Math.min(h.maxHp,h.hp+final);let got=h.hp-before;if(got>0)addLog(`💚 ${h.name} восстанавливает ${got} HP${label?` (${label})`:''}.`);if(got>0&&!meta.fromTetherEcho&&h.id==='io'&&h.tetherTargetId){let ally=tetherTarget(h);if(ally&&!ally.dead)healHero(ally,got,'Tether',Object.assign({},meta,{fromTetherEcho:true}))}return got}
function applyAttackItem(attacker,target){if(!attacker||!target||target.dead)return;attacker.itemCd=attacker.itemCd||{};let id=null;if(attacker.items?.includes('parasma')&&(attacker.itemCd.parasma||0)<=1)id='parasma';else if(attacker.items?.includes('witch')&&(attacker.itemCd.witch||0)<=1)id='witch';if(!id)return;let bonus=id==='parasma'?2:1,name=ITEMS[id].name,duration=reducedNegativeTurns(target,1),old=target.magicDebuff;if(duration<=0){putItemCooldown(attacker,id);addLog(`🛡 ${target.name} сокращает эффект ${name} до 0 ходов.`);return}if(!old||bonus>=old.bonus)target.magicDebuff={item:id,bonus,name,turns:duration};else old.turns=Math.max(old.turns||0,duration);putItemCooldown(attacker,id);addLog(`🪄 ${attacker.name} накладывает ${name} на ${target.name}: заклинания получают +${Math.max(bonus,old?.bonus||0)} урона.`)}
function applyDesolator(attacker,target){if(!attacker?.items?.includes('desolator')||!target||target.dead)return;let duration=reducedNegativeTurns(target,2);if(duration<=0){addLog(`🛡 ${target.name} сокращает эффект Desolator до 0 ходов.`);return}if((target.desolatorTurns||0)<=0)target.armor=(Number(target.armor)||0)-2;target.desolatorTurns=duration;addLog(`🔥 Desolator на ${target.name}: броня −2 на ${duration} хода команды цели.`)}
function applySkadiDebuff(attacker,target){if(!attacker?.items?.includes('skadi')||!target||target.dead||isForgeSpiritTarget(target))return;target.skadiTurns=5;target.skadiAppliedTurn=G?.turnSerial||0;addLog(`❄️ Eye of Skadi: лечение ${target.name} уменьшено на 2 на 5 общих ходов.`)}
function tickDesolatorForTeam(team){for(const h of G?.teams?.[team]||[]){for(const t of [h,isForgeSpiritTarget(h.forgeSpirit)?h.forgeSpirit:null].filter(Boolean)){if((t.desolatorTurns||0)>0){t.desolatorTurns--;if(t.desolatorTurns<=0){t.desolatorTurns=0;t.armor=(Number(t.armor)||0)+2;addLog(`🛡 Эффект Desolator на ${t.name} заканчивается.`)}}}}}
function itemRepeatPercent(h){if(!h)return 0;let pct=0;if(h.items?.includes('yasha_kaya'))pct+=50;if(h.items?.includes('yasha'))pct+=30;if(h.items?.includes('sange_yasha'))pct+=30;if(h.items?.includes('eaglesong'))pct+=40;if(h.items?.includes('butterfly'))pct+=60;return pct}
function repeatAttackPercent(h){return Math.max(0,itemRepeatPercent(h)+Math.max(0,Number(h?.morphRepeatPct)||0))}
function rollRepeatAttackCount(h,roll=Math.random()){let pct=repeatAttackPercent(h),guaranteed=Math.floor(pct/100),remainder=pct-guaranteed*100;return guaranteed+(remainder>0&&roll*100<remainder?1:0)}
function yashaRepeatChance(h){return repeatAttackPercent(h)/100}
function repeatAttackDelay(h){return Math.max(260,attackImpactMs(h)+170)}
function waitMs(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
async function performFreeRepeatAttacks(attacker,target,count){let done=0;for(let i=0;i<count;i++){if(!attacker||!target||attacker.dead||target.dead)break;await waitMs(repeatAttackDelay(attacker));if(performFreeRepeatAttack(attacker,target))done++;else if(target.dead)break}return done}
function procYashaMagic(attacker,target){if(!attacker?.items?.includes('yasha_kaya')||!target||target.dead)return;if(Math.random()<.10){addLog(`✨ Yasha and Kaya срабатывает: ${target.name} получает дополнительный магический урон.`);spellDamage(target,1,'✨ Yasha and Kaya: ',attacker,{impactDelay:80})}}
function afterSuccessfulBasicHit(attacker,target,dealtDamage=0,{hungerHealed=false}={}){if(!attacker||!target)return;if(!target.dead){applyAttackItem(attacker,target);applyDesolator(attacker,target);applySkadiDebuff(attacker,target);procYashaMagic(attacker,target)}if(attacker.id==='broodmother'){let hungerActive=broodHungerActive(attacker);if(!hungerHealed&&hungerActive&&dealtDamage>0)healHero(attacker,dealtDamage,'Insatiable Hunger');if(!isForgeSpiritTarget(target)&&!target.dead&&canReceiveNegativeEffect(target)){target.broodBiteTimers=Array.isArray(target.broodBiteTimers)?target.broodBiteTimers:[];if(target.broodBiteTimers.length<6)target.broodBiteTimers.push(8);else{target.broodBiteTimers.sort((a,b)=>a-b);target.broodBiteTimers[0]=8}addLog(`🕸 ${target.name} получает стак Incapacitating Bite (${Math.min(60,target.broodBiteTimers.length*10)}% промаха).`)}let spiders=(attacker.broodlingTimers||[]).length,spiderBase=.5+(hungerActive?.5:0);for(let i=0;i<spiders&&!target.dead;i++){if(attackMisses(attacker,target)){addLog(`🕷 Паучок ${attacker.name} промахивается по ${target.name}.`);continue}let hit=physicalBaseDamage(attacker,target,spiderBase),beforeHp=Math.max(0,Number(target.hp)||0);damage(target,hit,`<img class="log-skill-icon" src="assets/spiderling_portrait_v178.png" alt=""> Паучок ${attacker.name}: `,attacker,{impactDelay:110});let spiderDealt=Math.max(0,beforeHp-Math.max(0,Number(target.hp)||0));if(spiderDealt>0&&!target.dead)window.registerAxeBasicHit?.(attacker,target,{spiderIndex:i});if(hungerActive&&spiderDealt>0&&!attacker.dead&&i<(attacker.broodlingHp||[]).length){attacker.broodlingHp=Array.isArray(attacker.broodlingHp)?attacker.broodlingHp:[];const cur=Math.max(0,Number(attacker.broodlingHp[i]??2));attacker.broodlingHp[i]=Math.min(2,cur+spiderDealt)}}}if(satanicActive(attacker)&&dealtDamage>0&&!attacker.dead)healHero(attacker,dealtDamage,'Satanic');if(attacker.id==='lifestealer'&&!attacker.dead)healHero(attacker,1,'Feast');if(attacker.items?.includes('morbid')&&!attacker.dead)healHero(attacker,1,'Morbid Mask');if(teamHasVlad(attacker.team)&&!attacker.dead)healHero(attacker,1,"Vladmir's Offering")}
function performFreeRepeatAttack(attacker,target){if(!attacker||!target||attacker.dead||target.dead)return false;addLog(`⚡ ${attacker.name} повторяет тычку без траты действия.`);playAttackSound(attacker);if(attackMisses(attacker,target)){addLog(`💨 Повторная атака ${attacker.name} промахивается по ${target.name}.`);return false}let hit=attackDamageInfo(attacker,target,physicalBaseDamage(attacker,target),{allowCrit:true});damage(target,hit.damage,attackSourceLabel(attacker,hit,'⚡ Повтор'),attacker,{impactDelay:attackImpactMs(attacker)});afterSuccessfulBasicHit(attacker,target,hit.damage);return !target.dead}
function triggerColdSnapBonus(match,target,attacker,delay=0){if(!target||target.dead||(target.coldSnapTurns||0)<=0)return;setTimeout(()=>{if(G===match&&target&&!target.dead&&((target.coldSnapTurns||0)>0))damage(target,.25,'❄️ Cold Snap: ',attacker,{fromColdSnap:true,impactDelay:0})},Math.max(50,Number(delay)||0))}
function bloodthornActiveOn(target){return target?.itemSilence?.item==='bloodthorn'&&itemSilenceTurns(target.itemSilence)>0}
function targetEvasion(target){let base=Number(target?.evasionChance??target?.evasion??0);if(!Number.isFinite(base))base=0;let item=0;if(target?.items?.includes('radiance'))item+=20;else if(target?.items?.includes('talisman'))item+=15;if(target?.items?.includes('butterfly'))item+=40;return Math.max(0,Math.min(100,base+item))}
function broodBlindChance(h){return Math.max(0,Math.min(60,(h?.broodBiteTimers?.length||0)*10))}
function evasionPierceChance(attacker,target){let p=0;if(attacker?.items?.includes('mkb'))p=Math.max(p,.80);if(bloodthornActiveOn(target))p=Math.max(p,.40);return p}
function attackMisses(attacker,target){if((attacker?.tinkerBlindTurns||0)>0){addLog(`✨ ${attacker.name} промахивается из-за ослепления Laser.`);return true}let blind=broodBlindChance(attacker);if(blind>0&&Math.random()*100<blind){addLog(`🕸 ${attacker.name} промахивается из-за Incapacitating Bite (${blind}%).`);return true}let evasion=targetEvasion(target);if(evasion<=0)return false;let pierce=evasionPierceChance(attacker,target);if(pierce>0&&Math.random()<pierce){addLog(`🎯 ${attacker.name} пробивает уклонение ${target.name}${attacker.items?.includes('mkb')?' благодаря Monkey King Bar':' благодаря Bloodthorn'}.`);return false}return Math.random()*100<evasion}
function attackDamageInfo(attacker,target,baseDamage=physicalBaseDamage(attacker,target),{allowCrit=true,illusion=false}={}){let total=baseDamage,tags=[];let armor=displayArmorValue(target);if(armor<0)tags.push(`броня ${armor}: +${-armor}`);else if(armor>0)tags.push(`броня +${armor}: −${armor}`);if(allowCrit&&attacker){let critId=attacker.items?.includes('daedalus')?'daedalus':attacker.items?.includes('crystalys')?'crystalys':null;if(critId&&Math.random()<.30){let mult=critId==='daedalus'?2:1.5,raw=Math.max(0,effectiveAtk(attacker)*(illusion?.5:1));total=Math.max(0,Math.floor(raw*mult)-Math.max(0,armor));if(armor<0)total+=-armor;tags.push(`КРИТ ${ITEMS[critId].name} ×${mult}`)}}if(bloodthornActiveOn(target)){total+=1;tags.push('Bloodthorn +1')}return{damage:Math.max(0,total),tags,illusion}}
function attackSourceLabel(attacker,info,prefix='⚔️'){let tags=info.tags.length?` [${info.tags.join(' • ')}]`:'';return`${prefix} ${attacker.name}${tags}: `}
function applyItemSilence(attacker,target,id){let item=ITEMS[id],turnsLeft=reducedNegativeTurns(target,2);if(turnsLeft<=0){addLog(`🛡 ${target.name} сокращает эффект ${item.name} до 0 ходов.`);return}target.itemSilence={item:id,name:item.name,turnsLeft,damage:0,sourceTeam:attacker.team,sourceId:attacker.id};addLog(`🔇 ${attacker.name} использует ${item.name}: ${target.name} обезмолвлен на ${turnsLeft} хода команды цели.`)}
function tickItemSilencesForTeam(teamIndex){if(!G||!Number.isInteger(teamIndex))return;let targets=[];for(const hero of G.teams[teamIndex]||[]){targets.push(hero);if(isForgeSpiritTarget(hero.forgeSpirit))targets.push(hero.forgeSpirit)}for(const h of targets){let deb=h.itemSilence;if(!deb||itemSilenceTurns(deb)<=0)continue;deb.turnsLeft=itemSilenceTurns(deb)-1;if(deb.turnsLeft>0)continue;h.itemSilence=null;let pct=deb.item==='bloodthorn'?.60:.30,burst=Math.floor((deb.damage||0)*pct),source=G.teams?.[deb.sourceTeam]?.find(x=>x.id===deb.sourceId)||null;addLog(`💥 ${deb.name} на ${h.name} заканчивается: накоплено ${deb.damage||0} урона, финальный урон ${burst}.`);if(burst>0&&!h.dead)damage(h,burst,`💥 ${deb.name}: `,source)}}
function canUseShop(team){if(!G||G.resolving||G.winner!==null||G.team!==team||targetMode)return false;if(window.DOTA_NET_CONNECTED)return window.DOTA_NET_PLAYER===team;return true}
function recipeComponents(id){return ITEM_RECIPES[id]||[]}
function itemPriceForHero(id,h){let owned=new Set(h.items||[]),discount=recipeComponents(id).filter(c=>owned.has(c)).reduce((sum,c)=>sum+(ITEMS[c]?.cost||0),0);return Math.max(0,(ITEMS[id]?.cost||0)-discount)}
function applyPurchasedItemStats(h,id){if(id==='daedalus')h.atk+=1;if(id==='heart')h.maxHp+=2;syncItemHpBonus(h)}
function removeRecipeComponents(h,id){let comps=recipeComponents(id),removed=[];for(const c of comps){if(h.items.includes(c)){h.items=h.items.filter(x=>x!==c);delete h.itemCd[c];removed.push(c)}}return removed}
function itemSellPrice(id){return Math.max(0,Math.floor((Number(ITEMS[id]?.cost)||0)/2))}
function removeSoldItemStats(h,id){if(!h)return;if(id==='daedalus')h.atk=Math.max(0,(Number(h.atk)||0)-1);if(id==='heart'){h.maxHp=Math.max(1,(Number(h.maxHp)||1)-2);h.hp=Math.min(Number(h.hp)||0,h.maxHp)}syncItemHpBonus(h)}
function canSellItem(h,id){return !!(G&&h&&h.id!=='arcwarden_clone'&&Array.isArray(h.items)&&h.items.includes(id)&&canUseShop(h.team))}
function sellItem(h,id){if(!canSellItem(h,id))return;let item=ITEMS[id];if(!item)return;let refund=itemSellPrice(id);if(!confirm(`Продать ${item.name} за ${refund} золота?`))return;let at=h.items.indexOf(id);if(at<0)return;h.items.splice(at,1);if(h.itemCd)delete h.itemCd[id];removeSoldItemStats(h,id);G.gold[h.team]=(G.gold[h.team]||0)+refund;addLog(`💰 Игрок ${h.team+1} продаёт ${item.name} у ${h.name} за ${refund} золота.`);render()}
function buyItem(team,id){if(!canUseShop(team))return;let item=ITEMS[id];if(!item)return;let possible=G.teams[team].filter(h=>!h.dead&&!h.infested);if(!possible.length)return;closeShopsForTargeting(team,id);targetMode={promptText:`Выберите героя для ${item.name}`,team,frontOnly:false,filter:h=>h.team===team&&!h.dead&&!h.infested,onPick:h=>{restoreShopAfterTargeting();h.items=h.items||[];h.itemCd=h.itemCd||{};let price=itemPriceForHero(id,h);if(id==='vladmir'&&teamHasVlad(team)){alert("Vladmir's Offering уже есть у этой команды.");render();return}if(h.items.includes(id)){alert('У этого героя уже есть такой предмет.');render();return}let better=Object.entries(ITEM_RECIPES).find(([up,comps])=>h.items.includes(up)&&comps.includes(id));if(better){alert('У героя уже есть улучшенная версия этого предмета.');render();return}let replacing=recipeComponents(id).some(c=>h.items.includes(c));let slots=h.items.length-(replacing?recipeComponents(id).filter(c=>h.items.includes(c)).length:0);if(slots>=3){alert('У героя уже максимум 3 предмета.');render();return}if((G.gold[team]||0)<price){alert(`Недостаточно золота. Нужно ${price}.`);render();return}G.gold[team]-=price;let removed=removeRecipeComponents(h,id);h.items.push(id);applyPurchasedItemStats(h,id);addLog(`🛒 Игрок ${team+1} покупает ${item.name} для ${h.name} за ${price} золота${removed.length?` (сборка из ${removed.map(x=>ITEMS[x].name).join(' + ')})`:''}.`);render()}};render()}

function useItem(h,id){if(!G||G.resolving||G.winner!==null)return;if(!h||h.dead||!h.items?.includes(id))return;if((h.itemCd?.[id]||0)>1)return;if(id==='satanic'){if(active()!==h||G.team!==h.team||targetMode)return;dispelNegativeEffects(h,'normal');h.satanicSerial=G.turnSerial;putItemCooldown(h,id);playSatanicSound(h);addLog(`🩸 ${h.name}: Satanic — нормальное развеивание и 100% вампиризм до конца хода.`);render();return}if(id==='refresher'){Object.keys(h.cd||{}).forEach(k=>h.cd[k]=0);putItemCooldown(h,id);playFile(itemAudio,'assets/audio/refresher_orb.mp3');addLog(`🔄 ${h.name} использует Refresher Orb: перезарядки сброшены.`);render();return}if(id==='mekanism'||id==='greaves'){if(G.actions<1||active()!==h)return;playFile(sfxAudio,'assets/audio/items/guardian_greaves.mp3');if(id==='greaves')dispelNegativeEffects(h,'normal');for(const ally of teamHeroes(h.team))healHero(ally,id==='greaves'?3:2,ITEMS[id].name);putItemCooldown(h,id);addLog(`🛡 ${h.name} использует ${ITEMS[id].name}${id==='greaves'?' и снимает с себя отрицательные эффекты':''}.`);spend();return}if(id==='pipe'){if(G.actions<1||active()!==h)return;playFile(sfxAudio,'assets/audio/items/pipe_of_insight.mp3');for(const ally of teamHeroes(h.team))applyPipeShield(ally,2,5);putItemCooldown(h,id);addLog(`🛡 ${h.name} использует Pipe of Insight: вся команда получает щит 2 от магии на 5 общих ходов.`);spend();return}if(id==='dagon'){if(G.actions<1||active()!==h)return;chooseEnemyAny('Выберите цель для Dagon',()=>true,t=>{window.playDagonFx?.({team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});window.emitNetVfx?.('item-dagon',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});spellDamage(t,3,`🔴 ${h.name} использует Dagon: `,h,{impactDelay:360});putItemCooldown(h,'dagon');addLog(`🔴 Dagon ${h.name} поражает ${t.name} магическим зарядом. Перезарядка: 2 хода владельца.`);spend()});return}if(id==='orchid'||id==='bloodthorn'){if(G.actions<1||active()!==h)return;chooseEnemy(`Выберите цель для ${ITEMS[id].name}`,t=>itemSilenceTurns(t.itemSilence)<=0,t=>{applyItemSilence(h,t,id);putItemCooldown(h,id);spend()});return}}
function toggleShop(team){let el=document.getElementById(`shop${team}`);if(!el)return;el.classList.toggle('open')}
function shopPriceLabel(id){let it=ITEMS[id];return`${it.cost} золота`}
function shopRecipeHTML(id){let comps=recipeComponents(id),it=ITEMS[id];if(!comps.length||!it)return'';let bases=comps.map(c=>ITEMS[c]).filter(Boolean);if(!bases.length)return'';let nodes=bases.map(b=>`<div class="shop-recipe-node component"><img src="${b.img}" alt="${b.name}"></div>`).join('');return`<div class="shop-recipe multi-${bases.length}" aria-label="Сборка ${it.name} из ${bases.map(x=>x.name).join(' + ')}"><div class="shop-recipe-node result"><img src="${it.img}" alt="${it.name}"></div><svg class="shop-recipe-lines" viewBox="0 0 100 28" aria-hidden="true"><path d="M50 0V12 M50 12H${bases.length>1?'20 M50 12H80':'50'} M${bases.length>1?'20':'50'} 12V28${bases.length>1?' M80 12V28':''}"/></svg><div class="shop-recipe-components">${nodes}</div></div>`}
function touchShopMode(){return (Number(navigator.maxTouchPoints)||0)>0||('ontouchstart' in window)||!!window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches}
function showShopItemInfo(team,id){
 let box=document.querySelector(`[data-shop-info="${team}"]`),it=ITEMS[id];if(!box||!it)return;
 document.querySelectorAll(`#shop${team} .shop-item`).forEach(x=>x.classList.toggle('shop-item-selected',x.dataset.item===id));
 let price=shopPriceLabel(id),cd=it.cd?` • КД: ${it.cd} хода героя`:'',recipe=shopRecipeHTML(id),touch=touchShopMode(),canBuy=canUseShop(team);
 box.innerHTML=`<div class="shop-info-head"><img src="${it.img}" alt=""><div><b>${it.name}</b><small>${price}${cd}</small></div></div><div class="shop-info-body${recipe?' has-recipe':''}"><div class="shop-info-desc">${it.desc}</div>${recipe}</div>${touch?`<button class="shop-info-buy" type="button" ${canBuy?'':'disabled'}>КУПИТЬ • ${it.cost} 🪙</button>`:''}`;
 if(touch){let buy=box.querySelector('.shop-info-buy');if(buy)buy.onclick=e=>{e.preventDefault();e.stopPropagation();if(canUseShop(team))buyItem(team,id)}}
}
function ensureShopCatalogDOM(){
 const cls={weapon:'weapons',magic:'magic',support:'support',armor:'armor',misc:'misc'};
 for(let team=0;team<2;team++){
  const panel=document.getElementById(`shop${team}`);if(!panel)continue;
  for(const [id,it] of Object.entries(ITEMS)){
   const grid=panel.querySelector(`.shop-category-${cls[it.category]} .shop-category-grid`);if(!grid)continue;
   let b=panel.querySelector(`.shop-item[data-item="${id}"]`);
   if(!b){b=document.createElement('button');b.className='shop-item';b.dataset.item=id;b.dataset.team=String(team);b.type='button';b.innerHTML=`<img src="${it.img}" alt=""><span>${it.name} <b>${it.cost}</b></span>`}
   if(b.parentNode!==grid)grid.appendChild(b);
  }
 }
}
function bindShopItems(){
 document.querySelectorAll('.shop-item').forEach(b=>{
  if(b.dataset.shopBound==='1')return;
  b.dataset.shopBound='1';
  let t=Number(b.dataset.team),id=b.dataset.item;
  b.addEventListener('mouseenter',()=>showShopItemInfo(t,id));
  b.addEventListener('focus',()=>showShopItemInfo(t,id));
  b.addEventListener('pointerup',e=>{
    if(e.pointerType==='touch'||touchShopMode()){
      e.preventDefault();e.stopPropagation();showShopItemInfo(t,id);
    }
  });
  b.onclick=e=>{showShopItemInfo(t,id);if(touchShopMode()){e.preventDefault();e.stopPropagation();return}buyItem(t,id)};
 });
}
function renderShops(){if(!G)return;ensureItemState();for(let t=0;t<2;t++){let panel=document.getElementById(`shop${t}`);if(!panel)continue;let gold=G.gold[t]||0,turns=G.teamTurns[t]||0,next=4-(turns%4);let can=canUseShop(t),sig=`${gold}|${next}|${can?1:0}|${touchShopMode()?1:0}`;if(panel._shopRenderSig===sig)continue;panel._shopRenderSig=sig;let goldEl=panel.querySelector('.shop-gold'),nextEl=panel.querySelector('.shop-next');if(goldEl)goldEl.innerHTML=`${gold} ${goldIcon()}`;if(nextEl)nextEl.textContent=`+5 через ${next} ${next===1?'ход':'хода'}`;panel.classList.toggle('shop-disabled',!can);panel.querySelectorAll('[data-item]').forEach(b=>{let id=b.dataset.item,it=ITEMS[id];b.disabled=!can&&!touchShopMode();b.classList.toggle('shop-item-disabled',!can);b.setAttribute('aria-disabled',can?'false':'true');b.removeAttribute('title');let price=b.querySelector('b');if(price&&it)price.textContent=String(it.cost)})}}
function breakTinkerMatrix(h,incoming=1){if(!h||h.id!=='tinker'||!h.tinkerMatrixShield)return Math.max(0,Number(incoming)||0);h.tinkerMatrixShield=false;h.tinkerMatrixShieldTurns=0;h.tinkerMatrixBoostTurns=2;h.tinkerMatrixBoostAppliedTurn=G?.turnSerial||0;if(G&&G.team===h.team&&active()===h&&G.actions>=0)G.actions=Math.min(3,G.actions+1);let left=Math.max(0,(Number(incoming)||0)-1);addLog(`🛡 Defense Matrix ${h.name} поглощает 1 урон и ломается${left>0?`; проходит ещё ${left}`:''}. Бонус третьего действия активен на 2 общих хода.`);render();return left}
function damage(h,n,src='',attacker=null,fx={}){const match=G;if(!h||h.dead||h.infested)return;n=Math.max(0,Number(n)||0);if(!fx?.ignoreBorrowedTime&&!isForgeSpiritTarget(h)&&h.id==='abaddon'&&n>0&&(h.borrowedTimeTurns||0)>0){addLog(`${src}${h.name} превращает ${n} урона в лечение благодаря Borrowed Time.`);healHero(h,n,'Borrowed Time');render();return}if(n>0&&h.id==='tinker'&&h.tinkerMatrixShield&&!fx?.ignoreDefenseMatrix){n=breakTinkerMatrix(h,n);if(n<=0)return;}if(h.id==='broodmother'&&n>0&&(h.broodlingTimers?.length||0)>0&&!fx?.ignoreBroodShield){let pairs=(h.broodlingTimers||[]).map((t,i)=>({t,hp:Number((h.broodlingHp||[])[i]??2)})).sort((a,b)=>a.t-b.t);if(pairs.length){pairs[0].hp=Math.max(0,pairs[0].hp-n);if(pairs[0].hp<=0){playSkillSound(h,'spiderDeath');addLog(`🕷 Паучок закрывает ${h.name} собой и погибает.`);pairs.shift()}else addLog(`🕷 Паучок закрывает ${h.name} собой и выживает (${pairs[0].hp}/2 HP).`);h.broodlingTimers=pairs.map(x=>x.t);h.broodlingHp=pairs.map(x=>x.hp);render();return}}if(!isForgeSpiritTarget(h)&&n>0&&(Number(h.aphoticShield)||0)>0){let blocked=Math.min(n,Number(h.aphoticShield)||0),shieldBefore=Number(h.aphoticShield)||0;h.aphoticShield=Math.max(0,shieldBefore-blocked);n-=blocked;addLog(`${logIcon('abaddon','aphotic_shield')}<span>Aphotic Shield поглощает ${blocked} урона у ${h.name}${h.aphoticShield>0?` (осталось ${h.aphoticShield})`:''}.</span>`);let aphoticBroken=shieldBefore>0&&h.aphoticShield<=0&&blocked>0;if(aphoticBroken)triggerAphoticShieldBurst(h,attacker);if(n<=0){render();return}}if(n===0){const summon=isForgeSpiritTarget(h),owner=summon?forgeSpiritOwner(h):h,delay=Math.max(0,Number(fx?.impactDelay)||0);if(owner){playDamageFx({team:h.team,heroId:owner.id,amount:0,blocked:true,delay,summon});window.emitNetVfx?.('damage',owner,{amount:0,blocked:true,delay,summon})}}if(isForgeSpiritTarget(h)){let owner=forgeSpiritOwner(h);if(n>0){if(itemSilenceTurns(h.itemSilence)>0)h.itemSilence.damage=(h.itemSilence.damage||0)+n;let delay=Math.max(0,Number(fx?.impactDelay)||0),ev={team:h.team,heroId:owner?.id||h.ownerId,amount:n,delay,summon:true};playDamageFx(ev);if(owner)window.emitNetVfx?.('damage',owner,{amount:n,delay,summon:true})}h.hp-=n;addLog(`${src}${h.name} получает ${n} урона.`);if(n>0&&!fx?.fromColdSnap&&!h.dead)triggerColdSnapBonus(match,h,attacker,fx?.impactDelay);if(h.hp<=0){h.hp=0;h.dead=true;if(owner)owner.forgeSpirit=null;addLog(`💥 Forge Spirit уничтожен.`)}render();return}if(n>0){if(itemSilenceTurns(h.itemSilence)>0)h.itemSilence.damage=(h.itemSilence.damage||0)+n;let delay=Math.max(0,Number(fx?.impactDelay)||0),ev={team:h.team,heroId:h.id,amount:n,delay};playDamageFx(ev);window.emitNetVfx?.('damage',h,{amount:n,delay})}h.hp-=n;addLog(`${src}${h.name} получает ${n} урона.`);if(n>0&&!fx?.fromColdSnap&&!h.dead)triggerColdSnapBonus(match,h,attacker,fx?.impactDelay);if(!fx?.ignoreBorrowedTime&&h.id==='abaddon'&&n>0&&(h.borrowedTimeTurns||0)<=0&&(h.cd?.borrowed||0)<=1&&h.hp<2){activateBorrowedTime(h);if(h.hp<1)h.hp=1;render();return}if(!fx?.ignoreBorrowedTime&&h.hp<=0&&h.id==='abaddon'&&(h.borrowedTimeTurns||0)>0){h.hp=1;h.dead=false;addLog(`${logIcon('abaddon','borrowed')}<span>Borrowed Time не даёт ${h.name} погибнуть.</span>`);render();return}if(h.hp<=0){h.hp=0;h.dead=true;let noBounty=(h.id==='arcwarden_clone'||h.id==='phantomlancer_illusion');if(!noBounty)awardHeroKill(h,attacker);if(!noBounty&&attacker?.id==='phantomlancer')phantomEvent('pl-kill',h,attacker);if(h.id==='io')breakTether(h,true);if(h.tetheredBy){let io=findHero(h.team,h.tetheredBy);if(io)breakTether(io,true)}if(!noBounty&&attacker&&attacker.id==='shadowfiend')attacker.sfKills=(attacker.sfKills||0)+1;if(!noBounty&&attacker&&attacker.id==='invoker')playInvokerKillVoice();if(!noBounty&&attacker&&attacker.id==='tinker')playTinkerKillVoice();if(!noBounty&&attacker&&attacker.id==='mars')playMarsKillVoice(h,attacker);addLog(`☠️ ${h.name} погибает!`);
 // Мина — эффект линии, а не героя. Смерть переднего героя не удаляет её:
 // сразу переводим переднюю позицию на следующего живого и перерисовываем поле.
 let deadFront=h;active(h.team);if(G.winner===null)marsArenaWallHit(h.team,deadFront);
 checkWin();
 if(G.winner===null)render();
}}
function checkWin(){if(G.winner!==null)return;for(let t=0;t<2;t++){if(G.teams[t].every(h=>h.id==='arcwarden_clone'||h.dead||h.hp<=0)){let winner=1-t;G.winner=winner;window.DotaProfile?.recordResult?.(G.matchId,winner);render();const token=G.matchId;setTimeout(()=>{if(G&&G.matchId===token&&G.winner===winner)alert(`🏆 Игрок ${winner+1} победил!`)},120);return}}}
function triggerRadianceAura(teamStarting){if(!G)return;let enemy=1-teamStarting,holder=frontHero(enemy),victim=frontHero(teamStarting);if(!holder||!victim||holder.dead||victim.dead)return;if(holder.items?.includes('radiance')){addLog(`☀️ Radiance ${holder.name} обжигает ${victim.name} на 1 урон.`);spellDamage(victim,1,'☀️ Radiance: ',holder,{impactDelay:60})}}
function beginActivation(){if(!G||G.winner!==null)return;const activationMatch=G;ensureItemState();G.turnSerial=(G.turnSerial||0)+1;const activationSerial=G.turnSerial;triggerRadianceAura(G.team);if(G.winner!==null)return;processInvokerStartEffects();G.teamTurns[G.team]=(G.teamTurns[G.team]||0)+1;if(G.teamTurns[G.team]%4===0){G.gold[G.team]=(G.gold[G.team]||0)+5;addLog(`${goldIcon()} Игрок ${G.team+1} получает 5 золота за 4 своих хода.`)}if(G.winner!==null)return;
 for(const team of G.teams)for(const hero of team){if(hero.id==='io'&&hero.tetherTargetId){let ally=tetherTarget(hero);if(ally&&!ally.dead)healHero(ally,1,'Tether');else breakTether(hero,true)}if(hero.id==='io'){let before=ioSpiritTimers(hero).length;if(before){hero.spiritTimers=hero.spiritTimers.map(x=>x-1).filter(x=>x>0);let after=syncIoSpiritSummary(hero).length;if(after<before){let gone=before-after;addLog(`✨ ${gone} Spirit${gone>1?'s':''} вокруг ${hero.name} исчезает${gone>1?'ют':''}.`)}}}if((hero.broodHungerTurns||0)>0&&hero.broodHungerAppliedTurn!==(G.turnSerial||0)){hero.broodHungerTurns--;if(hero.broodHungerTurns<=0){hero.broodHungerTurns=0;hero.broodHungerImmediate=false;hero.broodHungerAppliedTurn=0}}if((hero.tinkerBlindTurns||0)>0)hero.tinkerBlindTurns--;if((hero.borrowedTimeTurns||0)>0&&hero.borrowedTimeAppliedTurn!==(G.turnSerial||0)){hero.borrowedTimeTurns=Math.max(0,hero.borrowedTimeTurns-1);if(hero.borrowedTimeTurns<=0)addLog(`${logIcon('abaddon','borrowed')}<span>Borrowed Time на ${hero.name} заканчивается.</span>`)}if((hero.rageTurns||0)>0&&hero.rageAppliedTurn!==(G.turnSerial||0))hero.rageTurns=Math.max(0,hero.rageTurns-1);if((hero.tinkerMatrixShieldTurns||0)>0&&hero.tinkerMatrixShieldAppliedTurn!==(G.turnSerial||0)){hero.tinkerMatrixShieldTurns=Math.max(0,hero.tinkerMatrixShieldTurns-1);if(hero.tinkerMatrixShieldTurns<=0)hero.tinkerMatrixShield=false}if((hero.tinkerMatrixBoostTurns||0)>0&&hero.tinkerMatrixBoostAppliedTurn!==(G.turnSerial||0))hero.tinkerMatrixBoostTurns=Math.max(0,hero.tinkerMatrixBoostTurns-1);if((hero.pipeShieldTurns||0)>0&&hero.pipeShieldAppliedTurn!==(G.turnSerial||0)){hero.pipeShieldTurns=Math.max(0,hero.pipeShieldTurns-1);if(hero.pipeShieldTurns<=0)hero.pipeShield=0}if((hero.skadiTurns||0)>0&&hero.skadiAppliedTurn!==(G.turnSerial||0))hero.skadiTurns=Math.max(0,hero.skadiTurns-1);if(Array.isArray(hero.broodBiteTimers)&&hero.broodBiteTimers.length)hero.broodBiteTimers=hero.broodBiteTimers.map(x=>x-1).filter(x=>x>0);if(hero.id==='broodmother'&&Array.isArray(hero.broodlingTimers)&&hero.broodlingTimers.length){let pairs=hero.broodlingTimers.map((t,i)=>({t,hp:Number((hero.broodlingHp||[])[i]??2)}));pairs=pairs.map(x=>({t:x.t-1,hp:x.hp}));let alive=pairs.filter(x=>x.t>0),gone=pairs.length-alive.length;hero.broodlingTimers=alive.map(x=>x.t);hero.broodlingHp=alive.map(x=>x.hp);if(gone>0){playSkillSound(hero,'spiderDeath');addLog(`🕷 ${gone} паучок${gone>1?'а':' '} у ${hero.name} исчезает.`)}}}
 if((G.marsArenaTurns||0)>0&&G.marsArenaAppliedTurn!==(G.turnSerial||0)){
   G.marsArenaTurns=Math.max(0,G.marsArenaTurns-1);
   if(G.marsArenaTurns<=0){let arenaTeam=G.marsArenaTeam,arenaEnemy=G.marsArenaEnemyTeam,arenaCasterId=G.marsArenaCasterId,arenaMars=Number.isInteger(arenaTeam)?G.teams?.[arenaTeam]?.find(x=>x.id==='mars'&&!x.dead):null;window.playMarsFx?.({kind:'arena-end',team:arenaTeam,heroId:arenaCasterId,targetTeam:arenaEnemy,targetId:Number.isInteger(arenaEnemy)?frontHero(arenaEnemy)?.id:null});if(arenaMars)window.emitNetVfx?.('mars-arena-end',arenaMars,{targetTeam:arenaEnemy,targetId:Number.isInteger(arenaEnemy)?frontHero(arenaEnemy)?.id:null});addLog(`${logIcon('mars','arena')}<span>Arena of Blood исчезает.</span>`);G.marsArenaTeam=null;G.marsArenaEnemyTeam=null;G.marsArenaCasterId=null;}
 }
 G.teams[G.team].filter(x=>x.infested).forEach(ls=>{if(ls.infestTurns>0)ls.infestTurns--;if(ls.infestTurns<=0){let arr=G.teams[G.team],host=arr.find(x=>x.id===ls.infestHost&&!x.dead);ls.infested=false;ls.infestHost=null;if(host){let li=arr.indexOf(ls);arr.splice(li,1);let hi=arr.indexOf(host);arr.splice(hi+1,0,ls)}addLog(`🩸 LIFESTEALER выходит из союзника и занимает место позади него.`)}});
 let h=active(); // Shadowraze stacks are permanent for the rest of the match
 if(h?.id==='broodmother'&&(h.broodEggTurns||0)>0){h.broodEggTurns--;if(h.broodEggTurns<=0){h.broodlingTimers=(h.broodlingTimers||[]).concat([12,12]);h.broodlingHp=(h.broodlingHp||[]).concat([2,2]);addLog(`🕷 ${h.name} получает 2 паучков на 6 общих ходов.`)}}
 Object.keys(h.cd).forEach(k=>{if(h.cd[k]>0)h.cd[k]--});h.itemCd=h.itemCd||{};Object.keys(h.itemCd).forEach(k=>{if(h.itemCd[k]>0)h.itemCd[k]--});
 // enemy mine detonates at start of this team's turn
 if(G.mines[G.team]){G.mines[G.team]=false;h._mineBoom=true;window.emitNetVfx?.('mine',h);playMineSound('explode');render();spellDamage(h,4,'💥 Мина: ',G.teams[1-h.team].find(x=>x.id==='techies'),{impactDelay:30});setTimeout(()=>{if(h){h._mineBoom=false;render()}},700);if(G.winner!==null)return;if(h.dead)h=active()}
 // bombs: countdown in team-turn units; one full round = two team turns
 G.bombs.forEach(b=>b.turns--);let boom=G.bombs.filter(b=>b.turns<=0);G.bombs=G.bombs.filter(b=>b.turns>0);boom.forEach(b=>{let target=b.summonOwnerId?G.teams[b.team].find(x=>x.id===b.summonOwnerId)?.forgeSpirit:G.teams[b.team][b.idx];if(target&&!target.dead){if(!isForgeSpiritTarget(target))target._bombBoom=true;window.emitNetVfx?.('bomb',isForgeSpiritTarget(target)?forgeSpiritOwner(target):target);playSkillSound(G.teams[1-b.team].find(x=>x.id==='techies')||{id:'techies'},'bomb');render();spellDamage(target,2,'💣 Бомба: ',G.teams[1-target.team].find(x=>x.id==='techies'),{impactDelay:140});if(!isForgeSpiritTarget(target))setTimeout(()=>{target._bombBoom=false;render()},700)}});
 if(G.winner!==null)return;if(h.dead)h=active();
 for(const team of G.teams)for(const hero of team){if(!hero.dead&&hero.items?.includes('heart')){let regen=Math.floor(hero.maxHp/5);if(regen>0)healHero(hero,regen,'Heart of Tarrasque')}}
 if(h.id==='io'&&h.spirits>0)triggerIoSpiritHit(h);
 if(G.winner!==null)return;
 let baseActions=(h.id==='tinker'&&(h.tinkerMatrixBoostTurns||0)>0)?3:2;G.actions=Math.max(0,baseActions-h.actionDebt);h.actionDebt=0;G.attackUsed=false;h.turnUsed={};if(h.id==='invoker'){h.invokedSpells=[];h.invoking=false;if(isForgeSpiritTarget(h.forgeSpirit)){let fs=h.forgeSpirit;if((fs.stunOwnerTurns||0)>0){fs.used=true;fs.stunOwnerTurns--}else fs.used=false;}}
 if((h.tornadoAirborne||0)>0){addLog(`🌪 ${h.name} находится в Tornado и пропускает активацию.`);G.actions=0;render();setTimeout(()=>{if(G===activationMatch&&G.turnSerial===activationSerial)endTurn(true)},650);return}
 if(h.sleep&&h.nightmare&&h.nightmareSkipped&&h.stun<=0){h.sleep=false;h.nightmare=false;h.nightmareSkipped=false;h.nightmareCasterId=null;h.nightmareCasterTeam=null;addLog(`🌙 ${h.name} просыпается от Nightmare.`)}
 if(h.stun>0){let nightmareSkip=!!(h.sleep&&h.nightmare);addLog(nightmareSkip?`🌙 ${h.name} спит под Nightmare и пропускает активацию.`:`🌀 ${h.name} оглушён и пропускает активацию.`);G.actions=0;render();setTimeout(()=>{if(G!==activationMatch||G.turnSerial!==activationSerial)return;h.stun--;if(nightmareSkip){h.nightmareSkipped=true}else if(h.stun<=0){h.gripped=false}endTurn(true)},650);return}
 playTurnVoice(h);render()}
function endTurn(skipSwap=false,actorOverride=null){if(!G||G.resolving)return;if(G.winner!==null)return;let h=actorOverride||active();if(h&&h.silence>0)h.silence--;if(h?.magicDebuff?.turns>0){h.magicDebuff.turns--;if(h.magicDebuff.turns<=0){addLog(`✨ Эффект ${h.magicDebuff.name} на ${h.name} заканчивается.`);h.magicDebuff=null}}tickInvokerEndEffects();let old=G.team,arr=G.teams[old];tickItemSilencesForTeam(old);tickDesolatorForTeam(old);if(G.winner!==null)return;G.holdFrontOnce=Array.isArray(G.holdFrontOnce)?G.holdFrontOnce:[false,false];let hold=!!G.holdFrontOnce[old];if(hold)G.holdFrontOnce[old]=false;let marsArenaLock=marsArenaActive()&&old===G.marsArenaEnemyTeam;// Arena locks the current enemy front in place; Mars's own allies rotate normally.
if(!skipSwap&&!hold&&!marsArenaLock&&living(old).length>1){let cur=G.front[old];for(let i=1;i<=arr.length;i++){let idx=(cur+i)%arr.length;if(!arr[idx].dead){G.front[old]=idx;break}}}G.team=1-old;if(G.team===0)G.round++;beginActivation()}
function turnQueuePreview(count=7){
 if(!G)return [];
 // Local simulation only: never changes the real match state.
 let teams=G.teams.map(arr=>arr.map(h=>({id:h.id,name:h.name,dead:h.dead||h.hp<=0,stun:h.stun||0})));
 let fronts=[G.front[0],G.front[1]], team=G.team, out=[], arenaEnemy=(marsArenaActive()?G.marsArenaEnemyTeam:null);
 const simActive=t=>{let arr=teams[t],start=fronts[t];for(let i=0;i<arr.length;i++){let idx=(start+i)%arr.length;if(!arr[idx].dead){fronts[t]=idx;return {h:arr[idx],idx}}}return null};
 for(let n=0;n<count;n++){
   let a=simActive(team); if(!a)break;
   let skipped=a.h.stun>0;
   out.push({id:a.h.id,name:a.h.name,team,skipped,current:n===0});
   if(skipped){a.h.stun--;}
   else {
     let alive=teams[team].filter(x=>!x.dead).length;
     if(alive>1&&team!==arenaEnemy){let arr=teams[team],cur=fronts[team];for(let i=1;i<=arr.length;i++){let idx=(cur+i)%arr.length;if(!arr[idx].dead){fronts[team]=idx;break}}}
   }
   team=1-team;
 }
 return out;
}
function renderTurnQueue(){
 let q=$('#turnQueue');if(!q||!G)return;
 const icons={phantomlancer:'assets/turn_phantomlancer.webp',techies:'assets/turn_techies.png',morphling:'assets/turn_morphling.png',silencer:'assets/turn_silencer.png',bane:'assets/turn_bane.png',shadowfiend:'assets/turn_shadowfiend.png',lifestealer:'assets/turn_lifestealer.png',abaddon:'assets/turn_abaddon.png',io:'assets/turn_io.png',tinker:'assets/turn_tinker.png',invoker:'assets/turn_invoker.png',arcwarden:'assets/arcwarden_queue_icon.png',axe:'assets/axe_icon.png',broodmother:'assets/turn_broodmother_mini.png',pudge:'assets/turn_pudge.png',mars:'assets/turn_mars.png'};
 let seq=turnQueuePreview(7);
 setHTMLCached(q,`<div class="turn-queue-title">ОЧЕРЁДНОСТЬ</div><div class="turn-queue-row">${seq.map((x,i)=>{let src=x.id==='tinker'?window.TINKER_MINI_ICON_DATA:(icons[x.id]||HERO_ICONS[x.id]||DATA[x.id]?.img||'assets/axe_icon.png');return `${i?'<span class="turn-arrow">›</span>':''}<div class="turn-token team-${x.team}${x.current?' now':''}${x.skipped?' skipped':''}" title="${x.name}${x.skipped?' — пропустит ход из-за оглушения/сна':''}"><img src="${src}" alt="${x.name}">${x.skipped?'<span class="skip-mark">🌀</span>':''}</div>`}).join('')}</div>`);
}
function spend(){if(!G)return;const fallen=G.teams[G.team].find(h=>h._fellDuringAttack);if(fallen){delete fallen._fellDuringAttack;if(G.winner===null)endTurn(true,fallen);return}G.actions--;render();const match=G,serial=G.turnSerial;if(G.actions<=0)setTimeout(()=>{if(G===match&&G.turnSerial===serial)endTurn()},350)}
function chooseEnemy(promptText,filter=()=>true,onPick=null,spellId=''){
 let realFilter=h=>canTargetHero(h,spellId)&&filter(h);let opts=enemyTargetPool(false,spellId).filter(realFilter);if(!opts.length){alert('Нет допустимой цели.');return null}
 targetMode={promptText,filter:realFilter,onPick,team:1-G.team,frontOnly:true};render();return null
}
function chooseAlly(promptText,filter=()=>true,onPick=null){
 let opts=living(G.team).filter(h=>!h.dead&&!h.infested&&filter(h));if(!opts.length){alert('Нет подходящего союзника.');return null}
 targetMode={promptText,filter,onPick,team:G.team,frontOnly:false};render();return null
}
function chooseHeroes(promptText,teams=[G.team],filter=()=>true,onPick=null,spellId=''){
 let uniq=[...new Set(teams)],pools=[];
 uniq.forEach(team=>{if(team===G.team)pools.push(...living(team));else if(team===1-G.team)pools.push(...enemyTargetPool(true,spellId))});
 let realFilter=h=>uniq.includes(h.team)&&canTargetHero(h,spellId)&&filter(h);
 let opts=pools.filter((h,i,arr)=>arr.indexOf(h)===i&&realFilter(h));
 if(!opts.length){alert('Нет подходящих целей.');return null}
 targetMode={promptText,filter:realFilter,onPick,teams:uniq,team:uniq.length===1?uniq[0]:null,frontOnly:false};render();return null
}
function chooseMistCoilTarget(promptText,onPick){
 const teams=[G.team,1-G.team];
 const enemyFront=frontHero(1-G.team);
 const realFilter=h=>!!h&&!h.dead&&!h.infested&&teams.includes(h.team)&&!isForgeSpiritTarget(h)&&(h.team===G.team||h===enemyFront);
 const opts=[...living(G.team),enemyFront].filter(Boolean).filter((h,i,arr)=>arr.indexOf(h)===i&&realFilter(h));
 if(!opts.length){alert('Нет подходящих целей.');return null}
 targetMode={promptText,filter:realFilter,onPick,teams,team:null,frontOnly:false};render();return null
}
function targetModeAcceptsTeam(team){if(!targetMode)return false;if(Array.isArray(targetMode.teams))return targetMode.teams.includes(team);if(targetMode.team===null||targetMode.team===undefined)return true;return targetMode.team===team}
function cancelTarget(){targetMode=null;restoreShopAfterTargeting();render()}
function pickTarget(h){if(!targetMode||!targetMode.filter(h)||!targetModeAcceptsTeam(h.team)||h.dead||(targetMode.frontOnly&&!isForgeSpiritTarget(h)&&h!==frontHero(h.team)))return;let cb=targetMode.onPick;targetMode=null;if(cb)cb(h)}
// v1.85.3: robust targeting. Capture clicks before portrait/video/overlay children can swallow them.
document.addEventListener('click',e=>{if(!targetMode)return;let card=e.target?.closest?.('.hero.targetable');if(!card)return;let team=Number(card.dataset.team),id=card.dataset.hero,h=G?.teams?.[team]?.find(x=>x.id===id);if(!h)return;e.preventDefault();e.stopPropagation();if(typeof e.stopImmediatePropagation==='function')e.stopImmediatePropagation();pickTarget(h)},true);
function canBasicAttackTarget(attacker,target){if(!target?.sleep)return true;return !!(target.nightmare&&attacker?.id==='bane'&&target.nightmareCasterId===attacker.id&&target.nightmareCasterTeam===attacker.team)}
function isCopyableAttackPassive(hero,skillId){let skills=DATA[hero?.id]?.skills||[],idx=skills.findIndex(x=>x.id===skillId);return idx>=0&&idx<skills.length-1&&!!skills[idx]?.passive}
function applyMorphCopiedAttackPassives(morph,copied,target,dealtDamage){if(!morph||!copied||!target||target.dead)return;if(copied.id==='lifestealer'&&isCopyableAttackPassive(copied,'lifesteal'))healHero(morph,1,'Morph: Feast');if(copied.id==='broodmother'&&isCopyableAttackPassive(copied,'bite')&&canReceiveNegativeEffect(target)){target.broodBiteTimers=Array.isArray(target.broodBiteTimers)?target.broodBiteTimers:[];if(target.broodBiteTimers.length<6)target.broodBiteTimers.push(8);else{target.broodBiteTimers.sort((a,b)=>a-b);target.broodBiteTimers[0]=8}addLog(`🕸 Morph копирует Incapacitating Bite: ${target.name} получает стак (${Math.min(60,target.broodBiteTimers.length*10)}% промаха).`)}}
function performMorphStrike(morph,copied,target,prefix='🌀 Morph'){if(!morph||!copied||!target||morph.dead||target.dead)return false;playAttackSound(Object.assign({},copied,{team:morph.team}));if(attackMisses(morph,target)){addLog(`💨 Morph ${morph.name} промахивается по ${target.name}.`);return false}let base=physicalBaseDamage(morph,target,effectiveAtk(copied)),hit=attackDamageInfo(morph,target,base,{allowCrit:true});damage(target,hit.damage,attackSourceLabel(morph,hit,prefix),morph,{impactDelay:attackImpactMs(copied)});afterSuccessfulBasicHit(morph,target,hit.damage);applyMorphCopiedAttackPassives(morph,copied,target,hit.damage);return !target.dead}
async function performMorphAttackSequence(morph,copied,target){if(!G||!morph||!copied||!target)return;const match=G;G.resolving='multiattack';render();let landed=performMorphStrike(morph,copied,target,'🌀 Morph');if(landed){let extra=rollRepeatAttackCount(morph);for(let i=0;i<extra&&!target.dead&&!morph.dead;i++){await waitMs(Math.max(260,attackImpactMs(copied)+170));if(G!==match)break;performMorphStrike(morph,copied,target,'⚡ Morph повтор')}}if(G===match){putOnCooldown(morph,'morph');G.resolving=false;spend();render()}}
function basicAttack(){if(!G||G.resolving||G.winner!==null||G.actions<1||targetMode)return;if(G.attackUsed){alert('Обычной атакой можно атаковать только 1 раз за ход героя.');return}let a=active();if((a.disarmTurns||0)>0){alert('Герой обезоружен и не может атаковать с руки.');return}chooseEnemy('Выберите врага для обычной атаки',t=>canBasicAttackTarget(a,t),async t=>{if(a.id==='phantomlancer'){performPhantomAttack(a,t);return}G.attackUsed=true;G.resolving='multiattack';playAttackSound(a);if(attackMisses(a,t)){addLog(`💨 ${a.name} промахивается по ${t.name}.`);G.resolving=false;spend();return}let hit=attackDamageInfo(a,t,physicalBaseDamage(a,t),{allowCrit:true});damage(t,hit.damage,attackSourceLabel(a,hit),a,{impactDelay:attackImpactMs(a)});afterSuccessfulBasicHit(a,t,hit.damage);let count=rollRepeatAttackCount(a);if(!t.dead&&count>0)await performFreeRepeatAttacks(a,t,count);G.resolving=false;spend()})}
function useGlobalSilence(h){if(!G||G.resolving||G.winner!==null)return;if(!h||h.dead)return;if(G.team!==h.team){return}if(isHeroSilenced(h)){alert('Silencer обезмолвлен и не может использовать способность.');return}if((h.cd.global||0)>1){render();return}let enemies=living(1-h.team);enemies.forEach(t=>t.silence=Math.max(t.silence,reducedNegativeTurns(t,1,{piercesImmunity:true})));putOnCooldown(h,'global');playSkillSound(h,'global');let isOwnTurn=(G.team===h.team&&active()===h&&G.actions>0&&!targetMode);if(isOwnTurn){G.actions--;addSkillLog(h,'global',`${h.name} использует глобальное безмолвие. Это действие текущего хода.`);if(G.actions<=0)setTimeout(endTurn,350);else render()}else{h.actionDebt=Math.min(2,h.actionDebt+1);addSkillLog(h,'global',`${h.name} использует глобальное безмолвие вне своего хода. В следующую активацию останется ${Math.max(0,2-h.actionDebt)} действие.`);render()}}
function skill(id){let cur=active();if(!G||G.resolving||G.winner!==null||targetMode||((G.actions<1)&&!(cur?.id==='tinker'&&id==='rearm')))return;let h=cur;if(!DATA[h.id].skills.some(s=>s.id===id&&!s.passive))return;if(isHeroSilenced(h)){alert('Герой обезмолвлен и не может использовать способности.');return}if(id==='invoke'&&h.id==='invoker'&&h.turnUsed?.invoke){alert('Invoke уже использован в этом ходу.');return}if((h.cd[id]||0)>1){return}
 if(id==='invoke'){playSkillSound(h,'invoke');invokeGame(h);return}
 if(id==='bomb'){chooseEnemy('Выберите врага для бомбы',()=>true,t=>{playSkillSound(h,'bomb');let bombTurns=reducedNegativeTurns(t,2);if(bombTurns>0){G.bombs.push(isForgeSpiritTarget(t)?{team:t.team,summonOwnerId:t.ownerId,turns:bombTurns}:{team:t.team,idx:G.teams[t.team].indexOf(t),turns:bombTurns});addSkillLog(h,'bomb',`${h.name} кидает бомбу в ${t.name}${bombTurns<2?' (сокращённая длительность)':''}.`)}else addSkillLog(h,'bomb',`${t.name} невосприимчив к Sticky Bomb.`);putOnCooldown(h,'bomb');spend()});return}
 else if(id==='mine'){playMineSound('place');G.mines[1-G.team]=true;putOnCooldown(h,'mine');addSkillLog(h,'mine',`${h.name} ставит мину перед вражеской линией.`)}
 else if(id==='lance'){chooseEnemy('Выберите врага для Spirit Lance',()=>true,t=>performPhantomAttack(h,t,true));return}
 else if(id==='agi'){if(h.maxHp<=1||h.hp<=1){alert('Недостаточно здоровья для изменения.');return}playSkillSound(h,'agi');h.atk+=1;h.maxHp-=1;h.hp=Math.max(1,h.hp-1);h.morphRepeatPct=Math.max(0,(Number(h.morphRepeatPct)||0)+30);addSkillLog(h,'agi',`${h.name}: урон +1, здоровье −1, шанс повторной тычки ${h.morphRepeatPct}%.`)}
 else if(id==='str'){if(h.maxHp>=9){alert('Morphling не может поднять максимум здоровья выше 9.');return}if(h.atk<=0){alert('У Morphling уже 0 урона — дальше перекачивать урон в здоровье нельзя.');return}playSkillSound(h,'str');h.maxHp+=1;h.hp=Math.min(h.maxHp,h.hp+1);h.atk=Math.max(0,h.atk-1);h.morphRepeatPct=Math.max(0,(Number(h.morphRepeatPct)||0)-30);addSkillLog(h,'str',`${h.name}: здоровье +1, урон −1, шанс повторной тычки ${h.morphRepeatPct}%. Максимум здоровья — 9.`)}
 else if(id==='morph'){chooseEnemy('Выберите врага для превращения',()=>true,t=>{playSkillSound(h,'morph');performMorphAttackSequence(h,t,t)});return}
 else if(id==='sleep'){chooseEnemy('Выберите врага для сна',()=>true,t=>{playSkillSound(h,'sleep');let stunTurns=reducedStunTurns(t,1);t.gripped=false;t.stun=Math.max(t.stun,stunTurns);t.sleep=stunTurns>0;t.nightmare=stunTurns>0;t.nightmareSkipped=false;t.nightmareCasterId=stunTurns>0?h.id:null;t.nightmareCasterTeam=stunTurns>0?h.team:null;putOnCooldown(h,'sleep');addSkillLog(h,'sleep',stunTurns>0?`${t.name} засыпает: Bane может атаковать цель во сне, его союзники — нет.`:`${t.name} не получает Nightmare из-за невосприимчивости/сопротивления эффектам.`);spend()});return}
 else if(id==='grip'){chooseEnemy("Выберите врага для Fiend's Grip",()=>true,t=>{playSkillSound(h,'grip');spellDamage(t,2,`${logIcon(h.id,'grip')} ${h.name}: `,h,{impactDelay:100});let stunTurns=reducedStunTurns(t,2,{piercesImmunity:true});t.stun=Math.max(t.stun,stunTurns);t.gripped=stunTurns>0;putOnCooldown(h,'grip');addSkillLog(h,'grip',`${t.name} оглушён на ${stunTurns} активации.`);spend()});return}
 else if(id==='silence'){chooseEnemy('Выберите врага для безмолвия',()=>true,t=>{playSkillSound(h,'silence');let turns=reducedNegativeTurns(t,1);t.silence=Math.max(t.silence,turns);putOnCooldown(h,'silence');addSkillLog(h,'silence',turns>0?`${t.name} обезмолвлен.`:`${t.name} полностью сокращает длительность Last Word.`);spend()});return}
 else if(id==='spear'){chooseEnemy('Выберите переднего врага для Spear of Mars',()=>true,t=>{let wasArena=marsArenaActive()&&t.team===G.marsArenaEnemyTeam;playSkillSound(h,'spear');window.playMarsFx?.({kind:'spear',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,pin:wasArena});window.emitNetVfx?.('mars-spear',h,{targetTeam:t.team,targetId:t.id,pin:wasArena});spellDamage(t,1,`${logIcon(h.id,'spear')} ${h.name}: `,h,{impactDelay:330});if(!t.dead){if(wasArena){if(canReceiveNegativeEffect(t)){let stunTurns=reducedStunTurns(t,1);t.stun=Math.max(t.stun,stunTurns);addSkillLog(h,'spear',`${h.name} протыкает ${t.name} копьём и прибивает к стене Arena of Blood: 1 магический урон и оглушение на ${stunTurns} активацию. Позиция цели не меняется.`)}else addSkillLog(h,'spear',`${h.name} протыкает ${t.name} копьём в Arena of Blood, но оглушение не проходит. Позиция цели не меняется.`)}else{let moved=knockToBack(t);addSkillLog(h,'spear',`${h.name} поражает ${t.name} копьём: 1 магический урон${moved?' и отбрасывание в конец линии':''}.`)}}putOnCooldown(h,'spear');spend()});return}
 else if(id==='rebuke'){chooseEnemy('Выберите переднего врага для God’s Rebuke',()=>true,t=>{let arenaHit=!!(!t.dead&&marsArenaActive()&&t.team===G.marsArenaEnemyTeam);playSkillSound(h,'rebuke');window.playMarsFx?.({kind:'rebuke',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,arenaHit});window.emitNetVfx?.('mars-rebuke',h,{targetTeam:t.team,targetId:t.id,arenaHit});let raw=Math.max(0,Math.floor(effectiveAtk(h)*1.5)),physical=physicalBaseDamage(h,t,raw);damage(t,physical,`${logIcon(h.id,'rebuke')} ${h.name} (God's Rebuke 150%): `,h,{impactDelay:180});afterSuccessfulBasicHit(h,t,physical);if(!t.dead&&marsArenaActive()&&t.team===G.marsArenaEnemyTeam){spellDamage(t,1,`${logIcon(h.id,'arena')} Arena of Blood: `,h,{impactDelay:250});addSkillLog(h,'rebuke',`${h.name} бьёт ${t.name} щитом на 150% от тычки и вбрасывает его в стену арены ещё на 1 магический урон.`)}else addSkillLog(h,'rebuke',`${h.name} бьёт ${t.name} щитом и наносит физический критический урон 150% от текущей тычки.`);putOnCooldown(h,'rebuke');spend()});return}
 else if(id==='arena'){playSkillSound(h,'arena');G.marsArenaTurns=4;G.marsArenaAppliedTurn=G.turnSerial||0;G.marsArenaTeam=h.team;G.marsArenaEnemyTeam=1-h.team;G.marsArenaCasterId=h.id;window.playMarsFx?.({kind:'arena-start',team:h.team,heroId:h.id,targetTeam:1-h.team,targetId:frontHero(1-h.team)?.id||null});window.emitNetVfx?.('mars-arena-start',h,{targetTeam:1-h.team,targetId:frontHero(1-h.team)?.id||null});putOnCooldown(h,'arena');addSkillLog(h,'arena',`${h.name} призывает Arena of Blood на 4 общих хода. Передний враг заперт в арене.`);spend();return}
 else if(['raze_near','raze_mid','raze_far'].includes(id)){let mode=id==='raze_near'?'near':id==='raze_mid'?'mid':'far';let t=shadowfiendRazeTarget(1-h.team,mode);if(!t){alert('Нет подходящей цели для Shadowraze.');return}playSkillSound(h,id);let stacks=t.sfMarks?.length||0,dmg=1+stacks,impact=SKILL_IMPACT_MS.shadowfiend.raze;spellDamage(t,dmg,`${logIcon(h.id,id)} ${h.name}: `,h,{impactDelay:impact});if(!t.dead&&canReceiveNegativeEffect(t)){t.sfMarks=t.sfMarks||[];t.sfMarks.push(1)}putOnCooldown(h,id);window.emitNetVfx?.('raze',t,{delay:impact});addSkillLog(h,id,canReceiveNegativeEffect(t)?`${h.name} использует ${heroSkillName(h.id,id)} по ${t.name} и накладывает эффект Опустошения (${stacks+1}).`:`${h.name} использует ${heroSkillName(h.id,id)} по ${t.name}, но эффект Опустошения не проходит сквозь невосприимчивость.`);render();setTimeout(()=>{t._razeFlash=true;render();setTimeout(()=>{t._razeFlash=false;render()},720)},impact);spend();return}
 else if(id==='souls'){chooseEnemy('Выберите врага для Requiem of Souls',()=>true,t=>castRequiem(h,t));return}
 else if(id==='lifesteal'){alert('Похищение жизни — пассивная способность. Она срабатывает после обычной атаки.');return}
 else if(id==='rage'){playSkillSound(h,'rage');dispelNegativeEffects(h,'normal');h.rageTurns=6;h.rageAppliedTurn=G.turnSerial||0;putOnCooldown(h,'rage');addSkillLog(h,'rage',`${h.name} использует Rage: нормальное развеивание, невосприимчивость к эффектам и 100% сопротивления магии на 6 общих ходов.`);spend();return}
 else if(id==='infest'){chooseAlly('Выберите союзника для Заражения',t=>t!==h,t=>{playSkillSound(h,'infest');h.hp=Math.min(h.maxHp,h.hp+2);h.infested=true;h.infestHost=t.id;h.infestTurns=1;putOnCooldown(h,'infest');addSkillLog(h,'infest',`${h.name} залезает в ${t.name}, восстанавливает 2 здоровья и прячется на 1 ход команды.`);spend()});return}
 else if(id==='tether'){if(h.tetherTargetId){breakTether(h);render();return}chooseAlly('Выберите союзника для Tether',t=>t!==h,t=>{playSkillSound(h,'tether');h.tetherTargetId=t.id;t.tetheredBy=h.id;addSkillLog(h,'tether',`${h.name} связывается с ${t.name}.`);spend()});return}
 else if(id==='spirits'){playSkillSound(h,'spirits');let timers=ioSpiritTimers(h),before=timers.length,target=before>0?3:2,added=Math.max(0,target-before);for(let i=0;i<added;i++)timers.push(12);h.spiritTimers=timers;syncIoSpiritSummary(h);putOnCooldown(h,'spirits');addSkillLog(h,'spirits',before>0?`${h.name} усиливает Spirits до ${h.spirits}: новые шарики получают 6 общих ходов, старые сохраняют свои таймеры.`:`${h.name} призывает 2 Spirits на 6 общих ходов.`);triggerIoSpiritHit(h);spend();return}
 else if(id==='relocate'){let ally=tetherTarget(h);if(!ally){alert('Сначала привяжите союзника через Tether.');return}let arr=G.teams[h.team],ioPos=arr.indexOf(h),allyPos=arr.indexOf(ally);if(ioPos<0||allyPos<0||ioPos===allyPos)return;playSkillSound(h,'relocate');putOnCooldown(h,'relocate');[arr[ioPos],arr[allyPos]]=[arr[allyPos],arr[ioPos]];G.front[h.team]=ioPos;G.holdFrontOnce=Array.isArray(G.holdFrontOnce)?G.holdFrontOnce:[false,false];G.holdFrontOnce[h.team]=true;addSkillLog(h,'relocate',`${h.name} меняется местами с ${ally.name}. ${ally.name} становится передним и получит следующий ход команды.`);G.actions=0;render();setTimeout(()=>endTurn(false,h),220);return}
 else if(id==='laser'){chooseEnemy('Выберите переднего врага для Laser',t=>!isForgeSpiritTarget(t),t=>{playSkillSound(h,'laser');t.tinkerBlindTurns=Math.max(Number(t.tinkerBlindTurns)||0,reducedNegativeTurns(t,3));pureDamage(t,2,`${logIcon(h.id,'laser')} ${h.name}: `,h,{impactDelay:180});putOnCooldown(h,'laser');addSkillLog(h,'laser',`${h.name} ослепляет ${t.name} на ${t.tinkerBlindTurns} общ. ход.`);try{playTinkerLaserFx(h,t,640)}catch(e){console.warn('Tinker Laser FX failed',e)}spend()});return}
 else if(id==='missile'){chooseEnemy('Выберите переднего врага для Heat-Seeking Missile',t=>!isForgeSpiritTarget(t),t=>{playSkillSound(h,'missile');playFile(miscAudio,'assets/audio/tinker_heat_missile.mp3');let pool=living(1-h.team).filter(x=>x!==t),other=pool.length?pool[Math.floor(Math.random()*pool.length)]:t;spellDamage(t,1,`${logIcon(h.id,'missile')} ${h.name}: `,h,{impactDelay:820});if(other)spellDamage(other,1,`${logIcon(h.id,'missile')} ${h.name}: `,h,{impactDelay:980});putOnCooldown(h,'missile');addSkillLog(h,'missile',`${h.name} запускает ракеты по ${t.name}${other&&other!==t?` и ${other.name}`:''}.`);try{animateMissile(h,t,0,820);if(other===t)animateMissile(h,t,160,840);else if(other)animateMissile(h,other,160,840)}catch(e){console.warn('Tinker Missile FX failed',e)}spend()});return}
 else if(id==='matrix'){playSkillSound(h,'matrix');h.tinkerMatrixShield=true;h.tinkerMatrixShieldTurns=6;h.tinkerMatrixShieldAppliedTurn=G.turnSerial||0;putOnCooldown(h,'matrix');addSkillLog(h,'matrix',`${h.name} получает Defense Matrix на 6 общих ходов: следующий входящий урон уменьшается на 1. После разрушения щита бонус третьего действия активен 2 общих хода.`);spend();return}
 else if(id==='rearm'){playSkillSound(h,'rearm');Object.keys(h.cd||{}).forEach(k=>h.cd[k]=0);Object.keys(h.itemCd||{}).forEach(k=>h.itemCd[k]=0);addSkillLog(h,'rearm',`${h.name} полностью сбрасывает свои перезарядки.`);render();return}
 else if(id==='hunger'){playSkillSound(h,'hunger');h.broodHungerTurns=Math.max(h.broodHungerTurns||0,8);h.broodHungerImmediate=true;h.broodHungerAppliedTurn=G?.turnSerial||0;putOnCooldown(h,'hunger');addSkillLog(h,'hunger',`${h.name} впадает в Insatiable Hunger на 4 общих хода. Эффект активен сразу: уже следующая тычка в этом же ходу получает +1 урон и 100% вампиризм.`);render();spend();return}
 else if(id==='spiderlings'){chooseEnemy('Выберите переднего врага для Spawn Spiderlings',t=>!isForgeSpiritTarget(t),t=>{playSkillSound(h,'spiderlings');playBroodFx?.({kind:'brood-spiderlings',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});window.emitNetVfx?.('brood-spiderlings',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});spellDamage(t,1,`${logIcon(h.id,'spiderlings')} ${h.name}: `,h,{impactDelay:120});h.broodEggTurns=1;putOnCooldown(h,'spiderlings');addSkillLog(h,'spiderlings',`${h.name} заражает ${t.name} коконом: через 1 свой ход появятся 2 паучка.`);spend()},'spiderlings');return}
 else if(id==='mist_coil'){chooseMistCoilTarget('Выберите цель для Mist Coil',t=>{playSkillSound(h,'mist_coil');window.playAbaddonFx?.({kind:'mist-coil',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});window.emitNetVfx?.('abaddon-mist-coil',h,{targetTeam:t.team,targetId:t.id,summonOwnerId:isForgeSpiritTarget(t)?t.ownerId:null});if(t.team===h.team){healHero(t,2,'Mist Coil');addSkillLog(h,'mist_coil',`${h.name} лечит ${t.name} на 2 HP с помощью Mist Coil.`)}else{spellDamage(t,2,`${logIcon(h.id,'mist_coil')} ${h.name}: `,h,{impactDelay:380});addSkillLog(h,'mist_coil',`${h.name} поражает ${t.name} способностью Mist Coil на 2 урона.`)}damage(h,1,`${logIcon(h.id,'mist_coil')} ${h.name}: отдача — `,null,{impactDelay:160});putOnCooldown(h,'mist_coil');spend()});return}
 else if(id==='aphotic_shield'){chooseAlly('Выберите союзника для Aphotic Shield',()=>true,t=>{playSkillSound(h,'aphotic_shield');strongDispel(t);applyAphoticShield(t,2);window.playAbaddonFx?.({kind:'aphotic-shield',team:h.team,heroId:h.id,targetTeam:t.team,targetId:t.id});window.emitNetVfx?.('abaddon-aphotic-shield',h,{targetTeam:t.team,targetId:t.id});putOnCooldown(h,'aphotic_shield');addSkillLog(h,'aphotic_shield',`${h.name} накладывает Aphotic Shield на ${t.name}: сильное развеивание и щит 2.`);spend()});return}
 else if(id==='borrowed'){if((h.borrowedTimeTurns||0)>0){alert('Borrowed Time уже активно.');return}if((h.cd.borrowed||0)>1)return;activateBorrowedTime(h);addSkillLog(h,'borrowed',`${h.name} вручную активирует Borrowed Time на 4 общих хода.`);spend();return}
 else if(id==='global'){useGlobalSilence(h);return}
 spend()}
const SKILL_ICONS={bane:['assets/skills/bane1.png','assets/skills/bane2.png'],techies:['assets/skills/techies1.png','assets/skills/techies2.png'],silencer:['assets/skills/silencer1.png','assets/skills/silencer2.png'],morphling:['assets/skills/morphling1.png','assets/skills/morphling2.png','assets/skills/morphling3.png'],shadowfiend:['assets/skills/shadowfiend_raze_near.png','assets/skills/shadowfiend_raze_mid.png','assets/skills/shadowfiend_raze_far.png','assets/skills/shadowfiend_presence.png','assets/skills/shadowfiend2.png'],lifestealer:['assets/skills/lifestealer1.png','assets/skills/lifestealer_rage.png','assets/skills/lifestealer2.png'],abaddon:['assets/skills/abaddon_mist_coil.png','assets/skills/abaddon_aphotic_shield.png','assets/skills/abaddon_borrowed_time.png'],io:['assets/skills/io_tether.png','assets/skills/io_spirits.png','assets/skills/io_relocate.png'],tinker:['assets/skills/tinker_laser.png','assets/skills/tinker_missile.png','assets/skills/tinker_defense_matrix.png','assets/skills/tinker_rearm.png'],invoker:['assets/skills/invoker_invoke.png','assets/skills/invoker_coldsnap.png','assets/skills/invoker_emp.png','assets/skills/invoker_sunstrike.png','assets/skills/invoker_forge.png','assets/skills/invoker_icewall.png','assets/skills/invoker_ghostwalk.png','assets/skills/invoker_meteor.png','assets/skills/invoker_tornado.png','assets/skills/invoker_deafeningblast.png','assets/skills/invoker_alacrity.png'],axe:['assets/skills/axe_call.png','assets/skills/axe_helix.png','assets/skills/axe_culling.png'],broodmother:['assets/skills/broodmother1.png','assets/skills/broodmother2.png','assets/skills/broodmother3.png'],mars:['assets/skills/mars_spear.png','assets/skills/mars_rebuke.png','assets/skills/mars_arena.png']};
function skillIcon(heroId,skillId){if(heroId==='io'&&skillId==='tether-break')return 'assets/skills/io_break_tether.png';let i=DATA[heroId].skills.findIndex(s=>s.id===skillId);return (SKILL_ICONS[heroId]||[])[i]||''}
function heroPortraitFallback(h){return h?.img||DATA[h?.id]?.img||''}
function scheduleHeroPortraitResume(v,delay=220){
 if(!v)return;
 try{clearTimeout(v.__dotaResumeTimer)}catch(_){}
 v.__dotaResumeTimer=setTimeout(()=>{
  if(document.hidden||!v.isConnected||v.ended)return;
  const p=v.play?.();if(p?.catch)p.catch(()=>{});
 },delay);
}
function armHeroPortraitVideo(v,h){
  if(!v)return;
  const portrait=v.closest?.('.hero-portrait');
  const fallback=heroPortraitFallback(h);
  if(portrait&&fallback){
    portrait.style.backgroundImage=`url("${String(fallback).replace(/"/g,'%22')}")`;
    portrait.style.backgroundSize='cover';portrait.style.backgroundPosition='center';portrait.style.backgroundRepeat='no-repeat';
  }
  const pending=()=>portrait?.classList.add('video-pending');
  const ready=()=>portrait?.classList.remove('video-pending');
  pending();
  v.addEventListener('playing',ready);
  v.addEventListener('canplay',()=>{if(!v.paused)ready()});
  v.addEventListener('waiting',pending);
  v.addEventListener('stalled',pending);
  v.addEventListener('emptied',pending);
  v.addEventListener('pause',()=>{pending();if(document.visibilityState==='visible')scheduleHeroPortraitResume(v,260)});
  v.addEventListener('error',pending);
}
function reviveHeroPortraitVideos(){
  document.querySelectorAll('#game .hero-portrait video').forEach(v=>{
    const portrait=v.closest('.hero-portrait');
    if(v.paused||v.readyState<2)portrait?.classList.add('video-pending');
    scheduleHeroPortraitResume(v,40);
  });
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(reviveHeroPortraitVideos,70)});
window.addEventListener('pageshow',()=>setTimeout(reviveHeroPortraitVideos,70));
function updateBattleUnitLayout(){
  if(!G)return;
  const bf=document.querySelector('#game .battlefield');if(!bf)return;
  const counts=[0,1].map(t=>(G.teams?.[t]||[]).filter(h=>!h.infested).length);
  [0,1].forEach(t=>{
    const team=document.getElementById(`team${t}`);if(!team)return;
    const c=counts[t];team.dataset.unitCount=String(c);
    team.classList.toggle('has-extra',c>3);
    team.classList.toggle('has-four',c===4);
    team.classList.toggle('has-five-plus',c>=5);
  });
  bf.classList.toggle('expand-left',counts[0]>3);
  bf.classList.toggle('expand-right',counts[1]>3);
  bf.classList.toggle('expand-both',counts[0]>3&&counts[1]>3);
  syncBattleResponsiveVars();
}
function ensureHeroNode(h){let id=`hero-${h.team}-${h.id}`,d=document.getElementById(id);if(d)return d;d=document.createElement('div');d.id=id;d.dataset.hero=h.id;d.innerHTML=`<div class="hero-portrait">${h.staticPortrait?'<img class="static-hero-portrait" alt="">':'<video autoplay muted loop playsinline preload="auto"></video>'}<img class="silence-overlay" src="assets/silence_overlay.png" alt="Безмолвие"><img class="sticky-bomb-overlay" src="assets/status_sticky_bomb_v167.png" alt="Sticky Bomb"><div class="io-tether-anchor" aria-hidden="true"></div><svg class="spirits-v107" viewBox="0 0 160 160" aria-hidden="true" style="display:none;position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:20"><circle cx="80" cy="80" r="55" fill="none" stroke="#9ae5ff" stroke-width="1.8" opacity=".8"/><g class="spirit-rotor"><g class="spirit-ball" transform="rotate(0 80 80)"><circle cx="135" cy="80" r="9" fill="#46a9ff" opacity=".35"/><circle cx="135" cy="80" r="5" fill="#c6f7ff"/><circle cx="135" cy="80" r="2.5" fill="white"/></g><g class="spirit-ball" transform="rotate(120 80 80)"><circle cx="135" cy="80" r="9" fill="#46a9ff" opacity=".35"/><circle cx="135" cy="80" r="5" fill="#c6f7ff"/><circle cx="135" cy="80" r="2.5" fill="white"/></g><g class="spirit-ball" transform="rotate(240 80 80)"><circle cx="135" cy="80" r="9" fill="#46a9ff" opacity=".35"/><circle cx="135" cy="80" r="5" fill="#c6f7ff"/><circle cx="135" cy="80" r="2.5" fill="white"/></g></g></svg><div class="matrix-film" aria-hidden="true"><i></i></div><div class="rage-aura" aria-hidden="true"><i></i></div><div class="laser-blind-fx" aria-hidden="true"><i></i></div><div class="sf-mark-overlay"><img src="assets/skills/shadowraze_status.png" alt="Shadowraze"><b>0</b></div><div class="tether-status-overlay"><img src="assets/skills/io_tether.png" alt="Tether"></div><div class="item-debuff-overlay"><img alt="Предмет"></div><div class="sf-presence-overlay" title="Presence of the Dark Lord: броня −1"><img src="assets/skills/shadowfiend_presence.png" alt="Presence of the Dark Lord"></div><div class="hero-mastery-slot"></div><div class="invoker-effect-overlays"></div><div class="alacrity-persistent" aria-hidden="true"><i></i><i></i><i></i></div><div class="mine-explosion"></div></div><div class="shadowraze-impact" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="bane-grip-hands" aria-hidden="true"><i></i><i></i><i></i></div><div class="infest-indicator" aria-hidden="true"><i></i><b></b></div><img class="lane-mine" src="assets/proximity_mine.png" alt="Мина"><div class="hero-body"><div class="hero-name-row"><div class="hero-name"></div></div><div class="stats"><span class="stat hpstat"></span><span class="stat atkstat"></span><span class="stat armorstat"></span></div><div class="hpbar"><i></i></div><button class="inspect-hero" type="button">КАРТОЧКА</button><div class="status"></div><div class="item-inventory"></div></div>`;d.dataset.team=String(h.team);if(h.staticPortrait){d.querySelector('.static-hero-portrait').src=h.portrait}else{let v=d.querySelector('video');const cached=matchPreloadVideos.get(h.portrait)||matchPreloadVideos.get(battlePortraitSrcFor(h.id));if(cached){try{cached.pause();cached.remove()}catch(_){}matchPreloadVideos.delete(h.portrait);matchPreloadVideos.delete(battlePortraitSrcFor(h.id));}v.src=h.portrait;v.loop=true;v.muted=true;v.autoplay=true;v.playsInline=true;v.preload='auto';v.defaultMuted=true;v.controls=false;v.disablePictureInPicture=true;v.disableRemotePlayback=true;v.poster=h.img;v.setAttribute('controlslist','nodownload nofullscreen noremoteplayback');armHeroPortraitVideo(v,h);v.onended=()=>{try{v.currentTime=0;v.play().catch(()=>{})}catch(_){}};v.onpause=null;v.play().catch(()=>{});setTimeout(()=>{try{if(v.paused)v.play().catch(()=>{})}catch(_){}} ,120)}d.querySelector('.inspect-hero').onclick=e=>{e.stopPropagation();openInspect(h.id)};return d}
function renderForgeSpiritCard(owner,heroNode){let d=heroNode.querySelector('.forge-spirit-card'),spirit=owner?.forgeSpirit;if(!isForgeSpiritTarget(spirit)){d?.remove();return}if(!d){d=document.createElement('div');d.className='forge-spirit-card';d.dataset.owner=owner.id;d.innerHTML=`<div class="forge-spirit-media"><video autoplay muted loop playsinline preload="auto" src="assets/portraits/forge_spirit.webm"></video></div><div class="forge-spirit-copy"><b>FORGE SPIRIT</b><span class="forge-spirit-stats"></span><small class="forge-spirit-turns"></small></div>`;d.onclick=e=>{e.stopPropagation();pickTarget(owner.forgeSpirit)};heroNode.insertBefore(d,heroNode.firstChild);let v=d.querySelector('video');v.play().catch(()=>{})}let targetable=!!(targetMode&&targetMode.team===spirit.team&&targetMode.filter(spirit));d.classList.toggle('targetable',targetable);d.querySelector('.forge-spirit-stats').textContent=`❤️ ${spirit.hp}/${spirit.maxHp} · ⚔️ ${spirit.atk}`;d.querySelector('.forge-spirit-turns').textContent=`${spirit.turns} общ. ход.`}
function renderInvokerCastingState(h,heroNode){let old=heroNode.querySelector('.invoker-casting-state');if(h.id!=='invoker'||!h.invoking){old?.remove();return}let d=old||document.createElement('div');d.className='invoker-casting-state';d.innerHTML='<img src="assets/skills/invoker_invoke.png" alt="Invoke"><span class="invoker-casting-shade"></span><b>КОЛДУЕТ...</b>';if(!old)heroNode.appendChild(d)}
function renderTeam(t,sel){let box=$(sel),f=active(t),line=currentLineOrder(t),rest=G.teams[t].filter(h=>!line.includes(h)),ordered=[...line,...rest],arenaOn=marsArenaActive(),arenaEnemyFront=arenaOn?frontHero(G.marsArenaEnemyTeam):null,arenaOwnFront=arenaOn?frontHero(G.marsArenaTeam):null,arenaCaster=(h)=>arenaOn&&h.id==='mars'&&h.team===G.marsArenaTeam,arenaFighter=(h)=>arenaOn&&(h===arenaEnemyFront||h===arenaOwnFront);ordered.forEach(h=>{let d=ensureHeroNode(h);if(d.parentNode!==box)box.appendChild(d);let depth=line.indexOf(h);d.style.order=depth>=0?String(t===0?100-depth:depth+1):String(t===0?-1000:1000);let tetherSource=(h.id==='io'&&h.tetherTargetId),isTetherTarget=!!h.tetheredBy;d.className='hero'+(h===f?' front':'')+(h===active()&&t===G.team?' active':'')+(h.dead?' dead':'')+((h.ghostWalkTurns||0)>0?' ghostwalk':'')+((h.tornadoAirborne||0)>0?' tornadoed':'')+(isHeroSilenced(h)?' silenced':'')+(h._mineBoom?' mine-boom':'')+(h._bombBoom?' bomb-boom':'')+(G.bombs.some(b=>b.team===t&&G.teams[t][b.idx]===h&&b.turns>0)?' has-sticky-bomb':'')+(G.mines[t]&&h===f?' has-lane-mine':'')+(targetMode&&targetModeAcceptsTeam(t)&&!h.dead&&(!targetMode.frontOnly||h===frontHero(t))&&targetMode.filter(h)?' targetable':'')+(h.infested?' infested':'')+(h.gripped&&h.stun>0?' bane-gripped':'')+(h._razeFlash?' shadowraze-hit':'')+(G.teams[t].some(ls=>ls.infested&&ls.infestHost===h.id)?' infest-host':'')+(tetherSource?' tether-source':'')+(isTetherTarget?' tether-target':'')+(h.id==='io'&&syncIoSpiritSummary(h).length>0?' spirits-active':'')+((h.tinkerMatrixShield||0)?' matrix-shielded':'')+(((h.tinkerMatrixBoostTurns||0)>0)?' matrix-boosted':'')+(((h.rageTurns||0)>0)?' rage-active':'')+(((h.tinkerBlindTurns||0)>0)?' blind-active':'')+(((h.borrowedTimeTurns||0)>0)?' borrowed-time-active':'')+(((h.aphoticShield||0)>0)?' aphotic-shielded':'')+(((h.pipeShield||0)>0&&(h.pipeShieldTurns||0)>0)?' pipe-shielded':'')+(((h.skadiTurns||0)>0)?' skadi-affected':'')+(arenaCaster(h)?' mars-arena-caster':'')+(h===arenaEnemyFront?' mars-arena-target':'')+(arenaFighter(h)?' mars-arena-fighter':'')+(window.enigmaBlackHoleKeepsHero?.(h)?' enigma-black-hole-victim':'');let sfBadge=d.querySelector('.sf-mark-overlay');if(sfBadge){sfBadge.classList.toggle('show',!!h.sfMarks?.length);sfBadge.querySelector('b').textContent=h.sfMarks?.length||0;sfBadge.title=h.sfMarks?.length?`Опустошение Shadow Fiend: ${h.sfMarks.length} метк.`:''}let itemDeb=d.querySelector('.item-debuff-overlay');if(itemDeb){itemDeb.classList.toggle('show',!!(h.itemSilence||h.magicDebuff));if(h.itemSilence){itemDeb.querySelector('img').src=ITEMS[h.itemSilence.item]?.img||'';itemDeb.title=`${h.itemSilence.name}: безмолвие ${itemSilenceTurns(h.itemSilence)} ход. команды цели • накоплено ${h.itemSilence.damage||0}`;}else if(h.magicDebuff){itemDeb.querySelector('img').src=ITEMS[h.magicDebuff.item]?.img||'';itemDeb.title=`${h.magicDebuff.name}: +${h.magicDebuff.bonus} к урону заклинаний`;}else itemDeb.title=''}let spirits=d.querySelector('.spirits-v107');if(spirits){let count=h.id==='io'?syncIoSpiritSummary(h).length:0;count=Math.max(0,Math.min(3,Number(count)||0));spirits.style.display=count>0&&!h.dead?'block':'none';spirits.setAttribute('data-count',String(count));spirits.querySelectorAll('.spirit-ball').forEach((ball,i)=>{ball.style.display=i<count?'inline':'none';ball.setAttribute('transform',`rotate(${i*360/Math.max(1,count)} 80 80)`)})}let tetherOverlay=d.querySelector('.tether-status-overlay');if(tetherOverlay){tetherOverlay.classList.toggle('show', tetherSource||isTetherTarget);tetherOverlay.title=(tetherSource||isTetherTarget)?'Tether активен':''}let sfPresence=d.querySelector('.sf-presence-overlay');if(sfPresence){let pres=shadowfiendPresencePenalty(h)>0,sfTeam=pres?1-h.team:-1;sfPresence.classList.toggle('show',pres);sfPresence.classList.toggle('from-left',pres&&sfTeam===0);sfPresence.classList.toggle('from-right',pres&&sfTeam===1)}let invFx=d.querySelector('.invoker-effect-overlays');if(invFx){let fx=invokerOverlayEffects(h);setHTMLCached(invFx,fx.map(f=>`<span class="invoker-effect-dot ${f.tone}" title="${f.label}"><img src="${f.icon}" alt="">${f.count!==''?`<b>${f.count}</b>`:''}</span>`).join(''));invFx.classList.toggle('show',fx.length>0)}let ala=d.querySelector('.alacrity-persistent');if(ala)ala.classList.toggle('show',(h.alacrityTurns||0)>0);let inv=d.querySelector('.item-inventory');if(inv){let inventoryHtml=(h.items||[]).map(id=>{let it=ITEMS[id],sell=canSellItem(h,id),refund=itemSellPrice(id),title=sell?`${it.name} • нажми, чтобы продать за ${refund} золота`:it.name;return `<button type="button" class="item-owned${sell?' sellable':''}" data-sell-item="${id}" title="${title}"><img src="${it.img}" alt="${it.name}"></button>`}).join('');setHTMLCached(inv,inventoryHtml);inv.querySelectorAll('[data-sell-item]').forEach(btn=>{btn.onclick=e=>{e.preventDefault();e.stopPropagation();sellItem(h,btn.dataset.sellItem)}})};d.onclick=()=>pickTarget(h);let hp=Math.max(0,Math.min(100,h.maxHp>0?(h.hp/h.maxHp*100):0));d.querySelector('.hero-name').textContent=h.name;let masterySlot=d.querySelector('.hero-mastery-slot');if(masterySlot)setHTMLCached(masterySlot,window.DotaProfile?.masteryBadgeHTML?.(t,h.id,true)||'');d.querySelector('.hpstat').textContent=`❤️ ${compactStatNum(h.hp)}/${compactStatNum(h.maxHp)}`;let shownArmor=displayArmorValue(h);d.querySelector('.atkstat').innerHTML=`<span class="atkstat-icon" aria-hidden="true">⚔️</span><span class="atkstat-value">${compactStatNum(effectiveAtk(h))}</span>`;let armorStat=d.querySelector('.armorstat');if(armorStat)armorStat.textContent=shownArmor?`🛡 ${shownArmor}`:'';let hpFill=d.querySelector('.hpbar i');if(hpFill){hpFill.style.setProperty('width',`${hp}%`,'important');hpFill.style.setProperty('transform','none','important');hpFill.setAttribute('data-hp-percent',String(hp))};let portraitNode=d.querySelector('.hero-portrait');if(portraitNode)portraitNode.removeAttribute('title');let statusHtml='';if((h.tinkerBlindTurns||0)>0)statusHtml+=statusBadge(`${h.tinkerBlindTurns}`,'bad-blind effect-tile blind-tile',skillIcon('tinker','laser'));if(h.tinkerMatrixShield)statusHtml+=statusBadge(`${h.tinkerMatrixShieldTurns||6}`,'effect-tile matrix-tile',skillIcon('tinker','matrix'));if((h.tinkerMatrixBoostTurns||0)>0)statusHtml+=statusBadge(`+${h.tinkerMatrixBoostTurns}`,'effect-tile matrix-boost-tile',skillIcon('tinker','matrix'));if((h.rageTurns||0)>0)statusHtml+=statusBadge(`${h.rageTurns}`,'effect-tile rage-tile',skillIcon('lifestealer','rage'));if((h.aphoticShield||0)>0)statusHtml+=statusBadge(`${h.aphoticShield}`,'effect-tile aphotic-shield-tile',skillIcon('abaddon','aphotic_shield'));if((h.borrowedTimeTurns||0)>0)statusHtml+=statusBadge(`${h.borrowedTimeTurns}`,'effect-tile borrowed-time-tile',skillIcon('abaddon','borrowed'));if((h.pipeShield||0)>0&&(h.pipeShieldTurns||0)>0)statusHtml+=statusBadge(`${h.pipeShield}`,'effect-tile pipe-shield-tile',ITEMS.pipe.img);if((h.skadiTurns||0)>0)statusHtml+=statusBadge(`${h.skadiTurns}`,'effect-tile skadi-tile',ITEMS.skadi.img);d.querySelector('.status').innerHTML=statusHtml;renderBroodlingsCard(h,d);renderForgeSpiritCard(h,d);renderInvokerCastingState(h,d)}) ; renderTetherFx()}
function renderBroodlingsCard(owner,heroNode){let wrap=heroNode.querySelector('.broodlings-summons'),timers=owner?.broodlingTimers||[],hpArr=owner?.broodlingHp||[],show=!!(owner&&owner.id==='broodmother'&&timers.length&&!owner.dead);heroNode?.classList.toggle('has-broodlings',show);if(!show){wrap?.remove();return}if(!wrap){wrap=document.createElement('div');wrap.className='broodlings-summons';heroNode.insertBefore(wrap,heroNode.firstChild)}let atk=.5+(broodHungerActive(owner)?.5:0);setHTMLCached(wrap,timers.map((t,i)=>{let hp=Math.max(0,Number(hpArr[i]??2)),turns=Math.max(1,Math.ceil(Number(t||0)/2));return `<div class="broodling-summon-card"><div class="broodling-summon-media"><video src="assets/portraits/spiderling.webm" poster="assets/spiderling_portrait_v178.png" autoplay loop muted playsinline preload="auto" aria-label="Паучок"></video></div><div class="broodling-summon-copy"><b>ПАУЧОК</b><span class="broodling-summon-stats">❤️ ${hp}/2<br>⚔️ ${atk}</span><small class="broodling-summon-turns" title="Осталось общих ходов">${turns} ход.</small></div></div>`}).join(''));wrap.querySelectorAll('video').forEach(v=>{v.muted=true;v.playsInline=true;v.play?.().catch(()=>{})})}
function openInspect(id){$('#inspectSheet').innerHTML=abilitySheetHTML(id);$('#inspectModal').classList.remove('hidden')}
function closeInspect(){$('#inspectModal').classList.add('hidden')}
function render(){if(!G)return;renderTurnQueue();renderTeam(0,'#team0');renderTeam(1,'#team1');updateBattleUnitLayout();let h=active();$('#turnLabel').innerHTML=targetMode?`<span class="target-hint">🎯 ${targetMode.promptText}</span>`:`Ход Игрока ${G.team+1} — ${h?.name||''}`;let shownMaxActions=(h?.id==='tinker'&&(h?.tinkerMatrixBoostTurns||0)>0)?3:2;$('#actionsLabel').textContent=h?.id==='invoker'?`Действия Invoker: ${G.actions}`:`Действия: ${G.actions}/${shownMaxActions}`;renderShops();
 let acts=$('#actions');acts.innerHTML='';if(h&&!h.dead&&!targetMode&&!h.invoking){let disarmed=(h.disarmTurns||0)>0;let b=document.createElement('button');b.className='attack';b.textContent=disarmed?'⚔️ Герой обезоружен':(G.attackUsed?'⚔️ Атака уже использована':`⚔️ Атака (${effectiveAtk(h)})`);b.disabled=G.attackUsed||G.actions<1||disarmed;b.onclick=basicAttack;acts.appendChild(b);if(h.id==='invoker'){let invokeBtn=document.createElement('button');invokeBtn.className='skill';let invokeUsed=!!h.turnUsed?.invoke;invokeBtn.innerHTML=`<img class="skill-icon" src="${skillIcon('invoker','invoke')}"><span>Invoke${invokeUsed?' [ИСП.]':''}</span>`;invokeBtn.disabled=G.actions<1||isHeroSilenced(h)||invokeUsed;invokeBtn.title=DATA.invoker.skills[0].desc;invokeBtn.onclick=()=>skill('invoke');acts.appendChild(invokeBtn);(h.invokedSpells||[]).forEach(id=>{let x=document.createElement('button');x.className='skill invoker-spell';let cd=Math.max(0,(h.cd[id]||0)-1);x.innerHTML=`<img class="skill-icon" src="${skillIcon('invoker',id)}"><span>${heroSkillName('invoker',id)}${cd?` [КД ${cd}]`:''}</span>`;x.title=DATA.invoker.skills.find(s=>s.id===id)?.desc||'';x.disabled=(h.cd[id]||0)>1||isHeroSilenced(h);x.onclick=()=>castInvokedSpell(h,id);acts.appendChild(x)});if(h.forgeSpirit?.turns>0){let x=document.createElement('button');x.className='skill invoker-spell';x.innerHTML=`<img class="skill-icon" src="assets/skills/invoker_forge.png"><span>Forge Spirit${h.forgeSpirit.used?' [ИСП.]':''}</span>`;let fsBlocked=!!h.forgeSpirit.used||(h.forgeSpirit.disarmTurns||0)>0||(h.forgeSpirit.tornadoAirborne||0)>0;x.disabled=fsBlocked;x.title=fsBlocked?'Forge Spirit сейчас не может атаковать.':'Бесплатная атака духом: 1 урон и -1 броня.';x.onclick=()=>castForgeSpiritAttack(h);acts.appendChild(x)}}else if(G.actions>0||h.id==='tinker'){DATA[h.id].skills.forEach(s=>{if(s.id==='global')return;let x=document.createElement('button');x.className='skill';let cd=Math.max(0,(h.cd[s.id]||0)-1);if(h.id==='phantomlancer'&&s.id==='lance')cd=Math.min(1,cd);let oncePerTurnUsed=false;let icon=skillIcon(h.id,s.id);let name=s.name;let desc=s.desc;let disabledPassive=!!s.passive;let isFreeTinkerRearm=(h.id==='tinker'&&s.id==='rearm');if(h.id==='io'&&s.id==='tether'&&h.tetherTargetId){icon=skillIcon('io','tether-break');name='Break Tether';desc='Разрывает текущую связь Tether без траты действия.'}x.innerHTML=`${icon?`<img class="skill-icon" src="${icon}">`:''}<span>${name}${cd?` [КД ${cd}]`:oncePerTurnUsed?' [ИСП.]':''}</span>`;x.title=desc;x.disabled=disabledPassive||(h.cd[s.id]||0)>1||isHeroSilenced(h)||oncePerTurnUsed||(!isFreeTinkerRearm&&G.actions<1);if(!disabledPassive&&isHeroSilenced(h)){x.querySelector('span').textContent=name+' [БЕЗМОЛВИЕ]';x.title='Герой обезмолвлен. Способность будет доступна после окончания безмолвия. '+desc}else if(!disabledPassive&&cd){x.title='Перезарядка: '+cd+' ход. героя. '+desc}x.onclick=()=>skill(s.id);acts.appendChild(x)})}}
 if(!targetMode){G.teams[G.team].filter(x=>x.id==='silencer'&&!x.dead).forEach(sil=>{let x=document.createElement('button');x.className='skill global-skill';x.innerHTML=`<img class="skill-icon" src="${skillIcon('silencer','global')}"><span>Global Silence</span>`;x.title='Можно использовать в любой ход своей команды, пока Silencer жив. Если сейчас ход другого союзника, действие будет списано со следующей активации Silencer.';let gcd=Math.max(0,(sil.cd.global||0)-1);if(gcd)x.querySelector('span').textContent+=` [КД ${gcd}]`;x.disabled=isHeroSilenced(sil)||(sil.cd.global||0)>1;x.onclick=()=>useGlobalSilence(sil);acts.appendChild(x)})}
 if(h&&!h.dead&&!targetMode){(h.items||[]).forEach(id=>{let it=ITEMS[id];if(!it)return;let cd=Math.max(0,(h.itemCd?.[id]||0)-1),x=document.createElement('button');x.className='skill item-action'+(it.active?'':' item-passive');let state=id==='vladmir'||id==='assault'||id==='radiance'?' [АУРА]':id==='morbid'?' [ВАМПИРИЗМ]':id==='heart'?' [РЕГЕН]':id==='talisman'||id==='mkb'||id==='butterfly'?' [УКЛОН]':id==='desolator'?' [БРОНЯ−]':id==='kaya'||id==='kaya_sange'||id==='yasha_kaya'?' [МАГИЯ]':id==='yasha'||id==='sange_yasha'||id==='eaglesong'?' [ПОВТОР]':id==='sange'||id==='cloak'||id==='pipe'?' [РЕЗИСТ]':id==='skadi'?' [АНТИХИЛ]':id==='crystalys'||id==='daedalus'?' [КРИТ]':cd?` [КД ${cd}]`:(it.active?' [ГОТОВ]':'');x.innerHTML=`<img class="skill-icon" src="${it.img}"><span>${it.name}${state}</span>`;x.title=it.desc;if(it.active){x.disabled=(h.itemCd?.[id]||0)>1||(!it.free&&G.actions<1);x.onclick=()=>useItem(h,id)}else{x.disabled=true}acts.appendChild(x)})}
 if(targetMode){let c=document.createElement('button');c.textContent='Отмена выбора цели';c.onclick=cancelTarget;acts.appendChild(c)}
 setHTMLCached($('#log'),G.log.map(x=>`<div>${x}</div>`).join('')||'<div>Бой начинается.</div>');let eff=[];for(const team of G.teams)for(const h of team){if(h.id==='io'&&syncIoSpiritSummary(h).length>0&&!h.dead)eff.push(`🌀 Spirits у ${h.name}: ${h.spirits} шар(а) • таймеры ${h.spiritTimers.map(x=>Math.ceil(x/2)).join('/')} общих ходов`);if(itemSilenceTurns(h.itemSilence)>0)eff.push(`🔇 ${h.itemSilence.name} на ${h.name}: ${itemSilenceTurns(h.itemSilence)} ход. команды цели • накоплено ${h.itemSilence.damage||0} урона`)}G.bombs.forEach(b=>{let h=G.teams[b.team][b.idx];if(h&&!h.dead)eff.push(`💣 Бомба на ${h.name}: ${b.turns} полухода`)});if(G.mines[0])eff.push('<div class="field-mine">💥 МИНА перед Игроком 1 — взорвётся в начале его хода и нанесёт 4 переднему герою</div>');if(G.mines[1])eff.push('<div class="field-mine">💥 МИНА перед Игроком 2 — взорвётся в начале его хода и нанесёт 4 переднему герою</div>');setHTMLCached($('#effects'),'<b>Эффекты поля</b><br><br>'+(eff.join('<br>')||'Нет активных эффектов.'));document.body.classList.toggle('pl-resolving',!!G.resolving);if(G.resolving){$('#turnLabel').textContent=G.resolving==='requiem'?'☄ Shadow Fiend готовит Requiem…':G.resolving==='multiattack'?'⚡ Выполняется дополнительная тычка…':'🔱 Phantom Lancer атакует…';$('#actions').querySelectorAll('button').forEach(b=>b.disabled=true)}$('#endTurnBtn').disabled=G.winner!==null||!!G.resolving||!!h?.invoking}
function renderTetherFx(){let layer=document.getElementById('tetherFxLayer');if(!layer){layer=document.createElement('div');layer.id='tetherFxLayer';let bf=document.querySelector('#game .battlefield');if(bf)bf.appendChild(layer)}layer.innerHTML='';if(!G)return;for(const team of G.teams){for(const hero of team){if(hero.id!=='io'||!hero.tetherTargetId||hero.dead)continue;let ally=tetherTarget(hero);if(!ally||ally.dead)continue;let from=document.querySelector(`#hero-${hero.team}-${hero.id} .hero-portrait`);let toCard=document.querySelector(`#hero-${ally.team}-${ally.id}`);let bf=document.querySelector('#game .battlefield');if(!from||!toCard||!bf)continue;let b=bf.getBoundingClientRect(),r1=from.getBoundingClientRect(),r2=toCard.getBoundingClientRect();let x1=r1.left-b.left+r1.width/2,y1=r1.top-b.top+r1.height/2;let cx2=r2.left-b.left+r2.width/2,cy2=r2.top-b.top+r2.height/2;let dx=cx2-x1,dy=cy2-y1;let x2,y2;if(Math.abs(dx)>=Math.abs(dy)){x2=(dx>=0?r2.left:r2.right)-b.left;y2=Math.max(r2.top,Math.min(r2.bottom,b.top+y1))-b.top}else{x2=Math.max(r2.left,Math.min(r2.right,b.left+x1))-b.left;y2=(dy>=0?r2.top:r2.bottom)-b.top}let len=Math.hypot(x2-x1,y2-y1),ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;let div=document.createElement('div');div.className='tether-beam';div.style.width=len+'px';div.style.left=x1+'px';div.style.top=y1+'px';div.style.transform=`translateY(-50%) rotate(${ang}deg)`;layer.appendChild(div)}}}
window.addEventListener('resize',()=>{if(G)renderTetherFx()});
ensureShopCatalogDOM();document.querySelectorAll('.shop-toggle').forEach(b=>b.onclick=()=>toggleShop(Number(b.dataset.team)));bindShopItems();
$('#startBtn').onclick=start;$('#endTurnBtn').onclick=()=>endTurn(false);$('#restartBtn').onclick=()=>{targetMode=null;G=null;chosen=[];draftPreview=null;clearBattlefield();closeInspect();closeHeroPick();if(typeof window.DotaReturnToMenu==='function'){window.DotaReturnToMenu();return}location.href=location.pathname};$('#rulesBtn').onclick=()=>$('#modal').classList.remove('hidden');$('#closeModal').onclick=()=>$('#modal').classList.add('hidden');$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};$('#closeHeroPick').onclick=closeHeroPick;$('#heroPickModal').onclick=e=>{if(e.target.id==='heroPickModal')closeHeroPick()};$('#closeInspect').onclick=closeInspect;$('#inspectModal').onclick=e=>{if(e.target.id==='inspectModal')closeInspect()};$('#confirmHeroPick').onclick=()=>{if(!draftPreview||chosen.includes(draftPreview)||chosen.length>=6)return;if(!canLocalDraftPick()){alert(`Сейчас выбирает Игрок ${draftTurn()+1}.`);return}const picked=draftPreview;closeHeroPick();requestAnimationFrame(()=>{if(chosen.includes(picked)||chosen.length>=6)return;chosen.push(picked);updateDraft()})};draft();
