// A small DOM double checks event wiring and inert text, not browser rendering or layout.
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const model = require('./model.js');
const sample = require('./sample.js');

function setup(useFlow = false) {
  class Element {
    constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.attrs = {}; this.value = ''; this.hidden = false; this.ownText = ''; }
    set textContent(value) { this.ownText = String(value); this.children = []; }
    get textContent() { return this.ownText + this.children.map(c => c.textContent).join(' '); }
    set innerHTML(_) { throw new Error('HTML insertion is not permitted'); }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this.ownText = ''; this.children = children; }
    setAttribute(key, value) { this.attrs[key] = value; }
    addEventListener(event, action) { this.listeners[event] = action; }
    click() { return this.listeners.click ? this.listeners.click() : this.onclick?.(); }
    focus() { this.focused = true; }
    scrollIntoView() {}
  }
  const html = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  const nodes = Object.fromEntries(ids.map(id => [id,new Element('div')]));
  nodes.filter.value = 'all';
  function find(node,id) { if(node.id===id)return node;for(const child of node.children){const found=find(child,id);if(found)return found;} }
  const document = {createElement:tag=>new Element(tag),getElementById:id=>nodes[id]||find(nodes.detail,id)};
  const context=vm.createContext({window:{OverviewModel:model,OverviewSample:structuredClone(sample)},document,Blob,URL,setTimeout});
  if(useFlow){context.window.WorkflowSamples=structuredClone(require('./workflow-samples.js'));vm.runInContext(fs.readFileSync(path.join(__dirname,'flow.js'),'utf8'),context);}
  vm.runInContext(fs.readFileSync(path.join(__dirname,'app.js'),'utf8'),context);
  async function upload(value, size = 10) {
    nodes.file.files = [{size,text:async()=>value}];
    await nodes.file.listeners.change();
  }
  return {nodes, upload, find};
}

test('initial view and relationship navigation retain historical and current distinction', () => {
  const {nodes}=setup();
  assert.equal(nodes['project-name'].textContent,'Cafe Finder');
  assert.match(nodes.mode.textContent,/sample data/);
  assert.match(nodes.detail.textContent,/Use an existing directory first/);
  const connections=nodes.detail.children.find(n=>n.className==='connections');
  const historical=connections.children.flatMap(n=>n.children).flatMap(n=>n.children).find(n=>n.tag==='button'&&n.textContent==='Build a new cafe directory');
  assert(historical);historical.click();
  assert.match(nodes.detail.textContent,/Historical decision/);
  assert.match(nodes.detail.textContent,/Replaced by/);
});
test('search empty state and attention filters are wired to controls', () => {
  const {nodes}=setup();nodes.search.value='nothing matches this';nodes.search.listeners.input();
  assert.equal(nodes['record-list'].children.length,0);assert.equal(nodes.empty.hidden,false);
  nodes['show-attention'].click();assert.equal(nodes.filter.value,'attention');
  assert.match(nodes['record-list'].textContent,/Previous filter checks passed/);
  assert.match(nodes['record-list'].textContent,/Stale/);
});
test('bad JSON and invalid sources retain the previous valid view', async () => {
  const {nodes,upload}=setup();
  for(const input of ['{',JSON.stringify({...sample,version:8})]) {
    await upload(input);assert.equal(nodes.error.hidden,false);
    assert.match(nodes.error.textContent,/previous view is unchanged/);
    assert.equal(nodes['project-name'].textContent,'Cafe Finder');
  }
  const invalid=structuredClone(sample);invalid.records[0].sources[0].url='javascript:alert(1)';
  await upload(JSON.stringify(invalid));assert.match(nodes.error.textContent,/URL/);
  await upload('{}',2097153);assert.match(nodes.error.textContent,/2 MB/);
});
test('valid import renders markup as inert text and distinguishes imported data', async () => {
  const {nodes,upload}=setup();const data=structuredClone(sample);
  data.project.name='<script>alert(1)</script>';data.project.sample=false;
  data.records.find(r=>r.id==='change-import').title='<img src=x onerror=alert(1)>';
  await upload(JSON.stringify(data));
  assert.equal(nodes.error.hidden,true);assert.equal(nodes['project-name'].textContent,data.project.name);
  assert.match(nodes.detail.textContent,/<img src=x onerror=alert\(1\)>/);
  assert.match(nodes.mode.textContent,/not live or independently verified/);
});
test('empty snapshot stays navigable and makes no completion claim', async () => {
  const {nodes,upload}=setup();await upload(JSON.stringify({...sample,records:[],edges:[]}));
  assert.equal(nodes.empty.hidden,false);assert.match(nodes.detail.textContent,/No record selected/);
  assert.match(nodes['attention-summary'].textContent,/does not establish project completion/);
});
test('last selected import wins if an earlier read finishes later', async () => {
  const {nodes,upload}=setup();let resolve;
  nodes.file.files=[{size:10,text:()=>new Promise(r=>{resolve=r;})}];
  const slow=nodes.file.listeners.change();
  await upload(JSON.stringify({...sample,project:{...sample.project,name:'Newer snapshot'}}));
  resolve(JSON.stringify(sample));await slow;
  assert.equal(nodes['project-name'].textContent,'Newer snapshot');
});

