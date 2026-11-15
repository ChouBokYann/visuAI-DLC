# Proposal: verify a bounded change

Status: candidate work on `first-iteration`, authorized by the user's “ok go for it” after the Implementation candidate and proposed move to Verification. This is session-authorized exploration, not independent maintainer acceptance or merge permission. Actual testing in another project remains deferred.

## Need, change, and ownership

Implementation checks each increment, but completion still needs a whole-change assessment: do the actual changes meet the requirements, follow applicable project rules, and have sufficient evidence for the claims being made? Passing unit tests or an implementer's summary alone cannot establish that.

Add one skill, `verify-change`, with a new-record template and upstream notices. Root agent owns `skills/verification/verify-change/`, `skills/verification/README.md`, this proposal, and `docs/proposals/verification-change-walkthrough.md`. Human owner: ChouBokYann. Existing skills, `.bench-run/`, and `output/` remain untouched.

Issue search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred slice #9](https://github.com/ChouBokYann/visuAI-DLC/issues/9). Historical criteria are not revived. No issue publication or independent acceptance is claimed.

## Source selection

Primary source bodies were read at pinned revisions; no claim about latest releases or upstream runtime behavior is made.

| Source | Retain | Adapt or omit |
|---|---|---|
| [Superpowers verification-before-completion](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/verification-before-completion/SKILL.md) | Identify the claim, inspect actual results, and check requirements rather than infer success from tests alone. | Replace mandatory rerunning in every message with inspected evidence valid for the current artifact/environment. No automatic destructive revert to demonstrate regression sensitivity. |
| [Matt Pocock code-review](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/code-review/SKILL.md) | Explicit comparison scope and distinct requirements/standards assessment. | No mandatory parallel agents, tracker setup, fixed smell catalogue, or automatic requirement to ask for context already available. Account for uncommitted and relevant untracked changes, not only committed diff. |
| [pstack prove it works](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-prove-it-works/SKILL.md) | Inspect the real behavior/artifact, not proxy metrics or self-reports. | Reuse existing meaningful checks; no mandatory new proof script. |
| [ECC verification-loop](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/verification-loop/SKILL.md) | Relevant project checks, diff review, and explicit separation of local results from target-environment acceptance. | No fixed six-phase suite, generic grep-as-security-proof, 80% coverage threshold, periodic reruns, assumed package runner, or `HEAD~1` comparison. |

## Boundaries and outputs

The skill inspects the selected change, validates relevant evidence, runs permitted missing/invalidated checks, and reports precise findings. It does not automatically fix product code, expand scope, publish a review, merge, deploy, or claim independent human approval. A broader user request can separately authorize fixes through the Implementation loop; affected findings and evidence must then be reassessed.

Maintain a verification section in the existing delivery record, or use the template for a new record. Record exact scope/tested state, criterion-to-evidence links, distinct requirement/standards outcomes, findings with sources and consequences, target acceptance when relevant, and next owner/action. Preserve IDs and meaningful history; no new report per check. Human output is one or two sentences linking to detail and exposing material gaps.

## Alternatives, tools, and risks

Doing nothing trusts implementation self-report. Adopting the full upstreams adds fixed suites, runtime dependencies, and repeated work regardless of need. A single bounded verification skill adds whole-change scrutiny while reusing only evidence whose provenance, state, environment, and scope can be established.

No new dependency, service, model fanout, or executable helper. Use the project's existing tools and authorized test environment; external or production checks require actual permission. The user's chosen agent service may process supplied project content under its existing terms; no additional upload or paid service is required. Missing access is recorded as a gap. Ruflo tools were not exposed in this session.

Risks: trusting stale evidence, checking the wrong diff, equating standards with product correctness, hiding failed criteria behind a passed suite, or claiming local tests prove deployment. Instructions and walkthrough cases address those boundaries. Rollback removes the candidate/index entry, not project evidence.

## Acceptance and validation

- Establish the requested baseline, target and relevant dirty/untracked state; do not silently substitute the last commit or ignore changes made after a test.
- Trace requirements to actual behavior and evidence. Missing criteria remain unverified; no spec or empty diff cannot imply full success.
- Assess requirements and applicable project standards separately; avoid treating optional style preferences as blockers.
- Reuse inspected current evidence, rerun invalidated/insufficient checks, and obey explicit required-check policies. Missing access and stale reports do not become pass results.
- Report reproducible gaps with affected IDs/paths and significance; assign next work without automatically implementing fixes.
- Keep local verification, target acceptance, reviewer independence, human approval and release authorization separate.
- Preserve concise human output and one maintained evidence record.

Validation: format/link/whitespace checks and a bounded author walkthrough with stale-state and missing-target-access cases. No installed-runtime, independent behavioral, or real-project evaluation is claimed. Pinned attribution and MIT notices accompany the candidate.

## Candidate result

Implemented [verify-change](../../skills/verification/verify-change/SKILL.md), its optional new-record template, pinned attribution/notices, and Verification index entry. Format validation, local links, and whitespace checks passed. The [author walkthrough](verification-change-walkthrough.md) records expected assessment examples with explicit limits; it is not runtime validation. Independent review and testing in another project remain pending.
