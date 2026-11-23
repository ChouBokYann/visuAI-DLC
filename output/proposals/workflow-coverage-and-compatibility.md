# Workflow coverage and development-tool compatibility

Research snapshot: 2026-11-22. Human owner Bok; root owns this assessment and the linked proposal. No new live trial or canonical skill change is claimed. Existing experiment evidence was read, not rerun. This consolidates evidence at its own pinned versions; it does not claim every result applies to the current checkout.

## Baselines and a correction to the previous explanation

The working checkout is first-iteration at `4f170cfb62ed4549d98c63ff5f8cff95820b29d6`. Experiments06–08 use the first-iteration-1.1 base `c276159399bcca4bec874b3a521dfa61b5a0200b`, with additional identified experiment artifacts. The coordination skill exists in the latter but not in the current first-iteration checkout. Therefore the prior workflow explanation described one checkout; it was not an integrated inventory of every tested branch. A future trial should vendor the c276159 library explicitly and preserve its supporting files. No merge is implied.

## What existing evidence actually covers

| Workflow boundary | Skills/practices | Observed evidence | Gap / next useful check |
|---|---|---|---|
| User intent → requirements | clarify-problem, understand-expectations, define-requirements | [Experiments01/02 comparison](../../experiments/cafe-comparison/README.md): technical passes did not prevent user rejection; retry better matched intended experience. | Artistic direction remained a gap. No general user-comprehension or requirements-quality success rate. |
| Existing repo → change direction | understand-system, assess-change-impact, set-development-direction | [E08](../e08-worktree/experiments/existing-api-data/results.md): real JWT/controller/ORM/DB path, callers, auto-sync and side-effect boundaries inspected. | One Express/PostgreSQL app; not broad stack compatibility. |
| Requirement/interface → implementation | evolve-interface, implement-increments | [E03/04](../e06-worktree/experiments/cafe-shortlist-comparison/README.md): both implementations passed22 frozen acceptance criteria. E08 omission/null and old-client semantics passed actual HTTP/SQL. | Different test groupings and prior knowledge prevent a controlled framework ranking. |
| Review finding → repair → retest | coordinate-agent-work, verify-change | [E05](../e06-worktree/experiments/coordinate-agent-work-bugfix/README.md): seeded bug reproduced; same regression passed after repair; independent browser checks. | Guided seeded defect, not general autonomous review reliability. |
| Shared ownership, interruption and stale evidence | coordinate-agent-work, handoff-work | [E06](../e06-worktree/experiments/coordinate-agent-work-resilience/results.md): conflicting contract, real interrupt/replacement, stale pass rejected and corrected. | Guided scenarios; exact model identity unavailable makes E06-01 partial. |
| Verified artifact → deployment → recovery | prepare-release, deploy-and-check, diagnose-issue | [E07](../e07-worktree/experiments/release-recovery/results.md): A passes7/7, broken B4/7 despite healthy process, restored A7/7, corrected C7/7. | Local target only; no cloud credentials, provider rollout, production recovery or long-term monitoring proof. |
| Migration → restart → old-code compatibility | evolve-interface, verify-change, deployment recovery practices | E08:24 live check groups across5 phases; transactional DDL failure rolled back; full PostgreSQL restart and old-app rollback retained notes. | Initial preservation baseline was late; E08-01/09 partial. Same inherited budget test fails baseline and candidate. |
| Records → structured export | shared workflow-context contract | [Validation](../../docs/proposals/business-context-validation.md): structural checks, source/evidence links, duplicate owners, stale evidence and partial coverage exercised. | Structural correctness does not establish factual truth or independent human comprehension. |
| Host/tool → portable workflow | explicit skill paths and [Symphony adapter](../../docs/workflows/symphony.md) | Documentation/copy-layout checks; no live Symphony integration claimed. | OpenShell, Headroom and their combination have not been executed with this library. |

Coverage is meaningful but uneven. Do not turn counts of checks into a percentage of all engineering scenarios. No single existing experiment proves the entire requirements-to-cloud-deployment chain.

## Compatibility means three separate things