function workflowSnapshot() {
  const {execFileSync}=require('node:child_process');
  const root=path.resolve(__dirname,'../..');
  const code="import json; from scripts.export_workflow import export; print(json.dumps(export('docs/examples/business-context/baseline-b','cafe-trial','synthetic-b',True)))";
  return JSON.parse(execFileSync('python',['-B','-c',code],{cwd:root,encoding:'utf8'}));
}
test('workflow import starts at business intent and navigates to stale technical evidence', async () => {
  const {nodes,upload}=setup();const data=workflowSnapshot();
  await upload(JSON.stringify(data));
  assert.equal(nodes.error.hidden,true,nodes.error.textContent);
  assert.match(nodes.detail.textContent,/Business benefit has not been measured/);
  assert.match(nodes['project-summary'].textContent,/unmeasured/);
  nodes['record-list'].children.find(n=>n.textContent.includes('Synthetic filter check')).click();
  assert.match(nodes.detail.textContent,/Stale/);
  assert.match(nodes.detail.textContent,/technical/);
  assert.match(nodes.detail.textContent,/fixture-v1/);
  assert.match(nodes.detail.textContent,/fixture-v2/);
  assert.match(nodes.detail.textContent,/No actual test ran/);
});
test('partial workflow warns and retains safe explanations without hidden missing targets', async () => {
  const {nodes,upload}=setup();const data=workflowSnapshot();
  data.provenance.complete=false;data.provenance.unresolved=['MISSING-001'];
  data.edges.find(e=>e.relation==='addresses').to='MISSING-001';
  data.records.find(r=>r.kind==='outcome').explanation='<script>danger()</script>';
  await upload(JSON.stringify(data));
  assert.equal(nodes.error.hidden,true,nodes.error.textContent);
  assert.match(nodes.mode.textContent,/Partial bundle/);
  assert.match(nodes.detail.textContent,/MISSING-001/);
  assert.match(nodes.detail.textContent,/<script>danger\(\)<\/script>/);
  const invalid=structuredClone(data);invalid.records.find(r=>r.kind==='evidence').scope='business';
  await upload(JSON.stringify(invalid));
  assert.equal(nodes.error.hidden,false);
  assert.match(nodes['project-name'].textContent,/cafe-trial/);
});

test('learning canvas starts with business intent, opens details on demand and switches cycles', () => {
  const {nodes}=setup(true);
  assert.match(nodes['outcome-title'].textContent,/Reduce cafe search effort/);
  assert.match(nodes['outcome-status'].textContent,/not measured/);
  assert.match(nodes['feedback-links'].textContent,/Provider omits power availability/);
  assert.match(nodes['evidence-readout'].textContent,/1 stale.*1 failed/);
  nodes['decide-nodes'].children[0].click();
  assert.equal(nodes.inspector.hidden,false);
  assert.match(nodes.detail.textContent,/Supplement missing amenities/);
  assert.match(nodes['loop-context'].textContent,/planning.*cycle-2/);
  nodes['close-detail'].click();assert.equal(nodes.inspector.hidden,true);
  nodes.demo.value='a';nodes.demo.listeners.change();
  assert.match(nodes['feedback-links'].textContent,/No feedback trigger recorded/);
  assert.match(nodes['decide-nodes'].textContent,/Reuse a places provider/);
  assert.match(nodes['evidence-readout'].textContent,/0 stale/);
});
test('legacy imports disclose missing workflow placement instead of inventing a phase', async () => {
  const {nodes,upload}=setup(true);
  await upload(JSON.stringify(sample));
  assert.equal(nodes.error.hidden,true,nodes.error.textContent);
  assert.match(nodes['placement-note'].textContent,/no recorded OODA placement/);
  assert.match(nodes['act-nodes'].textContent,/No records placed/);
});
