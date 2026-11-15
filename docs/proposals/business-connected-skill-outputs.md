# Change proposal: business-connected skill outputs

Status: branch implementation explicitly accepted by ChouBokYann in the session on 2026-11-15 ("ok i accept, lets go for it"). Independent review and main adoption remain pending. The user confirmed that skills must supply the documents used by the optional visualization, with business meaning intact. The implementation contract is now [workflow-context.md](../contracts/workflow-context.md); the proposal below records the design rationale and initial acceptance criteria.

## Change and lifecycle process

Cross-lifecycle output convention, beginning with Ideation. Extend existing Markdown records with a small versioned metadata section. Preserve explanatory prose, existing IDs, and one- or two-sentence human handoffs. Generate visualization JSON from the documents; never maintain a second independently editable account.

Affected paths after acceptance: the 19 `skills/**/SKILL.md` entry points and their existing templates/references; shared contract and example under `docs/`; engineering/Symphony workflow references; a bounded exporter/validator and focused tests under `scripts/` and `tests/`; the experiment viewer only through an explicit adapter. Do not rewrite historical `knowledge-v1` fixtures or force their schema onto current skills.

## Problem and need

The current requirements, implementation, and release templates preserve reasons and references, but explicitly define no shared semantic extension. A viewer cannot reliably connect business purpose to delivery and evidence without interpreting prose. Requiring a new document per agent action would recreate the reading burden this project aims to remove.

Concrete need: show that cafe suitability filters aim to reduce search effort, that functional tests cover filtering, and that the business effect remains unmeasured. Preserve that explanation through a changed provider decision, a hotfix, and several agents contributing work.

## Proposed solution

### Authoritative documents and generated views

Markdown with YAML frontmatter remains authoritative. Add a `workflow_context` namespace with `version: 1`, a project ID, and embedded record entries. A document may own several records; there is no one-record-per-file requirement. Store each record once and compute incoming relationships rather than writing reverse links.

Existing prose remains the explanation. Metadata identifies its exact section using a unique explicit anchor. A short record summary is authored once in metadata and reused by code; the prose section supplies deeper rationale, alternatives, tradeoffs, and revisit conditions. Human chat handoffs stay concise. Generated files are marked derived and name their input baseline; they are not edited or fed back as a competing authority.

The server proposal is revised by this decision: any future SQLite store is a rebuildable document projection. Direct agent-to-database canonical writes are outside this proposal. Agents update source documents under workspace ownership rules; the exporter consumes an integrated immutable baseline. Dirty previews must identify their exact content digest and uncommitted state. Server publishing/synchronization requires a later explicit design.

### Small record vocabulary

Common fields: `id`, `kind`, `summary`, `detail` (local anchor), `sources`, and `links`. Sources have a local source ID and a resolvable document reference or explicit supplied-message locator. IDs are project-local and stable across moves, edits, and supersession; preserve existing identifiers rather than renumbering them. No filename-derived identity.

| Kind | Role and additional meaning |
|---|---|
| problem | Who is affected and what is difficult |
| outcome | Intended improvement; measurement is undecided, planned, or observed, with method/context references where known |
| requirement | Necessary behaviour or constraint with accepted/proposed/conditional basis and observable criteria or explicit gaps |
| decision | Proposed/accepted/superseded choice with actual authority source; a relation does not grant acceptance |
| change | Planned/in-progress/implemented work, with exact artifact identity when claiming implementation |
| evidence | Technical or business assessment; target, result, method, observation context, source and limitations |
| release | Planned/submitted/deployed/failed/unknown target delivery; deployed needs observed artifact/environment evidence |

Document lifecycle, work state, decision acceptance, evidence result, and release state remain separate. Technical evidence needs the tested artifact state, including relevant dirty content. Business evidence needs the metric/qualitative method, observation period/population where relevant, and assessed product/release context. An observed measurement is not automatically improvement or causal proof. No invented numeric targets.

| Relation | Allowed source -> target | Meaning |
|---|---|---|
| addresses | outcome -> problem | Intended improvement addresses the problem |
| supports | requirement -> outcome | Behaviour is expected to contribute to the outcome |
| aims_to_achieve | decision -> outcome | Rationale/hypothesis, not demonstrated benefit |
| implements | change -> decision or requirement | Work delivers the specified direction or behaviour |
| evaluates | evidence -> change, requirement, or outcome | Assessment subject; target kind must agree with technical/business scope |
| includes | release -> change | Membership, not proof of deployment |
| supersedes | decision -> decision | Replacement with reason and preserved predecessor |

Each link carries `basis: stated|inferred`, `source` referring to the owning record's source list, and a short `reason`. Confidence or a stated link never substitutes for evidence. Missing business context is recorded as an explicit gap with reason and next action; it does not force an unrelated technical task through Ideation.

