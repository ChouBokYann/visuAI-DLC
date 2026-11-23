const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const http = require('node:http');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const base = path.resolve(__dirname, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(base, name), 'utf8').replace(/^\uFEFF/, ''));
const write = (name, value) => fs.writeFileSync(path.join(base, name), JSON.stringify(value, null, 2) + '\n');
const phase = process.argv[2];
const unicode500 = '🧪'.repeat(500);
const durableNote = '  E08 durable note\n東京 🧪  ';
if (phase === '--self-test') {
  assert.equal([...unicode500].length, 500);
  assert.equal(unicode500.length, 1000);
  assert.equal([...unicode500 + 'x'].length, 501);
  assert.notEqual(durableNote, durableNote.trim());
  console.log('Reviewer helper self-check passed');
  process.exit(0);
}
assert(['baseline', 'candidate', 'restart', 'rollback', 'reupgrade'].includes(phase));
assert.equal(process.env.SUPABASE_DB_HOST, '127.0.0.1');
assert.equal(process.env.SUPABASE_DB_NAME, 'e08_trial');
assert.equal(process.env.MIGRATE_ON_START, 'false');
const app = read('records/app-current.json');
const ids = read('records/fixtures.json');
const client = new Client({host: '127.0.0.1', port: Number(process.env.SUPABASE_DB_PORT), database: 'e08_trial', user: 'e08', connectionTimeoutMillis: 3000});
const evidence = {phase, startedAt: new Date().toISOString(), app, assertionSha256: crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'), checks: []};
const token = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '10m'});
const api = (method, suffix = '', body, auth = token(ids.userA)) => new Promise((resolve, reject) => {
  const data = body === undefined ? undefined : JSON.stringify(body);
  const headers = {'content-type': 'application/json'};
  if (auth) headers.authorization = 'Bearer ' + auth;
  if (data) headers['content-length'] = Buffer.byteLength(data);
  const req = http.request({host: '127.0.0.1', port: app.port, path: '/api/transactions' + suffix, method, headers, timeout: 5000}, res => {
    let text = ''; res.on('data', chunk => text += chunk);
    res.on('end', () => {try {resolve({status: res.statusCode, body: JSON.parse(text)});} catch (error) {reject(error);}});
  });
  req.on('timeout', () => req.destroy(new Error('HTTP timeout'))); req.on('error', reject); req.end(data);
});
const allRows = async () => (await client.query('SELECT * FROM transactions ORDER BY id')).rows;
const row = async id => (await client.query('SELECT * FROM transactions WHERE id=$1', [id])).rows[0];
const same = (actual, expected) => assert.deepEqual(JSON.parse(JSON.stringify(actual)), JSON.parse(JSON.stringify(expected)));
const check = async (name, fn) => {
  try {await fn(); evidence.checks.push({name, passed: true});}
  catch (error) {evidence.checks.push({name, passed: false, error: error.stack}); throw error;}
};
const validBody = {type: 'income', amount: 17.25, categoryId: ids.categoryA, description: 'E08 synthetic income', date: '2026-11-01T12:00:00.000Z'};
const expectResponse = (response, status) => {assert.equal(response.status, status); if (status < 300) assert.equal(response.body.success, true);};
async function oldContract() {
  await check('old GET and list envelopes, owned fields, deleted row excluded', async () => {
    const response = await api('GET', '/' + ids.transactionA); expectResponse(response, 200);
    assert.equal(response.body.data.id, ids.transactionA); assert.equal(response.body.data.userId, ids.userA);
    for (const key of ['amount','description','date','categoryId','type']) assert(key in response.body.data);
    const list = await api('GET'); expectResponse(list, 200); assert(Array.isArray(list.body.data));
    assert.equal(typeof list.body.pagination.total, 'number');
    assert(!list.body.data.some(item => item.userId !== ids.userA || item.id === ids.deletedTransaction));
  });
  await check('old POST payload and PATCH payload remain valid', async () => {
    const create = await api('POST', '', validBody); expectResponse(create, 201);
    const stored = await row(create.body.data.id); assert.equal(stored.description, validBody.description);
    assert.equal(Number(stored.amount), validBody.amount); assert.equal(stored.userId, ids.userA);
    if (phase !== 'baseline') {assert.equal(stored.note, null); assert.equal(create.body.data.note, null);}
    const patch = await api('PATCH', '/' + create.body.data.id, {description: 'E08 old caller updated'}); expectResponse(patch, 200);
    assert.equal((await row(create.body.data.id)).description, 'E08 old caller updated');
  });
  await check('401 missing/invalid auth and 404 other-owner/missing/deleted leave all rows unchanged', async () => {
    const before = await allRows();
    for (const auth of [null, 'invalid-token']) {
      expectResponse(await api('PATCH', '/' + ids.transactionA, {description: 'MUST NOT WRITE'}, auth), 401);
      expectResponse(await api('POST', '', validBody, auth), 401);
    }
    for (const id of [ids.transactionB, ids.deletedTransaction, '99999999-9999-4999-8999-999999999999']) {
      expectResponse(await api('GET', '/' + id), 404);
      expectResponse(await api('PATCH', '/' + id, {description: 'MUST NOT WRITE', note: 12}), 404);
    }
    expectResponse(await api('GET', '/' + ids.transactionA, undefined, token(ids.userB)), 404);
    same(await allRows(), before);
  });
}
async function main() {
  await client.connect();
  const identity = (await client.query('SELECT current_database() AS database, host(inet_server_addr()) AS address, inet_server_port() AS port')).rows[0];
  assert.equal(identity.database, 'e08_trial'); assert.equal(identity.address, '127.0.0.1'); evidence.database = identity;
  if (phase === 'baseline') {
    await oldContract();
    write('evidence/reviewer-baseline-rows.json', await allRows());
  } else if (phase === 'candidate') {
    await check('migration preserved every old row column; note is SQL null including soft-deleted rows', async () => {
      const before = read('evidence/reviewer-baseline-rows.json'); const after = await allRows();
      assert.equal(after.length, before.length);
      same(after.map(({note, ...old}) => {assert.equal(note, null); return old;}), before);
      assert(after.find(item => item.id === ids.deletedTransaction).deletedAt);
    });
    await oldContract();
    for (const value of ['', null, 'a'.repeat(500), unicode500, '  exact\n東京 🧪  ']) {
      await check('POST and PATCH exact accepted note ' + JSON.stringify(value).slice(0, 45), async () => {
        const create = await api('POST', '', {...validBody, note: value}); expectResponse(create, 201);
        assert.equal(create.body.data.note, value); assert.equal((await row(create.body.data.id)).note, value);
        const patch = await api('PATCH', '/' + ids.transactionA, {note: value}); expectResponse(patch, 200);
        assert.equal(patch.body.data.note, value); assert.equal((await row(ids.transactionA)).note, value);
        const get = await api('GET', '/' + ids.transactionA); expectResponse(get, 200); assert.equal(get.body.data.note, value);
      });
    }
    for (const value of [0, true, {}, [], 'a'.repeat(501), unicode500 + 'x']) {
      await check('invalid note rejects POST and mixed PATCH without any row mutation ' + JSON.stringify(value).slice(0, 45), async () => {
        const before = await allRows();
        expectResponse(await api('POST', '', {...validBody, note: value}), 400);
        same(await allRows(), before);
        expectResponse(await api('PATCH', '/' + ids.transactionA, {note: value, amount: 999.99, description: 'MUST NOT WRITE'}), 400);
        same(await allRows(), before);
      });
    }
    await check('omitted note preserves existing text; explicit null clears and durable note saved', async () => {
      expectResponse(await api('PATCH', '/' + ids.transactionA, {note: durableNote}), 200);
      expectResponse(await api('PATCH', '/' + ids.transactionA, {description: 'E08 persisted description'}), 200);
      assert.equal((await row(ids.transactionA)).note, durableNote);
      expectResponse(await api('PATCH', '/' + ids.transactionA, {note: null}), 200);
      assert.equal((await row(ids.transactionA)).note, null);
      expectResponse(await api('PATCH', '/' + ids.transactionA, {note: durableNote}), 200);
      const list = await api('GET'); expectResponse(list, 200); assert.equal(list.body.data.find(item => item.id === ids.transactionA).note, durableNote);
    });
    write('evidence/reviewer-durable-rows.json', await allRows());
  } else if (phase === 'restart') {
    await check('full SQL row state survived restart without reseed', async () => same(await allRows(), read('evidence/reviewer-durable-rows.json')));
    await check('HTTP note survived restart', async () => {const result = await api('GET', '/' + ids.transactionA); expectResponse(result, 200); assert.equal(result.body.data.note, durableNote);});
  } else if (phase === 'rollback') {
    await check('legacy app reads expanded schema without exposing unknown note', async () => {
      same(await allRows(), read('evidence/reviewer-durable-rows.json'));
      const result = await api('GET', '/' + ids.transactionA); expectResponse(result, 200); assert.equal(result.body.data.id, ids.transactionA); assert(!('note' in result.body.data));
    });
    await check('legacy PATCH preserves note and every unrelated row/column', async () => {
      const before = await allRows();
      const result = await api('PATCH', '/' + ids.transactionA, {description: 'E08 legacy rollback updated'}); expectResponse(result, 200);
      const after = await allRows(); assert.equal(after.find(item => item.id === ids.transactionA).note, durableNote);
      same(after.map(item => {if (item.id !== ids.transactionA) return item; const old = before.find(value => value.id === item.id); assert.equal(item.description, 'E08 legacy rollback updated'); return {...item, description: old.description, updatedAt: old.updatedAt};}), before);
      write('evidence/reviewer-rollback-rows.json', after);
    });
  } else {
    await check('reupgrade sees unchanged rollback SQL state and exact note', async () => {
      same(await allRows(), read('evidence/reviewer-rollback-rows.json'));
      const result = await api('GET', '/' + ids.transactionA); expectResponse(result, 200); assert.equal(result.body.data.note, durableNote); assert.equal(result.body.data.description, 'E08 legacy rollback updated');
    });
  }
}
main().then(() => {evidence.passed = true;}).catch(error => {evidence.passed = false; evidence.error = error.stack; process.exitCode = 1;}).finally(async () => {
  await client.end(); evidence.finishedAt = new Date().toISOString();
  const stamp = evidence.startedAt.replace(/[:.]/g, '-');
  write('evidence/reviewer-' + phase + '-' + stamp + '.json', evidence);
  console.log(JSON.stringify({phase, passed: evidence.passed, checks: evidence.checks.length, failed: evidence.checks.filter(item => !item.passed), error: evidence.error}));
});
