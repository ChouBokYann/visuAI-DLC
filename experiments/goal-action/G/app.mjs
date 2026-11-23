export function assess(workshop, preferences) {
  const reasons = [];
  let blocked = false;
  if (workshop.start < preferences.start || workshop.end > preferences.end) {
    blocked = true;
    reasons.push(`The whole session must fit between ${preferences.start} and ${preferences.end}.`);
  }
  const missing = workshop.prerequisites.filter(id => !preferences.completed.includes(id));
  if (missing.length) {
    blocked = true;
    reasons.push(`Complete these required workshops first: ${missing.join(', ')}.`);
  }
  if (workshop.seats === 0) {
    blocked = true;
    reasons.push(workshop.waitlist ? 'Full. A waitlist is for a future vacancy, not a current place.' : 'Full: no current places.');
  } else if (workshop.seats == null) {
    reasons.push('Current places are unknown. Ask the organiser whether a place is available.');
  }
  if (preferences.stepFreeRequired) {
    if (workshop.stepFree === false) {
      blocked = true;
      reasons.push('Step-free access is required, but this workshop is not step-free.');
    } else if (workshop.stepFree == null) {
      reasons.push('Step-free access is unknown. Ask the organiser to confirm access.');
    }
  }
  return { state: blocked ? 'unavailable' : reasons.length ? 'needs-confirmation' : 'available', reasons };
}

if (typeof document !== 'undefined') {
  const element = (tag, text) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    return node;
  };
  try {
    const response = await fetch('./source-data.json');
    if (!response.ok) throw new Error('Catalogue could not be loaded.');
    const { workshops, preferences } = await response.json();
    document.querySelector('#preference-summary').textContent = `Available ${preferences.start}-${preferences.end}. Completed prerequisites: ${preferences.completed.length ? preferences.completed.join(', ') : 'none'}. Step-free access ${preferences.stepFreeRequired ? 'required' : 'not required'}.`;
    const results = workshops.map(workshop => ({ workshop, ...assess(workshop, preferences) }));
    const eligible = results.filter(result => result.state === 'available').sort((a, b) => a.workshop.start.localeCompare(b.workshop.start));
    const recommendation = document.querySelector('#recommendation');
    recommendation.textContent = eligible.length
      ? `Practical default: contact ${eligible[0].workshop.contact.replace(/^mailto:/, '')} about ${eligible[0].workshop.name} first, based only on its earliest eligible start time. Choose another eligible activity if you prefer; none is universally best.`
      : 'No workshop currently meets all your attendance conditions. Review the reasons and contact an organiser about any unknown details.';
    const groups = [
      ['eligible', 'Fits your attendance conditions'],
      ['confirm', 'Ask about availability or access'],
      ['waitlist', 'Waitlist: no current place'],
      ['unsuitable', 'Does not fit your attendance conditions']
    ];
    for (const [key, title] of groups) {
      const section = element('section');
      section.append(element('h2', title));
      const cards = element('div');
      cards.className = 'cards';
      for (const result of results) {
        const w = result.workshop;
        const group = result.state === 'available' ? 'eligible' : result.state === 'needs-confirmation' ? 'confirm' : w.seats === 0 && w.waitlist ? 'waitlist' : 'unsuitable';
        if (group !== key) continue;
        const card = element('article');
        card.dataset.id = w.id;
        card.dataset.state = result.state;
        card.append(element('h3', w.name), element('p', `${w.start}-${w.end} | Current places: ${w.seats == null ? 'unknown' : w.seats}`));
        card.append(element('p', `Step-free access: ${w.stepFree == null ? 'unknown' : w.stepFree ? 'confirmed' : 'not available'}.`));
        for (const reason of result.reasons) card.append(element('p', reason));
        const link = element('a', `${group === 'waitlist' ? 'Ask about the waitlist' : group === 'confirm' ? 'Ask the organiser to confirm' : 'Contact organiser'}: ${w.contact.replace(/^mailto:/, '')}`);
        if (/^mailto:[^\s]+@[^\s]+$/.test(w.contact)) link.href = w.contact;
        card.append(link);
        cards.append(card);
      }
      if (cards.children.length) {
        section.append(cards);
        document.querySelector('main').append(section);
      }
    }
  } catch (error) {
    document.querySelector('#preference-summary').textContent = 'Workshop information is unavailable. Please try reloading the catalogue.';
    document.querySelector('#recommendation').textContent = '';
  }
}

