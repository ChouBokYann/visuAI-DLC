import { connections, type Snapshot } from './graph';
export interface Story {
  version: 1; project: string; baseline: string; sequence: number;
  focus?: string; route: string[];
  links: { from: string; to: string; summary: string }[];
  question?: string; answer?: string;
  steps?: { record: string; reason: string }[];
}
export interface Worktree {
  id: string; branch: string; revision: string; dirty: boolean; integrated: boolean; snapshot: Snapshot;
}
export interface WorktreeBundle {
  version: 1; kind: 'worktrees'; project: string; main: Worktree; worktrees: Worktree[];
  omitted: string[];
}
export function baselineOf(snapshot: Snapshot): string {
  return snapshot.project.snapshot + ':' + ((snapshot.provenance as { digest?: string } | undefined)?.digest || 'legacy');
}
export function validateStory(raw: unknown, snapshot: Snapshot): Story {
  const s = raw as Story;
  if (!s || s.version !== 1 || s.project !== snapshot.project.name || s.baseline !== baselineOf(snapshot)) throw new Error('Story does not match this project snapshot.');
  if (!Number.isSafeInteger(s.sequence) || s.sequence < 1) throw new Error('Story sequence must be a positive integer.');
  const ids = new Set(snapshot.records.map(r => r.id));
  if (!Array.isArray(s.route) || s.route.length > 100 || new Set(s.route).size !== s.route.length || s.route.some(id => !ids.has(id))) throw new Error('Story route contains invalid or repeated records.');
  if (s.focus !== undefined && !ids.has(s.focus)) throw new Error('Unknown story focus.');
  if (!Array.isArray(s.links) || s.links.length > 100 || s.links.some(e => !e || !ids.has(e.from) || !ids.has(e.to) || e.from === e.to || typeof e.summary !== 'string' || !e.summary.trim() || e.summary.length > 160)) throw new Error('Invalid narrative connection.');
  if (s.question !== undefined || s.answer !== undefined || s.steps !== undefined) {
    if (typeof s.question !== 'string' || !s.question.trim() || s.question.length > 300 || typeof s.answer !== 'string' || !s.answer.trim() || s.answer.length > 600) throw new Error('Story needs a bounded question and answer.');
    if (!s.route.length || s.route.length > 8 || !Array.isArray(s.steps) || s.steps.length !== s.route.length || s.steps.some((step, i) => !step || step.record !== s.route[i] || typeof step.reason !== 'string' || !step.reason.trim() || step.reason.length > 300)) throw new Error('Provide one explanation per story step, in route order (at most eight).');
    if (s.focus && !s.route.includes(s.focus)) throw new Error('Story focus must belong to its route.');
    if (s.links.some(e => !s.route.includes(e.from) || !s.route.includes(e.to))) throw new Error('Narrative links must stay inside the answer route.');
  }
  return s;
}
export function storyGraph(snapshot: Snapshot, story: Story) {
  const ids = new Set(story.route.length ? story.route : story.focus ? [story.focus] : []);
  const records = [...ids].map(id => snapshot.records.find(r => r.id === id)!);
  const canonical = connections(snapshot);
  const links = canonical.filter(e => {
    const index = story.route.indexOf(e.source);
    return index >= 0 && story.route[index + 1] === e.target;
  });
  story.links.filter(e => ids.has(e.from) && ids.has(e.to)).forEach((e, i) => {
    if (!links.some(link => link.source === e.from && link.target === e.to)) links.push({ id: `story-${i}`, source: e.from, target: e.to, label: `Story: ${e.summary}`, inferred: false });
  });
  return { records, context: [], links, positions: new Map(records.map((r, i) => [r.id, { x: 40 + 340 * i, y: 40 }])) };
}
export function validateBundle(raw: unknown, validate: (raw: unknown) => Snapshot): WorktreeBundle {
  const b = raw as WorktreeBundle;
  if (!b || b.kind !== 'worktrees' || b.version !== 1 || typeof b.project !== 'string' || !Array.isArray(b.worktrees) || b.worktrees.length > 30 || !Array.isArray(b.omitted) || b.omitted.length > 100 || b.omitted.some(v => typeof v !== 'string' || v.length > 500)) throw new Error('Invalid worktree bundle.');
  const ids = new Set<string>();
  for (const w of [b.main, ...b.worktrees]) {
    if (!w || typeof w.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(w.id) || ids.has(w.id) || typeof w.branch !== 'string' || w.branch.length > 200 || !w.branch || typeof w.revision !== 'string' || !/^[a-f0-9]{40,64}$/.test(w.revision) || typeof w.dirty !== 'boolean' || typeof w.integrated !== 'boolean') throw new Error('Invalid worktree identity.');
    ids.add(w.id);
    if (validate(w.snapshot).project.name !== b.project) throw new Error('Worktree project mismatch.');
  }
  return b;
}
export function worktreeChanges(main: Snapshot, branch: Snapshot) {
  const old = new Map(main.records.map(r => [r.id, r]));
  const next = new Map(branch.records.map(r => [r.id, r]));
  const stable = (v: unknown): string => {
    if (typeof v === 'string') return JSON.stringify(v.replace(/\r\n/g, '\n'));
    if (Array.isArray(v)) return JSON.stringify(v.map(stable));
    if (v && typeof v === 'object') return JSON.stringify(Object.entries(v).filter(([k]) => k !== 'documentHash').sort(([a], [b]) => a.localeCompare(b)).map(([k, value]) => [k, stable(value)]));
    return JSON.stringify(v);
  };
  const links = (s: Snapshot, id: string) => s.edges.filter(e => e.from === id).map(stable).sort();
  const goals = new Set(main.records.filter(r => r.kind === 'outcome' || r.kind === 'goal').map(r => r.id));
  return [...new Set([...old.keys(), ...next.keys()])].flatMap(id => {
    const before = old.get(id), after = next.get(id);
    const change = !before ? 'added' : !after ? 'removed' : stable(before) !== stable(after) || stable(links(main, id)) !== stable(links(branch, id)) ? 'changed' : null;
    if (!change) return [];
    const source = after ? branch : main;
    const seen = new Set<string>(); const queue = [id];
    while (queue.length) {
      const current = queue.shift()!;
      if (seen.has(current)) continue;
      seen.add(current);
      queue.push(...source.edges.filter(e => e.from === current).map(e => e.to));
    }
    return [{ id, title: (after || before)!.title, change, goals: [...goals].filter(goal => seen.has(goal)) }];
  });
}
