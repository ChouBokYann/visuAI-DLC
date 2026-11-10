# Proposal: clarify the problem before choosing a solution

Status: candidate implemented on `first-iteration` at the user's explicit instruction, “lets try to implement this and then go for it,” on 2026-11-10. This session instruction authorizes the candidate work; it is not independent maintainer acceptance, which remains unrecorded. The original proposal is retained below with implementation evidence recorded separately.

## Change and lifecycle process

Introduce `clarify-problem` as an independently callable Ideation skill. Proposed implementation paths: `skills/ideation/clarify-problem/SKILL.md`, its output template and upstream notice under `references/`, and `skills/ideation/README.md` for navigation. This proposal itself lives in `docs/proposals/`.

## Problem and need

The maintainers need agents to understand a user's actual problem before recommending technology. Broad brainstorming workflows can proceed into solution design too early, repeat questions already answered, and leave humans with lengthy reports.

Example input: “I cannot find cafe spots in Singapore.” This does not establish whether the gap is discovery, suitability for working, opening hours, or something else. A recommendation app is not yet a justified solution.

## Proposed solution

Adapt the problem-discovery practices from Superpowers brainstorming into a bounded skill. The surrounding product workflow takes inspiration from CRISP-DM's problem-first approach; this is not a claim of CRISP-DM conformance.

### Inputs and behavior

- Accept the user's problem and any existing briefs, decisions, constraints, or relevant project context. Do not require a repository for a new product idea.
- Read supplied context first. Reuse established information and identify its source; distinguish user statements, observed evidence, and agent assumptions.
- Ask focused questions only where the answer changes the understanding or next action. Explore affected users, a concrete situation, current behavior or workaround, the unmet need, desired outcome, and constraints.
- Separate the need from a proposed solution. If the user names a technology, determine whether it is a firm constraint or a suggestion without reopening an explicit decision unnecessarily.
- Record observable success indicators. Do not invent numerical targets or user evidence.
- If the input already provides a sufficient problem definition, summarize it and hand off without replaying the interview.
- Do not choose a solution, conduct a market survey, write implementation tasks, or begin building. A factual lookup needed for clarification may be proposed or routed to research; it must not be silently represented as completed.

### Outputs and handoff

Maintain one problem brief in the project's existing artifact location where possible. Update or reference an existing brief rather than creating another report for each interaction. If no persistent destination is available, return the brief in the conversation and identify it as unsaved.

The detailed Markdown output contains: problem statement; affected users and context; current approach and unmet need; desired outcome and success indicators; constraints and exclusions; supporting sources; assumptions and unresolved questions; and the recommended next step. Each substantive statement must retain its evidential status. Unknown fields stay unknown.

The human update is one or two sentences explaining the clarified problem, why it matters, and any blocking uncertainty or next action. It must not introduce claims absent from the brief.

Carry forward the agreed OKF-plus-extension direction: preserve standard OKF conventions, keep semantic additions namespaced, and do not infer verification from a prose claim or metadata label. Exact extension fields, automated rendering, and graph validation are separate research; this proposal does not adopt the historical knowledge-v1 schema or establish a new schema.

Completion means the brief is sufficient to guide solution research, with material unknowns explicit. If a missing answer prevents that, return a partial brief and the specific blocking question. Do not claim shared understanding or user confirmation unless actually provided. The user can correct the brief without restarting the entire interview.

## Scope

- Included: one skill, a compact reusable output template, attribution, index entry, and recorded walkthrough evidence.
- Excluded: the other three Ideation skills, workflow execution machinery, installation, automated publication, a UI, an ontology runtime, a validator, and a final OKF extension contract.
- The eventual workflow may enter at clarification, research, recommendation, or requirements depending on available context. This skill is not a mandatory interview for every task.

## Alternatives and tradeoffs

- Use Superpowers brainstorming unchanged: avoids adaptation, but includes solution design and downstream process requirements beyond this skill's boundary.
- Use Matt Pocock's grilling approach: useful for stress-testing decisions, but its exhaustive decision-tree interview is broader than initial problem clarification.
- Combine all Ideation work into one skill: simpler routing, but loads unnecessary instructions for users who already know their options. The user explicitly prefers independent skills.
- Keep clarification informal: least maintenance, but produces inconsistent handoffs and loses the distinction between supplied facts and assumptions.

Revisit the split if walkthroughs show repetitive questioning or duplicated artifacts between skills. Do not add another skill to address a template problem.

## Tools and services

Uses the existing agent harness and optional local file reads/writes. No new dependency, service, installation, or mandatory subagent. Model usage has the existing harness's costs and data policy; no additional data recipient is introduced. External research and issue publication are not automatic. Use conversation-only output when file access is unavailable, and report unavailable context rather than guessing.

## Acceptance criteria and validation

