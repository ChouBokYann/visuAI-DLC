import {chromium, expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';

const baseURL = 'http://127.0.0.1:5191/';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const key = 'sidequest-shortlist-v1';
const attempt = process.argv[2];
if (!/^[a-z0-9][a-z0-9-]*$/.test(attempt ?? '')) {
  throw new Error('Pass a fresh reviewer attempt name, such as seed-01.');
}

const evidence = new URL('../evidence/reviewer/', import.meta.url);
const output = new URL(attempt + '/', evidence);
await mkdir(evidence, {recursive: true});
await mkdir(output);

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function sourceHashes() {
  const files = ['src/shortlist.ts', 'src/shortlist.test.ts', 'src/App.tsx', 'src/ShortlistView.tsx', 'last-removal-browser-test.mjs'];
  return Object.fromEntries(await Promise.all(files.map(async file => [
    file, sha256(await readFile(new URL(file, import.meta.url))),
  ])));
}

const report = {
  attempt,
  started: new Date().toISOString(),
  baseURL,
  node: process.version,
  chrome,
  scenarios: [],
  cleanup: {browserClosed: false},
};

const emptyHeading = page => page.getByRole('heading', {name: 'Your next cup is out there.', exact: true});
const emptyAction = page => page.getByRole('button', {name: 'Discover cafés', exact: false});
const shortlistNav = page => page.getByRole('button', {name: /^Shortlist \(\d\/3\)$/});
const cards = page => page.locator('.shortlist-card');

async function searchAndSave(page, query, name) {
  await page.getByRole('button', {name: 'Find a café', exact: false}).click();
  await page.getByRole('searchbox', {name: 'Search cafés'}).fill(query);
  await page.getByRole('button', {name: new RegExp(name)}).click();
  const details = page.getByRole('dialog', {name});
  await details.getByRole('button', {name: 'Save to shortlist', exact: true}).click();
  await expect(details.getByRole('button', {name: 'Saved to shortlist ✓', exact: true})).toBeVisible();
  await details.getByRole('button', {name: 'View shortlist', exact: false}).click();
}

async function openShortlist(page) {
  await shortlistNav(page).click();
  await expect(page.getByRole('heading', {name: 'Your shortlist.', exact: true})).toBeVisible();
}

async function stored(page) {
  const raw = await page.evaluate(storageKey => localStorage.getItem(storageKey), key);
  return {raw, ids: JSON.parse(raw)};
}

async function observe(page) {
  return {
    cardCount: await cards(page).count(),
    savedNames: await cards(page).getByRole('heading').allTextContents(),
    navLabel: await shortlistNav(page).textContent(),
    emptyHeadingVisible: await emptyHeading(page).isVisible(),
    emptyActionVisible: await emptyAction(page).isVisible(),
  };
}

function check(scenario, label, actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  scenario.checks.push({label, expected, actual, passed});
  console.log(`${passed ? 'PASS' : 'FAIL'} ${scenario.name}: ${label}; expected ${JSON.stringify(expected)}; observed ${JSON.stringify(actual)}`);
}

async function primary(page, scenario) {
  const source = page.waitForResponse(response => new URL(response.url()).pathname === '/src/shortlist.ts');
  await page.goto(baseURL);
  const loadedModule = await source;
  if (!loadedModule.ok()) throw new Error(`Shortlist module load returned ${loadedModule.status()}`);
  scenario.servedModule = {url: loadedModule.url(), sha256: sha256(await loadedModule.body())};

  await expect(shortlistNav(page)).toHaveText('Shortlist (0/3)');
  await searchAndSave(page, 'Nylon', 'Nylon Coffee');
  await expect(page.getByRole('article', {name: 'Nylon Coffee', exact: true})).toBeVisible();
  await expect.poll(async () => (await stored(page)).ids).toEqual(['nylon']);
  scenario.afterSave = await stored(page);
  await page.getByRole('button', {name: 'Remove Nylon Coffee', exact: true}).click();
  await expect(shortlistNav(page)).toHaveText('Shortlist (0/3)');
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  scenario.afterRemove = {...await observe(page), storage: await stored(page)};
  check(scenario, 'immediate rendered cards', scenario.afterRemove.cardCount, 0);
  check(scenario, 'immediate empty-state heading', scenario.afterRemove.emptyHeadingVisible, true);
  check(scenario, 'immediately stored IDs', scenario.afterRemove.storage.ids, []);
  await page.screenshot({path: new URL(scenario.name + '-after-remove.png', output).pathname});

  await page.reload();
  await openShortlist(page);
  scenario.afterReload = {...await observe(page), storage: await stored(page)};
  check(scenario, 'post-reload navigation count', scenario.afterReload.navLabel, 'Shortlist (0/3)');
  check(scenario, 'post-reload rendered cards', scenario.afterReload.cardCount, 0);
  check(scenario, 'post-reload empty-state heading', scenario.afterReload.emptyHeadingVisible, true);
  check(scenario, 'post-reload discovery action', scenario.afterReload.emptyActionVisible, true);
  await page.screenshot({path: new URL(scenario.name + '-after-reload.png', output).pathname});
}

async function afterRender(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function reloadShortlist(page) {
  await page.reload();
  await openShortlist(page);
  await afterRender(page);
}

async function removeCafe(page, name) {
  await page.getByRole('button', {name: 'Remove ' + name, exact: true}).click();
  await afterRender(page);
}

async function replace(page, scenario) {
  await page.goto(baseURL);
  await searchAndSave(page, 'Nylon', 'Nylon Coffee');
  await searchAndSave(page, 'Apartment', 'Apartment Coffee');
  await afterRender(page);
  scenario.beforeRemoval = {...await observe(page), storage: await stored(page)};
  check(scenario, 'both cafés saved in order', scenario.beforeRemoval.savedNames, ['Nylon Coffee', 'Apartment Coffee']);
  check(scenario, 'both IDs stored', scenario.beforeRemoval.storage.ids, ['nylon', 'apartment']);

  await removeCafe(page, 'Nylon Coffee');
  await reloadShortlist(page);
  scenario.afterPartialReload = {...await observe(page), storage: await stored(page)};
  check(scenario, 'remaining café after reload', scenario.afterPartialReload.savedNames, ['Apartment Coffee']);
  check(scenario, 'remaining navigation count', scenario.afterPartialReload.navLabel, 'Shortlist (1/3)');
  check(scenario, 'only remaining ID stored', scenario.afterPartialReload.storage.ids, ['apartment']);

  await removeCafe(page, 'Apartment Coffee');
  scenario.afterFinalRemoval = {...await observe(page), storage: await stored(page)};
  check(scenario, 'clearing the remaining café empties the view', scenario.afterFinalRemoval.cardCount, 0);
  check(scenario, 'clearing the remaining café empties storage', scenario.afterFinalRemoval.storage.ids, []);

  await searchAndSave(page, 'The Mill', 'Alchemist · The Mill');
  await reloadShortlist(page);
  scenario.afterReplacementReload = {...await observe(page), storage: await stored(page)};
  check(scenario, 'only the replacement survives reload', scenario.afterReplacementReload.savedNames, ['Alchemist · The Mill']);
  check(scenario, 'replacement navigation count', scenario.afterReplacementReload.navLabel, 'Shortlist (1/3)');
  check(scenario, 'only the replacement ID persists', scenario.afterReplacementReload.storage.ids, ['mill']);
  await page.screenshot({path: new URL(scenario.name + '.png', output).pathname});
}

const warningCopy = 'Saving across refresh is unavailable. Your shortlist still works for this visit.';

async function blockedStorage(page, scenario, fault) {
  await page.addInitScript(({fault, key}) => {
    if (fault === 'access') {
      Object.defineProperty(window, 'localStorage', {
        get() { throw new DOMException('Storage access blocked for review', 'SecurityError'); },
      });
    } else {
      const setItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (storageKey, value) {
        if (storageKey === key) throw new DOMException('Storage write blocked for review', 'QuotaExceededError');
        return setItem.call(this, storageKey, value);
      };
    }
  }, {fault, key});
  const warning = page.getByText(warningCopy, {exact: true});
  await page.goto(baseURL);
  await openShortlist(page);
  await afterRender(page);
  scenario.initialWarning = await warning.isVisible();
  check(scenario, 'unavailable persistence is stated on an empty shortlist', scenario.initialWarning, true);

  await searchAndSave(page, 'Nylon', 'Nylon Coffee');
  await afterRender(page);
  scenario.afterSave = {...await observe(page), warningVisible: await warning.isVisible()};
  check(scenario, 'Nylon can be saved for the visit', scenario.afterSave.savedNames, ['Nylon Coffee']);
  check(scenario, 'unavailable persistence is stated after saving', scenario.afterSave.warningVisible, true);

  await removeCafe(page, 'Nylon Coffee');
  scenario.afterRemove = {...await observe(page), warningVisible: await warning.isVisible()};
  check(scenario, 'Nylon can be removed for the visit', scenario.afterRemove.cardCount, 0);
  check(scenario, 'discovery action remains usable after removing', scenario.afterRemove.emptyActionVisible, true);
  check(scenario, 'unavailable persistence remains stated after last removal', scenario.afterRemove.warningVisible, true);
  await page.screenshot({path: new URL(scenario.name + '.png', output).pathname});

  await emptyAction(page).click();
  await page.getByRole('searchbox', {name: 'Search cafés'}).fill('Apartment');
  await page.getByRole('button', {name: /Apartment Coffee/}).click();
  const details = page.getByRole('dialog', {name: 'Apartment Coffee'});
  check(scenario, 'detail dialog states the unavailable persistence', await details.getByText(warningCopy, {exact: true}).isVisible(), true);
  await details.getByRole('button', {name: 'Save to shortlist', exact: true}).click();
  await details.getByRole('button', {name: 'View shortlist', exact: false}).click();
  await afterRender(page);
  scenario.afterReplacement = {...await observe(page), warningVisible: await warning.isVisible()};
  check(scenario, 'replacement can be saved for the visit', scenario.afterReplacement.savedNames, ['Apartment Coffee']);
  if (fault === 'write') {
    scenario.afterReplacement.storage = await stored(page);
    check(scenario, 'blocked write did not persist a selection', scenario.afterReplacement.storage.raw, null);
  }

  await reloadShortlist(page);
  scenario.afterReload = {...await observe(page), warningVisible: await warning.isVisible()};
  check(scenario, 'session-only selection is absent after reload', scenario.afterReload.cardCount, 0);
  check(scenario, 'unavailable persistence is still stated after reload', scenario.afterReload.warningVisible, true);
}

async function malformedStorage(page, scenario, raw, ids, names) {
  await page.goto(baseURL);
  await afterRender(page);
  await page.evaluate(({key, raw}) => localStorage.setItem(key, raw), {key, raw});
  scenario.injectedStorage = await page.evaluate(storageKey => localStorage.getItem(storageKey), key);
  check(scenario, 'fixture was stored before reload', scenario.injectedStorage, raw);

  await reloadShortlist(page);
  scenario.afterReload = {...await observe(page), storage: await stored(page)};
  check(scenario, 'expected navigation count', scenario.afterReload.navLabel, 'Shortlist (' + ids.length + '/3)');
  check(scenario, 'only valid cafés render in order', scenario.afterReload.savedNames, names);
  check(scenario, 'persisted IDs are normalized', scenario.afterReload.storage.ids, ids);
  check(scenario, 'empty heading matches the recovered selection', scenario.afterReload.emptyHeadingVisible, ids.length === 0);
  await page.screenshot({path: new URL(scenario.name + '.png', output).pathname});
}

async function runScenario(browser, viewport, name, journey) {
  const scenario = {
    name,
    viewport,
    checks: [],
    console: [],
    pageErrors: [],
  };
  report.scenarios.push(scenario);
  let context;
  try {
    context = await browser.newContext({viewport, reducedMotion: 'reduce'});
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on('console', message => {
      if (['warning', 'error'].includes(message.type())) {
        scenario.console.push({type: message.type(), text: message.text()});
      }
    });
    page.on('pageerror', error => scenario.pageErrors.push(error.message));
    await journey(page, scenario);
    check(scenario, 'uncaught page errors', scenario.pageErrors, []);
  } catch (error) {
    scenario.setupError = String(error.stack ?? error);
    console.error(`SETUP ${scenario.name}: ${scenario.setupError}`);
  } finally {
    if (context) await context.close();
    scenario.contextClosed = context ? browser.contexts().indexOf(context) === -1 : null;
  }
}

let browser;
try {
  report.sourceBefore = await sourceHashes();
  browser = await chromium.launch({
    headless: true,
    executablePath: chrome,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  report.browserVersion = browser.version();
  for (const viewport of [{width: 1440, height: 1000}, {width: 390, height: 844}]) {
    await runScenario(browser, viewport, `last-removal-${viewport.width}x${viewport.height}`, primary);
  }
  if (process.argv.includes('--extended')) {
    const desktop = {width: 1440, height: 1000};
    const mobile = {width: 390, height: 844};
    await runScenario(browser, desktop, 'two-items-clear-and-replace', replace);
    for (const fault of ['access', 'write']) {
      await runScenario(browser, mobile, 'storage-blocked-' + fault, (page, scenario) => blockedStorage(page, scenario, fault));
    }
    const fixtures = [
      ['malformed-json', '{', [], []],
      ['invalid-shape', '{}', [], []],
      ['mixed-ids', '["unknown","nylon","nylon",null,"apartment","mill","funan"]',
        ['nylon', 'apartment', 'mill'], ['Nylon Coffee', 'Apartment Coffee', 'Alchemist · The Mill']],
    ];
    for (const [label, raw, ids, names] of fixtures) {
      await runScenario(browser, mobile, label, (page, scenario) => malformedStorage(page, scenario, raw, ids, names));
    }
  }
  report.sourceAfter = await sourceHashes();
  if (JSON.stringify(report.sourceBefore) !== JSON.stringify(report.sourceAfter)) {
    throw new Error('Reviewed source changed during the browser run.');
  }
} catch (error) {
  report.setupError = String(error.stack ?? error);
  console.error(`SETUP: ${report.setupError}`);
} finally {
  if (browser) {
    try {
      await browser.close();
      report.cleanup.browserClosed = !browser.isConnected();
    } catch (error) {
      report.cleanup.error = String(error.stack ?? error);
    }
  }
  const setupFailed = report.setupError || !report.cleanup.browserClosed ||
    report.scenarios.some(scenario => scenario.setupError || !scenario.contextClosed);
  const behaviorFailed = report.scenarios.some(scenario => scenario.checks.some(check => !check.passed));
  report.exitCode = setupFailed ? 2 : behaviorFailed ? 1 : 0;
  report.finished = new Date().toISOString();
  await writeFile(new URL('observations.json', output), JSON.stringify(report, null, 2) + '\n');
  process.exitCode = report.exitCode;
}
