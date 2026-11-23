import {cafes} from './cafes';
export const SHORTLIST_LIMIT=3;
const knownIds=new Set(cafes.map(c=>c.id));
export function addCafe(ids:string[],id:string):string[]{return !knownIds.has(id)||ids.includes(id)||ids.length>=SHORTLIST_LIMIT?ids:[...ids,id];}
async function request(ids:string[]|undefined,fetcher:typeof fetch):Promise<string[]>{
 const response=await fetcher('/api/shortlist',ids===undefined?undefined:{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:1,ids})});
 if(response.status!==200)throw Error(`Shortlist request failed (${response.status}). Please retry.`);
 const value=await response.json();
 if(!value||value.schemaVersion!==1||!Array.isArray(value.ids)||value.ids.length>SHORTLIST_LIMIT||value.ids.some((id:unknown)=>typeof id!=='string'||!knownIds.has(id))||new Set(value.ids).size!==value.ids.length)throw Error('The saved shortlist response was invalid. Please retry.');
 return value.ids;
}
export function readShortlist(fetcher:typeof fetch=fetch){return request(undefined,fetcher);}
export function writeShortlist(ids:string[],fetcher:typeof fetch=fetch){return request(ids,fetcher);}
export class ShortlistSession {
 state={ids:[] as string[],loaded:false,pending:false,error:''};
 onChange=(_state:typeof this.state)=>{};
 private failedIds:string[]|undefined;
 constructor(private fetcher:typeof fetch=fetch){}
 private async run(ids?:string[]){
  if(this.state.pending)return;
  this.failedIds=ids;
  this.state={...this.state,pending:true,error:''};this.onChange(this.state);
  try{const saved=await request(ids,this.fetcher);this.state={ids:saved,loaded:true,pending:false,error:''};}
  catch(error){this.state={...this.state,pending:false,error:error instanceof Error?error.message:'Shortlist unavailable. Please retry.'};}
  this.onChange(this.state);
 }
 load(){return this.run();}
 save(ids:string[]){if(!this.state.loaded)return Promise.resolve();return this.run(ids);}
 retry(){return this.run(this.failedIds);}
}
