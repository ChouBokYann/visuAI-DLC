# [Proposal] Experiment 07: deploy, detect failure, recover and diagnose

Status: prepared 2026-11-21 following Bok's instruction to proceed with the next evaluation priority. Not executed or published. No independent maintainer acceptance is claimed.

## Change and lifecycle process

Evaluate the existing `prepare-release`, `deploy-and-check` and `diagnose-issue` skills through one live, bounded, disposable local staging cycle. Reuse the previously verified café app rather than add a new product. Primary phases: deployment and maintenance; implementation and verification supply a configuration regression and correction evidence.

After approval, keep implementation and evidence under `experiments/release-recovery/` on a separate local branch/worktree. Do not change canonical skills, earlier experiments, their index, or protected `main`/`first-iteration` refs. This draft remains in `output/proposals/` until publication/execution is authorized.

## Problem and need

Bok and Perry need evidence that the workflow can distinguish a submitted deployment, an installed artifact, a healthy process, correct user behavior, recovery and a durable fix. Experiment 06 exercised coordination and local application behavior, but did not deploy versioned artifacts to a separate target and recover a failed release there. The earlier release walkthroughs are not equivalent evidence.

Example: a release serves its page and returns a healthy status, but its API route is misconfigured. Treating HTTP 200 or a command exit as successful deployment would miss the user failure. Restoring the previous release must preserve the existing synthetic shortlist and must not be reported as success of the failed new release.

## Proposed solution

Use one small local staging target that serves copied production-build artifacts, not the development checkout or Vite development server. Keep a separate, stable in-memory shortlist API process alive across frontend/configuration switches. This makes application rollback and data preservation observable without inventing database durability.

Reuse Experiment 06 S3 R3 as source, with its full product/test digest `785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3`. It is currently an uncommitted local artifact; freeze and verify its actual bytes before copying. Do not call the branch commit its source identity. Existing baseline manifest and review are at `output/e06-worktree/experiments/coordinate-agent-work-resilience/trials/s3/evidence/` in the current workspace. A missing or changed source blocks reuse until reconciled; do not invent a GitHub link to unpublished evidence.

Use Node's existing HTTP/filesystem facilities for the small static target and API proxy. Its explicit runbook defines install/switch, observe, recover, and cleanup. A target-local active-release record names the installed immutable directory and digest; an operation ledger records each switch. Copy complete artifacts before an atomic pointer replacement; never edit an installed artifact in place. Serialize operations within this one operator session. No general scheduler or deployment platform is proposed.

Freeze three artifact directories with content manifests, build identity and release configuration:

- **A, known good:** API proxy routes `/api/shortlist` correctly.
- **B, deliberate failure:** identical app build, but release configuration forwards that route to `/api/shortlists`. The API rejects the unknown route, while static delivery and `/health` remain healthy. B is deliberately admitted only to the disposable experiment, never described as a production-ready release.
- **C, corrected:** restore the intended mapping and carry the reviewed regression evidence. A/C may have identical runtime bytes; their release records and provenance differ. Do not manufacture code changes just to get a different hash.

The target resolves static paths within the installed artifact directory, rejects traversal, serves appropriate MIME types and does not expose source/evidence. Control/switch commands are filesystem operations available only to the operator; do not create an unauthenticated HTTP deployment endpoint. Every server binds loopback on an explicitly owned available port. UI and API access stay within this synthetic environment.

### Execution sequence and expected observations

1. **Freeze and prepare.** Record user criteria, source/skill/config/build digests, dependency lock, host/browser capabilities and known limits. Prepare release A using the actual skill. Verify copied artifact bytes and runbook behavior before starting the trial. Preserve existing skill notices and asset attribution.
2. **Install A and verify target.** Start the owned target and stable API. Install A from its immutable bundle. Independently compare installed files and served assets with the manifest, observe release identity, and run a real browser shortlist journey. Seed `['nylon','mill']` using the accepted API and confirm it through both API and browser.
3. **Install B and observe failure.** Switch to B. Prove B is actually installed; `/health` and page delivery may pass while the same browser/API behavior check fails. Record `Installed / target verification failed`, not `Verified`. Preserve timestamps, operation identity, symptom and current data before any recovery.
4. **Recover A promptly.** Follow the already authorized runbook without waiting to finish diagnosis. Switch back to the exact retained A artifact. Independently verify the restored artifact, original user journey and unchanged synthetic shortlist. Record `A recovery verified; B release failed` as separate facts.
5. **Diagnose from evidence.** Use `diagnose-issue` with actual target observations, A/B config/source differences and bounded probes. Distinguish at least wrong proxy route from backend outage: direct API access should work while B's configured proxy route fails. A recent release alone is not root-cause evidence. Record supported/provisional/undetermined cause honestly.
6. **Correct and redeploy.** Before correction, add a regression that asserts the target-facing API route reaches the real service, and observe it fail against B. Keep assertion bytes unchanged when testing C. Prepare C with exact artifact/config evidence, install it, then independently repeat the same primary user journey and data check. Report target verification separately from human adoption.
7. **Preserve and clean up.** Retain A/B/C, failed and passing observations, source manifests, operation records and diagnosis. Stop only recorded owned listeners/browser processes. Check prior experiment hashes and protected refs against the starting snapshot. Summarize what the skills helped with and where guidance was insufficient.

