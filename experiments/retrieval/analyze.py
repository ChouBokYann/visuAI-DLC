import json
from pathlib import Path

root = Path(__file__).resolve().parents[2] / "output/retrieval"
assignments = json.loads((root / "assignment.json").read_text())
scores = json.loads((root / "blind/scores.json").read_text(encoding="utf-8-sig"))
assert set(assignments) == set(scores)
rows = []
for ident, (task, pointer) in assignments.items():
    folder = root / ident
    assert (folder / "index.html").read_bytes() == (root / "blind" / (ident + ".html")).read_bytes()
    reads = (folder / "reads.log").read_text().splitlines()
    rows.append(dict(task=task, pointer=pointer, id=ident, calls=reads,
                     retrieved="03" in reads, original=sum(scores[ident]["O"]),
                     preferences=sum(scores[ident]["P"])))
(root / "results.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
for arm in (0, 1):
    group = [r for r in rows if r["pointer"] == arm]
    print(arm, sum(len(r["calls"]) for r in group), sum(r["retrieved"] for r in group),
          sum(r["original"] for r in group), sum(r["preferences"] for r in group))
