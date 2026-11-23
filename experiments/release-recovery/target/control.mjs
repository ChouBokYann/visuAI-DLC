import path from 'node:path';
import {install} from './runtime.mjs';
const [bundle,operation,mode]=process.argv.slice(2);
if(!bundle||!operation||!['install','recover'].includes(mode))throw Error('Usage: node target/control.mjs BUNDLE OPERATION install|recover');
console.log(JSON.stringify(install(path.resolve(import.meta.dirname,'state'),path.resolve(bundle),operation,{recover:mode==='recover'})));
