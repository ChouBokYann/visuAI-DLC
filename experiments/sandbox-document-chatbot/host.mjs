import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {randomBytes,timingSafeEqual} from 'node:crypto';import {fileURLToPath} from 'node:url';import {AcpBridge} from './acp.mjs';import {validatePacket} from './protocol.mjs';
export function createHost({token,infer}){let busy=false;return http.createServer(async(req,res)=>{
 const send=(code,data)=>{res.writeHead(code,{'content-type':'application/json'});res.end(JSON.stringify(data));};
 const received=Buffer.from(req.headers.authorization??''),expected=Buffer.from('Bearer '+token);
 if(received.length!==expected.length||!timingSafeEqual(received,expected))return send(401,{error:'Unauthorized'});
 if(req.method!=='POST'||req.url!=='/infer')return send(404,{error:'Unknown route'});
 if(req.headers['content-type']!=='application/json')return send(415,{error:'JSON required'});
 if(busy)return send(429,{error:'Busy'});
 try{const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>100000)return send(413,{error:'Too large'});chunks.push(chunk);}let p;try{p=validatePacket(JSON.parse(Buffer.concat(chunks).toString()));}catch{return send(400,{error:'Invalid packet'});}
 if(busy)return send(429,{error:'Busy'});busy=true;try{send(200,await infer(p));}finally{busy=false;}
 }catch{send(503,{error:'Inference unavailable'});}
});}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const base=process.cwd();fs.mkdirSync('.runtime',{recursive:true});const token=randomBytes(32).toString('hex');fs.writeFileSync('.runtime/bridge-token',token);
 let bridge,mode;const server=createHost({token,infer:async p=>{if(mode!==p.mode){bridge?.close();if(fs.existsSync('records/termination-blocked.json'))throw Error('Termination uncertain');bridge=new AcpBridge(base,p.mode);await bridge.start();mode=p.mode;}return bridge.ask(p.mode==='qa'?p.question:p.context,p.sources??[]);}});
 const stop=()=>{bridge?.close();server.closeAllConnections();server.close();fs.rmSync('.runtime/bridge-token',{force:true});process.exit();};process.on('message',m=>{if(m==='shutdown')stop();});process.once('SIGTERM',stop);process.once('SIGINT',stop);
 // Verify actual restricted startup before exposing a bridge or spending any turn.
 try{bridge=new AcpBridge(base,'development');await bridge.start();mode='development';fs.writeFileSync('evidence/host-preflight.json',JSON.stringify({passed:true,pid:process.pid,model:bridge.session?.configOptions,at:new Date().toISOString()}));server.listen(17820,'127.0.0.1',()=>console.log('E11 bridge ready'));}catch(e){fs.writeFileSync('evidence/host-preflight-error.txt',e.stack);bridge?.close();fs.rmSync('.runtime/bridge-token',{force:true});process.exitCode=1;}
}
