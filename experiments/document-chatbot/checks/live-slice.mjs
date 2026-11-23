import {AcpBridge} from '../acp.mjs';import {loadDocuments,retrieve} from '../documents.mjs';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const bridge=new AcpBridge(path.resolve('.'));
try{
 await bridge.start();const oracle=JSON.parse(fs.readFileSync('records/oracle.json'));const index=await loadDocuments('corpus');const sources=retrieve(index,oracle.known.question);const result=await bridge.ask(oracle.known.question,sources);
 fs.writeFileSync('evidence/live-slice.json',JSON.stringify({question:oracle.known.question,sources,result},null,2));
 for(const s of oracle.known.required)assert(result.answer.includes(s),s);for(const s of oracle.known.forbidden)assert(!result.answer.includes(s),s);
 console.log(result);
}catch(e){console.error(e.message);process.exitCode=1;}finally{bridge.close();}
