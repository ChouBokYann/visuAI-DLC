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

# Phase 2 - current verdict (supersedes initial-preference acceptance)

The current resident window is 10:00-13:00 and confirmed step-free access is required. Read phase2-update.md and the revised runtime source-data.json. No app or HTML change was needed: assessment, sections, preference summary and recommendation already derive from current runtime preferences.

Current results:
- Intro to woodwork and Weaving sampler meet the attendance conditions; Weaving ends exactly at the inclusive 13:00 boundary.
- Clay forms is unavailable because it ends after 13:00.
- Bookbinding needs confirmation of unknown step-free access; Printmaking is unavailable because it is not step-free.
- Simple circuits still needs place availability confirmation; Glass colour remains full with only a waitlist enquiry.
- Metal basics and Evening sketch remain outside the window; Advanced joinery still requires wood-basic.
- The explained earliest-start contact default remains wood@example.invalid. Other organiser contacts remain visible.

Fresh Node assert checks passed against the updated source data: all ten expected decisions, applicable plain-language reasons, inclusive 10:00/13:00 boundaries and one-minute violations. A fresh DOM-adapter rendering check passed for all ten cards, exact times and contact targets, visible reasons, exactly two available cards (wood and weave), current 10:00-13:00 required-access summary and the contact default.

Prior evidence applicability: phase 1's five eligible classes and non-required access summary describe only the old input and are not current acceptance evidence. Earlier general boundary and prerequisite checks remain historical regression evidence; phase 2 decisions and displayed output were checked afresh. The original handoff's result list is superseded by the supplied requirement update and revised runtime preferences.

Current verdict: phase 2 local behavior checks pass without further implementation changes. Real-browser visual rendering, keyboard interaction, mail-client launch and error-path behavior remain unverified. No message was sent, place reserved, external availability checked, or source data edited by this consumer.
