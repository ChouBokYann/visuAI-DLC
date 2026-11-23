export function filterOrigins<T extends {id:string;name:string;families:string[]}>(items:T[], family:string, query:string){
 const term=query.trim().toLocaleLowerCase();
 return items.filter(item=>(family==='all'||item.families.includes(family))&&item.name.toLocaleLowerCase().includes(term));
}
export function matchingLots<T extends {originId:string;cafeId:string}>(items:T[], originId:string){return items;}
export function originFromSearch(search:string, ids:string[]){
 const params=new URLSearchParams(search),id=params.get('origin');
 return {id:id!==null&&ids.includes(id)?id:null,invalid:params.has('origin')&&!ids.includes(id??'')};
}
