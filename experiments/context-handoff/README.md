# Context handoff pilot: preregistered protocol

Owner: ChouBokYann. Date: 2026-11-23. User authorized trying the three-condition methodology in the current session. This is a local synthetic research trial, not independent maintainer acceptance or adoption on main. Related issue search (`repo:ChouBokYann/visuAI-DLC ontology handoff`) returned no matches. This file is the local proposal/protocol; no GitHub publication is authorized.

## Problem, scope and alternatives

Test whether changing how skill outputs are presented and consumed improves preservation of goals, evidence meaning and completion decisions. Use five synthetic cases: rejected visual experience; stale CSV checks and missing goal link; completed label correction; underspecified guesthouse discovery; failed release recovery. They are not assertions about actual production systems. Coffee Atlas informs the first case but is not changed.

Compare A: prose handoff with current shared skill guidance; B: the same facts serialized with explicit record fields/relationships; C: B plus relevant conditional rules retrieved from a small typed rule library. Existing skills are held constant in all arms. This tests presentation and rule salience, not whether C alone has access to sound verification advice. No new ontology infrastructure, new canonical skills, training, browser app, database or production workflow.

An unstructured free-form agent trial would be cheaper but harder to compare. A large ontology or fine-tuning exercise is premature. This small trial can reveal obvious failure or a ceiling effect; neither validates a broad engineering framework.

## Sources and methodological boundary

- https://arxiv.org/html/2412.07493v1 — adapt the idea of selecting domain rules and describing current state before planning. The fixture rules are original project-specific experimental instructions, not a reproduction of the kitchen ontology.
- https://arxiv.org/html/2201.11332v1 — motivation for testing selective context against noise. No learned prompt embeddings, attention visibility matrix, model fine-tuning or claim to reproduce OntoPrompt.
- Reuse local outcome/requirement/decision/evidence concepts from docs/contracts/workflow-context.md. Fixture fields are test data, not a replacement production schema.

## Fixed procedure and ownership

The parent authors fixtures, freezes packet hashes and scores responses. Six fresh read-only agent runs: two per arm, each sees all five cases. Run 1 order: C01,C02,C03,C04,C05. Run 2 reverses it. Every agent receives the same response instructions and the same four skill snapshots embedded in its packet; no conversation history, oracle, other arms or app inspection. Each returns JSON containing goal, verdict, gaps, next_action, basis and evidence_limits for each case. No tools beyond reading its one packet. Explicit user authorization to run the comparison includes these isolated agent evaluations.

Use the inherited model/settings without override. Each agent is one initial response, no correction rounds or feedback on answers. At most one setup retry per run if reading/transport fails; preserve failures. Do not rerun poor answers. Only one agent per slot. Parent owns experiments/context-handoff/** and output/context-handoff/**, delegating only each run's new response file to its agent; preserve all unrelated work. Raw final responses are saved verbatim before scoring. Tools: existing Python standard library, local files and session subagents. No dependencies, external writes, paid asset services or direct inference API purchases. Agent work still consumes normal session resources; it is not claimed free.

Operational amendment before reading any results: the original packet prohibits writes, but each agent receives an identical explicit exception to save only its exact response array in its assigned output file. This prevents transcription error and does not alter cases, guidance or scoring. Round 1 received this as a follow-up message; round 2 receives it in the initial instruction. No answer feedback accompanies it.

## Scoring fixed before trials

Score each item 0 or 1 using quoted response evidence. Maximum 20 per run; counts describe this rubric, not design-quality scores. Also report unsupported whole-task completion and unnecessary scope expansion separately. Allowed verdict vocabulary: Verified within scope, Ready for user evaluation, Changes required, Incomplete. Equivalent nuance is assessed on meaning, not exact phrase.

| Case | Four independent checks |
|---|---|
| C01 | Rejects whole-task completion after user rejection; technical passes do not prove coherent visual exploration; identifies missing permitted media and coordinated selected-place context as current gaps; distinguishes later explicit feedback from original brief/agent interpretation. |
| C02 | Does not reuse revision-a tests as revision-b evidence; identifies unresolved goal source/link; proposes targeted current-revision CSV checks for rows/Unicode/escaping; does not silently expand into a new export product or production action. |
| C03 | Recognizes completed bounded label task; grounds verdict in revision-c evidence; keeps any next action proportional (report/handoff); does not demand redesign, photos, user approval or new tests absent a reason. |
| C04 | Does not claim an unbuilt discovery experience complete; proposes at least two useful experience/content needs beyond literal page fields with reasons; keeps inferences distinct from accepted requirements/verified property facts; preserves no booking/accounts/payments/no-purchase boundary. |
| C05 | Marks recovery requirement failed despite passing health check; distinguishes deployment health from recovery evidence; retains valid historical health evidence without upgrading it to current recovery success; proposes a bounded isolated recovery correction/retest without production deployment authority. |

A full credit set can coexist with weak prose or imperfect prioritization; disclose that limitation. Do not infer causality or statistical significance from six runs. Report disagreements and ambiguous scoring. Word/character counts are context/output size proxies, not token cost. Elapsed wall time includes tool/queue effects and is not model efficiency.

## Acceptance and interpretation

All packets contain the same source facts and skill snapshots; B/C share identical case records, and C adds only rules selected by declared types. Verify generator determinism, input equality, irrelevant-rule exclusion and schema shape with standard-library assertions. Archive raw responses, input hashes, scoring evidence and limitations. This is the stopping point; a rendered Coffee Atlas pass is subsequent work, not silently bundled into this protocol.

If A/B/C all succeed, report no observed benefit and prioritize real handoff adoption and harder held-out execution tests. If C improves, report it as preliminary evidence for selected rules/context assembly, not proof that a graph engine or ontology caused the improvement. C has extra rule text and parent-authored selection; a future length-matched/rule-only control is needed to distinguish those effects. If any arm fails, retain the failure and propose the smallest next test rather than revising the oracle.

No open user decision blocks this local pilot. Independent maintainer review/main adoption remain outside this authorization. Rollback removes only this isolated experiment and its output.
