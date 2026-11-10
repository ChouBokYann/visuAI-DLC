# Proposal: define requirements for Planning

Status: candidate work on `first-iteration`, explicitly requested by the user on 2026-11-10. Independent maintainer acceptance and merge permission remain unrecorded; this follows the session-authorized candidate process.

## Change and lifecycle process

Add `skills/ideation/define-requirements/SKILL.md`, its requirements-brief template and upstream notice under `references/`, an Ideation index entry, and walkthrough evidence alongside this proposal. This is the final proposed skill in Ideation, not the full routing workflow implementation.

## Problem and need

Planning needs a clear statement of required behavior, quality constraints, acceptance conditions, and open decisions. An exhaustive AI-generated feature list can silently expand scope or turn an unverified integration assumption into an implementation commitment. Users also need a concise explanation of what the resulting requirements mean.

## Proposed solution

Adapt Matt Pocock's synthesis-oriented to-spec skill into a bounded requirements handoff. Reuse supplied decisions and research, identify each requirement and its source, express observable acceptance, and separate established requirements from agent proposals and unresolved conditions. Keep one current brief and a one- or two-sentence human update. Use minimal OKF metadata without implementing the semantic extension.

## Scope

- Included: functional requirements, relevant quality/operational constraints, integration boundary needs, explicit exclusions, observable acceptance conditions, provisional requirements, and updates preserving existing identifiers and decisions.
- Excluded: exhaustive invented stories, solution selection, new architecture or task breakdown, test implementation, automatic issue publication, ready-for-agent labeling, runtime installation, ontology infrastructure, and workflow automation.

## Alternatives and tradeoffs

- Upstream to-spec unchanged produces extensive stories and publishes directly. Retain synthesis, problem/solution framing, testable external behavior and exclusions; remove publication and forced volume.
- A free-form summary is cheaper but insufficient if Planning must guess behavior or acceptance. Use a small template, omitting irrelevant categories rather than inventing requirements.
- Detailed technical design now would blur the boundary with Planning. Preserve supplied technical constraints, but leave new implementation choices to Planning.

## Tools and services

Existing agent harness and optional local reads/writes only. No external research, paid service, dependency or mandatory agent. Missing source facts become specific questions or research handoffs. Existing harness inference costs/data policy apply; no new recipient. No publication, execution or installation authority follows from a requirements brief.

## Acceptance criteria and validation

- Clear chosen direction yields bounded sourced requirements without repeated discovery, new features, or architecture selection.
- Conditional provider access remains conditional; provider-independent needs can be recorded without claiming feasibility or user acceptance.
- Vague quality words such as fast, secure, or easy do not become invented numeric targets. Proposed criteria and blockers are explicit.
- Conflicting constraints are preserved and prevent an unconditional Planning handoff.
- Updating one requirement preserves its ID, unchanged requirements and unrelated notes; changed acceptance and dependent requirements are reconciled or flagged.
- Each requirement has a source/rationale, evidential/decision status and observable acceptance, or an explicit missing decision. Observability is not proof that the requirement has been met.
- Human update is one or two sentences including save status and material blockers. A new brief is a complete Markdown artifact with delimited YAML frontmatter.
- Run isolated synthetic walkthroughs, record actual outputs and defects, validate skill structure and local links. No executable helper tests apply.

Example: an approved manual cafe-policy workflow needs a record of the policy and last-check information, not automatically an app, recommendation engine, or live occupancy feed. If the user has not specified freshness expectations, preserve that question rather than inventing a daily refresh requirement.

## Ownership and dependencies

- Human owner: ChouBokYann; independent reviewer: Perryong, subject to participation.
- Root agent owns this proposal, skill files, template, notices, index, validation and push. Evaluation agent owns only `docs/proposals/ideation-define-requirements-walkthrough.md`, uses synthetic inputs, and must preserve others' work.
- Repeated issue search: #7 covers candidate exploration; #8 remains deferred. No active issue specifically accepts this scope; the local proposal is not a published issue or independent approval.
- Works from direct user context or prior artifacts; earlier skills need not be installed. Keep them unchanged.

## Sources, impact, and risks

[Matt Pocock to-spec](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-spec/SKILL.md), pinned commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`, MIT, copyright 2026 Matt Pocock. Source reread for this adaptation; license previously inspected and full notice retained locally. No executable helpers copied.

Risks are scope inflation, invented targets, presumed approval, loss of dependency conditions, and stable IDs changing during updates. Walkthroughs exercise these. Reversal removes the candidate and index entry; project requirement records are not deleted.

## Open questions

Independent review, runtime discovery and the separate semantic extension remain pending. No additional user preference blocks this candidate.

## Candidate validation

- Skill structure passed `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ideation/define-requirements`. Local Markdown links resolve; staged whitespace validation covers all new files before commit.
- [Five-case walkthrough](ideation-define-requirements-walkthrough.md) records actual outputs from a separate agent using synthetic inputs: chosen manual workflow, conditional provider, undefined quality criteria, incompatible constraints, and a narrow update. Parent review found no instruction change necessary in this run. Existing-record preservation correctly takes precedence over adding new frontmatter in the update case.
- These checks do not establish repeatability, human comprehension/approval, runtime installation, actual product acceptance, integration feasibility, filesystem concurrency handling, or end-to-end workflow behavior. No executable helper was added.
