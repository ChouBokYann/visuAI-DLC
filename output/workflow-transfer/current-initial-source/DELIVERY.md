---
type: Delivery Record
title: Synthetic safe batch rename CLI
status: draft
workflow_context:
  version: 1
  project: workflow-transfer-current
  records:
    - id: CURRENT-REQ-001
      kind: requirement
      status: accepted
      title: Preview and recover a safe Windows rename batch
      summary: Validate a CSV batch, preserve bytes while applying cycles, and safely undo it.
      detail: "#requirement"
      acceptance: The fixed interface and safety behavior in BRIEF.md hold for synthetic files.
      gap: No measured business outcome is supplied; this is a local technical trial.
      sources:
        - id: brief
          ref: BRIEF.md
      links: []
    - id: CURRENT-CHANGE-001
      kind: change
      status: implemented
      title: Standard-library rename CLI
      summary: Added preview, staged apply with rollback, and validated undo.
      detail: "#implementation"
      revision: "local-uncommitted rename.py sha256:c9f896a942fecf1ef42314d66d92b37dd214bdffb3ef8b0ed2b1c986cf4901e0"
      owner: ChouBokYann
      sources:
        - id: brief
          ref: BRIEF.md
      links:
        - relation: implements
          target: CURRENT-REQ-001
          basis: stated
          source: brief
          reason: Implements the expressly authorized synthetic CLI interface and safety behavior.
    - id: CURRENT-EVIDENCE-001
      kind: evidence
      status: inconclusive
      title: Windows author verification
      summary: Ten tests passed; one real symlink test could not run due to missing Windows privilege.
      detail: "#verification"
      scope: technical
      method: Python unittest subprocess CLI tests plus injected filesystem and journal-write failures.
      context: Windows 11 build 26200, Python 3.12.7; synthetic fixtures under app only; author self-review.
      limits: Symlink runtime rejection remains unverified; no concurrency, process termination, or power-loss protection claimed.
      testedRevision: "local-uncommitted rename.py sha256:c9f896a942fecf1ef42314d66d92b37dd214bdffb3ef8b0ed2b1c986cf4901e0"
      sources:
        - id: verification
          ref: "#verification"
      links:
        - relation: evaluates
          target: CURRENT-CHANGE-001
          basis: stated
          source: verification
          reason: Checks actual CLI behavior and file contents at the recorded source hash.
---

# Delivery

<a id="requirement"></a>
## Requirement and scope

[BRIEF.md](BRIEF.md) is the authorized local synthetic task. Human owner: ChouBokYann. Agent responsibilities: app/rename.py, app-local tests and synthetic fixtures/evidence, DELIVERY.md, HANDOFF.md. No production adoption, Git operations, dependency installs, external access, evaluator inspection, or other condition changes were authorized or performed. The provided initial app was a 92-byte stub that always emitted Not implemented. There were no pre-existing delivery or handoff records.

The intended benefit is understandable preview and recovery without losing file contents. This trial measures technical behavior, not actual user confidence or business improvement.

<a id="implementation"></a>
## Implementation and decisions

[app/rename.py](app/rename.py) implements the fixed preview/apply/undo commands using Python's standard library. Plan and journal paths must be outside ROOT. CSV is read as UTF-8 (optional BOM accepted); output records are explicitly UTF-8; stdout escapes Unicode so JSON remains reliable with Windows console encodings. Preview exposes changes in CSV request order. Saved plans canonicalize actual source spelling and store SHA-256 content fingerprints. All validation completes before file mutations. Windows invalid and reserved names, case-insensitive duplicate names, missing files, links/directories, and unrelated occupied targets are rejected.

Temporary names inside ROOT permit cycles and case-only renames. Rollback first restages surviving files, then restores their original names, so restoration also handles cycles. Failed recovery reports surviving locations and failures rather than promising success. This was chosen over direct sequential renames because direct renames cannot safely implement occupied swaps. No backup database or service was introduced.

A successful apply sets the plan to applied and the journal to completed. Undo validates the reversed batch and fingerprints, then sets the journal to undone. Failed mutation attempts set the journal to failed with the error. Validation refusals leave the prior historical state unchanged. Existing plan/journal files are never implicitly replaced by a new preview/apply; updating the operation's own existing state uses a temporary UTF-8 JSON file and atomic replacement. A failed journal is retained for diagnosis; a retry uses a fresh journal after inspecting recovery. Plans are local trusted workflow artifacts with input validation, not signed authorization tokens.

Affected interfaces: the three CLI commands and tests invoking them; no external callers, exports, dependencies, or config were introduced. Test fixtures are created and removed under app. The only persistent app artifacts are source, tests, and evidence.

