# Clarify-problem simulated walkthrough

This is a single-agent simulated walkthrough, not independent human review or runtime installation verification. Each case below was processed in isolation with no invented user replies. The agent read only `skills/ideation/clarify-problem/SKILL.md` and its two references as task context; it did not read the proposal or parent conversation. No external service, lookup, publication, or downstream skill was used. The responses below are the actual responses generated for this walkthrough, not descriptions of intended behavior. Briefs appearing in the transcript are unsaved product artifacts; this file is the walkthrough record only.

## Case 1: Vague need

### Exact input

> I cannot find cafe spots in Singapore.

### Generated response

Think of the last time you tried to find a cafe in Singapore: what were you trying to do there, how did you search, and where did that search fall short?

### Observation

Asked for one recent experience to establish the situation and shortcoming. Did not invent an audience, recommend cafes, or propose an app. No brief is yet warranted because the user has not said they cannot answer.

## Case 2: Enough context for research

### Exact input

> I work remotely in Singapore and need a cafe for two hours of laptop work. Last week I checked map listings but could not establish whether laptops were allowed. Help clarify this problem before research. Success means knowing the laptop policy before travelling; do not assume live seat availability or AI is needed. No budget target yet. Return the brief here, do not save a product brief.

### Generated response

You need to establish a cafe's laptop policy before travelling for a two-hour work session. The problem is ready for solution research; budget remains unknown, and research should investigate how reliable policy information can be obtained. The brief below is unsaved.

```markdown
---
type: Problem Brief
title: Establish cafe laptop policies before travelling
description: A remote worker needs to know whether a Singapore cafe allows laptop work before travelling there.
status: draft
---

# Establish cafe laptop policies before travelling

## Human update
You need to establish a cafe's laptop policy before travelling for a two-hour work session. The problem is ready for solution research; budget remains unknown, and research should investigate how reliable policy information can be obtained.

## Problem and context
- Affected users: The requesting remote worker in Singapore. Source: user's message describing their last cafe search.
- Situation and unmet need: They need a cafe for two hours of laptop work and need to know its laptop policy before travelling. Source: same user message.
- Current approach and shortcoming: They report checking map listings last week but being unable to establish whether laptops were allowed. This does not establish that all map listings lack that information. Source: same user message.

## Intended outcome
- Desired change: Know the laptop policy before travelling to a cafe. Source: user's stated outcome.
- Success indicators: The user can establish the laptop policy before the trip. No additional numerical target supplied. Source: user's stated success criterion.

## Constraints and scope
- Geographic scope: Singapore. Source: user's stated situation.
- Use case: Two hours of laptop work. Source: user's message.
- Budget: Unknown; no target yet. Source: user's message.
- Do not assume live seat availability or AI is required. Source: user's explicit instruction.
- Return the brief in chat without saving a product brief. Source: user's explicit instruction.

## Evidence and uncertainty
- Evidence is the user's report of one failed search, not independently verified market evidence.
- The availability, reliability, and currency of laptop-policy information remain unknown.
- No provider or technology has been selected; no lookup was performed.

## Handoff
- Readiness: Ready for solution research; agent assessment.
- Reason: The affected user, concrete unmet need, desired outcome, geography, and duration sufficiently bound research.
- Remaining research questions: Where can laptop policies be obtained? How can their reliability and currency be assessed? Are there conditions on laptop use relevant to a two-hour session?
- Next action: Research existing ways to establish laptop policies for Singapore cafes, keeping costs visible while budget is unknown.
- User confirmation: Not recorded.
```

### Observation

Produced the brief without repeating answered questions. Preserved the budget unknown, did not introduce AI or occupancy requirements, and identified factual questions without claiming research. Readiness is expressly an agent assessment.

## Case 3: User cannot answer

### Exact input

> I want better cafe discovery but cannot explain what is wrong with current options. I cannot answer further today.

### Generated response

The specific discovery problem is still unknown, so this is a partial brief rather than a completed problem definition. On your next cafe search, record what you needed, how you searched, and the point where the result fell short; the brief below is unsaved.