### Illustrative document fragment

Synthetic example, not implemented schema or real evidence. Additional records referenced here would be owned by the existing problem, decision, and delivery documents, not duplicated in this brief.

```markdown
---
type: Requirements Brief
title: Find work-friendly cafes
status: draft
workflow_context:
  version: 1
  project: cafe-trial
  records:
    - id: REQ-001
      kind: requirement
      summary: Filter cafes by reported Wi-Fi and power availability.
      detail: "#req-001"
      basis: proposed
      sources:
        - id: need
          ref: "problem.md#outcome-001"
      links:
        - relation: supports
          target: OUTCOME-001
          basis: stated
          source: need
          reason: Narrowing unsuitable options is intended to reduce search effort.
---

<a id="req-001"></a>
## REQ-001: suitability filters

Acceptance proposal: selecting a required amenity excludes cafes reported
without it; missing data is visibly unknown. The intended search-effort
benefit remains unmeasured. Provider coverage needs checking before commitment.
```

### End-to-end sample and expected reading

| Record | Content | Connection |
|---|---|---|
| PROBLEM-001 | Workers struggle to identify suitable cafes | Source of the problem statement |
| OUTCOME-001 | Reduce effort spent finding a suitable cafe; measurement undecided | addresses PROBLEM-001 |
| REQ-001 | Suitability filters, proposed | supports OUTCOME-001 |
| DECISION-001 | Integrate an existing places source; coverage conditional | aims_to_achieve OUTCOME-001 |
| CHANGE-001 | Filter implementation at synthetic revision fixture-v1 | implements REQ-001 and DECISION-001 |
| EVIDENCE-001 | Synthetic passing functional result for fixture-v1, not an actual executed test | evaluates CHANGE-001; technical |

Expected human view: "The sample filters aim to make work-friendly cafes easier to find. Its simulated functional check passes; business benefit has not been measured." The sample label must remain visible. A future real test result replaces simulated evidence only when observed and sourced.

Changing the provider creates a superseding decision with its reason and revisits affected work. It does not erase the original intent or make old evidence apply to a new artifact. A maintenance finding can reopen the decision and link to the existing outcome without generating a new business problem.

### Responsibility across all 19 candidates

| Skill | Contribution; reuse existing records whenever sufficient |
|---|---|
| clarify-problem | Problem and intended outcome, including missing measurement |
| research-solutions | Sources, alternatives and limitations in the existing research brief; no forced new graph entity |
| recommend-solution | Decision, outcome connection, alternatives and revisit conditions |
| define-requirements | Requirements linked to outcomes and grounded decisions |
| clarify-domain-model | Clarified terms/rules attached to affected requirements or decisions |
| set-development-direction | Technical direction as decisions connected to requirements/outcomes |
| assess-change-impact | Explicit affected references and uncertainty; no inferred causal impact claim |
| understand-system | Sourced understanding attached to relevant existing records; standalone explanation remains supported |
| implement-increments | Changes and implementation evidence with decision/requirement links |
| test-an-assumption | Scoped evidence and implications for the tested decision; not automatic business validation |
| refactor-safely | Change, preserved behaviour/constraint and evidence; rationale gap allowed |
| evolve-interface | Interface decisions, consumers, compatibility requirements and changes |
| address-review-feedback | Update affected changes/decisions and evidence; preserve unresolved disagreements |
| handoff-work | References and ownership in the existing work record, without cloning semantic records |
| verify-change | Revision-specific technical evidence, separate business evidence if actually in scope |
| compare-logic | Scoped comparison evidence against intended rules; no automatic correction |
| prepare-release | Release membership and prerequisites; no deployment claim |
| deploy-and-check | Observed release state and target evidence |
| diagnose-issue | Observed failure evidence and affected records; reopen intent only if challenged |

### Export and validation boundary

Reuse existing parsing/validation helpers where compatible after inspecting their supported interfaces; do not silently repurpose historical schema rules. Parse YAML safely without custom executable tags and bound file/record sizes. Reject duplicate YAML keys, duplicate IDs, unknown schema versions, illegal link types, and malformed references. Resolve file references only inside the chosen source root; never read arbitrary paths or fetch URLs while exporting.

Validate a complete baseline before atomic publication. Invalid updates preserve the previous view with its old baseline clearly identified. Partial bundles explicitly list unresolved external IDs and cannot masquerade as complete project coverage. Record absence does not prove lack of impact. Preserve unknown existing metadata when editing documents; unsupported extension versions require an explicit migration.

Conflicting owners/IDs stop integration; do not apply last-writer-wins. Derived JSON carries source paths, anchors, input hashes, project identity, baseline/completeness and validation diagnostics. Source-relative paths remain portable. Viewer prose is assembled from authored summaries and observed status, never hallucinated from file names or transitive paths.

