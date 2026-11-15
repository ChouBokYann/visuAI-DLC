# Verify change: author walkthrough

Date: 2026-11-15. The author applied the candidate instructions to the synthetic cases below. These are expected assessment examples and instruction-boundary checks, not observed product tests, independent review, or installed-runtime trials. Actual testing in another project remains deferred.

## A. Passing helper checks, missing user behavior

Fixture: REQ-004 requires members to filter cafes by laptop policy, including unknown. EVD-001 contains a supplied passing helper-test output for committed target T1. The supplied list-view excerpt still calls the helper with only neighbourhood; the policy selection is never passed. The fixture states no project-standard violation. The user requested review, not fixes.

Author application: inspect the helper, caller, requirement, and evidence scope. The helper result supports only its tested behavior. The list wiring shows the requested behavior is incomplete; this is not erased by passing helper tests or standards conformance.

Example record fragment:

```markdown
Requirement REQ-004 (product.md): Not met. The current list caller omits the selected policy; EVD-001 assesses only the helper, not the caller flow.
Finding FIND-001 affects REQ-004 (stated relation): missing policy argument in the list caller prevents the requested filter path. Next owner/action: Implementation connects the actual caller and checks the member flow; retain the existing requirement.
Requirements: Changes required. Standards: no violation identified in the supplied scope, not an exhaustive standards audit.
Overall: Changes required. Target acceptance: Not applicable for this local-only fixture.
```

Illustrative human update:

> The unsaved assessment identifies a missing connection between the policy selector and list filtering, so REQ-004 is not met despite the supplied passing helper tests. Implementation needs to connect and check that user flow; no code was changed by this review.

The complete unsaved record would follow the short response. The excerpt above is illustrative and is not a real saved product assessment.

## B. Evidence reuse and a dirty target

Fixture: baseline B1, target commit T1, current uncommitted edit to the filter predicate, and an unrelated untracked draft. EVD-001 identifies the tested state as clean T1; no command was run after the predicate edit.

Author application: record the requested comparison and relevant dirty state; preserve the unrelated draft. EVD-001 cannot establish the changed predicate's behavior even though HEAD is unchanged. Mark REQ-004 Unverified pending a current check. If the runner is unavailable, overall assessment is Incomplete and the report names the missing runner; do not reuse the old pass or discard the local edit to make the evidence match.

Contrast case: the current artifact and relevant dependency/configuration/environment state match EVD-001, its full command and actual output are available, it covers the criterion, and no project rule requires a new run. The skill permits reuse with the provenance and reused label recorded; it does not require another run merely because a new message is being written. Changing a decision-relevant condition invalidates that conclusion.

Review limitation: this author case exercises the written rule, not actual Git-state inspection or runtime evidence matching.

## C. Local pass with required target acceptance missing

Fixture: REQ-008 includes successful operation in staging against the real provider. Local checks use a provider mock and pass in the supplied record. Staging access is unavailable; the request does not authorize deployment or account changes.

Author application: retain local pass evidence with its limited scope. REQ-008 remains Unverified and target acceptance is Not performed. Overall completion is Incomplete, not Verified within scope disguised as completion of the entire request. Next action names an authorized staging check and its access dependency; no deployment, credential acquisition, or production request is implied.

Illustrative human update:

> The unsaved assessment records the supplied local checks as passing, but required staging acceptance remains unverified because access is unavailable. An authorized reviewer must check the real provider in staging before the full outcome can be claimed.

## D. Changed criteria and corrected findings

Fixture: Implementation proposes dropping unknown-policy support to make the checks pass. No user decision accepts that scope change. Author application: retain REQ-004 and FIND-001; a proposal cannot redefine acceptance. Return the proposed scope change to the appropriate decision rather than marking the finding fixed.

If a separately authorized implementation later corrects the caller at T2, reassess FIND-001 against T2 and affected checks. Keep T1 evidence/history without presenting it as current proof. Unaffected current evidence may still be reusable if its validity is established. Technical reassessment remains distinct from human approval or permission to merge.

## Validation and limits

- Author boundary inspection covers a real user-flow gap despite a supplied helper pass, unchanged HEAD with relevant dirty changes, missing runner, reusable evidence conditions, missing target access, unaccepted criterion changes, and stale review after fixes.
- No runtime test results, Git fixture execution, successful writes to product records, or independent decisions are fabricated by these examples.
- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/verification/verify-change` returned `Skill is valid!`. Local links in the skill, its references, index, proposal, and walkthrough resolved; Git whitespace checks passed. These establish document structure only.
- No helper, dependency, global installation, external publication, or automatic agent delegation was introduced.
- Remaining: installed-runtime behavior, independent maintainer review, human comprehension, and actual project testing. No performance, security-audit completeness, or automatic truth-verification claim is made.
