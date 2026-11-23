# Context handoff pilot results

2026-11-23. **Completed pilot; no observed advantage for the enriched condition on this test.** This is a narrow output-consumption experiment, not proof that visuAI preserves goals during implementation or that ontology is ineffective.

## What actually ran

Six fresh agents evaluated five synthetic scenarios each: two runs per condition, with the second reversing case order. Agents had no conversation history or actual project access beyond their assigned packet. Four current skill snapshots were embedded identically in all packets. Existing skills and the Coffee Atlas app were not modified by this trial. No model training, model override, new dependencies or external publication.

| Condition | Presentation | Correct completion verdicts | Certain rubric points | Ambiguous points | Input words per run |
|---|---|---:|---:|---:|---:|
| A | Linear labelled prose with existing skills | 10/10 | 38/40 | 2 | 6,245 |
| B | Same facts with structured record fields/links | 10/10 | 38/40 | 2 | 6,327 |
| C | B plus selected conditional rules | 10/10 | 38/40 | 2 | 6,772 |

The two ambiguous points in each condition are the same inference criterion, one per run. Conservative totals are 38/40; permissive totals are 40/40. Neither interpretation changes the comparison. These rubric counts are not a product quality rating. No unsupported whole-task completion or unnecessary product expansion was observed in these responses. There are six experimental runs over five reused cases, not thirty independent tasks.

All runs correctly marked the rejected coffee experience and failed recovery Changes required; stale CSV verification and an unbuilt guesthouse experience Incomplete; and the fully evidenced label fix Verified within scope. They preserved technical evidence without promoting it to experience or recovery success, and did not invent a business goal for the missing link.

## What the high agreement hides

The useful-inference criterion asked for at least two useful experience/content needs beyond literal catalogue fields, with reasons. All arms identified broad categories such as family suitability, permitted imagery, readable presentation and trust. Those categories were partly cued by the fixture. None substantially developed concrete decision-useful information such as sleeping arrangements, family capacity, access constraints or evidence of the promised calm setting. Those are examples of potential proposals, not known property facts or mandatory fields.

For example, B2 says: "Identify which family-relevant facts are needed without inventing claims, and check suitable permitted imagery if chosen." C2 says: "Identify and verify the minimum factual context families need to assess suitability, marking unknowns." Both defer much of the brief-completion work to the next step.

Under a lenient reading, their broad categories fulfill the original rubric; under a stricter reading they do not supply two concrete additions with reasons. We retain this ambiguity rather than inventing a stricter preregistered criterion after seeing results. The qualitative observation matters more than a one-point choice: selected generic process rules did not visibly produce a richer domain brief here.

## Interpretation for visuAI

The current skills already support correct reasoning about explicit failed evidence, stale revisions and bounded task completion. The enriched condition mostly made existing advice more salient; this easy, fully presented handoff did not require it to rescue a failure.

This supports neither 'ontology fixed the workflow' nor 'ontology is unnecessary.' The pilot did not reproduce the harder Coffee Atlas situation: evolving partial context, actual visual interpretation, selecting work under time pressure, and updating state through several implementation steps. Written recognition of the right next action does not establish execution of it.

The paper adaptation was intentionally small: typed task categories select applicable conditional rules, which are supplied alongside current observations. Rule K9, unrelated payment reconciliation, is excluded. This resembles the robotics paper's rule selection/context enrichment; it is not a reproduction of its ontology, perception, planner or physical execution. It does not implement OntoPrompt's learned embeddings, attention masking or fine-tuning.

## Limits and operational observations

- Parent authored the cases and scored responses without blinding; no independent grader or statistically meaningful effect estimate.
- A is normalized labelled prose, not a raw historical transcript. All arms are unusually well-prepared and share substantial guidance. Missing/conflicting evidence is explicit, making many judgments easy.
- C contains 445 more whitespace-separated words than B (about 7%); no length-matched or generic-rule-only control. Counts are proxies, not measured tokens or billed cost.
- Domain knowledge is shallow. Most selected rules govern verification and provenance rather than what makes a particular experience useful. We did not test a rich domain ontology.
- Model/settings were inherited without override; exact backend identity/version was not exposed by the spawn result. This is not a reproducibility claim across providers or model versions.
- Round-1 agents received a write-only archival exception after starting. A1 and C1 required archival-only follow-ups to save their unchanged returned arrays. No answer feedback or revision was requested. Round 2 received the exception initially.
- An input-hash check exposed a Windows newline issue: the first manifest hashed normalized LF text while files used platform newlines. Normalized hashes matched; correcting the manifest and regenerating did not change any packet bytes. Both logical-text and byte hashes are now recorded.
- No claim is made that these textual agents inspected the underlying UI, executed a recovery or independently verified supplied observations.

## Recommended next test

Keep the current schema and canonical skills unchanged until a stronger test fails. Test the transition from output to action:

1. Use an unfamiliar goal with sparse input and require the producer to supply concrete, justified missing needs, not instructions for another agent to discover them. Include relevant domain knowledge in one condition and a length-matched generic-context control.
2. Give a fresh consumer the resulting handoff and a small actual artifact. Require one bounded implementation/review step with explicit current-state updates, not merely an assessment paragraph.
3. Introduce stale direction or user rejection between steps. Check whether the next action and completion claim change, and whether the original goal remains linked to evidence.
4. Judge task success from independent behavior/artifact evidence and user-reserved quality, not whether the agent repeats the contract.

Do not automatically launch that larger experiment or a new Coffee Atlas redesign as a consequence of this result. The requested local pilot is complete; the user's intended product remains unresolved.

## Evidence

- [Preregistered protocol and rubric](README.md)
- [Deterministic packet generator](make_packets.py)
- [Frozen input manifest](../../output/context-handoff/manifest.json)
- [Fixture facts and rule library](../../output/context-handoff/fixtures.json)
- [Per-item scoring with quoted responses](../../output/context-handoff/scores.json)
- [Run and artifact log](../../output/context-handoff/run-log.json)
- Raw responses: [A1](../../output/context-handoff/A1-response.json), [A2](../../output/context-handoff/A2-response.json), [B1](../../output/context-handoff/B1-response.json), [B2](../../output/context-handoff/B2-response.json), [C1](../../output/context-handoff/C1-response.json), [C2](../../output/context-handoff/C2-response.json).

All six packet files, response JSON shapes, case identities/order, source-fact preservation, rule selection, deterministic generation and unchanged shared-skill hashes were checked. Semantic rubric assessments are explicitly manual. No commit, push or deployment.
