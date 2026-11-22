---
name: set-ui-direction
description: Clarify the user's visual and interaction direction before implementing a new or materially changed interface. Use when UI intent is unresolved; reuse existing direction and design-system conventions for small changes, and skip backend-only work.
---

# Set UI direction

Give the implementer a concise, user-grounded brief explaining how the interface should look and behave. This skill establishes direction; a suitable specialist such as Impeccable or TasteUI handles detailed UI design and implementation. It does not prescribe an aesthetic, install a tool, or create implementation authority.

## Read before asking

Read the request, earlier preferences, requirements, existing direction and relevant interface/design-system evidence. Inspect only what affects the current decision. Reuse settled answers. Keep an accepted baseline and change only the relevant delta; a routine change within established patterns needs no new discovery. Skip backend-only work.

Identify the audience, primary task, affected screens, device/input context and desired experience. Reuse understand-expectations for the quality target and set-development-direction for technical constraints rather than duplicating them. If those are already sufficient, do not invoke them again.

## Resolve consequential choices

Find the few unanswered choices that would make two competent implementers produce meaningfully different interfaces. Ask the most consequential question first, using language the user understands. Do not read a questionnaire or require the user to choose fonts, hex values or a component library.

Translate words such as "premium", "calm" or "playful" into specific, attributed observations: content hierarchy, information density, reading rhythm, navigation, copy tone and interaction feedback. An agent interpretation is not a user choice. Never replace missing direction with a specialist's default aesthetic.

For references, record which attributes matter and which to avoid; a reference is not an instruction to copy the entire product. Inspect supplied material when available. If inaccessible, state that its visual contents are unverified and distinguish the user's description from your inference. Ask for replacement material only when the gap prevents the required decision. Do not send private project material to external services without authorization.

When references or preferences conflict, identify the affected surface and the concrete tradeoff. Resolve it with the decision owner, or within explicit delegated authority. Do not silently blend contradictory directions. Offer two or three alternatives only when there is a real unresolved choice. A rough visual comparison can help a spatial or aesthetic decision; use available permitted tools and label it exploratory. Do not build a prototype or start a browser service merely to fill a template.

If the user delegates judgment, choose a bounded direction, explain the reason and label the assumptions. Proceed under existing authority; do not impose another approval round. Otherwise keep consequential unanswered preferences pending while continuing independent work. Exact styling details may stay with the implementer when they do not change the intended experience.

## Capture one UI Direction brief

Update the existing project brief or design record. If none fits, use `UI-DIRECTION.md` at the project's established documentation location. Keep one canonical source and link existing design tokens, screenshots and decisions rather than copying them. Include only applicable detail:

| Part | Contract |
|---|---|
| Target and baseline | Audience, primary journey, surfaces/platforms, user's desired experience; existing design system and inspected evidence. |
| Visual direction | Hierarchy, density, tone and reference attributes to preserve/avoid. Record consequential typography, color or motion choices; leave routine tokens delegated. |
| Interaction direction | Navigation, primary action and feedback; relevant loading, empty, error and success states; responsive behavior, keyboard/input access and accessibility constraints. Do not invent unsupported flows. |
| Decisions and uncertainty | Source, owner, stated choice versus recommendation/delegated assumption, rationale, meaningful alternatives and conditions for revisiting. Record conflicts and unresolved questions explicitly. |
| Specialist handoff | Required intent and constraints, flexible choices, selected specialist if known, first representative screen/journey and observable verification criteria. |
| Readiness | Ready for UI implementation planning, Conditional, or Blocked; identify the affected work, missing decision and next owner/action. Readiness is separate from authorization. |

Reuse the [shared output contract](../../../docs/contracts/workflow-context.md) for applicable decision/requirement links and project metadata; do not create a new schema or speculative entries. When copied without that contract, retain the project's existing format with explicit references and disclose the missing machine-readable contract.

## Hand off and check

Play back the direction briefly so the user can correct a misunderstanding. Record acceptance only when actually given; existing acceptance or delegated authority carries forward. Missing decisions block only dependent work. An unresolved fundamental experience choice cannot be hidden behind "the designer will decide".

Pass the brief, requirements, inspected baseline, relevant references and remaining budget to the chosen specialist. Its defaults must not override the user's direction, accessibility constraints or existing system. If specialist guidance conflicts, resolve the specific conflict instead of silently changing the brief. An unavailable specialist is a capability gap, not permission to install one automatically or claim compatibility.

Before handing off, check that the brief covers the main journey, separates look from behavior, preserves existing constraints, marks assumptions, and names observable checks. A direction document or mockup does not prove rendered quality, usable interaction or user acceptance. Implementation and Verification must inspect actual artifacts against this brief; material direction changes update the canonical decision and its rationale.

Stop when the next UI increment can be planned without inventing a consequential preference, or when the remaining blocker is explicit. Give one or two sentences linking the saved brief, readiness and next action. If saving is unavailable, provide the complete unsaved brief and say so. No automatic coding, publication, specialist invocation or extra approval ritual follows.

## Attribution

Adapted intent-discovery and UX handoff principles from pinned Superpowers and BMAD sources. See [source comparison and complete license notices](references/upstream-notices.md). Implementation specialists remain optional dependencies, not copied core skills.
