# Workshop attendance and contact brief

## Goal and source
Help a first-time resident find individually attendable workshops this synthetic Saturday and choose an organiser to contact. Use only `source-data.json` and the producer packet. Current preferences: available 10:00–14:00 inclusive, no completed prerequisites, step-free access not required. Do not infer other personal needs. This is contact guidance, not a booking or a guarantee of future availability.

## Decision behavior
Interpretation: “can actually attend” requires the entire workshop to fit the availability window, all required workshops to be completed, and a positive current seat count. Compare local times as minutes; equality at either boundary is allowed. Match prerequisites by their supplied identifiers: Intro to woodwork must not be assumed equivalent to `wood-basic`.

Evaluate time, prerequisites, capacity, and required access independently and retain every reason. Any definite failed requirement makes the workshop unavailable under current preferences; uncertainty alone means “confirm first.” Only classify as attendable when every applicable requirement is satisfied. Null capacity needs confirmation; zero seats is a definite current-capacity failure. A waitlist offers a future vacancy request, never a current seat.

Apply access eligibility only when `stepFreeRequired` is true: true passes, false fails, null requires confirmation. Otherwise access does not exclude a class; unknown access must still never be described as confirmed. Recompute from current preferences and catalogue facts after changes; never preserve an old successful assessment over new constraints.

## Required current results
| Workshop | Time | Decision and reason | Organiser |
|---|---|---|---|
| Intro to woodwork | 10:00–12:00 | Attendable: 3 seats, no prerequisites | wood@example.invalid |
| Clay forms | 12:00–14:00 | Attendable: 4 seats, no prerequisites | clay@example.invalid |
| Bookbinding | 11:00–12:30 | Attendable: 2 seats, no prerequisites; access unknown, not required | books@example.invalid |
| Printmaking | 11:00–12:00 | Attendable: 2 seats, no prerequisites; not step-free, not required | print@example.invalid |
| Weaving sampler | 12:30–13:00 | Attendable: 1 seat, no prerequisites | weave@example.invalid |
| Simple circuits | 10:30–11:30 | Confirm first: seats unknown; time and prerequisites pass | circuits@example.invalid |
| Glass colour | 11:00–12:00 | No current seat; waitlist available | glass@example.invalid |
| Advanced joinery | 10:00–12:00 | Ineligible: missing `wood-basic`, despite 3 seats | joinery@example.invalid |
| Metal basics | 09:00–10:30 | Outside availability: starts before 10:00 | metal@example.invalid |
| Evening sketch | 18:00–19:00 | Outside availability | sketch@example.invalid |

## Bounded implementation
Deliver one practical view with attendable choices first, then confirmation and mismatch explanations. Beside each relevant contact action, show times, capacity and eligibility reasons. Use the supplied mailto values; do not send messages. Invite choosing an attendable organiser by subject interest; no supplied preference supports ranking one as best. Circuits contact asks about seats; Glass contact explicitly requests waitlist information. Choices are individual alternatives, not a combined itinerary: do not imply overlapping classes or zero-transfer-time combinations are feasible.

No accounts, bookings, payments, external services, invented dates, travel assumptions, or extra catalogue enrichment. Presentation is delegated.

## Observable evidence of enough
Verify all ten baseline decisions above. With availability ending at 12:00, Clay and Bookbinding become definite time mismatches. With step-free required, Bookbinding needs access confirmation and Printmaking becomes ineligible. Circuits becomes attendable when seats change to positive, unavailable at zero. Adding `wood-basic` to completed makes Joinery eligible if other constraints still pass. Inspect contact labels and destinations against the source, and show that new preferences replace earlier decisions. Record these results and any unverified behavior before handoff completion.
