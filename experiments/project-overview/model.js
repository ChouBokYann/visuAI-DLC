(function (root) {
  'use strict';
  const statuses = {
    goal: ['active', 'closed'], requirement: ['active', 'retired'],
    decision: ['proposed', 'accepted', 'superseded'],
    change: ['planned', 'in-progress', 'ready', 'blocked', 'done'],
    blocker: ['open', 'resolved'],
    evidence: ['passed', 'failed', 'pending', 'not-run', 'inconclusive']
  };
  const relations = {
    addresses: ['requirement:goal'], aims_at: ['change:requirement'],
    decides: ['decision:change'], supersedes: ['decision:decision'],
    assesses: ['evidence:change'], depends_on: ['change:change', 'change:blocker']
  };
  function fail(message) { throw new Error(message); }
  function object(value, name) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail('Invalid ' + name + '.');
  }
  function text(value, name, max = 4000) {
    if (typeof value !== 'string' || !value.trim() || value.length > max) fail(name + ' must be nonempty text, at most ' + max + ' characters.');
  }
  function array(value, name, max) {
    if (!Array.isArray(value) || value.length > max) fail(name + ' must be a list with at most ' + max + ' entries.');
  }
  function safeUrl(value) {
    text(value, 'Source URL', 2000);
    let url;
    try { url = new URL(value); } catch { fail('Invalid source URL.'); }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) fail('Source URL must be HTTP(S) without credentials.');
    return url.href;
  }
  function validateSnapshot(raw) {
    object(raw, 'snapshot');
    if (raw.version !== 1) fail('Unsupported snapshot version. Expected 1.');
    object(raw.project, 'project');
    for (const field of ['name', 'summary', 'snapshot']) text(raw.project[field], 'project.' + field);
    if (typeof raw.project.sample !== 'boolean') fail('project.sample must explicitly be true or false.');
    array(raw.records, 'records', 1000); array(raw.edges, 'edges', 4000);
    const ids = new Map();
    for (const record of raw.records) {
      object(record, 'record'); text(record.id, 'record id', 100);
      if (!/^[a-z][a-z0-9-]*$/.test(record.id)) fail('Invalid record id: ' + record.id);
      if (ids.has(record.id)) fail('Duplicate record id: ' + record.id);
      text(record.kind, 'record kind', 100); text(record.status, 'record status', 100);
      if (!Object.hasOwn(statuses, record.kind) || !statuses[record.kind].includes(record.status)) fail('Unknown kind/status for ' + record.id);
      for (const field of ['title', 'summary']) text(record[field], record.id + '.' + field);
      for (const field of ['reason', 'next', 'owner', 'revision', 'method', 'testedRevision']) {
        if (record[field] !== undefined) text(record[field], record.id + '.' + field);
      }
      if (record.kind === 'change') text(record.revision, record.id + '.revision', 200);
      if (record.kind === 'evidence') {
        if (['passed','failed','inconclusive'].includes(record.status)) {
          text(record.testedRevision, record.id + '.testedRevision', 200);
          text(record.method, record.id + '.method');
        } else if (record.testedRevision !== undefined) fail(record.id + ': unrun evidence cannot have testedRevision.');
      }
      array(record.sources, record.id + '.sources', 10);
      if (!record.sources.length) fail(record.id + ': at least one source reference is required.');
      for (const source of record.sources) {
        object(source, 'source'); text(source.title, 'source title', 300);
        if (!source.url && !source.path) fail(record.id + ': source needs a URL or readable path.');
        if (source.url !== undefined) safeUrl(source.url);
        if (source.path !== undefined) text(source.path, 'source path', 2000);
      }
      ids.set(record.id, record);
    }
    const seen = new Set();
    for (const edge of raw.edges) {
      object(edge, 'relationship');
      for (const field of ['from', 'to', 'relation', 'basis']) text(edge[field], 'relationship.' + field, 100);
      if (!ids.has(edge.from) || !ids.has(edge.to)) fail('Unknown record in relationship.');
      const pair = ids.get(edge.from).kind + ':' + ids.get(edge.to).kind;
      if (!Object.hasOwn(relations, edge.relation) || !relations[edge.relation].includes(pair) || edge.from === edge.to) fail('Invalid relationship type or endpoints.');
      if (!['stated', 'inferred'].includes(edge.basis)) fail('Relationship basis must be stated or inferred.');
      if (edge.relation === 'supersedes' && (ids.get(edge.to).status !== 'superseded' || ids.get(edge.from).status === 'proposed')) fail('Supersession must refer to a superseded decision and an established replacement.');
      const key = [edge.from,edge.relation,edge.to].join('|');
      if (seen.has(key)) fail('Duplicate relationship.');
      seen.add(key);
    }
    for (const record of raw.records.filter(r => r.kind === 'evidence')) {
      if (raw.edges.filter(e => e.from === record.id && e.relation === 'assesses').length !== 1) fail(record.id + ': evidence must assess exactly one change.');
    }
    return raw;
  }
  function evidenceState(record, data) {
    if (record.kind !== 'evidence' || !['passed','failed','inconclusive'].includes(record.status)) return record.status;
    const edge = data.edges.find(e => e.from === record.id && e.relation === 'assesses');
    const target = data.records.find(r => r.id === edge?.to);
    return !target || record.testedRevision !== target.revision ? 'stale' : record.status;
  }
  function related(id, data) {
    return data.edges.filter(e => e.from === id || e.to === id).map(edge => ({
      edge, direction: edge.from === id ? 'outgoing' : 'incoming',
      record: data.records.find(r => r.id === (edge.from === id ? edge.to : edge.from))
    }));
  }
  function needsAttention(record, data) {
    return ['open','blocked','failed','stale','pending','not-run','inconclusive','proposed'].includes(evidenceState(record, data));
  }
  function selectRecords(data, query, filter) {
    const term = query.toLocaleLowerCase().trim();
    return data.records.filter(r => (!term || [r.title,r.summary,r.id].join(' ').toLocaleLowerCase().includes(term)) &&
      (filter === 'all' || (filter === 'attention' ? needsAttention(r, data) : r.kind === filter)));
  }
  const api = {validateSnapshot, evidenceState, related, selectRecords, safeUrl, needsAttention};
  if (typeof module !== 'undefined') module.exports = api;
  else root.OverviewModel = api;
})(typeof window === 'undefined' ? globalThis : window);
