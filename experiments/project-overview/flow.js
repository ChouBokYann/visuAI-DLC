(function () {
  'use strict';
  let outcomeId, snapshot;
  const $=id=>document.getElementById(id);
  function el(tag,text,cls) {
    const node=document.createElement(tag);
    if(text!==undefined)node.textContent=text;
    if(cls)node.className=cls;
    return node;
  }
  const phases=['ideation','planning','implementation','verification','deployment','maintenance'];
  function render(data,selected,choose) {
    const model=window.OverviewModel;
    if(snapshot!==data){outcomeId=undefined;snapshot=data;}
    const view=model.flowView(data,outcomeId);
    const current=data.records.find(r=>r.id===selected);
    $('outcome-title').textContent=view.outcome?.title||'Business intent not recorded';
    $('outcome-status').textContent=view.outcome?.kind==='outcome'?(view.outcome.status==='observed'?'Measurement reported':'Impact not measured'):'Measurement not recorded';
    $('outcome-select').replaceChildren();
    for(const outcome of view.outcomes){const option=el('option',outcome.title);option.value=outcome.id;$('outcome-select').append(option);}
    $('outcome-select').value=view.outcome?.id||'';
    $('outcome-select').hidden=view.outcomes.length<2;
    $('outcome-select').onchange=()=>{outcomeId=$('outcome-select').value;$('inspector').hidden=true;render(data,undefined,choose);};
    $('outcome-open').onclick=()=>{if(view.outcome)choose(view.outcome.id,true);};
    $('outcome-open').disabled=!view.outcome;
    $('phase-rail').replaceChildren();
    for(const phase of phases){
      const count=view.records.filter(r=>r.workflow?.phase===phase && r.status!=='superseded').length;
      const item=el('li',undefined,current?.workflow?.phase===phase?'phase selected':'phase');
      item.append(el('span',phase),el('small',count?count+' records':'No placement'));
      $('phase-rail').append(item);
    }
    const connected=new Set(selected?model.related(selected,data).map(r=>r.record.id):[]);
    for(const step of ['observe','orient','decide','act']) {
      const lane=$(step+'-nodes');lane.replaceChildren();
      const records=[...view.steps[step]].sort((a,b)=>Number(model.evidenceState(b,data)==='failed')-Number(model.evidenceState(a,data)==='failed'));
      const overflow=el('details',undefined,'lane-overflow');
      if(records.length>2)overflow.append(el('summary','Show '+(records.length-2)+' more'));
      for(const [index,record] of records.entries()) {
        const state=model.evidenceState(record,data);
        const button=el('button',undefined,'flow-node '+state+(selected===record.id?' selected':'')+(connected.has(record.id)?' connected':''));
        button.type='button';button.setAttribute('aria-pressed',String(selected===record.id));
        button.append(el('span',record.kind,'node-kind'),el('strong',record.title),el('span',state.replaceAll('-',' '),'node-state'));
        button.addEventListener('click',()=>choose(record.id,true));
        (index<2?lane:overflow).append(button);
      }
      if(records.length>2)lane.append(overflow);
      if(!records.length)lane.append(el('p','No records placed','lane-empty'));
    }
    $('placement-note').textContent=view.unplaced.length?view.unplaced.length+' records have no recorded OODA placement. Browse them below.':'OODA placement comes from authored records. Arrows show the method, not dependencies.';
    $('feedback-links').replaceChildren();
    for(const {decision,evidence} of view.feedback){
      const row=el('div',undefined,'feedback-item');
      const source=el('button',evidence.title);source.type='button';source.addEventListener('click',()=>choose(evidence.id,true));
      const target=el('button',decision.title);target.type='button';target.addEventListener('click',()=>choose(decision.id,true));
      row.append(source,el('span','prompted →'),target,el('span',decision.workflow.iteration,'cycle-label'));$('feedback-links').append(row);
    }
    if(!view.feedback.length)$('feedback-links').append(el('p','No feedback trigger recorded.','muted'));
    $('history-items').replaceChildren();
    for(const old of view.history){
      const replacement=data.edges.find(e=>e.relation==='supersedes'&&e.to===old.id);
      const next=data.records.find(r=>r.id===replacement?.from);
      const row=el('div',undefined,'history-item');
      const button=el('button',old.title);button.type='button';button.addEventListener('click',()=>choose(old.id,true));
      row.append(el('span','Previous'),button,el('span',next?'→ '+next.title:'Replacement outside this view'));$('history-items').append(row);
    }
    if(!view.history.length)$('history-items').append(el('p','No superseded decisions recorded.'));
    const checks=view.records.filter(r=>r.kind==='evidence'&&r.scope!=='business');
    const stale=checks.filter(r=>model.evidenceState(r,data)==='stale').length;
    const failed=checks.filter(r=>model.evidenceState(r,data)==='failed').length;
    $('evidence-readout').textContent=stale+' stale · '+failed+' failed';
    $('loop-context').textContent=current?.workflow?current.workflow.phase+' / '+current.workflow.iteration:'Select a node to locate its phase';
    $('scope-note').textContent=data.provenance&&!data.provenance.complete?'Partial snapshot: some connections are outside this view.':'One outcome at a time. Select a node to follow its recorded connections.';
  }
  window.OverviewFlow={render};
})();
