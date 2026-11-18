import {chromium,expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';

const baseURL=process.env.BASE_URL||'http://127.0.0.1:5181';
const evidence='evidence/shortlist';
await mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
const results=[];
const key='sidequest-shortlist-v1';
async function discover(page) {
  await page.getByRole('button',{name:'Find a café',exact:false}).click();
  await expect(page.locator('.cafe-row')).toHaveCount(6);
}
async function save(page,name) {
  await page.locator('.cafe-row').filter({hasText:name}).click();
  await page.getByRole('button',{name:'Save to shortlist',exact:true}).click();
  await expect(page.getByRole('button',{name:'Saved to shortlist'})).toBeVisible();
}
async function close(page) {
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
}
async function noOverflow(page) {
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}
try {
  for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce'});
    await context.tracing.start({screenshots:true,snapshots:true});
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(baseURL);
    await page.getByRole('button',{name:'Shortlist (0/3)',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Your shortlist.'})).toBeFocused();
    await expect(page.getByRole('heading',{name:'Your next cup is out there.'})).toBeVisible();
    await page.getByRole('button',{name:'Discover cafés',exact:false}).click();
    await expect(page.locator('.cafe-row')).toHaveCount(6);
    // Enter details with keyboard and retain focus on closing.
    await page.locator('.cafe-row').first().focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button',{name:'Save to shortlist',exact:true}).focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button',{name:'Saved to shortlist'})).toHaveAttribute('aria-disabled','true');
    await close(page);
    await expect(page.locator('.cafe-row').first()).toBeFocused();
    await save(page,'Apartment Coffee');await close(page);
    await save(page,'Tiong Hoe');await close(page);
    await page.locator('.cafe-row').filter({hasText:'Alchemist · The Mill'}).click();
    await page.getByRole('button',{name:'Save to shortlist',exact:true}).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Your shortlist is full (3 of 3). Remove a café to make room.',{exact:true})).toBeVisible();
    await noOverflow(page);
    await page.screenshot({path:`${evidence}/capacity-${width}.png`});
    await page.getByRole('button',{name:'View shortlist'}).click();
    await expect(page.getByRole('heading',{name:'Your shortlist.'})).toBeFocused();
    await expect(page.locator('.shortlist-card')).toHaveCount(3);
    const nylon=page.getByRole('article',{name:'Nylon Coffee'});
    await expect(nylon).toContainText('Everton Park');
    await expect(nylon).toContainText('Seasonal coffees');
    await expect(nylon).toContainText('Filter / Espresso / Milk coffee');
    await expect(nylon).toContainText('4 Everton Park #01-40, Singapore 080004');
    expect(new URL(await nylon.getByRole('link').getAttribute('href')).searchParams.get('query')).toBe('Nylon Coffee 4 Everton Park #01-40, Singapore 080004');
    await noOverflow(page);
    await page.screenshot({path:`${evidence}/comparison-${width}.png`,fullPage:true});
    await page.getByRole('button',{name:'Remove Apartment Coffee',exact:true}).click();
    await expect(page.getByRole('button',{name:'Remove Tiong Hoe',exact:true})).toBeFocused();
    await page.getByRole('button',{name:'Discover more cafés'}).click();
    await save(page,'Alchemist · The Mill');await close(page);
    await page.reload();
    await page.getByRole('button',{name:'Shortlist (3/3)',exact:true}).click();
    await expect(page.getByRole('article',{name:'Alchemist · The Mill'})).toBeVisible();
    expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key)).toEqual(['nylon','tionghoe','mill']);
    for(const name of ['Nylon Coffee','Tiong Hoe','Alchemist · The Mill']) await page.getByRole('button',{name:`Remove ${name}`,exact:true}).click();
    await expect(page.getByRole('heading',{name:'Your shortlist.'})).toBeFocused();
    await page.getByRole('button',{name:'Discover cafés',exact:false}).click();
    // Existing search and story stay usable; save via a story result too.
    await page.getByRole('searchbox',{name:'Search cafés'}).fill('Apartment');
    await page.getByRole('combobox',{name:'Neighbourhood'}).selectOption('Selegie');
    await page.getByRole('button',{name:'Espresso',exact:true}).click();
    await expect(page.getByRole('heading',{name:'No cups on this corner.'})).toBeVisible();
    await page.getByRole('button',{name:'Reset filters'}).click();
    await page.getByRole('button',{name:'Your café story'}).click();
    await page.getByRole('button',{name:'Step inside'}).click();
    for(const choice of ['A quiet corner','Espresso','Save them a seat','Stay until golden hour']) {
      await page.getByRole('button',{name:choice,exact:false}).click();
      await page.getByRole('button',{name:choice==='Stay until golden hour'?'Find my cafés':'Continue',exact:false}).click();
    }
    await expect(page.locator('.picks button')).toHaveCount(3);
    await page.locator('.picks button').first().click();
    await page.getByRole('button',{name:'Save to shortlist',exact:true}).click();
    await page.getByRole('button',{name:'View shortlist'}).click();
    await expect(page.locator('.shortlist-card')).toHaveCount(1);
    await page.getByRole('button',{name:'Find a café',exact:false}).click();
    await page.getByRole('button',{name:'Your café story'}).click();
    await page.getByRole('button',{name:'Change my choices'}).click();
    await expect(page.getByRole('button',{name:'A quiet corner',exact:false})).toHaveAttribute('aria-pressed','true');
    await noOverflow(page);
    results.push({width,journeys:'empty, discovery, keyboard save, duplicate, capacity, comparison facts/directions, remove/focus, replace, refresh, search filters, story save and edit',status:'passed'});
    await context.tracing.stop({path:`${evidence}/journey-${width}.zip`});
    await context.close();
    console.log(`PASS ${width}px journey`);
  }
  for(const [label,raw,expected] of [['malformed','{',[]],['invalid-shape','{}',[]],['sanitize','["unknown","nylon","nylon",null,"apartment","mill","funan"]',['nylon','apartment','mill']]]) {
    const page=await browser.newPage();
    await page.goto(baseURL);
    await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
    await page.reload();
    await page.getByRole('button',{name:`Shortlist (${expected.length}/3)`,exact:true}).click();
    await expect(page.locator('.shortlist-card')).toHaveCount(expected.length);
    expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key)).toEqual(expected);
    results.push({journey:label,status:'passed'});await page.close();
  }
  for(const failure of ['read','write']) {
    const page=await browser.newPage({viewport:{width:390,height:844}});
    await page.addInitScript(failure=>{
      if(failure==='read') Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});
      else Storage.prototype.setItem=function(){throw new Error('quota');};
    },failure);
    await page.goto(baseURL);await discover(page);await save(page,'Nylon Coffee');
    await expect(page.getByText('Saving across refresh is unavailable.',{exact:false})).toBeVisible();
    await page.screenshot({path:`${evidence}/storage-${failure}.png`});
    await page.getByRole('button',{name:'View shortlist'}).click();
    await expect(page.locator('.shortlist-card')).toHaveCount(1);
    await page.getByRole('button',{name:'Remove Nylon Coffee',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Your next cup is out there.'})).toBeVisible();
    results.push({journey:`storage-${failure}-failure`,status:'passed'});await page.close();
  }
  expect(errors).toEqual([]);
  await writeFile(`${evidence}/observations.json`,JSON.stringify({date:new Date().toISOString(),baseURL,browser:await browser.version(),results,errors,limits:'Headless local Chrome with SwiftShader. No physical-device, Safari/Firefox, cross-tab sync or user-acceptance claim.'},null,2));
  console.log('PASS shortlist journeys: desktop/mobile, story/search, corruption, read/write failures, focus and overflow.');
} finally {
  await browser.close();
}