1. **Load and execute:** can a selected host read the pinned skills and supporting contracts, run the task and retain artifacts?
2. **Preserve meaning:** do requirements, authority, failed evidence, revisions, ownership and retry limits survive the tool boundary?
3. **Improve work:** does the integration change task correctness, measured latency/tokens or recovery effort? Installation or compression alone does not answer this.

## Initial repository shortlist

Names are interpreted as the AI development projects below; these are explicitly identified so Bok can correct an ambiguous name. Both old GitHub URLs redirected to the current owners during inspection.

| Candidate | Inspected source | Proposed role and test boundary | Current status |
|---|---|---|---|
| OpenShell (formerly NVIDIA/OpenShell) | [Pinned README](https://github.com/ai-openshell/openshell/blob/38c47412dd7e94b8efc44b128940e097590b7582/README.md), Apache-2.0 | Execution boundary: load the skill bundle; permit intended workspace edits; deny reads/writes/network outside the test policy; preserve evidence through restart. | Source inspected, runtime not tested. No openshell CLI found. Docker installed but Linux-engine pipe absent even with elevated read-only check. WSL enumeration lists docker-desktop only. |
| Headroom (formerly chopratejas/headroom) | [Pinned README](https://github.com/headroomlabs-ai/headroom/blob/ce0460cfa8598dc939243dbc7aec4b2d35f4e44a/README.md), Apache-2.0 | Context boundary: compare original vs transformed synthetic tool outputs, exact critical facts and retrieval of originals; measure compression separately from task success. | Source inspected, runtime not tested. Not importable in checked Python3.12.7; no headroom CLI on PATH. Metadata inspected on main reported0.45.0 and Python>=3.11; package-to-source mapping remains a prerequisite. |
| Existing agent host | Current host and explicit file loading | Baseline control: same fixture, criteria and artifact format without either tool. | Existing trials supply bounded baseline evidence, but current host inference routing is not exposed as an editable endpoint. |
| Symphony / semantic code-navigation tools | Existing adapter; possible later candidates | Scheduling and code-understanding compatibility after the first two tools. | Deferred; no added installation or compatibility claim. Existing deferred Graphify issue#6 is not reopened. |

OpenShell's pinned README lists Linux, Apple Silicon macOS, experimental Windows/WSL2 and a separate native-Windows guide. A default sandbox does not itself supply an agent. Headroom offers library/proxy/MCP paths; its wrapping and learning commands can change host configuration or instruction files. We should use an isolated library/proxy boundary initially, not wrap the active host or run learning against this repository. Upstream savings claims are not measured savings for visuAI-DLC.

## Readiness correction to implement in the next bounded trial

Before product edits, fixtures, migrations, installs or runtime startup: save source/ref/dirty-state identities, exact allowlisted file hashes including earlier evidence, criteria/check hashes, tool versions, ownership and attempt limits. Complete the snapshot before returning a ready verdict. Read-only discovery and creation of the readiness record itself are allowed earlier. If any required snapshot is missing, return not-ready and perform no dependent mutation.

The gate must be exercised against missing baseline, changed bytes, wrong source revision and missing runtime. Preserve failed gate results. At completion compare hashes against that original baseline; never regenerate a baseline to hide drift. This is the proposed fix for E08's actual evidence gap, not a claim that old evidence can be repaired retrospectively.

## Order of work

1. Approve the [concrete trial proposal](experiment-09-workflow-compatibility.md) through the normal contribution contract or an explicit local exception.
2. Implement and test readiness enforcement inside the isolated experiment; retain old experiments untouched.
3. Run a no-tool control and Headroom offline/library probes first. Report protocol-level checks separately from real model behavior.
4. Run OpenShell only after its actual runtime is available and a pinned install plan fits the approved environment. Missing Linux runtime is a readiness blocker, not a failed security test.
5. Combine only after each individual mode passes. A real model-assisted comparison and cloud deployment remain separate named targets with explicit data/cost boundaries.

No publication, global hooks, automatic memory writes, canonical skill changes or external deployment has occurred in this consolidation. GitHub search found no issue matching OpenShell/Headroom; #7 remains broad comparison context and #10 is deferred, not a current execution grant. Ruflo tools were not exposed in the available tool inventory.
