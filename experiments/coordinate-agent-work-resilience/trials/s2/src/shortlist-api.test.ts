import test from 'node:test';
import assert from 'node:assert/strict';
import {readShortlist,writeShortlist} from './shortlist';

test('C1 reads acknowledged IDs and sends an empty replacement to clear', async () => {
  const originalFetch = globalThis.fetch;
  const requests: {url:string; method:string; body:unknown}[] = [];
  globalThis.fetch = async (input, init) => {
    const request = {url:String(input), method:init?.method ?? 'GET', body:init?.body ? JSON.parse(String(init.body)) : null};
    requests.push(request);
    return new Response(JSON.stringify({schemaVersion:1,ids:request.method === 'GET' ? ['nylon'] : []}), {status:200,headers:{'Content-Type':'application/json'}});
  };
  try {
    assert.deepEqual(await readShortlist(), ['nylon']);
    assert.deepEqual(await writeShortlist([]), []);
    assert.deepEqual(requests, [
      {url:'/api/shortlist',method:'GET',body:null},
      {url:'/api/shortlist',method:'PUT',body:{schemaVersion:1,ids:[]}},
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
