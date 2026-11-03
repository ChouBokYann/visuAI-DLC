"""A fixed update/delete/rename/inference scenario for the disposable 100-note corpus."""
from pathlib import Path
import argparse

import yaml

from run_pilot import WORK


def edit(path, mutation):
    _, front, body = path.read_text(encoding='utf-8').split('---', 2)
    meta = yaml.safe_load(front)
    body = mutation(meta, body)
    path.write_text('---\n' + yaml.safe_dump(meta, sort_keys=False) + '---\n' + body, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--count', type=int, choices=[100, 5000], default=100)
    root = WORK / f'scale-{parser.parse_args().count}/canonical'
    assert not (root / 'renamed-feature.md').exists(), 'Scenario already applied'

    def change_feature(meta, body):
        meta['visu']['relations'][0]['target'] = 'capability-blockers-0001'
        return body

    def change_evidence(meta, body):
        meta['description'] = 'Failed synthetic assessment for the benchmark update.'
        meta['visu']['result'] = 'failed'
        meta['visu']['tested_revision'] = 'synthetic-benchmark-v2'
        return '\n# Result\n\nFailed in the synthetic benchmark update; no real participant was tested.\n'

    def add_inference(meta, body):
        meta['visu']['relations'].append({'predicate': 'depends_on', 'target': 'capability-blockers-0001',
                                        'basis': 'inferred', 'source': 'fixture'})
        return body

    edit(root / 'feature-progress-view-0000.md', change_feature)
    edit(root / 'evidence-walkthrough-0000.md', change_evidence)
    edit(root / 'capability-blockers-0000.md', add_inference)
    (root / 'feature-progress-view-0000.md').rename(root / 'renamed-feature.md')
    (root / 'decision-direct-first-0000.md').unlink()
    print('Applied edge replacement, failed evidence, inference, stable-ID rename and decision deletion.')
