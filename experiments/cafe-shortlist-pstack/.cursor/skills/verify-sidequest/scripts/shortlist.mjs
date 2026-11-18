#!/usr/bin/env node
import {chromium, expect} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5182';
const evidence = resolve(process.env.EVIDENCE_DIR || 'evidence/shortlist');
const storageKey = 'sidequest-v2-shortlist';
await mkdir(evidence, {recursive: true});
const observations = {startedAt: new Date().toISOString(), baseURL, journeys: [], errors: []};
const browser = await chromium.launch({headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
const stored = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), storageKey);
async function fits(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const dialog = page.getByRole('dialog');
  if (await dialog.count()) expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
}
async function search(page) { await page.getByRole('button', {name: 'Find a café', exact: false}).click(); }
async function details(page, name) { await page.getByRole('button', {name, exact: false}).filter({has: page.locator('strong')}).click(); }
async function save(page, name) {
  await details(page, name);
  await page.getByRole('button', {name: 'Save to shortlist', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Saved to shortlist', exact: false})).toBeDisabled();
  await page.keyboard.press('Escape');
}
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({viewport: {width, height: width === 390 ? 844 : 1000}, reducedMotion: 'reduce'});
    await context.tracing.start({screenshots: true, snapshots: true});
    try {
      const page = await context.newPage();
      page.on('pageerror', error => observations.errors.push(error.message));
      await page.goto(baseURL);
      await expect(page.getByRole('button', {name: 'Shortlist (0/3)', exact: true})).toBeVisible();
      await page.getByRole('button', {name: 'Shortlist (0/3)', exact: true}).focus();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('heading', {name: 'Your shortlist', exact: true})).toBeVisible();
      await fits(page);
      await page.screenshot({path: `${evidence}/empty-${width}.png`});
      await page.getByRole('button', {name: 'Discover cafés', exact: false}).click();
      await expect(page.locator('.cafe-row')).toHaveCount(6);
      await save(page, 'Nylon Coffee');
      await expect(page.locator('.cafe-row').first()).toBeFocused();
      await save(page, 'Apartment Coffee');
      await save(page, 'Tiong Hoe');
      await expect.poll(() => stored(page)).toEqual(['nylon', 'apartment', 'tionghoe']);
      await details(page, 'Nylon Coffee');
      await expect(page.getByRole('button', {name: 'Saved to shortlist', exact: false})).toBeDisabled();
      await page.keyboard.press('Escape');
      await details(page, 'Alchemist · The Mill');
      await expect(page.getByRole('button', {name: 'Shortlist full', exact: true})).toBeDisabled();
      await expect(page.getByText('Your three places are saved.', {exact: false})).toBeVisible();
      await fits(page);
      await page.screenshot({path: `${evidence}/capacity-${width}.png`});
      await page.getByRole('button', {name: 'View shortlist', exact: false}).click();
      await expect(page.getByRole('article')).toHaveCount(3);
      const expected = [
        ['Nylon Coffee', 'Everton Park', '4 Everton Park #01-40, Singapore 080004', 'Seasonal coffees, with espresso and filter roast selections.', 'Filter · Espresso · Milk coffee'],
        ['Apartment Coffee', 'Selegie', '139 Selegie Road, Singapore 188309', 'A coffee studio with an emphasis on origin stories and pour-over exploration.', 'Filter'],
        ['Tiong Hoe', 'Queenstown', '170 Stirling Road #01-1133, Singapore 140170', 'A Singapore roaster with beans and coffee beverages at its Stirling Road store.', 'Espresso · Milk coffee · Filter'],
      ];
      for (const [name, area, address, coffee, brews] of expected) {
        const card = page.getByRole('article', {name, exact: true});
        for (const text of [area, address, coffee, brews]) await expect(card.getByText(text, {exact: true})).toBeVisible();
        const href = await card.getByRole('link', {name: `Directions to ${name}`}).getAttribute('href');
        expect(new URL(href).searchParams.get('query')).toBe(`${name} ${address}`);
      }
      await fits(page);
      await page.getByRole('heading', {name: 'Your shortlist', exact: true}).scrollIntoViewIfNeeded();
      await page.screenshot({path: `${evidence}/compare-${width}.png`});
      await page.getByRole('button', {name: 'Remove Apartment Coffee', exact: true}).click();
      await expect(page.getByRole('button', {name: 'Remove Tiong Hoe', exact: true})).toBeFocused();
      await page.getByRole('button', {name: 'Find another café', exact: false}).click();
      await save(page, 'Alchemist · The Mill');
      await expect.poll(() => stored(page)).toEqual(['nylon', 'tionghoe', 'mill']);
      await page.reload();
      await page.getByRole('button', {name: 'Shortlist (3/3)', exact: true}).click();
      await expect(page.getByRole('article')).toHaveCount(3);
      await expect(page.getByRole('article', {name: 'Alchemist · The Mill', exact: true})).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', {name: 'Shortlist (3/3)', exact: true})).toBeFocused();
      await page.getByRole('button', {name: 'Shortlist (3/3)', exact: true}).click();
      for (const name of ['Nylon Coffee', 'Tiong Hoe', 'Alchemist · The Mill']) await page.getByRole('button', {name: `Remove ${name}`, exact: true}).click();
      await expect(page.getByRole('button', {name: 'Discover cafés', exact: false})).toBeFocused();
      await expect.poll(() => stored(page)).toEqual([]);
      await page.keyboard.press('Escape');
      await page.getByRole('button', {name: 'Step inside', exact: false}).click();
      for (const [index, name] of ['A quiet corner', 'Espresso', 'Save them a seat', 'Stay until golden hour'].entries()) {
        await page.getByRole('button', {name, exact: false}).click();
        await page.getByRole('button', {name: index === 3 ? 'Find my cafés' : 'Continue', exact: false}).click();
      }
      await expect(page.locator('.picks button')).toHaveCount(3);
      const firstPick = page.locator('.picks button').first();
      await firstPick.click();
      const storyCafe = await page.locator('#detail-title').innerText();
      await page.getByRole('button', {name: 'Save to shortlist', exact: true}).click();
      await page.getByRole('button', {name: 'View shortlist', exact: false}).click();
      await expect(page.getByRole('article', {name: storyCafe, exact: true})).toBeVisible();
      await fits(page);
      await page.keyboard.press('Escape');
      await expect(firstPick).toBeFocused();
      await search(page);
      await details(page, storyCafe);
      await expect(page.getByRole('button', {name: 'Saved to shortlist', exact: false})).toBeDisabled();
      expect(await stored(page)).toHaveLength(1);
      observations.journeys.push({width, result: 'passed', paths: 'empty, search save, duplicate, capacity, comparison facts/maps, removal, replacement, refresh, story save, cross-path duplicate, keyboard focus, overflow'});
    } finally {
      await context.tracing.stop({path: `${evidence}/trace-${width}.zip`});
      await context.close();
    }
  }
  for (const [name, raw, ids] of [
    ['malformed', '{not json', []], ['wrong-shape', '{"ids":["nylon"]}', []],
    ['normalized', '["old","nylon","nylon",null,"apartment","mill","funan"]', ['nylon', 'apartment', 'mill']],
  ]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(({key, raw}) => localStorage.setItem(key, raw), {key: storageKey, raw});
    await page.goto(baseURL);
    await expect(page.getByRole('button', {name: `Shortlist (${ids.length}/3)`, exact: true})).toBeVisible();
    await expect.poll(() => stored(page)).toEqual(ids);
    await page.getByRole('button', {name: `Shortlist (${ids.length}/3)`, exact: true}).click();
    await expect(page.getByRole('article')).toHaveCount(ids.length);
    observations.journeys.push({case: name, result: 'passed', stored: await stored(page)});
    await context.close();
  }
  for (const failure of ['access', 'write']) {
    const context = await browser.newContext({viewport: {width: 390, height: 844}});
    const page = await context.newPage();
    await page.addInitScript(({failure, key}) => {
      if (failure === 'access') Object.defineProperty(window, 'localStorage', {get() {throw new DOMException('Denied', 'SecurityError');}});
      else { localStorage.setItem(key, '["nylon"]'); Storage.prototype.setItem = function() {throw new DOMException('Full', 'QuotaExceededError');}; }
    }, {failure, key: storageKey});
    await page.goto(baseURL);
    await expect(page.getByText('Saving on this device is unavailable.', {exact: false})).toBeVisible();
    await page.getByRole('button', {name: 'Step inside', exact: false}).click();
    await page.getByRole('button', {name: 'A quiet corner', exact: false}).click();
    await expect(page.getByRole('button', {name: 'Continue', exact: false})).toBeEnabled();
    const warning = await page.locator('.persistence-banner').boundingBox();
    const navigation = await page.locator('header').boundingBox();
    expect(navigation.y).toBeGreaterThanOrEqual(warning.y + warning.height);
    await fits(page);
    await page.screenshot({path: `${evidence}/storage-${failure}-story.png`});
    await search(page);
    await save(page, 'Apartment Coffee');
    await page.getByRole('button', {name: `Shortlist (${failure === 'access' ? 1 : 2}/3)`, exact: true}).click();
    await expect(page.getByRole('article', {name: 'Apartment Coffee', exact: true})).toBeVisible();
    await expect(page.getByText('Saving on this device is unavailable.', {exact: false})).toBeVisible();
    await page.getByRole('button', {name: 'Remove Apartment Coffee', exact: true}).click();
    await expect(page.getByRole('article')).toHaveCount(failure === 'access' ? 0 : 1);
    await fits(page);
    await page.screenshot({path: `${evidence}/storage-${failure}.png`});
    observations.journeys.push({case: `${failure}-denied`, result: 'passed', session: 'save and removal remain usable; warning visible'});
    await context.close();
  }
  expect(observations.errors).toEqual([]);
  observations.status = 'passed';
  console.log('PASS shortlist: desktop/mobile controls, story/search, capacity/replacement, refresh, storage normalization/failures, focus, overflow, curated facts/directions.');
} catch (error) {
  observations.status = 'failed';
  observations.failure = String(error.stack || error);
  throw error;
} finally {
  observations.finishedAt = new Date().toISOString();
  await writeFile(`${evidence}/observations.json`, JSON.stringify(observations, null, 2));
  await browser.close();
}
