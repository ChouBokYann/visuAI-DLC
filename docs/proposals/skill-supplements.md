# Proposal: optional skills around the lifecycle core

Status: first six supplements have branch candidate implementations under [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7); independent acceptance and real-project evaluation remain pending. Conditional additions remain proposals. Basis: [library comparison](skill-library-comparison.md) and [426-entry source inventory](skill-catalogue-comparison.csv).

Branch trial update: the user's subsequent "try it" authorizes candidate implementation of `understand-system`, `assess-change-impact`, and `handoff-work` on `first-iteration`. Human owner: ChouBokYann. Agent scope: those three skill folders, their process navigation, this status, and one combined walkthrough record. No helpers, runtime configuration, external publication of issues, or other supplements are included. This session authorization is not independent maintainer acceptance or permission to merge. See [trial evidence and limits](supplements-first-batch-walkthrough.md).

Second batch: the user's "continue" authorizes `clarify-domain-model`, `address-review-feedback`, and `test-an-assumption` on the same branch. Human owner remains ChouBokYann; agent scope is these three folders, Ideation/Implementation navigation, this status, and the [second-batch walkthrough](supplements-second-batch-walkthrough.md). No helpers, dependencies, other-project installation, or conditional supplements are added. Independent review and main merge permission remain pending.

## Change and lifecycle process

Retain the ten core skills. Add independently usable supplements, each with one primary process folder and links from other relevant processes. Begin with six candidates; evaluate risk-specific additions separately. This is a proposed sequence, not a fixed target skill count or a mandatory execution sequence.

## Problem and need

A person entering an established project may need to understand an existing flow, assess a change, resolve a reviewer disagreement, or resume interrupted work. The current broad core can accommodate these tasks, but does not provide a focused method and discoverable entry point for each. Making every request run the whole core increases context and reading effort.

## Proposed solution: first six supplements

The table specifies the proposed primary folder. Existing core skills continue to own implementation, verification verdicts, and deployment. All durable outputs use an existing project record when suitable; the human receives one or two sentences with a detail link.

| Proposed skill | Primary process and trigger | What it adds / what it must not duplicate | Sources to adapt | Agent-readable result |
|---|---|---|---|---|
| **understand-system** | Implementation; “How does this flow work?” or “Where does this change belong?” | Trace actual entry points, behavior, ownership, and design rationale. Do not perform a whole-repo audit or write project instructions automatically. | pstack `how`, `why`, `teach`; ECC `codebase-onboarding`, `code-tour` | Bounded flow explanation with code pointers, observed versus inferred rationale, unknowns, and likely change location |
| **assess-change-impact** | Planning; a public interface, shared data, cross-module change, or explicit impact question | Investigate consumers beyond imports and reconcile the actual diff later. Do not turn every small edit into a planning gate. | pstack `blast-radius`; ECC `change-impact` | Affected objects/consumers, compatibility and recovery concerns, evidence, unknowns, and required checks linked to the current change |
| **clarify-domain-model** | Ideation; an overloaded term or disputed business rule changes required behavior | Resolve concept boundaries and concrete edge cases. Does not design a universal ontology or require new glossary/ADR files for every conversation. | Matt `domain-modeling`; ECC `context-and-decisions`, `architecture-decision-records` | Resolved terms/rules with examples, conflicts, decision rationale, and affected requirements; preserve provisional status when unresolved |
| **handoff-work** | Implementation; pause, session change, or transfer of ownership at any stage | Reconcile actual files, revision, unfinished work, and authority. Does not create a second spec, auto-start an agent, or mark work complete. | Matt `handoff` | Canonical pointers, working state, valid/stale evidence, next action, owner if known, and blockers; redact secrets |
| **address-review-feedback** | Implementation; review findings need evaluation or authorized correction | Determine which findings are valid, disputed, duplicate, resolved, or need clarification. Does not repeat the entire review or silently accept scope changes. | Superpowers `receiving-code-review`; core verification record conventions | Findings with evidence-backed dispositions; references to fixes and rerun checks; unresolved dependencies remain visible |
| **test-an-assumption** | Implementation; one feasibility or product-behavior uncertainty blocks direction | Run a bounded experiment with an explicit question and decision rule. Distinct from shipping a feature or searching documentation. | Matt `prototype`; selected pstack experiment principles | Question, bounds, method, observed result, limits, and the affected direction/requirement; experiment artifacts remain clearly labeled |

Selection order: start with **understand-system, assess-change-impact, and handoff-work** to improve work on an existing project. Follow with domain clarification, review feedback, and experiments. If the first target project has an immediate domain ambiguity or feasibility risk, move the matching skill forward. No skill requires the others to have run.

Fourteen bodies were reviewed in the comparison; other named sources in this table are catalogue candidates requiring full source/reference inspection during adaptation. The source inventory distinguishes the depth explicitly.

## Conditional supplements after that

