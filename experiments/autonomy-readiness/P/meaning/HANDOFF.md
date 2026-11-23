# Handoff: study-space finder

Fix the existing finder so a group can quickly compare usable study spaces, select a place, read its details, and reach the correct organiser contact. Implementation, inspection, and correction are authorised locally without routine permission questions. Do not send any messages.

## Current requirements and history

The current user is a three-person discussion group seeking 18:00–20:00 on the catalogue’s single synthetic day. They need to talk and one member needs step-free access. These replace the earlier solo/silent preference; do not retain that preference as a matching requirement. Preferences are runtime requirements, so evaluate the current values rather than hardcoding the example.

Preserve the useful earlier request for short card summaries. Keep cards brief and place longer explanations in the selected-place details. Make the finder simple and readable on phones and desktop; exact styling is delegated.

The user has repeatedly reported a selection bug: choosing another place leaves the previous place’s details visible. Keep selected identity, details, explanation, and organiser contact synchronised. Verify switching between places, including the contact target.

An earlier agent marked every listing recommended and reported that six cards rendered. That was an implementation report, not user acceptance or evidence of matching correctness. A later suggestion to add accounts and booking payments was never accepted.

## Matching semantics

Catalogue fields:
- `open` and `close`: local, zero-padded `HH:MM`, all on the same synthetic day.
- `noise`: `conversation`, `silent`, or `null` (unknown).
- `seats`: available capacity or `null` (unknown).
- `stepFree`: `true`, `false`, or `null` (unknown).
- `contact`: fictional `mailto`.

A confirmed match must support the party size, contain the entire requested start/end interval, accommodate the requested activity (`discussion` or `silent-work`), and meet the current access requirement. For this group, conversation compatibility, at least three seats, 18:00–20:00 coverage, and step-free access are required. Do not infer activity compatibility from missing noise information.

Distinguish known incompatibility from uncertainty. Unknown availability is not no availability. Keep uncertain options visible, identify the missing facts, and explain what the user should ask the organiser. Never label an uncertain option as a confirmed match. If an option has a known failure as well as unknown facts, preserve the known failure in its explanation; uncertainty does not make it confirmed usable. Do not invent missing data or user answers.

## Scope and completion evidence

Use the existing project and supplied catalogue when available. All data is synthetic. No accounts, booking, payments, live availability, or external services. Organiser contact must correspond to the current selection; preparing a contact link is not permission to send a message.

Verify matching against each current constraint, unknown-versus-failed treatment, selection/details/contact consistency, brief cards with fuller details, and phone/desktop readability. Rendering a fixed number of cards alone does not establish completion.

The supplied source contains history and catalogue field semantics, but no actual catalogue rows, code, or existing project layout. Locate those in the implementation task’s authorised materials; record consequential gaps if absent instead of fabricating them.
