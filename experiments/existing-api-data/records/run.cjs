const path=require('node:path'),{spawnSync}=require('node:child_process'),assert=require('node:assert/strict');
const [database,...args]=process.argv.slice(2);assert(args.length,'Supply a Node script/arguments');
const result=spawnSync(process.execPath,args,{cwd:path.resolve(__dirname,'..'),env:require('./env.cjs')(database),stdio:'inherit'});
if(result.error)throw result.error;process.exit(result.status??1);