```markdown
---
type: Problem Brief
title: Clarify cafe discovery difficulty
description: The user wants better cafe discovery but has not identified the shortcoming in current options.
status: draft
---

# Clarify cafe discovery difficulty

## Human update
The specific discovery problem is still unknown, so this is a partial brief rather than a completed problem definition. On your next cafe search, record what you needed, how you searched, and the point where the result fell short.

## Problem and context
- Affected users: The requesting user; a broader audience is Unknown. Source: user's message.
- Situation and unmet need: The user wants better cafe discovery; the concrete situation and unmet need are Unknown. Source: user's message.
- Current approach and shortcoming: Unknown. The user cannot explain what is wrong with current options. Source: user's message.

## Intended outcome
- Desired change: Better cafe discovery; what would count as better is Unknown. Source: user's message.
- Success indicators: Unknown.

## Constraints and scope
- The user cannot answer further today. Source: user's explicit statement.
- Geography and budget: Unknown.

## Evidence and uncertainty
- The only evidence is a user-reported desire for improvement.
- No specific failure, audience beyond the requester, feature, or solution has been established.

## Handoff
- Readiness: Needs clarification; agent assessment.
- Reason: No concrete unmet need or observable desired outcome has been identified.
- Remaining research questions: Unknown until a concrete discovery difficulty is identified.
- Next action: On the next cafe search, record the intended use, search approach, and point of disappointment as one short example.
- User confirmation: Not recorded.
```

### Observation

Respected the inability to answer today. Returned a partial brief with one concrete discovery action and no further interview question. The agent did not guess that Singapore, remote work, or laptop policies applied from another case.

## Case 4: Suggested means versus mandatory constraint

### Exact input

> Build an AI cafe app. AI is a suggestion, but Singapore-only coverage is mandatory. I have not identified the target users yet.

### Generated response

Singapore-only coverage is a firm constraint, while AI remains a suggestion. Who first prompted this idea, and what difficulty were they having when trying to find or use a cafe?

### Observation

Preserved the explicit scope while seeking the missing affected user and unmet need through a concrete origin story. Did not treat the app or AI as a settled solution and did not start implementation. This case exposes no instruction failure, although a user with no origin story would need the skill's partial-brief path in a later turn.

## Case 5: Incompatible firm constraints

### Exact input

> We must show live cafe occupancy. All external connections and manual updates are forbidden; no sensors or existing occupancy data are available. Neither requirement is negotiable.

### Generated response

Live occupancy requires a source of current occupancy observations, but the stated constraints leave no way to obtain them. Because you have said neither condition can change, this request is blocked under the supplied constraints; clarification cannot make it feasible.

Readiness: **Needs clarification** (agent assessment). The next useful action is to record this conflict for the requirement owner; solution research should not proceed on the assumption that live occupancy can be delivered. No lookup or feasibility experiment was performed, and no requirement has been relaxed.

### Observation

Named the contradiction and stopped without inventing data or silently relaxing a condition. There is a small wording ambiguity in the skill: step 3 says to ask which conflicting condition can change, but this input already answers that question with “neither.” The response respected that answer rather than repeating a resolved question. The skill does not expressly define a separate blocked status, so the required “Needs clarification” readiness is retained with an explicit feasibility blocker. No brief was produced because the immediate response communicates the unresolved conflict; a stricter interpretation that every stopped interaction needs a partial brief would need clarification in the skill.

## Case 6: Update existing brief without rewriting it

### Exact input

Existing brief supplied in message:

> type: Problem Brief; title: Cafe discovery; status: draft. User-reported scope: Singapore only. Desired outcome: know laptop policies before travelling. Budget: Unknown. Owner note: keep offline contact list unchanged. No selected provider. User confirmation not recorded.

New message:

> Update this existing brief: my budget limit is SGD 20 monthly; preserve everything else. Return the revised brief in chat.

### Generated response

Updated only the budget to SGD 20 monthly and preserved the rest of the supplied brief. This revised brief is unsaved.

```text
type: Problem Brief; title: Cafe discovery; status: draft. User-reported scope: Singapore only. Desired outcome: know laptop policies before travelling. Budget: SGD 20 monthly. Owner note: keep offline contact list unchanged. No selected provider. User confirmation not recorded.
```

### Observation

Returned the full revised content, keeping the original layout, metadata, owner note, provider state, and lack of confirmation intact. No interview restart, template expansion, new file, or downstream selection was needed. The new user message supplies the budget's provenance; the response keeps that context adjacent without adding unrequested fields to the existing brief.

## Limits and observed result

All six simulated inputs produced bounded clarification behavior with no invented user replies or research results. The conflict case surfaced an instruction ambiguity about redundant questions and whether a blocked response always requires a partial brief. These are observations from one agent's application of the text, not proof that other agents or runtimes will behave identically.

Not checked: runtime discovery/installation, external factual accuracy, executable helpers (none used), independent human review, or actual file-update conflict handling. The chat-only update case verifies generated content preservation, not a concurrent filesystem write.

## Rerun after targeted instruction changes

The same agent reread the updated skill, which now explicitly includes unsaved notices within the two-sentence limit and requires a partial brief when conflicting constraints are already non-negotiable. Original evidence above is preserved. Review found an additional issue in original case 2: its wrapper had **three sentences**, exceeding the human-update limit; its earlier observation should not be read as a complete pass. Only cases 2 and 5 were rerun, with their exact original inputs and no additional user replies.

