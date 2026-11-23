# Does a prior critique improve the workspace repair?

Four fresh Codex agents independently repaired the same fictional workspace finder. Every run received the original request, source facts, simulated user feedback, starter HTML, local browser tools and a four-minute allowance. Two also received the prior written critique. The critique references earlier artifacts which were outside the workers' allowed inputs. The frozen outcomes and scope are in the [protocol](../../output/critique-ablation/protocol.md).

| Run | Prior critique | Missing required outcomes | Phone height at 390 px | Visible words | Missing-photo notice |
|---|---|---:|---:|---:|---|
| 1 | Yes | 0 | 1453 | 97 | Each listing |
| 2 | Yes | 0 | 1709 | 101 | Each listing |
| 3 | No | 0 | 1355 | 104 | Shared |
| 4 | No | 0 | 1415 | 98 | Each listing |

The parent loaded every page in Chromium at 320, 390 and 1280 pixels and reviewed the rendered text against the source facts. Every result showed the nine price, hours and power entries with the correct values or uncertainties, grounded the venue descriptions, disclosed missing photography and removed the original unsupported promises and inert controls. The starter was 882 pixels wide at both phone sizes. Every repair fit both widths. No parent correction was supplied. [Browser observations](../../output/critique-ablation/observations.json)

The extra review produced no observed improvement on the predefined outcomes. Explicit feedback already named the comparison fields and photo problem. Both arms could reach the ceiling. The shorter pages in the control arm are descriptive only. Word counts overlap, and neither height nor word count measures how easily someone chooses a workspace.

One fixture, two runs per condition, shared model family and unblinded parent assessment limit attribution. The experiment isolates availability of the written critique conditional on detailed feedback. It leaves the effect of feedback itself, its interaction with critique and the contribution of browser verification unresolved. A follow-up should cross feedback present/absent with critique present/absent across several different fixtures, holding tools constant. Score original goals separately from preferences first revealed through feedback, and blind the scorer to condition before comparing outputs.