These are additional proposals, not requirements to reach a quota. A project risk can justify moving one ahead of the first batch.

| Candidate | Primary process | Trigger and distinct result | Source preference / adaptation |
|---|---|---|---|
| `strengthen-tests` | Verification | Missing behavioral protection, an untrusted test suite, or a reproduced defect; identify and, when authorized, implement focused tests | ECC `test-collaboration`, `ai-regression-testing`, `module-regression`; Matt/pstack TDD. Reuse test IDs only where useful; no registry mirroring or fixed coverage percentage |
| `review-security` | Verification | Changed authentication, authorization, sensitive data, untrusted input, or other trust boundary; evidence-backed findings | ECC `security-review` plus the matching stack. Treat it as assessment, not certification; validate current platform guidance and avoid automatic dependency upgrades |
| `evolve-interface` | Implementation | Independently evolving consumers/providers, events, or APIs; one contract and compatibility evidence | ECC `contract-first`, `api-design`. Shared types may suffice inside one atomic build; do not add schema machinery unnecessarily |
| `migrate-data` | Implementation | Existing persistent data must change; staged migration and recovery evidence | ECC `database-migrations`. Coordinate actual rollout with the Deployment core; a rollback command does not prove data recovery |
| `measure-performance` | Verification | A latency, throughput, memory, or speedup claim needs testing; workload and comparative measurements | pstack `benchmark-checklist`, ECC `benchmark`. Separate diagnosis, optimization, and measurement; report inconclusive results honestly |
| `refactor-safely` | Implementation | Demonstrated change friction needs a behavior-preserving restructuring; bounded diff and invariant checks | Matt `codebase-design`, `improve-codebase-architecture`. Drop required HTML reporting, fixed terminology, and mandatory agent fanout |
| `exercise-user-journey` | Verification | A critical user path crosses components or services; observed journey evidence | ECC browser/E2E or Windows desktop skills, pstack verification generators. Select one platform and reuse its runner; do not create all variants |
| `check-accessibility` | Verification | A user-facing interface is built or changed; applicable automated and manual findings | ECC `accessibility`, `frontend-a11y`. Select the relevant platform; an automated scan alone is not complete accessibility evidence |
| `triage-work` | Maintenance | Issue volume creates duplicate, stale, or unclear requests; verified actionable issue state | Matt `triage`, ECC `issue-review`. Preserve the existing tracker and workflow; publishing remains separately authorized |
| `capture-lessons` | Maintenance | A recurring failure justifies a durable prevention; targeted test/rule/record update | Matt `retro`, pstack `correct`/`reflect`, ECC retrospective methods. No mandatory diary or autonomous global-rule rewrite |
| `maintain-project-context` | Maintenance | Existing docs and current behavior diverge; reconcile specific stale records | ECC documentation governance and pstack technical writing. Do not introduce a new documentation hierarchy or memory service |

A separate generic `code-review`, `write-plan`, `debug`, or `tdd` skill is not proposed now: those jobs are already explicit in the core. A new entry point must supply a different user question, meaningful specialist procedure, or independently useful result. `strengthen-tests`, for example, repairs an evidence gap; it does not replace ordinary implementation testing.

## Project profiles and workflow support

Use ECC's breadth selectively after the target project is known. A React/TypeScript project may benefit from its React, TypeScript, component-testing, and browser-testing candidates; a Python service needs different references. Select the relevant database, deployment provider, and security guidance as needed. Review version accuracy and tools before use; these are examples of selection, not preapproved installations.

Agent dispatch, isolated worktrees, skill routing, and context compaction belong in optional workflow support. Keep them separate from product skills and invoke them only when the task benefits. Defer a universal agent harness, memory vault, autonomous loop, formal-methods generator, visual planning platform, and mandatory ticket pipeline. Formal methods or domain-specific assurance can be considered for a concrete high-consequence problem.

## Output and routing contract

1. Route from the current question and available evidence, not from a mandatory stage checklist. A short index can explain “use when” and “skip when”; do not build a routing engine.
2. Load the selected skill and necessary references. Avoid repeating shared templates in every skill or loading the whole catalogue.
3. Reuse the current problem, direction, delivery, release, or incident record. Add a separate artifact only when it has a genuinely different lifetime or executable role, such as a test or API schema.
4. Preserve requirement/decision/evidence IDs, canonical targets, rationale, stated versus inferred relationships, and evidence revision. A link proves that records connect, not that their claims are true.
5. Give a one- or two-sentence human update naming the consequence and material gap; link to detail. Do not emit the entire agent record by default. With no writable destination, clearly label the unsaved detailed record rather than claiming a save.
6. Keep normal quality and permission requirements even when a specialist is not invoked. Optional security or accessibility skills do not make those obligations optional.

This extends the existing record convention. No new semantic schema, ontology infrastructure, presentation layer, or per-agent report is proposed.

