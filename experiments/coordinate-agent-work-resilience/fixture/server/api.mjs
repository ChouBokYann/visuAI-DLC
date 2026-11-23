import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';
export function createApp(){return createServer((_req,res)=>{res.writeHead(501,{'Content-Type':'application/json'});res.end(JSON.stringify({error:{code:'NOT_IMPLEMENTED',message:'Prepared fixture; implement C1 shortlist routes'}}));});}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) createApp().listen(Number(process.env.API_PORT||5192),'127.0.0.1',()=>console.log('Owned E06 API ready'));
