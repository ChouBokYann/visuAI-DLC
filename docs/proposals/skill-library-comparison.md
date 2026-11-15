# Engineering skill library comparison

Status: research and proposal, not an adoption decision. Related exploration: [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7). Compare against the ten candidates on `first-iteration` at `cbe3597`. Current direction remains [NORTHSTAR.md](../../NORTHSTAR.md); independent review and real-project evaluation remain pending.

## Recommendation

Keep the ten skills as the lifecycle core. Supplement them with independently callable skills for particular questions and risks. The core covers the lifecycle, but it does not yet offer enough focused entry points for established projects, interrupted sessions, and specialized verification.

Start with six proposed supplements: **understand-system, assess-change-impact, clarify-domain-model, handoff-work, address-review-feedback, and test-an-assumption**. They address different reasons to invoke an agent without repeating a whole lifecycle stage. Further additions should follow the project's actual risks and stack. The [supplement proposal](skill-supplements.md) defines boundaries, sources, validation cases, and rollout.

## Coverage and method

The [complete catalogue comparison](skill-catalogue-comparison.csv) contains one row for each of **426 upstream SKILL.md files**, including experimental entries. Every row records a pinned source URL, disposition, proposed destination, rationale, review depth, and source word count. Filter by `disposition` or `proposed_target` to compare competing candidates.

This is complete **catalogue coverage**, not 426 behavioral audits. Catalogue screening used skill names, descriptions, directory placement, and headings. Fourteen shortlisted or contrast candidates received a SKILL.md body review in this comparison; supporting scripts, every linked reference, installation, and runtime behavior were not exhaustively audited. A catalogue-only recommendation is a candidate for inspection, not a ready-to-copy adaptation. Previously authored core comparisons remain useful but are not counted as new body reviews here.

The sources are the revisions used for this branch's research, not a claim about today's latest upstream versions. Public source snapshots were downloaded for inspection; no upstream scripts were executed. Count SKILL.md files, not commands, agents, hooks, rules, playbooks, templates, or README marketing totals. An alias still counts as a file, not as a distinct capability. Word count is only source size; it is not measured token use or runtime cost.

