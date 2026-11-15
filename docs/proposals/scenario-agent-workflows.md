# Proposal: situation-based workflows and multi-agent adoption

Status: proposal in response to the user's hotfix, feature, design, new-module, modularisation, and logic-review scenarios. Related exploration: [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7). Human sponsor: ChouBokYann. Agent scope for this update: this proposal only. No Symphony instance, tracker configuration, agent runner, new skill, or external issue is changed. Independent review remains pending.

Branch implementation update: the user's subsequent "ok lets try" authorizes the three specialist candidates, [engineering router](../workflows/engineering.md), [portable Symphony prompt adapter](../workflows/symphony.md), navigation, notices, and [bounded validation record](scenario-workflow-trial.md). Human owner: ChouBokYann; agent owns only those paths for this portion. The initial proposal text below records the design basis. Host-specific Symphony configuration and live compatibility remain untested; independent review and main merge permission are not implied.

## Decision

Keep lifecycle folders for organization, but make **the requested situation and current evidence** the agent's entry point. Add a small routing workflow around the existing 16 candidates rather than force every issue through six stages. Skills own methods; a workflow chooses applicable skills; the host orchestrator owns dispatch, isolation, retries, and lifecycle management.

The routes below are candidate compositions, not runtime-tested automation. They do not add authority to publish, merge, deploy, or spawn agents. A request to assess or compare stops at the assessment; it does not silently become implementation.

## Situation routes

Only load a skill when its question remains unanswered. Arrows describe the usual route for an authorized end-to-end task, not required repeated work.

| Situation | Start and normal route | Optional branch | Completion boundary |
|---|---|---|---|
| Debugging / hotfix | `diagnose-issue` -> `implement-increments` -> `verify-change` | Skip diagnosis if cause and fix are already evidenced; use `assess-change-impact` for consequential effects. If release is authorized, continue through `prepare-release` -> `deploy-and-check`. | Regression addressed and required evidence recorded; distinguish code fixed, release ready, and actually deployed |
| Adding a feature | `define-requirements` -> `set-development-direction` -> `implement-increments` -> `verify-change` | Reuse adequate supplied requirements/direction. Use Ideation research/recommendation only if the solution is undecided; domain clarification for ambiguous rules. | Accepted behavior implemented and verified within scope; release remains separate unless requested |
| Design change | Classify as UI/interaction, behavior/rules, or architecture; inspect relevant behavior with `understand-system` when needed | UI: requirements + `test-an-assumption` if choices need observation. Behavior: `clarify-domain-model` / requirements. Architecture: impact + direction. Implement and verify only within the requested scope. | Assessment/experiment result, or implemented design with relevant behavioral checks; an agent preference is not user validation |
| Completely new module | Define its responsibility, consumers, inputs/outputs, invariants, and exclusions; then lean direction -> first vertical increment -> verification | Domain clarification, existing-system understanding, impact on consumers, or an experiment for an uncertain dependency | Module works through an actual consumer path; scaffolding and isolated unit passes do not establish integration |
| Modularise the system | `understand-system` -> `assess-change-impact` -> `set-development-direction` -> incremental refactoring -> verification | Find demonstrated coupling/change friction; isolate API/schema changes as explicit decisions rather than accidental refactor side effects | Agreed restructuring achieved with behavior-preservation evidence and integrated consumer checks; no claim of equivalence from compilation alone |
| Logic check / comparison | Establish intended rules via requirements/domain clarification; inspect actual logic; use `verify-change` for correctness or `test-an-assumption` for a disputed comparison | Same fixtures and expected outcomes for both alternatives; include boundary/error/state-transition cases. Benchmark only if performance is part of the question. | Counterexample, agreement within tested bounds, or inconclusive result; no automatic winner or code rewrite |

### Hotfix constraints

Urgency changes scope and ordering, not the truth standard. Follow an existing authorized incident/containment procedure while diagnosis proceeds; mitigation is not a root-cause fix. Keep a bounded regression check and required release checks. Defer unrelated cleanup. Record the target release/environment, recovery limitations, and checks that cannot run; do not invent emergency authority or silently bypass project policy.

