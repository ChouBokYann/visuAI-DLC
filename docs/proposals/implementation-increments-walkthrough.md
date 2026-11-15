# Implement increments: author walkthrough

Date: 2026-11-15. Scope: author inspection of the new skill against realistic synthetic work and failure conditions. No product code, test runner, or independent evaluator executed these cases. The examples below are expected applications, not observed behavioral test results. Real-project and installed-runtime evaluation remain deferred.

## Case A: complete the requested scope through two increments

Fixture request: add cafe laptop-policy filtering and display a last-checked date in the existing directory. REQ-004 requires filtering while preserving explicit unknown policies; REQ-005 requires date display. DEC-003 selects reuse of the existing list. The supplied project has a filtering function, a list view, and behavior tests; no implementation task plan exists. The request authorizes local edits/checks, but not publishing. An unrelated user edit already exists in the footer.

Author application:

1. Read the direction and actual relevant code/configuration, identify the existing runner, note the footer edit, and choose the filter as WRK-001 implementing REQ-004. Plan only its affected filter/callers and meaningful observable checks now.
2. Use cafe fixtures with independent expected matches. A regression should fail because policy is ignored, not because the runner cannot start. Implement the filter through the existing path and inspect the actual check result. Do not infer that the UI is wired merely because the helper passes.
3. Inspect the caller wiring and relevant existing UI check. WRK-001 passing does not complete REQ-005; continue to WRK-002 for date display, plan that detail from the now-current code, and check the behavior. Preserve the footer edit throughout.
4. Run the project's required checks and an appropriate combined-flow check. Record the tested revision plus relevant uncommitted state, actual commands/results, and limitations in the same delivery record. Review the requested scope rather than stopping at the first green result.

Compact record shape before checks have run:

```markdown
Work WRK-001 implements Requirement REQ-004 (stated task relation; product.md).
Work WRK-002 implements Requirement REQ-005 (stated task relation; product.md).
Both use selected Decision DEC-003 in delivery.md; work state is planned.
Evidence: no execution evidence yet; filter, caller wiring, and date-display checks remain not run.
Current handoff: Partial. Implementation must inspect actual paths/runner and perform the changes/checks; do not mark these examples Ready for Verification.
```

This is a record fragment illustrating relationships, not a completed implementation artifact. The candidate requires paths and actual command/result evidence when execution occurs. It does not turn the above checklist into proof of delivery.

## Case B: a test cannot start

Fixture request: same change. The required test command exits because the project runner dependency is unavailable. No behavior assertion executes, and installing dependencies has not been authorized.

Author application: record setup failure and the actual error, not a valid RED regression. Inspect permitted project setup information for an existing runnable environment; do not invent a pass, change runner indiscriminately, or remove the check. Continue only independent authorized work that does not depend on the missing result. Final state is Partial or Blocked, with the missing runner and next action identified; never Ready for Verification while a required check is unavailable.

Illustrative human update for an unsaved record:

> The implementation check is blocked because the configured test runner is unavailable; no behavior assertions ran. The unsaved record identifies the setup failure and the need for an authorized runnable environment before verification can be claimed.

The runtime must provide the complete unsaved record after that short update. No save or actual dependency failure is claimed by this walkthrough.

## Case C: local adjustment versus changed direction

Fixture finding 1: the supplied plan names an old helper; current code uses a different established filtering function with the same external behavior. Author application: inspect callers, use the current path, and record the local adjustment without rerunning Planning. Recheck affected behavior and evidence for the changed state.

Fixture finding 2: supplied provider documentation explicitly says the selected endpoint lacks laptop policy, but the selected direction depends on importing it. Author application: link the supplied documentary evidence to the challenged decision; distinguish its scope from a live observation or a claim about all providers. Pause the import increment, preserve independent local-fixture display work, and return the data-source decision to Ideation/Planning. Do not silently substitute manual maintenance, change the requirement, or claim mocks prove integration.

If that finding were merely a timeout, capability would remain unknown. The skill's missing-information boundary prevents treating failed access as confirmed infeasibility.

## Contract review and checks

- The author checked that the skill owns detailed planning for the active increment, keeps remaining scope visible, and explicitly continues beyond the first passing increment.
- Actual state, expected behavior, and evidence are distinct. The walkthrough deliberately does not fabricate RED/GREEN counts, successful writes, or execution results.
- Scope changes, incomplete required checks, concurrent edits, and stale evidence have explicit instructions. Their real runtime handling is not established by this inspection.
- Source attribution and MIT notices are provided with the candidate. No executable helper or new dependency was added.
- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/implementation/implement-increments` returned `Skill is valid!`. Local links in the skill, its references, index, proposal, and walkthrough resolved; Git whitespace checks passed. These structural checks do not establish implementation quality or independent review.
- Pending: actual runtime execution, real-project usefulness, independent maintainer review, and integrated handoff to a future Verification skill. No performance or token-saving claim is made.
