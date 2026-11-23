import fs from 'node:fs';
const p='src/App.tsx';let s=fs.readFileSync(p,'utf8');
s=s.replace(/ const \[shortlist,setShortlist\]=useState\(readShortlist\);\r?\n useEffect\(\(\)=>\{const available=writeShortlist\(shortlist.ids\);setShortlist\(current=>current.available===available\?current:\{\.\.\.current,available\}\);\},\[shortlist.ids\]\);/,` const [session]=useState(()=>new ShortlistSession());
 const [shortlist,setShortlist]=useState(session.state);
 useEffect(()=>{session.onChange=setShortlist;void session.load();return()=>{session.onChange=()=>{};};},[session]);
 const blocked=!shortlist.loaded||shortlist.pending;
 const notice=<StorageNotice loaded={shortlist.loaded} pending={shortlist.pending} error={shortlist.error} retry={()=>void session.retry()}/>;`);
fs.writeFileSync(p,s);
