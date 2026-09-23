import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { WebSocketServer } from 'ws';

const PORT = Number(process.env.PORT || 10000);
const rooms = new Map();
const STATS_FILE = process.env.STATS_FILE || './stats.json';

const RANKS=[
 [0,'Без ранга',1],[50,'Рекрут 1',2],[150,'Рекрут 2',3],[300,'Рекрут 3',4],[450,'Рекрут 4',5],[600,'Рекрут 5',6],
 [800,'Страж 1',7],[900,'Страж 2',8],[1100,'Страж 3',9],[1250,'Страж 4',10],[1400,'Страж 5',11],
 [1600,'Рыцарь 1',12],[1700,'Рыцарь 2',13],[1850,'Рыцарь 3',14],[2000,'Рыцарь 4',15],[2200,'Рыцарь 5',16],
 [2400,'Герой 1',17],[2500,'Герой 2',18],[2600,'Герой 3',19],[2800,'Герой 4',20],[2950,'Герой 5',21],
 [3100,'Легенда 1',22],[3250,'Легенда 2',23],[3400,'Легенда 3',24],[3600,'Легенда 4',25],[3700,'Легенда 5',26],
 [3850,'Властелин 1',27],[4000,'Властелин 2',28],[4200,'Властелин 3',29],[4300,'Властелин 4',30],[4500,'Властелин 5',31],
 [4700,'Божество 1',32],[4850,'Божество 2',33],[5000,'Божество 3',34],[5250,'Божество 4',35],[5400,'Божество 5',36],
 [6000,'Титан',37],[7000,'Титан II',38],[8000,'Титан III',39]
];

function rankFor(mmr){mmr=Math.max(0,Math.floor(Number(mmr)||0));let r=RANKS[0];for(const x of RANKS){if(mmr>=x[0])r=x;else break}return {rank:r[1],rankIndex:r[2]}}
function safeNick(v){return String(v||'Игрок').trim().slice(0,24)||'Игрок'}
function playerKey(p){return String(p?.id||p?.profileId||safeNick(p?.nick)).trim().toLowerCase().slice(0,80)}
function cleanHeroes(arr){return [...new Set((Array.isArray(arr)?arr:[]).map(x=>String(x||'').trim()).filter(Boolean))].slice(0,3)}

let stats={players:{},heroes:{},matches:{}};
try{
  const raw=JSON.parse(fs.readFileSync(STATS_FILE,'utf8'));
  if(raw&&typeof raw==='object')stats={players:raw.players||{},heroes:raw.heroes||{},matches:raw.matches||{}};
}catch{}
function saveStats(){try{fs.writeFileSync(STATS_FILE,JSON.stringify(stats,null,2))}catch(e){console.error('stats save failed',e?.message||e)}}

const cors={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type',
  'Content-Type':'application/json'
};
const send=(res,code,obj)=>{res.writeHead(code,cors);res.end(JSON.stringify(obj));};
const view=(id,r)=>({id,name:r.name,players:r.clients.size,maxPlayers:2,createdAt:r.createdAt,hostProfile:r.hostProfile});

function createRoom(name='Лобби',hostProfile=null){
  let id;do id=crypto.randomBytes(5).toString('hex');while(rooms.has(id));
  const r={name:String(name||'Лобби').slice(0,64),hostProfile,clients:new Map(),createdAt:new Date().toISOString(),latestState:null,emptyAt:null};
  rooms.set(id,r);
  return view(id,r);
}
function leaderboard(){
  return Object.values(stats.players)
    .sort((a,b)=>(b.rating||0)-(a.rating||0)||String(a.nick).localeCompare(String(b.nick)))
    .slice(0,100)
    .map((p,i)=>({place:i+1,nick:p.nick,rating:p.rating,...rankFor(p.rating)}));
}
function heroStats(){
  return Object.entries(stats.heroes)
    .map(([heroId,h])=>({heroId,winrate:h.games?Math.round((h.wins/h.games)*1000)/10:0}))
    .sort((a,b)=>b.winrate-a.winrate||a.heroId.localeCompare(b.heroId));
}
function applyMatch(body){
  const matchId=String(body?.matchId||'').trim().slice(0,120);
  const winner=Number(body?.winner);
  const players=Array.isArray(body?.players)?body.players:[];
  const teams=Array.isArray(body?.teams)?body.teams:[];
  if(!matchId||![0,1].includes(winner)||players.length<2||teams.length<2)return {ok:false,error:'invalid_match'};
  if(stats.matches[matchId])return {ok:true,duplicate:true};

  for(let t=0;t<2;t++){
    const p=players[t]||{};
    const key=playerKey(p);
    const existing=stats.players[key];
    const base=Math.max(0,Math.floor(Number(existing?.rating ?? p.rating)||0));
    const rating=Math.max(0,base+(t===winner?40:-20));
    stats.players[key]={nick:safeNick(p.nick),rating,updatedAt:Date.now()};
    for(const heroId of cleanHeroes(teams[t])){
      const h=stats.heroes[heroId]||{games:0,wins:0};
      h.games++;
      if(t===winner)h.wins++;
      stats.heroes[heroId]=h;
    }
  }

  stats.matches[matchId]={winner,at:Date.now()};
  const ids=Object.keys(stats.matches);
  if(ids.length>5000){
    ids.sort((a,b)=>(stats.matches[a]?.at||0)-(stats.matches[b]?.at||0));
    for(const id of ids.slice(0,ids.length-5000))delete stats.matches[id];
  }
  saveStats();
  return {ok:true};
}

