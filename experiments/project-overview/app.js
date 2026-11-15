(function () {
  'use strict';
  const model = window.OverviewModel;
  let data = model.validateSnapshot(window.OverviewSample);
  let selected = 'decision-reuse';
  let importGeneration = 0;
  const $ = (id) => document.getElementById(id);
  const labels = { 'in-progress':'In progress', 'not-run':'Not run', 'stale':'Stale', 'passed':'Passed', 'failed':'Failed', 'pending':'Pending', 'inconclusive':'Inconclusive' };
  const relationLabels = {
    addresses: ['Addresses', 'Required by'], aims_at: ['Aims to satisfy', 'Work toward this'],
    decides: ['Directs', 'Decision behind this'], supersedes: ['Replaces decision', 'Replaced by'],
    assesses: ['Checks', 'Evidence'], depends_on: ['Depends on', 'Depended on by']
  };
  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function statusLabel(state) { return labels[state] || state.charAt(0).toUpperCase() + state.slice(1); }
  function badge(record) {
    const state = model.evidenceState(record, data);
    return el('span', statusLabel(state), 'badge ' + state);
  }
  function block(title, text) {
    const section = el('section', undefined, 'detail-block');
    section.append(el('h3', title), el('p', text));
    return section;
  }
  function choose(id, moveFocus = false) {
    selected = id;
    renderList(); renderDetail();
    $('announce').textContent = 'Showing ' + data.records.find(r => r.id === id).title;
    if (moveFocus) $('detail-title').focus();
  }
  function renderList() {
    const records = model.selectRecords(data, $('search').value, $('filter').value);
    $('count').textContent = records.length + ' of ' + data.records.length;
    $('record-list').replaceChildren();
    $('empty').hidden = records.length !== 0;
    for (const record of records) {
      const button = el('button', undefined, 'record' + (record.status === 'superseded' ? ' history' : ''));
      button.type = 'button'; button.setAttribute('aria-pressed', String(record.id === selected));
      button.setAttribute('aria-controls','detail');
      const meta = el('span', undefined, 'record-meta');
      meta.append(el('span', record.kind, 'kind'), badge(record));
      button.append(meta, el('span', record.title, 'record-title'));
      button.addEventListener('click', () => choose(record.id, true));
      $('record-list').append(button);
    }
  }
  function renderDetail() {
    const pane = $('detail'); pane.replaceChildren();
    const record = data.records.find(r => r.id === selected);
    if (!record) { const heading=el('h2','No record selected');heading.id='detail-title';pane.append(heading,el('p','Select a record to follow its decisions and evidence.'));return; }
    const meta = el('div', undefined, 'detail-top');
    meta.append(el('span', record.kind, 'kind'), badge(record), el('span', record.id));
    const heading=el('h2',record.title);heading.id='detail-title';heading.tabIndex=-1;
    pane.append(meta, heading, el('p',record.summary,'detail-summary'));
    const provenance = el('div', undefined, 'provenance');
    if (record.owner) provenance.append(el('span','Owner: '+record.owner));
    if (record.revision) provenance.append(el('span','Current revision: '+record.revision));
    pane.append(provenance);
    if (record.status === 'superseded') pane.append(el('p','Historical decision. Follow “Replaced by” to see the current direction.','warning'));
    if (record.kind === 'evidence') {
      const edge=data.edges.find(e=>e.from===record.id && e.relation==='assesses');
      const target=data.records.find(r=>r.id===edge.to);
      if (model.evidenceState(record,data)==='stale') pane.append(el('p','Recorded result: '+statusLabel(record.status)+'. Tested '+record.testedRevision+'; the assessed change is now '+target.revision+'. This check does not establish the current result.','warning'));
      else pane.append(el('p','Reported evidence, not independently verified by this viewer. Revision matching does not prove that a check ran.','caption'));
      if (record.method) pane.append(block('How it was checked',record.method+' · tested revision '+record.testedRevision));
    }
    if (record.reason) pane.append(block('Why this choice',record.reason));
    if (record.next) {
      const next=el('section',undefined,'next');next.append(el('h3','Next useful action'),el('p',record.next));pane.append(next);
    }
    const connections=el('section',undefined,'connections');connections.append(el('h3','Connected context'));
    const related=model.related(record.id,data);
    if (!related.length) connections.append(el('p','No connections recorded. This does not establish that nothing depends on it.','muted'));
    for (const connection of related) {
      const {edge,direction,record:other}=connection;
      const row=el('div',undefined,'connection '+edge.basis);
      const label=el('div',relationLabels[edge.relation][direction==='outgoing'?0:1],'edge-label');
      label.append(el('span',edge.basis==='inferred'?'Inferred connection':'Stated connection'));
      const content=el('div');const link=el('button',other.title);link.type='button';
      link.addEventListener('click',()=>choose(other.id,true));content.append(link,badge(other));row.append(label,content);connections.append(row);
    }
    if (record.kind==='change' && !related.some(r=>r.edge.relation==='assesses')) connections.append(el('p','No evidence linked to this change. Its status is not proof of verification.','warning'));
    pane.append(connections);
    const sources=el('section',undefined,'detail-block');sources.append(el('h3','Source references'));
    const list=el('ul',undefined,'sources');
    for (const source of record.sources) {
      const li=el('li');
      if (source.url) { const link=el('a',source.title);link.href=model.safeUrl(source.url);link.target='_blank';link.rel='noopener noreferrer';li.append(link); }
      else li.append(el('span',source.title));
      if(source.path)li.append(el('span',source.path));list.append(li);
    }
    sources.append(list);pane.append(sources);
  }
  function renderProject() {
    $('project-name').textContent=data.project.name;
    $('project-summary').textContent=data.project.summary;
    $('snapshot').textContent=data.project.snapshot;
    $('mode').textContent=data.project.sample?'Illustrative project · all records and results below are sample data, not live work.':'Imported snapshot · supplied records, not live or independently verified work.';
    const attention=data.records.filter(r=>model.needsAttention(r,data));
    const checks=attention.filter(r=>r.kind==='evidence').length;
    const blockers=attention.filter(r=>r.kind==='blocker'||r.status==='blocked').length;
    $('attention-summary').textContent=attention.length?`${checks} evidence records need attention; ${blockers} blocked changes or open blockers are recorded. Open a record to see why.`:'No attention items are recorded. This does not establish project completion or approval.';
    renderList();renderDetail();
  }
  $('search').addEventListener('input',renderList);
  $('filter').addEventListener('change',renderList);
  $('show-attention').addEventListener('click',()=>{$('filter').value='attention';$('search').value='';renderList();$('filter').focus();$('workspace').scrollIntoView({block:'start'});});
  $('import').addEventListener('click',()=>{$('file').value='';$('file').click();});
  $('file').addEventListener('change',async()=>{
    const file=$('file').files[0];if(!file)return;
    const generation=++importGeneration;
    try {
      if(file.size>2*1024*1024)throw new Error('Snapshot exceeds the 2 MB prototype limit.');
      const candidate=model.validateSnapshot(JSON.parse(await file.text()));
      if(generation!==importGeneration)return;
      data=candidate;selected=data.records.find(r=>r.kind==='change')?.id||data.records[0]?.id;
      $('search').value='';$('filter').value='all';$('error').hidden=true;renderProject();
      $('announce').textContent='Opened '+data.project.name+'. Records remain local to this browser session.';
    } catch(error) {
      if(generation!==importGeneration)return;
      $('error').textContent='Could not open snapshot: '+error.message+' Your previous view is unchanged.';$('error').hidden=false;
    }
  });
  $('download').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify(window.OverviewSample,null,2)],{type:'application/json'}));
    const link=el('a');link.href=url;link.download='project-overview-sample.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  renderProject();
})();
