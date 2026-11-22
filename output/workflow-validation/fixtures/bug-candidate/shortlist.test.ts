import test from 'node:test';
import assert from 'node:assert/strict';
import {addCafe,parseShortlist,readShortlist,writeShortlist} from './shortlist';

test('stored selections recover safely and keep the first three unique known IDs', () => {
  for (const raw of [null, '{', '{}', 'null', '42', '"nylon"']) assert.deepEqual(parseShortlist(raw), []);
  assert.deepEqual(parseShortlist('["unknown","nylon",null,"nylon",5,"apartment","mill","funan"]'), ['nylon','apartment','mill']);
});
test('adding is unique, bounded, and permits a replacement after removal', () => {
  const ids = ['nylon','apartment','mill'];
  assert.deepEqual(addCafe(ids,'nylon'), ids);
  assert.deepEqual(addCafe(ids,'funan'), ids);
  assert.deepEqual(addCafe(ids.filter(id => id !== 'apartment'),'funan'), ['nylon','mill','funan']);
  assert.deepEqual(addCafe([], 'unknown'), []);
});
test('clearing the last saved café persists an empty shortlist', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  assert.equal(writeShortlist(['nylon'], () => storage), true);
  assert.deepEqual(readShortlist(() => storage), {ids:['nylon'],available:true});
  assert.equal(writeShortlist([], () => storage), true);
  assert.deepEqual(readShortlist(() => storage), {ids:[],available:true});
});
test('storage access and write failures do not throw or erase session selections', () => {
  const blocked = () => { throw new Error('storage blocked'); };
  assert.deepEqual(readShortlist(blocked), {ids:[],available:false});
  assert.equal(writeShortlist(['nylon'], blocked), false);
  const storage = {getItem: () => '["nylon"]', setItem: () => {throw new Error('quota');}};
  assert.deepEqual(readShortlist(() => storage), {ids:['nylon'],available:true});
  assert.equal(writeShortlist(['nylon','mill'], () => storage), false);
  assert.equal(writeShortlist([], () => storage), false);
  let stored = '';
  assert.equal(writeShortlist(['nylon'], () => ({getItem:()=>null,setItem:(_key,value)=>{stored=value;}})), true);
  assert.equal(stored, '["nylon"]');
});
