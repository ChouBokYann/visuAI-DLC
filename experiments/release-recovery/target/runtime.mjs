import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createServer,request} from 'node:http';
import assert from 'node:assert/strict';
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
export function manifest(dir){
 const files={};
 function walk(current){for(const e of fs.readdirSync(current,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  const p=path.join(current,e.name),rel=path.relative(dir,p).replaceAll('\\','/');
  assert(!e.isSymbolicLink(),'Artifact symlinks are unsupported');
  if(e.isDirectory())walk(p);else if(rel!=='manifest.json')files[rel]=hash(fs.readFileSync(p));
 }}walk(dir);return files;
}
function verify(dir){
 const files=manifest(dir);assert.deepEqual(files,read(path.join(dir,'manifest.json')),'Artifact digest mismatch');
 const release=read(path.join(dir,'release.json'));
 assert(/^[A-Za-z0-9_-]{1,64}$/.test(release.id),'Invalid release ID');
 assert(typeof release.upstreamPath==='string'&&/^\/api\/[a-z-]+$/.test(release.upstreamPath),'Invalid local API route');
 assert(files['dist/index.html'],'Missing built entry point');
 return {release:release.id,digest:hash(JSON.stringify(files))};
}
export function install(targetDir,bundle,operation,{recover=false}={}){
 assert(/^[A-Za-z0-9_-]{1,64}$/.test(operation),'Invalid operation ID');
 fs.mkdirSync(path.join(targetDir,'releases'),{recursive:true});
 const log=path.join(targetDir,'operations.jsonl');
 if(fs.existsSync(log))assert(!fs.readFileSync(log,'utf8').split('\n').filter(Boolean).some(line=>JSON.parse(line).operation===operation),'Operation already recorded; inspect current state');
 const identity=verify(bundle),dest=path.join(targetDir,'releases',identity.release);
 if(recover){assert.equal(path.resolve(bundle),path.resolve(dest),'Recovery must use retained target artifact');}
 else{
  assert(!fs.existsSync(dest),'Installed artifacts are immutable');
  const stage=path.join(targetDir,'releases','.install-'+operation);assert(!fs.existsSync(stage),'Staging already exists');
  fs.cpSync(bundle,stage,{recursive:true,errorOnExist:true,force:false});assert.deepEqual(verify(stage),identity);fs.renameSync(stage,dest);
 }
 const result={...identity,operation,action:recover?'recover':'install',at:new Date().toISOString()};
 const temp=path.join(targetDir,'active-'+operation+'.json');fs.writeFileSync(temp,JSON.stringify(result,null,2),{flag:'wx'});fs.renameSync(temp,path.join(targetDir,'active.json'));
 fs.appendFileSync(log,JSON.stringify(result)+'\n');return result;
}
export function createTarget(targetDir,apiPort){
 assert(Number.isInteger(apiPort)&&apiPort>0&&apiPort<65536,'Invalid owned API port');
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.glb':'model/gltf-binary','.woff2':'font/woff2'};
 return createServer((req,res)=>{
  const json=(status,value)=>{res.writeHead(status,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify(value));};
  try{
   if(req.url==='/health')return json(200,{status:'process-alive'});
   if(!fs.existsSync(path.join(targetDir,'active.json')))return json(503,{error:'No installed release'});
   const active=read(path.join(targetDir,'active.json'));assert(/^[A-Za-z0-9_-]{1,64}$/.test(active.release));
   const releaseDir=path.join(targetDir,'releases',active.release);
   if(req.url==='/__release')return json(200,active);
   if(req.url==='/api/shortlist'){
    const config=read(path.join(releaseDir,'release.json'));
    const upstream=request({hostname:'127.0.0.1',port:apiPort,path:config.upstreamPath,method:req.method,headers:{'content-type':'application/json'}},reply=>{res.writeHead(reply.statusCode,{'content-type':'application/json','cache-control':'no-store'});reply.pipe(res);});
    upstream.on('error',()=>{if(!res.headersSent)json(502,{error:'Backend unavailable'});else res.destroy();});req.pipe(upstream);return;
   }
   if(req.method!=='GET')return json(405,{error:'Use GET'});
   let pathname;try{pathname=decodeURIComponent((req.url||'/').split('?')[0]);}catch{return json(400,{error:'Invalid path'});}
   const dist=path.resolve(releaseDir,'dist'),file=path.resolve(dist,'.'+(pathname==='/'?'/index.html':pathname));
   if(!file.startsWith(dist+path.sep))return json(403,{error:'Outside artifact'});
   if(!fs.existsSync(file)||!fs.statSync(file).isFile())return json(404,{error:'Asset not found'});
   res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
  }catch(error){if(!res.headersSent)json(500,{error:'Target configuration error'});else res.destroy();}
 });
}
