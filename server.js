
import http from 'node:http';
import crypto from 'node:crypto';
import { WebSocketServer } from 'ws';

const PORT = Number(process.env.PORT || 10000);
const rooms = new Map();

const cors = {
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type',
  'Content-Type':'application/json'
};
const send=(res,code,obj)=>{res.writeHead(code,cors);res.end(JSON.stringify(obj));};
const view=(id,r)=>({id,name:r.name,players:r.clients.size,maxPlayers:2,createdAt:r.createdAt,hostProfile:r.hostProfile});
function createRoom(name='Лобби',hostProfile=null){
  let id; do id=crypto.randomBytes(5).toString('hex'); while(rooms.has(id));
  const r={name:String(name||'Лобби').slice(0,64),hostProfile,clients:new Map(),createdAt:new Date().toISOString(),latestState:null,emptyAt:null};
  rooms.set(id,r); return view(id,r);
}
const server=http.createServer(async(req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(req.method==='OPTIONS'){res.writeHead(204,cors);return res.end();}
  if(u.pathname==='/health') return send(res,200,{ok:true});
  if(u.pathname==='/api/lobbies' && req.method==='GET') return send(res,200,{lobbies:[...rooms].map(([id,r])=>view(id,r))});
  if(u.pathname==='/api/lobbies' && req.method==='POST'){
    let body={}; try{let s='';for await(const c of req)s+=c;body=JSON.parse(s||'{}')}catch{}
    return send(res,201,createRoom(body.name,body.hostProfile||null));
  }
  res.writeHead(404);res.end('Not found');
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
      if(m.type==='ping') ws.send(JSON.stringify({type:'pong'}));
      if(m.type==='lobby_list') ws.send(JSON.stringify({type:'lobby_list',lobbies:[...rooms].map(([id,r])=>view(id,r))}));
      if(m.type==='lobby_create') ws.send(JSON.stringify({type:'lobby_created',room:createRoom(m.name,m.hostProfile||null)}));
    });
    return;
  }
  const room=rooms.get(ctx.roomId); if(!room)return ws.close(1008,'Room not found');
  const player=room.clients.size; room.clients.set(ws,player); room.emptyAt=null;
  ws.send(JSON.stringify({type:'hello',player,state:room.latestState}));
  for(const [c] of room.clients) if(c!==ws && c.readyState===1) c.send(JSON.stringify({type:'info',message:`Player ${player} joined`,playerCount:room.clients.size}));
  ws.on('message',buf=>{
    let m;try{m=JSON.parse(String(buf))}catch{return}
    if(m.type==='state') room.latestState=m;
    if(['state','version','profile'].includes(m.type)){
      for(const [c] of room.clients) if(c!==ws&&c.readyState===1) c.send(JSON.stringify((m.type==='version'||m.type==='profile')?{...m,player}:m));
    }
  });
  ws.on('close',()=>{
    room.clients.delete(ws);
    if(room.clients.size){
      for(const [c] of room.clients) if(c.readyState===1)c.send(JSON.stringify({type:'info',message:`Player ${player} disconnected`,playerCount:room.clients.size}));
    }else{
      room.emptyAt=Date.now();
      setTimeout(()=>{const r=rooms.get(ctx.roomId);if(r&&r.clients.size===0&&r.emptyAt&&Date.now()-r.emptyAt>=300000)rooms.delete(ctx.roomId)},300000);
    }
  });
});
setInterval(()=>{for(const [,r] of rooms)for(const [ws] of r.clients)if(ws.readyState===1)ws.ping();},30000).unref();
server.listen(PORT,()=>console.log(`Dota 3v3 lobby listening on ${PORT}`));
