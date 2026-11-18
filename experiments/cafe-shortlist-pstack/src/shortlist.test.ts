import test from 'node:test';
import assert from 'node:assert/strict';
import {addCafe, normalizeIds, readShortlist, writeShortlist, SHORTLIST_KEY} from './shortlist';

test('stored selection accepts only known unique IDs and retains the first three', () => {
  assert.deepEqual(normalizeIds(['nylon', 'missing', 'nylon', 2, null, 'apartment', 'mill', 'funan']), ['nylon', 'apartment', 'mill']);
  for (const value of [null, {}, 'nylon', 7]) assert.deepEqual(normalizeIds(value), []);
});

test('adding is idempotent and never displaces a full selection', () => {
  const ids = ['nylon', 'apartment', 'mill'];
  assert.equal(addCafe(ids, 'nylon'), ids);
  assert.equal(addCafe(ids, 'funan'), ids);
  assert.equal(addCafe(ids, 'unknown'), ids);
  assert.deepEqual(addCafe(ids.filter(id => id !== 'apartment'), 'funan'), ['nylon', 'mill', 'funan']);
});

test('missing or malformed storage is recoverable; denied reads are unavailable', () => {
  for (const raw of [null, '{broken', '{}', 'null']) {
    assert.deepEqual(readShortlist(() => ({getItem: () => raw})), {ids: [], available: true});
  }
  assert.deepEqual(readShortlist(() => ({getItem: () => '["nylon","nylon","old","mill"]'})), {ids: ['nylon', 'mill'], available: true});
  assert.deepEqual(readShortlist(() => {throw new Error('access denied');}), {ids: [], available: false});
  assert.deepEqual(readShortlist(() => ({getItem: () => {throw new Error('read denied');}})), {ids: [], available: false});
});

test('writes contain only selected IDs and failed writes preserve the caller’s session', () => {
  const ids = ['nylon', 'mill'];
  let stored: unknown;
  assert.equal(writeShortlist(ids, () => ({setItem: (key, value) => {stored = [key, value];}})), true);
  assert.deepEqual(stored, [SHORTLIST_KEY, '["nylon","mill"]']);
  assert.equal(writeShortlist(ids, () => ({setItem: () => {throw new Error('quota');}})), false);
  assert.deepEqual(ids, ['nylon', 'mill']);
});