const server=http.createServer(async(req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(req.method==='OPTIONS'){res.writeHead(204,cors);return res.end();}
  if(u.pathname==='/health')return send(res,200,{ok:true});
  if(u.pathname==='/api/lobbies'&&req.method==='GET')return send(res,200,{lobbies:[...rooms].map(([id,r])=>view(id,r))});
  if(u.pathname==='/api/lobbies'&&req.method==='POST'){
    let body={};try{let s='';for await(const c of req)s+=c;body=JSON.parse(s||'{}')}catch{}
    return send(res,201,createRoom(body.name,body.hostProfile||null));
  }
  if(u.pathname==='/api/leaderboard'&&req.method==='GET')return send(res,200,{players:leaderboard()});
  if(u.pathname==='/api/heroes'&&req.method==='GET')return send(res,200,{heroes:heroStats()});
  if(u.pathname==='/api/match'&&req.method==='POST'){
    let body={};try{let s='';for await(const c of req)s+=c;body=JSON.parse(s||'{}')}catch{}
    const out=applyMatch(body);
    return send(res,out.ok?200:400,out);
  }
  res.writeHead(404);
  res.end('Not found');
});

const wss=new WebSocketServer({noServer:true});
server.on('upgrade',(req,socket,head)=>{
  const u=new URL(req.url,'http://localhost');
  if(u.pathname==='/control'){
    return wss.handleUpgrade(req,socket,head,ws=>wss.emit('connection',ws,{control:true}));
  }
  if(u.pathname==='/ws'){
    const roomId=u.searchParams.get('room'),room=rooms.get(roomId);
    if(!room){socket.write('HTTP/1.1 404 Not Found\r\n\r\n');return socket.destroy();}
    if(room.clients.size>=2){socket.write('HTTP/1.1 409 Conflict\r\n\r\n');return socket.destroy();}
    return wss.handleUpgrade(req,socket,head,ws=>wss.emit('connection',ws,{control:false,roomId}));
  }
  socket.destroy();
});

wss.on('connection',(ws,ctx)=>{
  if(ctx.control){
    ws.on('message',buf=>{
      let m;try{m=JSON.parse(String(buf))}catch{return}
      if(m.type==='ping')ws.send(JSON.stringify({type:'pong'}));
      if(m.type==='lobby_list')ws.send(JSON.stringify({type:'lobby_list',lobbies:[...rooms].map(([id,r])=>view(id,r))}));
      if(m.type==='lobby_create')ws.send(JSON.stringify({type:'lobby_created',room:createRoom(m.name,m.hostProfile||null)}));
      if(m.type==='leaderboard')ws.send(JSON.stringify({type:'leaderboard',players:leaderboard()}));
      if(m.type==='hero_stats')ws.send(JSON.stringify({type:'hero_stats',heroes:heroStats()}));
    });
    return;
  }

  const room=rooms.get(ctx.roomId);
  if(!room)return ws.close(1008,'Room not found');

  const player=room.clients.size;
  room.clients.set(ws,player);
  room.emptyAt=null;
  ws.send(JSON.stringify({type:'hello',player,state:room.latestState}));

  for(const[c]of room.clients){
    if(c!==ws&&c.readyState===1)c.send(JSON.stringify({type:'info',message:`Player ${player} joined`,playerCount:room.clients.size}));
  }

  ws.on('message',buf=>{
    let m;try{m=JSON.parse(String(buf))}catch{return}
    if(m.type==='state')room.latestState=m;
    if(['state','version','profile'].includes(m.type)){
      for(const[c]of room.clients){
        if(c!==ws&&c.readyState===1)c.send(JSON.stringify((m.type==='version'||m.type==='profile')?{...m,player}:m));
      }
    }
  });

  ws.on('close',()=>{
    room.clients.delete(ws);
    if(room.clients.size){
      for(const[c]of room.clients){
        if(c.readyState===1)c.send(JSON.stringify({type:'info',message:`Player ${player} disconnected`,playerCount:room.clients.size}));
      }
    }else{
      room.emptyAt=Date.now();
      setTimeout(()=>{
        const r=rooms.get(ctx.roomId);
        if(r&&r.clients.size===0&&r.emptyAt&&Date.now()-r.emptyAt>=300000)rooms.delete(ctx.roomId);
      },300000);
    }
  });
});

setInterval(()=>{
  for(const[,r]of rooms){
    for(const[ws]of r.clients){
      if(ws.readyState===1)ws.ping();
    }
  }
},30000).unref();

server.listen(PORT,()=>console.log(`Dota 3v3 lobby listening on ${PORT}`));