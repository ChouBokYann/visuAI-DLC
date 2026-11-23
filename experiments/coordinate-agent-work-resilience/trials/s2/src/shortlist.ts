import {cafes} from './cafes';
export const SHORTLIST_LIMIT=3;
const knownIds=new Set(cafes.map(c=>c.id));
export function addCafe(ids:string[],id:string):string[]{
  if(!knownIds.has(id)||ids.includes(id)||ids.length>=SHORTLIST_LIMIT)return ids;
  return [...ids,id];
}
async function request(ids:string[]|null,fetcher:typeof fetch):Promise<string[]>{
  const response=await fetcher('/api/shortlist',ids===null?undefined:{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:1,ids})});
  if(response.status!==200)throw new Error('Shortlist request failed. Please retry.');
  const body=await response.json();
  if(!body||body.schemaVersion!==1||Object.keys(body).length!==2||!Array.isArray(body.ids)||body.ids.length>SHORTLIST_LIMIT||new Set(body.ids).size!==body.ids.length||body.ids.some((id:unknown)=>typeof id!=='string'||!knownIds.has(id)))throw new Error('Invalid shortlist response. Please retry.');
  return [...body.ids];
}
export function readShortlist(fetcher:typeof fetch=globalThis.fetch){return request(null,fetcher);}
export function writeShortlist(ids:string[],fetcher:typeof fetch=globalThis.fetch){return request(ids,fetcher);}
export type ShortlistState={ids:string[];ready:boolean;pending:boolean;error:string|null};
export class ShortlistSession{
  state:ShortlistState={ids:[],ready:false,pending:false,error:null};
  private failed:string[]|null=null;
  constructor(private changed:(state:ShortlistState)=>void,private fetcher:typeof fetch=globalThis.fetch){}
  private publish(change:Partial<ShortlistState>){this.state={...this.state,...change};this.changed(this.state);}
  private async run(ids:string[]|null){
    if(this.state.pending)return;
    this.failed=ids===null?null:[...ids];
    this.publish({pending:true,error:null});
    try{const saved=await request(ids,this.fetcher);this.publish({ids:saved,ready:true,pending:false});}
    catch(error){this.publish({pending:false,error:error instanceof Error?error.message:'Shortlist unavailable. Please retry.'});}
  }
  load(){return this.run(null);}
  async replace(ids:string[]){if(!this.state.ready||this.state.pending)return;await this.run(ids);}
  retry(){return this.run(this.failed);}
}
