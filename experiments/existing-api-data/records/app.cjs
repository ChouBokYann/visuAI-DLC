const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const variant=process.argv[2];assert(['source/backend','candidate'].includes(variant));assert.equal(process.env.SUPABASE_DB_NAME,'e08_trial');assert.equal(process.env.MIGRATE_ON_START,'false');
const app=require(path.resolve(variant,'dist/app')).default;
const db=require(path.resolve(variant,'dist/config/database')).default;
const server=app.listen(0,'127.0.0.1',()=>{const identity={pid:process.pid,port:server.address().port,variant,startedAt:new Date().toISOString()};fs.writeFileSync('records/app-current.json',JSON.stringify(identity,null,2));console.log(JSON.stringify(identity));});
let stopping=false;
setInterval(()=>{if(!stopping&&fs.existsSync('records/stop-app')){stopping=true;fs.unlinkSync('records/stop-app');server.close(async()=>{await db.close();process.exit(0);});}},200).unref();
