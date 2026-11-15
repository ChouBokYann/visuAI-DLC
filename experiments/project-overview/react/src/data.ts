import '../../model.js';
import '../../workflow-samples.js';
import type { Snapshot, RecordItem } from './graph';
declare global {
  interface Window {
    OverviewModel: { validateSnapshot(data: unknown): Snapshot; evidenceState(record: RecordItem, snapshot: Snapshot): string };
    WorkflowSamples: { a: Snapshot; b: Snapshot };
  }
}
export const validateSnapshot = window.OverviewModel.validateSnapshot;
export const evidenceState = window.OverviewModel.evidenceState;
export const samples = window.WorkflowSamples;
