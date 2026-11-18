// Run: JOURNEY_PYTHON=python3 PLAYWRIGHT_MODULE=/absolute/playwright/index.mjs
//      CHROME_PATH=/absolute/chrome node run.mjs /new/absolute/evidence-directory
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { cp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createConnection } from 'node:net';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const script = fileURLToPath(import.meta.url);
const repo = await realpath(resolve(dirname(script), '../../../..'));
const app = join(repo, 'experiments/project-overview/react');
const requireApp = createRequire(join(app, 'package.json'));
const evidence = process.argv[2];
const inside = (parent, child) => child === parent || child.startsWith(parent + sep);
assert(process.argv.length === 3 && isAbsolute(evidence || ''), 'Supply one new absolute evidence directory.');
const destination = join(await realpath(dirname(evidence)), evidence.split(sep).at(-1));
assert(!inside(repo, destination), 'Evidence must be outside the repository (including symlinks).');
await mkdir(destination); // Refuse to overwrite previous evidence; parent must already exist.
const save = (name, value) => writeFile(join(destination, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2));
const hash = async path => createHash('sha256').update(await readFile(path)).digest('hex');
const python = process.env.JOURNEY_PYTHON || 'python3';
const commands = [];
const report = {
  started: new Date().toISOString(), status: 'running', repository: repo, evidence: destination,
  scope: 'Synthetic desktop exporter-to-viewer journey; not whole-product or business-outcome verification.',
  features: ['export-records', 'import-inspect', 'reject-invalid'].map(id => ({ id, status: 'not-run' })),
  limitations: ['One Chromium desktop viewport; no mobile, other browsers, worktree/story modes, or accessibility audit.'],
};
let server, browser, context, page, tracing = false, activeFeature, setup = true;
const consoleMessages = [], pageErrors = [];
function command(executable, args) {
  const result = spawnSync(executable, args, { cwd: repo, encoding: 'utf8', timeout: 30_000, maxBuffer: 4 * 1024 * 1024 });
  const entry = { executable, args, cwd: repo, stdout: result.stdout || '', stderr: result.stderr || '',
    status: result.status, signal: result.signal, error: result.error?.message };
  commands.push(entry);
  assert.equal(entry.status, 0, `${executable} failed: ${entry.error || entry.stderr}`);
  return entry.stdout.trim();
}
function begin(id) {
  activeFeature = report.features.find(feature => feature.id === id);
  activeFeature.status = 'running';
}
function passed(observed) {
  Object.assign(activeFeature, { status: 'passed', observed });
  activeFeature = undefined;
}
async function upload(path) {
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import snapshot', exact: true }).click();
  await (await chooser).setFiles(path);
}
async function assertProject(name, count) {
  await page.locator('.project-name').filter({ hasText: name }).waitFor();
  assert.equal(await page.locator('.project-name').innerText(), name);
  assert.match(await page.locator('.canvas-heading p').innerText(), new RegExp(`^${count} records\\b`));
}
async function inspect(problem) {
  const node = page.locator('.react-flow__node[data-id="PROBLEM-001"]');
  await node.waitFor();
  await node.click();
  const inspector = page.getByRole('complementary', { name: 'Record summary' });
  await inspector.waitFor();
  assert.equal(await inspector.getByRole('heading', { level: 2 }).innerText(), problem.title);
  assert.equal(await inspector.locator('.summary').innerText(), problem.summary);
  return { id: problem.id, title: problem.title, summary: await inspector.locator('.summary').innerText() };
}
try {
  assert(isAbsolute(process.env.PLAYWRIGHT_MODULE || ''), 'PLAYWRIGHT_MODULE must name an absolute installed Playwright module.');
  assert(isAbsolute(process.env.CHROME_PATH || ''), 'CHROME_PATH must name an absolute Chrome executable.');
  report.revision = command('git', ['rev-parse', 'HEAD']);
  report.dirtyPaths = command('git', ['status', '--short', '--untracked-files=all']).split('\n').filter(Boolean);
  report.versions = {
    node: process.version, python: command(python, ['--version']),
    pyyaml: command(python, ['-c', 'import yaml; print(yaml.__version__)']),
    vite: requireApp('vite/package.json').version, react: requireApp('react/package.json').version,
    playwright: createRequire(process.env.PLAYWRIGHT_MODULE)('./package.json').version,
  };
  const inputs = ['scripts/export_workflow.py', 'scripts/validate_knowledge.py',
    'experiments/project-overview/react/src/App.tsx', 'experiments/project-overview/react/src/data.ts',
    'experiments/project-overview/react/src/graph.ts', 'experiments/project-overview/react/src/session.ts',
    'experiments/project-overview/react/vite.config.ts', 'experiments/project-overview/react/package-lock.json', relative(repo, script)];
  report.inputHashes = Object.fromEntries(await Promise.all(inputs.map(async path => [path, await hash(join(repo, path))])));

  begin('export-records');
  setup = false;
  const source = join(destination, 'source');
  await cp(join(repo, 'docs/examples/business-context/baseline-b'), source, { recursive: true });
  const project = `journey-${randomUUID()}`;
  const originalSummary = 'Workers cannot easily identify cafes with the amenities they need.';
  const expectedSummary = `${originalSummary} Imported record marker ${project}.`;
  const delivery = join(source, 'delivery.md');
  const authored = await readFile(delivery, 'utf8');
  assert.equal(authored.match(/^  project: cafe-trial$/gm)?.length, 1, 'Fixture project marker changed.');
  const summaryLine = `    summary: ${originalSummary}`;
  assert.equal(authored.split(summaryLine).length, 2, 'Fixture problem summary marker changed.');
  await writeFile(delivery, authored.replace(/^  project: cafe-trial$/m, `  project: ${project}`)
    .replace(summaryLine, `    summary: ${expectedSummary}`));
  const snapshotPath = join(destination, 'snapshot.json');
  command(python, [join(repo, 'scripts/export_workflow.py'), source, snapshotPath,
    '--project', project, '--baseline', `journey-dirty-preview-${report.revision}`, '--sample']);
  await save('export-command.json', commands.at(-1));
  const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
  const problem = snapshot.records.find(record => record.id === 'PROBLEM-001');
  assert.equal(snapshot.project.name, project);
  assert.equal(snapshot.version, 2);
  assert.equal(snapshot.records.length, 8, 'Expected eight baseline-b records.');
  assert.equal(problem?.summary, expectedSummary);
  assert.equal(snapshot.provenance.complete, true);
  report.snapshot = { file: snapshotPath, sha256: await hash(snapshotPath), schemaVersion: snapshot.version,
    project: snapshot.project, recordCount: snapshot.records.length, problem: { id: problem.id, title: problem.title, summary: problem.summary },
    provenance: snapshot.provenance };
  passed({ project, recordCount: snapshot.records.length, summary: problem.summary });

  begin('import-inspect');
  setup = true;
  const { createServer } = await import(pathToFileURL(requireApp.resolve('vite')).href);
  server = await createServer({ root: app, configFile: join(app, 'vite.config.ts'), configLoader: 'runner',
    cacheDir: join(destination, 'vite-cache'), server: { host: '127.0.0.1', port: 0, strictPort: true, open: false } });
  // Vite 7's server.listen() converts port 0 to 5173; its HTTP server preserves OS assignment.
  await new Promise((resolve, reject) => {
    server.httpServer.once('error', reject);
    server.httpServer.listen(0, '127.0.0.1', resolve);
  });
  const address = server.httpServer.address();
  assert(address && typeof address !== 'string' && address.port !== 5173, 'Expected own ephemeral HTTP port.');
  report.url = `http://127.0.0.1:${address.port}`;
  const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true, timeout: 30_000 });
  report.versions.browser = browser.version();
  context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  context.setDefaultTimeout(15_000);
  context.setDefaultNavigationTimeout(30_000);
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  tracing = true;
  page = await context.newPage();
  page.on('console', message => consoleMessages.push({ type: message.type(), text: message.text() }));
  page.on('pageerror', error => pageErrors.push(error.message));
  setup = false;
  await page.goto(report.url, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Import snapshot', exact: true }).waitFor();
  report.initialProject = await page.locator('.project-name').innerText();
  assert.notEqual(report.initialProject, project, 'Unique import must differ from the bundled sample.');
  await upload(snapshotPath);
  await assertProject(project, snapshot.records.length);
  const inspected = await inspect(problem);
  await page.screenshot({ path: join(destination, 'import-inspect.png'), fullPage: true });
  passed(inspected);

  begin('reject-invalid');
  const invalidPath = join(destination, 'malformed.json');
  await writeFile(invalidPath, '{ "version": ');
  await upload(invalidPath);
  const alert = page.getByRole('alert');
  await alert.waitFor();
  const error = await alert.innerText();
  assert(error.trim().length > 0, 'Malformed input must display an error.');
  await assertProject(project, snapshot.records.length);
  await page.screenshot({ path: join(destination, 'reject-invalid-alert.png'), fullPage: true });
  const retained = await inspect(problem);
  // Opening a node dismisses the error; preserve its observed text separately.
  await page.screenshot({ path: join(destination, 'reject-invalid-retained.png'), fullPage: true });
  assert.deepEqual(pageErrors, [], 'Unexpected browser runtime errors.');
  passed({ error, retainedProject: project, retainedRecordCount: snapshot.records.length, retained });
  report.status = 'passed';
} catch (error) {
  report.status = setup ? 'incomplete' : 'failed';
  report.failure = { feature: activeFeature?.id || 'preflight', setup, message: error.message, stack: error.stack };
  if (activeFeature) activeFeature.status = report.status;
  process.exitCode = 1;
  if (page) await page.screenshot({ path: join(destination, 'failure.png'), fullPage: true, timeout: 5000 }).catch(() => {});
} finally {
  report.cleanupErrors = [];
  for (const [name, close] of [
    ['trace', async () => { if (tracing) await context.tracing.stop({ path: join(destination, 'trace.zip') }); }],
    ['context', async () => context?.close()],
    ['browser', async () => { if (browser) { await browser.close(); assert(!browser.isConnected()); report.browserClosed = true; } }],
    ['server', async () => {
      if (!server) return;
      await server.close();
      if (!report.url) return;
      await new Promise((resolve, reject) => {
        const socket = createConnection({ host: '127.0.0.1', port: Number(new URL(report.url).port) });
        socket.setTimeout(1000);
        socket.once('connect', () => { socket.destroy(); reject(new Error('Owned HTTP port still accepts connections.')); });
        socket.once('timeout', () => { socket.destroy(); reject(new Error('HTTP cleanup probe timed out.')); });
        socket.once('error', error => error.code === 'ECONNREFUSED' ? resolve() : reject(error));
      });
      report.serverClosed = true;
    }], ['cache', async () => rm(join(destination, 'vite-cache'), { recursive: true, force: true })],
  ]) {
    try { await close(); } catch (error) { report.cleanupErrors.push({ name, message: error.message }); }
  }
  if (report.cleanupErrors.length) { report.status = 'failed'; process.exitCode = 1; }
  report.finished = new Date().toISOString();
  await save('commands.json', commands);
  await save('browser-log.json', { consoleMessages, pageErrors });
  await save('summary.json', report);
  console.log(`${report.status}: ${join(destination, 'summary.json')}`);
}
