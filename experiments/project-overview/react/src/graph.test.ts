import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { connections, graph, neighbourhood, readFocus, focusHash, type Snapshot } from './graph';
const require = createRequire(import.meta.url);
const { b } = require('../../workflow-samples.js') as { b: Snapshot };
test('ideation contains exactly its two authored records and one business link', () => {
  const result = graph(b, 'ideation');
  assert.deepEqual(result.records.map(r => r.id), ['PROBLEM-001', 'OUTCOME-001']);
  assert.equal(result.links.length, 1);
  assert.ok(result.positions.get('PROBLEM-001')!.x < result.positions.get('OUTCOME-001')!.x);
  assert.equal(graph(b, 'deployment').records.length, 0);
});
test('focus is one hop only and feedback is an explicit link', () => {
  const links = connections(b);
  const near = neighbourhood('DECISION-002', links);
  assert.ok(near.has('EVIDENCE-002'));
  assert.ok(near.has('CHANGE-001'));
  assert.ok(!near.has('PROBLEM-001'));
  assert.ok(links.some(e => e.source === 'DECISION-001' && e.target === 'DECISION-002'));
});
test('chat focus links validate project, record, stage, and chat identifiers', () => {
  const hash = focusHash(b, 'planning', 'DECISION-002', 'codex-trial');
  assert.deepEqual(readFocus(hash, b), { view: 'planning', record: 'DECISION-002', chat: 'codex-trial' });
  assert.throws(() => readFocus(hash.replace('planning', 'ideation'), b), /does not belong/);
  assert.throws(() => readFocus(hash.replace('DECISION-002', 'missing'), b), /not in/);
  assert.throws(() => readFocus(hash.replace('cafe-trial', 'other'), b), /another project/);
  assert.throws(() => readFocus(hash + '%3Cscript%3E', b), /Invalid chat/);
});
test('unplaced and unresolved records do not acquire invented connections', () => {
  const snapshot = { ...b, records: b.records.map(r => ({ ...r, workflow: undefined })), edges: [...b.edges, { from: 'missing', to: 'PROBLEM-001', relation: 'addresses', basis: 'stated' }] };
  assert.equal(graph(snapshot, 'unplaced').records.length, 8);
  assert.equal(graph(snapshot, 'planning').records.length, 0);
  assert.ok(!connections(snapshot).some(e => e.source === 'missing' || e.target === 'missing'));
});
