# Instruction checks

The frozen scenario combines stale/zero-test evidence, writer overlap, unknown server ownership and repeated setup failure. The rubric was saved before controls ran. Each of five controls read scenario.md and baseline-router.md; each of five fresh guided agents additionally read the original skill represented by skill-probed.md. Agents were told to write a paper handoff only, read no rubric or other samples, and not execute the proposed operations. Role and context were otherwise the same. Model: gpt-6.2-sol, medium reasoning, fresh context per sample.

Root manually read all responses and scored all eight criteria as satisfied in both arms. The independent skill reviewer spot-checked control1 and guided1. This is not a blinded or statistical evaluation. There was no failing control and no demonstrated behavioral improvement. Discoverability is a design goal; selection was not tested because the skill was supplied explicitly.

The probed skill snapshot keeps its original text and hash; its relative links are interpreted from the canonical skills/implementation/coordinate-agent-work directory. Independent review later restored the pinned shared-contract artifact/version requirement. That one-line additive change is recorded and checked by the reviewer supplementary API/UI scenario in ../records/skill-review.md. No original sample or score was silently replaced with a new result.

The actual runtime coordination test is separate and recorded in ../records/coordination.md. Read assessment.json for per-criterion results and limitations.
