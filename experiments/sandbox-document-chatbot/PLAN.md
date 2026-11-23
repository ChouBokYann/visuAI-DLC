# E11 sandbox workflow implementation plan

> Execute inline using superpowers:executing-plans. Existing user approval covers execution; do not repeat the approval interview. No commits or pushes.

Goal: prove a model-directed chatbot change, tests, browser journey and recovery execute inside OpenShell.
Architecture: sandbox controller and app; host restricted ACP inference; cloud Codex subscription. Host coordinator provisions the harness, not the measured application change.
Spec: ../../../../proposals/experiment-11-sandbox-workflow.md
Tech: Node standard library, Python browser automation via Chromium CDP, OpenShell 0.1.9, existing pinned ACP dependencies.

## Constraints and review focus

16 prompt turns total, development <=12, reserve four application turns; one setup retry; two correction rounds. No E09/E10 writes. No real documents/credential mounts. Download <=2 GB, additional disk <=8 GB. Host bridge authorization, controller traversal/symlink rejection, uncertain cancellation, browser confinement and identity-preserving recovery must be checked, not inferred.

## Tasks

- [ ] 1. Record approval, baseline hashes, resource manifest, dependency pins. Reuse selected E10 source excluding modules/auth/history. Copy only startup configuration hashes and sanitized config for a fresh ACP bridge; refer to existing installed dependency path without mutating it. Build a pinned Linux Node/Chromium workload after bounded package resolution.
- [ ] 2. Write failing tests in checks/harness.test.mjs for fresh 16/12 budget, strict bridge request schema and token rejection, controller path traversal/symlink/command rejection. Implement budget.mjs, protocol.mjs, host.mjs and controller.mjs; run tests and preserve RED/GREEN evidence. Keep startup restrictions from E10 with separate development and QA instructions.
- [ ] 3. Create named E11 gateway/CLI/sandbox, with hard-required Landlock and executable/host/port-specific egress. Run boundary probes, bridge negative HTTP tests and actual ACP initialization/config verification without inference. If setup fails, diagnose and use only one setup retry.
- [ ] 4. Place original E10 app, synthetic corpus, requirement/plan handoffs and a failing bridge-client test in sandbox. Controller POSTs fixed development context to bridge, validates returned write/check actions, executes actions in sandbox and records results. Source change must come from model; no host-authored substitute. Run original applicable tests and new client tests.
- [ ] 5. Build release A inside sandbox; automate Chromium source expansion, keyboard submission, no-evidence and refresh. Live known/conflict answers share the four reserved QA turns with recovery. Test hostile input explicitly with mocks if live budget insufficient and state that limit. Deploy provider fault B, observe 503, restore exact A and observe live recovery. Save hashes, process identity and screenshots.
- [ ] 6. Export evidence, obtain read-only fresh review of harness/results, address important findings within remaining correction allowance. Stop exact owned resources and verify baseline/unrelated containers. Write DELIVERY.md with every criterion's evidence and actual limits; report partial if anything remains unverified.

## Interfaces

POST /infer: Bearer trial token, JSON {mode:"development",context:string} or {mode:"qa",question:string,sources:[{name,text}]}; reject extra keys. Development returns {answer,turn}; QA returns {answer,turn,stopReason}. Host never executes model actions.
Development response: JSON {actions:[{op:"write",path:"bridge-client.mjs",content:string}|{op:"check",name:"client-tests"}],done:boolean}. Only explicitly writable app paths, fixed checks, <=8 actions/turn, <=64 KiB text; canonical containment and no symlinks.
Controller supplies existing source + test + selected skill guidance; feeds bounded previous test output; stop on done only if required tests pass and model changed source.
App client: ask(question,sources) -> {answer,...}; target/token supplied via environment at process start, no caller-selected endpoint.
Browser checks: sandbox-local Chromium with a temporary profile, no host browser or downloaded model; use CDP through local pipes/loopback and save screenshots.

## Ledger

2026-11-22: User approved exact proposal and local waiver. Branch experiments/11-sandbox-workflow created at c276159. Ruling: inline execution and this trial-local plan location follow the authorized scope; no extra approval or commits. Host coordinator authors infrastructure; model-directed app adaptation is the measured development step. Preserve failed observations and count correction rounds, not individual TDD red/green edits, as product correction attempts.

2026-11-22: BLOCKED at setup. Initial build failed local-image FROM syntax; single setup retry built image then bootstrap failed PowerShell mount comma parsing. Offline fix and regression check used correction round 1; no new runtime attempt. Tasks 1-2 partial, tasks 3-5 not completed. Cleanup/final review under task 6 continues. No inference occurred. See DELIVERY.md for evidence and limits; do not resume services without a fresh explicit setup allowance.

2026-11-22: Cleanup baseline verified: 12,180 hashes unchanged, 15 original containers preserved, no owned containers/listeners. Fresh review found unexpected-exit replacement risk and unbounded ACP stdout; correction round 2 added a persistent block and 2 MiB raw output limit. Two tests RED then GREEN, plus HTTP regression GREEN. No model/live runtime. Setup and correction allowances both exhausted; partial trial closed with explicit unverified criteria.

Continuation authorized: user replied 'go ahead' to one additional setup attempt and one additional correction round. Cumulative allowances: two setup retries, three correction rounds; 16 prompt turns unchanged. Existing counters preserved.

Continuation result: gateway/sandbox created, filesystem probe passed UID/workspace/private sentinel/no-socket checks. Upload destination failed; exec transport ran probe. ACP gate refused changed host config; Chromium smoke launch failed process/credential permissions. No inference, no weakening restrictions, no replacement setup. Deleted owned sandbox/control resources. Before separate UI-skill edits: 12,180 baseline hashes unchanged and 15 original containers preserved. Used counters: setup retries 2, correction rounds 2, turns 0. See latest DELIVERY.md section and continuation evidence.

Third setup retry authorized by explicit user answer; using correction round 3 for reviewed configuration refresh and browser launch compatibility. MCP names unchanged; inherited config remains guarded and actual runtime flags still verified. No turn-budget reset.

Third retry result: actual restricted ACP ready; sandbox model-directed adapter/client change passed tests after replaying turn1 on a user-owned fixture copy. Turn2 confirmed completion. Chromium/ChromeDriver compatibility flags worked without changing OpenShell policy. Live QA turns3-6 passed known/conflict/hostile/recovery, browser keyboard/source/no-evidence/refresh/narrow checks passed, controlled B503 and identicalA recovery passed. Network binary policy denied Python against same bridge reachable by Node. Cleanup verified. Remaining: stale UI0/12 counter (actual6/16), API edited-source404 and stale-in-flight checks not run. Acceptance partial; no further setup/correction budget. Current evidence: third-final-verification.json; older final-verification.json retained as historical.

User authorized fourth setup retry and correction round for remaining-validation-plan.md: zero inference, preserve releaseA, isolated candidate counter removal and mocked stale-source checks. Host ACP must not start.

Fourth continuation complete within scope: unchanged releaseA passed source edit404 and in-flight409 checks, failed obsolete counter assertion. Candidate removes only counter plumbing across3 product files; nine tests green, browser mock keyboard/source/no-counter/narrow checks passed. Refresh click observed, completed refresh not proved in this candidate browser check. Fresh reviewer found no material regression. Candidate28-file manifest verified; releaseA and counter6/16 unchanged; original15 containers preserved and owned resources removed. No live candidate/provider/recovery claim. See evidence/zero-inference/final-verification.json and latest DELIVERY.