### Case 2 revised actual output

You need to establish a cafe's laptop policy before travelling for a two-hour work session. This unsaved brief is ready for solution research into reliable policy information, with budget still unknown.

```markdown
---
type: Problem Brief
title: Establish cafe laptop policies before travelling
description: A remote worker needs to know whether a Singapore cafe allows laptop work before travelling there.
status: draft
---

# Establish cafe laptop policies before travelling

## Human update
You need to establish a cafe's laptop policy before travelling for a two-hour work session. This unsaved brief is ready for solution research into reliable policy information, with budget still unknown.

## Problem and context
- Affected users: The requesting remote worker in Singapore. Source: user's message describing their last cafe search.
- Situation and unmet need: They need a cafe for two hours of laptop work and need to know its laptop policy before travelling. Source: same message.
- Current approach and shortcoming: They report checking map listings last week but being unable to establish whether laptops were allowed. Source: same message.

## Intended outcome
- Desired change: Know the laptop policy before travelling. Source: user's stated outcome.
- Success indicators: Establish the laptop policy before the trip; no additional numerical target supplied. Source: user's stated success criterion.

## Constraints and scope
- Singapore; two hours of laptop work. Source: user's message.
- Budget: Unknown; no target yet. Source: user's message.
- Do not assume live seat availability or AI is required. Source: user's instruction.
- Return in chat without saving a product brief. Source: user's instruction.

## Evidence and uncertainty
- The user reports one unsuccessful search; this is not evidence that all map listings lack policy information.
- Availability, reliability, and currency of laptop-policy information remain unknown.
- No provider or technology selected; no lookup performed.

## Handoff
- Readiness: Ready for solution research; agent assessment.
- Reason: The affected user, unmet need, outcome, geography, and duration sufficiently bound research.
- Remaining research questions: Where can laptop policies be obtained? How reliable and current are they? What laptop-use conditions affect a two-hour session?
- Next action: Research existing ways to establish Singapore cafe laptop policies, keeping costs visible while budget is unknown.
- User confirmation: Not recorded.
```

Assessment: The revised wrapper has two sentences including the unsaved notice; its human-update section matches. The brief retains source attribution, unknown budget, bounded research questions, and the exclusions without repeating answered questions. No product brief was saved.

### Case 5 revised actual output

Live cafe occupancy needs current observations, but your non-negotiable constraints leave no available source of them. This unsaved partial brief records that blocker; the next action is to document the conflict for the requirement owner without treating delivery as feasible.

```markdown
---
type: Problem Brief
title: Live cafe occupancy blocked by data constraints
description: Live cafe occupancy is requested while every stated way to obtain current occupancy information is unavailable or forbidden.
status: draft
---

# Live cafe occupancy blocked by data constraints

## Human update
Live cafe occupancy needs current observations, but your non-negotiable constraints leave no available source of them. This unsaved partial brief records that blocker; the next action is to document the conflict for the requirement owner without treating delivery as feasible.

## Problem and context
- Affected users: Unknown.
- Situation and unmet need: The requester requires live cafe occupancy; the underlying user need is Unknown. Source: user's occupancy request.
- Current approach and shortcoming: Unknown.

## Intended outcome
- Desired change: Show live cafe occupancy. Source: user's mandatory requirement.
- Success indicators: Show current occupancy; freshness and accuracy targets are Unknown. Source: user's requirement; no numerical targets supplied.

## Constraints and scope
- Live occupancy is mandatory. Source: user's message.
- All external connections and manual updates are forbidden. Source: user's message.
- No sensors or existing occupancy data are available. Source: user's message.
- Neither conflicting requirement is negotiable. Source: user's explicit statement.
- Geography and budget: Unknown.

## Evidence and uncertainty
- All constraints are user-reported; no independent verification was performed.
- Agent assessment: Current occupancy cannot be established under the supplied conditions because no source of current observations is available.
- No constraint has been relaxed, no data invented, and no lookup or feasibility experiment performed.

## Handoff
- Readiness: Needs clarification; agent assessment.
- Reason: The required live output conflicts with the absence or prohibition of inputs, and neither condition can change; the affected audience and underlying need are also unknown.
- Remaining research questions: None that can resolve the stated conflict while both conditions remain fixed.
- Next action: Record the incompatibility for the requirement owner; do not proceed with a solution premised on fulfilling both conditions.
- User confirmation: Not recorded.
```

Assessment: Returned a full partial brief, identified the conflict, preserved both non-negotiable conditions, and avoided repeating the already-answered question. The wrapper is two sentences including the unsaved notice. No feasibility claim, lookup, or product-brief save occurred; feasibility remains blocked rather than falsely marked ready.
