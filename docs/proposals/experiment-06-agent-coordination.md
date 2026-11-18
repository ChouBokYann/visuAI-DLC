# [Proposal] Experiment 06: shared contracts, interrupted workers and stale reviews

**Issue-ready draft for Bok · 2026-11-19. Not published; not accepted; not executed.**

## Change and lifecycle process

Evaluate `coordinate-agent-work` through a new Experiment 06. Primary process: implementation; verification provides independent acceptance evidence. The canonical [experiment protocol](../../experiments/coordinate-agent-work-resilience/README.md) owns the proposed scenarios and E06-01–09 criteria. This issue body links to them rather than creating a second specification.

Current draft paths: this file and `experiments/coordinate-agent-work-resilience/README.md` only. After acceptance, implementation is bounded to that new experiment directory. Existing skills, previous experiments, their index, and `main`/`first-iteration` remain unchanged. Any skill improvement found becomes a separately reviewed proposal.

## Problem and need

Perry and Bok need evidence that the coordination skill handles failures beyond a straightforward repair. Experiment 05 verified one writer, independent review and one correction, but did not exercise a shared API/UI interface, a live interrupted writer or an earlier pass becoming stale after source changes. Mistakes here can produce incompatible components, overwritten partial work or false completion claims.

## Proposed solution

Use a fresh café fixture with a minimal local shortlist API and three isolated live trials: **S1** conflicting/unaccepted contract input; **S2** controlled interruption and preserved ownership transfer; **S3** stale review rejection followed by independent failure reproduction and repair. Freeze source/contract/skill identity and acceptance criteria before dispatch. Assess coordination behavior separately from eventual product correctness.

## Scope

- Included: a local synthetic fixture, pinned C1 contract, bounded coordinator/API/UI/reviewer roles, the three fault scenarios, test evidence, source preservation and cleanup, and an honest report of results and limits.
- Excluded: production delivery, authentication/database/cloud services, new agent runtime, skill rewrites, a general scheduler, visualization/exporter changes, comparative performance claims, changes to previous experiments and automatic GitHub publication/merge.

## Alternatives and tradeoffs

Paper walkthroughs reduce cost but cannot prove real stopping or browser behavior. A combined scenario is realistic but obscures which failure caused the outcome. Recommend three separate live trials sharing one fixture. Doing nothing preserves the known Experiment 05 limits and is reasonable if the trial cost exceeds the value. Revisit a combined or controlled comparison only after these checks expose useful findings.

## Tools and services

Drafting uses repository reads, GitHub read-only issue search and Markdown. Future execution proposes existing Git, Node/npm, locked app dependencies, Playwright/local browser and host agent tools; use Node's HTTP support instead of adding a framework. Configure owned loopback ports and browser executable explicitly. Missing tools leave affected scenarios incomplete; do not silently install a runtime or substitute paper evidence.

No new paid service is proposed. Agent inference still consumes the existing account's budget; model/rate-dependent cost is unknown until execution and must be bounded before dispatch. Package installation may contact the configured registry; agent prompts send only task-relevant source/evidence through the existing host under its normal data policy. Use synthetic cafés/IDs and private browser profiles. Remove or stub unnecessary remote asset/font requests in the new fixture if needed, and disclose any remaining network dependency. No credentials or personal shortlist data is needed.

## Acceptance criteria and validation

- [ ] Bok explicitly accepts the scope and the protocol's **E06-01–09**, with any amendments recorded before execution.
- [ ] Execute and retain evidence for **S1–S3** under those frozen criteria; report failures/incomplete trials honestly rather than claiming all criteria passed because a final app works.
- [ ] Preserve every prior tracked experiment file and protect the named branches; verify hashes and refs before/after.

Example input: API worker receives accepted C1, while the UI worker sees unaccepted C2 and lacks the authoritative pin. Expected behavior: identify the conflict, defer schema-dependent work, obtain the accepted immutable C1, then integrate and verify. Missing-input/failure examples: unavailable interruption mechanism leaves S2 incomplete; unavailable browser cannot be replaced by a unit-test pass; a changed candidate invalidates an earlier behavioral review.

These are proposed criteria, not observed results. The protocol defines each check, ownership, evidence and bounded retry behavior.

## Ownership and dependencies

- Human owner/proposer: Perry. Proposed independent maintainer reviewer: ChouBokYann (Bok).
- Current agent responsibility: draft these two documents and check their consistency/links; no experiment implementation or dispatch.
- Proposed execution responsibilities and path grants: protocol's team table. Coordinator owns integration and records; API/UI own disjoint product paths; reviewer owns checks/evidence. Replacement writer starts only after confirmed release.
- Related: [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7), skill-selection exploration; Experiment 05 at `203a2fb6891c3cebf5075476ed4d1497e819b92c`.
- Overlap search on 2026-11-19: repository queries for `coordinate`, `"Experiment 06"` and `interrupted` returned #7 and historical/deferred #6/#8/#9/#10/#12, but no dedicated Experiment 06 issue. Deferred proposals grant no scope approval. Local search also found related handoff/verification guidance, which this trial evaluates rather than duplicates.
- Blockers for execution: publish a dedicated issue when authorized, obtain independent maintainer acceptance of this scope/criteria, and confirm the execution budget/capabilities. The current request authorizes drafting only.

## Sources, impact, and risks

Project direction: NORTHSTAR.md on local `main` at `aad433c661a10ce4556342bd4dba8b4bd8d6ef1e`; contribution contract: workflow.md. Experimental baseline and skill: repository commit `203a2fb6891c3cebf5075476ed4d1497e819b92c`. This proposal contains original scenario design and copies no new upstream implementation. Existing skill attribution and MIT notices remain at [its notice file](../../skills/implementation/coordinate-agent-work/references/upstream-notices.md); retain inherited notices with any future copied fixture assets.

Risks: guided scenarios overstate general reliability; final repairs hide an initial coordination failure; interruption is merely narrated; stale evidence is relabeled; simultaneous writers lose work; trial setup becomes a larger backend project. Mitigations: separate observed coordination/product verdicts, real host events, immutable source identities, exclusive grants and a deliberately small API contract. Scope changes return for review. Rollback removes only this new draft/trial directory and proposal; preserve executed evidence if it becomes referenced. No historical app or production data is changed.

## Open questions

1. Does Bok accept C1 and a minimal in-memory API as a sufficient shared provider/consumer boundary?
2. Does Bok accept three isolated trials, the proposed roles and bounded attempt/correction limits?
3. What elapsed-time/inference budget should apply, or should the proposed attempt bound be accepted as sufficient?

Suggested response: “Accepted / Needs revision / Deferred / Rejected — [reason], covering [scope and E06 criteria], with [budget or required changes].” This is a request for a human decision, not an agent-written approval.

## Draft validation — 2026-11-19

A separate read-only agent checked whether this protocol could support an implementation plan. It identified two gaps: a prepared fixture that appeared already complete, and an underspecified S3 response that might never make the café disappear. The protocol now defines an unfinished server/UI baseline with concrete worker tasks, and a false empty acknowledgment while saved IDs remain nonempty. The reviewer rechecked both corrections and reported no remaining planning blockers. This is document feedback, not maintainer approval or execution evidence.

Local file links and whitespace were checked. All 381 previously tracked experiment files, including their index and Experiment 05, matched the pre-draft SHA-256 snapshot. The `main` and `first-iteration` refs remained unchanged. No app code, dependency or executable helper was added; runtime tests are not applicable to this draft. All experiment acceptance criteria remain pending.