### Design is not one kind of work

A layout change, a change in cancellation rules, and a new service boundary require different evidence. A concrete request usually identifies the kind; only clarify when the difference affects execution. An approved design with clear acceptance criteria should enter implementation directly. Where UI expertise is needed, select a project-appropriate design/accessibility skill separately; generic workflow guidance does not supply that specialist expertise.

### Logic comparison method

Define what is being compared: correctness against a business rule, equivalence, maintainability, or performance. These are different judgments. For correctness/equivalence, pin both versions and apply identical representative inputs with expected results sourced independently from either implementation. Compare outputs, errors, state transitions, persistence, and ordering where observable. One valid counterexample disproves equivalence; matching samples only establish agreement over those samples. Missing rules or unavailable dependencies leave the relevant conclusion unresolved. Performance comparisons also require equivalent work, outputs, workloads, and environments.

## Gaps and proposed specialist additions

The current core can execute these routes, but does not yet provide detailed methods for every scenario.

1. **`refactor-safely`**: already a conditional supplement. Prioritize it for modularisation, preserving behavior, staged caller migration, and checking integration between increments. Keep broader architecture direction in Planning.
2. **`compare-logic`**: proposed new Verification supplement for the comparison method above. `verify-change` owns requirement satisfaction; this skill would own comparative evidence and counterexamples. Do not duplicate ordinary code review or automatically write a replacement algorithm.
3. **`evolve-interface`**: already a conditional supplement. Prioritize when a new module has independently maintained consumers/providers, using one authoritative interface artifact and compatibility checks. A shared type within one atomic build may suffice.

Do not create a separate hotfix or new-module skill solely because these are useful workflow names. Add one only if trial evidence shows a distinct method missing from the composition. UI design specialists remain project-dependent. This proposal does not implement these additional skills.

## Multi-agent work contract

Use a compact assignment in the existing issue/work record or dispatch prompt. No new schema or per-agent report tree is required.

```text
Work: stable issue/work ID; requested situation and outcome
Scope: included/excluded behavior; acceptance criteria or canonical links
Baseline: revision/artifact version; relevant current work state
Ownership: accountable human; integrating agent; this worker's responsibility
Write boundary: assigned files/modules; shared interfaces owned elsewhere
Dependencies: required upstream artifacts, owners, and versions; unresolved facts
Authority: analysis/fix/publish/release scope already granted; pending decisions
Method: next applicable skill path; no prerequisite skill runs if inputs suffice
Evidence: required observation/check; actual result and tested state on return
Handoff: result pointers, material limitations, next action; canonical writer
```

The integrating agent maintains the shared issue/work record. Workers return bounded findings and artifact/commit pointers; they do not concurrently rewrite the same status document. Existing runtime logs remain available for diagnostics without becoming human-required reading. Separate workspaces help isolate file writes but do not eliminate conflicts in shared contracts, databases, issue state, or eventual integration.

Parallelize only work with a clear dependency boundary. Two agents can investigate independent subsystems; consumer and provider implementation can proceed against an agreed contract. Two writers changing the same core API or migration sequence need serialized ownership or a coordinated split. Do not require multiple agents for a small change.

At integration, reconcile actual diffs, inspect shared boundaries, and run checks against the combined revision. Two successful worker summaries do not prove their changes work together. A review agent should receive criteria and primary artifacts rather than only the implementer's conclusions. Agent review is not the independent human approval required by this repository.

On interruption/retry, use `handoff-work` semantics: inspect actual state, retain completed work, invalidate stale checks, and identify partial external operations before repeating them. A worker completion message does not grant another worker release authority. Terminal success requires the requested scope and evidence, not just a process exit code.

## Symphony adoption boundary

Primary reference: OpenAI's [Symphony specification](https://github.com/openai/symphony/blob/main/SPEC.md), inspected 2026-11-15, Draft v1 at the mutable main URL. Pin the actual runtime/spec revision before implementation; a specification does not prove the user's installed fork implements every described capability.

