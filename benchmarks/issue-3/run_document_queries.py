"""Run document workflows serially so resource measurements do not overlap."""
import sys
from pathlib import Path

from profile_run import profile
from project_fixture import project
from run_pilot import WORK

HERE = Path(__file__).parent


if __name__ == '__main__':
    project(WORK / 'corpus', WORK / 'score-small/graphify', 'graphify')
    cases = [
        ('graphify', '100', WORK / 'scale-100/graphify', 'feature-progress-view-0000', None),
        ('graphify', '5000', WORK / 'scale-5000/graphify', 'feature-progress-view-0000', None),
        ('bm', '100', WORK / 'scale-100/bm', 'feature-progress-view-0000', 'scale-100'),
        ('graphify', 'small', WORK / 'score-small/graphify', 'feature-progress-view', None),
        ('bm', 'small', WORK / 'corpus-bm-linked', 'feature-progress-view', 'visu-benchmark-linked'),
    ]
    for tool, size, root, feature, project_name in cases:
        name = f'{tool}-workflow-{size}'
        command = [sys.executable, str(HERE / 'workflow_probe.py'), tool, str(root), feature,
                   str(HERE / 'raw' / (name + '-responses.json'))]
        if project_name:
            command += ['--project', project_name]
        result = profile(name, command)
        print(name, 'PASS' if result['exit_code'] == 0 else 'FAILED; inspect raw output', flush=True)
