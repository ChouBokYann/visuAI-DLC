# [Proposal] Experiment09: workflow readiness and development-tool compatibility

Status: concrete draft for acceptance, 2026-11-22. Bok requested consolidation and compatibility testing. Earlier explicit local gate waivers covered Experiments07/08 only. This draft does not claim new other-maintainer acceptance or authorization to publish on GitHub. [Coverage assessment](workflow-coverage-and-compatibility.md) is completed read-only research, not live compatibility evidence.

## Change and lifecycle process

Evaluate the existing requirements→implementation→verification→local release workflow across optional execution/context tools. First close the measured readiness-evidence gap, then test Headroom and OpenShell separately before any combination. Primary processes: Planning/Verification, with bounded Implementation/Deployment fixtures.

Proposed paths: a new isolated worktree on `experiments/09-workflow-compatibility`, experiment directory `experiments/workflow-compatibility/`, owned readiness/check/evidence records only. Canonical skills and previous experiments remain unchanged. Any eventual skill amendment follows its own reviewed diff.

## Problem and need

Existing local trials cover useful engineering failures but do not establish host/tool interoperability. E08 captured its preservation baseline too late. A context compressor could discard a failed check or authority limit; a sandbox could prevent required artifact writes or incorrectly permit forbidden access. Merely installing these tools would not test our workflow contracts.

## Proposed solution

Use one fixed synthetic requirement packet and a tiny deterministic Node service fixture: add an optional nullable note with omission-preserves semantics, reject invalid values without mutation, keep old requests working. No finance app, credentials, private source or external model calls are required. A local artifact is built, identified by digest, served on loopback, smoke-checked and restored to the retained previous artifact after a deliberate configuration fault. This is local staging, not cloud deployment.

Carry one delivery record: request/source→REQ IDs→criteria→change revision→test evidence→release artifact/target observation. The plan must separately identify software conformance checks and actual model/agent adherence; a fixed script cannot establish the latter.

Stage A: pin library `c276159399bcca4bec874b3a521dfa61b5a0200b`, implement the minimal readiness check, run its negative cases, then the baseline fixture. Root alone can execute deterministic checks; no automatic agent delegation.

Stage B: isolated Headroom library/proxy evaluation using synthetic code/log/JSON/tool-message fixtures. Compare unchanged baseline packet and transformed packet. Check exact requirement IDs, negative assertions, failed status, revision hashes, ownership, retry limits and tool-call IDs/order. If critical content is compressed away, test the documented retrieval path; missing/unrecoverable evidence fails, not a guessed reconstruction. Include a long mostly-success log with one failure near the middle. Measure bytes/tokens with the same tokenizer and count retrieval overhead separately. Fake upstream can test request/response/stream framing but cannot establish model answer quality. Do not invoke headroom wrap/learn or modify active host config.

Stage C: OpenShell sandbox only after readiness confirms a usable backend. Mount/copy only pinned public skills and synthetic fixtures. Check intended reads/writes, deny synthetic sentinel access outside the allowed workspace, deny a controlled disallowed network endpoint, preserve permission-denied evidence without widening policy, and export records/cleanup. Use a controlled local endpoint reachable in the sandbox's network topology; do not assume its localhost equals the host's. Stop/restart only owned resources and verify retained artifact identity. A shell-script run proves runtime compatibility only, not autonomous agent behavior. Real agent execution requires a documented controllable client and a separately accepted inference/data budget.

Stage D: combine B+C only if both pass their individual mandatory criteria. Otherwise mark combined mode not run and report the concrete blocking interface. Do not silently substitute another sandbox or compressor.

## Scope

Included: coverage consolidation; isolated readiness enforcement; deterministic local workflow fixture; installed-tool checks; pinned minimal workspace-local dependencies if approved; actual Headroom data transformation and OpenShell policy/runtime checks when available; evidence and cleanup. First scope is software/contract compatibility, not comparative agent intelligence.

Excluded: Supabase, production/cloud deployment, paid inference, real secrets/data, private source uploads, global package/skill installation, active Codex routing changes, credential injection, new WSL distributions/OS virtualization changes, broad framework benchmarking, automatic memory/AGENTS edits, GitHub publishing, commit/push/merge. Docker Desktop startup may be included in explicit trial acceptance; if that alone is insufficient, record blocked readiness rather than install OS components.

## Alternatives and tradeoffs

Documentation-only research is already useful but cannot establish interoperability. Installing both tools at once makes failures hard to attribute. Separate no-tool/Headroom/OpenShell modes provide the smallest diagnostic comparison; defer combined mode until prerequisites pass. Reusing private spend-tracker code adds unnecessary data/licensing concerns, so the fixture is synthetic. No production adapter or generic integration framework is needed for this test.

## Tools and services

