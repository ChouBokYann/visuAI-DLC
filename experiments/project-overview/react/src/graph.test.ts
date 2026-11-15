import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { connections, graph, linkStyle, neighbourhood, readFocus, focusHash, type Snapshot } from './graph';
import { baselineOf, validateBundle, validateStory, worktreeChanges } from './session';
const require = createRequire(import.meta.url);
const { a, b } = require('../../workflow-samples.js') as { a: Snapshot; b: Snapshot };
test('relationship styles are distinct and inference does not overwrite relationship meaning', () => {
  const links = connections(b);
  const types = ['prompted', 'checked by', 'revised to', 'implemented by'].map(label => links.find(e => e.label === label)!);
  assert.equal(new Set(types.map(e => linkStyle(e).dash)).size, 4);
  for (const link of types) assert.deepEqual(linkStyle({ ...link, inferred: true }), linkStyle(link));
});
test('stage keeps its own records and only one-hop cross-stage context', () => {
  const result = graph(b, 'ideation');
  assert.deepEqual(result.records.map(r => r.id), ['PROBLEM-001', 'OUTCOME-001']);
  assert.ok(result.context.some(r => r.id === 'DECISION-002'));
  assert.ok(!result.context.some(r => r.id === 'EVIDENCE-001'));
  const verification = graph(b, 'verification');
  assert.ok(verification.records.every(r => verification.links.some(e => e.source === r.id || e.target === r.id)));
  assert.ok(verification.context.some(r => r.id === 'CHANGE-001'));
  assert.ok(result.positions.get('PROBLEM-001')!.x < result.positions.get('OUTCOME-001')!.x);
  assert.equal(graph(b, 'deployment').records.length, 0);
});
test('story rejects stale baselines and invented IDs without mutating canonical records', () => {
  const original = JSON.stringify(b);
  const story = { version: 1, project: b.project.name, baseline: baselineOf(b), sequence: 1, focus: 'DECISION-002', route: ['EVIDENCE-002', 'DECISION-002'], links: [{ from: 'EVIDENCE-002', to: 'DECISION-002', summary: 'Coverage changed the direction' }] };
  assert.equal(validateStory(story, b).focus, 'DECISION-002');
  assert.throws(() => validateStory({ ...story, baseline: baselineOf(a) }, b), /does not match/);
  assert.throws(() => validateStory({ ...story, route: ['invented'] }, b), /invalid/);
  assert.throws(() => validateStory({ ...story, sequence: -1 }, b), /sequence/);
  assert.equal(JSON.stringify(b), original);
});
test('worktree differences retain removed records and trace contribution to the shared goal', () => {
  const differences = worktreeChanges(a, b);
  assert.ok(differences.some(c => c.id === 'DECISION-002' && c.change === 'added' && c.goals.includes('OUTCOME-001')));
  assert.ok(worktreeChanges(b, a).some(c => c.id === 'DECISION-002' && c.change === 'removed'));
  assert.deepEqual(worktreeChanges(b, structuredClone(b)), []);
  const lf = { ...b, records: b.records.map(r => ({ ...r, summary: r.summary + '\nSame statement.' })) };
  const crlf = { ...lf, records: lf.records.map(r => ({ ...r, summary: r.summary.replace(/\n/g, '\r\n') })) };
  assert.deepEqual(worktreeChanges(lf, crlf), [], 'Windows line endings alone are not business changes');
  const { validateSnapshot } = require('../../model.js');
  const main = { id: 'main', branch: 'main', revision: 'a'.repeat(40), dirty: false, integrated: true, snapshot: a };
  assert.throws(() => validateBundle({ version: 1, kind: 'worktrees', project: a.project.name, main, worktrees: [main], omitted: [] }, validateSnapshot), /identity/);
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
