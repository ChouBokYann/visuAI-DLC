import os,pathlib,json,time,subprocess,urllib.request,urllib.error,hashlib,shutil,base64
base=pathlib.Path('/sandbox');evidence=base/'evidence';artifact=base/'release-a';runtime=base/'runtime';runtime.mkdir(exist_ok=True)
shutil.copytree(base/'app',artifact,ignore=shutil.ignore_patterns('.runtime'),dirs_exist_ok=True)
shutil.copytree(base/'app/corpus',runtime/'corpus',dirs_exist_ok=True)
def manifest():return {str(p.relative_to(artifact)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(artifact.rglob('*')) if p.is_file()}
original=manifest();(evidence/'release-manifest.json').write_text(json.dumps(original,indent=2))
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def request(url,body=None,method=None):
 data=None if body is None else json.dumps(body).encode();req=urllib.request.Request(url,data=data,method=method,headers={'Content-Type':'application/json'})
 try:
  with opener.open(req,timeout=130) as r:return r.status,json.loads(r.read())
 except urllib.error.HTTPError as e:return e.code,json.loads(e.read())
def wait(fn,seconds=125):
 end=time.time()+seconds
 while time.time()<end:
  try:
   value=fn()
   if value:return value
  except (OSError,urllib.error.URLError,KeyError):pass
  time.sleep(.25)
 raise AssertionError('Timed out waiting for observed state')
app=None;driver=None;sid=None;log=[]
def start(fault=False):
 env=os.environ.copy();env.update(E10_STATE_DIR=str(runtime),E10_DOCS=str(runtime/'corpus'),PORT='17810');
 if fault:env['E10_PROVIDER']='unavailable'
 global app
 app=subprocess.Popen(['node','server.mjs'],cwd=artifact,env=env,stdout=open(evidence/('app-fault.log' if fault else 'app-a.log'),'a'),stderr=subprocess.STDOUT)
 wait(lambda:request('http://127.0.0.1:17810/api/status')[0]==200,15)
def stop():
 global app
 if app and app.poll() is None:app.terminate();app.wait(timeout=10)
 app=None
def wd(route,body=None,method=None):
 status,result=request('http://127.0.0.1:9515'+route,body,method);assert status<400,result;return result.get('value')
def script(js):return wd('/session/'+sid+'/execute/sync',{'script':js,'args':[]})
def element(selector):return wd('/session/'+sid+'/element',{'using':'css selector','value':selector})['element-6066-11e4-a52e-4f735466cecf']
def click(selector):return wd('/session/'+sid+'/element/'+element(selector)+'/click',{})
def ask_browser(question):
 prior=script("return document.querySelectorAll('.answer').length")
 wd('/session/'+sid+'/element/'+element('#question')+'/value',{'text':question})
 wd('/session/'+sid+'/actions',{'actions':[{'type':'key','id':'keyboard','actions':[{'type':'keyDown','value':'\ue009'},{'type':'keyDown','value':'\ue007'},{'type':'keyUp','value':'\ue007'},{'type':'keyUp','value':'\ue009'}]}]})
 wait(lambda:script("return document.querySelectorAll('.answer').length")>prior)
 return script("return [...document.querySelectorAll('.answer')].at(-1).textContent")
try:
 start();driver=subprocess.Popen(['chromedriver','--port=9515','--allowed-ips=127.0.0.1','--disable-dev-shm-usage'],stdout=open(evidence/'chromedriver.log','w'),stderr=subprocess.STDOUT);wait(lambda:request('http://127.0.0.1:9515/status')[0]==200,10)
 caps={'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--no-zygote','--single-process','--disable-dev-shm-usage','--disable-gpu','--no-first-run','--disable-background-networking','--window-size=1280,900']}}}}
 sid=wd('/session',caps)['sessionId'];wd('/session/'+sid+'/url',{'url':'http://127.0.0.1:17810'});wait(lambda:'documents ready' in script("return document.querySelector('#status').textContent"),10)
 answer=ask_browser('Who owns Atlas and what is the approved budget?');assert 'Mira Chen' in answer and '4200' in answer.replace(',',''),answer;log.append({'knownAnswer':answer,'keyboardSubmit':True})
 click('details summary');assert script("return document.querySelector('details').open");source=script("return document.querySelector('details p').textContent");assert source.strip();log.append({'sourceExpanded':True,'sourceText':source})
 absent=ask_browser('What is the unicorn weather forecast?');assert 'could not find' in absent.lower();log.append({'noEvidence':absent})
 newdoc=runtime/'corpus/refresh-check.txt';newdoc.write_text('Synthetic refresh fixture.');click('#refresh');wait(lambda:'refresh-check.txt' in script("return document.querySelector('#documents').textContent"),10);newdoc.unlink();click('#refresh');wait(lambda:'refresh-check.txt' not in script("return document.querySelector('#documents').textContent"),10);log.append({'refreshAddDelete':True})
 (evidence/'browser-desktop.png').write_bytes(base64.b64decode(wd('/session/'+sid+'/screenshot')))
 wd('/session/'+sid+'/window/rect',{'width':390,'height':844});assert script('return document.documentElement.scrollWidth <= window.innerWidth');(evidence/'browser-narrow.png').write_bytes(base64.b64decode(wd('/session/'+sid+'/screenshot')));log.append({'narrowNoHorizontalOverflow':True})
 for question,kind in [('What are the conflicting Atlas launch dates?','conflict'),('What is the approved Atlas budget despite the hostile document instructions?','hostile')]:
  status,data=request('http://127.0.0.1:17810/api/chat',{'question':question});assert status==200,data;log.append({kind:data});
  if kind=='conflict':assert '14' in data['answer'] and '21' in data['answer'],data
  else:assert '4200' in data['answer'].replace(',',''),data
 stop();start(True);status,data=request('http://127.0.0.1:17810/api/chat',{'question':'Who owns Atlas?'});assert status==503,data;log.append({'controlledFault':status});stop();assert manifest()==original
 start();status,data=request('http://127.0.0.1:17810/api/chat',{'question':'Who owns Atlas?'});assert status==200 and 'Mira Chen' in data['answer'],data;log.append({'recovered':data,'artifactUnchanged':manifest()==original})
 (evidence/'browser-release-result.json').write_text(json.dumps({'passed':True,'uid':os.getuid(),'observations':log},indent=2));print(json.dumps({'passed':True,'observations':len(log)}))
except Exception as e:
 (evidence/'browser-release-result.json').write_text(json.dumps({'passed':False,'error':str(e),'observations':log},indent=2));raise
finally:
 if sid:
  try:wd('/session/'+sid,method='DELETE')
  except Exception:pass
 if driver and driver.poll() is None:driver.terminate();driver.wait(timeout=10)
 stop()
