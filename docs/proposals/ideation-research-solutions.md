# Proposal: research existing solutions

Status: candidate work on `first-iteration`, requested by the user's “ok next” after the first skill implementation. This follows the session-authorized candidate process; independent maintainer acceptance and main-branch merge permission are not claimed.

## Change and lifecycle process

Add an independently callable Ideation skill at `skills/ideation/research-solutions/SKILL.md`, a research brief template and upstream notices in its `references/`, and an entry in `skills/ideation/README.md`. Record walkthrough evidence alongside this proposal. Keep the existing clarification skill unchanged.

## Problem and need

Users need evidence about existing products and integration options before choosing a solution. Developer-oriented search skills can jump from finding a package to installing it; generic research can collect links without showing whether an option actually meets the user's constraints. For Singapore cafe discovery, geographic coverage and documented laptop-policy data must be investigated separately; a cafe listing is not proof of either suitability or an accessible API.

## Proposed solution

Adapt Matt Pocock's primary-source research and ECC's search-before-build practices. Research a bounded problem, compare documented capabilities against its needs, and identify reuse or integration paths and unresolved feasibility questions. Maintain claim-level citations, distinguish vendor claims from observations, and preserve conflicts. End at a research handoff, leaving the final choice to the separate recommendation skill.

Use the existing two-output convention: a detailed Markdown research brief and a one- or two-sentence human update. Reuse existing research and records. New briefs use minimal OKF metadata; preserve approved extension fields without inventing a semantic schema or verification status.

## Scope

- Included: problem-led research, existing capability discovery, bounded comparisons, source/freshness tracking, integration constraints, explicit access failures, and an update path for existing briefs.
- Excluded: final provider selection, installation, purchases, account creation, credential use without authorization, production probes, implementation, mandatory agents, graph infrastructure, and a fixed candidate count.

## Alternatives and tradeoffs

- ECC unchanged: strong reuse discipline, but package-oriented and proceeds into implementation. Adapt its search and evaluation only.
- Matt Pocock unchanged: concise primary-source guidance, but lacks a product-fit comparison and mandates a background agent. Keep evidence discipline and make tool choice environment-dependent.
- Combine research and recommendation: fewer handoffs, but defeats the user's independent entry points for known options. Research may record factual fit or blockers without selecting the final solution.
- Skip research: saves effort only when supplied evidence already covers the material questions; permit that fast path while disclosing freshness limits.

## Tools and services

Use available repository readers, connected search/docs tools, or web access where relevant and authorized. Prefer public official sources for product/API facts. Queries disclose their text to the search provider; do not include private project details, credentials, or user data unnecessarily. No new service, package, mandatory model fanout, or paid access. Existing harness usage costs apply. Missing access yields partial evidence and a named gap, not “no solution exists.” Active integration tests require separately scoped authorization and are not required for a desk-research brief.

## Acceptance criteria and validation

- Vague problem: asks for the missing scope rather than searching for a presumed app.
- Existing solution evidence: records reuse/integration candidates and requirement fit without rebuilding or installing.
- Conflicting evidence: preserves both sources and dates/scopes; does not promote a marketing claim over narrower API documentation without explanation.
- No network or insufficient evidence: returns partial findings with access limitations and no invented search, sources, prices, or absence claim.
- Stale or complete supplied research: refreshes material unstable facts when access permits; otherwise flags them. Does not repeat a completed interview or rerun adequate research merely to fill a quota.
- Existing-brief update: preserves unrelated findings and records changed conclusions without adding a new report chain.
- Human update stays within two sentences including save status and material uncertainty; detail carries sources, constraints, and the recommendation handoff.
- Validate skill structure and local links. Run a separate agent's bounded synthetic-source walkthrough and a small public-primary-source exercise. Clearly distinguish simulation from live retrieval and from executable integration validation.

Example input: “Research how a remote worker can establish Singapore cafe laptop policies before travelling, without assuming live seat data or AI.” Expected output: scoped existing approaches, cited capability evidence and gaps, access/cost considerations when evidenced, and unresolved questions for recommendation. If policy coverage cannot be established, say so rather than infer it from generic place listings.

## Ownership and dependencies

- Human owner: ChouBokYann; independent reviewer: Perryong, subject to participation.
- Root agent: owns this proposal, skill, template, notices, index entry, structural checks, commit and push. Evaluation agent: owns only `docs/proposals/ideation-research-solutions-walkthrough.md`; may read skill files and public primary sources, with no production changes.
- Overlap search: current open issues inspected; #7 owns broad candidate comparison and #8 remains deferred. No active issue specifically accepts this skill. This local proposal is not an issue publication or independent approval.
- No runtime dependency on clarify-problem: an adequate user request or existing brief is enough. Separate recommendation/requirements skills remain unimplemented.

## Sources, impact, and risks

- [Matt Pocock research](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/research/SKILL.md), MIT, copyright 2026 Matt Pocock.
- [ECC search-first](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/search-first/SKILL.md), MIT, copyright 2026 Affaan Mustafa.

Both source bodies and root licenses were inspected before adaptation. Preserve full MIT terms and both copyright notices alongside the skill. No upstream scripts are copied. Risks: citation laundering, outdated pricing, mistaking undocumented capabilities for absence, leaking private context through queries, and a good-looking comparison becoming an implicit recommendation. Address these in instructions and walkthroughs. Removal requires deleting the candidate directory and index entry; no runtime or existing brief migration is introduced.

## Open questions

Independent review and the separate semantic-extension design remain pending. No additional user preference blocks this bounded candidate implementation.

## Candidate validation

- Skill structure: `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ideation/research-solutions` passed.
- Local Markdown links resolve. Tracked whitespace checks passed; staged checks cover new files before commit.
- Behavioral evaluation is recorded in [the walkthrough](ideation-research-solutions-walkthrough.md), including exact supplied fixtures and a bounded public-source exercise. Consult that record for actual outcomes rather than treating the existence of this link as a passing result.
- Parent review found that the initial new-brief outputs split YAML metadata from prose rather than returning complete OKF Markdown artifacts. The skill now explicitly requires a single document with delimited frontmatter; the walkthrough preserves the original failure and a targeted formatting rerun using previously retrieved sources.
- Not established by these checks: independent human comprehension, multi-runtime behavior, real API/data coverage, end-to-end integration feasibility, or semantic-extension correctness. No executable helper was added.
