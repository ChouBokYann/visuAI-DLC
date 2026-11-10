# Research-solutions walkthrough

Executed 2026-11-10 by an agent given only the skill, its two references, and the five inputs below; proposal context was not read. This is a qualitative application, not an independent human review or integration test. Each case is isolated. The response blocks below are the actual outputs generated for this exercise, preserved here as evidence rather than separate saved research briefs. Only this evidence file was written. Cases 2–4 use **synthetic supplied evidence**, not real provider facts; supplied excerpts were not externally retrieved and have no invented links or access dates.

## 1. Vague problem

**Exact input:** “Help me research a better cafe app.”

**Actual output:**

> Who is struggling with what in their current café experience, and what would a better outcome look like?

**Assessment:** Needs clarification. The response asks the consequential problem question before searching or assuming app features. No brief or destination was fabricated. Further behavior depends on a user answer and was not tested.

## 2. Product and API comparison from supplied evidence

**Exact input:** “Offline exercise: user needs Singapore laptop-friendly cafe discovery. Source A (supplied official-style synthetic product brochure): PlaceOne provides cafe listings worldwide. Source B (supplied synthetic API reference dated 2026-11-01): PlaceOne API exposes coordinates and opening hours; laptop policies are not documented. Source C (supplied synthetic product guide): CafeDesk lets cafe owners enter laptop policies manually; API access is enterprise-only, price on request. Compare existing integration possibilities; no network and no final provider choice.”

**Actual human update:**

> Unsaved: the supplied synthetic evidence supports PlaceOne for location/hour integration and CafeDesk for owner-entered policies, but neither establishes accessible, current Singapore laptop-policy data. The brief is ready for a comparison of these documented constraints; the next check is policy-field access and Singapore coverage evidence.

**Actual brief:**

```yaml
type: Solution Research
title: Singapore cafe policy integration possibilities
description: Compare two supplied synthetic capabilities for laptop-friendly cafe discovery
status: draft
```

**Scope:** Singapore laptop-friendly café discovery; compare documented data and access. Sources A–C only, offline. No existing project capability or full provider documentation was supplied.

| Option | Documented fit | Possible reuse/integration | Constraints and unknowns |
|---|---|---|---|
| PlaceOne | Worldwide listings claim (A); coordinates and opening hours through API (B) | Location/hour lookup (inference from B) | Worldwide claim does not demonstrate Singapore completeness. Laptop policy API support is undocumented, not disproven. Authentication, price, limits, terms and freshness unknown. |
| CafeDesk | Owner-entered laptop policies; enterprise API access with price on request (C) | Existing owner-entry workflow; API integration only if required fields and access are confirmed (inference) | Policy entry in the product does not establish policy API fields. Singapore participation, update frequency, auth, usage limits, terms and actual cost unknown. |

**Evidence:** A = synthetic supplied brochure, undated, not externally accessed: worldwide café listings only. B = synthetic supplied API reference, 2026-11-01, not externally accessed: coordinates/hours and lack of supplied laptop-policy documentation. C = synthetic supplied product guide, undated, not externally accessed: owner entry, enterprise API access and quote-based pricing. These are documentary claims within the exercise; no observed runtime results.

**Handoff:** Ready for comparison of documented scope and gaps, an agent assessment, not selection. Neither establishes the full need. Next bounded check: obtain current primary documentation for Singapore policy coverage, API policy fields, freshness and access terms. No network, quotes requested, accounts, probes or final provider choice; no claim of affordability.

**Assessment:** Pass for scope, source attribution, product/API separation, missing-evidence handling and constrained comparison. Readiness applies to comparing limitations, not implementation feasibility. No external verification occurred.

## 3. Impossible-to-substantiate guarantee

**Exact input:** “We have no sources or network. Find a free API that guarantees current laptop policy for every Singapore cafe.”

**Actual human update:**

> Unsaved, partial research: with no sources or network, I cannot substantiate a free API or the required universal freshness guarantee. The next bounded step is to obtain provider documentation explicitly covering price, Singapore completeness and policy update guarantees.

**Actual brief:**

```yaml
type: Solution Research
title: Singapore cafe policy guarantee evidence gap
description: Assess evidence available for a free universally current policy API
status: draft
```

**Scope:** Every Singapore café, current laptop policy, guaranteed, free API. No sources supplied; network unavailable by constraint; no searches performed.

**Options/evidence:** No candidate can be substantiated from available evidence. No suitable option established within this exercise does not mean none exists. Free access, completeness and freshness are separate unproven requirements; no observed result supports any of them.

