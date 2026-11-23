---
workflow_context:
  version: 1
  project: ceramics-weekends
  records:
    - id: CERAMICS-DIRECTION
      kind: decision
      status: proposed
      title: Calm workshop comparison and enquiry
      summary: Help visitors identify attendable weekend classes and contact studios.
      detail: "#direction"
      sources:
        - id: request
          ref: REQUESTS.md
      links: []
      gap: No upstream outcome record supplied; user acceptance remains pending.
---

<a id="direction"></a>
# Weekend ceramics direction

**Target and evidence.** For people in Singapore finding a weekend workshop, comparing a few suitable options and enquiring with the studio. The user requests calm, handmade character and explicitly excludes a booking platform. Only REQUESTS.md and the supplied skill/context were inspected; no established design system, factual class listings, photos or specialist guidance is supplied.

**Proposed visual direction, not accepted choices.** Use a warm off-white surface, ink-like text, restrained clay accents and spacious, consistently aligned information. Expressive headings lend warmth; plain body text keeps schedules and prices comparable. Sparse texture belongs at the page edges, never behind essential details. Prefer honest close-up photographs of hands, clay and studio work when authorized images become available; avoid stock imagery that suggests a particular studio or class. No photos have been inspected. Exact tokens and equivalent treatments stay with the specialist.

**Main journey.** Browse upcoming weekend classes ? narrow by suitable date and location ? compare a few ? read details ? enquire with the selected studio. Proposed initial surface: one compact list with date and neighbourhood controls, a consistent comparison layout and an expanded class detail panel. Show actual date, day, start/end time in Singapore time, studio/location, total price and inclusions, technique, experience/age restrictions and availability status. Unknown values stay explicit. These are proposed decision fields, not invented workshop facts.

**Attendability and comparison.** Put schedule and location before decorative imagery. Keep corresponding fields in the same order across cards. Proposed default: compare up to three classes using a readable side-by-side desktop view and vertically stacked labelled entries on phones. Retain selections when opening details or changing filters; announce comparison changes. Confirm whether pieces require later collection or extra firing fees wherever applicable: attending the session alone may not complete the visitor's commitment. Availability must carry a source/checked date and never imply reserved capacity.

**Enquiry boundary.** Each detail ends with a clear “Enquire with studio” action identifying its destination. Proposed default: a studio's verified contact link, with the selected class name/date available to copy into the enquiry. No account, cart, checkout, payment, seat hold or booking confirmation. Leaving for an external contact channel does not establish that an enquiry was sent. If contact details are missing, explain this rather than showing a nonfunctional action.

**Feedback and access.** Loading preserves page structure; failed data offers retry; no matches suggests relaxing filters while preserving choices. Unknown availability reads “Check with studio.” Visible focus, semantic headings and labelled controls support keyboard/screen-reader use; colour is never the sole status cue. On mobile, controls and schedule remain readable without horizontal scrolling. Keep transitions quiet and optional under reduced motion.

**Consequential questions.** Single studio or multi-studio directory? Proposed planning assumption: multiple studios, since visitors compare options; owner confirmation controls branding/contact structure. Which enquiry channel is supported? Which source and person maintain dates, fees and availability? These remain pending, and factual publication depends on answers and verified data.

**Handoff and checks.** Inspect a representative list-to-comparison-to-enquiry journey: a visitor can determine time/location suitability, compare total commitments, and identify the contact destination without assuming a reservation. Inspect real imagery in the composition for calm handmade character and permissions before reuse. **Conditional** for UI planning; published listings/contact behavior await verified inputs. Specialist fit, rendered usability and user acceptance remain unverified. No implementation authority is implied.

