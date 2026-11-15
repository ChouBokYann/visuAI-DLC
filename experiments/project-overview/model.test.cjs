const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('./model.js');
const sample = require('./sample.js');
const copy = () => structuredClone(sample);

test('learning map uses authored placements and only explicit feedback triggers', () => {
  const data=model.validateSnapshot(structuredClone(require('./workflow-samples.js').b));
  const view=model.flowView(data);
  assert.equal(view.outcome.id,'OUTCOME-001');
  assert.equal(view.steps.decide.length,1);
  assert.equal(view.history[0].id,'DECISION-001');
  assert.equal(view.feedback[0].evidence.id,'EVIDENCE-002');
  delete data.records.find(r=>r.id==='CHANGE-001').workflow;
  assert.equal(model.flowView(data).steps.act.length,0);
  assert(model.flowView(data).unplaced.some(r=>r.id==='CHANGE-001'));
});

test('workflow import rejects fabricated placement and non-evidence feedback references', () => {
  const data=structuredClone(require('./workflow-samples.js').b);
  data.records[0].workflow.phase='complete';
  assert.throws(()=>model.validateSnapshot(data),/workflow placement/);
  data.records[0].workflow.phase='ideation';
  data.records.find(r=>r.id==='DECISION-002').workflow.trigger='PROBLEM-001';
  assert.throws(()=>model.validateSnapshot(data),/trigger/);
});

test('sample connections resolve and preserve decision history and inferred basis', () => {
  const data = model.validateSnapshot(copy());
  assert.equal(data.records.find(r => r.id === 'decision-build').status, 'superseded');
  assert(model.related('change-filter', data).some(r => r.edge.basis === 'inferred'));
});
test('a previously passed check becomes stale for a changed target revision', () => {
  const data = model.validateSnapshot(copy());
  assert.equal(model.evidenceState(data.records.find(r => r.id === 'evidence-filter'), data), 'stale');
  assert.equal(model.evidenceState(data.records.find(r => r.id === 'evidence-import'), data), 'passed');
  data.records.find(r => r.id === 'change-import').revision = 'different';
  assert.equal(model.evidenceState(data.records.find(r => r.id === 'evidence-import'), data), 'stale');
});
test('pending, failed, not-run and inconclusive are not promoted to passed', () => {
  const data = model.validateSnapshot(copy());
  for (const state of ['pending', 'failed', 'not-run', 'inconclusive']) {
    const record = data.records.find(r => r.id === 'evidence-live');
    record.status = state;
    if (['failed','inconclusive'].includes(state)) { record.testedRevision = 'import-r2'; record.method = 'Synthetic check'; }
    assert.equal(model.evidenceState(record, data), state);
  }
});
test('reject duplicate IDs and unresolved or mistyped edges', () => {
  let data = copy(); data.records.push(data.records[0]);
  assert.throws(() => model.validateSnapshot(data), /Duplicate/);
  data = copy(); data.edges[0].to = 'missing';
  assert.throws(() => model.validateSnapshot(data), /Unknown record/);
  data = copy(); data.edges[0].relation = 'assesses';
  assert.throws(() => model.validateSnapshot(data), /Invalid relationship/);
});
test('one evidence record must identify one assessed target and completed-check provenance', () => {
  let data = copy(); data.edges = data.edges.filter(e => e.from !== 'evidence-import');
  assert.throws(() => model.validateSnapshot(data), /exactly one/);
  data = copy(); delete data.records.find(r => r.id === 'evidence-import').testedRevision;
  assert.throws(() => model.validateSnapshot(data), /testedRevision/);
});
test('reject active source URLs and oversized or invalid structures', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,hi', 'file:///secret', 'https://user:pass@example.com']) {
    const data = copy(); data.records[0].sources[0].url = url;
    assert.throws(() => model.validateSnapshot(data), /URL/);
  }
  const data = copy(); data.records[0].summary = 'a'.repeat(4001);
  assert.throws(() => model.validateSnapshot(data), /summary/);
  assert.throws(() => model.validateSnapshot(null), /snapshot/);
  assert.throws(() => model.validateSnapshot({...copy(), version: 99}), /version/);
});
test('markup stays plain data and input objects are not modified', () => {
  const data = copy(); data.records[0].title = '<img src=x onerror=alert(1)>';
  const before = structuredClone(data);
  assert.equal(model.validateSnapshot(data).records[0].title, data.records[0].title);
  assert.deepEqual(data, before);
});
test('filters include computed stale evidence and empty matches without losing connections', () => {
  const data = model.validateSnapshot(copy());
  assert(model.selectRecords(data, '', 'attention').some(r => r.id === 'evidence-filter'));
  assert(!model.selectRecords(data, '', 'attention').some(r => r.id === 'decision-build'));
  assert.equal(model.selectRecords(data, 'not a matching term', 'all').length, 0);
  assert(model.related('decision-reuse', data).some(r => r.record.id === 'decision-build'));
});
test('reject coerced type fields and contradictory decision history', () => {
  let data=copy(); data.records[0].kind=['goal'];
  assert.throws(()=>model.validateSnapshot(data), /record kind/);
  data=copy(); data.edges[0].relation=['addresses'];
  assert.throws(()=>model.validateSnapshot(data), /relationship.relation/);
  data=copy(); data.records.find(r=>r.id==='decision-build').status='accepted';
  assert.throws(()=>model.validateSnapshot(data), /Supersession/);
});
