import pathlib,subprocess,urllib.request,json,time,base64,shutil,os
root=pathlib.Path('/sandbox/candidate');evidence=pathlib.Path('/sandbox/validation');shutil.copyfile('/sandbox/mock-app.mjs',root/'mock-app.mjs')
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def req(route,body=None,method=None):
 data=None if body is None else json.dumps(body).encode()
 with opener.open(urllib.request.Request('http://127.0.0.1:9515'+route,data=data,method=method,headers={'Content-Type':'application/json'}),timeout=60) as r:return json.loads(r.read()).get('value')
def wait(fn):
 end=time.time()+15
 while time.time()<end:
  try:
   if fn():return
  except OSError:pass
  time.sleep(.1)
 raise AssertionError('Expected browser state did not arrive')
app=subprocess.Popen(['node','mock-app.mjs'],cwd=root,stdout=open(evidence/'mock-app.log','w'),stderr=subprocess.STDOUT)
driver=subprocess.Popen(['chromedriver','--port=9515','--allowed-ips=127.0.0.1','--disable-dev-shm-usage'],stdout=open(evidence/'driver.log','w'),stderr=subprocess.STDOUT);sid=None
try:
 wait(lambda:req('/status'))
 sid=req('/session',{'capabilities':{'alwaysMatch':{'browserName':'chrome','goog:chromeOptions':{'binary':'/usr/bin/chromium','args':['--headless','--no-sandbox','--single-process','--no-zygote','--disable-dev-shm-usage','--disable-gpu','--disable-background-networking','--window-size=1280,900']}}}})['sessionId']
 prefix='/session/'+sid
 def js(code):return req(prefix+'/execute/sync',{'script':code,'args':[]})
 def element(selector):return req(prefix+'/element',{'using':'css selector','value':selector})['element-6066-11e4-a52e-4f735466cecf']
 req(prefix+'/url',{'url':'http://127.0.0.1:17810'});wait(lambda:'documents ready' in js("return document.querySelector('#status').textContent"))
 assert js("return document.getElementById('budget')===null && !document.body.innerText.includes('Trial allowance:')")
 req(prefix+'/element/'+element('#question')+'/value',{'text':'Who owns Atlas?'})
 req(prefix+'/actions',{'actions':[{'type':'key','id':'keyboard','actions':[{'type':'keyDown','value':'\ue009'},{'type':'keyDown','value':'\ue007'},{'type':'keyUp','value':'\ue007'},{'type':'keyUp','value':'\ue009'}]}]})
 wait(lambda:js("return document.querySelectorAll('.answer').length===1"));assert 'Synthetic mock:' in js("return document.querySelector('.answer').textContent")
 req(prefix+'/element/'+element('details summary')+'/click',{});assert js("return document.querySelector('details').open")
 req(prefix+'/element/'+element('#refresh')+'/click',{});wait(lambda:'documents ready' in js("return document.querySelector('#status').textContent"));assert js("return document.querySelector('#error').textContent==='' && !document.querySelector('#send').disabled")
 js('window.scrollTo(0,0);return true');(evidence/'candidate-desktop.png').write_bytes(base64.b64decode(req(prefix+'/screenshot')))
 req(prefix+'/window/rect',{'width':390,'height':844});assert js('return document.documentElement.scrollWidth<=window.innerWidth');js('window.scrollTo(0,0);return true');(evidence/'candidate-narrow.png').write_bytes(base64.b64decode(req(prefix+'/screenshot')))
 (evidence/'browser-result.json').write_text(json.dumps({'passed':True,'uid':os.getuid(),'mockInference':True,'counterAbsent':True,'keyboardSubmit':True,'sourceExpansion':True,'refresh':True,'narrowNoOverflow':True,'errorsVisible':False},indent=2));print('PASS: candidate browser, mock inference only')
finally:
 if sid:
  try:req('/session/'+sid,method='DELETE')
  except Exception:pass
 for child in [driver,app]:
  if child.poll() is None:child.terminate();child.wait(timeout=10)
 (root/'mock-app.mjs').unlink(missing_ok=True)
