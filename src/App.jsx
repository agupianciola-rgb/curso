import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgNDIwIDkwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjkwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB4PSI4IiB5PSI4IiB3aWR0aD0iNzQiIGhlaWdodD0iNzQiIHJ4PSIxNCIgZmlsbD0iIzFhM2EyYSIvPgo8cG9seWdvbiBwb2ludHM9IjQ1LDE4IDE5LDM1IDcxLDM1IiBmaWxsPSIjM2VjZjhlIi8+CjxyZWN0IHg9IjI4IiB5PSIzOCIgd2lkdGg9IjM0IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iIzNlY2Y4ZSIvPgo8bGluZSB4MT0iNzEiIHkxPSIyNyIgeDI9IjcxIiB5Mj0iNDYiIHN0cm9rZT0iIzNlY2Y4ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGNpcmNsZSBjeD0iNzEiIGN5PSI0OCIgcj0iMyIgZmlsbD0iIzNlY2Y4ZSIvPgo8dGV4dCB4PSI5NiIgeT0iNDIiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjayxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjZjRmMGU4Ij5QT1JURk9MSU88L3RleHQ+Cjx0ZXh0IHg9Ijk2IiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiMzZWNmOGUiPk3DiURJQ088L3RleHQ+Cjwvc3ZnPg==";
const LOGO_LOGIN = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgNDIwIDkwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjkwIiBmaWxsPSIjMTYxNzE4Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI3NCIgaGVpZ2h0PSI3NCIgcng9IjE0IiBmaWxsPSIjMWEzYTJhIi8+Cjxwb2x5Z29uIHBvaW50cz0iNDUsMTggMTksMzUgNzEsMzUiIGZpbGw9IiMzZWNmOGUiLz4KPHJlY3QgeD0iMjgiIHk9IjM4IiB3aWR0aD0iMzQiIGhlaWdodD0iMjAiIHJ4PSIzIiBmaWxsPSIjM2VjZjhlIi8+CjxsaW5lIHgxPSI3MSIgeTE9IjI3IiB4Mj0iNzEiIHkyPSI0NiIgc3Ryb2tlPSIjM2VjZjhlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSI3MSIgY3k9IjQ4IiByPSIzIiBmaWxsPSIjM2VjZjhlIi8+Cjx0ZXh0IHg9Ijk2IiB5PSI0MiIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNmNGYwZTgiPlBPUlRGT0xJTzwvdGV4dD4KPHRleHQgeD0iOTYiIHk9IjcwIiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzNlY2Y4ZSI+TcOJRElDTzwvdGV4dD4KPC9zdmc+";
const LOGO_FAVICON = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzFhM2EyYSIvPgo8cG9seWdvbiBwb2ludHM9IjE2LDUgNCwxMiAyOCwxMiIgZmlsbD0iIzNlY2Y4ZSIvPgo8cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjkiIHJ4PSIyIiBmaWxsPSIjM2VjZjhlIi8+CjxsaW5lIHgxPSIyOCIgeTE9IjgiIHgyPSIyOCIgeTI9IjE3IiBzdHJva2U9IiMzZWNmOGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGNpcmNsZSBjeD0iMjgiIGN5PSIxOCIgcj0iMS41IiBmaWxsPSIjM2VjZjhlIi8+Cjwvc3ZnPg==";


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

// Resuelve qué docente corresponde a una entrega según la matriz de asignaciones
async function resolveDocente(cursoId, equipoId, moduloId) {
  // 1. Buscar match exacto equipo + módulo
  const { data: exacto } = await supabase.from("asignaciones")
    .select("docente_id").eq("curso_id", cursoId)
    .eq("equipo_id", equipoId || null).eq("modulo_id", moduloId || null).maybeSingle();
  if (exacto) return exacto.docente_id;

  // 2. Match solo por equipo (cualquier módulo → default de ese equipo)
  if (equipoId) {
    const { data: porEquipo } = await supabase.from("asignaciones")
      .select("docente_id").eq("curso_id", cursoId)
      .eq("equipo_id", equipoId).is("modulo_id", null).maybeSingle();
    if (porEquipo) return porEquipo.docente_id;
  }

  // 3. Match solo por módulo (cualquier equipo → default de ese módulo)
  if (moduloId) {
    const { data: porModulo } = await supabase.from("asignaciones")
      .select("docente_id").eq("curso_id", cursoId)
      .is("equipo_id", null).eq("modulo_id", moduloId).maybeSingle();
    if (porModulo) return porModulo.docente_id;
  }

  // 4. Default general del curso
  const { data: defecto } = await supabase.from("asignaciones")
    .select("docente_id").eq("curso_id", cursoId)
    .eq("es_default", true).maybeSingle();
  if (defecto) return defecto.docente_id;

  return null;
}

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
  .badge-rehacer { background:rgba(96,165,250,0.1); color:var(--blue); border:1px solid rgba(96,165,250,0.25); }
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
  .modal-overlay { position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.85); display:flex; align-items:flex-start; justify-content:center; padding:24px; overflow-y:auto; animation:fadeIn 0.15s ease; }
  .modal { background:var(--bg2); border:1px solid var(--border2); border-radius:var(--radius-lg); width:100%; max-width:800px; overflow:hidden; animation:slideUp 0.2s ease; margin:auto; }
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
  .toggle-wrap { display:flex; align-items:center; gap:8px; cursor:pointer; }
  .toggle { width:36px; height:20px; border-radius:10px; border:none; position:relative; cursor:pointer; transition:background 0.2s; flex-shrink:0; }
  .toggle.on { background:var(--green); }
  .toggle.off { background:var(--border2); }
  .toggle::after { content:''; position:absolute; width:14px; height:14px; border-radius:50%; background:#fff; top:3px; transition:left 0.2s; }
  .toggle.on::after { left:19px; }
  .toggle.off::after { left:3px; }
  .vigente-chip { font-size:11px; font-weight:600; padding:2px 8px; border-radius:20px; background:rgba(74,222,128,0.1); color:var(--green); border:1px solid rgba(74,222,128,0.25); }
  .tipo-badge-video { background:rgba(96,165,250,0.1); color:var(--blue); border:1px solid rgba(96,165,250,0.2); }
  .tipo-badge-imagen { background:rgba(45,212,191,0.1); color:var(--teal); border:1px solid rgba(45,212,191,0.2); }
  .imagen-preview { width:100%; max-height:320px; object-fit:contain; border-radius:var(--radius); background:var(--bg3); display:block; cursor:zoom-in; }
  .imagen-thumb { width:64px; height:36px; object-fit:cover; border-radius:4px; flex-shrink:0; }
  .upload-area { border:2px dashed var(--border2); border-radius:var(--radius); padding:24px; text-align:center; cursor:pointer; transition:border-color 0.2s; }
  .upload-area:hover { border-color:var(--accent2); }
  .upload-area.has-file { border-style:solid; border-color:var(--accent2); background:rgba(232,213,163,0.04); }
  /* Matriz de asignaciones */
  .matrix-wrap { overflow-x:auto; }
  .matrix-table { border-collapse:collapse; width:100%; min-width:500px; font-size:13px; }
  .matrix-table th { background:var(--bg3); color:var(--text2); font-weight:500; padding:8px 12px; border:1px solid var(--border2); text-align:center; white-space:nowrap; }
  .matrix-table th.row-header { text-align:left; min-width:120px; }
  .matrix-table td { border:1px solid var(--border); padding:4px 6px; vertical-align:middle; }
  .matrix-table td select { background:var(--bg3); border:1px solid var(--border2); border-radius:6px; padding:4px 8px; color:var(--text); font-size:12px; font-family:inherit; outline:none; width:100%; min-width:130px; cursor:pointer; }
  .matrix-table td select:focus { border-color:var(--accent2); }
  .matrix-default-row td { background:rgba(232,213,163,0.03); }
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
    // Título de la pestaña
    document.title = "Portfolio Médico";
    // Favicon dinámico
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = LOGO_FAVICON;
    return () => document.head.removeChild(el);
  }, []);
  return null;
}
function Spinner() { return <span className="spinner">⟳</span>; }
function Badge({ estado }) {
  const map = { pendiente: "Pendiente", aprobado: "Aprobado", desaprobado: "Desaprobado", sinentrega: "Sin entrega", vencida: "Vencida", rehacer: "Rehacer" };
  return <span className={`badge badge-${estado}`}>● {map[estado] || estado}</span>;
}
function Msg({ msg }) {
  if (!msg) return null;
  return <div className={`alert alert-${msg.type}`}>{msg.text}</div>;
}

