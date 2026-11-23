"""Unmask only after the independent rubric scores are saved."""
import json
from pathlib import Path
from statistics import mean

base = Path(__file__).resolve().parents[2] / "output/factorial"
key = json.loads((base / "assignment.json").read_text())
scores = json.loads((base / "blind/scores.json").read_text(encoding="utf-8-sig"))
assert set(key) == set(scores)
for metric, size in (("O", 4), ("P", 2)):
    cells = {}
    for ident, (task, feedback, critique) in key.items():
        values = scores[ident][metric]
        assert len(values) == size and all(x in (0, 1) for x in values)
        cells.setdefault((feedback, critique), []).append((task, sum(values)))
    assert all(len(group) == 3 for group in cells.values())
    m = {k: mean(v for _, v in group) for k, group in cells.items()}
    print(metric, cells)
    print("Feedback", (m[1, 0] + m[1, 1] - m[0, 0] - m[0, 1]) / 2)
    print("Critique", (m[0, 1] + m[1, 1] - m[0, 0] - m[1, 0]) / 2)
    print("Interaction", m[1, 1] - m[1, 0] - m[0, 1] + m[0, 0])
