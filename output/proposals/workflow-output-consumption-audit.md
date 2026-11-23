# Goal continuity and skill-output consumption audit

Date: 2026-11-23. Owner: ChouBokYann. Scope: read-only investigation of the existing skill contracts and Coffee Atlas records, following the user's diagnosis that context and meaning are being lost between goal, output and completion. This is research and a proposed next experiment, not an implemented orchestration system or accepted ontology expansion. No app code, canonical skill or shared schema changed in this audit.

## Finding

The repository already specifies goal traceability and distinct completion meanings. The observed failure is not simply an absent ontology or absent Playwright. Coffee Atlas only partially materialised that contract, and the executing agent treated successive local fixes and narrow evidence as sufficient grounds for another visual handoff. Better instruction text alone has not demonstrated better execution.

Three concerns must be kept separate:

1. **Context availability:** which authoritative original expectations, later feedback and current decisions reach the next step?
2. **Semantic preservation:** does the next artifact retain the difference between a goal, a proposed interpretation, a requirement, an implementation choice and evidence about that choice?
3. **Consumption and judgment:** does the agent actually use those distinctions to choose work and assess the whole outcome? A correct document can still be ignored or misinterpreted.

## Existing producer/consumer contracts

| Producer | Output already requested | Consumer and obligation | Observed weakness |
|---|---|---|---|
| understand-expectations | Source expectation, interpretation, observable criterion, evidence method, judgment owner | Requirements preserves material expectations and distinguishes baseline from optional refinement | Coffee Atlas's experience remained compressed into a broad visual criterion. |
| define-requirements | Stable requirement, basis/source, check, dependencies/gaps and expectation coverage | Planning retains purpose, constraints and unresolved choices | Listing/filter/navigation criteria became concrete; overall exploration quality stayed less operational. |
| set-ui-direction | Canonical brief, proposed treatments, constraints, readiness and specialist handoff | Implementation/specialist consumes original intent plus the brief, rather than just the latest correction | Terrain and motion were improved individually without demonstrating a coherent whole experience. |
| implement-increments | Requirement-linked work, artifact identity, evidence, limits and remaining work | Verification evaluates original request and actual artifact, including weak/missing translation | Browser counts and local visual observations were repeatedly prominent in handoffs; they were insufficient evidence of the user's desired experience. |
| verify-change | Requirement/evidence mapping, separate functional/experience/user verdicts | Next action returns to the cause; failed quality is not optional polish | The records say user acceptance is pending, correctly, but author visual judgments were repeatedly too weak. Qualifying a handoff is not a substitute for good judgment. |
| handoff-work | Current objective, canonical references, state, valid/stale/missing evidence and next action | Resuming agent reconstructs current obligations and does not revive superseded decisions | One delivery document retains history with competing-looking current headings; current-state retrieval needs interpretation. |

Sources: [delivery workflow](../../docs/workflows/deliver-change.md), [shared output contract](../../docs/contracts/workflow-context.md), and the existing templates under the five named skills. These are prompt instructions, not proof of enforcement by a scheduler.

## Coffee Atlas trace and concrete evidence

Original user direction: a clean, cream cartoon world map for exploring coffee origins, flavour/culture and Singapore cafe matches. The [E12 proposal](experiment-12-coffee-atlas.md) preserves that journey and uses E12-01 through E12-09. Its E12-07 asks for rendered inspection against clean/cream/cartoon direction, but does not adequately establish what a satisfying, cohesive exploration experience entails.

The same proposal explicitly requests a representative origin-to-cafe slice before expanding all six entries. The [delivery record](../../experiments/coffee-atlas/DELIVERY.md) says all six data entries were prepared before the first visual journey for source coverage. That is not inherently a defect, but it demonstrates why sequence compliance must be evaluated against purpose rather than checkbox ordering. Subsequent repeated user rejection is the stronger evidence that the representative visual assessment did not invalidate weak approaches soon enough.

Later changes are recorded mainly as revision prose: new geography, terrain, motion and zoom tests. New feedback is understandable to a reader, but not consistently assigned current requirement/decision identities with explicit effects on earlier acceptance. Both the proposal and delivery record lack a `workflow_context` namespace, despite the existing skills' shared-contract instructions. No evidence was found that the Coffee Atlas records were exported or validated under that semantic contract. This is an adoption/agent-execution gap; it does not prove that adding YAML alone improves design.

The delivery record now puts **Changes required** at the top following the latest user rejection. Further down, historical sections still use **Current result** and **Final acceptance evidence** headings and contain **Ready for user evaluation**. Their surrounding revision text helps disambiguate them, but a partial retrieval can surface a stale conclusion. Preserve history, but expose one unmistakable current state.

