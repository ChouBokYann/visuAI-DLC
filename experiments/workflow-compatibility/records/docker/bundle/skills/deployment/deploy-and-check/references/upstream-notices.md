# Sources and adaptation

The Deployment pair selectively adapts principles; neither is a copy of an upstream release runtime. Each skill carries these notices so it can be installed independently. No platform command, pipeline, container template, or helper is copied.

- ECC, commit `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b`: [deployment-patterns](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/deployment-patterns/SKILL.md). Retained environment/configuration prerequisites, relevant health checks, rollout considerations, and recovery compatibility. Removed universal infrastructure checklists, assumed rollout strategies, example commands, fixed metrics, and mandatory Docker/Kubernetes/CI configuration. Recovery must be verified for the actual platform and data state rather than inferred from an example.
- Superpowers, commit `22f0b463e7a5e579904dd6211a520321035526f7`: [finishing-a-development-branch](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/finishing-a-development-branch/SKILL.md). Retained explicit scope of integration choices and preservation of work. Removed mandatory menus, branch/worktree cleanup, assumptions that deployment follows merge, and repeated confirmation of already granted authority.
- Matt Pocock, commit `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: [PR](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/pr/SKILL.md) informed concise explanation of evidence, reversibility, and impact. Its visual/PR template is not copied. That source credits Dex Horthy at Humanlayer and [show-me](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md); this credit is retained without claiming inspection or adaptation of that linked upstream's current content.

Project-specific additions: independent preparation/execution entry points, one maintained release record, exact artifact/target scope, ambiguous-outcome reconciliation, bounded retry/observation, current-state evidence, data-versus-application recovery distinctions, and concise human updates. Document preparation, installation, target acceptance, recovery, and human authority remain distinct. No ontology validator or automatic release infrastructure is introduced.

## MIT notices

The inspected root licenses of the three pinned repositories use these MIT terms. Their copyright notices are preserved together.

MIT License

Copyright (c) 2026 Affaan Mustafa

Copyright (c) 2025 Jesse Vincent

Copyright (c) 2026 Matt Pocock

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