<a id="verification"></a>
## Verification and current verdict

**Overall: Incomplete.** Implementation is present and the ten runnable tests pass, but real symlink rejection lacks runtime evidence because this account cannot create symlinks (WinError 1314). This is author self-review, not independent review or human acceptance. Implementation handoff state: **Partial**, solely because that required check remains unavailable.

Command: `python -B experiments/workflow-transfer/current/app/test_rename.py`

Evidence: [test transcript](app/test-results.txt), [exact tested hashes and environment](app/tested-state.json), [test source](app/test_rename.py). The final subprocess exited 0: 11 discovered, 10 passed, 1 explicitly skipped. The tested production source SHA-256 is `c9f896a942fecf1ef42314d66d92b37dd214bdffb3ef8b0ed2b1c986cf4901e0`; test source SHA-256 is `800a0781b25758d9b5a93a340ce254c567a059877df4f4b9d8fef1beb3b5ada6`. No production edits followed these checks.

| Criterion from brief | Evidence / result |
|---|---|
| Fixed CLI, JSON stdout, nonzero failure, execution from another cwd | Met: subprocess tests parse JSON and assert exit code from a synthetic fixture cwd. |
| Preview is non-mutating and exposes ordered changes | Met: before/after byte snapshots and exact changes assertions. |
| Invalid names, duplicates, missing sources, occupied destinations, empty/no-op rows | Met: table of negative batches plus directory destination test. |
| UTF-8 names and quoted CSV commas | Met: swap includes a,é.txt with embedded zero-byte file content. |
| Swaps, larger cycles, and case-only renames | Met: two/three-cycle and a-to-A apply/undo snapshots. |
| Changed source, missing source, new destination conflict, different root | Met: separate negative apply checks. |
| Loaded plan is revalidated | Met: malformed JSON/type and traversal target tampering rejected. |
| Preserve bytes and unrelated files | Met: exact binary snapshots including unrelated keep file. |
| Mid-batch rollback and journal failure rollback | Met: injected third rename and journal completion-save errors; original bytes/names restored and failed state retained. Error injection wraps real file moves. |
| Existing records and replay | Met: existing plan/journal bytes preserved; same applied plan refused even with another journal path; repeated undo refused. |
| Undo modified output / unrelated original-name occupant refusal | Met: unchanged snapshots after both refusals. |
| Source and target symlink refusal | Unverified runtime: test skipped due to WinError 1314. Inspection confirms explicit is_symlink checks before hashing/rename; inspection is not a runtime substitute. |
| Clear recovery limits and state | Met by code inspection and injected recovery success; persistent rollback failure and disk-full recovery were not experimentally exercised. |

Requested experience quality: structured preview and actionable conflict/failure strings were inspected; no human usability study was requested or performed. Functional requirements have the link-test evidence gap above. Project standards: authorized isolated paths, stdlib only, explicit ownership, runnable tests, exact identity and linked handoff are present. Target-environment acceptance: **Not performed for the full scope**; executed subset ran on Windows 11 / Python 3.12.7. Human review and production approval remain pending; neither is implied by tests.

## History, budget, and next action

Initial tests against the stub: seven tests ran, six failed on valid previews reporting Not implemented; the negative-only test passed without establishing useful stub behavior. [Baseline transcript](app/baseline-tests.txt) retains that evidence. Initial implementation passed all seven tests. The evidence expansion added malformed input, real symlink, three-cycle, and commit-failure checks; it found no code defect and yielded the final ten passes plus one skip. No local corrective production edit was needed.

Budget: one initial autonomous attempt, ten-minute wall limit; zero of two local correction rounds consumed. There is no active refinement reservation or pending implementation change. This attempt stops with missing host capability, not fabricated verification. Parent-coordinated future correction has its own stated six-minute allowance only if assigned; this document does not authorize another round.

Next action: a fresh reviewer should read HANDOFF.md, verify hashes, then rerun the existing symlink test in an authorized Windows environment able to create file symlinks. Do not install or elevate privileges merely to change this verdict. If it passes, rerun the complete small suite and update this same evidence entry. No new feature work is needed.

Known limits: no process termination, power-loss, or concurrent-writer guarantees; races between validation and rename are explicitly outside this brief. If storage prevents journal recovery writes, stderr is not used for the error: JSON reports the failure and calls for manual file inspection. No guarantee covers adversarial edits to plan/journal metadata or NTFS reparse types other than the tested/checked ordinary symlink/directory cases. Persistent recovery failure paths were inspected, not executed. No cross-platform compatibility claim.