## Scope

Included: one café app, one synthetic user, three frontend/configuration artifacts, one loopback static/proxy target, one stable API process, release/readiness records, one injected routing defect, observed rollback, diagnosis, one regression and corrected deployment, independent acceptance checks and cleanup evidence.

Excluded: production/cloud targets, public ingress, credentials, paid services, CI/CD setup, containers, database/schema migrations, durable storage across API restart, concurrent deployment races, lost deployment acknowledgments, arbitrary fault fuzzing, broad security/accessibility certification, canonical skill rewrites, automatic GitHub publication/merge, and general performance claims. Those are separate later scenarios, not covered by this one cycle.

This evaluates the release-to-maintenance part of the workflow. Reusing an existing problem and implementation does not establish a fresh all-six-phase run or complete workflow coverage.

## Alternatives and tradeoffs

1. **Disposable local target — recommended by the agent:** actual installed artifacts and browser behavior, no cloud account/cost, reproducible locally. Does not validate a provider's IAM, networking, service control, canaries or production rollback.
2. **Cloud sandbox:** better provider realism but introduces account, credentials, cost and target-specific runbooks before the core workflow gap is understood. Revisit after the local cycle exposes useful findings or a concrete target is named.
3. **Paper walkthrough:** low effort but cannot prove artifact installation, behavioral failure, recovery or preserved data. Existing authored walkthroughs already cover some of this territory.

The minimal target helper is experiment infrastructure, not a newly adopted deployment tool. If preparation starts requiring a framework, service installer or broad redesign, return for rescoping.

## Tools and services

Existing Git, Node v22.15.0, npm, React/Vite/TypeScript, Playwright and local Chrome from Experiment 06. The copied package lock must match the existing installed dependencies before reuse. No new package or cloud service is planned. Builds/browser startup may require the same sandbox escalation observed in Experiment 06; respect approval results and preserve setup errors separately from product failures.

Agent inference consumes the existing account's resources. Proposed bound: one initial full cycle, at most one setup-only retry if the cycle was not exercised, and at most two correction rounds. No automatic extension. Record wall time, worker count and available token/model telemetry; unavailable measurements stay unknown. Missing browser/target capability leaves the relevant criterion incomplete rather than substituting a unit pass.

Only synthetic shortlist data is used. No credentials, real user state or production traffic. Block unnecessary external browser requests, preserve local asset notices and do not open external map links. Local files/prompts use the existing agent host under its existing data policy. Dependency downloads require separate assessment if the pinned local installation cannot be reused.

## Acceptance criteria and validation

- [ ] **E07-01 — authority and identity:** record the actual execution authorization and applicable issue acceptance or explicit local-experiment exception; freeze criteria, source, skills, manifests, target/runbook and run bounds. Record available host/model information and explicit gaps.
- [ ] **E07-02 — artifact installation:** A, B and C are copied immutable artifacts; observed target files and served assets match their recorded digests. A healthy old artifact cannot satisfy installation of a new one. No development-server substitute.
- [ ] **E07-03 — useful target checks:** frozen browser/API acceptance passes A and demonstrably fails B while B's process-health check passes. Record installed/healthy/behaviorally verified states separately, with actual commands and exits.
- [ ] **E07-04 — safe observed recovery:** authorized recovery restores exact A on the actual target, original behavior passes and the preexisting synthetic shortlist remains unchanged. Failed B remains a failed release. No API restart or hidden data reset may manufacture preservation.
- [ ] **E07-05 — supported diagnosis:** compare target identity, backend/direct route observations and configuration differences; retain predictions and observations supporting the fault mechanism and ruling out backend outage in this case. Recovery alone cannot count as diagnosis or durable resolution.
- [ ] **E07-06 — verified correction:** a new focused regression fails B and passes C with unchanged assertion bytes. Relevant unit/build checks and the same primary browser checks pass on installed C at 1440×1000 and 390×844. Zero discovered tests cannot pass.
- [ ] **E07-07 — independent assessment and evidence:** an independent reviewer owns checks/evidence, not product/target configuration. It verifies actual target versions, failure, recovery and corrected state. Retain first failures, every attempt, exact source/config identities, operations and honest limitations. If independent review cannot run, mark it pending.
- [ ] **E07-08 — preservation and cleanup:** earlier tracked experiments plus all local Experiment 06 source/evidence remain byte-identical to the initial snapshot; protected refs remain unchanged. No unknown process is reused or stopped; owned resources close and evidence survives.
- [ ] **E07-09 — learning and conclusion:** connect observed behavior/gaps to the pinned upstream-derived practices below, separate workflow results from product results, and propose only evidence-supported follow-ups. Do not claim causal superiority over upstreams, complete lifecycle coverage or production readiness.

