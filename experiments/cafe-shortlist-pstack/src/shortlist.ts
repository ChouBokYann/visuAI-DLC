import {cafes} from './cafes';

export const SHORTLIST_KEY = 'sidequest-v2-shortlist';
export const SHORTLIST_LIMIT = 3;
const knownIds = new Set(cafes.map(cafe => cafe.id));

export function normalizeIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))].slice(0, SHORTLIST_LIMIT);
}

export function addCafe(ids: string[], id: string): string[] {
  if (!knownIds.has(id) || ids.includes(id) || ids.length >= SHORTLIST_LIMIT) return ids;
  return [...ids, id];
}

export function readShortlist(storage: () => Pick<Storage, 'getItem'> = () => localStorage) {
  let raw: string | null;
  try { raw = storage().getItem(SHORTLIST_KEY); }
  catch { return {ids: [] as string[], available: false}; }
  try { return {ids: normalizeIds(JSON.parse(raw ?? '[]')), available: true}; }
  catch { return {ids: [] as string[], available: true}; }
}

export function writeShortlist(ids: string[], storage: () => Pick<Storage, 'setItem'> = () => localStorage): boolean {
  try { storage().setItem(SHORTLIST_KEY, JSON.stringify(ids)); return true; }
  catch { return false; }
}
