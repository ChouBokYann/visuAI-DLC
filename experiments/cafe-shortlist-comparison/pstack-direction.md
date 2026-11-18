# Cafe shortlist direction

Prepared from the unchanged baseline before inspecting the implementation in any other workspace.

## Two shapes

1. Keep selected IDs and persistence state directly in App, with handlers passed to detail and comparison. Smallest initial edit, but storage validation and recovery become interleaved with the existing story/search component.
2. A small shortlist module owns normalization and bounded ID operations, with one React owner for current selection and persistence availability. App passes explicit data and callbacks to presentation. This keeps stored-data handling testable and gives the selection one owner.

Choose shape 2 if it remains small. Store known cafe IDs, derive cafe facts from the existing registry, and treat storage read/write failure as a persistence status while retaining valid in-memory selection. Save at most three unique IDs. Keep comparison UI responsive and use native dialog/focus semantics where fitting. No backend or additional dependency is needed.

## Throughput checkpoint

- Blocking first steps: trace the existing Detail/search/result paths and agree expected storage/limit behavior. Test pure shortlist rules before UI integration.
- Independent workstreams: the feature shares App and selection state, so one implementation owner handles those files. Independent acceptance review is outside the write scope.
- Shared mutable state: one selection owner and one storage key per app. The reviewer uses private browser contexts. No concurrent writers edit the feature.
- Smallest safe decomposition: bounded data operations, UI integration, then project-specific real-user verification. One code owner plus an independent reviewer is sufficient for this feature.

Use the same approved brief in brief.md. Run real controls and keep evidence through teardown. Parent handles external delivery and user reporting.