## Scope, alternatives, and tradeoffs

Included now: comparison, catalogue, this proposal, and the six branch candidates authorized in the updates above, with references/templates, upstream notices, navigation links, and bounded author walkthroughs. Any conditional additions require their own selected scope. Excluded: installation into another project, production operations, new services, automatic hooks, runtime helpers, and implementing every conditional skill.

Keeping only the ten core skills is cheapest to maintain but leaves specialist methods hard to discover. Copying upstream collections gives breadth quickly but imports contradictory process rules and dependencies. A much larger mandatory workflow would undermine lean planning. The proposed optional adaptations cost some maintenance but let a user invoke the missing capability directly. Revisit a proposed split if trials show the core alone handles its scenarios equally well; merge it back or keep only a reference.

## Tools and services

The proposal introduces none. Research used local Git/files, existing Python for a CSV, GitHub issue search, and public source downloads. No upstream scripts ran. No Ruflo tool was available in the exposed tool inventory. No application code or private project data was sent to upstream repositories.

Later skills should use the target project's existing tools. Browser automation, authenticated APIs, databases, profilers, generators, or external models must be identified in each accepted scope, including access, costs, data handling, and fallback. Their availability is currently project-dependent. Missing access should yield a bounded gap and next action, not fabricated evidence or an automatic installation.

## Acceptance criteria and validation

For every selected addition:

- [ ] A clear trigger and skip condition distinguish it from the core and other supplements.
- [ ] Sufficient supplied context permits direct entry without earlier skill runs or repeated interviews.
- [ ] Existing record updates preserve rationale and canonical references; human output is one or two sentences with material limitations visible.
- [ ] Unknowns, conflicting evidence, missing tools, and interrupted work produce accurate partial outcomes.
- [ ] The result supports a concrete next action without claiming approval, successful execution, or certainty it has not established.
- [ ] Complete source/reference inspection and applicable license notices accompany adaptation; no required model, service, publication, or fanout is inherited accidentally.
- [ ] A realistic walkthrough covers the success and failure case below; label authored expectations separately from actual runtime observations.

| Skill | Representative input and expected outcome | Missing-input or failure case |
|---|---|---|
| Understand system | Explain how a cafe search request obtains results; trace actual handler, provider, filtering, and response paths | Provider internals unavailable: identify the visible boundary and unverified behavior without inventing it |
| Assess impact | Change a cafe identifier from integer to opaque string; identify persistence, URL, cache, API, and consumer implications that actually exist | A mobile consumer repository is unavailable: preserve that gap; do not report no impact |
| Clarify domain | “Saved cafe” could mean a user's bookmark or cached provider data; resolve distinct concepts and affected requirements | User intent conflicts with existing behavior: preserve both accounts and the unresolved decision |
| Handoff work | Resume a partially implemented change with dirty files and an older passing test result; identify actual state and next action | Evidence predates relevant edits or a record is missing: mark stale/missing and avoid trusting a completion note |
| Address review | Reviewer requests removal of a seemingly unused API; check external consumers before accepting | One finding is ambiguous: pause dependent edits, continue independently authorized fixes, preserve the unresolved finding |
| Test an assumption | Determine whether an existing provider can supply the needed Singapore cafe fields; set a bounded check and decision rule | No credentials or insufficient sample: report the limit, not feasibility proved; a mock is not live API evidence |

Real-project trials remain deferred to the user's separate project. There, compare core-only and core-plus-selected-supplement on comparable tasks: unnecessary interviews, duplicated records, useful evidence, correctness of resumed state, and ability to recover the rationale. Record actual elapsed effort and context use if available; no claimed savings without observations. Human review occurs as agreed when the user tries the workflow; independent maintainer acceptance for shared implementation/merge remains governed by workflow.md.

## Ownership, sources, impact, and open questions

- Human sponsor: ChouBokYann. Independent maintainer review: Perryong, pending; no approval is inferred.
- Agent responsibility: the six authorized candidate folders under `skills/<primary-process>/`, relevant process navigation, and associated research/proposal/walkthrough documents. Conditional additions remain unassigned. No other contributor's paths are assigned here.
- Related issue: #7. Historical graph/visualization issues remain deferred and do not impose requirements on this proposal.
- Sources: exact repository, commit, and path for each candidate appear in the CSV. Root licenses are MIT in the inspected snapshots; inspect embedded notices/references before copying. This proposal summarizes methods rather than redistributing upstream implementations.
- Compatibility: current core entry points and templates remain unchanged. Remove a trial supplement and its navigation link to revert it; retain any useful project evidence it produced.
- Risks: too many near-duplicate triggers, inherited process mandates, shallow specialist advice, and additional reading. Mitigate through independent entry criteria, selective references, explicit evidence limits, and a small first batch.
- Open decisions: accepted first implementation batch; target project's stack and risks; whether trial results justify each split. No further information is needed to review this proposal.
