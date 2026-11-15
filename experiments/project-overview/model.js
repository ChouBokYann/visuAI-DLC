(function (root) {
  'use strict';
  const statuses = {
    goal: ['active', 'closed'], requirement: ['active', 'retired'],
    decision: ['proposed', 'accepted', 'superseded'],
    change: ['planned', 'in-progress', 'ready', 'blocked', 'done'],
    blocker: ['open', 'resolved'],
    evidence: ['passed', 'failed', 'pending', 'not-run', 'inconclusive']
  };
  const workflowStatuses = {problem:['active','resolved'],outcome:['undecided','planned','observed'],requirement:['proposed','accepted','conditional','retired'],decision:statuses.decision,change:['planned','in-progress','implemented','blocked'],evidence:statuses.evidence,release:['planned','submitted','deployed','failed','unknown']};
  const workflowRelations = {addresses:['outcome:problem'],supports:['requirement:outcome'],aims_to_achieve:['decision:outcome'],implements:['change:decision','change:requirement'],evaluates:['evidence:change','evidence:requirement','evidence:outcome'],includes:['release:change'],supersedes:['decision:decision']};
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
    if (![1,2].includes(raw.version)) fail('Unsupported snapshot version. Expected 1 or 2.');
    const workflow = raw.version === 2;
    const allowedStatuses = workflow ? workflowStatuses : statuses;
    const allowedRelations = workflow ? workflowRelations : relations;
    if (workflow) {
      object(raw.provenance, 'provenance');
      if (typeof raw.provenance.complete !== 'boolean') fail('Completeness must be explicit.');
      for (const key of ['baseline','digest']) text(raw.provenance[key], 'provenance.'+key);
      array(raw.provenance.unresolved,'unresolved IDs',4000); array(raw.provenance.diagnostics,'diagnostics',1000);
      for (const diagnostic of raw.provenance.diagnostics) text(diagnostic,'diagnostic');
      for (const id of raw.provenance.unresolved) text(id,'unresolved ID',100);
      if (raw.provenance.complete && raw.provenance.unresolved.length) fail('Complete snapshot has unresolved IDs.');
    }
    object(raw.project, 'project');
    for (const field of ['name', 'summary', 'snapshot']) text(raw.project[field], 'project.' + field);
    if (typeof raw.project.sample !== 'boolean') fail('project.sample must explicitly be true or false.');
    array(raw.records, 'records', 1000); array(raw.edges, 'edges', 4000);
    const ids = new Map();
    for (const record of raw.records) {
      object(record, 'record'); text(record.id, 'record id', 100);
      if (!(workflow ? /^[A-Za-z][A-Za-z0-9_-]{0,99}$/ : /^[a-z][a-z0-9-]*$/).test(record.id)) fail('Invalid record id: ' + record.id);
      if (ids.has(record.id)) fail('Duplicate record id: ' + record.id);
      text(record.kind, 'record kind', 100); text(record.status, 'record status', 100);
      if (!Object.hasOwn(allowedStatuses, record.kind) || !allowedStatuses[record.kind].includes(record.status)) fail('Unknown kind/status for ' + record.id);
      for (const field of ['title', 'summary']) text(record[field], record.id + '.' + field);
      for (const field of ['reason', 'next', 'owner', 'revision', 'method', 'testedRevision','explanation','gap','measurement','context','limits']) {
        if (record[field] !== undefined) text(record[field], record.id + '.' + field);
      }
      if (workflow) {
        for (const field of ['document','documentHash','detail','explanation']) text(record[field],record.id+'.'+field);
        array(record.sourceReferences,'source references',9);
        const sourceIds=new Set();
        for (const source of record.sourceReferences) {
          object(source,'source reference');text(source.id,'source ID',100);text(source.ref,'source reference',2000);
          if(sourceIds.has(source.id))fail('Duplicate source ID.');sourceIds.add(source.id);
        }
        if(!sourceIds.size)fail('Source references required.');
        if(record.kind==='requirement')text(record.acceptance,'acceptance condition or gap');
        if(record.kind==='decision' && ['accepted','superseded'].includes(record.status) && !sourceIds.has(record.authority))fail('Decision authority source required.');
        if(record.kind==='release' && record.status==='deployed') {
          text(record.revision,'release revision');text(record.environment,'release environment');
          if(!sourceIds.has(record.observation))fail('Release observation source required.');
        }
      }
      if (record.kind === 'change' && (!workflow || record.status === 'implemented')) text(record.revision, record.id + '.revision', 200);
      if (workflow && record.kind === 'outcome' && record.status !== 'undecided') text(record.measurement,'measurement');
      if (record.kind === 'evidence') {
        if (workflow && !['technical','business'].includes(record.scope)) fail('Evidence scope required.');
        if (['passed','failed','inconclusive'].includes(record.status)) {
          if (!workflow || record.scope === 'technical') text(record.testedRevision, record.id + '.testedRevision', 200);
          if (workflow) { text(record.context,'evidence context'); text(record.limits,'evidence limits'); }
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
      if (!ids.has(edge.from)) fail('Unknown record in relationship.');
      const key = [edge.from,edge.relation,edge.to].join('|');
      if (seen.has(key)) fail('Duplicate relationship.');
      seen.add(key);
      if (workflow && !ids.get(edge.from).sourceReferences.some(s=>s.id===edge.source))fail('Unknown relationship source.');
      if (!ids.has(edge.to)) {
        if (!workflow || raw.provenance.complete || !raw.provenance.unresolved.includes(edge.to)) fail('Unknown record in relationship.');
        if (!Object.hasOwn(allowedRelations,edge.relation) || !allowedRelations[edge.relation].some(pair=>pair.startsWith(ids.get(edge.from).kind+':')) || !['stated','inferred'].includes(edge.basis)) fail('Invalid unresolved relationship.');
        text(edge.reason,'relationship reason'); text(edge.source,'relationship source');
        continue;
      }
      if (workflow) {text(edge.reason,'relationship reason');text(edge.source,'relationship source');}
      const pair = ids.get(edge.from).kind + ':' + ids.get(edge.to).kind;
      if (!Object.hasOwn(allowedRelations, edge.relation) || !allowedRelations[edge.relation].includes(pair) || edge.from === edge.to) fail('Invalid relationship type or endpoints.');
      if (!['stated', 'inferred'].includes(edge.basis)) fail('Relationship basis must be stated or inferred.');
      if (edge.relation === 'supersedes' && (ids.get(edge.to).status !== 'superseded' || ids.get(edge.from).status === 'proposed')) fail('Supersession must refer to a superseded decision and an established replacement.');
    }
    for (const record of raw.records.filter(r => r.kind === 'evidence')) {
      if (raw.edges.filter(e => e.from === record.id && e.relation === (workflow ? 'evaluates' : 'assesses')).length !== 1) fail(record.id + ': evidence must assess exactly one target.');
      if (workflow) {
        const target = ids.get(raw.edges.find(e=>e.from===record.id && e.relation==='evaluates').to);
        if (target && (target.kind==='outcome') !== (record.scope==='business')) fail('Evidence scope/target mismatch.');
      }
    }
    if(workflow) {
      for(const record of raw.records) {
        const relation={outcome:'addresses',requirement:'supports',decision:'aims_to_achieve',change:'implements'}[record.kind];
        if(relation && !raw.edges.some(e=>e.from===record.id && e.relation===relation))text(record.gap,'Missing business context gap');
        if(record.kind==='outcome' && record.status==='observed' && !raw.edges.some(e=>e.to===record.id && e.relation==='evaluates' && ['passed','failed','inconclusive'].includes(ids.get(e.from).status)))fail('Observed outcome needs completed business evidence.');
      }
    }
    return raw;
  }
  function evidenceState(record, data) {
    if (record.kind !== 'evidence' || !['passed','failed','inconclusive'].includes(record.status)) return record.status;
    if (data.version === 2 && record.scope === 'business') return record.status;
    const edge = data.edges.find(e => e.from === record.id && ['assesses','evaluates'].includes(e.relation));
    const target = data.records.find(r => r.id === edge?.to);
    return !target || record.testedRevision !== target.revision ? 'stale' : record.status;
  }
  function related(id, data) {
    return data.edges.filter(e => e.from === id || e.to === id).map(edge => ({
      edge, direction: edge.from === id ? 'outgoing' : 'incoming',
      record: data.records.find(r => r.id === (edge.from === id ? edge.to : edge.from))
    })).filter(connection => connection.record);
  }
  function needsAttention(record, data) {
    return ['open','blocked','failed','stale','pending','not-run','inconclusive','proposed','undecided','conditional','unknown'].includes(evidenceState(record, data));
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
