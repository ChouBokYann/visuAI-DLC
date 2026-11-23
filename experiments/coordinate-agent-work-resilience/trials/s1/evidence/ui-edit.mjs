import fs from 'node:fs';
let p='src/App.tsx',s=fs.readFileSync(p,'utf8');
s=s.replace('addCafe,readShortlist,writeShortlist,SHORTLIST_LIMIT','addCafe,ShortlistSession,SHORTLIST_LIMIT').replace('Shortlist,StorageNotice','Shortlist,StorageNotice');
s=s.replace('saved,full,available,save,showShortlist','saved,full,blocked,notice,save,showShortlist').replace('available:boolean;save:', 'blocked:boolean;notice:React.ReactNode;save:');
s=s.replace('aria-disabled={saved||full}','disabled={blocked||saved||full} aria-disabled={blocked||saved||full}').replace('if(!saved&&!full)save();','if(!blocked&&!saved&&!full)save();').replace('{!available&&<StorageNotice/>}','{notice}');
s=s.replace(' const [shortlist,setShortlist]=useState(readShortlist);\n useEffect(()=>{const available=writeShortlist(shortlist.ids);setShortlist(current=>current.available===available?current:{...current,available});},[shortlist.ids]);',` const [session]=useState(()=>new ShortlistSession());
 const [shortlist,setShortlist]=useState(session.state);
 useEffect(()=>{session.onChange=setShortlist;void session.load();return()=>{session.onChange=()=>{};};},[session]);
 const blocked=!shortlist.loaded||shortlist.pending;
 const notice=<StorageNotice loaded={shortlist.loaded} pending={shortlist.pending} error={shortlist.error} retry={()=>void session.retry()}/>;`);
s=s.replace('available={shortlist.available} heading={heading} remove={id=>setShortlist(current=>({...current,ids:current.ids.filter(saved=>saved!==id)}))}', 'loaded={shortlist.loaded} blocked={blocked} notice={notice} heading={heading} remove={id=>void session.save(shortlist.ids.filter(saved=>saved!==id))}');
s=s.replace('available={shortlist.available} save={()=>setShortlist(current=>({...current,ids:addCafe(current.ids,detail.id)}))}', 'blocked={blocked} notice={notice} save={()=>void session.save(addCafe(shortlist.ids,detail.id))}');
fs.writeFileSync(p,s);
p='src/ShortlistView.tsx';s=fs.readFileSync(p,'utf8');
s=s.replace("import type {RefObject}","import type {RefObject,ReactNode}");
const start=s.indexOf('export function StorageNotice()');const end=s.indexOf('\nexport function Shortlist',start);
s=s.slice(0,start)+`export function StorageNotice({loaded,pending,error,retry}:{loaded:boolean;pending:boolean;error:string;retry:()=>void}) {
  if(pending)return <p className="storage-notice" role="status">{loaded?'Saving shortlist…':'Loading saved shortlist…'}</p>;
  if(error)return <div className="storage-notice" role="alert"><p>{loaded?'Your last saved selection is unchanged.':'Saved shortlist unavailable.'} {error}</p><button onClick={retry}>Retry shortlist</button></div>;
  return null;
}
`+s.slice(end);
s=s.replace('ids,available,heading','ids,loaded,blocked,notice,heading').replace('  available:boolean;','  loaded:boolean;\n  blocked:boolean;\n  notice:ReactNode;');
s=s.replace('<p className="shortlist-intro" role="status">','{loaded&&<p className="shortlist-intro" role="status">').replace("compare before you go.'}</p>","compare before you go.'}</p>}");
s=s.replace('{!available&&<StorageNotice/>}','{notice}').replace('{ids.length ? <>','{loaded&&(ids.length ? <>').replace('onClick={()=>removeAndFocus(id)}','disabled={blocked} onClick={()=>removeAndFocus(id)}').replace('</button></div>}','</button></div>)}');
fs.writeFileSync(p,s);
