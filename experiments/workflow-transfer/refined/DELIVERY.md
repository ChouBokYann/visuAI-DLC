---
type: Delivery Record
title: Synthetic safe batch rename CLI
status: draft
workflow_context:
  version: 1
  project: workflow-transfer-refined
  records:
    - id: REF-REQ-001
      kind: requirement
      status: accepted
      title: Preview and safely reverse CSV renames
      summary: Preserve file contents while previewing, applying and undoing a validated batch.
      detail: "#requirement"
      acceptance: Observable behavior in BRIEF.md, including failure recovery and link rejection.
      gap: No separate measured business outcome was supplied; user trust remains an intended quality, not a measured result.
      sources:
        - id: brief
          ref: BRIEF.md
      links: []
    - id: REF-CHANGE-001
      kind: change
      status: implemented
      title: Standard-library rename CLI
      summary: Validates batches and content state, stages cyclic renames, and records recovery states.
      detail: "#implementation"
      revision: "local non-Git rename.py SHA256 bc929cedf441ca3f66777358b023c37a1284fa1d4a89d7e4e1136a30f287a2cc"
      sources:
        - id: brief
          ref: BRIEF.md
      links:
        - relation: implements
          target: REF-REQ-001
          basis: stated
          source: brief
          reason: Implements the three fixed commands requested by the synthetic task.
    - id: REF-EVIDENCE-001
      kind: evidence
      status: inconclusive
      title: Windows synthetic acceptance checks
      summary: Seventeen checks passed; the live symlink check could not run without Windows privilege.
      detail: "#verification"
      scope: technical
      method: "python -B experiments/workflow-transfer/refined/app/run_checks.py from repository root"
      context: Windows 11 build 26200, Python 3.12.7; isolated synthetic directories only.
      limits: Symlink runtime acceptance missing; author self-review only; no crash, power-loss or concurrency guarantee.
      testedRevision: "local non-Git rename.py SHA256 bc929cedf441ca3f66777358b023c37a1284fa1d4a89d7e4e1136a30f287a2cc"
      sources:
        - id: results
          ref: app/test-results.txt
        - id: identity
          ref: app/evidence.json
      links:
        - relation: evaluates
          target: REF-CHANGE-001
          basis: stated
          source: results
          reason: Runs the CLI from a different cwd, checks actual filenames and bytes, and injects filesystem failures.
---

# Synthetic safe batch rename CLI

**Current verdict: Incomplete.** Implementation and available checks are complete; live symlink rejection remains unverified because Windows refused creating the synthetic link (WinError 1314). Next action: an authorized reviewer should rerun the existing suite where creating synthetic symlinks is permitted, then assess the CLI and this record. No human acceptance or production authorization is claimed.

<a id="requirement"></a>
## Objective and authority

[BRIEF.md](BRIEF.md) is the original task and criteria. Human owner: ChouBokYann. Authorization is the user-approved local synthetic workflow comparison recorded in the brief and parent task assignment. It permits this condition's app, tests, synthetic fixtures and delivery/handoff only. No Git, external service, dependency, evaluator, other condition, real personal files or production changes were used. The worker owns those local artifacts; maintainer adoption and independent review remain pending.

The person tidying a folder needs a faithful preview and recoverable operation. The dominant quality failure would be a plausible preview followed by content loss during a swap or failed move. Actual round-trip filename/byte assertions and injected failures assess this risk, rather than treating valid JSON as sufficient evidence of safe behavior.

<a id="implementation"></a>
## Implementation and decisions

[app/rename.py](app/rename.py) implements the fixed preview/apply/undo interface with Python's standard library. A preview validates the complete batch before writing its new plan; input order is retained, actual on-disk source spelling is stored, and SHA-256 plus size fingerprints capture content state. Apply revalidates names, root, fingerprints and conflicts. Windows filename restrictions and conservative case-folded collision keys reject unsafe names. Directories and reparse-point/link sources or targets are rejected by inspection. CSV may be inside ROOT; PLAN/JOURNAL must be outside.

Every source moves to a unique staging filename before any final destination is populated. This supports swaps, longer cycles and case-only changes. A reverse move log restores original names on an exception, including an exception while recording successful metadata. A failed rollback reports the failed moves and recovery paths; it never reports success. Journal states are applying/completed/failed/undoing/undone/undo_failed. Plans record ready/applying/applied/failed so repeated attempts are refused. Failed plans require a fresh preview; failed undo requires inspection rather than an automatic repeat.

