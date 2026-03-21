import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const LOGO = "data:image/png;base64,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";


// ── Utils ──────────────────────────────────────────────────
function extractYoutubeId(url) {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/shorts\/([^&\n?#]+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}
function formatDatetime(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function isVencida(f) { return f ? new Date(f) < new Date() : false; }

// ── Auth Context ───────────────────────────────────────────
const AuthCtx = createContext(null);

// ── CSS ────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#0d0e0f; --bg2:#161718; --bg3:#1e2022;
    --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.13);
    --text:#f0ede8; --text2:#8a8780; --text3:#5a5754;
    --accent:#e8d5a3; --accent2:#c4a96b;
    --green:#4ade80; --green-bg:rgba(74,222,128,0.08);
    --red:#f87171; --red-bg:rgba(248,113,113,0.08);
    --amber:#fbbf24; --amber-bg:rgba(251,191,36,0.08);
    --purple:#a78bfa; --purple-bg:rgba(167,139,250,0.08);
    --blue:#60a5fa; --blue-bg:rgba(96,165,250,0.08);
    --teal:#2dd4bf; --teal-bg:rgba(45,212,191,0.08);
    --radius:10px; --radius-lg:16px;
  }
  body { background:var(--bg); color:var(--text); font-family:'Roboto',sans-serif; font-size:15px; line-height:1.6; min-height:100vh; }
  .app { min-height:100vh; display:flex; flex-direction:column; }
  .nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:60px; border-bottom:1px solid var(--border); background:var(--bg); position:sticky; top:0; z-index:100; }
  .nav-brand { font-family:'Roboto',sans-serif; font-size:20px; font-weight:500; color:var(--accent); }
  .nav-right { display:flex; align-items:center; gap:12px; }
  .nav-user { font-size:13px; color:var(--text2); }
  .nav-role { font-size:11px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; padding:3px 8px; border-radius:20px; background:var(--amber-bg); color:var(--amber); border:1px solid rgba(251,191,36,0.2); }
  .nav-role.docente { background:var(--purple-bg); color:var(--purple); border-color:rgba(167,139,250,0.2); }
  .nav-role.admin { background:rgba(45,212,191,0.1); color:var(--teal); border-color:rgba(45,212,191,0.2); }
  .main { flex:1; padding:40px 32px; max-width:1200px; margin:0 auto; width:100%; }
  .page-title { font-family:'Roboto',sans-serif; font-size:28px; font-weight:500; color:var(--text); margin-bottom:6px; }
  .page-sub { color:var(--text2); font-size:14px; margin-bottom:32px; }
  .card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-lg); padding:24px; transition:border-color 0.2s; }
  .card:hover { border-color:var(--border2); }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  .form-group { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
  .form-label { font-size:13px; font-weight:500; color:var(--text2); }
  .form-input,.form-select,.form-textarea { background:var(--bg3); border:1px solid var(--border2); border-radius:var(--radius); padding:10px 14px; color:var(--text); font-family:inherit; font-size:14px; outline:none; transition:border-color 0.2s; width:100%; }
  .form-input:focus,.form-select:focus,.form-textarea:focus { border-color:var(--accent2); }
  .form-textarea { resize:vertical; min-height:80px; }
  .form-select option { background:var(--bg3); }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:9px 18px; border-radius:var(--radius); font-family:inherit; font-size:14px; font-weight:500; cursor:pointer; border:none; transition:all 0.15s; }
  .btn-primary { background:var(--accent); color:#0d0e0f; }
  .btn-primary:hover { background:var(--accent2); }
  .btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
  .btn-ghost { background:transparent; color:var(--text2); border:1px solid var(--border2); }
  .btn-ghost:hover { border-color:var(--border); color:var(--text); }
  .btn-danger { background:var(--red-bg); color:var(--red); border:1px solid rgba(248,113,113,0.2); }
  .btn-success { background:var(--green-bg); color:var(--green); border:1px solid rgba(74,222,128,0.2); }
  .btn-sm { padding:6px 12px; font-size:13px; }
  .btn-full { width:100%; }
  .badge { display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:500; padding:3px 9px; border-radius:20px; }
  .badge-pendiente { background:var(--amber-bg); color:var(--amber); border:1px solid rgba(251,191,36,0.2); }
  .badge-aprobado { background:var(--green-bg); color:var(--green); border:1px solid rgba(74,222,128,0.2); }
  .badge-desaprobado { background:var(--red-bg); color:var(--red); border:1px solid rgba(248,113,113,0.2); }
  .badge-sinentrega { background:var(--bg3); color:var(--text3); border:1px solid var(--border2); }
  .badge-vencida { background:var(--red-bg); color:var(--red); border:1px solid rgba(248,113,113,0.2); }
  .stat-card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-lg); padding:20px 24px; }
  .stat-num { font-size:34px; font-weight:300; color:var(--accent); }
  .stat-label { font-size:13px; color:var(--text2); margin-top:2px; }
  /* item-row: used for lists in ABM panels */
  .item-row { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:12px 16px; background:var(--bg3); border-radius:var(--radius); margin-bottom:6px; }
  .item-row-info { flex:1; min-width:0; }
  .item-row-title { font-weight:500; font-size:14px; }
  .item-row-sub { font-size:12px; color:var(--text2); margin-top:1px; }
  .item-row-actions { display:flex; gap:6px; flex-shrink:0; }
  /* Módulo block */
  .modulo-block { margin-bottom:28px; }
  .modulo-header { display:flex; align-items:center; gap:10px; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid var(--border); }
  .modulo-label { font-size:11px; font-weight:500; text-transform:uppercase; letter-spacing:1px; color:var(--purple); background:var(--purple-bg); border:1px solid rgba(167,139,250,0.2); padding:2px 8px; border-radius:20px; }
  .modulo-name { font-size:15px; font-weight:500; }
  /* Tarea card (alumno) */
  .tarea-card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; transition:border-color 0.2s; margin-bottom:10px; }
  .tarea-header { padding:14px 18px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
  .tarea-titulo { font-weight:500; font-size:15px; }
  .tarea-desc { font-size:13px; color:var(--text2); margin-top:3px; }
  .tarea-meta { font-size:12px; color:var(--text3); margin-top:4px; }
  .tarea-body { padding:14px 18px; }
  .tarea-entrega-preview { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--bg3); border-radius:var(--radius); cursor:pointer; transition:background 0.15s; margin-bottom:8px; }
  .tarea-entrega-preview:hover { background:rgba(255,255,255,0.06); }
  /* Docente entrega row */
  .entrega-row { display:flex; align-items:center; gap:12px; padding:12px 18px; border-bottom:1px solid var(--border); cursor:pointer; transition:background 0.15s; }
  .entrega-row:last-child { border-bottom:none; }
  .entrega-row:hover { background:var(--bg3); }
  .entrega-row-thumb { width:72px; height:40px; border-radius:6px; object-fit:cover; flex-shrink:0; }
  .entrega-row-info { flex:1; min-width:0; }
  .entrega-row-name { font-size:14px; font-weight:500; }
  .entrega-row-sub { font-size:12px; color:var(--text2); }
  /* Equipo badge */
  .equipo-chip { display:inline-flex; align-items:center; font-size:11px; font-weight:500; padding:2px 8px; border-radius:20px; background:var(--teal-bg); color:var(--teal); border:1px solid rgba(45,212,191,0.2); }
  /* Modal */
  .modal-overlay { position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; padding:24px; animation:fadeIn 0.15s ease; }
  .modal { background:var(--bg2); border:1px solid var(--border2); border-radius:var(--radius-lg); width:100%; max-width:800px; overflow:hidden; animation:slideUp 0.2s ease; }
  .modal-header { display:flex; align-items:flex-start; justify-content:space-between; padding:20px 24px 0; }
  .modal-title { font-weight:500; font-size:16px; }
  .modal-close { background:none; border:none; color:var(--text2); cursor:pointer; font-size:20px; padding:0 0 0 16px; }
  .modal-close:hover { color:var(--text); }
  .modal-video { padding:16px 24px; }
  .modal-iframe-wrap { position:relative; padding-bottom:56.25%; background:#000; border-radius:8px; overflow:hidden; }
  .modal-iframe-wrap iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }
  .modal-actions { padding:16px 24px 20px; display:flex; flex-direction:column; gap:10px; border-top:1px solid var(--border); }
  .modal-actions-row { display:flex; gap:8px; }
  .modal-comment { font-size:13px; color:var(--text2); padding:10px 14px; background:var(--bg3); border-radius:var(--radius); border-left:2px solid var(--border2); }
  /* Subir form */
  .subir-form { background:var(--bg3); border:1px dashed var(--border2); border-radius:var(--radius); padding:14px; }
  /* Auth */
  .auth-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--bg); padding:24px; }
  .auth-card { width:100%; max-width:420px; background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius-lg); padding:40px; }
  .auth-logo { font-size:24px; font-weight:500; color:var(--accent); margin-bottom:6px; }
  .auth-sub { color:var(--text2); font-size:14px; margin-bottom:32px; }
  .auth-tabs { display:flex; margin-bottom:28px; border:1px solid var(--border2); border-radius:var(--radius); overflow:hidden; }
  .auth-tab { flex:1; padding:9px; text-align:center; cursor:pointer; font-size:14px; font-weight:500; color:var(--text2); background:transparent; border:none; font-family:inherit; transition:all 0.15s; }
  .auth-tab.active { background:var(--bg3); color:var(--text); }
  .auth-error { background:var(--red-bg); border:1px solid rgba(248,113,113,0.2); color:var(--red); font-size:13px; padding:10px 14px; border-radius:var(--radius); margin-bottom:16px; }
  .empty { text-align:center; padding:48px 24px; color:var(--text2); }
  .empty-icon { font-size:36px; margin-bottom:10px; opacity:0.5; }
  .empty-title { font-size:16px; font-weight:500; color:var(--text); margin-bottom:4px; }
  .empty-sub { font-size:13px; }
  .tabs { display:flex; gap:0; margin-bottom:24px; border-bottom:1px solid var(--border); flex-wrap:wrap; }
  .tab-btn { padding:10px 16px; font-size:14px; font-weight:500; color:var(--text2); background:none; border:none; cursor:pointer; font-family:inherit; border-bottom:2px solid transparent; margin-bottom:-1px; transition:all 0.15s; white-space:nowrap; }
  .tab-btn.active { color:var(--accent); border-bottom-color:var(--accent); }
  .tab-btn:hover:not(.active) { color:var(--text); }
  .section-title { font-size:17px; font-weight:500; }
  .alert { padding:12px 16px; border-radius:var(--radius); font-size:14px; margin-bottom:16px; }
  .alert-success { background:var(--green-bg); color:var(--green); border:1px solid rgba(74,222,128,0.2); }
  .alert-error { background:var(--red-bg); color:var(--red); border:1px solid rgba(248,113,113,0.2); }
  .spinner { animation:spin 0.8s linear infinite; display:inline-block; }
  .loading-center { display:flex; align-items:center; justify-content:center; min-height:200px; color:var(--text2); gap:8px; }
  .divider { height:1px; background:var(--border); margin:20px 0; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{transform:translateY(12px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @media(max-width:768px) { .nav{padding:0 16px} .main{padding:24px 16px} .grid-2,.grid-3,.grid-4{grid-template-columns:1fr} }
`;

function StyleInjector() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}
function Spinner() { return <span className="spinner">⟳</span>; }
function Badge({ estado }) {
  const map = { pendiente: "Pendiente", aprobado: "Aprobado", desaprobado: "Desaprobado", sinentrega: "Sin entrega", vencida: "Vencida" };
  return <span className={`badge badge-${estado}`}>● {map[estado] || estado}</span>;
}
function Msg({ msg }) {
  if (!msg) return null;
  return <div className={`alert alert-${msg.type}`}>{msg.text}</div>;
}

// ── Auth Page ──────────────────────────────────────────────
function AuthPage() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", nombre: "", rol: "alumno" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    if (error) setError(error.message);
    setLoading(false);
  }
  async function handleRegister(e) {
    e.preventDefault();
    if (!form.nombre.trim()) return setError("El nombre es requerido");
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (err) { setError(err.message); setLoading(false); return; }
    if (data.user) {
      const { error: pe } = await supabase.from("profiles").insert({ id: data.user.id, nombre: form.nombre, email: form.email, rol: form.rol });
      if (pe) setError(pe.message);
    }
    setLoading(false);
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={LOGO} alt="Logo" style={{ width: "100%", maxWidth: 280, marginBottom: 20, display: "block" }} />
        <div className="auth-sub">Plataforma de entregas y evaluaciones</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Ingresar</button>
          <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Registrarse</button>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Contraseña</label><input className="form-input" type="password" value={form.password} onChange={e => set("password", e.target.value)} required /></div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 8 }} disabled={loading}>{loading ? <><Spinner /> Ingresando...</> : "Ingresar"}</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group"><label className="form-label">Nombre completo</label><input className="form-input" type="text" value={form.nombre} onChange={e => set("nombre", e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Contraseña</label><input className="form-input" type="password" value={form.password} onChange={e => set("password", e.target.value)} required minLength={6} /></div>
            <div className="form-group"><label className="form-label">Soy</label><select className="form-select" value={form.rol} onChange={e => set("rol", e.target.value)}><option value="alumno">Alumno</option><option value="docente">Docente</option><option value="admin">Administrador</option></select></div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 8 }} disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear cuenta"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Video Modal ────────────────────────────────────────────
function VideoModal({ entrega, profile, onClose, onEvaluar }) {
  const [comentario, setComentario] = useState(entrega.comentario_docente || "");
  const [loading, setLoading] = useState(false);
  const canEvaluar = profile?.rol === "docente" && entrega.estado === "pendiente";

  async function evaluar(estado) {
    setLoading(true);
    await onEvaluar(entrega.id, estado, comentario);
    setLoading(false); onClose();
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{entrega.titulo}</div>
            {entrega.tareas && <div style={{ fontSize: 12, color: "var(--purple)", marginTop: 2 }}>📋 {entrega.tareas?.nombre || entrega.tareas?.titulo}</div>}
            {entrega.profiles && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 2 }}>por {entrega.profiles?.nombre}</div>}
            {entrega.equipo && <div style={{ marginTop: 4 }}><span className="equipo-chip">👥 {entrega.equipo}</span></div>}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-video">
          <div className="modal-iframe-wrap">
            <iframe src={`https://www.youtube.com/embed/${entrega.youtube_id}?autoplay=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
        <div className="modal-actions">
          {entrega.descripcion && <p style={{ fontSize: 13, color: "var(--text2)" }}>{entrega.descripcion}</p>}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge estado={entrega.estado} />
            <span style={{ fontSize: 12, color: "var(--text3)" }}>{formatDate(entrega.created_at)}</span>
          </div>
          {entrega.comentario_docente && !canEvaluar && <div className="modal-comment">💬 {entrega.comentario_docente}</div>}
          {canEvaluar && (
            <>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Comentario para el alumno (opcional)</label>
                <textarea className="form-textarea" value={comentario} onChange={e => setComentario(e.target.value)} style={{ minHeight: 60 }} />
              </div>
              <div className="modal-actions-row">
                <button className="btn btn-success" onClick={() => evaluar("aprobado")} disabled={loading}>{loading ? <Spinner /> : "✓"} Aprobar</button>
                <button className="btn btn-danger" onClick={() => evaluar("desaprobado")} disabled={loading}>{loading ? <Spinner /> : "✕"} Desaprobar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Subir video form (alumno) ──────────────────────────────
function SubirVideoForm({ tarea, alumnoId, equipoId, onGuardado }) {
  const [url, setUrl] = useState(""); const [titulo, setTitulo] = useState(""); const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false); const [msg, setMsg] = useState(null); const [abierto, setAbierto] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setMsg(null);
    const ytId = extractYoutubeId(url);
    if (!ytId) return setMsg({ type: "error", text: "URL de YouTube inválida" });
    setLoading(true);
    const { error } = await supabase.from("entregas").insert({
      alumno_id: alumnoId, curso_id: tarea.curso_id, tarea_id: tarea.id,
      equipo_id: equipoId || null,
      titulo: titulo || tarea.titulo, descripcion, youtube_url: url, youtube_id: ytId,
    });
    if (error) setMsg({ type: "error", text: error.message });
    else { setAbierto(false); setUrl(""); setTitulo(""); setDescripcion(""); onGuardado(); }
    setLoading(false);
  }
  if (!abierto) return <button className="btn btn-primary btn-sm" onClick={() => setAbierto(true)}>+ Subir video</button>;
  return (
    <div className="subir-form">
      <Msg msg={msg} />
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label className="form-label">Link de YouTube</label><input className="form-input" type="url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={e => setUrl(e.target.value)} required /></div>
        <div className="form-group"><label className="form-label">Título (opcional)</label><input className="form-input" type="text" placeholder={tarea.titulo} value={titulo} onChange={e => setTitulo(e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Comentario (opcional)</label><textarea className="form-textarea" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={{ minHeight: 56 }} /></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary btn-sm" disabled={loading}>{loading ? <><Spinner /> Enviando...</> : "Enviar"}</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAbierto(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

// ── Tarea card (alumno) ────────────────────────────────────
function TareaCardAlumno({ tarea, entrega, alumnoId, equipoId, onGuardado, onVerVideo }) {
  const vencida = isVencida(tarea.fecha_limite) && !entrega;
  return (
    <div className="tarea-card">
      <div className="tarea-header">
        <div style={{ flex: 1 }}>
          <div className="tarea-titulo">{tarea.titulo}</div>
          {tarea.descripcion && <div className="tarea-desc">{tarea.descripcion}</div>}
          {tarea.fecha_limite && <div className="tarea-meta" style={{ color: vencida ? "var(--red)" : "var(--text3)" }}>⏰ {vencida ? "Venció" : "Vence"}: {formatDatetime(tarea.fecha_limite)}</div>}
        </div>
        <div style={{ flexShrink: 0 }}>
          {entrega ? <Badge estado={entrega.estado} /> : vencida ? <Badge estado="vencida" /> : <Badge estado="sinentrega" />}
        </div>
      </div>
      <div className="tarea-body">
        {entrega ? (
          <>
            <div className="tarea-entrega-preview" onClick={() => onVerVideo(entrega)}>
              <img src={`https://img.youtube.com/vi/${entrega.youtube_id}/mqdefault.jpg`} alt="" style={{ width: 64, height: 36, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entrega.titulo}</div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>Subido el {formatDate(entrega.created_at)} · clic para ver</div>
              </div>
            </div>
            {entrega.comentario_docente && <div className="modal-comment">💬 {entrega.comentario_docente}</div>}
          </>
        ) : (
          <SubirVideoForm tarea={tarea} alumnoId={alumnoId} equipoId={equipoId} onGuardado={onGuardado} />
        )}
      </div>
    </div>
  );
}

// ── Alumno View ────────────────────────────────────────────
function AlumnoView({ profile }) {
  const [cursos, setCursos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [miEquipo, setMiEquipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const [c, mod, t, e, eq] = await Promise.all([
      supabase.from("cursos").select("*").order("nombre"),
      supabase.from("modulos").select("*").order("orden"),
      supabase.from("tareas").select("*").order("created_at", { ascending: true }),
      supabase.from("entregas").select("*").eq("alumno_id", profile.id),
      supabase.from("equipo_miembros").select("*, equipos(id, nombre, curso_id)").eq("alumno_id", profile.id),
    ]);
    if (c.data) setCursos(c.data);
    if (mod.data) setModulos(mod.data);
    if (t.data) setTareas(t.data);
    if (e.data) setEntregas(e.data);
    if (eq.data && eq.data.length > 0) setMiEquipo(eq.data[0].equipos);
    setLoading(false);
  }

  const getEntrega = (tareaId) => entregas.find(e => e.tarea_id === tareaId) || null;

  // Build: cursos → modulos → tareas
  const estructura = cursos.map(curso => {
    const modulosDeCurso = modulos.filter(m => m.curso_id === curso.id);
    const tareasSinModulo = tareas.filter(t => t.curso_id === curso.id && !t.modulo_id);
    return { curso, modulosDeCurso, tareasSinModulo };
  }).filter(g => g.modulosDeCurso.length > 0 || g.tareasSinModulo.length > 0);

  const equipoId = miEquipo?.id || null;

  const stats = {
    total: tareas.length,
    aprobadas: entregas.filter(e => e.estado === "aprobado").length,
    pendientes: entregas.filter(e => e.estado === "pendiente").length,
  };

  return (
    <main className="main">
      <div className="page-title">Mis tareas</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <span className="page-sub" style={{ marginBottom: 0 }}>Hola, {profile.nombre}</span>
        {miEquipo && <span className="equipo-chip">👥 {miEquipo.nombre}</span>}
      </div>

      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="stat-card"><div className="stat-num">{stats.total}</div><div className="stat-label">Tareas asignadas</div></div>
        <div className="stat-card"><div className="stat-num" style={{ color: "var(--green)" }}>{stats.aprobadas}</div><div className="stat-label">Aprobadas</div></div>
        <div className="stat-card"><div className="stat-num" style={{ color: "var(--amber)" }}>{stats.pendientes}</div><div className="stat-label">En revisión</div></div>
      </div>

      {loading ? <div className="loading-center"><Spinner /> Cargando...</div>
        : estructura.length === 0 ? (
          <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">No hay tareas todavía</div><div className="empty-sub">El docente aún no asignó tareas</div></div>
        ) : estructura.map(({ curso, modulosDeCurso, tareasSinModulo }) => (
          <div key={curso.id} style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>{curso.nombre}</div>

            {/* Tareas organizadas por módulo */}
            {modulosDeCurso.map(mod => {
              const tareasDelMod = tareas.filter(t => t.modulo_id === mod.id);
              if (tareasDelMod.length === 0) return null;
              return (
                <div key={mod.id} className="modulo-block">
                  <div className="modulo-header">
                    <span className="modulo-label">Módulo</span>
                    <span className="modulo-name">{mod.nombre}</span>
                    {mod.descripcion && <span style={{ fontSize: 13, color: "var(--text2)" }}>— {mod.descripcion}</span>}
                  </div>
                  {tareasDelMod.map(tarea => (
                    <TareaCardAlumno key={tarea.id} tarea={tarea} entrega={getEntrega(tarea.id)} alumnoId={profile.id} equipoId={equipoId} onGuardado={loadData} onVerVideo={setSelected} />
                  ))}
                </div>
              );
            })}

            {/* Tareas sin módulo */}
            {tareasSinModulo.length > 0 && (
              <div className="modulo-block">
                {modulosDeCurso.length > 0 && (
                  <div className="modulo-header">
                    <span className="modulo-label" style={{ background: "var(--bg3)", color: "var(--text2)", borderColor: "var(--border2)" }}>Sin módulo</span>
                  </div>
                )}
                {tareasSinModulo.map(tarea => (
                  <TareaCardAlumno key={tarea.id} tarea={tarea} entrega={getEntrega(tarea.id)} alumnoId={profile.id} equipoId={equipoId} onGuardado={loadData} onVerVideo={setSelected} />
                ))}
              </div>
            )}
          </div>
        ))}

      {selected && <VideoModal entrega={selected} profile={profile} onClose={() => setSelected(null)} onEvaluar={async () => {}} />}
    </main>
  );
}

// ── Inline Edit Row ────────────────────────────────────────
function EditableRow({ children, fields, onSave, onDelete, deleteConfirm }) {
  const [editing, setEditing] = useState(false);
  const [vals, setVals] = useState({});
  const [saving, setSaving] = useState(false);

  function startEdit() {
    const init = {};
    fields.forEach(f => { init[f.key] = f.value || ""; });
    setVals(init); setEditing(true);
  }
  async function save() {
    setSaving(true);
    await onSave(vals);
    setSaving(false); setEditing(false);
  }
  async function del() {
    if (!confirm(deleteConfirm || "¿Eliminar este elemento?")) return;
    await onDelete();
  }

  if (editing) {
    return (
      <div className="item-row" style={{ flexDirection: "column", alignItems: "stretch", gap: 10 }}>
        {fields.map(f => (
          <div key={f.key} className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">{f.label}</label>
            {f.type === "textarea"
              ? <textarea className="form-textarea" style={{ minHeight: 56 }} value={vals[f.key]} onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))} />
              : f.type === "select"
                ? <select className="form-select" value={vals[f.key]} onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))}>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                : <input className="form-input" type={f.type || "text"} value={vals[f.key]} onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))} />
            }
          </div>
        ))}
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-primary btn-sm" onClick={save} disabled={saving}>{saving ? <Spinner /> : "Guardar"}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-row">
      <div className="item-row-info">{children}</div>
      <div className="item-row-actions">
        <button className="btn btn-ghost btn-sm" onClick={startEdit} title="Editar">✎</button>
        <button className="btn btn-danger btn-sm" onClick={del} title="Eliminar">✕</button>
      </div>
    </div>
  );
}

// ── ABM Cursos ─────────────────────────────────────────────
function TabCursos({ cursos, tareas, modulos, equipos, reload }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function crear(e) {
    e.preventDefault(); setLoading(true); setMsg(null);
    const { error } = await supabase.from("cursos").insert({ nombre: form.nombre, descripcion: form.descripcion });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Curso creado" }); setForm({ nombre: "", descripcion: "" }); reload(); }
    setLoading(false);
  }
  async function editar(id, vals) {
    const { error } = await supabase.from("cursos").update({ nombre: vals.nombre, descripcion: vals.descripcion }).eq("id", id);
    if (!error) reload();
  }
  async function eliminar(id) {
    const { error } = await supabase.from("cursos").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else reload();
  }

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      <div className="card">
        <div className="section-title" style={{ marginBottom: 20 }}>Nuevo curso</div>
        <Msg msg={msg} />
        <form onSubmit={crear}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" type="text" placeholder="Ej: Producción Audiovisual" value={form.nombre} onChange={e => set("nombre", e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Descripción (opcional)</label><textarea className="form-textarea" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} /></div>
          <button className="btn btn-primary" disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear curso"}</button>
        </form>
      </div>
      <div>
        <div className="section-title" style={{ marginBottom: 14 }}>Cursos existentes</div>
        {cursos.length === 0 ? <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay cursos</div></div>
          : cursos.map(c => (
            <EditableRow key={c.id}
              fields={[{ key: "nombre", label: "Nombre", value: c.nombre }, { key: "descripcion", label: "Descripción", value: c.descripcion, type: "textarea" }]}
              onSave={vals => editar(c.id, vals)}
              onDelete={() => eliminar(c.id)}
              deleteConfirm="¿Eliminar este curso? Se eliminarán también sus módulos, tareas, equipos y entregas."
            >
              <div className="item-row-title">{c.nombre}</div>
              <div className="item-row-sub">{modulos.filter(m => m.curso_id === c.id).length} módulo(s) · {tareas.filter(t => t.curso_id === c.id).length} tarea(s) · {equipos.filter(eq => eq.curso_id === c.id).length} equipo(s)</div>
            </EditableRow>
          ))}
      </div>
    </div>
  );
}

