# Draft: preserve the shortlist workflow trials as separate experiments

## Change and lifecycle process
Verification/maintenance: document and package completed trials as Experiment03 (first-iteration-1.1) and Experiment04 (pstack-inspired).

## Problem and need
Perry wants clear workflow names, an explanation of agent interactions, and runnable experiments that do not overwrite the earlier café experiments.

## Proposed solution
Add separate app folders with pinned source provenance, new entry-point documentation and a comparison explaining observed agent handoffs. Rename the presentation label from Bok + Perry to first-iteration-1.1 while preserving raw historical evidence.

## Scope
Included: experiments/cafe-shortlist-first-iteration-1.1, experiments/cafe-shortlist-pstack, experiments/README.md, and presentation/metadata in experiments/cafe-shortlist-comparison. Excluded: changing previous experiments, core skills, product behavior, raw evidence, first-iteration, main, production deployment or external issue publication.

## Alternatives and tradeoffs
Patches alone preserve source but are harder to try. Separate runnable snapshots duplicate a small amount of code/assets while making the experiments accessible together. Keep patches and provenance for review. Revisit shared packaging only if duplication becomes a maintenance burden.

## Tools and services
Existing Git, Node/npm, Python, Playwright and local Chrome; GitHub connector for read-only overlap search. Dependency installation uses the existing lockfiles. No new dependency or paid service. Apps preserve their existing Google Fonts request and local browser storage behavior; no added telemetry.

## Acceptance criteria and validation
- [x] Displayed workflow name is first-iteration-1.1.
- [x] Both new app folders reproduce source hashes from their reviewed commits and pass existing tests/build/browser helpers.
- [x] Earlier café experiments and their comparison are byte-for-byte unchanged.
- [x] Original acceptance reports, screenshots, patches and reviewer scripts are unchanged.
- [x] Comparison explains actual ownership, messages/handoffs, shared agent topology, differing skills, outcomes and limitations.

## Ownership and dependencies
Human owner: Perry. Root performs this bounded local archival update. No new worker agents or independent approval are implied. Related exploration: https://github.com/ChouBokYann/visuAI-DLC/issues/7. Read-only search found no café-specific issue. Issue9 is deferred and supplies no scope grant. The user's current request authorizes this local update; separate maintainer acceptance for shared adoption/main is not established. Draft is not published.

## Sources, impact, and risks
Source snapshots: ac4e1c7 and ebb5068; common baseline3ed7fc8. pstack reference: cursor/plugins@93b916d4a1e806507e22f4716b352fa91f2b227e. Preserve bundled model license/source notices. No upstream skill text is newly imported. New manifests distinguish old acceptance evidence from fresh relocation checks. Undo by removing only the new snapshots and reverting presentation changes; prior experiments remain intact.

## Open questions
None for this local archival task. Human selection of a preferred UI and shared adoption remain separate decisions.
