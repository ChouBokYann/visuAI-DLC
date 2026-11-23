const fs=require('node:fs'),assert=require('node:assert/strict');
require('../source/backend/dist/app');
const db=require('../source/backend/dist/config/database').default;
const User=require('../source/backend/dist/models/User').default,Category=require('../source/backend/dist/models/Category').default,Transaction=require('../source/backend/dist/models/Transaction').default;
(async()=>{try{
assert.equal(process.env.SUPABASE_DB_NAME,'e08_trial');
const [tables]=await db.query("SELECT tablename FROM pg_tables WHERE schemaname='public'");assert.equal(tables.length,0,'only initialize fresh database');
await db.sync();
const fixture={};
for(const letter of ['A','B']){
const user=await User.create({email:`synthetic-${letter.toLowerCase()}@example.test`,name:`Synthetic ${letter}`});
const cat=await Category.create({userId:user.id,name:'Synthetic income',icon:'test',color:'#123456',type:'income'});
const tx=await Transaction.create({userId:user.id,categoryId:cat.id,type:'income',amount:123.45,description:`Legacy ${letter}`,date:new Date('2026-01-01T00:00:00Z')});
fixture['user'+letter]=user.id;fixture['category'+letter]=cat.id;fixture['transaction'+letter]=tx.id;
}
const deleted=await Transaction.create({userId:fixture.userA,categoryId:fixture.categoryA,type:'income',amount:5.67,description:'Legacy soft deleted',date:new Date('2026-01-02T00:00:00Z')});await deleted.destroy();fixture.deletedTransaction=deleted.id;
fs.writeFileSync('records/fixtures.json',JSON.stringify(fixture,null,2));console.log('Initialized fresh synthetic database once',fixture);
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
