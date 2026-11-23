# Experiment 07 operator record

## Scope authorization — 2026-11-21

Bok explicitly selected: "Approve this proposal and explicitly waive those gates for this local trial; run it within the stated attempt limits" after receiving the complete Experiment 07 proposal and the explanation of workflow.md's issue-first/other-maintainer requirements. Local exception only: no publication, main adoption, merge or production action. One initial cycle, one setup-only retry, up to two correction rounds. Fresh design reviewer found no important unanswered technical questions before acceptance.

Root created isolated experiments/07-release-recovery worktree under output/e07-worktree at c276159. Original checkout and Experiment06 worktree remain separate. prepare.mjs verified E06 S3 R3 source digest before copying 39 files. Snapshots protect 382 historical tracked experiment files and 464 local E06 source/evidence/build files; node_modules/junction contents excluded. Unknown exact model identity and token/cost are disclosed rather than guessed.

## Fixture and root checks

Root authored only the experiment-specific target helper, runbook, control/start/packaging scripts and minimal assertions. target/runtime.test.mjs was written first against explicit unimplemented exports. Actual red: exit1, 0/3; same tests green: exit0,3/3. Assertions cover verified copying, rejection preserving active state, repeat operation/release rejection, tamper rejection, installed-copy serving, path traversal/exposure boundaries, live proxy, retained-artifact recovery and operation record. Exact unchanged test hash and logs in helper-checks.json. No generic deployment runtime is claimed.

App baseline: npm test10/10; provider+regression15/15; npm run build exit0 with existing large Room chunk warning. Build used explicit approved escalation for previously observed sandbox esbuild directory restrictions. No package installation. Shared installed package lock matches pinned source. A/B each have20 manifest entries, identical production build, differing release ID/proxy config. Nothing is served from the development checkout.

## Resource ownership and roles

Root started hidden owned Node process39932 via approved Start-Process, command target/start.mjs. Runtime independently recorded PID39932, runId92e22675-7232-416e-96b2-ebcd705dd563, API56414 and staging56415, both loopback. Exact raw records: target-process.json, target-stdout.log, target/state/run.json. API process must remain alive through all four switches. Root stops it only after final reviewer evidence.

Root spawned fresh /root/e07_executor and /root/e07_reviewer with fork_turns=none, no model override or nested delegation. Executor owns release/diagnosis and serialized local control operations; reviewer owns checks/** and review evidence, has read-only product/target/config access and its own browser. Root owns immutable fixture/A/B, target helper, process and final preservation checks. Each was told not to overwrite others and given frozen scope, source, ports, ownership and attempt limits. Independent checks must not reset API data between phases.

## Live cycle

Pending independent phase handoffs. Executor seeds ['nylon','mill'] only once after installing A. Each switch must be followed by actual identity/behavior evidence before advancing. B's failure precedes prompt recovery; diagnosis and C correction follow observed recovery. Final summaries must keep B failed even after A recovery or C success.
