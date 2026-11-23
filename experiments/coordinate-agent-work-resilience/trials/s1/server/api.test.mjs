import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from './api.mjs';

async function withApi(run) {
  const server = createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const url = `http://127.0.0.1:${server.address().port}/api/shortlist`;
  const request = async (body) => {
    const response = await fetch(url, body === undefined ? {} : {method:'PUT', headers:{'Content-Type':'application/json'}, body});
    return {status:response.status, body:await response.json()};
  };
  try { await run(request); } finally { await new Promise(resolve => server.close(resolve)); }
}
const saved = ids => ({schemaVersion:1, ids});

test('GET begins empty; PUT preserves order, replaces, and clears across subsequent reads', async () => {
  await withApi(async request => {
    assert.deepEqual(await request(), {status:200, body:saved([])});
    for (const ids of [['tionghoe','nylon','apartment'], ['mill'], []]) {
      assert.deepEqual(await request(JSON.stringify(saved(ids))), {status:200, body:saved(ids)});
      assert.deepEqual(await request(), {status:200, body:saved(ids)});
    }
  });
});

for (const [label, body, status, code] of [
  ['malformed JSON', '{', 400, 'INVALID_JSON'],
  ['missing version before invalid IDs', JSON.stringify({ids:'wrong'}), 409, 'CONTRACT_VERSION_MISMATCH'],
  ['unsupported version before invalid IDs', JSON.stringify({schemaVersion:2, ids:'wrong'}), 409, 'CONTRACT_VERSION_MISMATCH'],
  ['null body', 'null', 409, 'CONTRACT_VERSION_MISMATCH'],
  ['array body', '[]', 409, 'CONTRACT_VERSION_MISMATCH'],
  ['non-array IDs', JSON.stringify({schemaVersion:1, ids:'nylon'}), 422, 'INVALID_SHORTLIST'],
  ['missing IDs', JSON.stringify({schemaVersion:1}), 422, 'INVALID_SHORTLIST'],
  ['duplicate IDs', JSON.stringify(saved(['nylon','nylon'])), 422, 'INVALID_SHORTLIST'],
  ['unknown ID', JSON.stringify(saved(['unknown'])), 422, 'INVALID_SHORTLIST'],
  ['non-string ID', JSON.stringify(saved([1])), 422, 'INVALID_SHORTLIST'],
  ['excess IDs', JSON.stringify(saved(['nylon','apartment','tionghoe','mill'])), 422, 'INVALID_SHORTLIST'],
  ['extra body field', JSON.stringify({...saved([]), extra:true}), 422, 'INVALID_SHORTLIST'],
]) {
  test(`${label} is rejected without changing stored IDs`, async () => {
    await withApi(async request => {
      assert.equal((await request(JSON.stringify(saved(['nylon'])))).status, 200);
      const rejection = await request(body);
      assert.equal(rejection.status, status);
      assert.equal(rejection.body.error.code, code);
      assert.equal(typeof rejection.body.error.message, 'string');
      assert.ok(rejection.body.error.message.length > 0);
      assert.deepEqual(await request(), {status:200, body:saved(['nylon'])});
    });
  });
}
