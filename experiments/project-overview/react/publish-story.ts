import { readFileSync, writeFileSync, renameSync, mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { validateStory } from './src/session';
const require = createRequire(import.meta.url);
const { validateSnapshot } = require('../model.js');
try {
  const { values } = parseArgs({ options: { snapshot: { type: 'string' }, event: { type: 'string' } } });
  function read(path?: string) {
    if (!path || statSync(path).size > 2 * 1024 * 1024) throw new Error('Supply --snapshot and --event JSON files, each at most 2 MiB.');
    return JSON.parse(readFileSync(path, 'utf8'));
  }
  const event = validateStory(read(values.event), validateSnapshot(read(values.snapshot)));
  if (!event.question || !event.answer || !event.steps) throw new Error('Publish an answer story with question, answer and one reason per route step.');
  const dir = fileURLToPath(new URL('./public/', import.meta.url));
  mkdirSync(dir, { recursive: true });
  const target = dir + 'agent-story.json';
  const temp = target + '.' + process.pid + '.tmp';
  writeFileSync(temp, JSON.stringify(event), 'utf8');
  renameSync(temp, target);
  console.log('Story published locally. Enable Follow agent in the matching project view.');
} catch (error) { console.error((error as Error).message); process.exitCode = 1; }
