# Set development direction: author walkthrough

Candidate: `skills/planning/set-development-direction/SKILL.md`. Date: 2026-11-15. Root author applied the candidate to the synthetic inputs below and reviewed the resulting entries against the proposal. These are author-produced examples, not independent agent runs, installed-runtime tests, or evidence of a working cafe product. Actual testing in another project remains deferred.

## A. Small change with sufficient direction

Synthetic input: The user has selected a manually maintained cafe directory and asks only for technical direction. Existing brief `product.md` contains requirement REQ-004: members filter cafes by laptop policy and unknown must remain visible as unknown. DEC-002 selects the existing directory for this feature; its recorded user approval covers solution choice, not execution. Accounts, maps, scraping, and provider integrations are excluded. Destination: update the existing direction section in `delivery.md`.

Supplied project excerpt F1, treated as supplied code rather than independently executed evidence:

```typescript
type Cafe = {
  name: string;
  neighbourhood: string;
  laptopPolicy: 'allowed' | 'not allowed' | 'unknown';
};
function visibleCafes(cafes: Cafe[], neighbourhood?: string) {
  return cafes.filter(cafe => !neighbourhood || cafe.neighbourhood === neighbourhood);
}
```

The supplied context says the existing list displays laptopPolicy; only policy filtering is missing. No new persistence, provider, or account mechanism is needed. This is enough for a bounded direction, not proof that code runs.

Author-produced direction section:

```markdown
## Current development direction

Extend the directory's existing filtering path to include laptop policy and retain the existing display of unknown. Reuse its current Cafe representation and neighbourhood behavior; no additional service or storage is proposed. Basis: supplied excerpt F1 and selected Decision DEC-002 in product.md; runtime behavior has not been checked.

Proposed Decision DEC-003 affects Requirement REQ-004 in product.md (stated relationship): extend the current filter rather than introduce another search component. This keeps the change within the selected directory; revisit if actual project inspection shows a different filtering path. The proposal is not a separately accepted decision.

Next increment: demonstrate policy filtering on the existing list. Success signal: an allowed filter shows only allowed entries, and an unknown filter shows unknown entries without relabeling them; existing neighbourhood behavior remains. Implementation determines the exact edits and checks. Preserve the existing exclusions: accounts, maps, scraping, and provider integrations.

Handoff: Ready for implementation planning based on the supplied context. Execution authorization is not recorded. Next owner/action: the implementation agent inspects the actual filtering path and plans the bounded change under the project's existing authorization rules.
```

Human response in this walkthrough:

> Prepared an unsaved direction update for delivery.md: extend the existing cafe filter, with policy matching and preservation of unknown values as the first checks. The approach is grounded in supplied code only; execution authorization is not recorded.

Review: the response does not claim a save, test pass, or implementation. The direction uses the existing selected solution, preserves REQ-004/DEC-002 and exclusions, labels new DEC-003 as proposed, and stops before file-level tasks, new signatures, or test commands. The excerpt is in this evidence record, not a product artifact saved to a real project.

## B. Feasibility finding and a selected replacement

Synthetic input: An existing delivery record proposes Decision DEC-010, an automated policy import, to satisfy Requirement REQ-004. Source EVD-007 is a supplied provider-documentation excerpt: “Laptop policy is not exposed by this endpoint.” The user asks to revise direction but has not selected a replacement. Existing Work WRK-002 is the policy importer; separate display work WRK-003 accepts locally supplied records and does not need provider access. Both work entries were already present; the Planning skill does not create a task graph.

Author-produced first update:

```markdown
## Current condition

Evidence EVD-007 (supplied documentation, not a live observation) challenges Decision DEC-010's assumption that this endpoint supplies laptop policy; both entries are in this record. The relationship is stated on the basis of the quoted endpoint limitation. It does not establish that every provider or another endpoint lacks the data.

Work WRK-002 depends on DEC-010 and is blocked pending a viable source/direction. WRK-003 can still be explored against local fixtures, subject to existing authorization; this does not validate importing real policies. Requirement REQ-004 remains unchanged.

Handoff: Conditional overall; the policy importer is blocked. Next owner/action: Ideation research or recommendation considers a different source or manual policy maintenance, retaining the documented limitation and unknown alternatives. No replacement direction or user approval is recorded.
```

Human response:

> Prepared an unsaved update: the documented endpoint limitation blocks policy importing, while display work can still use local fixtures. The policy requirement is unchanged; a viable data source or replacement direction is still needed.

Second synthetic input: The user explicitly selects manual policy maintenance for this iteration and excludes automated policy import. This is a fixture decision, not the actual user's selection of a cafe solution or approval to implement it.

Author-produced replacement update to the same current section:

```markdown
## Current direction

Selected Decision DEC-011 supersedes DEC-010 in this record (stated relationship; source: the synthetic user's second instruction). Maintain laptop policies manually using the selected directory. DEC-011 affects Requirement REQ-004 in product.md; that requirement's identity and behavior are unchanged. Manual maintenance adds staff effort; revisit if a suitable supported policy source becomes available.

Next increment: establish that a manually maintained policy is displayed with its recorded value, including unknown. Implementation identifies the actual maintenance path and exact checks. Automated policy import is excluded this iteration; WRK-002 is superseded as planned work, not completed. Existing WRK-003 remains relevant.

Handoff: Ready for implementation planning. The fixture user selected the replacement direction; execution authorization is not recorded. Next owner/action: Implementation plans the bounded manual-maintenance/display increment under the target project's rules.

## Decision history

DEC-010 proposed automated policy import. EVD-007 documented that the selected endpoint does not expose the field; the user then selected DEC-011. DEC-010 and WRK-002 are superseded. The earlier “choose a policy source” action is no longer current, and no successful integration is implied.
```

Review: the selected replacement has a new identity, old rationale is recoverable, the current handoff no longer contains an obsolete source-choice action, and the underlying requirement retains its identity. Local display work is distinguished from provider feasibility. No code or provider test ran.

## Missing-information and failure boundary review

If EVD-007 were instead a failed request or inaccessible documentation, the endpoint limitation above would be unjustified. The skill explicitly requires an unknown capability and a concrete missing check, not a confirmed infeasibility finding. This is a reviewed instruction boundary, not another observed runtime trial.

Without a destination or write access, the candidate requires a complete unsaved brief after its short response. The author examples above show unsaved in-place sections because an existing artifact is assumed. New-brief formatting is defined in the template but has not been exercised by an installed agent. Permission-denied saves, concurrent edits, and automatic discovery are untested.

## Validation and limits

- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/planning/set-development-direction` returned `Skill is valid!`. Local Markdown links in the candidate, its references, both indexes, proposal, and this walkthrough resolved. Git whitespace checks passed. These checks do not establish decision quality.
- The walkthrough covers sufficient context, narrow scope, supplied rather than observed evidence, a blocked dependency, an unaffected increment, selected replacement, stable references, and supersession.
- The author reviewed the short updates for the two-sentence limit and accurate unsaved status. No independent comprehension test or actual delivery artifact write is claimed.
- No runtime, executable helper, external service, or model fanout was introduced. Global skills and configuration were not modified.
- Remaining: independent maintainer review, actual runtime behavior, and real-project evaluation. No measured token/time savings or ontology validation is claimed.
