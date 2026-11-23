const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const cluster=JSON.parse(fs.readFileSync(path.join(__dirname,'cluster.json'),'utf8').replace(/^\uFEFF/,''));
module.exports=function environment(database){
 assert(['e08_trial','e08_tests'].includes(database));assert.equal(cluster.host,'127.0.0.1');
 const env={};for(const key of ['PATH','SystemRoot','WINDIR','COMSPEC','PATHEXT','TEMP','TMP'])if(process.env[key])env[key]=process.env[key];
 return {...env,NODE_ENV:'test',LOG_LEVEL:'error',SUPABASE_DB_HOST:'127.0.0.1',SUPABASE_DB_PORT:String(cluster.port),SUPABASE_DB_NAME:database,SUPABASE_DB_USER:'e08',SUPABASE_DB_PASSWORD:'',JWT_SECRET:'e08-synthetic-local-only-secret',MIGRATE_ON_START:'false',NODE_OPTIONS:'--require='+JSON.stringify(path.join(__dirname,'loopback-only.cjs')),E08_BASE:base};
};
