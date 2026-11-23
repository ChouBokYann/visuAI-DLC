import test from 'node:test';import assert from 'node:assert/strict';import {answerChunk} from '../safety.mjs';
test('adapter diagnostics stay in evidence, actual answer text remains intact',()=>{
 const diagnostic={sessionUpdate:'agent_message_chunk',content:{type:'text',text:'Warning: Code Mode is unavailable.\n\n'}};
 assert.equal(answerChunk(diagnostic),'');assert.equal(answerChunk({...diagnostic,messageId:'model-message'}),diagnostic.content.text);
 assert.equal(answerChunk({sessionUpdate:'agent_message_chunk',messageId:'model-message',content:{type:'text',text:'Mira [S1]'}}),'Mira [S1]');
});
