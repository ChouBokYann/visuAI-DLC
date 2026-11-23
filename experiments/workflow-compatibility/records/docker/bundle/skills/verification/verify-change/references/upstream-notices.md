# Sources and adaptation

Selective adaptation, not an unchanged upstream workflow. No upstream executable helper or mandatory subskill is bundled.

- Superpowers, commit `22f0b463e7a5e579904dd6211a520321035526f7`: [verification-before-completion](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/verification-before-completion/SKILL.md). Retained evidence before claims, reading actual outputs, and checking requirements independently of a passing test suite. Replaced rerunning every command in every message with explicit evidence provenance/state/coverage checks. No automatic revert-based regression check is prescribed.
- Matt Pocock, commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: [code-review](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/code-review/SKILL.md). Retained defined comparison scope and separate requirements/standards assessment. Removed mandatory parallel review agents, tracker setup, fixed smell lists, and committed-diff-only assumptions; actual dirty/untracked state must be accounted for when relevant.
- pstack, commit `4161d4ef5051574e825ffe70e2f43a2e49e4b3db`: [prove it works](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-prove-it-works/SKILL.md). Retained direct artifact/behavior inspection and rejection of self-report as proof. Existing checks can suffice without a new proof script or separate report.
- ECC, commit `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b`: [verification-loop](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/verification-loop/SKILL.md). Retained relevant project checks, diff review, and explicit local-versus-target acceptance. Removed fixed phases, runner assumptions, coverage/timing thresholds, generic grep as a security verdict, and last-commit-only diff scope.

Project-specific additions: stable criterion/evidence/finding references, evidence validity across changes, explicit failed versus missing-evidence states, in-place records, unsaved fallback, concise human output, and separation of technical verdict from approval and execution authority. No ontology schema or automatic factual verifier is implemented.

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
