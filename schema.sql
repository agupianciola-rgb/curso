-- ============================================================
-- SCHEMA para la aplicacion de gestion de curso
-- Ejecutar en Supabase > SQL Editor
-- ============================================================

-- Tabla de perfiles (extiende auth.users de Supabase)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nombre text not null,
  email text not null,
  rol text not null check (rol in ('alumno', 'docente')),
  created_at timestamptz default now()
);

-- Tabla de cursos
create table public.cursos (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  descripcion text,
  docente_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Tabla de entregas
create table public.entregas (
  id uuid default gen_random_uuid() primary key,
  alumno_id uuid references public.profiles(id) on delete cascade not null,
  curso_id uuid references public.cursos(id) on delete cascade not null,
  titulo text not null,
  descripcion text,
  youtube_url text not null,
  youtube_id text not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobado', 'desaprobado')),
  comentario_docente text,
  evaluado_por uuid references public.profiles(id),
  evaluado_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.cursos enable row level security;
alter table public.entregas enable row level security;

-- Profiles: cada uno ve el suyo; docentes ven todos
create policy "usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "docentes ven todos los perfiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'docente'
    )
  );

create policy "usuarios crean su perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "usuarios actualizan su perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Cursos: todos los usuarios autenticados los ven
create policy "usuarios ven cursos"
  on public.cursos for select
  using (auth.role() = 'authenticated');

create policy "docentes crean cursos"
  on public.cursos for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'docente'
    )
  );

-- Entregas: alumnos ven/crean las suyas; docentes ven todas
create policy "alumnos ven sus entregas"
  on public.entregas for select
  using (alumno_id = auth.uid());

create policy "docentes ven todas las entregas"
  on public.entregas for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'docente'
    )
  );

create policy "alumnos crean entregas"
  on public.entregas for insert
  with check (
    alumno_id = auth.uid() and
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'alumno'
    )
  );

create policy "docentes actualizan estado de entregas"
  on public.entregas for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.rol = 'docente'
    )
  );

-- ============================================================
-- DATOS DE PRUEBA (opcional)
-- ============================================================

-- Insertar un curso de prueba (reemplazar el docente_id despues de crear cuentas)
-- insert into public.cursos (nombre, descripcion) values
--   ('Producción Audiovisual', 'Curso de creación y edición de video'),
--   ('Comunicación Digital', 'Herramientas y narrativas digitales');
