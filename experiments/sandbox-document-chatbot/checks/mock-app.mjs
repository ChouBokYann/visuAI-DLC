import {createApp} from './server.mjs';
const server=await createApp({root:'/sandbox/candidate/corpus',ask:async()=>({answer:'Synthetic mock: Mira Chen owns Atlas. [S1]'})});
server.listen(17810,'127.0.0.1',()=>console.log('Mock app ready'));
process.once('SIGTERM',()=>{server.closeAllConnections();server.close();});
