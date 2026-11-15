import { useEffect, useMemo, useRef, useState } from 'react';
import { Background, Handle, MarkerType, Position, ReactFlow, useReactFlow, type Node, type NodeProps } from '@xyflow/react';
import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon, EnterFullScreenIcon, Link2Icon, MinusIcon, MoonIcon, PlusIcon, SunIcon, TargetIcon, UploadIcon } from '@radix-ui/react-icons';
import { connections, focusHash, graph, linkStyle, neighbourhood, phases, readFocus, type RecordItem, type Snapshot, type View } from './graph';
import { evidenceState, samples, validateSnapshot } from './data';

type FlowNode = Node<{ record: RecordItem; state: string; focused: boolean; current: boolean }, 'record'>;
function RecordNode({ data }: NodeProps<FlowNode>) {
  return <div className={`record ${data.focused ? 'focused' : ''}`} data-status={data.state}>
    <Handle type="target" position={Position.Left} />
    <div className="node-top"><span>{data.record.workflow?.step || data.record.kind}</span>{data.current && <span className="now">Chat focus</span>}</div>
    <strong>{data.record.title}</strong>
    <div className="node-bottom"><span className={`state state-${data.state}`}>{data.state}</span><ArrowRightIcon /></div>
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
  const input = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const flow = useReactFlow<FlowNode>();
  const diagram = useMemo(() => graph(snapshot, view), [snapshot, view]);
  const allLinks = useMemo(() => connections(snapshot), [snapshot]);
  const neighbours = useMemo(() => selected ? neighbourhood(selected, diagram.links) : new Set<string>(), [selected, diagram]);
  const record = snapshot.records.find(r => r.id === selected);
  const outcome = snapshot.records.find(r => r.kind === 'outcome' || r.kind === 'goal');
  const focused = !!selected && zoom >= 0.65;
  const nodes: FlowNode[] = diagram.records.map(r => ({ id: r.id, type: 'record', position: diagram.positions.get(r.id)!,
    data: { record: r, state: evidenceState(r, snapshot), focused: r.id === selected, current: r.id === agentFocus },
    className: focused && !neighbours.has(r.id) ? 'distant' : '',
    ariaLabel: `${r.title}, ${r.status}. Open summary.`,
    ariaRole: 'button',
  }));
  const edges = diagram.links.map(e => {
    const visual = linkStyle(e);
    const label = e.label + (e.inferred ? ' (inferred)' : '');
    return { ...e, type: 'smoothstep', className: `link-${visual.kind}`,
      ariaLabel: `${e.source} ${label} ${e.target}`,
      label: selected && (e.source === selected || e.target === selected) ? label : undefined,
      markerEnd: { type: e.inferred ? MarkerType.Arrow : MarkerType.ArrowClosed, color: visual.color },
      style: { stroke: visual.color, strokeWidth: visual.kind === 'prompt' ? 2 : 1.5, strokeDasharray: visual.dash, strokeLinecap: 'round' as const, opacity: focused && !(e.source === selected || e.target === selected) ? 0.15 : 1 },
    };
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('visuai-theme', theme); } catch { /* Theme still applies for this visit. */ }
  }, [theme]);
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
      if (position) void flow.setCenter(position.x + 115, position.y + 61, { zoom: innerWidth < 640 ? 0.8 : 0.95, duration: duration() });
      else void flow.fitView({ padding: 0.18, maxZoom: 0.95, duration: duration() });
    };
    let timer = setTimeout(fit, 100);
    const resize = () => { clearTimeout(timer); timer = setTimeout(fit, 150); };
    window.addEventListener('resize', resize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', resize); };
  }, [diagram, selected, inspector, ready, flow]);
  useEffect(() => {
    if (inspector) { heading.current?.focus(); return; }
    if (selected) {
      const timer = setTimeout(() => (document.querySelector(`.react-flow__node[data-id="${CSS.escape(selected)}"]`) as HTMLElement)?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [inspector, selected]);
  function navigate(view: View, id?: string, details = false) {
    setView(view); setSelected(id); setInspector(details); setError('');
    history.replaceState(null, '', focusHash(snapshot, view, id, chat));
  }
  async function importFile(file?: File) {
    if (!file) return;
    setLoading(true); setError('');
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Snapshot exceeds 2 MiB. Export a smaller project scope.');
      const next = validateSnapshot(JSON.parse(await file.text()));
      history.replaceState(null, '', location.pathname + location.search);
      setSnapshot(next); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined);
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
      <div className="top-actions"><label className="sr-only" htmlFor="example">Example snapshot</label><select id="example" value={snapshot === samples.a ? 'a' : snapshot === samples.b ? 'b' : 'import'} onChange={e => {
        history.replaceState(null, '', location.pathname); setSnapshot(validateSnapshot(samples[e.target.value as 'a' | 'b'])); setView('project'); setSelected(undefined); setInspector(false); setAgentFocus(undefined); setChat(undefined);
      }}><option value="a">First direction</option><option value="b">Revised direction</option>{snapshot !== samples.a && snapshot !== samples.b && <option value="import">Imported project</option>}</select>
        <button className="icon-button" title="Import snapshot" aria-label="Import snapshot" onClick={() => input.current?.click()} disabled={loading}><UploadIcon /></button>
        <button className="icon-button" title={theme === 'dark' ? 'Light mode' : 'Dark mode'} aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
        <input ref={input} type="file" accept=".json,application/json" hidden onChange={e => void importFile(e.target.files?.[0])} />
      </div>
    </header>
    <nav className="lifecycle" aria-label="Product lifecycle">
      <button className={view === 'project' ? 'active' : ''} aria-pressed={view === 'project'} onClick={() => navigate('project')}>Project</button><span className="nav-divider" />
      {phases.map((phase, i) => <button key={phase} className={view === phase ? 'active' : ''} aria-pressed={view === phase} onClick={() => navigate(phase)}><span className="phase-number">0{i + 1}</span>{title(phase)}<span className="phase-count">{snapshot.records.filter(r => r.workflow?.phase === phase).length}</span></button>)}
      {snapshot.records.some(r => !r.workflow) && <button aria-pressed={view === 'unplaced'} onClick={() => navigate('unplaced')}>Unplaced</button>}
    </nav>
    {error && <div className="message error" role="alert">{error}<button aria-label="Dismiss error" onClick={() => setError('')}><Cross2Icon /></button></div>}
    {snapshot.provenance?.complete === false && <div className="message">Partial snapshot &middot; {snapshot.provenance.unresolved.length} unresolved links</div>}
    <div className="work-area"><main className="canvas" aria-label="Project decision flow" onKeyDownCapture={event => {
      const node = (event.target as HTMLElement).closest<HTMLElement>('.react-flow__node');
      if (node?.dataset.id && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); event.stopPropagation(); navigate(view, node.dataset.id, true); }
    }}>
      <div className="canvas-heading"><div className="eyebrow">{view === 'project' ? 'Business aim' : `Project / ${title(view)}`}</div><h1>{view === 'project' ? outcome?.title || snapshot.project.name : title(view)}</h1><p>{diagram.records.length} records <span>&middot;</span> {view === 'project' ? 'Connected direction' : 'Recorded in this stage'}</p></div>
        <ReactFlow<FlowNode> nodes={nodes} edges={edges} nodeTypes={nodeTypes} colorMode={theme} onInit={() => setReady(true)} onMoveEnd={(_, viewport) => setZoom(viewport.zoom)}
          onNodeClick={(_, node) => navigate(view, node.id, true)}
          onPaneClick={() => setInspector(false)} nodesDraggable={false} nodesConnectable={false} edgesFocusable={false} minZoom={0.15} maxZoom={1.8} deleteKeyCode={null}>
          <Background gap={24} size={1} color="var(--grid)" />
        </ReactFlow>
      {loading ? <div className="empty" role="status">Loading snapshot...</div> : !diagram.records.length && <div className="empty"><span className="empty-mark">&mdash;</span><h2>No records yet</h2><p>This stage will fill as work is recorded.</p><button onClick={() => navigate('project')}>Back to project <ArrowRightIcon /></button></div>}
      <details className="flow-key"><summary>Key</summary><div className="key-content">
        <span><i className="key-line" />Direction</span><span><i className="key-line prompt" />Prompted</span><span><i className="key-line check" />Checked</span><span><i className="key-line revision" />Revised</span>
        <p>Open arrowheads: inferred links.</p>
        <span className="state state-passed">Passed evidence</span><span className="state state-stale">Needs checking</span><span className="state state-failed">Failed or blocked</span>
      </div></details>
      <div className="canvas-footer"><span className="chat-status"><span className={chat ? 'status-dot connected' : 'status-dot'} />{chat ? 'Chat-linked focus' : 'Explore the flow'}</span><span className="gesture-hint">Drag to pan &middot; Scroll to zoom</span></div>
      <div className="canvas-tools" aria-label="Flow controls">
        <button aria-label="Zoom out" title="Zoom out" onClick={() => void flow.zoomOut({ duration: duration() })}><MinusIcon /></button><span className="zoom-level">{Math.round(zoom * 100)}%</span><button aria-label="Zoom in" title="Zoom in" onClick={() => void flow.zoomIn({ duration: duration() })}><PlusIcon /></button><span className="tool-divider" />
        <button aria-label="Fit stage" title="Fit stage" onClick={() => { setSelected(undefined); setInspector(false); void flow.fitView({ padding: 0.3, duration: duration() }); }}><EnterFullScreenIcon /></button>
        {agentFocus && <button aria-label="Return to chat focus" title="Return to chat focus" onClick={() => navigate('project', agentFocus, true)}><TargetIcon /></button>}
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
