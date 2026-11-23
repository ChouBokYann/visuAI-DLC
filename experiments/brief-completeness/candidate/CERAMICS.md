---
workflow_context:
  version: 1
  project: ceramics-direction
  records:
    - id: DEC-CERAMICS
      kind: decision
      status: proposed
      title: Attendable workshop discovery
      summary: Compare weekend workshops and enquire directly with a studio.
      detail: "#direction"
      sources:
        - id: request
          ref: REQUESTS.md
      links: []
      gap: No separate outcome record or user acceptance supplied; confirm pending choices with the owner.
---

<a id="direction"></a>
# Ceramics direction

**Source and intent.** REQUESTS.md asks for a small Singapore weekend-ceramics website that feels calm and handmade, supports finding an attendable class, comparing a few options and enquiring with the studio. A booking platform is explicitly excluded. No existing interface, verified workshop data, photos or specialist guidance was supplied or inspected. Provisionally serve adults on phones and desktop; do not assume beginner or child eligibility.

**Proposed look.** Use warm off-white space, clay-toned accents, restrained irregular borders and readable type. Handmade should come from tactile imagery and small imperfect details, not distressed text or clutter. Keep dates, location, duration and price visually prominent; calm means predictable scanning and unhurried copy, not hiding practical facts. Prefer a few generous workshop cards to an image-heavy gallery. These are agent interpretations; exact typography and colours remain delegated. No decorative motion is required.

**Journey and behaviour.** Start with upcoming weekend options ordered by date, with a compact date/weekend filter. Each card exposes session date, Singapore start/end time, neighbourhood, technique, suitability and total known price. Open details for exact address, inclusions, prerequisites, accessibility information and studio contact. Unknown facts remain explicitly unknown. Mark full, cancelled, past and availability-unconfirmed sessions appropriately; do not present unconfirmed seats as available.

Propose a compare control for up to three workshops: aligned facts on desktop, repeated labelled sections on mobile, with selection preserved when returning from details. An enquiry action identifies the studio and selected class/date, with an editable message. Default proposal is a direct studio contact link using its verified channel; no account, cart, payment or reservation. Opening a contact app is not a sent enquiry or confirmed place. If contact fails, show another verified contact route when available.

Provide distinct loading/error states and a no-matching-weekend state that retains filters and offers broader dates. All controls need keyboard operation, visible focus, readable contrast and text labels; imagery must not carry essential class information alone.

**Consequential questions, owner pending.** Is this one studio's site or a curated multi-studio directory? Are enquiries by email, messaging or another existing channel? Who supplies dated sessions and updates availability? Interim path: neutral workshop records naming their studio, manual comparison and direct contact. Avoid committing branding, cross-studio claims or enquiry infrastructure until answered.

**Quality anchors and journey checks.** Inspect a phone shortlist containing three representative records: can a visitor identify a feasible weekend and compare cost, travel and suitability without opening every detail? Inferred need: “actually attend” requires dated sessions, not just “weekends.” A beautiful listing with a weekly schedule but no next session fails; inspect a selected-date journey and its availability caveat. Inferred need: ceramics may require later firing/collection or another visit. A visitor could attend once yet be unable to complete the workshop; inspect each detail for evidenced visit count, collection arrangements and extra costs, or clearly marked unknowns. Walk through enquiry handoff and verify the class/date remains identifiable without implying a reservation.

**Handoff/readiness: Conditional.** A specialist can plan the list, comparison and enquiry journey now. Owner decisions and verified session/contact data block factual publication. Obtain permissioned workshop/process photography; inspect one card at phone scale before repeating it. Without images, a labelled layout study is permissible but cannot prove handmade visual quality. Specialist fit, rendered usability, current availability and user acceptance remain unverified.