Example input: release bundle plus digest, known-good A, loopback target, accepted local operation scope, frozen shortlist acceptance and recovery runbook. Expected: prepare concrete release, observe installed artifact, discover B's user-facing failure, recover under existing authority, diagnose with actual evidence, verify C. Failure/missing-input examples: absent artifact identity blocks installation; unknown process ownership blocks its reuse; unavailable recovery artifact blocks a safe rollback claim; missing browser leaves target user acceptance unverified.

## Ownership and dependencies

- Human owner/sponsor: Bok (ChouBokYann). Proposed independent maintainer scope reviewer: Perryong; no acceptance attributed to Perry.
- Agent/root: prepare fixture and deliberate fault, own target/processes and record preservation. Proposed deployment/diagnosis executor owns the release/incident record and authorized target operations after explicit handoff; independent reviewer owns `checks/**` and its evidence only. Serialize mutating roles. Maximum three simultaneous agents, no nested fanout. Actual agent use requires acceptance of this role plan.
- Proposed new paths: `experiments/release-recovery/{README.md,fixture/,artifacts/,target/,checks/,records/,evidence/,results.md}`. Source and target code belong only to fixture/target; checks/evidence are independent. Existing runtime helpers may be reused with their attribution and concrete checks; do not rewrite repository-wide tools.
- Dependency: verified local Experiment 06 R3 source and preserved evidence. Its local/uncommitted status must remain explicit; package a reproducible source snapshot inside this experiment after verifying the pin.
- Related issues: #7 (skill selection), #13 (Experiment 06). Overlap search on 2026-11-21 found #10 (deferred release/diagnosis proposal; no acceptance comments). Search for "Experiment 07" found no issue. #10 explicitly requires fresh scoping and grants no execution authority.
- Current blocker under the standing contract: a new issue and acceptance by the other maintainer before implementation. Bok's "go ahead" authorizes moving this priority forward but is not attributed as Perry's approval. Publication of this new issue is not yet explicitly authorized. An explicit session instruction permitting a bounded local experiment before maintainer review can be recorded as an exception, without claiming ordinary process compliance or main adoption.

## Sources, impact, and risks

Project direction: NORTHSTAR.md on main at `aad433c661a10ce4556342bd4dba8b4bd8d6ef1e`; contribution contract: workflow.md. Existing candidate skills are read from first-iteration-1.1 at `c276159399bcca4bec874b3a521dfa61b5a0200b`; freeze actual skill bytes at execution. Existing notices retain MIT obligations; no new upstream implementation is copied by this proposal.

Learning questions, using the already inspected candidate adaptations and their source notices:

| Practice under evaluation | Pinned origin | Observable learning question |
|---|---|---|
| Exact environment/configuration and recovery compatibility | ECC deployment-patterns, `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b` | Does readiness capture configuration as part of release identity, and does target verification detect B despite green health? |
| Branch integration distinct from deployment | Superpowers finishing-a-development-branch, `22f0b463e7a5e579904dd6211a520321035526f7` | Do records avoid treating a local build/branch state as installed target evidence? |
| Reproduction and falsifiable explanation | Superpowers systematic-debugging at the same pin; Matt Pocock diagnosing-bugs, `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d` | Does diagnosis discriminate the routing fault from an unavailable backend instead of merely blaming the last deployment? |
| Root cause and bounded prevention | pstack principle-fix-root-causes, `4161d4ef5051574e825ffe70e2f43a2e49e4b3db`; Matt retro at the same Matt pin | Does the focused regression protect the actual user failure without expanding into an unrelated tooling programme? |

Source URLs: [ECC](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/deployment-patterns/SKILL.md), [Superpowers release boundary](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/finishing-a-development-branch/SKILL.md), [Superpowers diagnosis](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/systematic-debugging/SKILL.md), [Matt diagnosis](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/diagnosing-bugs/SKILL.md), [pstack](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-fix-root-causes/SKILL.md). This is evaluation of current adaptations, not a fresh audit of every upstream reference or a controlled comparison.

Risks: guided fault overstates organic discovery; target helper bugs obscure workflow behavior; same-machine deployment is mistaken for production assurance; restarting the API hides data loss; mutable artifacts invalidate prior passes; the experiment becomes an infrastructure project. Mitigations: test the target helper first, frozen records, observed target asset hashes, independent checks, stable API identity/state, separate setup/workflow/product verdicts, and stated exclusions. Preserve any helper failure rather than retune the acceptance criteria after the result.

Rollback of the experiment itself: stop its owned resources and remove only its verified new workspace if explicitly requested; preserve referenced evidence. Never clean or reset earlier experiments. No shared/production data is changed.

## Open questions

Technical defaults are concrete proposals above and can be amended before acceptance. Remaining decision: publish this proposal for Perry's independent acceptance under workflow.md, or receive an explicit bounded local-experiment exception from Bok before execution. No trial has run and no passing acceptance result is claimed.

## Draft checks — 2026-11-21

All ten change-proposal template sections are present. A fresh read-only builder review found no important unanswered technical questions: installed-artifact checks, failed browser/API behavior, direct-backend probes, configuration comparison, stable API identity/state and preservation snapshots can support the proposed criteria. This is a design review only, not runtime evidence, human scope acceptance or approval to publish. No experiment code, target, dependency installation or source modification has been performed for Experiment 07.
