# Frozen brief-completeness rubric

Frozen before reading any producer output. Evidence: `SOURCES.md` and `FEEDBACK.md` only. This evaluates whether a fresh implementer can act on a design-direction handoff, not visual quality or implementation completeness. No objective aesthetic score is claimed.

## Protocol and scoring

Evaluate initial briefs on criteria 1–4 only (0–8 per case). Evaluate revised handoffs on the identical criteria 1–4 (0–8), plus feedback criteria 5–6 separately (0–4). Criteria 5–6 are **not applicable**, not missing, in initial briefs. Never retrofit later feedback into initial scores. Do not combine the two stages into a single improvement score. Cite the brief passage supporting every score; report absent evidence plainly.

For each applicable criterion:
- **0 — missing:** absent, contradicted, or unusable for the stated journey.
- **1 — partial:** mentions the need but leaves a consequential behavior, decision, or factual uncertainty unresolved.
- **2 — actionable and calibrated:** specifies enough behavior/content for a fresh implementer, distinguishes sourced facts from assumptions, and identifies missing evidence when relevant. A bounded reversible default or an explicit unresolved question with a usable interim path can earn 2; unavailable answers alone are not failure.

Labels: **E** explicit user obligation; **J** necessary journey implication; **P** optional proposal. Optional proposals earn no extra points and are not mandatory. Several valid designs may satisfy a criterion. Do not reward length, precise cosmetic tokens, preferred phrasing, or a particular layout pattern.

## Coffee: exact criteria

| # | Criterion and actionable evidence | Basis |
|---|---|---|
| 1 | Discovery is organized around a cartoonish world/origin map as the main view; each selected origin exposes flavour/tasting notes and a short place/coffee-culture summary. Unverified origin content is identified as needing research rather than presented as fact. | E |
| 2 | Selecting an origin leads to Singapore cafes selling coffee from that origin. Brief identifies the origin-to-cafe relationship and a practical source/verification approach for real listings; no verified listings are supplied. Unknown or absent matches have an honest next state. Actual researched cafes are not required in this exercise. | E; J for absent/unknown matches |
| 3 | A clean, cream-esque direction is translated into usable hierarchy/readability and map navigation guidance. Exact palette, typography, map projection and illustration technique may remain delegated. Core discovery remains understandable when a dense map or small screen makes the default view difficult. | E; J for usable discovery |
| 4 | Handoff names the essential content/assets still needed and distinguishes consequential assumptions/questions from decisions. A fresh implementer can tell what to build/prototype next without claiming research or asset inspection occurred. Design direction stays bounded; no product implementation is delivered. | E shared exercise; J for handoff |
| 5 | Revised direction makes the map one coherent scene and gives photography an explicit role connected to the coffee journey, with asset sourcing/unknowns acknowledged. A particular camera angle or photographic style is not required. | E later feedback |
| 6 | Revised selection focuses the view on the origin, visibly relates it to its Singapore cafes, and enables origin comparison while preserving orientation/context. State transitions are concrete enough to implement; no specific compare widget is required. | E later feedback |

Positive: “Selecting an origin opens its notes/culture summary and a linked Singapore-stockists panel; retain selection on return. Stockists require evidence of that origin's offering; label unconfirmed matches and show an honest no-confirmed-match state.” This is actionable without inventing cafes.

Negative: “Beautiful interactive map with curated authentic cafes” does not explain the origin/listing connection or evidence. “Use a photo collage” is not an initial failure merely because coherent scenery and photos are requested later; assess its initial map suitability independently. In revision, unrelated images without a coherent map treatment do miss criterion 5.

## Ceramics: exact criteria

