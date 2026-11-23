# Experiment 11: sandboxed document-chatbot development

Status: accepted for local execution on 2026-11-22. In response to the concrete scope, 16-turn limit, one setup retry, two correction rounds and explicit local-trial waiver question, ChouBokYann replied "go ahea". Record this as approval and waiver of issue-first/other-maintainer gates for E11 only, not maintainer review or GitHub publication permission. This is a fresh bounded trial, not an extension of exhausted E09/E10 correction allowances.

## Change and lifecycle process

Evaluate implementation, verification and local deployment inside OpenShell, carrying forward requirements and planning from the user's document-chatbot prompt. Preserve E10 as evidence of a host-based implementation only. This proposal is also the completed local issue draft; it has not been published.

## Problem and need

The user expects the engineering workflow to execute in a sandbox. E09 tested OpenShell boundaries using probes; E10 tested a chatbot and Codex subscription integration on Windows. Neither demonstrated model-directed development, tests and release inside OpenShell. A host browser is acceptable for viewing, but manual browser checks must not substitute for sandbox execution evidence.

## Proposed solution

Use an isolated OpenShell workspace with synthetic documents, a copy of the E10 application, selected lifecycle skills and a small development controller. A separately scoped host ACP bridge supplies cloud-generated text using the existing Codex subscription. The bridge has no development file/command endpoints; Codex host tools, MCP, hooks and inherited execution features remain disabled and checked at actual startup. Credentials stay in their existing host-managed location.

The sandbox controller sends bounded context and receives structured proposed actions. It validates paths and action shapes, executes reads/writes and a fixed allowlist of check/build/release commands inside the sandbox, and feeds results back to the model. This is a purpose-built trial controller, not a claim that the native Codex agent runtime runs inside OpenShell. Treat model responses and documents as untrusted input. Reject malformed actions rather than execute arbitrary shell strings. Do not build a general agent framework.

Representative development task: adapt the existing chatbot to use the restricted bridge from inside the sandbox, including failure handling. Require at least one recorded model-directed source change and its actual test result. Merely copying a finished host implementation and running it does not pass.

Use separate development and document-answer sessions/instructions. The application sends selected synthetic excerpts only. Run automated browser checks inside the sandbox if a supported pinned browser runtime is available within the download allowance; otherwise mark that criterion blocked, without substituting the user's personal browser. A host preview may be offered through a loopback-only forward after boundary checks.

## Scope

- Included: isolated trial workspace; restricted bridge; model-driven sandbox edits; tests; artifact A deployment; deliberate provider-unavailable configuration B; restoration of the same A; cleanup and evidence export.
- Excluded: real Documents access, local model weights, paid API fallback, production deployment, global configuration changes, changes to canonical skills, GitHub publication, commits, pushes or merges. Headroom is excluded because E09 established no savings for its tested inputs.
- E09 and E10 files, budgets and results remain unchanged. E11 may copy explicitly selected public source and synthetic fixtures, never credentials or whole host directories.

## Alternatives and tradeoffs

1. Containerize only the app: smallest change but fails the requested developer-workflow boundary.
2. Run native Codex/ACP inside the sandbox: simpler agent reuse, but the established subscription login is host-managed; copying credentials changes the agreed boundary. Revisit only with a documented credential-free inference integration.
3. Restricted host inference plus sandbox controller: selected. Adds a small action interpreter and bridge, so validate both before live execution. This evaluates the selected workflow with that controller, not arbitrary agent/runtime compatibility.
4. Stop at E09/E10 evidence: valid historical results, but leaves the user's requested scenario unverified.

## Tools and services

- Reuse OpenShell 0.1.9 and the recorded E09 gateway/runtime/supervisor image digests. Docker control-plane access stays outside the workload; no socket or credential mounts in the workload.
- Reuse ACP adapter 2.9.0, SDK 2.9.1 and Codex 0.171.0 from the E10 lockfile and startup-gate approach. Record source/package identities of copied material.
- Resolve and record any required Linux Node/browser image digest before use. Additional public package/image downloads: maximum 2 GB; trial disk envelope: 8 GB additional. If exact transfer accounting is unavailable, stop before downloads that cannot be bounded conservatively.
- Permit sandbox egress only to a dedicated host bridge endpoint, restricted to the required executable. The bridge needs a trial-only capability token, fixed routes, size limits, one concurrent request and no caller-selected provider, filesystem path or command. Never put its token in retained logs. Reachability from the Docker network must be tested; loopback binding alone is not assumed to work from a container.
- Cloud receives selected synthetic documents, trial source/skills and bounded test output. Existing subscription usage applies; monetary cost is unknown when not exposed. No credit purchase or alternate provider.
- Fresh execution bound: one initial trial, at most one setup retry, at most two correction rounds, and at most 16 ACP prompt turns total across development and application verification. Reserve four turns for application/recovery observations; at most 12 for development. Persist reservations before sending, including failed prompts. One concurrent request, 120-second client deadline; timeout does not prove remote termination. No replacement until local termination is confirmed, and stop if remote completion remains uncertain.
- No silent provider/tool version fallback or budget reset. If bounds are exhausted, report partial/blocked results with evidence.

## Acceptance criteria and validation

