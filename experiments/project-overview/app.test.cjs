// A small DOM double checks event wiring and inert text, not browser rendering or layout.
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const model = require('./model.js');
const sample = require('./sample.js');

function setup() {
  class Element {
    constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.attrs = {}; this.value = ''; this.hidden = false; this.ownText = ''; }
    set textContent(value) { this.ownText = String(value); this.children = []; }
    get textContent() { return this.ownText + this.children.map(c => c.textContent).join(' '); }
    set innerHTML(_) { throw new Error('HTML insertion is not permitted'); }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this.ownText = ''; this.children = children; }
    setAttribute(key, value) { this.attrs[key] = value; }
    addEventListener(event, action) { this.listeners[event] = action; }
    click() { return this.listeners.click?.(); }
    focus() { this.focused = true; }
    scrollIntoView() {}
  }
  const html = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  const nodes = Object.fromEntries(ids.map(id => [id,new Element('div')]));
  nodes.filter.value = 'all';
  function find(node,id) { if(node.id===id)return node;for(const child of node.children){const found=find(child,id);if(found)return found;} }
  const document = {createElement:tag=>new Element(tag),getElementById:id=>nodes[id]||find(nodes.detail,id)};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'app.js'),'utf8'), {
    window:{OverviewModel:model,OverviewSample:structuredClone(sample)},document,Blob,URL,setTimeout
  });
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
