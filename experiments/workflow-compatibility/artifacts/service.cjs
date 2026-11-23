const {randomUUID}=require('node:crypto');
exports.handler=rows=>async(req,res)=>{
 const reply=(code,value)=>{res.writeHead(code,{'content-type':'application/json'});res.end(JSON.stringify(value));};
 const match=/^\/api\/items(?:\/([^/]+))?$/.exec(req.url);if(!match)return reply(404,{error:'not found'});
 const id=match[1];if(id&&!rows.has(id))return reply(404,{error:'not found'});
 if(req.method==='GET')return reply(200,id?rows.get(id):[...rows.values()]);
 if(!['POST','PATCH'].includes(req.method)||req.method==='PATCH'&&!id||req.method==='POST'&&id)return reply(405,{error:'method'});
 let body;try{let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>16384)return reply(413,{error:'too large'});}body=JSON.parse(raw);}catch{return reply(400,{error:'JSON'});}
 if(!body||typeof body!=='object'||Array.isArray(body))return reply(400,{error:'object required'});
 if('note'in body&&body.note!==null&&(typeof body.note!=='string'||[...body.note].length>500))return reply(400,{error:'invalid note'});
 if('name'in body&&(typeof body.name!=='string'||!body.name))return reply(400,{error:'invalid name'});
 if(req.method==='POST'&&!body.name)return reply(400,{error:'name required'});
 const row=id?{...rows.get(id)}:{id:randomUUID(),note:null};
 for(const key of ['name','note'])if(key in body)row[key]=body[key];rows.set(row.id,row);return reply(id?200:201,row);
};
