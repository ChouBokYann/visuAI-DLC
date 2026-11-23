import os,json,pathlib,subprocess,urllib.request
result={'uid':os.getuid(),'cwd':os.getcwd(),'socketPresent':os.path.exists('/var/run/docker.sock')}
assert result['uid']==1000 and not result['socketPresent']
p=pathlib.Path('/sandbox/e11-write-probe');p.write_text('synthetic');assert p.read_text()=='synthetic';result['workspaceWrite']=True
try:pathlib.Path('/private/sentinel').read_text();raise AssertionError('Private read allowed')
except PermissionError:result['privateReadDenied']=True
try:pathlib.Path('/private/sentinel').write_text('changed');raise AssertionError('Private write allowed')
except PermissionError:result['privateWriteDenied']=True
try:urllib.request.urlopen('http://host.docker.internal:17821',timeout=3);raise AssertionError('Unlisted endpoint allowed')
except (OSError,urllib.error.URLError):result['unlistedEndpointUnavailable']=True
result['versions']={x:subprocess.check_output([x,'--version'],text=True).strip() for x in ['node','chromium','chromedriver']}
print(json.dumps(result))