// ── Auth Page ──────────────────────────────────────────────
function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vista, setVista] = useState("login"); // "login" | "recuperar" | "enviado"
  const [emailRecup, setEmailRecup] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    if (error) setError("Email o contraseña incorrectos");
    setLoading(false);
  }

  async function handleRecuperar(e) {
    e.preventDefault(); setLoading(true); setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(emailRecup, {
      redirectTo: window.location.origin,
    });
    if (error) setError(error.message);
    else setVista("enviado");
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={LOGO_LOGIN} alt="Logo" style={{ width: "100%", maxWidth: 280, marginBottom: 20, display: "block", borderRadius: 8 }} />
        <div className="auth-sub">Plataforma de entregas y evaluaciones</div>

        {vista === "login" && (
          <>
            {error && <div className="auth-error" style={{ marginTop: 16 }}>{error}</div>}
            <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="tu@email.com" value={form.email} onChange={e => set("email", e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Contraseña</label><input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} required /></div>
              <button className="btn btn-primary btn-full" style={{ marginTop: 8 }} disabled={loading}>{loading ? <><Spinner /> Ingresando...</> : "Ingresar"}</button>
            </form>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button onClick={() => { setVista("recuperar"); setError(""); }} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--text3)", textAlign: "center" }}>
              Para obtener acceso contactá al administrador
            </div>
          </>
        )}

        {vista === "recuperar" && (
          <>
            <div style={{ marginTop: 20, marginBottom: 8, fontSize: 14, color: "var(--text2)" }}>
              Ingresá tu email y te mandamos un link para restablecer tu contraseña.
            </div>
            {error && <div className="auth-error" style={{ marginBottom: 12 }}>{error}</div>}
            <form onSubmit={handleRecuperar}>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="tu@email.com" value={emailRecup} onChange={e => setEmailRecup(e.target.value)} required /></div>
              <button className="btn btn-primary btn-full" disabled={loading}>{loading ? <><Spinner /> Enviando...</> : "Enviar link"}</button>
            </form>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button onClick={() => { setVista("login"); setError(""); }} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                ← Volver al login
              </button>
            </div>
          </>
        )}

        {vista === "enviado" && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>Revisá tu email</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20, lineHeight: 1.6 }}>
              Te enviamos un link a <strong>{emailRecup}</strong> para restablecer tu contraseña. Revisá también la carpeta de spam.
            </div>
            <button onClick={() => { setVista("login"); setEmailRecup(""); }} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
              ← Volver al login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reset Password Page ────────────────────────────────────
