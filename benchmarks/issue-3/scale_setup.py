"""Prepare measured views and register/index Basic Memory at a requested fixture size."""
import argparse
import sys

from profile_run import profile
from run_pilot import BM, WORK


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('count', type=int, choices=[100, 5000])
    parser.add_argument('--views-exist', action='store_true')
    args = parser.parse_args()
    root = WORK / f'scale-{args.count}'
    if not args.views_exist:
        for tool in ('bm', 'graphify'):
            result = profile(f'{tool}-project-{args.count}', [sys.executable, 'benchmarks/issue-3/project_fixture.py',
                             'project', '--source', str(root / 'canonical'), '--destination', str(root / tool), '--tool', tool])
            assert result['exit_code'] == 0
    result = profile(f'bm-register-{args.count}', [BM, 'project', 'add', f'scale-{args.count}', str(root / 'bm'), '--local', '--no-wait'])
    assert result['exit_code'] == 0
    result = profile(f'bm-index-{args.count}', [BM, 'reindex', '--search', '--full', '--project', f'scale-{args.count}'])
    assert result['exit_code'] == 0
