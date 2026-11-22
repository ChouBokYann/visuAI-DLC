# Gates: complete engineering-workflow validation

OWNS: output/workflow-validation/**, skills/implementation/implement-increments/SKILL.md, docs/workflows/engineering.md, docs/workflows/deliver-change.md, docs/proposals/workflow-validation.md

Scope: validate the current engineering workflow for features, bug fixes, project-aligned tests and minimal evidence-backed work; repair demonstrated gaps under the accepted contribution scope; exclude visualization and mandatory external integrations.

- [x] G1: Current skill/source baseline and prior experiment provenance are reconciled against actual files and raw outputs.
  EVIDENCE: REPORT.md historical audit; evidence/integration-audit.json: 22 current versus 25 historical skills; 31 original files unchanged.

- [x] G2: A representative feature traverses requirements, change and independent behavior checks in an isolated existing-project copy.
  EVIDENCE: feature.test.mjs; evidence/baseline-results.json and candidate-results.json; F1-F5 inspected, including reviewer-requested abstention check.

- [x] G3: A representative defect is reproduced, causally diagnosed, minimally repaired and passes unchanged regression and relevant existing checks.
  EVIDENCE: bug.test.ts and original tests; seeded empty-write cause repaired by removing the early return; baseline/candidate results and literal-key inspection.

- [x] G4: Project-aligned test selection rejects weak or stale assertions and detects specified plausible faults with correct-behavior controls.
  EVIDENCE: evidence/fault-controls.json and seven assertion logs; correct controls pass; weak-checks.test.mjs demonstrates three rejected blind spots.

- [x] G5: Pressure walkthroughs cover missing inputs, conflicting tests, unavailable integration, stale evidence, no-op work and overbuilding without invented requirements or completion.
  EVIDENCE: REPORT.md pressure walkthrough: before/after reviewer decisions for ambiguity, conflicting tests, tests-only, no-op, unreproduced bug, stale evidence, unavailable integration and overbuilding.

- [x] G6: Current core routes and changed skills integrate cleanly; no visualization or mandatory external dependency added.
  EVIDENCE: evidence/integration-audit.json: exactly three canonical changes and 45 local links resolved. Fresh reviewer found no guidance blocker and confirmed the F4 correction.

- [x] G7: Full-goal completion audit identifies authoritative evidence for every requirement and leaves no required validation falsely passed or silently omitted.
  EVIDENCE: REPORT.md full goal mapping and E11 direct server diff/module hashes: reuse only unchanged provider boundaries; no fresh candidate live/recovery or browser-refresh completion claim.

Executable checks supplement the inspected semantic evidence above; counts alone do not establish full-goal coverage. Run from repository root. No hooks or global state changes.

- [x] G8: Frozen feature and bug scenarios accept correct behavior and reject their intended missing behavior.
  CHECK: node output/workflow-validation/run-scenarios.mjs baseline
  EXPECT: BASELINE SCENARIOS VERIFIED: 3

- [x] G9: Both corrected candidates satisfy the unchanged behavior criteria.
  CHECK: node output/workflow-validation/run-scenarios.mjs candidate
  EXPECT: CANDIDATE SCENARIOS VERIFIED: 2

- [x] G10: All seven selected plausible faults fail relevant assertions rather than setup.
  CHECK: node output/workflow-validation/fault-controls.mjs
  EXPECT: FAULT CONTROLS VERIFIED: 7

- [x] G11: Original inputs, current oracle hashes, allowed canonical changes and local links remain consistent.
  CHECK: python output/workflow-validation/audit.py
  EXPECT: "oracleHashesMatch": true
