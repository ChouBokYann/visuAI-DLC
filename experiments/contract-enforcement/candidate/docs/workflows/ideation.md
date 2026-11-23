# Ideation workflow

Candidate workflow: turn a product problem into a justified solution direction and bounded requirements for Planning. Analyze existing capabilities and integration options before proposing custom work. Start where the supplied context is sufficient; this is not a mandatory interview sequence.

## Entry and scope

Read the user's request and relevant current artifacts first. Use the table to choose a skill, then load only that skill and the references it needs. Do not preload all skill bodies or their templates. Skill files are canonical; this document coordinates them without replacing their instructions.

| Current need | Entry point | Expected handoff |
|---|---|---|
| Users, unmet need or desired outcome unclear | [Clarify problem](../../skills/ideation/clarify-problem/SKILL.md) | Sourced problem brief and explicit research questions |
| Quality target or experience expectations lack observable criteria | [Understand expectations](../../skills/ideation/understand-expectations/SKILL.md) | Original expectations mapped to checks, labelled interpretations and judgment ownership |
| Problem clear; existing capabilities or decisive feasibility facts unknown | [Research solutions](../../skills/ideation/research-solutions/SKILL.md) | Evidence-backed options, integration constraints and gaps |
| Options known; choice or reassessment needed | [Recommend solution](../../skills/ideation/recommend-solution/SKILL.md) | Justified proposed/conditional direction or deferred choice |
| Direction selected, or provisional requirements explicitly requested | [Define requirements](../../skills/ideation/define-requirements/SKILL.md) | Bounded requirements, acceptance conditions and Planning readiness |

If the user requests one skill or a narrow artifact edit, stop at that scope. When they request the Ideation workflow, continue through applicable handoffs as information permits. The skills' own “do not automatically invoke downstream skills” boundaries prevent standalone scope expansion; this workflow coordinates progression only under the broader request. Never invent user replies to keep the workflow moving.

## Transition rules

1. **After clarification:** proceed to research if the problem is sufficient and evidence is needed. Reuse adequate supplied research and skip to recommendation; if the direction is already selected, go to requirements. If a material need is unresolved, ask the targeted question or return the partial brief.
2. **After research:** proceed to recommendation when evidence supports a meaningful comparison, including known lack of fit. Material access failures, stale claims and conflicts travel with the evidence. A partial comparison can still yield a conditional recommendation; it cannot establish missing facts.
3. **After recommendation:** preserve the distinction between the recommendation and the user's choice. If choice remains with the user, present the short recommendation and wait for the decision. If the user explicitly delegated selection, record the agent's choice and the scope of that delegation without calling it human review. If provisional requirements were requested, proceed with the condition visible; otherwise do not quietly turn an unaccepted proposal into a settled direction.
4. **Before requirements:** use sufficient existing expectations, or call understand-expectations when the user's quality target has not been operationalized. A target such as polished portfolio demo is not optional polish. Preserve prior preferences and unresolved quality criteria.
5. **After requirements:** stop Ideation. “Ready for Planning” is the skill's completeness assessment, not permission to implement, publish an issue or start a Planning skill. A provisional or blocked handoff names safe next work and what remains uncommitted.

Use a specific question for a missing preference and a specific research task for a missing fact. Do not ask the user to rediscover facts that authorized research can establish. When blocked by access or fixed conflicting constraints, state the blocker and stop dependent work. Do not alternate skills on the same unresolved question without new evidence, a changed constraint, or a concrete new check within scope.

On new information, revisit only the affected finding, decision and dependent requirements. Preserve prior rationale and acceptance scope; do not restart every stage or overwrite an earlier user decision. Update the current handoff/status in place rather than appending a competing current status. Keep useful superseded decisions in a clearly labeled history section; remove obsolete next actions from the current view. A changed source can invalidate a conclusion without invalidating the original problem.

## Carry meaning across handoffs

Pass the relevant existing artifact or section, direct claim/source references, material constraints, exclusions, unresolved conditions, and actual decision state. A short summary helps navigation but is not a substitute for the evidence needed by the next skill. No stage may promote “reported,” “documented,” “inferred,” or “unknown” into “observed” or “verified” simply by restating it.

Reuse an established project document and update the relevant sections where practical; the skill templates describe information to preserve, not a requirement to create four new files. If distinct records already serve a purpose, keep them canonical and link directly to their relevant sections. Do not manufacture records for skipped stages, one report per search/agent, or a separate workflow ledger. Preserve IDs and existing metadata; do not force an existing document into a new schema during a narrow edit.

New standalone briefs use the skill's minimal OKF metadata. An established combined document may retain its own appropriate type while holding the applicable sections. The agreed semantic-extension direction remains research: no new ontology, graph validation, or automatic claim-verification capability is implied by this workflow.

## Human view and completion

At a meaningful decision or handoff, give one or two sentences describing the current outcome, its contribution to the user's need, and any material blocker or next action. Consolidate stage results rather than stacking four summaries. Link to the current detailed artifact; do not create another summary file. Include save/unsaved status within the sentence limit. When no artifact destination exists, provide the complete unsaved brief(s) using the selected skills' fallback rather than claiming a save; combine relevant sections where that avoids duplicated content.

End with the current direction, requirements readiness, remaining decision/evidence gap, and next owner/action represented in the existing record. Stop when the requested handoff is reached or a stated blocker prevents it. No mandatory runtime, agent fanout, installation, spending, or external publication is introduced. Research and file operations remain subject to their actual permissions and the project's [contribution workflow](../../workflow.md).

For an authorized end-to-end build, continue through [Deliver a change](deliver-change.md); standalone Ideation still ends at its handoff.
