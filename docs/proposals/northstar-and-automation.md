# [Proposal] Adopt the north star and coordinated delivery contracts

> **Historical / deferred as of 2026-11-07.** Superseded proposal. Its acceptance checklist and activation instructions are historical and must not be used to activate visualization, record, or automation requirements. Current direction: [NORTHSTAR.md on main](../../NORTHSTAR.md). Earlier status statements and requirements below describe the original proposal only.

Status: local proposal draft, 2026-11-04; not published or independently reviewed.

## Change and lifecycle process

Establish project direction and common contracts spanning all six lifecycle processes, primarily ideation/planning and verification. Draft artifacts: [NORTHSTAR.md](../../NORTHSTAR.md), [methodology](../contracts/methodology.md), and [development rules and automation](../contracts/automation.md).

## Problem and need

Multiple agents can deliver technically correct work without preserving its effect on the overall outcome. The current workflow defines human review but lacks coordinator work grants, reproducible checkpoints, consistent impact navigation, and the requested `reviewed` signal. A returning maintainer needs to understand the changes without replaying every conversation.

## Proposed solution

Use one north-star document for product purpose and success, one product-method specification for lifecycle/checkpoint/impact records, and one development-rules contract containing the coordinator readiness rubric and automation authority/state protocol. Keep the platform optional and canonical records readable. Retain independent maintainer review; only ChouBokYann authorizes merging into main.

## Scope

- Included now: reviewable document drafts, cross-links, source references, role identities, acceptance scenarios, and this completed proposal.
- Adoption change after review: mark approved revisions, link NORTHSTAR.md and contracts from README.md and AGENTS.md, and update workflow.md to use the defined review/dispatch/merge rules. Reconcile the existing knowledge contract without silently extending its schema.
- Excluded: scheduler implementation, GitHub mutations/settings, live worker dispatch, platform/UI, language selection, schema migration, dependency installation, upstream skill copying, commits/pushes/merges.

## Alternatives and tradeoffs

1. Expand only README.md: smallest file count but mixes stable purpose with detailed execution rules.
2. North star plus linked contracts (drafted): separates purpose from protocol while retaining one source per rule; requires cross-link and consistency checks.
3. Build a platform or orchestration service first: postpones agreement on semantics and introduces unnecessary dependencies; defer until contracts are demonstrated.

The coordinator selected option 2 as a drafting choice under the user's request to create the documents; this is not a claim of independent adoption approval. Revisit if maintainers cannot follow the linked documents without excessive navigation.

## Tools and services

Markdown and Git for local drafting; read-only GitHub access to existing issues/comments and public web source inspection. No new runtime, paid service, private-data model integration, or credentials needed. Future automation permissions and hosting are separate scope. No GitHub posts are authorized by this draft.

## Acceptance criteria and validation

- [ ] North star explicitly covers clarity, completeness, accuracy, checkpointing, impact, zoom, and optional lightweight platform.
- [ ] Core method remains usable without the platform; Rust remains a candidate rather than an unsupported performance guarantee.
- [ ] Digital-thread and C4 meanings connect without adding invalid knowledge-v1 schema fields.
- [ ] All six lifecycle handoffs and skill adoption/pinning rules are defined.
- [ ] Product direction is separate from development governance; the coordinator rubric lives in the development rules and requires source-backed evidence against every accepted criterion.
- [ ] ChouBokYann and perryong are the reviewers, independent review is preserved, and only ChouBokYann grants merge permission.
- [ ] `reviewed`, other feedback, stale reviews, unresolved findings, scope changes, and exact merge revision are handled explicitly.
- [ ] Work grants, overlap protection, leases, interruption, recovery, duplicate events, and completion have defined behavior.
- [ ] A second reader reviews the walkthrough/scenarios and records gaps; document validation is distinguished from execution of future runner tests.
- [ ] Local links and whitespace checks pass; adopted documentation is consistent across README.md, AGENTS.md, workflow.md, and contracts before activation.

Example: an agent changes dependency presentation between two checkpoints. The coordinator traces it to the goal, checks affected architecture and verification, returns a failed criterion, then requests human review after correction. perryong comments `reviewed` on the current delivery request for ChouBokYann-sponsored work. The issue remains open until ChouBokYann grants merge permission, the reviewed head is merged, and accepted criteria are satisfied. A new commit invalidates the old delivery review/merge permission. Missing approval leaves work waiting; it never becomes implied consent.

## Ownership and dependencies

- Human owner/proposer: ChouBokYann; independent reviewer: perryong.
- Coordinator responsibility: draft and inspect the four files listed here, preserve existing contributor work, present evidence and outstanding adoption decisions.
- Affected draft paths: NORTHSTAR.md, docs/contracts/methodology.md, docs/contracts/automation.md, docs/proposals/northstar-and-automation.md.
- Future adoption paths: README.md, AGENTS.md, workflow.md, and these drafts; knowledge-v1.md only if needed for explicit cross-reference reconciliation.
- Related: [issue #1](https://github.com/ChouBokYann/visuAI-DLC/issues/1), [issue #3](https://github.com/ChouBokYann/visuAI-DLC/issues/3), and the separate local Graphify integration proposal. None is approval for this contract change.
- Draft baseline: ca95cc8fa811b051e22e0c2ae946132743d3358b; existing .bench-run/ and output/ work is outside this draft's ownership.

## Sources, impact, and risks

Primary requirements: the current user/coordinator conversation, including the explicit colleague identity perryong, and repository README/workflow/knowledge contract. External conceptual references are linked in the drafts. No third-party code or substantial prose copied; exact upstream skill revisions and licenses must be checked before future adoption.

Risk: review semantics could be ambiguous without stage/revision binding; the draft resolves this using a current review request and exact standalone `reviewed`. Another risk is treating prose as enforcement: no daemon, branch protection, or runtime validation is installed. Rollback of a draft removes only these documents; adopted rule changes require explicit human review and reconciliation of active grants.

## Open questions and activation

Draft validation on 2026-11-04: all local Markdown link targets in the four draft files resolve; no trailing whitespace found; `git diff --check` passed for tracked changes (the drafts are untracked, so their whitespace was checked separately). This is document hygiene evidence, not human acceptance, a user comprehension test, or a runner conformance test.

A separate agent performed a read-only builder review of the drafts. It identified two material ambiguities: merge-permission comments being mistaken for revision feedback, and disclosed unmet criteria potentially passing readiness. Both were resolved by explicit protocol-event handling and a rule that unmet required criteria fail readiness unless scope is formally revised. This agent review does not substitute for perryong's independent maintainer review.

No missing identity remains. The exact-match review convention, one eligible independent reviewer, source identification for pstack, and proposed durable merge-permission record are explicit drafting interpretations for maintainer review. No runtime language or performance budget is selected.

Publish this proposal only on authorization. Follow the current workflow's independent acceptance process to adopt it; the draft cannot approve itself or retroactively bless old work. The adoption PR must update the entry points and replace conflicting review language in the same change, then receive explicit ChouBokYann merge permission. Pin the adopted contract revision for new grants and explicitly reconcile any active grants. Until then, existing repository contracts remain in force, supplemented by explicit user instructions in this session.
