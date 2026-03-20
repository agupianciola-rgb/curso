# Cursódromo — Setup Guide

## 1. Crear proyecto en Supabase

1. Ir a https://supabase.com y crear una cuenta (es gratis)
2. Clic en "New Project", elegir nombre y contraseña de DB
3. Esperar ~2 minutos a que el proyecto se inicialice

## 2. Configurar la base de datos

1. En tu proyecto de Supabase, ir a **SQL Editor**
2. Pegar todo el contenido del archivo `schema.sql` y ejecutarlo (Run)
3. Verificar que las tablas `profiles`, `cursos` y `entregas` aparezcan en **Table Editor**

## 3. Conectar la app con Supabase

1. En Supabase ir a **Settings → API**
2. Copiar:
   - **Project URL** → reemplazar `https://TU_PROJECT_ID.supabase.co` en `src/App.jsx`
   - **anon public key** → reemplazar `TU_ANON_KEY` en `src/App.jsx`

Buscar estas líneas al principio de App.jsx:
```js
const SUPABASE_URL = "https://TU_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "TU_ANON_KEY";
```

## 4. Correr la app localmente

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## 5. Primeros pasos en la app

1. **Registrarse como docente** → crear cuenta con rol "Docente"
2. **Crear cursos** → ir a "Gestionar cursos" y agregar los cursos
3. **Registrarse como alumno** → crear una segunda cuenta con rol "Alumno"
4. **Subir una entrega** → pegar un link de YouTube y enviarlo
5. **Evaluar** → volver a la cuenta docente y aprobar/desaprobar

## 6. Deploy a producción (Vercel)

```bash
npm run build
```

O conectar el repo directamente en https://vercel.com:
1. Importar el proyecto desde GitHub
2. Agregar variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Actualizar App.jsx para usar `import.meta.env.VITE_SUPABASE_URL`

## Estructura del proyecto

```
curso-app/
├── src/
│   ├── App.jsx        ← toda la app (auth, vistas alumno/docente, componentes)
│   └── main.jsx       ← entry point
├── index.html
├── package.json
├── vite.config.js
├── schema.sql         ← ejecutar en Supabase SQL Editor
└── README.md
```

## Funcionalidades incluidas

**Alumno:**
- Registro e inicio de sesión
- Dashboard con estadísticas personales
- Subir entrega con link de YouTube + título + descripción
- Ver historial de entregas con estado (pendiente/aprobado/desaprobado)
- Ver comentarios del docente
- Reproducir videos inline con modal

**Docente:**
- Dashboard con conteo de pendientes/aprobadas/desaprobadas
- Ver todas las entregas filtradas por estado y por curso
- Reproducir cualquier video con modal
- Aprobar o desaprobar con comentario opcional
- Crear y gestionar cursos

## Tecnologías

- React 18 + Vite
- Supabase (PostgreSQL + Auth + RLS)
- YouTube IFrame API (embed directo, sin API key)
- CSS-in-JS (sin dependencias de UI)
