import { readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { focusHash, readFocus, type Snapshot, type View } from './src/graph';
const require = createRequire(import.meta.url);
const { validateSnapshot } = require('../model.js');
try {
  const { values } = parseArgs({ options: {
    snapshot: { type: 'string' }, record: { type: 'string' }, stage: { type: 'string', default: 'project' },
    chat: { type: 'string' }, base: { type: 'string', default: 'http://127.0.0.1:5173/' },
  } });
  if (!values.snapshot) throw new Error('Provide --snapshot PATH to an exported workflow JSON.');
  if (statSync(values.snapshot).size > 2 * 1024 * 1024) throw new Error('Snapshot exceeds 2 MiB.');
  const snapshot: Snapshot = validateSnapshot(JSON.parse(readFileSync(values.snapshot, 'utf8')));
  const url = new URL(values.base);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Viewer base must be HTTP(S), without credentials.');
  url.hash = focusHash(snapshot, values.stage as View, values.record, values.chat);
  readFocus(url.hash, snapshot);
  console.log(url.href);
} catch (error) { console.error((error as Error).message); process.exitCode = 1; }