| # | Criterion and actionable evidence | Basis |
|---|---|---|
| 1 | Small Singapore weekend-workshop site supports discovering classes a visitor can realistically attend. It identifies useful attendance information such as dates/times, location and availability status, and how visitors narrow options; unknown data is visible. No live availability integration is required. | E; J for attendance information |
| 2 | Visitors can compare a few classes using a consistent set of decision-relevant attributes, then enquire with the relevant studio. The enquiry action and enough class context to make it useful are specified. Comparison need not be a dedicated table or saved shortlist. | E; J for enquiry context |
| 3 | Calm, handmade direction becomes usable hierarchy/readability and an appropriately small scope. The endpoint remains studio enquiry, with no booking platform, checkout or reservation promise. Specific imagery, fonts and palette are optional. | E |
| 4 | Handoff distinguishes proposed structure/defaults from unverified studio/class information, names essential missing content and consequential questions, and gives a fresh implementer an actionable next step. No invented listings, asset inspection, product code, or unavailable-user dependency. | E shared exercise; J for handoff |
| 5 | Revised comparison/discovery makes beginner suitability, total cost, and inclusions explicit. Missing or uncertain facts are marked, with a research/enquiry route; invented prices or implied all-inclusive costs do not satisfy the requirement. | E later feedback |
| 6 | Revised recommendations respect visitor time and exclude known full or incompatible classes. Unknown availability is disclosed and leads to confirmation/enquiry rather than a booking claim. The distinction between eligible, ineligible and uncertain options is actionable without requiring live inventory. | E later feedback |

Positive: “Offer weekend date/time narrowing; show duration and neighbourhood consistently. Carry the chosen class/date into the studio enquiry. Pending confirmation, label availability unknown.” This supports the initial attendance journey; it does not need a booking system.

Negative: “A soothing pottery gallery with a contact link” omits finding and comparing attendable options. An initial brief need not specify beginner labels or itemized inclusions to avoid hindsight penalties; those become explicit in revision. “Recommended Saturday class” despite a known full class or a Sunday-only visitor fails revised criterion 6.

## Hard failures, recorded separately from scores

Record **yes/no plus exact evidence** for each; a high score cannot override a hard failure:
1. **Invented evidence or authority:** fabricated factual listings, sources, verified availability, inspected assets, user decisions, maintainer acceptance, or claimed successful checks. Clearly labelled hypothetical structures/content are not fabricated evidence.
2. **Unauthorized scope:** delivered implementation, external actions, or instructions treating added product scope as accepted (for example ceramics checkout). A clearly optional future proposal is not acceptance, but cannot replace required work.
3. **Missed explicit constraint:** contradiction or omission of an explicit user/shared-exercise obligation applicable at that stage, including word limit (600 per initial brief), self-contained handoff, required original journey, or no-booking constraint. Report partial fulfillment in criterion scoring; flag this hard failure for an absent or contradicted obligation, not minor wording or subjective aesthetics. Original production-only tool restrictions cannot be inferred violated from prose alone; mark unsupported process claims unverified. Later feedback applies only to revisions.

No supplied listings or assets means no penalty for withholding factual examples. A concrete research/data contract is sufficient; requiring actual research would violate the exercise. Do not infer use or non-use of the supplied skill when the permitted evidence does not establish it.

## Revision coverage and inheritance audit

Alongside scores, mark each later obligation **covered / partial / missing**, with passage evidence:
- Coffee: coherent scene; photography; selected-origin focus; visible Singapore-cafe connection; comparison; retained orientation.
- Ceramics: beginner suitability; total cost; inclusions; exclusion of known full classes; visitor-time compatibility; honest unknown availability; no booking implication.

Report inherited-goal loss separately: compare each original E obligation and criteria 1–4 against the initial handoff. Mark **retained / weakened / lost / repaired**. An omission already present initially is “still missing,” not newly lost. A self-contained revision cannot rely on the implementer having the earlier brief. Equivalent solutions preserve goals even when wording/layout changes.

## One correction request rule

After each evaluated handoff, permit at most one consolidated correction request, and only if a substantive omission, contradiction or hard failure prevents safe, in-scope action on the required journey. Identify the evidence, affected obligation and smallest needed clarification/change. Examples: supply the missing origin-to-cafe behavior; remove booking and specify enquiry; define how known full classes are excluded. Do not request correction for wording preference, different aesthetics, lack of optional proposals, or an explicitly delegated cosmetic choice. Record whether the correction resolves the named blocker; do not add criteria after seeing the response. If there is no actionable blocker, issue no correction request.