| Collection | Pinned revision | Skill files | What that number includes |
|---|---|---:|---|
| [pstack](https://github.com/backnotprop/pstack/tree/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills) | `4161d4e` | 58 | 24 principle skills plus task, explanation, orchestration, and authoring skills |
| [Superpowers](https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7/skills) | `22f0b46` | 15 | A cohesive development process and supporting review, workspace, and skill-authoring practices |
| [Matt Pocock](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills) | `4ae2317` | 39 | 20 engineering, 7 productivity, 4 miscellaneous, 8 in-progress; some entries route to other skills |
| [ECC](https://github.com/affaan-m/ECC/tree/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills) | `d2ef268` | 314 | Engineering methods, stack guidance, agent infrastructure, domain operations, media, and deprecated entries |
| Our branch | `cbe3597` | 10 | Four Ideation, one Planning, one Implementation, one Verification, two Deployment, one Maintenance |

## What flexibility means here

Judge whether a skill can start from sufficient existing context, answer a narrow request, scale its effort, reuse another skill's result, survive missing tools, and preserve project conventions. Also judge whether its output helps a human understand the consequence without reading every agent's work. More entry points can improve flexibility; more mandatory stages can reduce it.

These are qualitative design assessments, not measured rankings:

| Collection | Independent entry and composition | Adaptation and overhead | Main value to us |
|---|---|---|---|
| Our core | Written to accept equivalent inputs and skip completed stages; common handoffs | Tool-independent and concise, but later stages encompass many different tasks | Lifecycle continuity, evidence discipline, and short human summaries |
| pstack | Many precise questions: how, why, impact, measurement, explanation | Some methods invoke other skills, configured models, or multiple agents; principles inflate the count | Evidence-backed understanding and targeted investigation |
| Superpowers | Focused review/debugging tools inside a strongly prescribed process | Mandatory process language, detailed plans, and execution conventions need adaptation for our lean approach | Strong testing, diagnosis, review, and completion discipline |
| Matt Pocock | Distinct domain, prototype, handoff, research, and review entry points | Some short skills are routers; others depend on tracker setup, agent fanout, or specific artifact formats | Narrow task selection, domain language, and resuming work |
| ECC | Broadest choice of specialist and stack skills | Mixed granularity and dependency requirements; several overlapping workflows and governance systems | Optional technical depth after selecting a project profile |

Our intended flexibility is not yet demonstrated across projects. The Ideation Codex trial provides limited actual runtime evidence; the later-stage walkthroughs are authored examples, not independent behavioral trials. Do not turn the design assessment into an empirical quality score.

## Assessment of every core skill

| Current skill | Flexibility in its written contract | Remaining gap | Action |
|---|---|---|---|
| `clarify-problem` | Starts with ambiguous needs or reuses a sufficient brief | Business terms can still conceal conflicting concepts | Keep; invoke domain clarification only when ambiguity changes behavior |
| `research-solutions` | Supports a broad search or one missing feasibility fact | Existing-code understanding and experimental feasibility differ from provider research | Keep; add system understanding and bounded experiments |
| `recommend-solution` | Compares supplied options; permits a conditional recommendation | A decisive assumption may require an experiment | Keep; use experiment evidence without repeating the entire comparison |
| `define-requirements` | Supports provisional requirements and in-place updates | Shared terminology can drift between requirements and implementation | Keep; link resolved domain concepts rather than duplicate them |
| `set-development-direction` | Accepts equivalent direction and stops before exhaustive tasks | Risky existing-system changes need more impact evidence | Keep lean; make impact assessment optional, not another planning gate |
| `implement-increments` | Owns detailed planning and accepts features, fixes, refactors, and experiments | Broad entry point obscures specific experiment, review-response, migration, and refactor methods | Keep as execution owner; add specialists with separate questions and outputs |
| `verify-change` | Supports bounded review and separates requirements, standards, and evidence gaps | Generic verification cannot supply every testing, security, performance, or accessibility method | Keep as assessment owner; add selected evidence-producing specialists |
| `prepare-release` | Works from an existing release process without rebuilding infrastructure | Provider setup, data migration, and operational readiness need project knowledge | Keep; select provider guidance only when a target project needs it |
| `deploy-and-check` | Resumes actual operations and distinguishes submission from observed success | No universal provider commands or incident operations | Keep; use the project's actual runbook and optional platform skills |
| `diagnose-issue` | Starts from symptoms or reuses established diagnosis; distinguishes mitigation and resolution | Preventive maintenance, performance measurement, and accumulated lessons are separate jobs | Keep; introduce those jobs only on their own triggers |

The main imbalance is **four focused Ideation skills versus broad Implementation, Verification, and Maintenance skills**. Adding narrow later-stage tools makes sense. Splitting every paragraph into a skill would make routing harder without supplying new expertise.

## Capability comparison across the collections

Names below are upstream candidates, not instructions to invoke them or promises that they work in this host. Each exact source is linked in the CSV.

| Capability | pstack | Superpowers | Matt Pocock | ECC | Selection |
|---|---|---|---|---|---|
| Problem framing | `in-your-own-words`, `sharpen` | `brainstorming` | `grilling`, `to-questionnaire` | `product-lens`, `intent-driven-development` | Already represented; borrow useful questions rather than add an interview workflow |
| Research and reuse | Premise-checking principles | Brainstorming context exploration | `research` | `search-first`, `research-ops`, `deep-research` | Existing research skill; optional search services are dependencies, not new core stages |
| Direction and decomposition | `architect`, `figure-it-out` | `writing-plans` | `to-spec`, `to-tickets`, `wayfinder` | `product-capability`, `blueprint`, `story-lifecycle` | Lean direction stays; ticket decomposition only for actual coordination needs |
| System understanding | `how`, `why`, `teach` | No dedicated equivalent | `codebase-design` supplies design vocabulary | `codebase-onboarding`, `code-tour` | Add focused understanding; separate observed behavior from inferred rationale |
| Domain meaning | Domain and type principles | Embedded in brainstorming | `domain-modeling` | `context-and-decisions`, `architecture-decision-records` | Adapt Matt's concept clarification; preserve sparse, consequential decisions |
| Change impact | `blast-radius` | Review and worktree context | Review and architectural exploration | `change-impact`, `module-regression` | Combine dependency investigation with before/after reconciliation |
| Experiments | Competing-prototype principles, `arena` | No dedicated prototype entry | `prototype` | Several product/UI specialists | Adapt question-led experiments; extend beyond UI/logic to integration feasibility |
| Implementation and tests | `tdd`, verifiable-unit principles | `executing-plans`, TDD, subagent development | `implement-spec`, `tdd` | `tdd-workflow`, orchestration family | Keep core loop; no second mandatory execution engine |
| Review and feedback | `interrogate`, `blast-radius` | Requesting and receiving review | `code-review` | `issue-review`, `production-audit` | Review covered by core; add a distinct feedback-resolution entry |
| Test depth and journeys | Create/maintain verification skills | TDD and completion evidence | TDD methods | `test-collaboration`, E2E, browser and desktop QA | Optional gap analysis and project-selected journey testing |
| Security and accessibility | General boundary principles | General review discipline | General standards review | `security-review`, security families, `accessibility` | ECC supplies candidate depth; assess actual boundaries/platform, not universal checklists |
| Interfaces and migrations | Impact, idempotency, caller migration | Execution/review discipline | Domain/design guidance | `contract-first`, `api-design`, `database-migrations` | Optional specialist methods for independently evolving boundaries and persistent data |
| Performance | `benchmark-checklist` | Debugging method | `diagnosing-bugs` | `benchmark`, `latency-critical-systems`, stack performance | Measurement supplement distinct from root-cause diagnosis |
| Release and delivery | Evidence and verifiable-unit principles | `finishing-a-development-branch` | `pr`, `wizard` | Deployment, containers, Kubernetes, canaries | Core pair plus actual provider runbooks; no generic infra builder |
| Re-entry and learning | `recall`, `reflect`, `correct` | Process diagnosis | `handoff`, `retro` | Compaction, unified memory, living docs | Add lightweight handoff; defer memory runtime and automatic rule rewriting |
| Parallel work and isolation | `swarm`, `arena` | Dispatching agents, worktrees | Some skills require subagents | Many orchestration/harness skills | Optional workflow mechanics; no default fanout or new authority model |
| Skill maintenance | Setup and correction tools | `writing-skills` | `writing-for-agents` | Stocktake, compatibility, compliance tools | Maintainer tooling, not a product engineering lifecycle stage |
| Stack/domain expertise | TypeScript, formal methods | Largely stack-neutral | A few TypeScript/tooling utilities | Extensive language, framework, data, network, ML and domain families | Select a small project profile after the stack and risks are known |

## Full inventory disposition

These totals count upstream files, not proposed new skills. Multiple sources can support one supplement. Primary disposition is for our library, not a universal quality judgment.

| Disposition | Files | Meaning |
|---|---:|---|
| A: supplement next | 13 | Source candidates for the six proposed additions |
| B: conditional supplement | 38 | Candidate methods for a demonstrated task/risk; inspect before adaptation |
| C: core overlap/reference | 69 | Already-covered jobs or cross-cutting principles; avoid duplicate entry points |
| D: opt-in tooling/process | 96 | Harness, orchestration, setup, routing, memory, or maintainer tools |
| E: defer heavier workflow | 6 | Larger planning/coordination or presentation systems beyond today's lean need |
| F: project/domain specialist | 139 | Select for the actual stack, service, domain, or assurance requirement |
| G: outside general engineering core | 55 | Business operations, content/media, or specialized research rather than generic development |
| H: deprecated upstream | 2 | Entries redirecting to a successor |
| I: experimental upstream | 8 | Matt's in-progress entries; no baseline adoption |
| **Total** | **426** | Unique repository/path pairs |

An F or G disposition is not a rejection of a skill's value. A healthcare product, media editor, or infrastructure tool may need those methods. Their relevance cannot be inferred from our six lifecycle labels alone.

## What must change when adapting candidates

- **pstack:** retain real-code evidence and attention to indirect effects. Remove fixed model choices and required multi-model runs from generic skills. Keep its 24 principles as selective guidance rather than 24 mandatory invocations. Performance measurement should resolve platform commands from the host.
- **Superpowers:** retain technical evaluation of review feedback. Its receiving-review skill blocks all implementation while any feedback is unclear; our version should block dependent work and continue independently understood, authorized fixes. Do not transplant personal response rules or auto-post review replies.
- **Matt:** retain domain scenarios, minimal handoffs, and question-led prototypes. Do not require tracker setup, issue publication, a temp-only handoff destination, HTML reports, or a particular architecture vocabulary. The prototype's relaxed production standards apply only to a bounded throwaway artifact; resource protection and a valid experimental oracle still matter.
- **ECC:** retain explicit contracts, consumer/provider verification, and evidence-linked test gaps. Avoid importing its full documentation hierarchy, governance authority, runtime, or fixed coverage targets. The security candidate includes framework-specific examples and dependency-changing commands; these are not universal controls or authorization to mutate dependencies. Every executable adaptation needs project-specific validation.

The core already carries several of these adaptations. This comparison does not claim the original repositories lack quality; it identifies where their defaults differ from this project's goals.

## Validation and limits

The inventory contains 58/15/39/314 entries, 426 unique source paths, nonempty dispositions, and pinned links. The proposal is documentary: no canonical skill, test, configuration, hook, runtime, or dependency changes. No private project files were uploaded to upstream services. Downloads involved public repository sources only.

Catalogue screening cannot establish correctness of code examples, successful tool installation, licensing of every embedded third-party asset, or real token savings. Before adapting a source, inspect its complete referenced material, preserve applicable notices, and test the resulting candidate against the proposed cases. The upstream repositories' root licenses are MIT in the inspected snapshots; that does not replace per-file/reference attribution review.

Do not treat a coherent Markdown relationship as proof of the underlying claim. Links preserve traceability; actual observations and revision-specific executable checks provide evidence. This proposal adds no ontology engine or visualization infrastructure.
