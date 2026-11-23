import {AcpBridge} from '../acp.mjs';import fs from 'node:fs';import path from 'node:path';
const bridge=new AcpBridge(path.resolve('.'));
try{const result=await bridge.start();fs.writeFileSync('records/acp-session.json',JSON.stringify(result,null,2));console.log({passed:true,mode:result.session.modes?.currentModeId,model:result.session.models?.currentModelId});}catch(e){console.error(e.message);fs.writeFileSync('evidence/acp-setup-error.log',e.message+'\n'+bridge.stderr);process.exitCode=1;}finally{bridge.close();}
