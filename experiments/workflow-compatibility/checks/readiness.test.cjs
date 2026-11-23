const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{execFileSync}=require('node:child_process'),crypto=require('node:crypto');
const {run}=require('../readiness.cjs');
test('readiness fails closed before mutations and permits valid baseline',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'e09-gate-'));let mutations=0;
 try{
  const file=path.join(dir,'baseline.json'),dataFile=path.join(dir,'data.txt');fs.writeFileSync(dataFile,'original');
  const baseline={root:dir,worktree:process.cwd(),revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),files:{'data.txt':crypto.createHash('sha256').update('original').digest('hex')}};
  const action=()=>mutations++;
  assert.throws(()=>run(file,process.execPath,action));assert.equal(mutations,0);
  fs.writeFileSync(file,JSON.stringify(baseline));fs.writeFileSync(dataFile,'changed');assert.throws(()=>run(file,process.execPath,action),/changed/);assert.equal(mutations,0);
  fs.writeFileSync(dataFile,'original');fs.writeFileSync(file,JSON.stringify({...baseline,revision:'wrong'}));assert.throws(()=>run(file,process.execPath,action),/revision/);assert.equal(mutations,0);
  fs.writeFileSync(file,JSON.stringify(baseline));assert.throws(()=>run(file,path.join(dir,'missing-runtime'),action),/runtime/);assert.equal(mutations,0);
  run(file,process.execPath,action);assert.equal(mutations,1);
 }finally{assert(path.resolve(dir).startsWith(path.resolve(os.tmpdir())+path.sep+'e09-gate-'));fs.rmSync(dir,{recursive:true,force:true});}
});
