import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const knownIds=new Set(JSON.parse(readFileSync(new URL('./catalog.json',import.meta.url),'utf8')));
export function createApp(){
 let ids=[];
 return createServer(async(req,res)=>{
  const send=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(body));};
  const error=(status,code,message)=>send(status,{error:{code,message}});
  if(req.url!=='/api/shortlist')return error(404,'NOT_FOUND','Unknown route');
  if(req.method==='GET')return send(200,{schemaVersion:1,ids});
  if(req.method!=='PUT')return error(405,'METHOD_NOT_ALLOWED','Use GET or PUT');
  let body;
  try{const chunks=[];for await(const chunk of req)chunks.push(chunk);body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}
  catch{return error(400,'INVALID_JSON','Request body must be valid JSON');}
  if(body?.schemaVersion!==1)return error(409,'CONTRACT_VERSION_MISMATCH','schemaVersion must be 1');
  if(Object.keys(body).length!==2||!Array.isArray(body.ids)||body.ids.length>3||new Set(body.ids).size!==body.ids.length||body.ids.some(id=>!knownIds.has(id)))return error(422,'INVALID_SHORTLIST','Provide only schemaVersion and at most three unique known cafe IDs');
  ids=[...body.ids];
  return send(200,{schemaVersion:1,ids});
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)createApp().listen(Number(process.env.API_PORT||5192),'127.0.0.1',()=>console.log('Owned E06 API ready'));
