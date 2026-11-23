const fs=require('node:fs'),assert=require('node:assert/strict'),{Sequelize}=require('sequelize');
const name='20261121000000-add-transaction-note.js',migration=require('../candidate/src/migrations/'+name);
const db=new Sequelize(process.env.SUPABASE_DB_NAME,process.env.SUPABASE_DB_USER,'',{host:process.env.SUPABASE_DB_HOST,port:Number(process.env.SUPABASE_DB_PORT),dialect:'postgres',logging:sql=>log.push(sql)}),log=[];
const qi=db.getQueryInterface();
async function snapshot(){return {schema:(await db.query("SELECT column_name,data_type,is_nullable,character_maximum_length FROM information_schema.columns WHERE table_schema='public' AND table_name='transactions' ORDER BY ordinal_position"))[0],rows:(await db.query('SELECT * FROM transactions ORDER BY id'))[0]};}
(async()=>{try{
assert.equal(process.env.SUPABASE_DB_NAME,'e08_trial');const before=await snapshot();assert(!before.schema.some(x=>x.column_name==='note'));
const original=qi.addColumn.bind(qi);let executed=false;
qi.addColumn=async(...args)=>{await original(...args);executed=true;throw new Error('E08 injected failure after actual ADD COLUMN');};
await assert.rejects(migration.up(qi,Sequelize),/E08 injected failure/);assert(executed);qi.addColumn=original;
const failed=await snapshot();assert.deepEqual(failed,before);fs.writeFileSync('evidence/migration-failure.json',JSON.stringify({before,after:failed,executed,log:[...log]},null,2));
await db.query('CREATE TABLE "E08MigrationHistory" (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
let applications=0;
async function apply(){const [rows]=await db.query('SELECT name FROM "E08MigrationHistory" WHERE name=:name',{replacements:{name}});if(rows.length)return 'skipped';await migration.up(qi,Sequelize);applications++;await db.query('INSERT INTO "E08MigrationHistory" (name) VALUES (:name)',{replacements:{name}});return 'applied';}
assert.equal(await apply(),'applied');assert.equal(await apply(),'skipped');assert.equal(applications,1);
const after=await snapshot();assert(after.schema.some(x=>x.column_name==='note'&&x.is_nullable==='YES'&&x.character_maximum_length===500));
assert.deepEqual(after.rows.map(({note,...row})=>{assert.equal(note,null);return row;}),before.rows);
fs.writeFileSync('evidence/migration-success.json',JSON.stringify({applications,repeat:'skipped',before,after,log},null,2));console.log('Real DDL rolled back; same migration applied once; repeat skipped; all legacy columns preserved.');
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