## Scope

Included after acceptance: shared convention, updates to 19 candidate instructions and relevant templates, one coherent synthetic fixture with changed-decision baseline, bounded exporter/validator, adapter to the existing viewer, and focused checks. Only use relevant record kinds; a trivial task can reference existing intent and add one work/evidence entry to its current record.

Excluded: server implementation, database migration, automatic prose extraction, compulsory new reports per task, automatic execution/approval, production ontology engine, public hosting, and live Symphony installation. No change to historical knowledge-v1 data or mandatory migration of unrelated user projects.

## Alternatives and tradeoffs

Keep prose-only: lowest writing burden but relationships require interpretation. Canonical JSON: easy to parse but reverses the user's Markdown preference. One concept per file: reusable identity but more files than required. Proposed embedded records preserve existing document grouping while providing exact identity and connections. Revisit if metadata maintenance outweighs demonstrated reader benefit; templates should replace duplicated prose rather than add a parallel report.

## Tools and services

Existing Markdown/YAML, local validation and test tools; reuse existing parser dependencies if suitable. No new service, credentials, external model calls or data upload. Any new parser dependency needs a pinned version/license and review before introduction. Runtime discovery/installation must include shared references; standalone copied skills need an explicit missing-contract fallback rather than broken relative links.

## Acceptance criteria and validation

- [ ] All 19 skills identify their applicable record contributions, reuse/skip behaviour and missing-context fallback. No task must invent business justification or create all record kinds.
- [ ] Existing templates retain useful content, upstream notices and stable IDs while removing contradictory "no semantic extension" wording only where replaced by the accepted convention.
- [ ] A complete cafe fixture exports a trace from problem through outcome, decision/requirement, change and evidence. A second baseline changes a decision without losing original rationale or overstating evidence freshness.
- [ ] Tests reject duplicate keys/IDs, dangling complete-baseline links, invalid type pairs, path escape, unknown versions, missing evidence context and conflicting owners. Partial exports expose omissions. Failed export leaves prior valid output intact.
- [ ] Derived summaries distinguish technical pass from unmeasured business benefit; measured-but-unimproved outcomes and missing rationale remain explicit. Submitted markup stays inert.
- [ ] Six scenario walkthroughs cover hotfix, feature, design change, new module, modularisation and logic comparison, including a small task with no new business document and a concurrent handoff preserving ownership.
- [ ] Export includes enough source provenance to rebuild and navigate the same meaning; editing generated JSON is never a supported authoring path. No test claims semantic truth from parse success.
- [ ] Check skill format, local links, existing regression tests and focused exporter tests. Browser checks and real-project comprehension testing are reported separately; the user's deferred real-project trial remains deferred.

## Ownership and dependencies

Human owner/proposer: ChouBokYann. Proposed independent reviewer: Perryong. Agent responsibility: implement the accepted branch scope, validate it, and reconcile the pending server proposal. Implementation responsibilities and paths are listed above; shared metadata contract has one writer/integrator.

Related historical issues: [#1](https://github.com/ChouBokYann/visuAI-DLC/issues/1), [#11](https://github.com/ChouBokYann/visuAI-DLC/issues/11), [#12](https://github.com/ChouBokYann/visuAI-DLC/issues/12). These are deferred, not grants. Current candidate exploration relates to [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7).

The user's latest request establishes the desired change; independent issue acceptance remains required by [workflow.md](../../workflow.md). Review must explicitly reconcile this bounded extension with main's skills-first NORTHSTAR before implementation. This draft does not revise NORTHSTAR or claim approval.

## Sources, impact, and risks

Basis: current skill templates and user discussion. Historical [knowledge-v1](../contracts/knowledge-v1.md) informs provenance and typed-edge concepts but is not adopted or modified. No external code copied; existing upstream notices remain in place. This draft claims neither OKF conformance nor compatibility with its deferred validator.

Risks: duplicate meanings in prose and metadata, over-documentation, missing shared references in installed skills, and summaries hiding uncertainty. Mitigate through single ownership, exact anchors, narrow per-task updates and explicit gaps. Rollback retains readable Markdown and disables derived export; existing historical fixtures remain untouched.

## Open questions

Acceptance needed for this proposed output convention and scoped NORTHSTAR exception. The precise parser implementation and dependency version must be checked during implementation preparation; no dependency is selected here. Server ingestion, identity and deployment are later decisions after document-to-view correctness is demonstrated.

## Implementation handoff

The user explicitly accepted branch implementation after the draft. The executable boundary is defined by [workflow-context.md](../contracts/workflow-context.md), including exact states, fields and limits; it supersedes illustrative incomplete fragments above. See [observed checks and limitations](business-context-validation.md). Independent review and main adoption remain outstanding; no claim of an issue approval by another maintainer is made.
