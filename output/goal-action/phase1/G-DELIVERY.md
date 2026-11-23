# G delivery - phase 1

## Goal and decisions
Help the resident choose a class they can attend and an organiser to contact. Implemented only app.mjs and index.html; source-data.json remains the runtime authority. No fixture IDs or starting preferences are hardcoded in application logic.

Whole-session time fit, completed prerequisites and known positive places determine eligibility. Confirmed blockers take precedence over unknown information. Step-free facts are visible for every class; they affect eligibility only when required by preferences. Separate sections distinguish eligible classes, confirmation enquiries, waitlists and unsuitable sessions. The earliest eligible start time supplies an explicitly explained practical first-contact default without assuming interests.

All ten classes retain their times, current place counts, access facts and organiser links. Unknown places are labelled unknown; waitlists are explicitly future vacancies. The page explains that results apply individually, overlapping sessions cannot be combined, and catalogue counts are synthetic. No itinerary, booking or external service was introduced. No messages were sent and no places were reserved.

## Checks performed
Ran Node v22.15.0 assert checks against assess and the application rendering path with a minimal DOM adapter and fixture-backed fetch:
- All ten catalogue outcomes matched expectations: five eligible, Circuits uncertain, Glass unavailable, Metal/Joinery/Sketch unavailable.
- Inclusive 10:00 and 14:00 boundaries pass; 09:59 starts and 14:01 ends fail.
- Completed prerequisites pass; required unknown access needs confirmation and required unavailable access blocks.
- Ten generated article nodes have their state attributes and contact links; five are available. All cards show access facts, with reasons on unavailable and uncertain cards.
- Preference summary and explained woodwork first-contact default are present.

The first test exposed PowerShell text encoding affecting punctuation. Rewrote owned files as UTF-8 with ASCII separators and reran the checks successfully.

## Verdict and limits
Phase 1 implementation and local Node checks pass. DOM output was exercised through an adapter; a real browser rendering, layout, keyboard navigation, mail-client launch and load-error path have not been tested. This is not a claim of visual verification or external availability. Browser visual inspection remains unverified. No dependencies, installations, deployment, source-data edits or other-arm inspection were performed.
