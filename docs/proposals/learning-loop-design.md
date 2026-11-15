# Learning-loop viewer redesign

Branch work explicitly requested by ChouBokYann on 2026-11-15, including use of the installed design-taste-frontend skill. Scope: existing viewer, optional authored workflow placement, canonical synthetic examples, generated demo projections and tests. No server/database deployment or main adoption.

## Audit and design read

The existing view led with a long summary, a record list and an always-open text inspector. It preserved sources but required reading to reconstruct the business story. Retain the blue identity, local imports, semantic statuses, inert text, source provenance, keyboard focus and existing version 1 compatibility. Retire the record browser as the landing view.

Reading this as a calm, precise engineering understanding tool. Dials: design variance 4, motion intensity 2, visual density 4. The requested taste skill explicitly excludes dense product dashboards; apply its applicable redesign, hierarchy, spacing and accessibility principles, not its landing-page framework defaults. Native CSS/JavaScript remains the implementation, with no official design-system affiliation, new packages, remote fonts or icon library. This is a light-only internal prototype; no dark-mode capability is claimed.

## Visual hierarchy

1. Business outcome and measurement state, always visible.
2. Six-phase product lifecycle rail, explicitly labelled CRISP-DM adapted. Counts describe recorded placements, not stage completion. Only a selected node highlights a phase.
3. OODA canvas with short titled nodes. Show at most two nodes per lane initially; failed evidence appears first, additional nodes remain reachable through disclosure. Selecting a node highlights its recorded neighbours and opens a nonmodal inspector.
4. A feedback strip shows an authored evidence trigger and the decision it prompted. Missing triggers remain missing; ordinary connections never manufacture feedback.
5. Decision history and the full record browser remain available through disclosure. Detailed prose, sources and limits are preserved, not discarded.

Desktop uses four lanes with a return path. Narrow screens stack the lanes and retain the same reading order. Reduced-motion preference disables transitions. The diagram arrows describe the method, not causal dependencies between every displayed node. OODA can occur inside any lifecycle phase; neither taxonomy is a one-to-one replacement for the other.

## Sources and adaptation

- [IBM CRISP-DM overview](https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview): non-rigid lifecycle and movement between phases. Our phase names are the project's product adaptation.
- [Boyd diagram reproduced by Army University Press](https://www.armyupress.army.mil/Portals/7/combat-studies-institute/csi-books/on-strategy-a-primer.pdf): observation, orientation, decision, action and feedback. This view is a selective product-workflow interpretation, not a reproduction of every relationship in Boyd's model.
- [Teresa Torres on opportunity solution trees](https://www.producttalk.org/opportunity-solution-trees/): business outcomes connected to needs, choices and tests. A full opportunity-tree editor is outside this change.
- [Shneiderman, The Eyes Have It](https://www.cs.umd.edu/users/ben/papers/Shneiderman1996eyes.pdf): overview, filtering and details on demand.

No source graphics or upstream implementation were copied.

## Observed checks and limits

- Python regression/export suite: 21 tests passed. Node model/DOM suite: 21 tests passed. New checks cover explicit placement, valid evidence triggers, unplaced legacy records, default canvas, cycle switching and on-demand details. Generated demo semantics are checked against canonical Markdown; byte provenance can differ after Git newline conversion and can be regenerated locally.
- A fresh isolated headless Chrome profile loaded the local preview. Desktop 1440px and narrow 390px screenshots were inspected; measured document widths were 1425px and 375px respectively, with no horizontal overflow. Browser assertions passed for initial outcome, selected-node inspector, focus on its heading, close action, and switching from revised to initial direction.
- An early screenshot revealed encoding-damaged arrow characters from the shell-generated HTML; these were replaced with HTML entities. Early CLI screenshots also captured an unpopulated page; subsequent inspection waited for the loaded document and checked content before capture.
- Local import safety and prior version 1 behaviour remain covered by the existing tests. No independent comprehension study, screen-reader audit, touch-device session, production-scale graph test or live Symphony integration was performed. Keyboard focus was observed through browser assertions, not a complete accessibility certification.

The owner can refresh the already-running local preview and switch Example 01/02 without importing files. `workflow-samples.js` is regenerated from the example Markdown using `python -B scripts/build_workflow_demo.py`. No personal browser profile is used by author checks. The private local preview server remains running as requested; it is not a persistent backend.
