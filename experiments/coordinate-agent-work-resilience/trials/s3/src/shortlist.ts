import {cafes} from './cafes';
export const SHORTLIST_LIMIT=3;
const knownIds=new Set(cafes.map(c=>c.id));
export function addCafe(ids:string[],id:string):string[]{return !knownIds.has(id)||ids.includes(id)||ids.length>=SHORTLIST_LIMIT?ids:[...ids,id];}
async function request(init:RequestInit|undefined,fetcher:typeof fetch){
 const response=await fetcher('/api/shortlist',init);
 if(response.status!==200)throw Error('Shortlist service unavailable.');
 let value:any;try{value=await response.json();}catch{throw Error('Shortlist response is invalid.');}
 if(!value||value.schemaVersion!==1||Object.keys(value).length!==2||!Array.isArray(value.ids)||value.ids.length>SHORTLIST_LIMIT||new Set(value.ids).size!==value.ids.length||value.ids.some((id:unknown)=>typeof id!=='string'||!knownIds.has(id)))throw Error('Shortlist response is invalid.');
 return value.ids as string[];
}
export function readShortlist(fetcher:typeof fetch=fetch){return request(undefined,fetcher);}
export function writeShortlist(ids:string[],fetcher:typeof fetch=fetch){return request({method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:1,ids})},fetcher);}
export type ShortlistState={ids:string[];available:boolean;pending:boolean;error:string};
export class ShortlistSession{
 state:ShortlistState={ids:[],available:false,pending:false,error:''};
 private failed:string[]|null=null;
 constructor(private changed:(state:ShortlistState)=>void,private fetcher:typeof fetch=fetch){}
 private update(next:Partial<ShortlistState>){this.state={...this.state,...next};this.changed(this.state);}
 load(){return this.run(null);}
 replace(ids:string[]){if(!this.state.available)return Promise.resolve();return this.run([...ids]);}
 retry(){return this.run(this.failed);}
 private async run(ids:string[]|null){
  if(this.state.pending)return;
  this.failed=ids;this.update({pending:true,error:''});
  try{const saved=await(ids===null?readShortlist(this.fetcher):writeShortlist(ids,this.fetcher));this.update({ids:saved,available:true});}
  catch(error){this.update({error:`${error instanceof Error?error.message:'Request failed.'} ${this.state.available?'Saved shortlist unchanged.':'Saved shortlist unavailable.'}`});}
  finally{this.update({pending:false});}
 }
}
