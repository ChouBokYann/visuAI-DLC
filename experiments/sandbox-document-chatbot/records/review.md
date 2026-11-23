# Read-only review

## Zero-inference candidate review, 2026-11-22

Fresh reviewer e11_candidate_review compared artifacts/ with candidate/ and read HTTP/browser tests and recorded red/green evidence. No files edited or services/inference run. No material regression found: only counter plumbing removed; chat/request/provider behavior unchanged. Stale tests are meaningful and pass original, counter alone fails original; candidate9cases pass. Browser refresh check can pass on old ready text, so claim only click/basic readiness, not completed refresh. Candidate live provider/recovery unverified; original release evidence stays separate. Root incorporated these limits and verified cleanup/artifact identities independently.

## Final runtime review, 2026-11-22

Fresh reviewer e11_runtime_review inspected generated source, harness and third-attempt evidence without edits/services/inference. Supports model-directed sandbox change and A→fault→A recovery. Identified unrun API source invalidation/stale-in-flight checks and incorrect UI0/12 counter. Confirmed turn1 replay hashes plus turn2 completion establish provenance; all6 ACP turns show no tool attempts, not live denials. Required distinction: action validation does not sandbox imported JavaScript; OpenShell is the boundary. Chromium internal sandbox disabled. Current DELIVERY and third-final-verification reconcile the old zero-turn reports; cleanup independently recorded by root, not rerun by reviewer.

## Earlier partial-setup review

Reviewer: e11_partial_review, fresh context, 2026-11-22. No files changed, services started or inference invoked by reviewer.

Initial findings: important unexpected-adapter-exit replacement risk; unbounded ACP output; symlink test failed on Windows; container-to-loopback-host connectivity unverified. Agreed that only image build, local budget/schema tests and mocked HTTP rejection tests were supported by evidence.

Correction round 2 addressed the two implementation findings with persistent blocking on unexpected exits and a 2 MiB raw stdout lifetime cap. Reviewer recheck confirmed both in inspected code and three retained passing tests, while explicitly noting the tests exercise helpers rather than a real adapter crash/stream overflow.

Reviewer verdict: partial setup trial, stopped with setup and correction allowances exhausted. No controller or live sandbox/application execution. Baseline file and original-container preservation are supported by final-verification.json; reviewer did not independently inspect owned-resource cleanup. Root coordinator recorded those checks separately in evidence/cleanup.json. No maintainer acceptance or complete-workflow claim.
