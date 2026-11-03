"""Regenerate timing summaries from saved observations, excluding failed runs."""
import hashlib
import json
from pathlib import Path
import statistics

HERE = Path(__file__).parent


def main():
    manifest = json.loads((HERE / 'manifest.json').read_text())
    key_bytes = (HERE / 'answer-key.json').read_text(encoding='utf-8').encode('utf-8')
    assert hashlib.sha256(key_bytes).hexdigest() == manifest['answer_key_sha256']
    result = {}
    for tool in ('graphify', 'bm'):
        tracks = {}
        for track, prefix in [('documents', 'D'), ('code', 'C')]:
            records = [json.loads((HERE / 'raw' / f'{tool}-{prefix}{q}-{trial}.json').read_text())
                       for q in range(1, 4) for trial in range(3)]
            assert len(records) == 9 and all(r['exit_code'] == 0 for r in records)
            times = [r['seconds'] for r in records]
            tracks[track] = dict(n=9, median_seconds=statistics.median(times),
                                 min_seconds=min(times), max_seconds=max(times))
        for phase in ('index', 'refresh', 'freshness'):
            record = json.loads((HERE / 'raw' / f'{tool}-{phase}.json').read_text())
            assert record['exit_code'] == 0
            tracks[phase + '_seconds'] = record['seconds']
        result[tool] = tracks
    result['cbm'] = {'status': 'blocked before indexing; no performance or retrieval score'}
    (HERE / 'timings.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
