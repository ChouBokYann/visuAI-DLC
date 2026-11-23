const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),http=require('node:http');
(async()=>{
 const dir=path.resolve('artifacts');fs.mkdirSync(dir,{recursive:true});fs.copyFileSync('fixture/service.cjs',path.join(dir,'service.cjs'));
 const source=fs.readFileSync(path.join(dir,'service.cjs')),sha=crypto.createHash('sha256').update(source).digest('hex');
 const identity=route=>crypto.createHash('sha256').update(source).update(route).digest('hex');
 const rows=new Map([['legacy',{id:'legacy',name:'old client',note:'preserved'}]]),serve=require(path.join(dir,'service.cjs')).handler(rows);let route='/api';
 const server=http.createServer((req,res)=>{if(route!=='/api')req.url=req.url.replace('/api',route);serve(req,res);});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port,results=[];
 try{for(const [phase,config,expected] of [['A','/api',200],['B','/wrong',404],['recovered-A','/api',200]]){
  route=config;const response=await fetch(`http://127.0.0.1:${port}/api/items/legacy`),body=await response.json();assert.equal(response.status,expected);if(expected===200)assert.equal(body.note,'preserved');
  results.push({phase,artifact:identity(config),source:sha,target:`127.0.0.1:${port}`,pid:process.pid,status:response.status,installation:'observed',targetAcceptance:expected===200?'verified':'failed',body});
 }assert.equal(results[0].artifact,results[2].artifact);assert.equal(rows.get('legacy').note,'preserved');
 }finally{await new Promise(r=>server.close(r));}
 fs.writeFileSync('evidence/local-release.json',JSON.stringify({at:new Date().toISOString(),results,listenerClosed:!server.listening,limits:'In-process local artifact/config rollout; no cloud or persistence claim'},null,2));console.log('A verified; B observed failed; exact A recovered; owned listener closed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
