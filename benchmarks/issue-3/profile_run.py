"""Sample one benchmark process tree. RSS is sampled, CPU may miss short-lived children."""
import argparse
import json
import subprocess
import time
from pathlib import Path

import psutil

from run_pilot import ROOT, environment


def profile(name, command, timeout=600):
    output = Path(__file__).parent / 'raw' / (name + '.json')
    if output.exists():
        raise ValueError('Preserve previous measurement')
    stdout = output.with_suffix('.stdout.txt')
    stderr = output.with_suffix('.stderr.txt')
    peak, cpu, samples, timed_out = 0, {}, 0, False
    started = time.perf_counter()
    with stdout.open('w', encoding='utf-8') as out, stderr.open('w', encoding='utf-8') as err:
        proc = subprocess.Popen(command, cwd=ROOT, env=environment(), stdout=out, stderr=err)
        parent = psutil.Process(proc.pid)
        while proc.poll() is None:
            try:
                processes = [parent] + parent.children(recursive=True)
                rss = 0
                for child in processes:
                    try:
                        rss += child.memory_info().rss
                        times = child.cpu_times()
                        cpu[(child.pid, child.create_time())] = times.user + times.system
                    except (psutil.NoSuchProcess, psutil.AccessDenied):
                        pass
                peak = max(peak, rss)
                samples += 1
            except psutil.NoSuchProcess:
                pass
            if time.perf_counter() - started > timeout:
                timed_out = True
                for child in reversed(processes):
                    try:
                        child.kill()
                    except psutil.NoSuchProcess:
                        pass
                proc.wait()
                psutil.wait_procs(processes, timeout=3)
                break
            time.sleep(0.1)
    result = dict(command=command, exit_code=proc.returncode, seconds=time.perf_counter() - started,
                  sampled_peak_rss_mib=peak / 1024**2, sampled_cpu_seconds=sum(cpu.values()), samples=samples, timed_out=timed_out,
                  stdout=stdout.read_text(encoding='utf-8', errors='replace'), stderr=stderr.read_text(encoding='utf-8', errors='replace'))
    output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    # The JSON retains verbatim streams; display copies are unnecessary.
    for stream in (stdout, stderr):
        try:
            stream.unlink()
        except PermissionError:
            pass  # Windows can briefly retain a terminated child's inherited file handle.
    print(json.dumps({k: v for k, v in result.items() if k not in {'stdout', 'stderr', 'command'}}), flush=True)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('name')
    parser.add_argument('command', nargs=argparse.REMAINDER)
    args = parser.parse_args()
    raise SystemExit(profile(args.name, args.command)['exit_code'])
