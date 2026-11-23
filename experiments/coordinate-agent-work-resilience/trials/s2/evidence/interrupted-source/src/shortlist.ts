import {cafes} from './cafes';

export const SHORTLIST_KEY = 'sidequest-shortlist-v1';
export const SHORTLIST_LIMIT = 3;
type StorageAccess = () => Pick<Storage, 'getItem' | 'setItem'>;
const browserStorage: StorageAccess = () => window.localStorage;
const knownIds = new Set(cafes.map(cafe => cafe.id));

export function parseShortlist(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))].slice(0, SHORTLIST_LIMIT);
  } catch {
    return [];
  }
}

export function addCafe(ids: string[], id: string): string[] {
  if (!knownIds.has(id) || ids.includes(id) || ids.length >= SHORTLIST_LIMIT) return ids;
  return [...ids, id];
}

export function readShortlist(storage: StorageAccess = browserStorage) {
  try {
    return {ids: parseShortlist(storage().getItem(SHORTLIST_KEY)), available: true};
  } catch {
    return {ids: [], available: false};
  }
}

export function writeShortlist(ids: string[], storage: StorageAccess = browserStorage): boolean {
  try {
    storage().setItem(SHORTLIST_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
