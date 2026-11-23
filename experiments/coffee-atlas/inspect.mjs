import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const out=new URL('../../output/coffee-atlas/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
try{const page=await browser.newPage({viewport:{width:1440,height:1050}});page.on('pageerror',e=>console.error(e));await page.goto('http://127.0.0.1:17820/?origin=ethiopia');await page.getByRole('heading',{name:'Ethiopia',exact:true}).waitFor();await page.screenshot({path:new URL('first-desktop.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:new URL('first-mobile.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});console.log('Captured first desktop/mobile journey');}finally{await browser.close();}