The actual app checks establish bounded facts: correct origin-to-cafe mapping, control behavior, no overlap at selected widths, animation progression, zoom percentages and panning. None establishes that the map looks like one authored scene or that the combined camera, media and details interaction fulfills the user's intent. The later feedback demonstrates a failed experience assessment even though those bounded checks passed.

Photography and particular camera behavior were not all explicit in the original prompt. Do not rewrite history to claim they were. An agent should have considered and proposed relevant media and exploration behavior as interpretations of the goal; the latest user feedback now makes those needs explicit. The failure is weak exploration of missing design needs plus later failure to integrate feedback, not a requirement that an agent perfectly predict taste.

## Existing ontology: useful, but insufficient by itself

The shared contract already defines problem, outcome, requirement, decision, change, evidence and release, plus relations such as supports, implements, evaluates and supersedes. It distinguishes technical from business evidence, requires provenance and states that a contribution link is not proof of success. Reuse these meanings before creating new types.

[export_workflow.py](../../scripts/export_workflow.py) validates authored structure and references. It skips documents without workflow_context and rejects a bundle with no workflow records. Its complete-bundle flag describes reference coverage of the selected source set, not completeness of the user's goal. It explicitly does not establish semantic truth. A fully connected graph could still encode a poor interpretation or a weak acceptance test.

The missing behavior to test is whether the consumer can reconstruct a justified completion argument: which current obligation supports which goal; what the cited evidence actually proves; what remains unresolved, contradicted or judged by the user. 'Implemented', 'passed', 'ready for evaluation' and 'goal achieved' must remain distinct.

## Pressure-test observation

A fresh read-only agent received only the existing UI-direction skill and the original coffee brief, without recent complaints or the app. It already proposed recognizable illustration, connected origin/cafe context, source credibility, accessible selection and one representative composed journey. It did not prescribe photography or place-centred camera movement and treated motion as non-required. Its dense-dashboard answer preserved useful density and existing capabilities.

This baseline does not demonstrate a general failure to write briefs. It instead shows that the skill can produce sensible instructions while the actual project still fails. Do not claim a wording change has solved the problem based on the same kind of written walkthrough again.

A subsequent consumption test gave that agent only DELIVERY.md as the handoff. It correctly recovered the original goal, distinguished later photography/camera requirements from original explicit requirements, returned Changes required, and explained why functional passes did not prove the experience. It could name the next corrective work but found no current requirement/decision IDs linking each newest criticism to that work. It also identified stale Current result/Final acceptance headings and an old original-SVG-only specialist instruction competing with the new photography direction. Thus a careful reader can reconstruct the state today; the failure is not proof that the context is wholly absent. The same agent was reused for this second test, so it is not an independent cold-start replication. Future tests should use fresh consumers and controlled partial/stale inputs.

## Smallest next experiment: test output use, not another UI patch

Use the existing semantic vocabulary and one current acceptance section. Do not build a graph database, viewer, scheduler or new skill to run this experiment.

1. **Producer:** take the original coffee goal and attributed latest feedback. Produce a compact current set of obligations, each with its goal/source, explicit versus inferred basis, acceptance observation, evidence type and current gap. Keep optional recommendations separate. Reference actual assets and decisions; mark missing ones.
2. **Consumer:** give a fresh agent only the canonical output and linked evidence, without the conversation. Ask it to explain the intended experience, identify incomplete obligations and choose the next increment. Require the selected increment and completion claim to cite the obligations they address; a read receipt alone is not proof of understanding.
3. **Challenge the handoff:** remove an important goal link, insert a narrow technical pass as purported visual evidence, mix in a superseded visual-pass statement, change the accepted direction without refreshing downstream work, and remove a required asset. Each should cause a specific gap, stale-evidence finding or incomplete verdict. Use synthetic copies, not mutations of authoritative records.
4. **Check useful inference:** include an underspecified non-coffee brief and a routine label edit. The consumer should identify necessary design questions/supporting content without inventing product capabilities or forcing a large workflow on the label edit.
5. **Demonstrate one rendered slice:** only after the handoff survives those checks, implement and assess one complete Coffee Atlas journey with suitable photos, cohesive map composition and place-focused camera/details behavior. Use Playwright for interactions and visual evidence; assess composition and continuity explicitly, not by test count.

Success means fresh consumers preserve the goal and distinguish insufficient evidence, stale decisions and unresolved design needs. It does not mean a schema guarantees completeness or an agent can claim user acceptance. If the current contract already produces that behavior, fix adoption and orchestration rather than expanding it. If it fails, make the smallest producer/consumer contract change justified by the failing case.

## Limits and current state

This audit reads the current repository and local experiment records, not a complete execution telemetry trace. It cannot prove every tool invocation, every historical context window or why the model omitted a particular inference. The initial UI-brief correction draft and current Changes-required verdict were recorded earlier in this turn; no additional canonical skill prose or app implementation was applied after the user steered toward the broader investigation. No pushes, schema migration or ontology infrastructure work occurred.