The alternative of directly renaming each CSV row would break occupied cycles; copying contents would add unnecessary writes and recovery complexity. Staging is the smallest shared operation for apply and undo. Metadata updates replace only this operation's existing owned artifacts; initial plan and journal creation is exclusive and refuses existing paths. Crash durability, locking and a database are outside the brief, so those mechanisms were omitted.

Affected interfaces are the three commands, app-local tests, evidence runner and these records. No external callers/configuration/exports were introduced. The starting application was a 92-byte not-implemented stub; no unrelated code was overwritten. No Git inspection was allowed: exact local file hashes identify the assessed state.

<a id="verification"></a>
## Verification

Author self-review, not an independent review. Command from repository root:

```powershell
python -B experiments/workflow-transfer/refined/app/run_checks.py
```

Observed result: exit 0, **18 tests run, 17 passed, 1 skipped**. See [raw results](app/test-results.txt), [environment and SHA-256 identity](app/evidence.json), and [test source](app/test_rename.py). Tests invoke the actual CLI with a different working directory and assert parsed JSON, exit status and actual file bytes. Fault-injection cases call the same application functions with a single filesystem operation deliberately failing. They do not prove real disk-failure or process-death recovery.

| Brief criterion | Evidence | Result |
|---|---|---|
| Ordered preview without ROOT writes; valid JSON; reusable plan | swap_roundtrip, unicode_quoted_and_cycle | Met |
| Missing/duplicate/invalid/traversal/absolute/reserved names and unrelated collisions | invalid_batches, directories | Met |
| Symlink source/target refusal | Code inspection of linked/digest/validate; live test skipped with WinError 1314 | Unverified at runtime |
| Swaps/cycles, quoted commas, Unicode, case-only rename | swap_roundtrip, unicode_quoted_and_cycle, case_only_roundtrip | Met |
| Detect missing/changed sources, new conflicts, wrong root and modified plan inputs | missing_after_preview, stale_source, new_conflict, wrong_root, tampered_plan | Met |
| Preserve exact bytes and unrelated files | listing comparisons in round trips and failure tests | Met |
| Mid-batch failure restores original data and records failed state | mid_batch_rollback, metadata_finish_failure_rolls_back | Met for injected one-shot failures |
| Safe undo refusal after edits/new occupants, repeated undo refusal | undo_modified, undo_occupied, swap_roundtrip | Met |
| Undo failure restores applied state and records failure | undo_fault_rolls_back | Met for injected one-shot failure |
| Existing plan/journal preserved; repeated apply refused | artifacts_not_overwritten, swap_roundtrip | Met |
| Fixed CLI works from another cwd; UTF-8 data | subprocess harness, Unicode case, CSV inside ROOT case | Met |

Original quality target: trustworthy preview and recoverability are supported by inspected output/state assertions, not by actual user testing. User acceptance remains pending. Project standards: supplied skill process and explicit metadata/handoff followed; no external exporter run because broader repository access is outside trial scope. Target-environment acceptance: **Not performed in full**, due to missing live symlink evidence, despite the other checks running on actual Windows.

Historical evidence: baseline suite against the supplied stub ran 10 tests with eight failures and one import/SystemExit error; successful-path assertions failed because the implementation returned Not implemented. The baseline invalid-input test passed vacuously and is not proof of validation. Current evidence supersedes that baseline. Initial implementation passed its first ten checks. One local correction removed an unnecessarily strict CSV-outside-ROOT constraint and expanded checks; the current suite then passed with the noted skip. No failing current criterion was weakened.

## Limits and budget

No protection is promised against process termination, power loss or concurrent filesystem writers. Persistent filesystem failure may prevent rollback or metadata writes; error messages expose that limit and recovery paths. Journals/plans are editable local records, not authenticated approvals. Case-folding is deliberately conservative and may decline some names Windows could distinguish. Junction/reparse handling is code-inspected, not exercised with a privileged live link fixture. No real-user usability study or independent human review occurred.

Initial allowance: one autonomous attempt, ten wall-clock minutes, maximum two local correction rounds. Used: one initial attempt and one local correction; remaining: one correction within the original time allowance only. No extension or parent correction received. Stop reason: available implementation/check work finished and unresolved live-link check requires an unavailable Windows privilege; this is not a completion claim for the full acceptance set. Budget does not reset at handoff.

Implementation handoff state: **Partial**, because required live-link evidence is missing. No other known implementation defect was established by current checks. The next reviewer must assess that limit before upgrading the overall verdict.