- [ ] E11-01: Before execution, record owner, accepted scope/limits, versions, original file hashes and unrelated running container identities. Preserve earlier experiment evidence.
- [ ] E11-02: Record the process topology and OpenShell policy. Demonstrate workload non-root execution, no Docker socket/host credential mounts, allowed workspace writes, denied access to a synthetic private sentinel and denied non-allowlisted network access. Do not probe real private files.
- [ ] E11-03: Verify actual ACP startup restrictions and rejection of host tool requests. Bridge rejects missing/invalid authorization, extra routes, oversized inputs and caller-supplied command/path fields. No inference until these checks pass.
- [ ] E11-04: Controller executes a real model-directed implementation change and check inside the sandbox. Retain action/result evidence, before/after hashes and process/workspace identity. Invalid actions and path escapes fail closed.
- [ ] E11-05: Record the requirements-to-plan-to-change-to-verification handoffs. Evaluate the pinned understand-expectations, define-requirements, deliver-change, implement-increments, verify-change, prepare-release and deploy-and-check skills where applicable; identify which stages were supplied by the host coordinator versus executed by the sandbox controller. Do not claim all six phases ran autonomously.
- [ ] E11-06: Actual cloud-backed known answer cites a valid synthetic source; conflict answer acknowledges the disagreement. No-evidence question avoids inference. Controlled unavailable provider yields an explicit error. Refresh add/edit/delete, stale citations, traversal and hostile-document behavior have meaningful checks; distinguish mocked checks from live observations.
- [ ] E11-07: A browser running inside the sandbox checks source expansion, keyboard submission, no-evidence response and refresh. Save test results and screenshots. If a browser cannot run under the policy/bounds, retain an explicit failed or unverified criterion.
- [ ] E11-08: Build/hash A inside sandbox, serve and smoke-test A, observe deliberate B failure, restore identical A and smoke-test recovery. Record configuration as well as artifact identity. This is local deployment only.
- [ ] E11-09: Export sanitized evidence, stop only owned resources, verify no owned listeners/processes/containers remain, and confirm baseline/unrelated resources preserved. Report request usage, retained disk usage, limits and any unresolved findings. Never label the whole trial complete with missing criteria.

## Ownership and dependencies

- Human owner: ChouBokYann.
- Agent responsibilities: prepare and execute the accepted trial, author the restricted harness, collect evidence and report failures; no self-approval of maintainer acceptance.
- Affected paths: this proposal; new output/e11-worktree/experiments/sandbox-document-chatbot/** on a proposed experiments/11-sandbox-workflow local branch. Temporary resources use an exact E11 ownership manifest. No modifications to E09/E10 or unrelated work.
- Related evidence: output/proposals/experiment-09-workflow-compatibility.md; output/proposals/experiment-10-document-chatbot.md; corresponding experiment delivery records.
- Issue search: repository GitHub search for `sandbox` on 2026-11-22 returned no matching issue. Existing candidate skills are reused, not duplicated.
- Blocker before implementation: record acceptance under workflow.md or an explicit user waiver of issue-first and other-maintainer gates for this local E11 trial. Previous waivers were scoped to earlier experiments.

## Sources, impact, and risks

- Project direction: NORTHSTAR.md; contribution contract: workflow.md and AGENTS.md.
- Skill baseline: c276159399bcca4bec874b3a521dfa61b5a0200b; retain its existing attribution/notices in copied skills.
- OpenShell: https://github.com/NVIDIA/OpenShell (0.1.9; preserve upstream license/notices from reused artifacts).
- ACP adapter: https://github.com/agentclientprotocol/codex-acp (2.9.0; Apache-2.0).
- Codex: https://github.com/openai/codex (0.171.0; retain package notices).
- Host authentication and Docker gateway remain trusted host components. This is not complete host isolation or proof of resistance to every sandbox escape. ACP prompt counts are not underlying model-call counts.
- Undo: remove only resources named in the E11 manifest, close bridge, preserve sanitized records and optional source artifacts. Do not stop Docker Desktop or prune unrelated resources.

## Open questions

Accept this concrete scope, fresh execution bounds and the local-trial contract waiver. Browser/runtime feasibility is an explicit bounded setup check, not a presumed success.

## Execution outcome, 2026-11-22

Approval/waiver received as recorded above. Trial stopped during setup after the initial attempt and one setup retry. Linux workload image built; OpenShell bootstrap failed before sandbox/bridge startup. Two offline correction rounds used; zero ACP turns. See ../e11-worktree/experiments/sandbox-document-chatbot/DELIVERY.md for failures, limited passing checks, cleanup evidence and unverified criteria. Further execution requires a newly authorized allowance, not a reset of this trial's counters.

Subsequent continuation: user authorized one additional setup attempt/correction round. OpenShell sandbox created and filesystem probes passed; ACP gate refused changed host configuration and Chromium failed under process restrictions. No model turns. Owned resources cleaned up. Cumulative setup retries used 2/2, corrections used 2/3. See the latest DELIVERY.md section; the complete engineering workflow remains unverified.

Latest continuation: user explicitly authorized a third setup retry using the remaining correction round. Model-directed edits/tests, browser journey and local A→fault→identicalA recovery now demonstrated inside OpenShell with restricted host ACP. Six prompt turns used (2development,4QA). Acceptance remains partial: inherited page counter incorrect and API stale-source checks not run. All owned services/token cleaned up; original15 containers preserved. See current DELIVERY.md and evidence/third-final-verification.json; earlier stopped outcomes remain historical. No extra budget inferred from unused prompt turns.
