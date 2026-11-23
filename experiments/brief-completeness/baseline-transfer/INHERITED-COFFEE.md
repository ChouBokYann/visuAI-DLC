---
workflow_context:
  version: 1
  project: coffee-discovery
  records:
    - id: COFFEE-DIRECTION
      kind: decision
      status: proposed
      title: Illustrated coffee discovery direction
      summary: Connect origin discovery to sourced Singapore cafe listings.
      detail: "#direction"
      sources:
        - id: request
          ref: REQUESTS.md
      links: []
      gap: No upstream outcome record supplied; user acceptance remains pending.
---

<a id="direction"></a>
# Coffee discovery direction

**Target and evidence.** For curious coffee drinkers exploring origins and finding somewhere in Singapore to try them. The user requires a cartoonish map, notes and flavour profiles, short place/culture summaries, location selection revealing real Singapore cafes, and a clean cream-esque appearance. Only REQUESTS.md and the supplied skill/context were inspected; no existing system, assets, listings or specialist guidance is supplied.

**Proposed experience, not accepted choices.** Use a warm cream canvas, dark readable text, restrained earthy accents and generous space around a dominant illustrated world map. Keep the map playful and recognisable rather than densely annotated. Give each selectable origin a short name and compact flavour preview; disclose longer culture text on selection. Typography, precise colours and spacing remain delegated. Copy should be curious and specific, avoiding unsupported claims that all coffee from a country tastes alike.

**Main journey.** Open the atlas ? select an origin ? read a concise origin introduction and flavour explanation ? inspect matching Singapore cafes ? follow a sourced cafe detail/contact link. On wide screens, keep map and selected-origin panel together; on phones, place details below the map with a clear selection heading. Provide an equivalent searchable origin list so small targets, touch and keyboard users can complete the journey without navigating geography. Selection must be visible beyond colour, expose focus, and preserve the selected origin when returning from a listing.

**Defining map treatment.** Proposed illustration: simplified but recognisable continent silhouettes, shallow flat layering, soft irregular outlines and sparse paper-like grain. Avoid miniature scenery that becomes noise at phone width. Labels remain live, legible interface text. Geography must stay recognisable at the displayed scale; origin markers must not imply false precision. A representative map composition at desktop and phone size must be inspected before extending the artwork. No map art is available; an outlined wireframe may support planning but cannot satisfy the cartoon-map quality claim. Next step is an authorized original or suitably licensed illustration with attribution and usage rights checked.

**Data and feedback.** A cafe entry needs its name, Singapore location, matched origin, source link and verification date. Distinguish a historical sourcing relationship from current availability; unknown stock is explicitly unknown. No factual entries are supplied, so public listings remain blocked on research. Show loading feedback, a retryable source/data failure, and “No verified cafes listed for this origin” without implying none exist. Respect reduced motion; selection needs no animation. Maintain readable contrast and accessible touch targets.

**Questions for the owner.** Does “place” mean countries or growing regions? Proposed planning default: countries, revisited if regional distinctions are essential. Must listings prove current menus/beans or merely documented sourcing? This blocks final inclusion rules. Who maintains verification, and how often? User unavailable; these remain pending.

**Handoff and checks.** Inspect one complete origin-to-cafe journey for recognisable geography, readable flavour/culture hierarchy, evidenced origin matching and equivalent keyboard/mobile access. Ready **conditionally** for layout planning; final taxonomy, live listings and finished map are dependent work. A suitable UI specialist is unselected and guidance unavailable; fit, rendered quality and user acceptance are unverified. Readiness grants no implementation authorization.
