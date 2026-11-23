import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './api.mjs';

async function withApi(run) {
  const server = createApp();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/shortlist`;
  const get = async () => { const response = await fetch(url); return {status:response.status, body:await response.json()}; };
  const put = async body => { const response = await fetch(url, {method:'PUT', headers:{'Content-Type':'application/json'}, body}); return {status:response.status, body:await response.json()}; };
  const replace = ids => put(JSON.stringify({schemaVersion:1, ids}));
  try { await run({get, put, replace}); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('GET begins empty; PUT preserves order and replaces the complete shortlist', () => withApi(async ({get,replace}) => {
  assert.deepEqual(await get(), {status:200,body:{schemaVersion:1,ids:[]}});
  assert.deepEqual(await replace(['mill','nylon','apartment']), {status:200,body:{schemaVersion:1,ids:['mill','nylon','apartment']}});
  assert.deepEqual(await get(), {status:200,body:{schemaVersion:1,ids:['mill','nylon','apartment']}});
  assert.deepEqual(await replace(['tionghoe','mill']), {status:200,body:{schemaVersion:1,ids:['tionghoe','mill']}});
  assert.deepEqual(await get(), {status:200,body:{schemaVersion:1,ids:['tionghoe','mill']}});
}));

test('empty PUT acknowledges clear and subsequent GET remains empty', () => withApi(async ({get,replace}) => {
  assert.equal((await replace(['nylon'])).status,200);
  assert.deepEqual(await replace([]), {status:200,body:{schemaVersion:1,ids:[]}});
  assert.deepEqual(await get(), {status:200,body:{schemaVersion:1,ids:[]}});
}));

const invalid = [
  ['invalid JSON', '{', 400, 'INVALID_JSON'],
  ['missing version', '{"ids":[]}',409,'CONTRACT_VERSION_MISMATCH'],
  ['version before invalid IDs', '{"schemaVersion":2,"ids":"bad"}',409,'CONTRACT_VERSION_MISMATCH'],
  ['null body', 'null',409,'CONTRACT_VERSION_MISMATCH'],
  ['array body', '[]',409,'CONTRACT_VERSION_MISMATCH'],
  ['missing IDs', '{"schemaVersion":1}',422,'INVALID_SHORTLIST'],
  ['non-array IDs', '{"schemaVersion":1,"ids":null}',422,'INVALID_SHORTLIST'],
  ['duplicate IDs', '{"schemaVersion":1,"ids":["nylon","nylon"]}',422,'INVALID_SHORTLIST'],
  ['unknown IDs', '{"schemaVersion":1,"ids":["unknown"]}',422,'INVALID_SHORTLIST'],
  ['non-string IDs', '{"schemaVersion":1,"ids":[1]}',422,'INVALID_SHORTLIST'],
  ['excess IDs', '{"schemaVersion":1,"ids":["nylon","mill","apartment","funan"]}',422,'INVALID_SHORTLIST'],
  ['extra fields', '{"schemaVersion":1,"ids":[],"cafeIds":[]}',422,'INVALID_SHORTLIST'],
];
for (const [name,body,status,code] of invalid) test(`${name}: rejection preserves saved state`, () => withApi(async ({get,put,replace}) => {
  assert.equal((await replace(['nylon','mill'])).status,200);
  const rejected = await put(body);
  assert.equal(rejected.status,status);
  assert.equal(rejected.body.error.code,code);
  assert.equal(typeof rejected.body.error.message,'string');
  assert.ok(rejected.body.error.message.length > 0);
  assert.deepEqual(await get(), {status:200,body:{schemaVersion:1,ids:['nylon','mill']}});
}));
