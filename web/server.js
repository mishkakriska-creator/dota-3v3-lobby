import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||3000);
const index=fs.readFileSync(path.join(__dirname,'index.html'));

http.createServer((req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(u.pathname==='/health'){
    res.writeHead(200,{'content-type':'application/json'});
    return res.end(JSON.stringify({ok:true}));
  }
  res.writeHead(200,{
    'content-type':'text/html; charset=utf-8',
    'cache-control':'no-store',
    'x-content-type-options':'nosniff'
  });
  res.end(index);
}).listen(port,'0.0.0.0',()=>console.log('Dota 3v3 web prototype on',port));
