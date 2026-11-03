"""A separate, fixed 1,000-file code corpus for native code indexers."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from run_pilot import WORK

CORPUS = WORK / 'cbm-linux/code-scale'


def module(i):
    return (f'def blocked_{i:04d}(task, states):\n'
            '    return [name for name in task["dependencies"] if states.get(name) != "done"]\n\n'
            f'def ready_{i:04d}(task, states):\n'
            f'    return not blocked_{i:04d}(task, states)\n\n'
            f'def deploy_{i:04d}(task, states, evidence):\n'
            f'    return evidence == "verified" and ready_{i:04d}(task, states)\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('operation', choices=['generate', 'mutate'])
    args = parser.parse_args()
    if args.operation == 'generate':
        if CORPUS.exists():
            raise ValueError('Preserve existing code corpus')
        CORPUS.mkdir(parents=True)
        for i in range(1000):
            (CORPUS / f'unit_{i:04d}.py').write_text(module(i), encoding='utf-8')
        manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(CORPUS.glob('*.py'))}
        assert len(manifest) == 1000
        (Path(__file__).parent / 'code-scale-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
        shutil.copytree(CORPUS, WORK / 'code-scale-graphify')
    else:
        for root in (CORPUS, WORK / 'code-scale-graphify'):
            path = root / 'unit_0000.py'
            text = path.read_text(encoding='utf-8')
            assert '"verified"' in text and '"approved"' not in text
            path.write_text(text.replace('"verified"', '"approved"'), encoding='utf-8')
            (root / 'unit_0001.py').unlink()
            (root / 'unit_0002.py').rename(root / 'renamed_0002.py')
            (root / 'unit_1000.py').write_text(module(1000), encoding='utf-8')
    print(f'{args.operation}: {len(list(CORPUS.glob("*.py")))} Python files')