// ── ABM Módulos ────────────────────────────────────────────
function TabModulos({ cursos, modulos, tareas, reload }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", curso_id: cursos[0]?.id || "", orden: 0 });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { if (cursos.length > 0 && !form.curso_id) setForm(f => ({ ...f, curso_id: cursos[0].id })); }, [cursos]);

  async function crear(e) {
    e.preventDefault(); setLoading(true); setMsg(null);
    const u = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from("modulos").insert({ nombre: form.nombre, descripcion: form.descripcion, curso_id: form.curso_id, docente_id: u.id, orden: Number(form.orden) });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Módulo creado" }); setForm(f => ({ ...f, nombre: "", descripcion: "", orden: 0 })); reload(); }
    setLoading(false);
  }
  async function editar(id, vals) {
    const { error } = await supabase.from("modulos").update({ nombre: vals.nombre, descripcion: vals.descripcion, orden: Number(vals.orden) }).eq("id", id);
    if (!error) reload();
  }
  async function eliminar(id) {
    const { error } = await supabase.from("modulos").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else reload();
  }

  if (cursos.length === 0) return <div className="empty"><div className="empty-icon">📦</div><div className="empty-title">Primero creá un curso</div></div>;

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      <div className="card">
        <div className="section-title" style={{ marginBottom: 20 }}>Nuevo módulo</div>
        <Msg msg={msg} />
        <form onSubmit={crear}>
          <div className="form-group"><label className="form-label">Curso</label><select className="form-select" value={form.curso_id} onChange={e => set("curso_id", e.target.value)} required>{cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
          <div className="form-group"><label className="form-label">Nombre del módulo</label><input className="form-input" type="text" placeholder="Ej: Módulo 1 — Fundamentos" value={form.nombre} onChange={e => set("nombre", e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Descripción (opcional)</label><textarea className="form-textarea" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} style={{ minHeight: 60 }} /></div>
          <div className="form-group"><label className="form-label">Orden (número)</label><input className="form-input" type="number" min={0} value={form.orden} onChange={e => set("orden", e.target.value)} /></div>
          <button className="btn btn-primary" disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear módulo"}</button>
        </form>
      </div>
      <div>
        <div className="section-title" style={{ marginBottom: 14 }}>Módulos existentes</div>
        {modulos.length === 0 ? <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay módulos</div></div>
          : modulos.map(m => (
            <EditableRow key={m.id}
              fields={[
                { key: "nombre", label: "Nombre", value: m.nombre },
                { key: "descripcion", label: "Descripción", value: m.descripcion, type: "textarea" },
                { key: "orden", label: "Orden", value: String(m.orden ?? 0), type: "number" },
              ]}
              onSave={vals => editar(m.id, vals)}
              onDelete={() => eliminar(m.id)}
              deleteConfirm="¿Eliminar este módulo? Las tareas quedarán sin módulo."
            >
              <div className="item-row-title">{m.nombre}</div>
              <div className="item-row-sub">{cursos.find(c => c.id === m.curso_id)?.nombre} · orden {m.orden} · {tareas.filter(t => t.modulo_id === m.id).length} tarea(s)</div>
            </EditableRow>
          ))}
      </div>
    </div>
  );
}

// ── ABM Tareas ─────────────────────────────────────────────
function TabTareas({ cursos, modulos, tareas, reload }) {
  const [form, setForm] = useState({ titulo: "", descripcion: "", curso_id: cursos[0]?.id || "", modulo_id: "", fecha_limite: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [filterModulo, setFilterModulo] = useState("todos");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { if (cursos.length > 0 && !form.curso_id) setForm(f => ({ ...f, curso_id: cursos[0].id })); }, [cursos]);

  const modulosDelCurso = modulos.filter(m => m.curso_id === form.curso_id);

  async function crear(e) {
    e.preventDefault(); setLoading(true); setMsg(null);
    const u = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase.from("tareas").insert({
      titulo: form.titulo, descripcion: form.descripcion || null,
      curso_id: form.curso_id, docente_id: u.id,
      modulo_id: form.modulo_id || null,
      fecha_limite: form.fecha_limite || null,
    });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Tarea creada" }); setForm(f => ({ ...f, titulo: "", descripcion: "", modulo_id: "", fecha_limite: "" })); reload(); }
    setLoading(false);
  }
  async function editar(id, vals) {
    const { error } = await supabase.from("tareas").update({
      titulo: vals.titulo, descripcion: vals.descripcion || null,
      modulo_id: vals.modulo_id || null, fecha_limite: vals.fecha_limite || null,
    }).eq("id", id);
    if (!error) reload();
  }
  async function eliminar(id) {
    const { error } = await supabase.from("tareas").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else reload();
  }

  if (cursos.length === 0) return <div className="empty"><div className="empty-icon">📝</div><div className="empty-title">Primero creá un curso</div></div>;

  // Filtrar tareas según el módulo seleccionado
  const tareasFiltradas = filterModulo === "todos"
    ? tareas
    : filterModulo === "sin-modulo"
      ? tareas.filter(t => !t.modulo_id)
      : tareas.filter(t => t.modulo_id === filterModulo);

  // Agrupar por módulo cuando se muestra "todos"
  const grupos = filterModulo === "todos"
    ? [
        ...modulos.map(mod => ({
          key: mod.id,
          label: mod.nombre,
          tareas: tareas.filter(t => t.modulo_id === mod.id),
        })),
        {
          key: "sin-modulo",
          label: "Sin módulo",
          tareas: tareas.filter(t => !t.modulo_id),
        },
      ].filter(g => g.tareas.length > 0)
    : [{ key: "filtrado", label: null, tareas: tareasFiltradas }];

  function renderTarea(t) {
    const curso = cursos.find(c => c.id === t.curso_id);
    const modulosDelCursoT = modulos.filter(m => m.curso_id === t.curso_id);
    return (
      <EditableRow key={t.id}
        fields={[
          { key: "titulo", label: "Título", value: t.titulo },
          { key: "descripcion", label: "Consigna", value: t.descripcion, type: "textarea" },
          { key: "modulo_id", label: "Módulo", value: t.modulo_id || "", type: "select", options: [{ value: "", label: "Sin módulo" }, ...modulosDelCursoT.map(m => ({ value: m.id, label: m.nombre }))] },
          { key: "fecha_limite", label: "Fecha límite", value: t.fecha_limite ? new Date(t.fecha_limite).toISOString().slice(0, 16) : "", type: "datetime-local" },
        ]}
        onSave={vals => editar(t.id, vals)}
        onDelete={() => eliminar(t.id)}
        deleteConfirm="¿Eliminar esta tarea y sus entregas?"
      >
        <div className="item-row-title">{t.titulo}</div>
        <div className="item-row-sub">{curso?.nombre}{t.fecha_limite ? ` · Vence ${formatDate(t.fecha_limite)}` : ""}</div>
      </EditableRow>
    );
  }

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      {/* Columna izquierda: formulario */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: 20 }}>Nueva tarea</div>
        <Msg msg={msg} />
        <form onSubmit={crear}>
          <div className="form-group"><label className="form-label">Curso</label><select className="form-select" value={form.curso_id} onChange={e => { set("curso_id", e.target.value); set("modulo_id", ""); }} required>{cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
          <div className="form-group"><label className="form-label">Módulo (opcional)</label><select className="form-select" value={form.modulo_id} onChange={e => set("modulo_id", e.target.value)}><option value="">Sin módulo</option>{modulosDelCurso.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}</select></div>
          <div className="form-group"><label className="form-label">Título</label><input className="form-input" type="text" placeholder="Ej: TP1 — Video presentación" value={form.titulo} onChange={e => set("titulo", e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Consigna (opcional)</label><textarea className="form-textarea" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Fecha límite (opcional)</label><input className="form-input" type="datetime-local" value={form.fecha_limite} onChange={e => set("fecha_limite", e.target.value)} /></div>
          <button className="btn btn-primary" disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear tarea"}</button>
        </form>
      </div>

      {/* Columna derecha: listado con filtro */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div className="section-title">Tareas existentes</div>
          <select
            className="form-select"
            style={{ maxWidth: 200, fontSize: 13 }}
            value={filterModulo}
            onChange={e => setFilterModulo(e.target.value)}
          >
            <option value="todos">Todos los módulos</option>
            {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            <option value="sin-modulo">Sin módulo</option>
          </select>
        </div>

        {tareas.length === 0 ? (
          <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay tareas</div></div>
        ) : grupos.every(g => g.tareas.length === 0) ? (
          <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay tareas en este módulo</div></div>
        ) : (
          grupos.map(grupo => (
            <div key={grupo.key} style={{ marginBottom: 20 }}>
              {grupo.label && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid var(--border)" }}>
                  <span className="modulo-label">{grupo.label}</span>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>{grupo.tareas.length} tarea(s)</span>
                </div>
              )}
              {grupo.tareas.map(t => renderTarea(t))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── ABM Equipos ────────────────────────────────────────────
function TabEquipos({ cursos, equipos, alumnos, reload }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", curso_id: cursos[0]?.id || "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [miembros, setMiembros] = useState([]);
  const [addAlumno, setAddAlumno] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { if (cursos.length > 0 && !form.curso_id) setForm(f => ({ ...f, curso_id: cursos[0].id })); }, [cursos]);
  useEffect(() => { loadMiembros(); }, [equipos]);

  async function loadMiembros() {
    if (equipos.length === 0) return;
    const { data } = await supabase.from("equipo_miembros").select("*, profiles(id, nombre, email)");
    if (data) setMiembros(data);
  }
  async function crear(e) {
    e.preventDefault(); setLoading(true); setMsg(null);
    const { error } = await supabase.from("equipos").insert({ nombre: form.nombre, descripcion: form.descripcion, curso_id: form.curso_id });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Equipo creado" }); setForm(f => ({ ...f, nombre: "", descripcion: "" })); reload(); }
    setLoading(false);
  }
  async function editar(id, vals) {
    const { error } = await supabase.from("equipos").update({ nombre: vals.nombre, descripcion: vals.descripcion }).eq("id", id);
    if (!error) reload();
  }
  async function eliminar(id) {
    const { error } = await supabase.from("equipos").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else reload();
  }
  async function agregarMiembro(equipoId, alumnoId) {
    if (!alumnoId) return;
    // Verificar si el alumno ya pertenece a algún equipo
    const yaEnUnEquipo = miembros.some(m => m.alumno_id === alumnoId);
    if (yaEnUnEquipo) {
      const equipoActual = equipos.find(eq => eq.id === miembros.find(m => m.alumno_id === alumnoId)?.equipo_id);
      setMsg({ type: "error", text: `Este alumno ya pertenece al equipo "${equipoActual?.nombre || "otro equipo"}"` });
      return;
    }
    const { error } = await supabase.from("equipo_miembros").insert({ equipo_id: equipoId, alumno_id: alumnoId });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg(null); setAddAlumno(a => ({ ...a, [equipoId]: "" })); loadMiembros(); }
  }
  async function quitarMiembro(id) {
    await supabase.from("equipo_miembros").delete().eq("id", id); loadMiembros();
  }

  if (cursos.length === 0) return <div className="empty"><div className="empty-icon">👥</div><div className="empty-title">Primero creá un curso</div></div>;

  const getMiembrosDeEquipo = (equipoId) => miembros.filter(m => m.equipo_id === equipoId);
  const alumnosDisponibles = (equipoId) => {
    // Excluir alumnos que ya están en cualquier equipo (no solo en este)
    const yaEnCualquierEquipo = miembros.map(m => m.alumno_id);
    const yaEnEsteEquipo = getMiembrosDeEquipo(equipoId).map(m => m.alumno_id);
    return alumnos.filter(a => !yaEnCualquierEquipo.includes(a.id) || yaEnEsteEquipo.includes(a.id));
  };

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      <div className="card">
        <div className="section-title" style={{ marginBottom: 20 }}>Nuevo equipo</div>
        <Msg msg={msg} />
        <form onSubmit={crear}>
          <div className="form-group"><label className="form-label">Curso</label><select className="form-select" value={form.curso_id} onChange={e => set("curso_id", e.target.value)} required>{cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
          <div className="form-group"><label className="form-label">Nombre del equipo</label><input className="form-input" type="text" placeholder="Ej: Equipo Alpha" value={form.nombre} onChange={e => set("nombre", e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Descripción (opcional)</label><textarea className="form-textarea" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} style={{ minHeight: 56 }} /></div>
          <button className="btn btn-primary" disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear equipo"}</button>
        </form>
      </div>

      <div>
        <div className="section-title" style={{ marginBottom: 14 }}>Equipos y miembros</div>
        {equipos.length === 0 ? <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay equipos</div></div>
          : equipos.map(eq => {
            const curso = cursos.find(c => c.id === eq.curso_id);
            const mbs = getMiembrosDeEquipo(eq.id);
            const disponibles = alumnosDisponibles(eq.id);
            return (
              <div key={eq.id} className="card" style={{ marginBottom: 12, padding: "14px 16px" }}>
                {/* Header con edición inline del nombre/descripción */}
                <EditableRow
                  fields={[
                    { key: "nombre", label: "Nombre", value: eq.nombre },
                    { key: "descripcion", label: "Descripción", value: eq.descripcion, type: "textarea" },
                  ]}
                  onSave={vals => editar(eq.id, vals)}
                  onDelete={() => eliminar(eq.id)}
                  deleteConfirm="¿Eliminar este equipo y sus miembros?"
                >
                  <div style={{ fontWeight: 500 }}>{eq.nombre}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{curso?.nombre} · {mbs.length} miembro(s)</div>
                </EditableRow>

                {/* Lista de miembros */}
                <div style={{ marginTop: 8 }}>
                  {mbs.map(m => (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "var(--bg3)", borderRadius: 8, marginBottom: 4 }}>
                      <div>
                        <span style={{ fontSize: 14 }}>{m.profiles?.nombre}</span>
                        <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}>{m.profiles?.email}</span>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "3px 8px", fontSize: 12 }} onClick={() => quitarMiembro(m.id)}>Quitar</button>
                    </div>
                  ))}
                  {disponibles.length > 0 && (
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <select className="form-select" style={{ fontSize: 13 }} value={addAlumno[eq.id] || ""} onChange={e => setAddAlumno(a => ({ ...a, [eq.id]: e.target.value }))}>
                        <option value="">+ Agregar alumno...</option>
                        {disponibles.map(a => <option key={a.id} value={a.id}>{a.nombre} — {a.email}</option>)}
                      </select>
                      <button className="btn btn-ghost btn-sm" onClick={() => agregarMiembro(eq.id, addAlumno[eq.id])}>Agregar</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ── Tab Entregas (docente) ─────────────────────────────────
function TabEntregas({ entregas, tareas, modulos, cursos, equipos, profile, filterEstado, reload }) {
  const [filterCurso, setFilterCurso] = useState("todos");
  const [filterModulo, setFilterModulo] = useState("todos");
  const [filterTarea, setFilterTarea] = useState("todas");
  const [filterEquipo, setFilterEquipo] = useState("todos");
  const [selected, setSelected] = useState(null);

  async function handleEvaluar(id, estado, comentario) {
    await supabase.from("entregas").update({ estado, comentario_docente: comentario || null, evaluado_por: profile.id, evaluado_at: new Date().toISOString() }).eq("id", id);
    reload();
  }

  const modulosFiltrados = filterCurso === "todos" ? modulos : modulos.filter(m => m.curso_id === filterCurso);
  const tareasFiltradas = filterModulo === "todos"
    ? (filterCurso === "todos" ? tareas : tareas.filter(t => t.curso_id === filterCurso))
    : tareas.filter(t => t.modulo_id === filterModulo);
  const equiposFiltrados = filterCurso === "todos" ? equipos : equipos.filter(eq => eq.curso_id === filterCurso);

  const lista = entregas.filter(e => {
    if (filterEstado !== "todas" && e.estado !== filterEstado) return false;
    if (filterCurso !== "todos" && e.curso_id !== filterCurso) return false;
    if (filterModulo !== "todos") {
      const tarea = tareas.find(t => t.id === e.tarea_id);
      if (!tarea || tarea.modulo_id !== filterModulo) return false;
    }
    if (filterTarea !== "todas" && e.tarea_id !== filterTarea) return false;
    if (filterEquipo !== "todos" && e.equipo_id !== filterEquipo) return false;
    return true;
  });

  // Group by tarea for display
  const tareaIds = [...new Set(lista.map(e => e.tarea_id))];

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <select className="form-select" style={{ maxWidth: 180 }} value={filterCurso} onChange={e => { setFilterCurso(e.target.value); setFilterModulo("todos"); setFilterTarea("todas"); setFilterEquipo("todos"); }}>
          <option value="todos">Todos los cursos</option>
          {cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select className="form-select" style={{ maxWidth: 200 }} value={filterModulo} onChange={e => { setFilterModulo(e.target.value); setFilterTarea("todas"); }}>
          <option value="todos">Todos los módulos</option>
          {modulosFiltrados.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        <select className="form-select" style={{ maxWidth: 220 }} value={filterTarea} onChange={e => setFilterTarea(e.target.value)}>
          <option value="todas">Todas las tareas</option>
          {tareasFiltradas.map(t => <option key={t.id} value={t.id}>{t.titulo}</option>)}
        </select>
        <select className="form-select" style={{ maxWidth: 180 }} value={filterEquipo} onChange={e => setFilterEquipo(e.target.value)}>
          <option value="todos">Todos los equipos</option>
          {equiposFiltrados.map(eq => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
        </select>
      </div>

      {lista.length === 0 ? (
        <div className="empty"><div className="empty-icon">📭</div><div className="empty-title">Sin entregas en esta sección</div></div>
      ) : (
        tareaIds.map(tareaId => {
          const tarea = tareas.find(t => t.id === tareaId);
          const entregasDeTarea = lista.filter(e => e.tarea_id === tareaId);
          const mod = tarea?.modulo_id ? modulos.find(m => m.id === tarea.modulo_id) : null;
          return (
            <div key={tareaId || "sin-tarea"} className="card" style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                {mod && <span className="modulo-label">{mod.nombre}</span>}
                <span style={{ fontWeight: 500 }}>{tarea?.titulo || "Sin tarea"}</span>
                <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: "auto" }}>{entregasDeTarea.length} entrega(s)</span>
              </div>
              {entregasDeTarea.map(entrega => {
                const equipo = equipos.find(eq => eq.id === entrega.equipo_id);
                return (
                  <div key={entrega.id} className="entrega-row" onClick={() => setSelected({ ...entrega, equipo: equipo?.nombre })}>
                    <img className="entrega-row-thumb" src={`https://img.youtube.com/vi/${entrega.youtube_id}/mqdefault.jpg`} alt="" loading="lazy" />
                    <div className="entrega-row-info">
                      <div className="entrega-row-name">{entrega.profiles?.nombre || "Alumno"}</div>
                      <div className="entrega-row-sub">
                        {equipo && <span className="equipo-chip" style={{ marginRight: 6 }}>👥 {equipo.nombre}</span>}
                        {formatDate(entrega.created_at)}
                      </div>
                    </div>
                    <Badge estado={entrega.estado} />
                  </div>
                );
              })}
            </div>
          );
        })
      )}
      {selected && <VideoModal entrega={selected} profile={profile} onClose={() => setSelected(null)} onEvaluar={handleEvaluar} />}
    </>
  );
}

// ── Docente View (solo entregas) ───────────────────────────
function DocenteView({ profile }) {
  const [cursos, setCursos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entregaTab, setEntregaTab] = useState("pendiente");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const [c, mod, t, eq, e] = await Promise.all([
      supabase.from("cursos").select("*").order("nombre"),
      supabase.from("modulos").select("*").order("orden"),
      supabase.from("tareas").select("*").order("created_at"),
      supabase.from("equipos").select("*").order("nombre"),
      supabase.from("entregas").select("*, profiles!entregas_alumno_id_fkey(nombre, email), cursos(nombre), tareas(titulo)").order("created_at", { ascending: false }),
    ]);
    if (c.data) setCursos(c.data);
    if (mod.data) setModulos(mod.data);
    if (t.data) setTareas(t.data);
    if (eq.data) setEquipos(eq.data);
    if (e.data) setEntregas(e.data);
    setLoading(false);
  }

  const stats = {
    pendientes: entregas.filter(e => e.estado === "pendiente").length,
    aprobadas: entregas.filter(e => e.estado === "aprobado").length,
    desaprobadas: entregas.filter(e => e.estado === "desaprobado").length,
  };

  const ETABS = [
    { id: "pendiente", label: "Pendientes", n: stats.pendientes },
    { id: "aprobado", label: "Aprobadas", n: stats.aprobadas },
    { id: "desaprobado", label: "Desaprobadas", n: stats.desaprobadas },
    { id: "todas", label: "Todas" },
  ];

  return (
    <main className="main">
      <div className="page-title">Panel docente</div>
      <div className="page-sub">Hola, {profile.nombre}</div>

      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="stat-card"><div className="stat-num" style={{ color: "var(--amber)" }}>{stats.pendientes}</div><div className="stat-label">Pendientes de revisión</div></div>
        <div className="stat-card"><div className="stat-num" style={{ color: "var(--green)" }}>{stats.aprobadas}</div><div className="stat-label">Aprobadas</div></div>
        <div className="stat-card"><div className="stat-num" style={{ color: "var(--red)" }}>{stats.desaprobadas}</div><div className="stat-label">Desaprobadas</div></div>
      </div>

      <div className="tabs">
        {ETABS.map(et => (
          <button key={et.id} className={`tab-btn ${entregaTab === et.id ? "active" : ""}`} onClick={() => setEntregaTab(et.id)}>
            {et.label}
            {et.n > 0 && <span style={{ marginLeft: 5, fontSize: 11, background: "var(--amber-bg)", color: "var(--amber)", padding: "1px 6px", borderRadius: 10 }}>{et.n}</span>}
          </button>
        ))}
      </div>

      {loading ? <div className="loading-center"><Spinner /> Cargando...</div> : (
        <TabEntregas entregas={entregas} tareas={tareas} modulos={modulos} cursos={cursos} equipos={equipos} profile={profile} filterEstado={entregaTab} reload={loadData} />
      )}
    </main>
  );
}

// ── Admin View (ABMs) ──────────────────────────────────────
function AdminView({ profile }) {
  const [tab, setTab] = useState("cursos");
  const [cursos, setCursos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const [c, mod, t, eq, al] = await Promise.all([
      supabase.from("cursos").select("*").order("nombre"),
      supabase.from("modulos").select("*").order("orden"),
      supabase.from("tareas").select("*").order("created_at"),
      supabase.from("equipos").select("*").order("nombre"),
      supabase.from("profiles").select("*").eq("rol", "alumno").order("nombre"),
    ]);
    if (c.data) setCursos(c.data);
    if (mod.data) setModulos(mod.data);
    if (t.data) setTareas(t.data);
    if (eq.data) setEquipos(eq.data);
    if (al.data) setAlumnos(al.data);
    setLoading(false);
  }

  const TABS = [
    { id: "cursos", label: "Cursos" },
    { id: "modulos", label: "Módulos" },
    { id: "tareas", label: "Tareas" },
    { id: "equipos", label: "Equipos" },
  ];

  return (
    <main className="main">
      <div className="page-title">Panel administrador</div>
      <div className="page-sub">Hola, {profile.nombre} — gestioná los contenidos del curso</div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card"><div className="stat-num">{cursos.length}</div><div className="stat-label">Cursos</div></div>
        <div className="stat-card"><div className="stat-num">{modulos.length}</div><div className="stat-label">Módulos</div></div>
        <div className="stat-card"><div className="stat-num">{tareas.length}</div><div className="stat-label">Tareas</div></div>
        <div className="stat-card"><div className="stat-num">{equipos.length}</div><div className="stat-label">Equipos</div></div>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? <div className="loading-center"><Spinner /> Cargando...</div> : (
        <>
          {tab === "cursos" && <TabCursos cursos={cursos} tareas={tareas} modulos={modulos} equipos={equipos} reload={loadData} />}
          {tab === "modulos" && <TabModulos cursos={cursos} modulos={modulos} tareas={tareas} reload={loadData} />}
          {tab === "tareas" && <TabTareas cursos={cursos} modulos={modulos} tareas={tareas} reload={loadData} />}
          {tab === "equipos" && <TabEquipos cursos={cursos} equipos={equipos} alumnos={alumnos} reload={loadData} />}
        </>
      )}
    </main>
  );
}

// ── Navbar ─────────────────────────────────────────────────
function Navbar({ profile }) {
  async function logout() { await supabase.auth.signOut(); }
  return (
    <nav className="nav">
      <img src={LOGO} alt="Logo" style={{ height: 36, display: "block" }} />
      <div className="nav-right">
        {profile && <><span className="nav-user">{profile.nombre}</span><span className={`nav-role ${profile.rol}`}>{profile.rol}</span></>}
        <button className="btn btn-ghost btn-sm" onClick={logout}>Salir</button>
      </div>
    </nav>
  );
}

// ── Root App ───────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session); if (!session) setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) supabase.from("profiles").select("*").eq("id", session.user.id).single().then(({ data }) => setProfile(data));
  }, [session]);

  if (session === undefined) return <><StyleInjector /><div className="loading-center" style={{ minHeight: "100vh" }}><Spinner /> Cargando...</div></>;

  return (
    <AuthCtx.Provider value={{ session, profile }}>
      <StyleInjector />
      <div className="app">
        {!session ? <AuthPage /> : !profile
          ? <div className="loading-center" style={{ minHeight: "100vh" }}><Spinner /> Cargando perfil...</div>
          : <><Navbar profile={profile} />{profile.rol === "alumno" ? <AlumnoView profile={profile} /> : profile.rol === "admin" ? <AdminView profile={profile} /> : <DocenteView profile={profile} />}</>}
      </div>
    </AuthCtx.Provider>
  );
}
