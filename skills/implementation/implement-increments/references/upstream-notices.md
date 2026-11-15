# Sources and adaptation

This is a selective adaptation, not a copied execution framework. No upstream executable helper, model binding, or required subskill is bundled.

- Superpowers, commit `22f0b463e7a5e579904dd6211a520321035526f7`: [writing-plans](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/writing-plans/SKILL.md) and [executing-plans](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/executing-plans/SKILL.md). Retained concrete active-work details, actual check outputs, continuous execution, and recorded reasons for changes. Replaced the fixed full-plan model with incremental planning. Removed custom workspace scripts, mandatory delegation, fixed review-pass limits, automatic branch-finishing actions, and deletion of execution rationale.
- Matt Pocock, commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: [TDD](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/tdd/SKILL.md) and [to-tickets](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md). Retained behavior-focused checks, independent expected values, vertical cycles, and the migration exception for wide changes. Removed mandatory test-interface approval, automatic ticket publication, per-ticket files, and a blanket ban on refactoring within the implementation cycle.
- pstack, commit `4161d4ef5051574e825ffe70e2f43a2e49e4b3db`: [sequence verifiable units](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-sequence-verifiable-units/SKILL.md) and [prove it works](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-prove-it-works/SKILL.md). Retained checking each increment and inspecting real artifacts. Removed mandatory rebasing/commit patterns and did not require a new proof script when existing checks suffice.
- ECC, commit `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b`: [TDD workflow](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/tdd-workflow/SKILL.md). Retained runner discovery, intended-failure versus setup-failure distinctions, and behavior-to-evidence mapping. Removed runtime helper dependencies, universal coverage/timing thresholds, mandatory stage commits, blanket command-approval rounds, and separate TDD report files.

Project-specific additions: lean Planning handoff, scope-aware return paths, stable concept relationships, tested-state attribution, preservation of other contributors' work, partial/blocked reporting, and a one- or two-sentence human update. Structural consistency does not prove factual truth. No graph validator or new schema is implemented.

## MIT notices

The upstream root licenses at these pinned revisions use the same MIT terms; their copyright notices are preserved together.

MIT License

Copyright (c) 2025 Jesse Vincent

Copyright (c) 2026 Matt Pocock

Copyright (c) 2026 Lauren Tan

Copyright (c) 2026 Affaan Mustafa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
