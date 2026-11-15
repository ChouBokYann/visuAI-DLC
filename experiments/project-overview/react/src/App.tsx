import { useEffect, useMemo, useRef, useState } from 'react';
import { Background, Handle, MarkerType, Position, ReactFlow, useReactFlow, type Node, type NodeProps } from '@xyflow/react';
import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon, EnterFullScreenIcon, Link2Icon, MinusIcon, MoonIcon, PlusIcon, SunIcon, TargetIcon, UploadIcon } from '@radix-ui/react-icons';
import { connections, focusHash, graph, linkStyle, neighbourhood, phases, readFocus, type RecordItem, type Snapshot, type View } from './graph';
import { evidenceState, exampleWorktrees, samples, validateSnapshot } from './data';
import { storyGraph, validateBundle, validateStory, worktreeChanges, type Story, type WorktreeBundle } from './session';

type FlowNode = Node<{ record: RecordItem; state: string; focused: boolean; current: boolean; context: boolean; disconnected: boolean }, 'record'>;
function RecordNode({ data }: NodeProps<FlowNode>) {
  return <div className={`record ${data.focused ? 'focused' : ''} ${data.context ? 'context-record' : ''}`} data-status={data.state} data-phase={data.record.workflow?.phase || 'unplaced'}>
    <Handle type="target" position={Position.Left} />
    <div className="node-top"><span className="phase-label">{data.record.workflow?.phase || 'Unplaced'}{data.context ? ' / context' : ''}</span><span>{data.record.workflow?.step || data.record.kind}</span></div>
    <strong>{data.record.title}</strong>
    <div className="node-bottom"><span className={`state state-${data.state}`}>{data.state}</span>{data.disconnected ? <small>No recorded links</small> : <ArrowRightIcon />}</div>
    <Handle type="source" position={Position.Right} />
  </div>;
}
const nodeTypes = { record: RecordNode };
const title = (text: string) => text[0].toUpperCase() + text.slice(1);
const duration = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250;
function initialTheme(): 'light' | 'dark' {
  try { const saved = localStorage.getItem('visuai-theme'); if (saved === 'light' || saved === 'dark') return saved; } catch { /* Storage can be disabled. */ }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export default function App() {
  const [snapshot, setSnapshot] = useState<Snapshot>(() => validateSnapshot(samples.b));
  const [view, setView] = useState<View>('project');
  const [selected, setSelected] = useState<string>();
  const [agentFocus, setAgentFocus] = useState<string>();
  const [chat, setChat] = useState<string>();
  const [inspector, setInspector] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [zoom, setZoom] = useState(1);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bundle, setBundle] = useState<WorktreeBundle>();
  const [worktree, setWorktree] = useState('main');
  const [story, setStory] = useState<Story>();
  const [showProject, setShowProject] = useState(false);
  const storyMode = !!story && !showProject;
  const [following, setFollowing] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const flow = useReactFlow<FlowNode>();
  const diagram = useMemo(() => {
    return storyMode && story ? storyGraph(snapshot, story) : graph(snapshot, view);
  }, [snapshot, view, story, storyMode]);
  const changes = useMemo(() => bundle ? worktreeChanges(bundle.main.snapshot, snapshot) : [], [bundle, snapshot]);
  const activeWorktree = bundle && [bundle.main, ...bundle.worktrees].find(w => w.id === worktree);
  const allLinks = useMemo(() => connections(snapshot), [snapshot]);
  const neighbours = useMemo(() => selected ? neighbourhood(selected, diagram.links) : new Set<string>(), [selected, diagram]);
  const record = snapshot.records.find(r => r.id === selected);
  const outcome = snapshot.records.find(r => r.kind === 'outcome' || r.kind === 'goal');
  const focused = !storyMode && !!selected && zoom >= 0.65;
  const nodes: FlowNode[] = [...diagram.records, ...diagram.context].map(r => ({ id: r.id, type: 'record', position: diagram.positions.get(r.id)!,
    data: { record: r, state: evidenceState(r, snapshot), focused: r.id === selected, current: r.id === agentFocus, context: diagram.context.includes(r), disconnected: !allLinks.some(e => e.source === r.id || e.target === r.id) },
    className: focused && !neighbours.has(r.id) ? 'distant' : '',
    ariaLabel: `${r.title}, ${r.status}. Open summary.`,
    ariaRole: 'button',
  }));
  const edges = diagram.links.map(e => {
    const visual = linkStyle(e);
    const label = e.label + (e.inferred ? ' (inferred)' : '');
    return { ...e, type: 'smoothstep', className: `link-${visual.kind}`,
      ariaLabel: `${e.source} ${label} ${e.target}`,
      label: e.label.startsWith('Story:') || selected && (e.source === selected || e.target === selected) ? label : undefined,
      markerEnd: { type: e.inferred ? MarkerType.Arrow : MarkerType.ArrowClosed, color: visual.color },
      style: { stroke: visual.color, strokeWidth: visual.kind === 'prompt' ? 2 : 1.5, strokeDasharray: visual.dash, strokeLinecap: 'round' as const, opacity: focused && !(e.source === selected || e.target === selected) ? 0.15 : 1 },
    };
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('visuai-theme', theme); } catch { /* Theme still applies for this visit. */ }
  }, [theme]);
  useEffect(() => { setStory(undefined); setFollowing(false); }, [snapshot]);
  useEffect(() => {
    if (!following) return;
    let stopped = false, sequence = 0;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      try {
        const response = await fetch('./agent-story.json', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('No agent story published yet.');
        const body = await response.text();
        if (body.length > 2 * 1024 * 1024) throw new Error('Story exceeds 2 MiB.');
        const next = validateStory(JSON.parse(body), snapshot);
        if (!stopped && next.sequence > sequence) {
          sequence = next.sequence; setStory(next); setShowProject(false); setView('project'); setSelected(next.focus || next.route[0]); setInspector(false); setNotice('Agent answer updated'); setError('');
        }
      } catch (e) { if (!stopped) setError(e instanceof SyntaxError ? 'No valid agent story published yet.' : (e as Error).message); }
      finally { if (!stopped) timer = setTimeout(poll, 1500); }
    }
    void poll();
    return () => { stopped = true; controller.abort(); clearTimeout(timer); };
  }, [following, snapshot]);
  useEffect(() => {
    const navigate = () => {
      try {
        const focus = readFocus(location.hash, snapshot);
        if (focus) { setView(focus.view); setSelected(focus.record); setInspector(!!focus.record); setChat(focus.chat); setAgentFocus(focus.chat ? focus.record : undefined); setError(''); }
      } catch (e) { setError((e as Error).message); }
    };
    navigate(); window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, [snapshot]);
  useEffect(() => {
    if (!ready || !diagram.records.length) return;
    const fit = () => {
      const position = selected && diagram.positions.get(selected);
      if (storyMode && innerWidth >= 640) void flow.fitView({ padding: 0.18, maxZoom: 1, duration: duration() });
      else if (position) void flow.setCenter(position.x + 115, position.y + 61, { zoom: innerWidth < 640 ? 0.8 : 0.95, duration: duration() });
      else void flow.fitView({ padding: 0.18, maxZoom: 0.95, duration: duration() });
    };
    let timer = setTimeout(fit, 100);
    const resize = () => { clearTimeout(timer); timer = setTimeout(fit, 150); };
    window.addEventListener('resize', resize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', resize); };
  }, [diagram, selected, inspector, ready, flow, storyMode]);
  useEffect(() => {
    if (inspector) { heading.current?.focus(); return; }
    if (selected) {
      const timer = setTimeout(() => (document.querySelector(`.react-flow__node[data-id="${CSS.escape(selected)}"]`) as HTMLElement)?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [inspector, selected]);
  function navigate(view: View, id?: string, details = false) {
    if (view !== 'project' || id && story && !story.route.includes(id)) setShowProject(true);
    if (id && view !== 'project' && diagram.context.some(r => r.id === id)) view = 'project';
    setView(view); setSelected(id); setInspector(details); setError('');
    history.replaceState(null, '', focusHash(snapshot, view, id, chat));
  }
  async function importFile(file?: File) {
    if (!file) return;
    setLoading(true); setError('');
    try {
      if (file.size > 16 * 1024 * 1024) throw new Error('Import exceeds 16 MiB. Export a smaller project scope.');
      const raw = JSON.parse(await file.text());
      const nextBundle = raw?.kind === 'worktrees' ? validateBundle(raw, validateSnapshot) : undefined;
      if (!nextBundle && file.size > 2 * 1024 * 1024) throw new Error('Snapshot exceeds 2 MiB.');
      const next = nextBundle ? nextBundle.main.snapshot : validateSnapshot(raw);
      history.replaceState(null, '', location.pathname + location.search);
      setBundle(nextBundle); setWorktree(nextBundle?.main.id || 'main'); setSnapshot(next); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); if (input.current) input.current.value = ''; }
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(location.origin + location.pathname + focusHash(snapshot, view, selected, chat)); setNotice('Focus link copied'); }
    catch { setError('Clipboard unavailable. Copy the address from your browser.'); }
  }
  const previous = allLinks.filter(e => e.target === selected);
  const next = allLinks.filter(e => e.source === selected);
  return <div className="workspace">
    <header className="topbar"><a className="brand" href="#" onClick={e => { e.preventDefault(); navigate('project'); }}>visu<span>AI</span><span className="brand-divider">/</span></a>
      <span className="project-name">{snapshot.project.name}</span>
      {snapshot.project.sample && <span className="sample-label">Sample</span>}
      <div className="top-actions">{bundle && <><label className="sr-only" htmlFor="worktree">Worktree</label><select id="worktree" value={worktree} onChange={e => {
        const next = [bundle.main, ...bundle.worktrees].find(w => w.id === e.target.value)!;
        history.replaceState(null, '', location.pathname); setWorktree(next.id); setSnapshot(next.snapshot); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined);
      }}>{[bundle.main, ...bundle.worktrees].map(w => <option value={w.id} key={w.id}>{w.id === bundle.main.id ? 'Main' : w.branch}</option>)}</select></>}
      <button className="follow-button" aria-pressed={following} onClick={() => setFollowing(!following)}>{following ? 'Following agent' : 'Follow agent'}</button>
      {story && <button className="follow-button" onClick={() => { setFollowing(false); setStory(undefined); }}>Clear story</button>}
      <label className="sr-only" htmlFor="example">Example snapshot</label><select id="example" value={bundle === exampleWorktrees ? 'worktrees' : snapshot === samples.a ? 'a' : snapshot === samples.b ? 'b' : 'import'} onChange={e => {
        if (e.target.value === 'worktrees') {
          history.replaceState(null, '', location.pathname); setBundle(exampleWorktrees); setWorktree('amenities'); setSnapshot(validateSnapshot(samples.b)); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined); return;
        }
        setBundle(undefined);
        history.replaceState(null, '', location.pathname); setSnapshot(validateSnapshot(samples[e.target.value as 'a' | 'b'])); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined);
      }}><option value="a">First direction</option><option value="b">Revised direction</option><option value="worktrees">Worktree example</option>{snapshot !== samples.a && snapshot !== samples.b && <option value="import" disabled>Imported project</option>}</select>
        <button className="icon-button" title="Import snapshot" aria-label="Import snapshot" onClick={() => input.current?.click()} disabled={loading}><UploadIcon /></button>
        <button className="icon-button" title={theme === 'dark' ? 'Light mode' : 'Dark mode'} aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
        <input ref={input} type="file" accept=".json,application/json" hidden onChange={e => void importFile(e.target.files?.[0])} />
      </div>
    </header>
    <nav className="lifecycle" aria-label="Product lifecycle">
      <button className={!storyMode && view === 'project' ? 'active' : ''} aria-pressed={!storyMode && view === 'project'} onClick={() => { setShowProject(true); navigate('project'); }}>Project</button><span className="nav-divider" />
      {phases.map((phase, i) => <button key={phase} data-phase={phase} className={view === phase && !storyMode ? 'active' : ''} aria-pressed={view === phase && !storyMode} onClick={() => navigate(phase)}><span className="phase-number">0{i + 1}</span>{title(phase)}<span className="phase-count">{snapshot.records.filter(r => r.workflow?.phase === phase).length}</span></button>)}
      {snapshot.records.some(r => !r.workflow) && <button aria-pressed={view === 'unplaced'} onClick={() => navigate('unplaced')}>Unplaced</button>}
    </nav>
    {story && <section className="story-answer" aria-label="Answer to your question">
      <div><h2>{story.question || 'Agent walkthrough'}</h2><p>{story.answer || 'This earlier event has no question-specific explanation. Its recorded route is shown below.'}</p></div>
      <button onClick={() => { setShowProject(storyMode); setView('project'); setInspector(false); if (!storyMode) setSelected(story.focus || story.route[0]); else setSelected(undefined); }}>{storyMode ? 'Project context' : 'Back to answer'}</button>
    </section>}
    {error && <div className="message error" role="alert">{error}<button aria-label="Dismiss error" onClick={() => setError('')}><Cross2Icon /></button></div>}
    {snapshot.provenance?.complete === false && <div className="message">Partial snapshot &middot; {snapshot.provenance.unresolved.length} unresolved links</div>}
    {bundle?.omitted.length ? <div className="message">{bundle.omitted.length} worktrees omitted: {bundle.omitted.join('; ')}</div> : null}
    <div className="work-area"><main className="canvas" aria-label="Project decision flow" onKeyDownCapture={event => {
      const node = (event.target as HTMLElement).closest<HTMLElement>('.react-flow__node');
      if (node?.dataset.id && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); event.stopPropagation(); navigate(view, node.dataset.id, true); }
    }}>
      <div className="canvas-heading"><div className="eyebrow">{storyMode ? 'Answer path' : view === 'project' ? 'Business aim' : `Project / ${title(view)}`}</div><h1>{storyMode ? `${diagram.records.length} relevant steps` : view === 'project' ? outcome?.title || snapshot.project.name : title(view)}</h1>{!storyMode && <p>{diagram.records.length} records <span>&middot;</span> {view === 'project' ? 'Grouped by lifecycle phase' : 'Recorded in this stage'}</p>}</div>
      {storyMode && story?.steps && <div className="story-reason" role="status"><span>{Math.max(0, story.route.indexOf(selected || '')) + 1} / {story.route.length}</span><p>{story.steps.find(step => step.record === selected)?.reason || story.steps[0]?.reason}</p></div>}
      {activeWorktree && <details className="worktree-impact"><summary>{changes.length} changes vs main <span> / {activeWorktree.dirty ? 'Uncommitted work' : activeWorktree.integrated ? 'Included in main' : 'Not merged'}</span></summary><div>
        <p>Recorded contribution, not measured business impact.</p>
        {changes.length === 0 && <p>No record differences.</p>}
        {changes.map(c => <button key={c.id} disabled={c.change === 'removed'} onClick={() => navigate('project', c.id, true)}><span>{c.change}: {c.title}</span><small>{c.goals.length ? c.goals.map(id => bundle?.main.snapshot.records.find(r => r.id === id)?.title).join(', ') : 'No link to shared outcome'}</small></button>)}
      </div></details>}
        <ReactFlow<FlowNode> nodes={nodes} edges={edges} nodeTypes={nodeTypes} colorMode={theme} onInit={() => setReady(true)} onMoveEnd={(_, viewport) => setZoom(viewport.zoom)}
          onNodeClick={(_, node) => navigate(view, node.id, true)}
          onPaneClick={() => setInspector(false)} nodesDraggable={false} nodesConnectable={false} edgesFocusable={false} minZoom={0.15} maxZoom={1.8} deleteKeyCode={null}>
          <Background gap={24} size={1} color="var(--grid)" />
        </ReactFlow>
      {loading ? <div className="empty" role="status">Loading snapshot...</div> : !diagram.records.length && <div className="empty"><span className="empty-mark">&mdash;</span><h2>No records yet</h2><p>This stage will fill as work is recorded.</p><button onClick={() => navigate('project')}>Back to project <ArrowRightIcon /></button></div>}
      <details className="flow-key"><summary>Key</summary><div className="key-content">
        <span><i className="key-line" />Direction</span><span><i className="key-line prompt" />Prompted</span><span><i className="key-line check" />Checked</span><span><i className="key-line revision" />Revised</span>
        <p>Dashed nodes: cross-stage context. Story-labelled links: agent narrative.</p>
        <p>Node colours match lifecycle phases above. Status colours describe evidence, not phases.</p>
        <p>Open arrowheads: inferred links.</p>
        <span className="state state-passed">Passed evidence</span><span className="state state-stale">Needs checking</span><span className="state state-failed">Failed or blocked</span>
      </div></details>
      <div className="canvas-footer"><span className="chat-status"><span className={chat ? 'status-dot connected' : 'status-dot'} />{chat ? 'Chat-linked focus' : 'Explore the flow'}</span><span className="gesture-hint">Drag to pan &middot; Scroll to zoom</span></div>
      <div className="canvas-tools" aria-label="Flow controls">
        <button aria-label="Zoom out" title="Zoom out" onClick={() => void flow.zoomOut({ duration: duration() })}><MinusIcon /></button><span className="zoom-level">{Math.round(zoom * 100)}%</span><button aria-label="Zoom in" title="Zoom in" onClick={() => void flow.zoomIn({ duration: duration() })}><PlusIcon /></button><span className="tool-divider" />
        <button aria-label="Fit stage" title="Fit stage" onClick={() => { setSelected(undefined); setInspector(false); void flow.fitView({ padding: 0.3, duration: duration() }); }}><EnterFullScreenIcon /></button>
        {agentFocus && <button aria-label="Return to chat focus" title="Return to chat focus" onClick={() => navigate('project', agentFocus, true)}><TargetIcon /></button>}
        {storyMode && story?.route.length ? <><span className="tool-divider" /><button aria-label="Previous story node" disabled={story.route.indexOf(selected || '') <= 0} onClick={() => navigate('project', story.route[story.route.indexOf(selected || '') - 1])}><ArrowLeftIcon /></button><button aria-label="Next story node" disabled={story.route.indexOf(selected || '') >= story.route.length - 1} onClick={() => navigate('project', story.route[story.route.indexOf(selected || '') + 1])}><ArrowRightIcon /></button></> : null}
      </div>
    </main>
    {inspector && record && <aside className="inspector" aria-label="Record summary"><div className="inspector-top"><span>{record.workflow ? title(record.workflow.phase) : 'Unplaced'} <span className="subtle">/ {record.workflow?.step || record.kind}</span></span><button className="icon-button" aria-label="Close summary" onClick={() => { setInspector(false); requestAnimationFrame(() => (document.querySelector(`[data-id="${CSS.escape(record.id)}"]`) as HTMLElement)?.focus()); }}><Cross2Icon /></button></div>
      <span className={`state state-${evidenceState(record, snapshot)}`}>{evidenceState(record, snapshot)}</span>
      <h2 ref={heading} tabIndex={-1}>{record.title}</h2><p className="summary">{record.summary}</p>
      <div className="neighbours">{[{ label: 'Before', links: previous, target: 'source' as const }, { label: 'Leads to', links: next, target: 'target' as const }].map(group => <div key={group.label}><h3>{group.label}</h3>{group.links.length ? group.links.map(link => <button key={link.id} onClick={() => navigate('project', link[group.target], true)}>{group.label === 'Before' ? <ArrowLeftIcon /> : <ArrowRightIcon />}<span>{snapshot.records.find(r => r.id === link[group.target])?.title}</span></button>) : <span className="subtle">No link recorded</span>}</div>)}</div>
      <button className="copy-link" onClick={() => void copyLink()}><Link2Icon /> Copy focus link</button>
    </aside>}
    </div><span className="sr-only" role="status">{notice}</span>
  </div>;
}
