# Complete engineering-workflow validation

Status: accepted for local execution, 2026-11-22. ChouBokYann explicitly answered "Approve the full local scope and waive those gates" to this proposal's approval question. User goal: finish validation/testing and identify/fix workflow gaps for features, bugs, project-aligned tests and avoiding AI-generated busywork. No visualization work. This is not independent maintainer review, main adoption or publication authority.

## Change and lifecycle process

Validate and tighten the existing requirements → direction → implementation → verification → handoff workflow. Prefer small changes to existing skills rather than adding another framework or a new skill for every finding. Use the current checkout including the approved UI-direction addition as the target; identify differences from c276159, which earlier experiments used.

## Problem and evidence

- Earlier experiments cover feature work (E03/04, E08), seeded defect repair (E05), coordination/resumption (E06), local release/recovery (E07), and host/sandbox compatibility (E09–11). Those are bounded observations, not proof of all workflow paths.
- Current root HEAD is4f170cf with approved uncommitted UI-direction changes. Several later experiments used c276159, which also contains coordination and user-journey skills absent here. Do not count those as current-checkout capabilities or silently import visualization work.
- implement-increments already rejects implementation-derived expected values and unrelated red failures. verify-change already requires revision-linked evidence. The gap is operational guidance and demonstrated selection of test oracles, realistic boundaries and fault controls, especially for a tests-only task.
- E11 showed that a passing browser assertion can inspect an old ready state, and source fixes change the artifact identity even when earlier live checks passed. Existing records must not be flattened into a generic green result.
- GitHub search returned #7 as related SDLC selection context; no explicit acceptance of this scope was found. Deferred Graphify/visualization proposals are irrelevant.

## Proposed solution and scope

1. Record the authoritative skill/file baseline and reconcile prior experiments with their real source/evidence. Preserve old failures and version-specific limits.
2. Run representative feature, defect and tests-only exercises against isolated copies of existing small project modules, plus pressure walkthroughs for ambiguous requirements, conflicting tests, unavailable services, delegated choices and overbuilding.
3. Tighten existing guidance only where inspection or an observed exercise establishes a gap: deriving expected outcomes independently, mapping tests to actual project behavior, choosing the real boundary, detecting known plausible faults, preserving baseline failures, and matching evidence to the final artifact.
4. Make minimal-change quality observable: reuse existing capabilities; no speculative abstractions/dependencies/generated layers; no fake TODO completion; no irrelevant tests, invented criteria or canned certainty. This applies to code and reports, not merely visual style.
5. Re-run affected scenario checks and inspect the final integrated skill routes. Produce one current coverage/limitations record, without claiming an exhaustive proof of all engineering problems.

### Representative executable cases

- **Feature:** isolated copy of the existing document-chatbot candidate. Add a specified filename-filter behavior to the document-list API, with exact examples, combined existing behavior and no live model dependency. Prove missing behavior before implementation and preserve unrelated chat/source semantics.
- **Bug:** isolated existing cafe shortlist module. Seed a last-item persistence defect; reproduce at the storage boundary, diagnose, apply the smallest correction, and run unchanged regression plus related existing checks. Retain denied-write behavior.
- **Project-aligned tests:** assess intentionally weak assertions (mirrored expectation, mock-only integration claim, stale-ready-state check) against externally specified outcomes. Run positive controls and targeted known-fault variants; a test must detect its intended fault while accepting the correct behavior. Mutants are temporary isolated fixtures, not production edits or a universal mutation-coverage requirement.
- **Final artifact:** E11 candidate's live inference/recovery evidence remains distinct from releaseA. Determine which checks are reusable by exact changed behavior and which need a rerun. Do not reset E11 budgets or invent new live evidence. If a live candidate rerun remains required, make that bounded action concrete separately before any paid/authenticated inference.

## Outputs and owned paths

Human owner: ChouBokYann. Agent responsibilities: baseline/evidence audit, fixture authoring and execution, minimal skill edits, review and report. Preserve unrelated current changes.

- output/workflow-validation/**: acceptance ledger, pinned fixture copies, test harnesses, raw evidence and current report.
- Existing skills/ideation/define-requirements/SKILL.md, skills/maintenance/diagnose-issue/SKILL.md, skills/implementation/implement-increments/SKILL.md, skills/verification/verify-change/SKILL.md: only demonstrated gaps, retaining their existing contracts and attribution.
- docs/workflows/engineering.md and docs/workflows/deliver-change.md: tests-only route and relevant handoff integration; preserve the approved UI-direction route.
- docs/proposals/workflow-validation.md: portable final scope, observed evidence and remaining limits.
- No change to visualization/exporter code, canonical business schemas, NORTHSTAR, AGENTS, earlier experiment source/evidence or adoption status of unrelated candidate skills.

## Alternatives and tradeoffs

Documentation-only review is cheaper but cannot show that selected tests detect real defects. Repeating all old trials would spend effort on valid unchanged evidence and infrastructure rather than current workflow gaps. A new orchestration/testing framework would add obligations without evidence of need. Selected approach combines reuse, targeted executable cases and independent walkthroughs, making any limits explicit.

## Tools, services, permissions and bounds

Use installed Node/Python and existing locally installed TypeScript tooling where needed; no downloads or global settings changes. Copies/tests stay within the project workspace and tool execution sandbox. OpenShell and design specialists are optional capability notes, not mandatory core dependencies. No new Docker service, real documents, external writes, paid inference, credentials, commits, pushes or merges are authorized by this proposal.

Ordinary deterministic local test/fix cycles are allowed until the stated acceptance criteria hold; no arbitrary two-attempt ceiling is proposed. Explicit pre-existing experiment limits remain binding. Optional fresh-agent scenario/review runs follow the installed skill-writing/verification process and do not impersonate human approval. Preserve failed outputs and do not repeat identical failures without new evidence.

## Acceptance criteria

- [x] Current baseline, previous experiment pins and differing capabilities are explicit; no historical pass promoted to the current state without evidence.
- [x] A feature exercise carries user intent through independently specified outcomes, smallest change and meaningful integration checks.
- [x] A bug exercise reproduces the actual symptom, distinguishes the cause, repairs it and passes the same regression plus relevant checks.
- [x] Tests-only exercise uses project-derived expectations and detects each selected plausible fault; failures/skips/mocks are accurately classified.
- [x] Ambiguous requirements, conflicting existing tests, stale assertions/evidence, unavailable integrations, no-op work and overbuilding scenarios have observed walkthrough results and appropriate scope/authority handling.
- [x] Any canonical guidance changes are minimal, source-attributed where adapted, linked correctly and tested in fresh walkthroughs; no mandatory external tool or visualization work added.
- [x] Final report maps the full user goal to authoritative evidence, distinguishes technical evidence from human acceptance, and lists any remaining missing capability without calling the goal achieved prematurely.

## Sources and open decision

Project NORTHSTAR/workflow/AGENTS, current skill files, E03–E11 raw records where relevant, prior UI-direction walkthrough and existing source tests. Unlazy supplies a completion ledger; existing skill-writing process supplies before/after walkthroughs. Do not import arbitrary external framework rules. Preserve existing notices when adapting text.

Approve this scope and explicitly waive issue-first/other-maintainer gates for this local validation and targeted workflow refinement, or obtain the normal maintainer acceptance. This one decision covers the full listed deterministic validation/edit scope; it does not grant external publication or reset earlier experiment budgets.

Completion evidence: [current report](../workflow-validation/REPORT.md) and [ledger](../workflow-validation/GATES.md). Fresh reviewer confirmed its sole F4 coverage gap was corrected.
