const path=require('node:path'),fs=require('node:fs'),{spawnSync}=require('node:child_process');
const base=path.resolve(__dirname,'..'),env={};
for(const key of ['PATH','SystemRoot','WINDIR','COMSPEC','PATHEXT','TEMP','TMP'])if(process.env[key])env[key]=process.env[key];
Object.assign(env,{HEADROOM_OFFLINE:'1',HEADROOM_BEACON:'off',HEADROOM_TELEMETRY:'off',DO_NOT_TRACK:'1',HF_HUB_OFFLINE:'1',HF_HOME:path.join(base,'.cache/hf'),TIKTOKEN_CACHE_DIR:path.join(base,'.cache/tiktoken'),XDG_CACHE_HOME:path.join(base,'.cache'),XDG_DATA_HOME:path.join(base,'.data'),PYTHONUTF8:'1',LITELLM_LOCAL_MODEL_COST_MAP:'True'});
const child=spawnSync(path.join(base,'.venv/Scripts/python.exe'),['checks/probe_context.py'],{cwd:base,env,encoding:'utf8',timeout:120000});
fs.writeFileSync(path.join(base,'evidence/headroom-console.log'),(child.stdout||'')+(child.stderr||''));console.log({status:child.status,error:child.error?.message});process.exitCode=child.status??1;
