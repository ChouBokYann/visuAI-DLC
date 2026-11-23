"""Check trial inputs remain frozen; product files are intentionally mutable."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/workflow-transfer'
results = []
for manifest in ('frozen-inputs.json', 'canonical-before.json', 'handoff-criteria-hash.json'):
    entries = json.loads((OUT / manifest).read_text(encoding='utf-8-sig'))
    if isinstance(entries, dict):
        entries = [entries]
    for entry in entries:
        path = Path(entry['path'])
        if not path.is_absolute():
            path = ROOT / path
        if path.name == 'rename.py':
            continue
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        results.append({'path': str(path.relative_to(ROOT)), 'unchanged': actual.lower() == entry['sha256'].lower()})
for condition in ('current', 'refined'):
    for path in (ROOT / 'experiments/workflow-transfer' / condition).rglob('*'):
        if path.is_file() and path.suffix in ('.md', '.py'):
            try:
                path.read_text(encoding='utf-8')
                valid = True
            except UnicodeDecodeError:
                valid = False
            results.append({'path': str(path.relative_to(ROOT)), 'utf8': valid})
(OUT / 'input-audit.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
failed = [r for r in results if r.get('unchanged', r.get('utf8')) is False]
print(json.dumps({'checks': len(results), 'failed': failed}))
raise SystemExit(bool(failed))
