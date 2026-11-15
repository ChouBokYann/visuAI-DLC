# Sources and adaptation

- pstack [Hillclimb](https://github.com/backnotprop/pstack/blob/f905b88ebdd877e6b36fcc791970d47f44d15a15/skills/poteto-mode/playbooks/hillclimb.md), commit `f905b88ebdd877e6b36fcc791970d47f44d15a15`: retain a bounded hypothesis, before/after observation, regression checks and an attempt record. Replace minimum attempts and pushing past plateaus with a default maximum of two rounds and early stagnation stop. Omit model-specific delegation, mandatory commits/PRs, a separate TSV log and requiring numerical metrics for subjective quality.

Original adaptation. Shared reservations, interruption handling, explicit extensions and separate quality/stop outcomes are project additions. Existing verify-change supplies evidence assessment; no duplicate review engine or upstream executable code is bundled.

## MIT notice

MIT License

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
