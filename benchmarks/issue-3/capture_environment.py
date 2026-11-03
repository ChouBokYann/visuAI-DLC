"""Record only benchmark hardware/container metadata, without user configuration."""
import json
import importlib.metadata
import platform
import subprocess
from pathlib import Path

import psutil

from run_pilot import WORK


if __name__ == '__main__':
    def docker(*arguments):
        return subprocess.check_output(['docker', *arguments], text=True).strip()

    result = {
        'platform': platform.platform(), 'python': platform.python_version(),
        'logical_cpus': psutil.cpu_count(), 'physical_cpus': psutil.cpu_count(logical=False),
        'host_ram_bytes': psutil.virtual_memory().total,
        'benchmark_packages': {name: importlib.metadata.version(name) for name in ['basic-memory', 'mcp', 'psutil', 'PyYAML']},
        'docker_cpu_memory_version': docker('info', '--format', '{{.NCPU}} {{.MemTotal}} {{.ServerVersion}}'),
        'container_identity': docker('inspect', '--format', '{{.Id}} {{.Image}}', 'visu-bench-issue3'),
        'container_cgroup': docker('exec', 'visu-bench-issue3', 'cat', '/sys/fs/cgroup/memory.current', '/sys/fs/cgroup/memory.peak', '/sys/fs/cgroup/cpu.stat'),
        'cbm_cache_du_kib': docker('exec', 'visu-bench-issue3', 'du', '-sk', '/tmp/cbm-cache'),
        'basic_memory_shared_database_bytes': (WORK / 'bm-config/memory.db').stat().st_size,
        'graphify_5000_graph_bytes': (WORK / 'scale-5000/graphify/graph.json').stat().st_size,
    }
    output = Path(__file__).parent / 'round3-environment.json'
    assert not output.exists(), 'Preserve observations'
    output.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
