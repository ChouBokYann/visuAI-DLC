"""Benchmark-only projection of declared YAML edges into Basic Memory wikilinks."""
import json
import shutil
from pathlib import Path

import yaml

from run_pilot import BM, ROOT, WORK, run


def main():
    destination = WORK / 'corpus-bm-linked'
    assert not destination.exists(), 'Preserve previous fixture'
    shutil.copytree(WORK / 'corpus', destination)
    edges = 0
    for path in destination.glob('*.md'):
        text = path.read_text(encoding='utf-8')
        metadata = yaml.safe_load(text.split('---', 2)[1])
        relations = metadata.get('visu', {}).get('relations', [])
        if relations:
            lines = []
            for relation in relations:
                assert relation['basis'] == 'declared', 'Do not promote inferred relationships'
                target = relation['target']
                assert (destination / (target + '.md')).is_file(), target
                lines.append(f'- {relation["predicate"]} [[{target}]]')
            path.write_text(text + '\n## Relations\n\n' + '\n'.join(lines) + '\n', encoding='utf-8')
            edges += len(lines)
    assert edges > 0
    result = run('bm-linked-register', [BM, 'project', 'add', 'visu-benchmark-linked', str(destination), '--local', '--no-wait'])
    assert result['exit_code'] == 0
    result = run('bm-linked-index', [BM, 'reindex', '--search', '--full', '--project', 'visu-benchmark-linked'])
    assert result['exit_code'] == 0
    (Path(__file__).parent / 'linked-fixture.json').write_text(json.dumps({
        'edges_projected': edges, 'source': '.bench-run/corpus',
        'purpose': 'Controlled compatibility probe; explicit declared edges only; not a production adapter.'
    }, indent=2) + '\n')


if __name__ == '__main__':
    main()
