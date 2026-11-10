# Proposal: recommend a proportionate solution

Status: candidate implementation on `first-iteration`, explicitly requested by the user on 2026-11-10. This follows the session-authorized candidate process; independent maintainer acceptance and merge permission remain unrecorded.

## Change and lifecycle process

Add `skills/ideation/recommend-solution/SKILL.md`, a decision-brief template and upstream notices in `references/`, and an Ideation index entry. Record evaluation in `docs/proposals/ideation-recommend-solution-walkthrough.md`. Earlier skills remain unchanged.

## Problem and need

Users who already know the options need a justified recommendation without repeating discovery or receiving a premature implementation. Low headline cost or fashionable technology can distract from mandatory constraints, integration effort, evidence gaps, and long-term operating work.

## Proposed solution

Compare options against the user's problem and constraints, distinguish mandatory conditions from preferences, and recommend the simplest sufficient reuse, configuration, integration, or bounded custom approach. Preserve reasons, alternatives, decisive assumptions, and conditions that would change the choice. Refuse to manufacture a winner when a material unknown or conflict prevents selection. Maintain one decision brief, with a one- or two-sentence human update and minimal OKF metadata.

## Scope

- Included: independently supplied options or research briefs, explicit eligibility and tradeoffs, conditional recommendations, existing-decision updates, and a handoff to requirements.
- Excluded: broad research, automatic purchases/publication/builds, detailed architecture, mandatory scoring, a new semantic schema, and execution of the next skill.

## Alternatives and tradeoffs

- ECC search-first unchanged couples search, decision, and installation. Adapt only its adopt/extend/compose/build distinction.
- A numerical ranking can help when users supply meaningful weights and comparable evidence, but unsupported scores create false precision. Default to requirement-specific explanations.
- Selecting the cheapest tool ignores operating and integration effort; prefer the smallest approach that actually meets mandatory needs. Custom work is justified only for evidenced gaps.
- Doing nothing or keeping the current workflow can be valid if it meets the need. Do not force a technology integration with no benefit.

## Tools and services

Existing harness and optional artifact reads/writes only. No new dependency, mandatory agent, or paid service. Reuse supplied research; request or route a bounded refresh of decisive stale facts rather than claim they remain current. External queries, when authorized and required, must minimize private context and disclose access limitations. No live probes, account creation, or spending are implied by recommending an option.

## Acceptance criteria and validation

- A well-supported existing capability wins over unnecessary new construction, with the actual requirement fit explained.
- A mandatory constraint cannot be outweighed by a preference or a numerical score.
- Unknown API access, cost assumptions, or contradictory decisive evidence produce a conditional recommendation or deferred choice, with a specific next check.
- If no candidate meets mandatory needs, report that result without silently relaxing scope or inventing a custom solution's feasibility.
- A prior user decision is preserved unless reconsideration is requested or new evidence materially undermines it; disclose the evidence and request the necessary decision rather than overwrite approval.
- Outputs retain claim sources and uncertainty, distinguish proposed from user-accepted choices, and include rationale, alternatives, revisit conditions, and requirements handoff.
- Human update is at most two sentences including save status. New briefs are complete Markdown artifacts with delimited YAML frontmatter.
- Run isolated synthetic-source cases, record actual outputs and observed defects, validate skill structure and links. These checks do not establish real vendor feasibility or human approval.

Example: compare a documented existing laptop-policy workflow with a proposed custom cafe app. If neither establishes current policy coverage, the skill must preserve that gap rather than treat a functioning listing interface as proof of suitability.

## Ownership and dependencies

- Human owner: ChouBokYann. Independent reviewer: Perryong, subject to participation.
- Root agent owns proposal, skill, template, notices, index, checks and push. Evaluation agent owns only the walkthrough record, using synthetic supplied evidence with no external mutations. Agents must preserve one another's files.
- Open issue search repeated: #7 covers exploration; #8 remains deferred. No independent scope acceptance is inferred. This is a local proposal, not an issue publication.
- Inputs can come directly from the user; no installed upstream or local research skill is required. `define-requirements` remains unimplemented.

## Sources, impact, and risks

- [ECC search-first](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/search-first/SKILL.md), MIT, copyright 2026 Affaan Mustafa. Source and license inspected during the preceding research-skill work.
- [pstack laziness protocol](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-laziness-protocol/SKILL.md), MIT, copyright 2026 Lauren Tan. Source and license inspected for this candidate. Its minimal-change principle is adapted to solution scope; it is not itself a product-selection method.

Preserve full license terms and both notices. No upstream helpers are copied. Risks: unsupported winner, stale pricing, unacknowledged user-decision override, and compressed summaries hiding blockers. Walkthroughs target these. Removing the skill and index entry reverses the library change without deleting generated project decisions.

## Open questions

Independent review and semantic-extension design remain pending. The bounded candidate has no additional unresolved user preference.

## Candidate validation

- Skill structure passed `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ideation/recommend-solution`. Local Markdown links resolve; staged whitespace checks run before commit.
- [Walkthrough evidence](ideation-recommend-solution-walkthrough.md) records five isolated synthetic cases and their actual outputs. Parent review found unresolved mandatory conditions buried in the first two briefs while their summaries/states presented ordinary recommendations. Step 6 now explicitly requires conditional/deferred status and the decisive condition in the human update. Targeted reruns are preserved with original evidence.
- Not established: actual vendor suitability, independent human comprehension/review, runtime discovery, real integration or concurrency behavior, and semantic-extension correctness. No executable helper was introduced.
