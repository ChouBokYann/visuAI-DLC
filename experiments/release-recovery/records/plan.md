# Experiment 07 implementation and execution plan

Goal: execute the accepted local release/recovery/diagnosis design in ../README.md, preserving observed failure and all earlier work.

Authority: Bok explicitly replied "Approve this proposal and explicitly waive those gates for this local trial; run it within the stated attempt limits" on 2026-11-21. This is a local exception to issue-first/other-maintainer approval, not ordinary compliance, publication permission or main adoption. One initial cycle, one setup-only retry, two correction rounds maximum.

## Ownership and sequence

- Root prepares copied fixture, helper/runbook, pinned A/B bundles and owned loopback API/target. Owns target/runtime.mjs and its helper tests, fixture/config and setup records. No old experiment is writable.
- Root verifies helper tests red then green, app tests/build, and preservation before live trial. Source must match frozen E06 R3 manifest, not merely c276159 HEAD.
- Deployment/diagnosis executor owns release/incident records, authorized control commands and correction C configuration/regression under exclusive grant. It reads prepare-release/deploy-and-check/diagnose-issue skills. No new runtime or dependency and no agent spawning.
- Independent reviewer owns checks/** and review evidence only, and performs live artifact/browser checks after each frozen target handoff. Same primary browser assertions at 1440x1000 and390x844 across A/B/recovered-A/C. Reviewer cannot fix product/target config.
- Root serializes ownership and preserves install/failed/successful evidence. At most root plus executor plus reviewer. No inferred human approval. No issue, push or merge automatically.

## Checkable tasks

- [ ] Verify copied source/skill and historical manifests. Create explicitly broken helper stubs; observe meaningful helper tests fail. Implement minimal manifest/install/recover/static/proxy target to make unchanged tests pass. Validate traversal, rejected tamper/repeated ID, exact installed identity and recovery preservation.
- [ ] Build app and run applicable consumer/provider tests; freeze A and B manifests with identical dist and different proxy config. Keep backend separate and alive across all switches. Runbook specifies concrete target path, command, ownership and rollback.
- [ ] Executor prepares and installs A; reviewer verifies actual copied/served bytes, release identity, stable backend and live user journey; establish synthetic state ['nylon','mill'].
- [ ] Executor installs B; reviewer runs same primary checks and records actual failed user behavior despite health200. Runtime acceptance fails; do not change criterion or repair silently.
- [ ] Executor promptly restores retained A under existing authorization; reviewer checks exact A, original behavior and preserved state. B remains failed.
- [ ] Executor diagnoses using observed versions, direct backend vs proxy and config difference. Add regression before correction, observe B failure, freeze C and unchanged green evidence. Prepare/install C; independent final same-assertion checks.
- [ ] Root reconciles cleanup, source/ref/evidence preservation, actual criteria/results and upstream learning. Record unsupported scenarios and exact-model telemetry gap. Keep failed attempts. No declaration of production readiness or full lifecycle coverage.

## Review focus

Installed bytes rather than build status; health not user correctness; state preservation without backend restart; diagnosis beyond correlation; mutable/tampered bundle rejected; exact artifact recovery; evidence identity; browser/harness failures distinguished from product failures. Missing required runtime evidence stays incomplete. Target helper and browser setup errors count as setup, not product faults.
