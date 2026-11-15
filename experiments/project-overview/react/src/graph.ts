import dagre from '@dagrejs/dagre';

export const phases = ['ideation', 'planning', 'implementation', 'verification', 'deployment', 'maintenance'] as const;
export type Phase = typeof phases[number];
export type View = Phase | 'project' | 'unplaced';
export interface RecordItem {
  id: string; title: string; summary: string; kind: string; status: string;
  workflow?: { phase: Phase; step: string; iteration: string; trigger?: string };
}
export interface Snapshot {
  version: number;
  project: { name: string; summary: string; snapshot: string; sample: boolean };
  records: RecordItem[];
  edges: { from: string; to: string; relation: string; basis: string }[];
  provenance?: { complete: boolean; unresolved: string[] };
}
export interface Link { id: string; source: string; target: string; label: string; inferred: boolean }
const inverse: Record<string, string> = {
  addresses: 'addressed by', supports: 'supported by', aims_to_achieve: 'pursued by',
  implements: 'implemented by', evaluates: 'checked by', includes: 'released in',
  supersedes: 'revised to', aims_at: 'implemented by', assesses: 'checked by', depends_on: 'needed by',
};

export function connections(snapshot: Snapshot): Link[] {
  const ids = new Set(snapshot.records.map(r => r.id));
  const links = snapshot.edges.filter(e => ids.has(e.from) && ids.has(e.to)).map((e, i) => ({
    id: `relation-${i}`, source: e.relation === 'decides' ? e.from : e.to,
    target: e.relation === 'decides' ? e.to : e.from,
    label: inverse[e.relation] || e.relation, inferred: e.basis === 'inferred',
  }));
  for (const record of snapshot.records) {
    if (record.workflow?.trigger && ids.has(record.workflow.trigger)) {
      links.push({ id: `trigger-${record.id}`, source: record.workflow.trigger, target: record.id, label: 'prompted', inferred: false });
    }
  }
  return links;
}
export function neighbourhood(id: string, links: Link[]) {
  return new Set([id, ...links.flatMap(e => e.source === id ? [e.target] : e.target === id ? [e.source] : [])]);
}
export function graph(snapshot: Snapshot, view: View) {
  const records = snapshot.records.filter(r => view === 'project' || (view === 'unplaced' ? !r.workflow : r.workflow?.phase === view));
  const ids = new Set(records.map(r => r.id));
  const links = connections(snapshot).filter(e => ids.has(e.source) && ids.has(e.target));
  const layout = new dagre.graphlib.Graph().setGraph({ rankdir: 'LR', ranksep: 110, nodesep: 55, marginx: 40, marginy: 40 }).setDefaultEdgeLabel(() => ({}));
  records.forEach(r => layout.setNode(r.id, { width: 230, height: 122 }));
  links.forEach(e => layout.setEdge(e.source, e.target));
  dagre.layout(layout);
  return { records, links, positions: new Map(records.map(r => { const n = layout.node(r.id); return [r.id, { x: n.x - 115, y: n.y - 61 }]; })) };
}

// A link navigates only a snapshot already loaded in this browser. It never loads a URL or executes a command.
export function readFocus(hash: string, snapshot: Snapshot): { view: View; record?: string; chat?: string } | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  if (!params.size) return null;
  if (params.get('project') !== snapshot.project.name) throw new Error('This link belongs to another project. Import its snapshot first.');
  const record = params.get('record') || undefined;
  if (record && !snapshot.records.some(r => r.id === record)) throw new Error('This record is not in the loaded snapshot.');
  const view = params.get('stage') || 'project';
  if (!['project', 'unplaced', ...phases].includes(view)) throw new Error('Unknown lifecycle stage.');
  const chat = params.get('chat') || undefined;
  if (chat && (chat.length > 160 || !/^[a-zA-Z0-9_-]+$/.test(chat))) throw new Error('Invalid chat identifier.');
  const item = snapshot.records.find(r => r.id === record);
  if (item && view !== 'project' && (view === 'unplaced' ? !!item.workflow : item.workflow?.phase !== view)) throw new Error('The record does not belong to this stage.');
  return { view: view as View, record, chat };
}
export function focusHash(snapshot: Snapshot, view: View, record?: string, chat?: string) {
  const params = new URLSearchParams({ project: snapshot.project.name, stage: view });
  if (record) params.set('record', record);
  if (chat) params.set('chat', chat);
  return `#${params}`;
}