Existing Git, Node, Python3.12.7, uv, Docker CLI and WSL executable. Headroom and OpenShell are not on PATH. Docker Linux daemon is unavailable; WSL lists only docker-desktop. Use pinned source identities from the assessment and verify exact release/package mapping and licenses before installation; do not install latest implicitly. Record lockfiles and download hosts before execution. Public package/image retrieval may require network access and disk space; no paid service. An unavailable wheel/runtime is a setup gap, not permission for unbounded source builds or GPU/model downloads.

Headroom telemetry must be disabled (`HEADROOM_BEACON=off`, `HEADROOM_TELEMETRY=off`, `DO_NOT_TRACK=1`); use no remote inference and disable automatic model downloads until explicitly included. OpenShell gateway telemetry disabled (`OPENSHELL_TELEMETRY_ENABLED=false`). Verify settings against the pinned version. Synthetic prompts/logs only; local artifacts remain authoritative. Needed model assets or a different installation path that exceeds this scope returns a concrete amended plan.

Proposed execution bound: one initial attempt per available mode, at most one setup retry per tool, at most two correction rounds total across the whole trial. Preserve first failures and distinguish harness/product/environment faults. Stop a mode when prerequisites are missing; never reset limits through a new worker or wrapper. No arbitrary time/token claims: record wall time and available counters; mark unavailable values unknown.

## Acceptance criteria and validation

- [ ] E09-01: accepted scope/explicit exception, ownership, versions and source/criteria hashes recorded before mutable execution; no old waiver inferred.
- [ ] E09-02: readiness refuses missing snapshot, changed baseline bytes, wrong revision and missing runtime. Valid baseline succeeds. Mutating steps cannot begin without a successful recorded check.
- [ ] E09-03: no-tool fixture traces each synthetic user requirement through actual code/test and local release observation; failure/recovery retain separate states and artifact identities.
- [ ] E09-04: actual Headroom transforms synthetic fixtures; critical semantics and tool protocol remain exact or explicitly retrievable. Include error-in-middle and omitted/null boundaries; unchanged output is reported as zero savings, not a fake compression success.
- [ ] E09-05: actual OpenShell allows intended work and denies controlled out-of-policy actions without policy expansion; original sentinels unchanged and records accessible after owned restart. No runtime means incomplete, not pass.
- [ ] E09-06: combined mode runs only after04/05 pass and preserves the same criteria and evidence. If not run, report it explicitly and keep full compatibility incomplete.
- [ ] E09-07: all original/canonical/earlier evidence hashes match the pretrial baseline; owned services cleaned up, outputs retained, no global/active host changes.
- [ ] E09-08: final table distinguishes source inspection, installation, protocol/semantic checks, actual agent behavior, local deployment, cloud deployment and measured efficiency. No claim of full compatibility or savings from README claims or fake-provider checks.

Example input: a synthetic failed-test log mixed with many successes, source revision X and limit2. Expected: no path turns it into passing evidence, revision Y or a fresh limit; preserved original retrievable if compressed. Missing-input case: no baseline manifest or inaccessible original yields not-ready/incomplete before dependent mutation.

## Ownership and dependencies

Human owner Bok. Root owns draft, isolated setup, test harness and final evidence; no new worker authorization assumed. If independent agent review is desired, add one reviewer with read-only product access and separate evidence ownership before execution; agent review never substitutes for maintainer acceptance. Normal independent maintainer acceptance belongs to Perry, not attributed without a recorded decision.

Related: #7 comparison context; #13/E06 coordination evidence; local E07/E08. #6 and #10 remain deferred. Current query found no OpenShell/Headroom issue. Dependencies: actual selected repo identities, approved scope, pinned install plan, working tool runtime. The current ChatGPT host's inference routing is not exposed here; do not claim a live Headroom-wrapped host run.

## Sources, impact, and risks

[OpenShell pinned source](https://github.com/ai-openshell/openshell/blob/38c47412dd7e94b8efc44b128940e097590b7582/README.md), [Headroom pinned source](https://github.com/headroomlabs-ai/headroom/blob/ce0460cfa8598dc939243dbc7aec4b2d35f4e44a/README.md), both advertise Apache-2.0. Preserve actual notices if code is copied; this proposal paraphrases source descriptions and does not vendor their implementations. Headroom metadata inspected separately on main is not a reproducible package lock.

Primary risks: conflating transformed prompts with durable evidence, compressed-away negative results, incompatible tool protocol, host configuration mutation, inaccessible container paths, missing runtime mistaken for incompatibility, and claiming model quality from scripted checks. Mitigate with originals, frozen criteria, isolated workspace/config, explicit backend identity and scoped verdicts. Removal is stopping owned resources and removing only the isolated installation after retaining evidence; no repo-wide reset or deletion of earlier work.

## Open questions

Execution decision: obtain normal issue/other-maintainer acceptance, or Bok explicitly waives those gates for this local trial and accepts the bounds and isolated installs above. This is required by AGENTS.md steps2–3 and workflow.md section2; proposal preparation itself is permitted before acceptance. No new OS components, model asset download, paid inference or cloud target is included. Broader real-agent/cloud tests need their concrete target and budget specified later.
