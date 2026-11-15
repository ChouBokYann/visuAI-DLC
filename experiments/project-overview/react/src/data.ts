import '../../model.js';
import '../../workflow-samples.js';
import type { Snapshot, RecordItem } from './graph';
import type { WorktreeBundle } from './session';
declare global {
  interface Window {
    OverviewModel: { validateSnapshot(data: unknown): Snapshot; evidenceState(record: RecordItem, snapshot: Snapshot): string };
    WorkflowSamples: { a: Snapshot; b: Snapshot };
  }
}
export const validateSnapshot = window.OverviewModel.validateSnapshot;
export const evidenceState = window.OverviewModel.evidenceState;
export const samples = window.WorkflowSamples;
// Synthetic worktree identities, using the same canonical sample records as the viewer.
export const exampleWorktrees: WorktreeBundle = {
  version: 1, kind: 'worktrees', project: samples.a.project.name,
  main: { id: 'main', branch: 'Example main', revision: '0'.repeat(40), dirty: false, integrated: true, snapshot: samples.a },
  worktrees: [{ id: 'amenities', branch: 'Example amenities', revision: '1'.repeat(40), dirty: true, integrated: false, snapshot: samples.b }], omitted: [],
};
