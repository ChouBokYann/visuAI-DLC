const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{execFileSync,spawnSync}=require('node:child_process');
function run(file,runtime,action){
 const baseline=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd:baseline.worktree,encoding:'utf8'}).trim(),baseline.revision,'wrong revision');
 for(const [relative,hash] of Object.entries(baseline.files))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(baseline.root,relative))).digest('hex'),hash,'baseline changed: '+relative);
 const result=spawnSync(runtime,['--version'],{encoding:'utf8'});assert.equal(result.status,0,'missing or failing runtime');
 return action();
}
module.exports={run};
if(require.main===module){
 const [runtime,...args]=process.argv.slice(2);
 run(path.join(__dirname,'records/baseline.json'),runtime,()=>{
  const stamp=Date.now();fs.writeFileSync(path.join(__dirname,`evidence/readiness-${stamp}.json`),JSON.stringify({at:new Date().toISOString(),ready:true,runtime,args}));
  if(args.length){const result=spawnSync(runtime,args,{stdio:'inherit'});if(result.error)throw result.error;process.exitCode=result.status??1;}
 });
}
