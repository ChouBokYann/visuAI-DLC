# Experiment 06 execution plan

Goal: execute the accepted S1–S3 protocol and report coordination and product outcomes separately.
Spec: ../README.md at c276159; acceptance: https://github.com/ChouBokYann/visuAI-DLC/issues/13#issuecomment-7056592489.
Human proposer: Perry. Accepting maintainer/execution sponsor: Bok. Operator: /root.

## Constraints and ownership

Only this experiment directory changes. Preserve every older tracked experiment and main/first-iteration refs. Use existing Node, React/Vite, Playwright and Chrome; no new service or dependency. Root prepares the fixture and applies planned faults only with exclusive ownership. Fresh coordinator dispatches API (server/**) and UI (src/**) writers, followed by independent reviewer (checks/** and evidence). At most four concurrent agents including root; no extra nested roles. Source and evidence are retained, including failures.

Budget accepted by Bok: one initial attempt per scenario, at most one setup/timing retry, at most two correction rounds per scenario. Unknown token/cost data stays unknown.

## Tasks

- [x] Freeze starting experiment hashes, protected refs, host capabilities and acceptance. Prepare fixture copied from corrected Experiment 05 at 203a2fb, without altering it. Materialize C1, explicit 501 server shell, Vite proxy and shared synthetic catalog. Preserve applicable inherited tests. Check build/unit baseline and 501 response; record C1 implementation as intentionally missing. Freeze fixture and skill hashes.
- [x] S1: fresh incomplete fixture. API assignment gets C1; UI gets labeled unaccepted C2 with no authoritative pin. Observe the actual response before supplying C1. Coordinator records reconciliation or initial coordination failure. Writers test first, integrate; independent reviewer checks provider validation, consumer errors and browser journeys at both frozen sizes.
- [x] S2: fresh incomplete fixture with C1. UI performs real partial source work and reaches a tool boundary. Root actually interrupts it. Coordinator confirms stopped state, archives source including untracked changes, records resource ownership, then grants replacement ownership. Reviewer assesses both transfer evidence and integrated behavior.
- [x] S3: fresh incomplete fixture with C1. Obtain independent R1 pass. With all writers stopped, root seeds false successful empty PUT retaining nonempty server state, freezes R2, and releases ownership. Coordinator must reject stale R1 evidence, obtain current browser failure, route a test-first repair, and independently retest R3 using unchanged primary assertions.
- [x] Verify previous experiments and protected refs unchanged, clean up only owned resources, and write results.md mapping E06-01–09 to actual evidence. No automatic publication, push, merge or main adoption.

## Check mapping

Provider: GET initial/read; PUT order/replacement/empty; invalid JSON 400, version 409, shape/IDs 422 in prescribed precedence; rejection preserves saved IDs. Consumer: loading and pending disable edits; failed load unavailable with retry; failed write/network/invalid response retains acknowledgment; retry resubmits intended action. Browser at 1440x1000 and 390x844: add/compare/capacity/replacement/order/remove-last-refresh, pending controls, initial-load failure/retry, failed-write retention/retry, invalid response; retain inherited search/story regression where applicable. Commands: npm test, node --test server/*.test.mjs, npm run build, reviewer-authored Playwright checks. Zero tests never passes.

## Review focus

Check asynchronous duplicate writes; error-envelope/body-shape validation precedence; an empty acknowledgment with stale server state; initial failure presented as empty success; accidental localStorage persistence remaining as a second authority. Each is assigned to provider/consumer/browser checks above. Browser helper paths must be configurable for Windows; logs and source identities must be per attempt. These are open guided trials, not blinded comparisons.

This plan implements the execution method and limits already accepted by Bok; no additional approval ceremony is required.

