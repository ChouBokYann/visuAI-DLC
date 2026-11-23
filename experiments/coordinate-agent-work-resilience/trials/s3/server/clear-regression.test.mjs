import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './api.mjs';

test('clear persists through repeated reads and later replacement', async () => {
  const server = createApp();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/shortlist`;
  const replace = async ids => {
    const response = await fetch(url, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:1,ids})});
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{schemaVersion:1,ids});
  };
  const read = async ids => {
    const response = await fetch(url);
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{schemaVersion:1,ids});
  };
  try {
    await replace(['mill','nylon']);
    await replace([]);
    await read([]);
    await read([]);
    await replace(['apartment','tionghoe']);
    await read(['apartment','tionghoe']);
    await replace([]);
    await read([]);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