**Handoff:** Partial research. Obtain a candidate's current API reference, pricing and explicit coverage/freshness commitment, or restore authorized research access. Do not infer a guarantee from a free tier or a policy field. No provider selected or custom build proposed.

**Assessment:** Pass for honest blocked research and bounded next step. Discovery success is untested; the requested guarantee remains unsupported rather than falsely fulfilled.

## 4. Update conflicting evidence without erasing history

**Exact input:** “Update existing research only: Owner note: retain manual contact workflow. Provider X supports a laptop_policy API field [S1: supplied 2024 docs]. New supplied API docs S2 dated 2026-11-01 say field removed. Marketing source S3 supplied, undated, still says laptop policy discovery supported. Keep original evidence and explain what changes; no network or file writes beyond your evidence record.”

**Actual human update:**

> Unsaved update: S2 removes support for treating Provider X's `laptop_policy` field as currently available, while S1 remains historical evidence and S3's broad marketing claim leaves the present discovery mechanism unresolved. The manual contact workflow is retained; next obtain current documentation explaining any replacement interface and the marketing/API discrepancy.

**Actual updated brief content:**

**Retained owner decision:** Retain manual contact workflow. No external contact was made.

| Evidence | Provenance | Claim retained and current treatment |
|---|---|---|
| S1 | Synthetic supplied API docs, 2024; not externally accessed | Original claim: Provider X supports `laptop_policy`. Retain as historical documentary evidence; do not reassert current support. |
| S2 | Synthetic supplied API docs, 2026-11-01; not externally accessed | Field removed. Newer interface-specific evidence changes the current API finding; not a runtime observation. |
| S3 | Synthetic supplied marketing source, undated; not externally accessed | Laptop policy discovery supported. Preserve broad product claim; it establishes neither this API field nor a replacement interface. |

**Changed finding:** A direct integration based on `laptop_policy` is no longer supported by the newest supplied API documentation (S2). This does not establish that every form of policy discovery is unavailable. S3 may concern another interface, version or workflow, but those explanations are inferences only; the scope/date discrepancy remains unresolved. S1 has not been deleted or rewritten as if it always said the field was absent.

**Handoff:** Partial research for current automated policy integration. Preserve manual contact as instructed. Next bounded action: obtain versioned replacement/migration documentation clarifying S2 versus S3; no network or live probe performed. No complete prior artifact or metadata was supplied, so this is an unsaved content update, not a claim to have reconciled an existing file.

**Assessment:** Pass for preserving evidence/owner decision, making the changed conclusion explicit and exposing the unresolved discrepancy in the human update. Actual concurrent file reconciliation and metadata preservation were not exercised.

## 5. Bounded live primary-source research

**Exact input:** “Research whether OpenStreetMap data has a documented tag for laptop friendliness and what that documentation does and does not establish about Singapore coverage and freshness. Limit to official OpenStreetMap wiki/documentation, no API probes or broader provider survey. Return a short unsaved research brief; do not choose a provider.”

**Actual human update:**

> Unsaved: OpenStreetMap's wiki documents café laptop permission and conditional policy tags, but the opened documentation does not establish Singapore coverage or policy freshness. This narrow documentation finding is ready for comparison; a separately authorized Singapore data review would be needed before assessing real coverage.

**Actual brief:**

```yaml
type: Solution Research
title: OpenStreetMap laptop policy documentation
description: Check documented tags and the limits of Singapore coverage and freshness evidence
status: draft
```

**Scope/search:** Official OSM wiki only; query `site:wiki.openstreetmap.org laptop friendly tag`, then direct page opens. Access date 2026-11-10. No API requests, data counts, provider survey or provider selection.

