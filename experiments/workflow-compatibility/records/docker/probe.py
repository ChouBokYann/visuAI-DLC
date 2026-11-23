import os, pathlib, json, socket, sys, errno
p=pathlib.Path('/sandbox/e09-marker')
checks={}
checks['nonroot']=os.getuid()==1000
skills=list(pathlib.Path('/sandbox/library/skills').rglob('SKILL.md'))
checks['skills_readable']=len(skills)>0 and all(x.read_text() for x in skills)
if sys.argv[1]=='initial':
    p.write_text('REQ-01: omitted note preserves prior value; null clears. EVIDENCE-FAIL: failed. correction_limit=2; do not deploy.')
checks['marker_preserved']='EVIDENCE-FAIL: failed' in p.read_text()
try:
    pathlib.Path('/private/sentinel').read_text()
    checks['private_read_denied']=False
except PermissionError as e:
    checks['private_read_denied']=e.errno==errno.EACCES
try:
    pathlib.Path('/private/sentinel').write_text('mutated')
    checks['private_write_denied']=False
except PermissionError as e:
    checks['private_write_denied']=e.errno==errno.EACCES
checks['no_docker_socket']=not pathlib.Path('/var/run/docker.sock').exists()
try:
    with socket.create_connection((sys.argv[2],18080),timeout=5) as s:
        s.sendall(b'GET / HTTP/1.0\r\n\r\n')
        checks['allowed_network']=b'200 OK' in s.recv(1024)
except OSError as e:
    checks['allowed_network']=False
    checks['allowed_error']=str(e)
try:
    with socket.create_connection((sys.argv[2],18081),timeout=5) as s:
        s.sendall(b'GET / HTTP/1.0\r\n\r\n')
        checks['denied_network']=b'200 OK' not in s.recv(1024)
except OSError:
    checks['denied_network']=True
report={'phase':sys.argv[1],'checks':checks,'skill_count':len(skills),'marker':p.read_text()}
print(json.dumps(report),flush=True)
assert all(v is True for v in checks.values()),report
