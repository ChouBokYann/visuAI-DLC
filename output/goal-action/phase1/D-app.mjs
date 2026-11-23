const minutes = value => { const [h, m] = value.split(':').map(Number); return h * 60 + m; };

export function assess(workshop, preferences) {
  const reasons = [];
  let failed = false;
  let uncertain = false;
  if (minutes(workshop.start) < minutes(preferences.start) || minutes(workshop.end) > minutes(preferences.end)) {
    failed = true;
    reasons.push(`Outside your ${preferences.start}–${preferences.end} availability; the whole class must fit.`);
  }
  const missing = workshop.prerequisites.filter(id => !preferences.completed.includes(id));
  if (missing.length) { failed = true; reasons.push(`Missing prerequisites: ${missing.join(', ')}.`); }
  if (workshop.seats === null) { uncertain = true; reasons.push('Current seats unknown; ask the organiser to confirm.'); }
  else if (workshop.seats <= 0) { failed = true; reasons.push('No current seats.'); }
  if (preferences.stepFreeRequired) {
    if (workshop.stepFree === false) { failed = true; reasons.push('Step-free access is required but not available.'); }
    else if (workshop.stepFree === null) { uncertain = true; reasons.push('Step-free access is required but unconfirmed.'); }
  }
  return { state: failed ? 'unavailable' : uncertain ? 'needs-confirmation' : 'available', reasons };
}

if (typeof document !== 'undefined') {
  const summary = document.querySelector('#preference-summary');
  try {
    const response = await fetch('./source-data.json');
    if (!response.ok) throw new Error('Catalogue could not be loaded.');
    const { workshops, preferences } = await response.json();
    const form = document.querySelector('form');
    form.elements.start.value = preferences.start;
    form.elements.end.value = preferences.end;
    form.elements.completed.value = preferences.completed.join(', ');
    form.elements.stepFreeRequired.checked = preferences.stepFreeRequired;
    const labels = { available: 'Attendable', 'needs-confirmation': 'Confirm first', unavailable: 'Unavailable under your preferences' };
    const rank = { available: 0, 'needs-confirmation': 1, unavailable: 2 };
    const paragraph = text => { const p = document.createElement('p'); p.textContent = text; return p; };
    function render() {
      summary.textContent = `Available ${preferences.start}–${preferences.end}. Completed prerequisites: ${preferences.completed.join(', ') || 'none'}. Step-free access ${preferences.stepFreeRequired ? 'required' : 'not required'}.`;
      const main = document.querySelector('main');
      main.replaceChildren();
      const choices = workshops.map(workshop => ({ workshop, result: assess(workshop, preferences) }));
      choices.sort((a, b) => rank[a.result.state] - rank[b.result.state]);
      for (const { workshop: w, result } of choices) {
        const card = document.createElement('article');
        card.dataset.id = w.id;
        card.dataset.state = result.state;
        const title = document.createElement('h2'); title.textContent = w.name;
        const access = w.stepFree === null ? 'Step-free access unconfirmed' : w.stepFree ? 'Step-free access confirmed' : 'Not step-free';
        card.append(title, paragraph(`${w.start}–${w.end} · ${w.seats === null ? 'Seats unknown' : `${w.seats} current seat(s)`}`), paragraph(labels[result.state]), paragraph(`Prerequisites: ${w.prerequisites.join(', ') || 'none'}. ${access}.`));
        for (const reason of result.reasons) card.append(paragraph(reason));
        if (w.waitlist) card.append(paragraph('Waitlist available: request a future vacancy, not a current seat.'));
        const link = document.createElement('a');
        link.href = w.contact;
        link.textContent = w.seats === 0 && w.waitlist ? 'Ask organiser about the waitlist' : w.seats === null ? 'Ask organiser to confirm seats' : result.state === 'needs-confirmation' ? 'Ask organiser to confirm access' : 'Contact organiser';
        card.append(link);
        main.append(card);
      }
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (minutes(form.elements.end.value) <= minutes(form.elements.start.value)) {
        document.querySelector('#preference-error').textContent = 'End time must be after start time. Previous preferences still apply.';
        return;
      }
      document.querySelector('#preference-error').textContent = '';
      preferences.start = form.elements.start.value;
      preferences.end = form.elements.end.value;
      preferences.completed = form.elements.completed.value.split(',').map(value => value.trim()).filter(Boolean);
      preferences.stepFreeRequired = form.elements.stepFreeRequired.checked;
      render();
    });
    render();
  } catch (error) {
    summary.textContent = 'Unable to load the workshop catalogue. Reload to try again.';
  }
}