The inspected spec describes issue-based workspaces, concurrent agent execution, retries/reconciliation, and a repository-owned `WORKFLOW.md` whose Markdown body is the per-issue prompt. It separates scheduling from agent-authored ticket updates and allows successful runs to end at a review handoff rather than Done. These are suitable attachment points for this library; they are not an existing integration in our repository. The service's dispatch claims must not be mistaken for general cross-instance locks or dependency coordination for all project artifacts.

Proposed integration:

1. Make a pinned copy of the selected skill folders and required references available in every issue workspace. Use a deliberately chosen vendored location or the target host's supported discovery mechanism. Relative links must survive; a link to this maintainer's local checkout is insufficient. Do not update the skill revision mid-run without recording it.
2. Keep the existing target project's Symphony runtime/tracker configuration. Add a short policy block to its prompt body that identifies the work situation, resolves the work contract, and loads only the next required skill by its actual local path. Do not install a replacement harness or duplicate the entire library inside the prompt.
3. Refresh issue context and actual workspace state on every attempt. A retry may encounter completed code, partial checks, an already-created PR, or a release operation in progress. Reconcile those facts before repeating any side effect.
4. For an unanswered product decision, stop dependent work, record the exact question/evidence and next owner, and hand off. Map blocked/review states to the target tracker's actual eligibility rules so an unattended agent is not continually redispatched against the same unresolved decision. Do not fabricate user answers or assume all adapters handle blockers identically.
5. Route worker results through one canonical status writer. Emit one or two human-readable sentences per meaningful handoff, linking the evidence. Do not have every worker append a full issue comment or create a duplicate report.
6. Keep technical readiness, human approval, merge, and deployment distinct. Configure permissions for the target environment explicitly; adopting this library does not select Symphony's approval or sandbox policy.

This can support two different arrangements: Symphony runs independent issues concurrently, or an issue agent delegates bounded subtasks when its host supports and authorizes that. The skills should work with either arrangement and with a single agent. No subagent availability is assumed by the skills themselves.

## Acceptance cases before claiming adoption

| Case | Required observation |
|---|---|
| Known-cause hotfix | Starts with the authorized fix, avoids a repeated Ideation interview, preserves regression and release requirements |
| Clear feature request | Reuses criteria and direction, implements through checks without producing an exhaustive upfront plan |
| Design-only request | Produces the requested design assessment/experiment and does not silently ship it |
| New module with two workers | Both use the same agreed interface; integration checks catch a serialized-shape mismatch despite separately green tests |
| Modularisation | Preserves observable behavior and flags unintended interface or data changes |
| Logic comparison | Identifies a counterexample; never promotes matching samples into universal equivalence |
| Retry after partial work | Reconciles current files and external operation state, avoids duplicate side effects, reruns stale checks |
| Missing human decision | Records a precise blocker and yields through an actual non-dispatchable handoff policy; no busy retry loop |
| Conflicting writers | Ownership conflict is detected/resolved before shared changes are overwritten; canonical status has one writer |
| Missing skill/tool | Reports the missing local capability and a bounded fallback without pretending the skill or check ran |

Validate initially with isolated fixtures and the intended host, then with the user's separate project when scheduled. Measure human reading burden and unnecessary steps from actual results; no compatibility, token-saving, or reliability claims are established by this proposal.

## Tools, ownership, and risks

This update uses public-source research and local documentation only; no new dependency, cost, credential, tracker mutation, or service is introduced. Ruflo tools were not exposed in this session. Runtime integration later requires the selected Symphony implementation/version, tracker/state model, workspace population method, and host permissions; identify data leaving the project and costs in that implementation scope.

Affected path now: this proposal only. Later candidate scope: a portable routing document, target-specific prompt integration, and separately selected skill additions. Those are proposed, not silently authorized infrastructure changes. Main risks are overlapping ownership, stale evidence on retries, inaccessible skill paths, and accidental publication/release from overly broad prompts. Undoing a trial integration should remove its prompt hook and copied skills without deleting project evidence or another worker's changes.
