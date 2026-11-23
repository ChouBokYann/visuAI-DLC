import test from 'node:test';
import assert from 'node:assert/strict';
import {filterOrigins,matchingLots,originFromSearch} from './logic';
import {origins,lots,cafes,checked,statusText} from './data';
const examples=[{id:'ethiopia',name:'Ethiopia',families:['floral','fruity']},{id:'brazil',name:'Brazil',families:['nutty','sweet']},{id:'indonesia',name:'Indonesia',families:['earthy']}];
test('flavour and trimmed search combine, with explicit empty/reset behavior',()=>{
 assert.deepEqual(filterOrigins(examples,'floral','').map(x=>x.id),['ethiopia']);
 assert.deepEqual(filterOrigins(examples,'all','  BRAZIL ').map(x=>x.id),['brazil']);
 assert.deepEqual(filterOrigins(examples,'floral','Brazil'),[]);
 assert.deepEqual(filterOrigins(examples,'all','unicorn'),[]);
 assert.deepEqual(filterOrigins(examples,'all','').map(x=>x.id),['ethiopia','brazil','indonesia']);
});
test('origin mapping excludes unrelated cafes and handles a missing match',()=>{
 const lots=[{originId:'ethiopia',cafeId:'ppp'},{originId:'brazil',cafeId:'tiong-hoe'},{originId:'ethiopia',cafeId:'nylon'}];
 assert.deepEqual(matchingLots(lots,'ethiopia').map(x=>x.cafeId),['ppp','nylon']);
 assert.deepEqual(matchingLots(lots,'brazil').map(x=>x.cafeId),['tiong-hoe']);
 assert.deepEqual(matchingLots(lots,'unknown'),[]);
});
test('URL state distinguishes absent, known and unknown origins',()=>{
 assert.deepEqual(originFromSearch('?origin=brazil',['brazil']),{id:'brazil',invalid:false});
 assert.deepEqual(originFromSearch('?origin=__proto__',['brazil']),{id:null,invalid:true});
 assert.deepEqual(originFromSearch('?origin=',['brazil']),{id:null,invalid:true});
 assert.deepEqual(originFromSearch('',['brazil']),{id:null,invalid:false});
});
test('researched dataset matches independent origin-to-business examples',()=>{
 assert.deepEqual(origins.map(o=>o.id),['guatemala','colombia','brazil','ethiopia','kenya','indonesia']);
 assert.deepEqual(matchingLots(lots,'ethiopia').map(l=>l.cafeId),['ppp','nylon']);
 assert.deepEqual(matchingLots(lots,'guatemala').map(l=>l.cafeId),['nylon']);
 assert.deepEqual(matchingLots(lots,'brazil').map(l=>l.cafeId),['tiong-hoe']);
 assert.deepEqual(matchingLots(lots,'indonesia').map(l=>[l.cafeId,l.status]),[['tiong-hoe','catalogue'],['ppp','sold-out']]);
 assert.deepEqual(filterOrigins(origins,'earthy','').map(o=>o.id),['indonesia']);
 assert.deepEqual(filterOrigins(origins,'floral','').map(o=>o.id),['colombia','ethiopia']);
 assert.equal(cafes.length,3);assert.equal(checked,'2026-11-22');
 for(const lot of lots){assert(cafes.some(c=>c.id===lot.cafeId));assert(origins.some(o=>o.id===lot.originId));assert.equal(new URL(lot.url).protocol,'https:');assert(statusText[lot.status]);}
 for(const origin of origins){assert(origin.culture.length>40);assert.equal(new URL(origin.cultureSource).protocol,'https:');assert.equal(new URL(origin.flavourSource).protocol,'https:');}
});
