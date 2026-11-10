---
name: clarify-problem
description: Clarify a user's product problem, affected users, desired outcomes, and constraints before solution research. Use for ambiguous needs or incomplete problem briefs; skip the interview when the supplied context is already sufficient. Does not select technologies or plan implementation.
---

# Clarify problem

Produce a problem brief that can guide research into existing solutions. A request for an app is a proposed means, not automatically the underlying need.

## Inputs and boundaries

Use the user's request and any supplied briefs, decisions, or relevant project context. A repository is optional. Read existing context before asking questions; do not search unrelated files or conversations.

Keep this skill independently usable. Do not require another skill, a subagent, a research service, or a specific runtime. Do not choose a provider, conduct a market survey, design an implementation, publish an issue, or build anything as part of clarification.

## Clarify only what is missing

1. Find the existing problem brief, if supplied or discoverable in the relevant project location. Separate user statements, observed evidence, and your assumptions. A user report is evidence of what they reported, not proof of market-wide behavior.
2. Establish the affected users, concrete situation, current approach and its shortcoming, desired outcome, and material constraints. Ask the most consequential unanswered question first; use a recent example when the need is vague. Do not present an invented audience or feature list as established context.
3. Distinguish suggested solutions from firm constraints. Respect explicit decisions. If constraints conflict, name the conflict and ask which condition can change only if the user has not already answered. If neither can change, return a partial brief with the blocker; do not repeat the question, invent feasibility, or silently relax a constraint. Gather observable success indicators without inventing targets.
4. Stop asking when the known problem can guide solution research. Unknowns that research can investigate belong in the handoff; do not demand answers to them from the user. If context already suffices, produce the brief directly. If the user cannot answer a blocking question, return a partial brief and one concrete discovery action, not a completed problem definition.

For example, “I cannot find cafe spots in Singapore” calls for a recent failed discovery experience, not a recommendation to build an AI cafe app. If a factual lookup is needed, identify the fact to investigate and route it to research; never imply a lookup was performed when it was not.

## Produce and maintain the outputs

Read [the problem brief template](references/problem-brief-template.md) when producing a brief. Fill it from established context; use `Unknown` for missing material information and omit irrelevant optional detail. Do not leave instructional placeholders in a delivered brief.

- Maintain one current brief in the project's established artifact location. Update relevant sections and preserve unrelated content, source attribution, and existing metadata. If the file changed since you read it, reread and reconcile before writing. Do not create a new report for each turn.
- If no established destination or file access exists, return the brief in the conversation, explicitly marked unsaved. Never claim a file was written after a failed write.
- Keep the detailed Markdown available through its path or link. The default human response is one or two sentences explaining the problem, its significance, and any blocking uncertainty or next step; include any unsaved-artifact notice within that limit. Do not dump the full saved brief unless requested. For unsaved output, put the short update first, followed by the detailed brief as the fallback artifact.
- Preserve a source for each substantive factual claim. Use supplied source identifiers or descriptive references to user messages; do not fabricate URLs, dates, citations, approval, or verification. Label assumptions and proposals explicitly.
- New briefs use the template's minimal OKF frontmatter. Preserve existing `visu` fields if present, but do not invent a semantic extension schema or claim graph validation. Do not mark content verified merely because you wrote or summarized it.

## Completion and handoff

The brief is **ready for solution research** when it identifies whose problem is being addressed, the unmet need, the intended outcome, and constraints sufficient to bound research. Record remaining research questions explicitly. Readiness is an agent assessment, not user approval or evidence that a solution works.

Otherwise mark it **needs clarification**, state the blocking gap, and give the next question or discovery action. If the supplied context has already moved beyond discovery, preserve its decisions and identify the next appropriate stage instead of restarting this interview. No downstream skill is automatically executed.

Before handing off, check that the human update agrees with the brief, material uncertainty survives compression, and no solution or target was invented. Corrections update the same brief without replaying answered questions.

## Attribution

Adapted from Superpowers brainstorming: context-first discovery and proportionate questioning. See [upstream attribution and MIT notice](references/upstream-notices.md) for the pinned source and differences; read it when reviewing or redistributing the adaptation.
