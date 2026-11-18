# How the workflows and agents differed

The comparison is **first-iteration-1.1 versus a pstack-inspired workflow** on one approved task: save up to three cafés, compare them, and retain the selection after refresh. Both used the same starting app and independent acceptance criteria.

`first-iteration-1.1` is the current name for candidate A. The earlier label “Bok workflow + Perry additions” described its provenance. This rename does not turn it into an unmodified Bok workflow or change its tested source.

## The important distinction

A skill supplies instructions; an agent executes work. Loading four skills does not create four agents. In both runs, one implementation agent read several relevant skills and owned the coupled source changes. The coordinator handled scope and handoffs; a separate agent checked the result independently. This task did not use a large swarm or different specialist models.

## Actual roles and handoffs

| Agent / person | Input received | Responsibility | Output handed to the next owner |
|---|---|---|---|
| Perry | Suggested café feature | Chose shortlist scope and requested both approaches | Approved common brief and instruction to proceed |
| Coordinator (`root`) | User brief, baseline app, repository instructions | Prepared isolated checkouts; bounded write ownership; coordinated reviews; prepared B's architecture direction | Baseline, brief, owned paths, acceptance handoff, final comparison |
| Reviewer (`shortlist_acceptance`) | Common brief and baseline | Froze22 criteria before inspecting implementations; replayed browser controls after each source freeze | Per-case results, screenshots, tests/build logs, source hashes, harness corrections |
| A author (`cafe_cedar`) | Common brief and first-iteration-1.1 skills | Implemented and checked only A's app; maintained its journey recipe | Frozen source,8 passing logic tests, build/browser evidence, work record |
| B author (`cafe_willow`) | Same brief, pstack references and coordinator's architecture direction | Implemented and checked only B's app; created a project verification skill | Frozen source,9 passing logic tests, build/browser/regression evidence, work record |
| Coordinator (`root`) | Both author handoffs and independent reviews | Checked evidence, preserved variants, explained findings | Separate experiments and comparison for Perry's judgment |

The reviewer did not edit product code. Neither author saw the other's implementation or outcomes. The coordinator could see assignments and results, so this was not a fully blinded trial. Model configuration was inherited; model routing was not a measured difference.

```mermaid
sequenceDiagram
    participant P as Perry
    participant C as Coordinator
    participant R as Independent reviewer
    participant A as A: first-iteration-1.1 author
    participant B as B: pstack author
    P->>C: Choose café shortlist; run both workflows
    C->>R: Freeze shared acceptance before inspecting candidates
    C->>A: Baseline, brief, lifecycle skills, owned app paths
    A->>A: Implement, test, exercise journeys, inspect screenshots
    A-->>C: Freeze source and hand off evidence
    C->>R: Independently verify candidate A
    C->>B: Same baseline/brief; pstack direction and owned paths
    Note over R,B: A review overlaps B implementation
    B->>B: Implement, generate verification skill, run proof and regression
    B->>B: Fix mobile warning found in visual self-review; recheck
    R-->>C: A22/22 passed; two harness corrections
    B-->>C: Freeze source and hand off evidence
    C->>R: Independently verify candidate B
    R-->>C: B22/22 passed; no harness corrections
    C-->>P: Separate experiments, comparison and limitations
```

This describes observed handoffs, not a newly executed agent run or a quotation of every message.

## Differences by phase

| Phase | first-iteration-1.1 in this task | pstack-inspired in this task |
|---|---|---|
| Scope | User-approved brief and repository lifecycle context supplied to author | Same brief, plus coordinator-prepared architecture direction |
| Planning | Author chose a small shortlist module, App-owned selection and a comparison page | Coordinator considered App-only versus a domain module with one state owner; author implemented the latter with a comparison dialog |
| Implementation | `implement-increments` guided bounded changes and checks | Feature playbook, model-the-domain and sequence-verifiable-units guided domain operations, UI, then proof |
| Author verification | `exercise-user-journey` drove real controls; `verify-change` assessed the whole brief | `create-verification-skill` and `prove-it-works` produced and exercised a project-local skill with launch, doctor, drive, evidence and cleanup |
| Maintenance output | `maintain-user-journeys` inspection found no shortlist recipe; a Markdown recipe, feature table and helper were established | Verification skill and feature map were maintained; existing browser helper gained URL/evidence overrides to preserve older evidence |
| Independent review | Shared22-case acceptance, source hashes, private browser contexts | Identical criteria and environment, with UI selectors adapted |
| Delivery | Local source commit, patch, records and independent evidence | Same delivery form; no production release |

The frameworks did not mandate the page-versus-dialog choice. Those are implementation decisions from these particular runs. Likewise,9 versus8 tests reflects how assertions were grouped; it does not establish greater quality by itself.

## Concrete interactions when something went wrong

- **Both authors → build tools:** a case-insensitive `Shortlist.tsx`/`shortlist.ts` collision failed the build. Each author renamed its UI module and reran checks. This was handled within the author's ownership.
- **A author → browser harness:** trying a pointer click on an unavailable save control timed out. The author corrected the test action and reran its recipe.
- **Reviewer → A UI:** an assumed empty-state label and an early popup URL read caused harness problems. The reviewer corrected those assumptions and retained the initial attempt. Product code did not change to accommodate the test.
- **B author → rendered screenshot:** visual review found the storage warning could overlay mobile story controls. The author fixed layout, added a geometry/control assertion and reran checks before freezing source.
- **Reviewer → coordinator:** both final independent reviews reported22/22 passed. No independent-review product defect required a coordinator-to-author repair loop. Such a repair loop is a useful future test; it was not exercised here.

## What to adopt next

Keep the lifecycle structure and one accountable feature owner. Give the owner a precise brief and agreed acceptance criteria, then require a reusable app recipe with setup/readiness checks, actual user actions, failure cases, evidence and cleanup. Require screenshot inspection before handoff and an independent replay after source freeze. Store each attempt separately so reruns cannot erase failures.

Before the next development trial, add a case-insensitive filename check and agree which regressions must run. The next comparison should include a different feature or a deliberate repair task and measured effort; this one does not support a speed/cost winner or general claims about Lauren Tan's personal development process.

Sources: [original setup](setup.json), [raw milestones](events.json), [A evidence](evidence/bok-perry/report.json), [B evidence](evidence/pstack/report.json), [pstack direction](pstack-direction.md), and the author records preserved in source commits `ac4e1c7` and `ebb5068`.
