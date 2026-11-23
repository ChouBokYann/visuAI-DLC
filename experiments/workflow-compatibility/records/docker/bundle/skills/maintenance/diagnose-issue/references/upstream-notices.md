# Sources and adaptation

Selective adaptation, not an unchanged debugging or incident runtime. No upstream diagnostic script or mandatory subskill is bundled.

- Superpowers, commit `22f0b463e7a5e579904dd6211a520321035526f7`: [systematic-debugging](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/systematic-debugging/SKILL.md). Retained symptom reproduction, recent-change inspection, boundary tracing, and small hypothesis checks. Removed universal phases, arbitrary retry counts as architectural proof, mandatory instrumentation, and prevention of authorized urgent mitigation. Durable fixes use the existing Implementation responsibility.
- Matt Pocock, commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: [diagnosing-bugs](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/diagnosing-bugs/SKILL.md). Retained a symptom-specific feedback signal, falsifiable predictions, minimized reproduction, targeted probes, redaction, and checking the original scenario. Removed fixed hypothesis counts, speed/frequency thresholds, stress loops, required custom harnesses, and mandatory blocks on provisional reasoning without reproduction. Cleanup is scoped to owned probes and preserves evidence/unrelated work.
- pstack, commit `4161d4ef5051574e825ffe70e2f43a2e49e4b3db`: [fix-root-causes](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-fix-root-causes/SKILL.md). Retained tracing to the originating fault, checking relevant repeated mechanisms, and distinguishing legitimate state handling from masking an upstream fault. Removed assumed causal shortcuts and automatic broad fixes or instrumentation.
- Matt Pocock, same pinned commit: [retro](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/retro/SKILL.md). Retained looking for existing checks before proposing a proportionate prevention improvement for demonstrated recurrence. No session-log sweep, required writing subskill, automatic hooks, global-rule changes, or access expansion is imported.

Project-specific additions: explicit cause confidence, actual impact/mitigation distinctions, bounded probes and authorization, one maintained record with stable semantic references, lean lifecycle routing, and concise human output. No incident platform, automatic causal verifier, or ontology schema is introduced.

## MIT notices

The upstream root licenses at these pinned revisions use the same MIT terms; their copyright notices are preserved together.

MIT License

Copyright (c) 2025 Jesse Vincent

Copyright (c) 2026 Matt Pocock

Copyright (c) 2026 Lauren Tan

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
