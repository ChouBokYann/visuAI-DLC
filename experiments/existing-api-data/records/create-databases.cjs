const {Client}=require('pg'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
assert.equal(process.env.SUPABASE_DB_HOST,'127.0.0.1');
const client=new Client({host:'127.0.0.1',port:Number(process.env.SUPABASE_DB_PORT),user:'e08',database:'postgres',connectionTimeoutMillis:3000});
(async()=>{await client.connect();for(const name of ['e08_trial','e08_tests']){const r=await client.query('select datname from pg_database where datname=$1',[name]);if(!r.rowCount)await client.query('CREATE DATABASE '+name);}
const identity=(await client.query('select system_identifier::text from pg_control_system()')).rows[0];
const result={at:new Date().toISOString(),identity,databases:(await client.query("select datname from pg_database where datname like 'e08_%' order by datname")).rows};assert.equal(result.databases.length,2);fs.writeFileSync(path.join(__dirname,'database-identity.json'),JSON.stringify(result,null,2));console.log(result);await client.end();})().catch(error=>{console.error(error);process.exitCode=1;client.end();});
