---
name: understand-expectations
description: Calibrate observable quality expectations to the user's purpose, audience, and constraints. Use when good enough is unclear or expectations have changed; reuse settled criteria without repeating discovery or automatically raising standards.
---

# Understand expectations

Define what is enough for this task before spending effort improving it. This skill clarifies expectations; it does not authorize implementation or promise a business outcome.

## Establish the target

Read the request, existing requirements, decisions, project rules, and available artifact. Identify the intended outcome, audience, usage context, consequences of failure, and time/resource constraints. Reuse explicit answers. Investigate available facts yourself; ask only about consequential preferences that cannot be inferred. Keep dependent work pending when those answers materially change the target.

Translate broad labels such as "recruiter-ready" into observable criteria: for example, a working demo, a clear explanation of a technical tradeoff, and readable mobile presentation. These can support a good impression; they cannot prove a recruiter will be impressed. A simple personal utility may need only the agreed happy path and relevant failure handling. Neither purpose removes applicable security, accessibility, data-protection, or repository requirements.

Separate baseline acceptance must-haves from optional polish and explicit exclusions. If the user requests an additional refinement pass, record its specific quality targets separately from baseline acceptance. Defining expectations alone never invokes perfect-it. For each must-have, record the source, a concrete acceptance observation or threshold, and how it will be checked. For subjective presentation, use a supplied reference or a specific comparison; do not invent a quality score. Mark inferred preferences as assumptions. Ask for a reference only if its absence prevents a useful decision. Do not turn this into an exhaustive interview or create requirements merely to justify more work.

## Preserve the expectation through translation

Read relevant earlier preferences as well as the latest prompt. A supplied purpose or quality label is already an expectation; do not later claim the user omitted it because you failed to operationalize it. Requested presentation, interaction, reliability or other quality belongs to baseline acceptance. "Optional polish" means improvement beyond that baseline, not all nonfunctional work.

For each material expectation, preserve its source wording, the user-visible meaning you infer, an observable criterion, the appropriate evidence method, and who owns the final judgment. Mark agent interpretations separately from user-stated expectations. Delegated implementation authority permits routine choices; it does not make those choices user-approved requirements. Reuse settled criteria; ask only when ambiguity would materially change the outcome. Without a supplied reference, propose a concrete comparison or qualitative criterion and disclose the assumption instead of inventing a numeric score.

Match evidence to the claim. For visual storytelling, a rendered scene is not enough: inspect whether visuals carry the narrative, inspect representative artifacts for coherence/readability, and observe transitions in motion. For copy restraint, inspect actual screens and identify text unnecessary to the user's next action. These are examples, not universal product requirements or a demand for exhaustive review. Define the applicable observations before broad implementation; preserve missing criteria as gaps.

Use one compact chain in the existing record: user expectation/source -> interpreted requirement -> criterion -> evidence method -> result/remaining gap. Do not duplicate the same content in a new quality report. A requirement cannot be considered sufficiently translated merely because an agent can easily automate its check.

## Define enough and the budget

Enough means every applicable must-have and required project check has current supporting evidence. Optional improvements cannot prevent completion. Missing evidence is Unverified, not a pass. A changed target requires a recorded user decision; never lower it to make a failed attempt pass.

Only for explicitly requested additional refinement above verified baseline acceptance, record one bounded initial assessment and a default maximum of **two improvement rounds**, unless the user specifies another limit. Each round has a finite gap set, proposed changes, checks, and expected improvement. Stop sooner when the target is met, a round makes no meaningful progress, or required input/access is missing. Preserve any existing consumed budget; setting expectations does not reset it.

Record additional user-specified time or spend limits and which host can enforce them. Do not claim round limits cap tokens or credits. If a hard spend cap is required but unavailable, resolve that before dependent paid work. Only an explicit user extension can increase the round allowance.

## Output and completion

Update the existing work record using the [expectations template](references/expectations-template.md) only for missing sections. Retain criterion IDs, business purpose, rationale, alternatives and conditions for revisiting the target. Follow the [shared output contract](../../../docs/contracts/workflow-context.md) where available; otherwise use the project's format and disclose unavailable export support. Do not create a parallel document chain.

Finish when the target, checks, exclusions, unresolved assumptions and applicable budget are clear. If necessary information is missing, finish with a precise pending decision rather than invent agreement. Give a one- or two-sentence human summary with a link to detail; if saving is unavailable, provide the unsaved record in one Markdown block. Route authorized refinement to [Perfect it](../../implementation/perfect-it/SKILL.md); clear requirements need no additional interview.

## Attribution

Selectively adapted from pstack and Matt Pocock; see [sources and notices](references/upstream-notices.md). Budget semantics and purpose-based calibration are project additions.
