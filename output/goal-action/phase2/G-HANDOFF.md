# Saturday workshop handoff

## Goal and authoritative sources
Help a resident new to community workshops identify classes they can attend between 10:00 and 14:00 this synthetic Saturday and decide which organiser to contact. Use only `PRODUCER.md` and `source-data.json` in this arm. All times are local on the same synthetic day. The resident has completed no prerequisites; step-free access is not required. Do not infer interests, abilities, household circumstances, travel arrangements, or other personal characteristics.

## Decision behavior and reasons
Interpret “actually attend” as requiring the whole session to fit within the availability window (inclusive boundaries), every listed prerequisite to have been completed, and a positive known seat count. Partial overlap with availability is insufficient. A waitlist is not a current place; unknown seats are not confirmation. Explain these distinctions in everyday language.

Source-derived results:

| Class | Time | Current places | Organiser |
|---|---|---:|---|
| Intro to woodwork | 10:00–12:00 | 3 | wood@example.invalid |
| Clay forms | 12:00–14:00 | 4 | clay@example.invalid |
| Bookbinding | 11:00–12:30 | 2 | books@example.invalid |
| Printmaking | 11:00–12:00 | 2 | print@example.invalid |
| Weaving sampler | 12:30–13:00 | 1 | weave@example.invalid |

These five meet the supplied attendance conditions individually. Bookbinding has unknown step-free access; Printmaking is confirmed not step-free. Show these facts without excluding either class, because access is not a requirement here. Do not claim that the other facts guarantee attendance or reserve a place.

Also explain all remaining catalogue outcomes:
- Simple circuits, 10:30–11:30: fits the time and prerequisite conditions, but places are unknown. Contact circuits@example.invalid to ask whether a place is available.
- Glass colour, 11:00–12:00: full, with a waitlist option. glass@example.invalid is for enquiring about a future vacancy, not a confirmed Saturday place.
- Metal basics, 09:00–10:30: starts before the resident is available.
- Advanced joinery, 10:00–12:00: requires the uncompleted `wood-basic` workshop. Do not equate that identifier with Intro to woodwork or assume it can be completed in time.
- Evening sketch, 18:00–19:00: outside availability.

## Practical contact decision
Present the five eligible classes together with their times, seats and organiser addresses, so the resident can choose by activity. No supplied interest justifies declaring one universally best. As an explicitly labelled practical default, suggest contacting wood@example.invalid first for the earliest eligible session; explain that the default is based only on start time. Offer the other four contacts equally clearly. Circuits is a separate availability enquiry; Glass is a separate waitlist enquiry. Display synthetic addresses without sending messages.

If presenting combinations, reject overlaps. Woodwork followed by Clay forms fits the supplied timetable exactly, but travel time and locations are unknown, so do not promise that the pair is feasible. No itinerary optimiser is needed.

## Bounded implementation and unknowns
Produce one clear, compact local result using the existing delivery format. No booking, accounts, payment, external services, dependencies, invented locations, travel estimates, or live availability claims. Separate eligible, ask-about-availability, waitlist, and unsuitable outcomes visibly. Missing information remains labelled unknown. Exact styling is delegated.

## Observable evidence of enough
Inspect the actual rendered result and record the tested state. Verify exactly five individually eligible classes with accurate times, seat counts and contacts; Circuits cannot appear confirmed; Glass cannot appear bookable; Metal, Joinery and Sketch have the correct exclusion reasons. Check inclusive 10:00 and 14:00 boundaries, visible Bookbinding/Printmaking access facts without exclusion, and the explained first-contact default. Confirm no message was sent or place reserved. Record any untested interactions and limitations; this handoff itself is not implementation evidence.
