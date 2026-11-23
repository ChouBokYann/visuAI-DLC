---
workflow_context:
  version: 1
  project: coffee-direction
  records:
    - id: DEC-COFFEE
      kind: decision
      status: proposed
      title: Illustrated origin discovery
      summary: Connect coffee origins to evidenced Singapore cafe listings.
      detail: "#direction"
      sources:
        - id: request
          ref: REQUESTS.md
      links: []
      gap: No separate outcome record or user acceptance supplied; confirm pending choices with the owner.
---

<a id="direction"></a>
# Coffee direction

**Source and intent.** REQUESTS.md asks for specialty-coffee discovery through a cartoonish world map, origin notes, flavour profiles and short coffee-culture summaries; selecting a place reveals real, sourced Singapore cafes. Clean, cream-esque is explicit. No existing interface, assets or specialist guidance was supplied or inspected. Audience provisionally: curious Singapore coffee drinkers on phones and desktop.

**Proposed look.** Make the map the main attraction, with a restrained cream background, dark readable labels and a small warm accent palette. Use recognisable continental silhouettes, simplified boundaries, shallow paper-like depth and sparse hand-drawn texture; avoid generic blobs, flag wallpaper or tiny decorative pins. At desktop scale the map dominates, accompanied by a compact origin panel. Keep place, indicative notes and one short cultural paragraph ahead of cafe results. These are agent interpretations of clean/cartoonish, not accepted user choices; exact tokens remain flexible.

**Journey and behaviour.** Select a labelled origin by pointer, keyboard or equivalent origin list; show its profile, then matching Singapore cafes. On narrow screens retain an overview map and place selector above a single-column detail view; essential discovery must not require precise pin tapping or hover. Show selected state in text as well as colour. Preserve selected origin on return from a cafe source. Propose country-level exploration initially, with region/lot attribution wherever evidence supports it. Explain that notes vary by bean and processing; a place is not a flavour guarantee.

Each cafe entry needs name, Singapore location, the specific origin relationship, source link and checked date. Distinguish served coffee from beans sold for home use. Clearly separate historical offerings from currently verified ones. An external cafe/contact link is the next action; no checkout. Loading, source failure and no verified matches need distinct messages; never turn missing evidence into “no cafes exist.”

**Consequential questions, owner pending.** Does “sell coffee” mean drinks, retail beans or both? Should exploration begin with countries or producing regions? How broad must launch coverage be, and who refreshes rotating offerings? Interim direction supports both offering types with explicit labels and a small, clearly bounded evidenced origin set; these are reversible proposals, not factual coverage claims.

**Quality anchors and journey checks.** Inspect one complete origin-to-cafe composition before repeating it: geography must remain recognisable at actual phone scale, and labels must stay readable over illustration. Test the same journey using keyboard and touch. Inferred need: discovery must lead to a credible place to try that origin. A cafe card citing only a generic homepage could satisfy “sourced” yet fail this goal; inspect whether its source actually supports the origin and offering type. Inferred need: curiosity must survive sparse coverage; inspect an empty origin for honest explanation and a clear route to other evidenced places.

**Handoff/readiness: Conditional.** A UI specialist can plan hierarchy and the representative journey now. Original or suitably licensed map art, verified cultural/profile copy and cafe evidence remain missing; obtain permitted assets and inspect silhouette, texture, scale and permission before claiming finished craft. Specialist compatibility is unverified. The owner must settle pending product choices; a researcher must establish listings and freshness. No rendered quality, listing accuracy or user acceptance is established by this brief.
