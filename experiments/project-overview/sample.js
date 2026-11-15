(function (root) {
  const source = (path) => [{ title: 'Illustrative source', path: 'sample:' + path }];
  const data = {
    version: 1,
    project: {
      name: 'Cafe Finder',
      summary: 'Reuse a cafe directory so people can find places suited to working. Filtering is taking shape, but current behaviour and live provider access still need evidence.',
      snapshot: 'Illustrative snapshot · 15 November 2026',
      sample: true
    },
    records: [
      {id:'goal-find',kind:'goal',status:'active',title:'Find a cafe that fits the visit',summary:'Help people in Singapore find a suitable place without checking several disconnected listings.',reason:'The problem is deciding where to go, rather than creating another directory.',sources:source('problem.md')},
      {id:'requirement-policy',kind:'requirement',status:'active',title:'Keep unknown laptop policies visible',summary:'People can filter by area and laptop policy. Unknown means there is no confirmed policy; it must not silently become “not allowed”.',sources:source('requirements.md#REQ-02')},
      {id:'decision-build',kind:'decision',status:'superseded',title:'Build a new cafe directory',summary:'An earlier proposal included collecting and maintaining every cafe listing.',reason:'Reconsidered because maintaining the directory would duplicate existing work.',sources:source('decisions.md#DEC-01')},
      {id:'decision-reuse',kind:'decision',status:'accepted',title:'Use an existing directory first',summary:'Integrate existing listings and add only the missing working preferences.',reason:'This narrows maintenance effort and tests the actual user need sooner. Revisit if usable data or access is unavailable.',owner:'Product owner (sample)',sources:source('decisions.md#DEC-02')},
      {id:'change-import',kind:'change',status:'in-progress',revision:'import-r2',title:'Bring existing listings into search',summary:'The local import preserves cafe IDs and labels missing policy information as unknown.',next:'Check the live provider response and access conditions.',owner:'Integration agent (sample)',sources:source('delivery.md#WORK-01')},
      {id:'change-filter',kind:'change',status:'in-progress',revision:'filter-r3',title:'Filter by area and laptop policy',summary:'The filter now keeps unknown values visible. The last passing test predates this revision.',next:'Rerun the filter checks against filter-r3.',owner:'Feature agent (sample)',sources:source('delivery.md#WORK-02')},
      {id:'change-release',kind:'change',status:'blocked',revision:'release-r1',title:'Try the complete search journey',summary:'An integrated user journey is waiting on provider access and current filter evidence.',next:'Resolve the access question, then exercise the connected path.',sources:source('delivery.md#WORK-03')},
      {id:'blocker-access',kind:'blocker',status:'open',title:'Provider access is not confirmed',summary:'No live response has been inspected for the intended account. A fixture cannot establish entitlement or field availability.',next:'Project owner supplies an approved test account or chooses another provider.',owner:'Project owner (sample)',sources:source('research.md#OPEN-01')},
      {id:'evidence-import',kind:'evidence',status:'passed',testedRevision:'import-r2',method:'Synthetic local import fixture check',title:'Local importer handles missing fields',summary:'The fixture retained the cafe ID and represented the missing policy as unknown.',sources:source('checks.md#EVID-01')},
      {id:'evidence-filter',kind:'evidence',status:'passed',testedRevision:'filter-r2',method:'Synthetic filter regression check',title:'Previous filter checks passed',summary:'The recorded pass applies to filter-r2. It does not cover the current filter-r3 changes.',sources:source('checks.md#EVID-02')},
      {id:'evidence-live',kind:'evidence',status:'not-run',title:'Live provider response',summary:'No live check has run; account access is missing.',sources:source('checks.md#EVID-03')},
      {id:'evidence-contract',kind:'evidence',status:'failed',testedRevision:'import-r2',method:'Synthetic consumer/provider payload comparison',title:'Consumer expects a different policy field',summary:'The consumer expects laptopPolicy; the provider fixture uses laptop_policy. An explicit mapping is needed.',sources:source('checks.md#EVID-04')},
      {id:'evidence-journey',kind:'evidence',status:'pending',title:'Connected search journey',summary:'The acceptance observation is planned but no result is recorded.',sources:source('checks.md#EVID-05')}
    ],
    edges: [
      {from:'requirement-policy',relation:'addresses',to:'goal-find',basis:'stated'},
      {from:'change-import',relation:'aims_at',to:'requirement-policy',basis:'stated'},
      {from:'change-filter',relation:'aims_at',to:'requirement-policy',basis:'stated'},
      {from:'decision-reuse',relation:'decides',to:'change-import',basis:'stated'},
      {from:'decision-reuse',relation:'supersedes',to:'decision-build',basis:'stated'},
      {from:'change-filter',relation:'depends_on',to:'change-import',basis:'inferred'},
      {from:'change-release',relation:'depends_on',to:'change-filter',basis:'stated'},
      {from:'change-release',relation:'depends_on',to:'blocker-access',basis:'stated'},
      {from:'evidence-import',relation:'assesses',to:'change-import',basis:'stated'},
      {from:'evidence-filter',relation:'assesses',to:'change-filter',basis:'stated'},
      {from:'evidence-live',relation:'assesses',to:'change-import',basis:'stated'},
      {from:'evidence-contract',relation:'assesses',to:'change-import',basis:'stated'},
      {from:'evidence-journey',relation:'assesses',to:'change-release',basis:'stated'}
    ]
  };
  if (typeof module !== 'undefined') module.exports = data;
  else root.OverviewSample = data;
})(typeof window === 'undefined' ? globalThis : window);
