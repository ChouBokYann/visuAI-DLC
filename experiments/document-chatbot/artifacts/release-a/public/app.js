const $=id=>document.getElementById(id);
async function refresh(){try{const response=await fetch('/api/status');const data=await response.json();if(!response.ok)throw Error(data.error);$('status').textContent=`${data.documents.length} documents ready${data.skipped.length?` · ${data.skipped.length} skipped`:''}`;$('documents').replaceChildren(...data.documents.map(d=>{const li=document.createElement('li');li.textContent=d.name;return li;}));$('budget').textContent=`Trial allowance: ${data.turns} of ${data.limit} answer turns used.`;}catch(e){$('status').textContent='Documents unavailable';$('error').textContent=e.message;}}
$('refresh').addEventListener('click',()=>{$('error').textContent='';refresh();});
$('question').addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='Enter')$('chat').requestSubmit();});
$('chat').addEventListener('submit',async e=>{
 e.preventDefault();if($('send').disabled)return;const question=$('question').value.trim();if(!question)return;
 $('send').disabled=true;$('refresh').disabled=true;$('send').textContent='Reading…';$('error').textContent='';
 try{
  const response=await fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question})});const data=await response.json();if(!response.ok)throw Error(data.error);
  const article=document.createElement('article');article.className='message';const heading=document.createElement('h3');heading.textContent=question;const answer=document.createElement('div');answer.className='answer';answer.textContent=data.answer;article.append(heading,answer);
  for(const source of data.sources){const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=`[${source.citation}] ${source.name}`;const p=document.createElement('p');p.textContent=source.text;const link=document.createElement('a');link.href=source.url;link.target='_blank';link.rel='noopener';link.textContent='Open source record ↗';details.append(summary,p,link);article.append(details);}
  $('messages').append(article);$('question').value='';await refresh();$('question').focus();
 }catch(error){$('error').textContent=error.message;}finally{$('send').disabled=false;$('refresh').disabled=false;$('send').textContent='Ask ↗';}
});
refresh();
