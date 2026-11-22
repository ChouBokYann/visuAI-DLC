import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {loadDocuments,retrieve} from './documents.mjs';import {AcpBridge} from './acp.mjs';
const base=path.dirname(fileURLToPath(import.meta.url));
export async function createApp({root,ask}={}){
 let busy=false;
 return http.createServer(async(req,res)=>{
  const send=(status,value)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(value));};
  const expectedHost=`127.0.0.1:${req.socket.localPort}`;
  if(req.headers.host!==expectedHost)return send(403,{error:'Host not allowed'});
  if(req.headers.origin&&req.headers.origin!==`http://${expectedHost}`)return send(403,{error:'Origin not allowed'});
  try{
   const url=new URL(req.url,`http://${expectedHost}`);
   if(req.method==='GET'&&url.pathname==='/'){
    res.writeHead(200,{'content-type':'text/html; charset=utf-8','content-security-policy':"default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'",'cache-control':'no-store'});res.end(fs.readFileSync(path.join(base,'public/index.html')));return;
   }
   if(req.method==='GET'&&['/app.js','/style.css'].includes(url.pathname)){
    res.writeHead(200,{'content-type':url.pathname.endsWith('.js')?'text/javascript':'text/css','x-content-type-options':'nosniff'});res.end(fs.readFileSync(path.join(base,'public',url.pathname.slice(1))));return;
   }
   if((req.method==='GET'&&url.pathname==='/api/status')||(req.method==='POST'&&url.pathname==='/api/refresh')){
    const index=await loadDocuments(root);
    const query=req.method==='GET'?(url.searchParams.get('q')??'').trim().toLowerCase():'';
    const documents=index.documents.filter(doc=>doc.text.toLowerCase().includes(query));
    return send(200,{state:'ready',documents:documents.map(({id,name})=>({id,name})),skipped:index.skipped,bytes:index.bytes});
   }
   if(req.method==='GET'&&/^\/api\/source\/[a-f0-9]{24}$/.test(url.pathname)){
    const index=await loadDocuments(root),doc=index.documents.find(d=>d.id===url.pathname.split('/').pop());return send(doc?200:404,doc??{error:'Source no longer available; refresh and ask again'});
   }
   if(req.method!=='POST'||url.pathname!=='/api/chat')return send(404,{error:'Not found'});
   if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'Use application/json'});
   let body='',size=0;for await(const chunk of req){size+=chunk.length;if(size>10000)return send(413,{error:'Request too large'});body+=chunk;}
   let question;try{question=JSON.parse(body).question;}catch{return send(400,{error:'Invalid JSON'});}
   if(typeof question!=='string'||!question.trim()||question.length>2000)return send(400,{error:'Enter a question of 1–2000 characters'});
   if(busy)return send(409,{error:'A question is already running'});
   busy=true;
   try{
    const index=await loadDocuments(root),sources=retrieve(index,question);
    if(!sources.length)return send(200,{state:'no-evidence',answer:'I could not find supporting information in these documents.',sources:[]});
    const result=await ask(question,sources);
    const current=await loadDocuments(root);if(sources.some(s=>!current.documents.some(d=>d.id===s.id)))return send(409,{state:'stale',error:'Documents changed while answering. Please ask again.'});
    return send(200,{state:'answered',...result,sources:sources.map((s,i)=>({...s,citation:`S${i+1}`,url:`/api/source/${s.id}`}))});
   }finally{busy=false;}
  }catch(error){send(503,{state:'unavailable',error:'Documents or answer service unavailable. '+error.message});}
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const runtimeBase=path.resolve(process.env.E10_STATE_DIR??base);fs.mkdirSync(path.join(runtimeBase,'.runtime'),{recursive:true});
 const lock=path.join(runtimeBase,'.runtime/server.lock');const fd=fs.openSync(lock,'wx');fs.writeSync(fd,String(process.pid));
 const bridge=new AcpBridge(runtimeBase);let server;
 const stop=()=>{bridge.close();server?.closeAllConnections();server?.close();fs.closeSync(fd);fs.unlinkSync(lock);process.exit();};
 process.once('SIGINT',stop);process.once('SIGTERM',stop);
 process.on('message',message=>{if(message==='shutdown')stop();});
 try{
  const ask=process.env.E10_PROVIDER==='unavailable'?async()=>{throw Error('Controlled release fault');}:async(q,s)=>{if(!bridge.sessionId)await bridge.start();return bridge.ask(q,s);};
  server=await createApp({root:path.resolve(process.env.E10_DOCS??path.join(runtimeBase,'corpus')),ask});
  server.listen(Number(process.env.PORT??17810),'127.0.0.1',()=>console.log(`Document chat: http://127.0.0.1:${server.address().port}`));
 }catch(error){console.error(error.message);stop();}
}
