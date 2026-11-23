import test from 'node:test';
import assert from 'node:assert/strict';
import {toggleComparison} from './logic';
test('comparison preserves order, caps at three, and permits removal at capacity',()=>{
 const selected=['guatemala','ethiopia','kenya'];
 assert.deepEqual(toggleComparison(selected,'brazil'),selected);
 assert.deepEqual(toggleComparison(selected,'ethiopia'),['guatemala','kenya']);
 assert.deepEqual(toggleComparison(['guatemala'],'ethiopia'),['guatemala','ethiopia']);
 assert.deepEqual(selected,['guatemala','ethiopia','kenya']);
});
