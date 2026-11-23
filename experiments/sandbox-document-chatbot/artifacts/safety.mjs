import assert from 'node:assert/strict';
export function verifyConfig(actual,expected){
 for(const [key,value] of Object.entries(expected.features))assert.equal(actual.features?.[key],value,'Unsafe effective feature: '+key);
 assert.equal(actual.web_search,'disabled');
 for(const [name,server] of Object.entries(actual.mcp_servers??{}))assert.equal(server.enabled,false,'Unexpected enabled MCP server: '+name);
}
export function verifySession(session){assert.equal(session.modes?.currentModeId,'read-only','ACP did not select read-only mode');assert(session.sessionId);return session.sessionId;}
export function answerChunk(update){
 if(update.sessionUpdate!=='agent_message_chunk'||update.content?.type!=='text')return '';
 // codex-acp 2.9.0 emits runtime warnings without messageId; keep them in raw evidence, outside the answer.
 if(!update.messageId&&update.content.text.startsWith('Warning: '))return '';
 return update.content.text;
}