| Evidence | Opened source and revision | Supported documentary claim |
|---|---|---|
| O1 | [OSM café documentation](https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcafe), “Tags used in combination”; revision 3083017, edited 2026-09-24 | Documents `laptop=yes` for explicit permission and mentions conditional exclusions for times/zones. |
| O2 | [OSM conditional laptop key](https://wiki.openstreetmap.org/wiki/Key:laptop:conditional), description and required key; revision 2927131, edited 2025-12-05 | Documents `laptop:conditional` for conditional laptop policy, associated with `laptop=*`; marked in use and a stub. |

**Fit and inference:** There is a documented representation relevant to laptop permission (O1–O2), potentially reusable when interpreting tagged café records. Permission alone does not establish every aspect of laptop friendliness, such as suitable seating or power. Neither opened page measures Singapore population coverage or validates individual policies. A wiki edit date is a documentation date, not evidence that café policies were recently checked. Singapore completeness, correctness and freshness remain unknown; no integration has been tested.

**Access limits:** `Key:laptop` timed out on two direct opens and a linked retry. `Tag:laptop=yes` returned a cache-miss fetch failure. Search snippets were leads only; no conclusion relies on those failed pages. O1 and O2 were successfully opened, not merely seen in search results.

**Handoff:** Ready for comparison for the narrow tag-documentation question, not readiness to deploy a Singapore service. Next bounded action, outside this task: review an authorized Singapore data sample and its policy evidence, with separately authorized data access; sample results would still not prove universal coverage. No probe was run.

**Assessment:** Pass for primary-source support, bounded research and separating schema documentation from geographic/freshness evidence. Retrieval failures were real and preserved; they did not prevent the narrow finding.

## Overall limits

All five cases produced bounded outputs without unsupported provider selection, runtime claims or fabricated citations. This single-agent walkthrough is evidence of one execution, not proof of repeatability or maintainer acceptance. No actual maintained research file, concurrent edit, failed write, paid access, authentication or integration was tested. No skill changes were made by this reviewer.

## Correction: complete artifact formatting

Parent review found a failure missed by this reviewer: cases 2, 3 and 5 supplied isolated YAML fences followed by prose, rather than complete copyable Markdown briefs with `---` frontmatter. Their substantive assessments above remain historical evidence; they were not complete format passes. The parent amended the skill to explicitly require a whole unsaved Markdown artifact in one code block. This reviewer reread that amendment and reran case 5 formatting below. Cases 2 and 3 were not rerun, and no new source retrieval occurred.

**Rerun input:** The exact case 5 input above, with the amended artifact-format instruction. Reuse the sources actually opened during the original run; no new network access.

**Actual two-sentence human update:**

Unsaved: the previously retrieved OpenStreetMap documentation supports laptop permission and conditional-policy tags, but does not establish Singapore coverage or freshness. This narrow documentation finding is ready for comparison; the next step would be a separately authorized Singapore data review.

**Actual complete brief:**

```markdown
---
type: Solution Research
title: OpenStreetMap laptop policy documentation
description: Check documented tags and limits of Singapore coverage and freshness evidence
status: draft
---

# OpenStreetMap laptop policy documentation

## Scope

Assess documented laptop-related tags and what they establish about Singapore coverage and freshness. This formatting rerun reuses the two official wiki pages successfully opened during the original 2026-11-10 walkthrough; it does not claim a new retrieval. The original search was `site:wiki.openstreetmap.org laptop friendly tag`. No API probes or broader provider survey were performed.

## Options and fit

The documentation establishes a representation for laptop permission and conditional policies (O1, O2). Reusing these tags to interpret cafe records is a possible path, not a tested integration. Permission alone does not establish suitability in other respects, such as power or seating. Singapore completeness and current policy accuracy remain unknown.

## Evidence

| ID | Primary source | Retrieval and revision | Supported claim and limit |
|---|---|---|---|
| O1 | [OSM cafe documentation](https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcafe), Tags used in combination | Opened 2026-11-10 in original run; revision 3083017, edited 2026-09-24; reused here | Documents `laptop=yes` for explicit permission and mentions conditional exclusions for times/zones; does not measure Singapore coverage. |
| O2 | [OSM conditional laptop key](https://wiki.openstreetmap.org/wiki/Key:laptop:conditional), description and required key | Opened 2026-11-10 in original run; revision 2927131, edited 2025-12-05; reused here | Documents conditional laptop policy associated with `laptop=*`; marked in use and a stub; does not validate current cafe policies. |

## Uncertainty

These are documentary claims, not observations of Singapore cafe data. Wiki revision dates concern documentation, not when venue policies were checked. Neither source establishes Singapore completeness, correctness or freshness. During the original run, `Key:laptop` timed out twice on direct opens and once on a linked retry; `Tag:laptop=yes` returned a cache-miss fetch failure. Those pages and search snippets do not support the findings above.

## Handoff

- Readiness: Ready for comparison for the narrow documentation question; agent assessment only.
- Next action: If authorized separately, inspect a Singapore data sample and its policy evidence; a sample would not establish universal coverage.
- Limits: No new retrieval in this rerun, no API probe, no integration test, no provider selection and no deployment-readiness claim. This brief is unsaved; its text is retained only within the walkthrough evidence record.
```

**Rerun assessment:** The complete brief now begins with delimited frontmatter and includes its body and claim-linked evidence in a single Markdown fence. The wrapper has two sentences and preserves save status and uncertainty. This corrects the demonstrated case 5 formatting failure; it does not retroactively fix cases 2/3 or validate unexercised behavior.