function ResetPasswordPage({ onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setError("");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres");
    if (password !== confirm) return setError("Las contraseñas no coinciden");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setOk(true);
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={LOGO_LOGIN} alt="Logo" style={{ width: "100%", maxWidth: 280, marginBottom: 20, display: "block", borderRadius: 8 }} />
        {ok ? (
          <div style={{ textAlign: "center", paddingTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>Contraseña actualizada</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Ya podés ingresar con tu nueva contraseña.</div>
            <button className="btn btn-primary btn-full" onClick={onDone}>Ir al login</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, marginTop: 8 }}>Nueva contraseña</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Elegí una nueva contraseña para tu cuenta.</div>
            {error && <div className="auth-error" style={{ marginBottom: 12 }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Nueva contraseña</label><input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Confirmar contraseña</label><input className="form-input" type="password" placeholder="Repetí la contraseña" value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
              <button className="btn btn-primary btn-full" disabled={loading}>{loading ? <><Spinner /> Guardando...</> : "Guardar contraseña"}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Video/Imagen Modal ─────────────────────────────────────
function VideoModal({ entrega, profile, onClose, onEvaluar }) {
  const [comentario, setComentario] = useState(entrega.comentario_docente || "");
  const [loading, setLoading] = useState(false);
  const [entregaAnterior, setEntregaAnterior] = useState(null);
  const canEvaluar = profile?.rol === "docente" && entrega.estado === "pendiente";
  const esImagen = !!entrega.imagen_url;
  const es2doIntento = (entrega.intento || 1) === 2;

  useEffect(() => {
    if (es2doIntento && entrega.entrega_anterior_id) {
      supabase.from("entregas").select("*").eq("id", entrega.entrega_anterior_id).single()
        .then(({ data }) => setEntregaAnterior(data));
    }
  }, [entrega.id]);

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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="modal-title">{entrega.titulo}</div>
              {es2doIntento && <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(96,165,250,0.15)", color: "var(--blue)", border: "1px solid rgba(96,165,250,0.3)", padding: "2px 8px", borderRadius: 20 }}>2do intento</span>}
            </div>
            {entrega.tareas && <div style={{ fontSize: 12, color: "var(--purple)", marginTop: 2 }}>📋 {entrega.tareas?.nombre || entrega.tareas?.titulo}</div>}
            {entrega.profiles && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 2 }}>por {entrega.profiles?.nombre}</div>}
            {entrega.equipo && <div style={{ marginTop: 4 }}><span className="equipo-chip">👥 {entrega.equipo}</span></div>}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-video">
          {esImagen ? (
            <img src={entrega.imagen_url} alt={entrega.titulo} style={{ width: "100%", maxHeight: 380, objectFit: "contain", borderRadius: 8, background: "var(--bg3)", display: "block" }} />
          ) : (
            <div className="modal-iframe-wrap">
              <iframe src={`https://www.youtube.com/embed/${entrega.youtube_id}?autoplay=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          )}
        </div>

        {/* Entrega anterior (solo para docente en 2do intento) */}
        {es2doIntento && entregaAnterior && profile?.rol === "docente" && (
          <div style={{ margin: "0 24px 4px", background: "var(--bg3)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--red)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Primera entrega (desaprobada)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {entregaAnterior.imagen_url ? (
                <img src={entregaAnterior.imagen_url} style={{ width: 80, height: 45, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} alt="" />
              ) : entregaAnterior.youtube_id ? (
                <img src={`https://img.youtube.com/vi/${entregaAnterior.youtube_id}/mqdefault.jpg`} style={{ width: 80, height: 45, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} alt="" />
              ) : null}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>Subida el {formatDate(entregaAnterior.created_at)}</div>
                {entregaAnterior.comentario_docente && (
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>💬 "{entregaAnterior.comentario_docente}"</div>
                )}
              </div>
            </div>
          </div>
        )}

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
                <button className="btn btn-danger" onClick={() => evaluar("desaprobado")} disabled={loading}>
                  {loading ? <Spinner /> : "✕"} {es2doIntento ? "Desaprobar (definitivo)" : "Desaprobar"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Subir entrega (video o imagen según tipo de tarea) ─────
function SubirVideoForm({ tarea, alumnoId, equipoId, onGuardado, entregaAnterior }) {
  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const esImagen = tarea.tipo === "imagen";
  const esRehacer = !!entregaAnterior;

  function handleArchivo(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setMsg({ type: "error", text: "Solo se aceptan imágenes (JPG, PNG, etc.)" });
    if (file.size > 5 * 1024 * 1024) return setMsg({ type: "error", text: "La imagen no puede superar 5MB" });
    setArchivo(file); setPreview(URL.createObjectURL(file)); setMsg(null);
  }

  async function handleSubmit(e) {
    e.preventDefault(); setMsg(null); setLoading(true);
    const moduloId = tarea.modulo_id || null;
    const docenteId = await resolveDocente(tarea.curso_id, equipoId || null, moduloId);
    const intento = esRehacer ? 2 : 1;
    const entrega_anterior_id = esRehacer ? entregaAnterior.id : null;

    if (esImagen) {
      if (!archivo) { setMsg({ type: "error", text: "Seleccioná una imagen" }); setLoading(false); return; }
      const ext = archivo.name.split(".").pop();
      const path = `${alumnoId}/${tarea.id}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("entregas-imagenes").upload(path, archivo);
      if (uploadError) { setMsg({ type: "error", text: uploadError.message }); setLoading(false); return; }
      const { data: urlData } = supabase.storage.from("entregas-imagenes").getPublicUrl(path);
      const { error } = await supabase.from("entregas").insert({
        alumno_id: alumnoId, curso_id: tarea.curso_id, tarea_id: tarea.id,
        equipo_id: equipoId || null, titulo: titulo || tarea.titulo, descripcion,
        imagen_url: urlData.publicUrl, youtube_url: null, youtube_id: null,
        docente_asignado_id: docenteId, intento, entrega_anterior_id,
      });
      if (error) setMsg({ type: "error", text: error.message });
      else { setAbierto(false); setArchivo(null); setPreview(null); setTitulo(""); setDescripcion(""); onGuardado(); }
    } else {
      const ytId = extractYoutubeId(url);
      if (!ytId) { setMsg({ type: "error", text: "URL de YouTube inválida" }); setLoading(false); return; }
      const { error } = await supabase.from("entregas").insert({
        alumno_id: alumnoId, curso_id: tarea.curso_id, tarea_id: tarea.id,
        equipo_id: equipoId || null, titulo: titulo || tarea.titulo, descripcion,
        youtube_url: url, youtube_id: ytId, imagen_url: null,
        docente_asignado_id: docenteId, intento, entrega_anterior_id,
      });
      if (error) setMsg({ type: "error", text: error.message });
      else { setAbierto(false); setUrl(""); setTitulo(""); setDescripcion(""); onGuardado(); }
    }
    setLoading(false);
  }

  if (!abierto) return (
    <button className="btn btn-primary btn-sm" onClick={() => setAbierto(true)}
      style={esRehacer ? { background: "rgba(96,165,250,0.15)", color: "var(--blue)", border: "1px solid rgba(96,165,250,0.3)" } : {}}>
      {esRehacer ? "↩ Rehacer entrega" : `+ Subir ${esImagen ? "imagen" : "video"}`}
    </button>
  );

  return (
    <div className="subir-form">
      <Msg msg={msg} />
      <form onSubmit={handleSubmit}>
        {esImagen ? (
          <div className="form-group">
            <label className="form-label">Imagen</label>
            <label className={`upload-area ${archivo ? "has-file" : ""}`}>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleArchivo} />
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: 160, maxWidth: "100%", objectFit: "contain", borderRadius: 6 }} />
              ) : (
                <div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
                  <div style={{ fontSize: 14, color: "var(--text2)" }}>Clic para seleccionar imagen</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>JPG, PNG, WEBP · máx 5MB</div>
                </div>
              )}
            </label>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Link de YouTube</label>
            <input className="form-input" type="url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={e => setUrl(e.target.value)} required />
          </div>
        )}
        <div className="form-group"><label className="form-label">Título (opcional)</label><input className="form-input" type="text" placeholder={tarea.titulo} value={titulo} onChange={e => setTitulo(e.target.value)} /></div>
        <div className="form-group"><label className="form-label">Comentario (opcional)</label><textarea className="form-textarea" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={{ minHeight: 56 }} /></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary btn-sm" disabled={loading}>{loading ? <><Spinner /> Enviando...</> : "Enviar"}</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAbierto(false); setPreview(null); setArchivo(null); }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

// ── Tarea card (alumno) ────────────────────────────────────
function TareaCardAlumno({ tarea, entrega, alumnoId, equipoId, onGuardado, onVerVideo }) {
  const vencida = isVencida(tarea.fecha_limite) && !entrega;
  const esImagen = tarea.tipo === "imagen";
  const esRehacer = entrega?.estado === "rehacer";

  function thumbSrc() {
    if (!entrega) return null;
    if (esImagen) return entrega.imagen_url;
    return `https://img.youtube.com/vi/${entrega.youtube_id}/mqdefault.jpg`;
  }

  return (
    <div className="tarea-card">
      <div className="tarea-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {tarea.orden && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 6, padding: "1px 7px", flexShrink: 0 }}>#{tarea.orden}</span>}
            <div className="tarea-titulo">{tarea.titulo}</div>
            <span className={`tipo-badge ${esImagen ? "tipo-badge-imagen" : "tipo-badge-video"}`}>
              {esImagen ? "🖼️ Imagen" : "▶ Video"}
            </span>
          </div>
          {tarea.descripcion && <div className="tarea-desc">{tarea.descripcion}</div>}
          {tarea.fecha_limite && <div className="tarea-meta" style={{ color: vencida ? "var(--red)" : "var(--text3)" }}>⏰ {vencida ? "Venció" : "Vence"}: {formatDatetime(tarea.fecha_limite)}</div>}
        </div>
        <div style={{ flexShrink: 0 }}>
          {entrega ? <Badge estado={entrega.estado} /> : vencida ? <Badge estado="vencida" /> : <Badge estado="sinentrega" />}
        </div>
      </div>
      <div className="tarea-body">
        {entrega && !esRehacer ? (
          <>
            <div className="tarea-entrega-preview" onClick={() => onVerVideo(entrega)}>
              <img src={thumbSrc()} alt="" style={{ width: 64, height: 36, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entrega.titulo}</div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>Subido el {formatDate(entrega.created_at)} · clic para ver</div>
              </div>
            </div>
            {entrega.comentario_docente && <div className="modal-comment">💬 {entrega.comentario_docente}</div>}
          </>
        ) : esRehacer ? (
          <div>
            <div style={{ marginBottom: 10, padding: "10px 12px", background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)", marginBottom: 4 }}>Entrega desaprobada — podés subir una nueva versión</div>
              {entrega.comentario_docente && <div style={{ fontSize: 12, color: "var(--text2)" }}>💬 "{entrega.comentario_docente}"</div>}
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>Entrega anterior del {formatDate(entrega.created_at)} · <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => onVerVideo(entrega)}>ver</span></div>
            </div>
            <SubirVideoForm tarea={tarea} alumnoId={alumnoId} equipoId={equipoId} onGuardado={onGuardado} entregaAnterior={entrega} />
          </div>
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
  const [filtroEstado, setFiltroEstado] = useState("ninguno");
  const [filtroModulo, setFiltroModulo] = useState("todos");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    // Obtener solo el curso vigente
    const { data: cursoVigente } = await supabase.from("cursos").select("*").eq("vigente", true).maybeSingle();
    const cursoId = cursoVigente?.id;

    const [mod, t, e, eq] = await Promise.all([
      cursoId ? supabase.from("modulos").select("*").eq("curso_id", cursoId).order("orden") : Promise.resolve({ data: [] }),
      cursoId ? supabase.from("tareas").select("*").eq("curso_id", cursoId).order("orden", { ascending: true }) : Promise.resolve({ data: [] }),
      supabase.from("entregas").select("*").eq("alumno_id", profile.id),
      supabase.from("equipo_miembros").select("*, equipos(id, nombre, curso_id)").eq("alumno_id", profile.id),
    ]);
    setCursos(cursoVigente ? [cursoVigente] : []);
    if (mod.data) setModulos(mod.data);
    if (t.data) setTareas(t.data);
    if (e.data) setEntregas(e.data);
    if (eq.data && eq.data.length > 0) setMiEquipo(eq.data[0].equipos);
    setLoading(false);
  }

  // Devuelve la entrega "activa" para mostrar en la card:
  // Si hay una 2da entrega (intento=2), la muestra. Sino la 1ra.
  const getEntrega = (tareaId) => {
    const todas = entregas.filter(e => e.tarea_id === tareaId);
    if (todas.length === 0) return null;
    const segunda = todas.find(e => e.intento === 2);
    if (segunda) return segunda;
    return todas[0];
  };

  const stats = {
    sinentrega: tareas.filter(t => !getEntrega(t.id)).length,
    aprobadas: entregas.filter(e => e.estado === "aprobado").length,
    pendientes: entregas.filter(e => e.estado === "pendiente").length,
    rehacer: entregas.filter(e => e.estado === "rehacer").length,
    desaprobadas: entregas.filter(e => e.estado === "desaprobado").length,
  };

  // Filtrar tareas según estado y módulo seleccionados
  function tareaVisible(tarea) {
    const entrega = getEntrega(tarea.id);
    if (filtroModulo !== "todos" && tarea.modulo_id !== filtroModulo) return false;
    if (filtroEstado === "ninguno") return true;
    if (filtroEstado === "aprobado") return entrega?.estado === "aprobado";
    if (filtroEstado === "pendiente") return entrega?.estado === "pendiente";
    if (filtroEstado === "desaprobado") return entrega?.estado === "desaprobado";
    if (filtroEstado === "rehacer") {
      // rehacer puede estar en la entrega activa O en alguna entrega de esa tarea
      const todasDeEsta = entregas.filter(e => e.tarea_id === tarea.id);
      return todasDeEsta.some(e => e.estado === "rehacer");
    }
    if (filtroEstado === "sinentrega") return !entrega;
    return true;
  }

  // Build: cursos → modulos → tareas (respetando filtros)
  const estructura = cursos.map(curso => {
    const modulosDeCurso = modulos.filter(m => m.curso_id === curso.id);
    const tareasSinModulo = tareas.filter(t => t.curso_id === curso.id && !t.modulo_id && tareaVisible(t));
    return {
      curso,
      modulosDeCurso: modulosDeCurso.map(mod => ({
        mod,
        tareasFiltradas: tareas.filter(t => t.modulo_id === mod.id && tareaVisible(t))
      })).filter(m => m.tareasFiltradas.length > 0),
      tareasSinModulo,
    };
  }).filter(g => g.modulosDeCurso.length > 0 || g.tareasSinModulo.length > 0);

  const equipoId = miEquipo?.id || null;

  function StatCard({ label, value, color, estado }) {
    const active = filtroEstado === estado;
    return (
      <div
        className="stat-card"
        onClick={() => setFiltroEstado(active ? "ninguno" : estado)}
        style={{ cursor: "pointer", transition: "all 0.15s", outline: active ? `2px solid ${color}` : "2px solid transparent", outlineOffset: 2, opacity: filtroEstado !== "ninguno" && !active ? 0.5 : 1 }}
      >
        <div className="stat-num" style={{ color }}>{value}</div>
        <div className="stat-label">{label}</div>
        {active && <div style={{ fontSize: 11, color, marginTop: 4 }}>● filtrando</div>}
      </div>
    );
  }

  return (
    <main className="main">
      <div className="page-title">Mis tareas</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <span className="page-sub" style={{ marginBottom: 0 }}>Hola, {profile.nombre}</span>
        {miEquipo && <span className="equipo-chip">👥 {miEquipo.nombre}</span>}
      </div>

      {/* Stats clickeables — orden: Sin entregar / En Revisión / Aprobadas / Rehacer / Desaprobadas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard label="Sin entregar" value={stats.sinentrega} color="var(--text2)" estado="sinentrega" />
        <StatCard label="En revisión" value={stats.pendientes} color="var(--amber)" estado="pendiente" />
        <StatCard label="Aprobadas" value={stats.aprobadas} color="var(--green)" estado="aprobado" />
        <StatCard label="Rehacer" value={stats.rehacer} color="var(--blue)" estado="rehacer" />
        <StatCard label="Desaprobadas" value={stats.desaprobadas} color="var(--red)" estado="desaprobado" />
      </div>

      {/* Filtro por módulo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <select
          className="form-select"
          style={{ maxWidth: 260, fontSize: 13 }}
          value={filtroModulo}
          onChange={e => setFiltroModulo(e.target.value)}
        >
          <option value="todos">Todos los módulos</option>
          {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        {(filtroEstado !== "ninguno" || filtroModulo !== "todos") && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setFiltroEstado("ninguno"); setFiltroModulo("todos"); }}
          >
            ✕ Limpiar filtros
          </button>
        )}
      </div>

      {loading ? <div className="loading-center"><Spinner /> Cargando...</div>
        : estructura.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📋</div>
            <div className="empty-title">{filtroEstado !== "ninguno" || filtroModulo !== "todos" ? "Sin tareas con ese filtro" : "No hay tareas todavía"}</div>
            <div className="empty-sub">{filtroEstado !== "ninguno" || filtroModulo !== "todos" ? "Probá cambiando los filtros" : "El docente aún no asignó tareas"}</div>
          </div>
        ) : estructura.map(({ curso, modulosDeCurso, tareasSinModulo }) => (
          <div key={curso.id} style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>{curso.nombre}</div>

            {modulosDeCurso.map(({ mod, tareasFiltradas }) => (
              <div key={mod.id} className="modulo-block">
                <div className="modulo-header">
                  <span className="modulo-label">Módulo</span>
                  <span className="modulo-name">{mod.nombre}</span>
                  {mod.descripcion && <span style={{ fontSize: 13, color: "var(--text2)" }}>— {mod.descripcion}</span>}
                </div>
                {tareasFiltradas.map(tarea => (
                  <TareaCardAlumno key={tarea.id} tarea={tarea} entrega={getEntrega(tarea.id)} alumnoId={profile.id} equipoId={equipoId} onGuardado={loadData} onVerVideo={setSelected} />
                ))}
              </div>
            ))}

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
    const { error } = await supabase.from("cursos").insert({ nombre: form.nombre, descripcion: form.descripcion, vigente: false });
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
  async function toggleVigente(id, actual) {
    if (actual) return; // si ya está vigente no hacer nada al clickear de nuevo
    const { error } = await supabase.from("cursos").update({ vigente: true }).eq("id", id);
    if (!error) reload();
  }

  const vigente = cursos.find(c => c.vigente);

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      <div className="card">
        <div className="section-title" style={{ marginBottom: 20 }}>Nuevo curso</div>
        <Msg msg={msg} />
        {!vigente && <div className="alert alert-error" style={{ marginBottom: 16 }}>⚠️ No hay ningún curso vigente. Marcá uno como vigente para que alumnos y docentes puedan usarlo.</div>}
        <form onSubmit={crear}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" type="text" placeholder="Ej: Residencia Anestesiología 2026" value={form.nombre} onChange={e => set("nombre", e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Descripción (opcional)</label><textarea className="form-textarea" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} /></div>
          <button className="btn btn-primary" disabled={loading}>{loading ? <><Spinner /> Creando...</> : "Crear curso"}</button>
        </form>
      </div>
      <div>
        <div className="section-title" style={{ marginBottom: 14 }}>Cursos</div>
        {cursos.length === 0 ? <div className="empty" style={{ padding: "24px 0" }}><div className="empty-sub">No hay cursos</div></div>
          : cursos.map(c => (
            <EditableRow key={c.id}
              fields={[{ key: "nombre", label: "Nombre", value: c.nombre }, { key: "descripcion", label: "Descripción", value: c.descripcion, type: "textarea" }]}
              onSave={vals => editar(c.id, vals)}
              onDelete={() => eliminar(c.id)}
              deleteConfirm="¿Eliminar este curso? Se eliminarán también sus módulos, tareas, equipos y entregas."
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="item-row-title" style={{ flex: 1 }}>{c.nombre}</div>
                {c.vigente && <span className="vigente-chip">● Vigente</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                <div className="item-row-sub">{modulos.filter(m => m.curso_id === c.id).length} módulo(s) · {tareas.filter(t => t.curso_id === c.id).length} tarea(s) · {equipos.filter(eq => eq.curso_id === c.id).length} equipo(s)</div>
                <label className="toggle-wrap" onClick={e => { e.stopPropagation(); toggleVigente(c.id, c.vigente); }}>
                  <div className={`toggle ${c.vigente ? "on" : "off"}`} />
                  <span style={{ fontSize: 12, color: c.vigente ? "var(--green)" : "var(--text3)" }}>{c.vigente ? "Curso vigente" : "Marcar vigente"}</span>
                </label>
              </div>
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
  const [form, setForm] = useState({ titulo: "", descripcion: "", curso_id: cursos[0]?.id || "", modulo_id: "", fecha_limite: "", tipo: "video" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [filterModulo, setFilterModulo] = useState("todos");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { if (cursos.length > 0 && !form.curso_id) setForm(f => ({ ...f, curso_id: cursos[0].id })); }, [cursos]);

  const modulosDelCurso = modulos.filter(m => m.curso_id === form.curso_id);

  // Calcula el próximo orden para el grupo curso+módulo
  function nextOrden(cursoId, moduloId) {
    const grupo = tareas.filter(t =>
      t.curso_id === cursoId &&
      (moduloId ? t.modulo_id === moduloId : !t.modulo_id)
    );
    return grupo.length > 0 ? Math.max(...grupo.map(t => t.orden || 0)) + 1 : 1;
  }

  // Renumera sin huecos el grupo curso+módulo después de un cambio
  async function reordenar(cursoId, moduloId) {
    await supabase.rpc("reordenar_tareas", {
      p_curso_id: cursoId,
      p_modulo_id: moduloId || null,
    });
  }

  async function crear(e) {
    e.preventDefault(); setLoading(true); setMsg(null);
    const u = (await supabase.auth.getUser()).data.user;
    const orden = nextOrden(form.curso_id, form.modulo_id || null);
    const { error } = await supabase.from("tareas").insert({
      titulo: form.titulo, descripcion: form.descripcion || null,
      curso_id: form.curso_id, docente_id: u.id,
      modulo_id: form.modulo_id || null,
      fecha_limite: form.fecha_limite || null,
      tipo: form.tipo, orden,
    });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Tarea creada" }); setForm(f => ({ ...f, titulo: "", descripcion: "", modulo_id: "", fecha_limite: "", tipo: "video" })); reload(); }
    setLoading(false);
  }

  async function editar(id, vals, tareaActual) {
    const nuevoOrden = Number(vals.orden);
    const ordenActual = tareaActual.orden;
    const cursoId = tareaActual.curso_id;
    const moduloId = vals.modulo_id || null;

    // Si cambió el orden, hacer espacio desplazando las demás
    if (nuevoOrden !== ordenActual) {
      const grupo = tareas
        .filter(t => t.id !== id && t.curso_id === cursoId &&
          (moduloId ? t.modulo_id === moduloId : !t.modulo_id))
        .sort((a, b) => (a.orden || 0) - (b.orden || 0));

      // Reordenar para hacer hueco en la posición deseada
      let i = 1;
      for (const t of grupo) {
        if (i === nuevoOrden) i++;
        await supabase.from("tareas").update({ orden: i }).eq("id", t.id);
        i++;
      }
    }

    const { error } = await supabase.from("tareas").update({
      titulo: vals.titulo, descripcion: vals.descripcion || null,
      modulo_id: moduloId, fecha_limite: vals.fecha_limite || null,
      tipo: vals.tipo || "video", orden: nuevoOrden,
    }).eq("id", id);
    if (!error) {
      await reordenar(cursoId, moduloId);
      reload();
    }
  }

  async function eliminar(id) {
    const tarea = tareas.find(t => t.id === id);
    const { error } = await supabase.from("tareas").delete().eq("id", id);
    if (error) { alert("Error al eliminar: " + error.message); return; }
    if (tarea) await reordenar(tarea.curso_id, tarea.modulo_id || null);
    reload();
  }

  if (cursos.length === 0) return <div className="empty"><div className="empty-icon">📝</div><div className="empty-title">Primero creá un curso</div></div>;

  const tareasFiltradas = filterModulo === "todos"
    ? tareas
    : filterModulo === "sin-modulo"
      ? tareas.filter(t => !t.modulo_id)
      : tareas.filter(t => t.modulo_id === filterModulo);

  const grupos = filterModulo === "todos"
    ? [
        ...modulos.map(mod => ({
          key: mod.id, label: mod.nombre,
          tareas: tareas.filter(t => t.modulo_id === mod.id).sort((a, b) => (a.orden || 0) - (b.orden || 0)),
        })),
        { key: "sin-modulo", label: "Sin módulo", tareas: tareas.filter(t => !t.modulo_id).sort((a, b) => (a.orden || 0) - (b.orden || 0)) },
      ].filter(g => g.tareas.length > 0)
    : [{ key: "filtrado", label: null, tareas: [...tareasFiltradas].sort((a, b) => (a.orden || 0) - (b.orden || 0)) }];

  function renderTarea(t) {
    const curso = cursos.find(c => c.id === t.curso_id);
    const modulosDelCursoT = modulos.filter(m => m.curso_id === t.curso_id);
    const grupoTareas = tareas.filter(tx =>
      tx.curso_id === t.curso_id &&
      (t.modulo_id ? tx.modulo_id === t.modulo_id : !tx.modulo_id)
    );
    const maxOrden = grupoTareas.length;
    return (
      <EditableRow key={t.id}
        fields={[
          { key: "orden", label: "Orden", value: String(t.orden || 1), type: "number" },
          { key: "titulo", label: "Título", value: t.titulo },
          { key: "tipo", label: "Tipo", value: t.tipo || "video", type: "select", options: [{ value: "video", label: "▶ Video (YouTube)" }, { value: "imagen", label: "🖼️ Imagen (archivo)" }] },
          { key: "descripcion", label: "Consigna", value: t.descripcion, type: "textarea" },
          { key: "modulo_id", label: "Módulo", value: t.modulo_id || "", type: "select", options: [{ value: "", label: "Sin módulo" }, ...modulosDelCursoT.map(m => ({ value: m.id, label: m.nombre }))] },
          { key: "fecha_limite", label: "Fecha límite", value: t.fecha_limite ? new Date(t.fecha_limite).toISOString().slice(0, 16) : "", type: "datetime-local" },
        ]}
        onSave={vals => editar(t.id, vals, t)}
        onDelete={() => eliminar(t.id)}
        deleteConfirm="¿Eliminar esta tarea y sus entregas?"
      >
        <div className="item-row-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", minWidth: 20 }}>#{t.orden}</span>
          {t.titulo}
          <span className={`tipo-badge ${t.tipo === "imagen" ? "tipo-badge-imagen" : "tipo-badge-video"}`}>
            {t.tipo === "imagen" ? "🖼️ Imagen" : "▶ Video"}
          </span>
        </div>
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
          <div className="form-group"><label className="form-label">Tipo de entrega</label><select className="form-select" value={form.tipo} onChange={e => set("tipo", e.target.value)}><option value="video">▶ Video (YouTube)</option><option value="imagen">🖼️ Imagen (archivo)</option></select></div>
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
function TabEntregas({ entregas, tareas, modulos, cursos, equipos, profile, filterEstado, reload, sinFiltroCurso }) {
  const [filterCurso, setFilterCurso] = useState("todos");
  const [filterModulo, setFilterModulo] = useState("todos");
  const [filterTarea, setFilterTarea] = useState("todas");
  const [filterEquipo, setFilterEquipo] = useState("todos");
  const [selected, setSelected] = useState(null);

  async function handleEvaluar(id, estadoSolicitado, comentario) {
    // Buscar la entrega para saber si es 1er o 2do intento
    const entrega = entregas.find(e => e.id === id);
    let estadoFinal = estadoSolicitado;
    // Si el docente desaprueba y es el 1er intento → rehacer
    if (estadoSolicitado === "desaprobado" && (entrega?.intento || 1) === 1) {
      estadoFinal = "rehacer";
    }
    await supabase.from("entregas").update({
      estado: estadoFinal,
      comentario_docente: comentario || null,
      evaluado_por: profile.id,
      evaluado_at: new Date().toISOString()
    }).eq("id", id);
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
        {!sinFiltroCurso && (
          <select className="form-select" style={{ maxWidth: 180 }} value={filterCurso} onChange={e => { setFilterCurso(e.target.value); setFilterModulo("todos"); setFilterTarea("todas"); setFilterEquipo("todos"); }}>
            <option value="todos">Todos los cursos</option>
            {cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        )}
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
                {tarea?.orden && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)" }}>#{tarea.orden}</span>}
                <span style={{ fontWeight: 500 }}>{tarea?.titulo || "Sin tarea"}</span>
                <span style={{ fontSize: 12, color: "var(--text3)", marginLeft: "auto" }}>{entregasDeTarea.length} entrega(s)</span>
              </div>
              {entregasDeTarea.map(entrega => {
                const equipo = equipos.find(eq => eq.id === entrega.equipo_id);
                return (
                  <div key={entrega.id} className="entrega-row" onClick={() => setSelected({ ...entrega, equipo: equipo?.nombre })}>
                    <img className="entrega-row-thumb"
                      src={entrega.imagen_url || `https://img.youtube.com/vi/${entrega.youtube_id}/mqdefault.jpg`}
                      alt="" loading="lazy" />
                    <div className="entrega-row-info">
                      <div className="entrega-row-name" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {entrega.profiles?.nombre || "Alumno"}
                        {(entrega.intento || 1) === 2 && <span style={{ fontSize: 10, fontWeight: 600, background: "rgba(96,165,250,0.15)", color: "var(--blue)", border: "1px solid rgba(96,165,250,0.3)", padding: "1px 6px", borderRadius: 10 }}>2do intento</span>}
                      </div>
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
  const [cursoVigenteData, setCursoVigenteData] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entregaTab, setEntregaTab] = useState("pendiente");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    // Obtener solo el curso vigente
    const { data: cursoVigente } = await supabase.from("cursos").select("*").eq("vigente", true).maybeSingle();
    const cursoId = cursoVigente?.id;

    const [mod, t, eq, e] = await Promise.all([
      cursoId ? supabase.from("modulos").select("*").eq("curso_id", cursoId).order("orden") : Promise.resolve({ data: [] }),
      cursoId ? supabase.from("tareas").select("*").eq("curso_id", cursoId).order("orden", { ascending: true }) : Promise.resolve({ data: [] }),
      cursoId ? supabase.from("equipos").select("*").eq("curso_id", cursoId).order("nombre") : Promise.resolve({ data: [] }),
      supabase.from("entregas")
        .select("*, profiles!entregas_alumno_id_fkey(nombre, email), cursos(nombre), tareas(titulo)")
        .eq("docente_asignado_id", profile.id)
        .order("created_at", { ascending: false }),
    ]);
    setCursoVigenteData(cursoVigente || null);
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
    rehacer: entregas.filter(e => e.estado === "rehacer").length,
  };

  const ETABS = [
    { id: "pendiente", label: "Pendientes", n: stats.pendientes },
    { id: "aprobado", label: "Aprobadas", n: stats.aprobadas },
    { id: "desaprobado", label: "Desaprobadas", n: stats.desaprobadas },
    { id: "rehacer", label: "Rehacer", n: stats.rehacer },
    { id: "todas", label: "Todas" },
  ];

  return (
    <main className="main">
      <div className="page-title">Panel docente</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <span className="page-sub" style={{ marginBottom: 0 }}>Hola, {profile.nombre}</span>
        {cursoVigenteData && <span className="vigente-chip">📚 {cursoVigenteData.nombre}</span>}
      </div>

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
        <TabEntregas entregas={entregas} tareas={tareas} modulos={modulos} cursos={cursoVigenteData ? [cursoVigenteData] : []} equipos={equipos} profile={profile} filterEstado={entregaTab} reload={loadData} sinFiltroCurso />
      )}
    </main>
  );
}

// ── ABM Asignaciones (matriz equipo x módulo → docente) ────
function TabAsignaciones({ cursos, equipos, modulos, docentes, reload }) {
  const [cursoId, setCursoId] = useState(cursos[0]?.id || "");
  const [asignaciones, setAsignaciones] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [defaultDocente, setDefaultDocente] = useState("");

  const equiposDeCurso = equipos.filter(eq => eq.curso_id === cursoId);
  const modulosDeCurso = modulos.filter(m => m.curso_id === cursoId);

  useEffect(() => { if (cursos.length && !cursoId) setCursoId(cursos[0].id); }, [cursos]);
  useEffect(() => { if (cursoId) loadAsignaciones(); }, [cursoId]);

  async function loadAsignaciones() {
    const { data } = await supabase.from("asignaciones").select("*").eq("curso_id", cursoId);
    if (data) setAsignaciones(data);
    const def = data?.find(a => a.es_default);
    setDefaultDocente(def?.docente_id || "");
  }

  // Obtener docente asignado para una celda equipo+módulo
  function getAsignado(equipoId, moduloId) {
    const a = asignaciones.find(a =>
      a.equipo_id === equipoId && a.modulo_id === moduloId && !a.es_default
    );
    return a?.docente_id || "";
  }

  // Guardar una celda individual
  async function setAsignado(equipoId, moduloId, docenteId) {
    setSaving(true); setMsg(null);
    // Eliminar asignación existente para esta celda
    await supabase.from("asignaciones").delete()
      .eq("curso_id", cursoId).eq("equipo_id", equipoId).eq("modulo_id", moduloId);

    if (docenteId) {
      const { error } = await supabase.from("asignaciones").insert({
        curso_id: cursoId, equipo_id: equipoId, modulo_id: moduloId,
        docente_id: docenteId, es_default: false,
      });
      if (error) setMsg({ type: "error", text: error.message });
    }
    await loadAsignaciones();
    setSaving(false);
  }

  // Guardar docente por defecto del curso
  async function saveDefault(docenteId) {
    setSaving(true); setMsg(null);
    await supabase.from("asignaciones").delete().eq("curso_id", cursoId).eq("es_default", true);
    if (docenteId) {
      await supabase.from("asignaciones").insert({
        curso_id: cursoId, equipo_id: null, modulo_id: null,
        docente_id: docenteId, es_default: true,
      });
    }
    setDefaultDocente(docenteId);
    await loadAsignaciones();
    setSaving(false);
  }

  if (cursos.length === 0) return <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">Primero creá un curso</div></div>;
  if (docentes.length === 0) return <div className="empty"><div className="empty-icon">👨‍🏫</div><div className="empty-title">No hay docentes registrados</div></div>;

  return (
    <div>
      <Msg msg={msg} />

      {/* Selector de curso */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, maxWidth: 300 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Curso</label>
            <select className="form-select" value={cursoId} onChange={e => setCursoId(e.target.value)}>
              {cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 300 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Docente por defecto (sin match)</label>
            <select className="form-select" value={defaultDocente}
              onChange={e => saveDefault(e.target.value)}>
              <option value="">— Sin docente por defecto —</option>
              {docentes.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>
          </div>
        </div>
        {saving && <span style={{ fontSize: 13, color: "var(--text2)" }}><Spinner /> Guardando...</span>}
      </div>

      {equiposDeCurso.length === 0 || modulosDeCurso.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📊</div>
          <div className="empty-title">Faltan equipos o módulos</div>
          <div className="empty-sub">Para armar la matriz necesitás al menos un equipo y un módulo en este curso</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>
            Seleccioná el docente para cada combinación equipo × módulo. Los cambios se guardan automáticamente.
          </div>
          <div className="matrix-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="row-header">Equipo \ Módulo</th>
                  {modulosDeCurso.map(m => <th key={m.id}>{m.nombre}</th>)}
                </tr>
              </thead>
              <tbody>
                {equiposDeCurso.map(eq => (
                  <tr key={eq.id}>
                    <td style={{ fontWeight: 500, padding: "8px 12px", background: "var(--bg3)", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {eq.nombre}
                    </td>
                    {modulosDeCurso.map(m => (
                      <td key={m.id}>
                        <select
                          value={getAsignado(eq.id, m.id)}
                          onChange={e => setAsignado(eq.id, m.id, e.target.value)}
                        >
                          <option value="">— Sin asignar —</option>
                          {docentes.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
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
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const [c, mod, t, eq, al, doc] = await Promise.all([
      supabase.from("cursos").select("*").order("nombre"),
      supabase.from("modulos").select("*").order("orden"),
      supabase.from("tareas").select("*").order("orden", { ascending: true }),
      supabase.from("equipos").select("*").order("nombre"),
      supabase.from("profiles").select("*").eq("rol", "alumno").order("nombre"),
      supabase.from("profiles").select("*").eq("rol", "docente").order("nombre"),
    ]);
    if (c.data) setCursos(c.data);
    if (mod.data) setModulos(mod.data);
    if (t.data) setTareas(t.data);
    if (eq.data) setEquipos(eq.data);
    if (al.data) setAlumnos(al.data);
    if (doc.data) setDocentes(doc.data);
    setLoading(false);
  }

  const TABS = [
    { id: "cursos", label: "Cursos" },
    { id: "modulos", label: "Módulos" },
    { id: "tareas", label: "Tareas" },
    { id: "equipos", label: "Equipos" },
    { id: "asignaciones", label: "Asignaciones" },
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
          {tab === "asignaciones" && <TabAsignaciones cursos={cursos} equipos={equipos} modulos={modulos} docentes={docentes} reload={loadData} />}
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
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) setProfile(null);
      // Detectar cuando el usuario llega desde el link de recuperación
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
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
        {isRecovery && session
          ? <ResetPasswordPage onDone={() => { setIsRecovery(false); supabase.auth.signOut(); }} />
          : !session
            ? <AuthPage />
            : !profile
              ? <div className="loading-center" style={{ minHeight: "100vh" }}><Spinner /> Cargando perfil...</div>
              : <><Navbar profile={profile} />{profile.rol === "alumno" ? <AlumnoView profile={profile} /> : profile.rol === "admin" ? <AdminView profile={profile} /> : <DocenteView profile={profile} />}</>
        }
      </div>
    </AuthCtx.Provider>
  );
}