- [ ] Ambiguous-input walkthrough: given only the Singapore cafe statement, asks about the unmet need and does not invent the audience, filters, technology, or numerical targets.
- [ ] Sufficient-input walkthrough: given a clear user group, scenario, gap, constraints, and outcome, reuses those facts and produces a brief without repeating answered questions.
- [ ] Missing-input walkthrough: when the user cannot explain the gap, records uncertainty and a concrete discovery question rather than declaring readiness for solution selection.
- [ ] Solution-led-input walkthrough: distinguishes “build an AI cafe app” from its underlying problem, preserving any explicitly mandated constraint.
- [ ] Conflicting-input walkthrough: surfaces contradictory constraints without silently choosing one or fabricating agreement.
- [ ] Existing-brief walkthrough: updates or references the existing record, preserves unrelated material, and identifies corrections rather than producing a redundant document chain.
- [ ] Each walkthrough captures actual input, output, assessment against these criteria, and limitations. Hypothetical examples are not execution evidence.
- [ ] Human update stays within two sentences and preserves the brief's important uncertainty. A reviewer can identify the problem and next action without reading the detailed brief.
- [ ] Skill documents inputs, steps, outputs, completion, failure behavior, source attribution, and its bounded handoff. Check links and template consistency; no executable helpers are proposed, so code tests are not applicable.

### Illustrative walkthrough, not a test result

Input: “I cannot find cafe spots in Singapore.”

Expected first behavior: ask for a recent example of trying to find a suitable cafe and what made the available choices inadequate. Do not assume that the user wants quiet workspaces.

If the user subsequently says they need a place for two hours of laptop work, that becomes a sourced user requirement. Ask about only material remaining ambiguities. If opening-hour data is unverified, retain that uncertainty for research.

Expected handoff: a bounded description of the discovery problem and suitability criteria, plus the unanswered questions research should address. No selected provider or custom application is presumed.

## Ownership and dependencies

- Human owner/proposer: ChouBokYann.
- Independent maintainer reviewer: Perryong, subject to their participation and explicit acceptance.
- Agent responsibility: implement the bounded skill, template, notice, and index entry at the user's explicit instruction; record walkthrough evidence in `docs/proposals/ideation-clarify-problem-walkthrough.md`. No other Ideation skills or semantic infrastructure are included.
- Related: [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) covers candidate comparison. [#8](https://github.com/ChouBokYann/visuAI-DLC/issues/8) is a deferred, superseded broader slice; its scope and grants do not carry forward. On 2026-11-10, #8 had no comments and no current implementation acceptance.
- Review status: the user explicitly directed candidate implementation in this session despite the previously reported acceptance gate. No independent issue acceptance, delivery approval, or main-branch merge permission is claimed. The proposal was pushed to `first-iteration` at the user's request; no issue publication is authorized by this draft.
- Preserve the existing untracked `.bench-run/` and `output/` directories.

## Sources, impact, and risks

Primary adaptation candidate: [Superpowers brainstorming at 22f0b463e7a5e579904dd6211a520321035526f7](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/brainstorming/SKILL.md). Its [MIT license](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/LICENSE), copyright 2025 Jesse Vincent, was inspected. Preserve its full notice alongside any substantial adaptation. Retain context-first discovery and proportionate questions; omit compulsory design documents, visual companion, reviewer fanout, and implementation routing from this skill.

Alternative inspected: [Matt Pocock grilling at 4ae2317ddb22b046e26455e4f9c9b3aaaf62212d](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md). No material from this alternative is proposed for copying.

The user-approved semantic direction is a research requirement, not a delivered capability. Risks include premature solution selection, repetitive interviewing, unsupported assumptions appearing as facts, and concise summaries hiding uncertainty. The walkthroughs target these risks. No existing runtime or stored project data is migrated; a future skill can be removed with its index entry without removing project briefs.

## Open questions

No further user preference is required to review this bounded proposal. The exact OKF semantic extension and its validation remain separate research decisions; neither is silently settled here. Independent maintainer acceptance is pending.

## Candidate implementation evidence

- Implemented [skill](../../skills/ideation/clarify-problem/SKILL.md), its output template and full upstream MIT notice, and the Ideation index entry. No executable helper, renderer, or ontology infrastructure was added.
- [Simulated walkthrough record](ideation-clarify-problem-walkthrough.md): a separate agent applied the skill to six supplied cases without reading this proposal or the parent conversation. This is behavioral evidence, not independent human approval or a multi-runtime benchmark. The initial run exposed a conflict-handling ambiguity and an overlong human wrapper; targeted corrections and reruns are recorded there.
- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ideation/clarify-problem` passed. The initial command without UTF-8 mode failed on the Windows default encoding, before validating the skill.
- Local Markdown links resolve. `git diff --check` passed for tracked edits; staging validation covers the new files before commit.
- Outstanding: maintainer review, runtime installation/discovery, real user comprehension testing, filesystem concurrency exercise, and the separate semantic-extension research. The acceptance checklist above remains the review checklist rather than a claim that simulation establishes every acceptance criterion.
