// Run against a fresh, isolated Chrome debugging profile: node browser-check.mjs PORT OUTPUT_DIRECTORY
import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
const port = Number(process.argv[2]);
assert.ok(Number.isInteger(port) && port > 0);
const output = process.argv[3];
const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = pages.find(p => p.type === 'page' && (p.url === 'about:blank' || p.url.startsWith('http://127.0.0.1:5173/')));
assert.ok(page, 'Use a fresh profile, not a personal browser.');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (pending.has(message.id)) { const { resolve, reject, timer } = pending.get(message.id); clearTimeout(timer); pending.delete(message.id); message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result); }
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const key = ++id; const timer = setTimeout(() => reject(new Error(`Timeout: ${method}`)), 10000); pending.set(key, { resolve, reject, timer }); ws.send(JSON.stringify({ id: key, method, params })); }); }
async function evaluate(expression) { const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
const pause = () => new Promise(resolve => setTimeout(resolve, 650));
async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await pause(); }
async function shot(name) { if (!output) return; await mkdir(output, { recursive: true }); const { data } = await send('Page.captureScreenshot', { format: 'png' }); await writeFile(join(output, `${name}.png`), Buffer.from(data, 'base64')); }
try {
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  for (let n = 0; n < 20; n++) { if (await evaluate(`document.querySelectorAll('.record').length === 8`)) break; await pause(); }
  assert.equal(await evaluate(`document.querySelectorAll('.record').length`), 8);
  if (await evaluate(`document.documentElement.dataset.theme === 'dark'`)) await click('[aria-label="Light mode"]');
  await pause();
  await shot('project-light');
  await evaluate(`[...document.querySelectorAll('.lifecycle button')].find(b=>b.textContent.includes('Ideation')).click()`); await pause();
  assert.equal(await evaluate(`document.querySelectorAll('.record').length`), 2);
  await shot('ideation');
  await click('[data-id="PROBLEM-001"]');
  assert.equal(await evaluate(`document.querySelector('.summary').textContent`), 'Workers cannot easily identify cafes with the amenities they need.');
  assert.equal(await evaluate(`document.activeElement.tagName`), 'H2');
  await click('[aria-label="Close summary"]');
  assert.equal(await evaluate(`document.activeElement.dataset.id`), 'PROBLEM-001', 'Closing returns keyboard focus to node');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }); await pause();
  assert.ok(await evaluate(`!!document.querySelector('.inspector')`), 'Keyboard opens summary');
  await evaluate(`location.hash='project=cafe-trial&stage=project&record=DECISION-002&chat=codex-trial'`); await pause();
  assert.equal(await evaluate(`document.querySelector('.inspector h2').textContent`), 'Supplement missing amenities');
  assert.deepEqual(await evaluate(`['prompt','check','revision','direction'].map(kind=>getComputedStyle(document.querySelector('.link-'+kind+' .react-flow__edge-path')).strokeDasharray)`), ['8px, 5px', '2px, 5px', '10px, 4px, 2px, 4px', 'none']);
  await click('.flow-key summary');
  assert.ok(await evaluate(`document.querySelector('.flow-key').open`));
  await click('[aria-label="Zoom in"]'); await click('[aria-label="Zoom in"]');
  assert.ok(await evaluate(`document.querySelectorAll('.distant').length > 0`));
  await shot('focus-light');
  await click('[aria-label="Dark mode"]');
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), 'dark');
  await shot('focus-dark');
  await click('.flow-key summary');
  await evaluate(`[...document.querySelectorAll('.lifecycle button')].find(b=>b.textContent.includes('Deployment')).click()`); await pause();
  assert.ok(await evaluate(`document.querySelector('.empty').textContent.includes('No records yet')`));
  await click('[aria-label="Return to chat focus"]');
  assert.equal(await evaluate(`document.querySelector('.inspector h2').textContent`), 'Supplement missing amenities');
  await evaluate(`location.hash='project=wrong-project&record=DECISION-002'`); await pause();
  assert.ok(await evaluate(`document.querySelector('[role="alert"]').textContent.includes('another project')`));
  await click('[aria-label="Dismiss error"]');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }); await pause();
  assert.ok(await evaluate(`document.documentElement.scrollWidth <= 390`));
  assert.ok(await evaluate(`(()=>{const r=document.querySelector('[data-id="DECISION-002"]').getBoundingClientRect();const canvas=document.querySelector('.canvas').getBoundingClientRect();return r.left>=canvas.left && r.right<=canvas.right && r.top>=canvas.top && r.bottom<=canvas.bottom})()`), 'Selected node remains visible on mobile');
  await shot('mobile-dark');
  await click('[aria-label="Light mode"]'); await shot('mobile-light');
  await evaluate(`(()=>{const dt=new DataTransfer();dt.items.add(new File(['{"version":99}'],'invalid.json',{type:'application/json'}));const input=document.querySelector('input[type=file]');input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}));})()`); await pause();
  assert.ok(await evaluate(`document.querySelector('[role="alert"]').textContent.includes('Unsupported snapshot')`));
  assert.equal(await evaluate(`document.querySelectorAll('.record').length`), 8, 'Bad import preserves snapshot');
  assert.deepEqual(errors, []);
  console.log('Browser checks passed: stage counts, canonical summary, keyboard, chat focus, fading, empty state, theme, mobile overflow, runtime errors.');
} finally { ws.close(); }
