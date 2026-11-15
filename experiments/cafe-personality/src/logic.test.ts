import test from 'node:test';
import assert from 'node:assert/strict';
import {result,ranked,searchCafes,mapUrl,cafes} from './data';
test('four distinct stories produce the intended portraits',()=>{
 const traits=['wanderer','ritualist','connector','dreamer'];
 traits.forEach((t,i)=>assert.equal(result(Array(5).fill(i)).trait,t));
 assert.notEqual(ranked([0,0,0,0,0])[0].id,ranked([2,2,2,2,2])[0].id);
});
test('mixed answers, stable ties and independent brew preference',()=>{
 assert.equal(result([3,0,1,0,3]).trait,'dreamer');
 assert.equal(result([3,0,1,0,3]).brew,'Espresso');
 assert.deepEqual(ranked([3,0,1,0,3]),ranked([3,0,1,0,3]));
});
test('incomplete or invalid answers cannot manufacture a result',()=>{
 for(const a of [[],[0,0],[0,0,0,0,8],[0,0,0,0,-1],[0,0,0,0,NaN]]) assert.throws(()=>result(a));
});
test('filters compose, ignore query case and whitespace, and expose zero results',()=>{
 assert.deepEqual(searchCafes('  APARTMENT  ','Filter','Selegie').map(c=>c.id),['apartment']);
 assert.equal(searchCafes('Apartment','Espresso','Selegie').length,0);
 assert.equal(searchCafes('no such place','Any coffee','Everywhere').length,0);
 assert.equal(searchCafes('','Any coffee','Everywhere').length,6);
 assert.equal(searchCafes('alchemist funan','Any coffee','Everywhere')[0].id,'funan');
});
test('every curated entry has an official source and correctly encoded destination',()=>{
 assert.equal(new Set(cafes.map(c=>c.id)).size,cafes.length);
 for(const c of cafes){assert.equal(new URL(c.source).protocol,'https:');assert.equal(new URL(mapUrl(c)).searchParams.get('query'),c.name+' '+c.address);}
});
