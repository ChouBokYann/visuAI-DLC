import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys
app=Path(__file__).resolve().parent
result=subprocess.run([sys.executable,'-B','-m','unittest','discover','-s',str(app),'-p','test_rename.py','-v'],capture_output=True,text=True,encoding='utf-8')
(app/'test-results.txt').write_text(result.stdout+result.stderr,encoding='utf-8')
manifest={'command':'python -B app/run_checks.py','exit_code':result.returncode,'python':sys.version,'platform':platform.platform(),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [app/'rename.py',app/'test_rename.py']}}
(app/'evidence.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(result.stdout+result.stderr)
print(json.dumps(manifest,indent=2))
sys.exit(result.returncode)
