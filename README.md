# Catálogo de Productos — Muñoz Solutions

Cliente web que presenta un catálogo de productos navegable para **Muñoz Solutions**,
con buscador, filtros por categoría, detalle en modal y un formulario de consulta que
persiste los prospectos en Supabase. Incluye un panel de administración con login para
revisar las consultas recibidas.

Los datos provienen de [Fake Store API](https://fakestoreapi.com/products) (productos
reales: ropa, joyería y electrónica). Es una prueba técnica que funciona además como
prototipo real adoptable por el cliente.

## Descripción

- **Listado** de productos obtenidos de una API pública.
- **Buscador** por nombre o descripción (case-insensitive, con _debounce_ de 300 ms).
- **Filtro** por categoría con selección múltiple y contador de resultados.
- **Estados de petición** explícitos: _loading_ (skeletons), _error_ (con reintento),
  _empty_ (sin resultados) y _success_.
- **Modal de detalle** con imagen, descripción, calificación, precio y un
  **formulario de consulta** validado que guarda en Supabase.
- **Panel de administración** (`/admin`) con login (Supabase Auth) para ver las consultas.
- **Animaciones** con Framer Motion (entrada _stagger_, _hover_ en cards, modal).
- **Responsive** mobile-first y accesibilidad básica (ARIA, focus, ESC, alt text).

## Cómo correrlo localmente

1. Clonar el repositorio.
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Copiar `.env.example` a `.env` y completar las credenciales de Supabase:
   ```sh
   cp .env.example .env
   ```
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```
   > Usa siempre la **anon/public key** (segura para el frontend), nunca la `service_role`.
   > El proyecto compila y carga aunque falten estas variables; solo el formulario y el
   > panel mostrarán un aviso hasta configurarlas.
4. Levantar el entorno de desarrollo:
   ```sh
   npm run dev
   ```

> El proyecto usa Bun como package manager (existe `bun.lock`). `bun install` / `bun dev`
> también funcionan; los scripts de npm quedan documentados por compatibilidad.

## Configurar Supabase

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecutar el esquema de la tabla `consultas` y sus políticas (abajo).
   Como regla del proyecto, el SQL se corre **manualmente** en el dashboard.
3. Copiar `Project URL` y `anon public key` (Settings → API) al archivo `.env`.
4. Para el panel admin: en **Authentication → Users** crear un usuario (email + contraseña,
   con _Auto Confirm_). La política de lectura está restringida a ese email.

```sql
create extension if not exists "uuid-ossp";

create table consultas (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) not null,
  phone varchar(20),
  servicio_id integer not null,
  servicio_nombre varchar(255) not null,
  notas text,
  estado varchar(50) default 'nueva',
  created_at timestamptz default now()
);

create index idx_consultas_created_at on consultas(created_at desc);
create index idx_consultas_estado on consultas(estado);

alter table consultas enable row level security;

-- Cualquiera (anónimo) puede ENVIAR una consulta desde el formulario.
create policy "Cualquiera puede crear consultas"
  on consultas for insert to anon with check (true);

-- Solo el admin autenticado puede LEER las consultas (panel /admin).
create policy "Admin puede leer consultas"
  on consultas for select to authenticated
  using ( auth.jwt() ->> 'email' = 'admin@munozsolutions.mx' );
```

## Decisiones técnicas

### ¿Por qué Fake Store API?

El brief pedía consumir una API pública. Entre las opciones (JSONPlaceholder, REST
Countries, Fake Store), **Fake Store** fue la única con la forma de datos propia de un
catálogo comercial: cada producto trae `title`, `description`, `category`, `price`,
`image` y `rating`, lo que permite construir cards, buscador, filtros y detalle sin
inventar datos. Las categorías se traducen al español, respetando lo que la API
realmente devuelve:

| Fake Store         | En la app        |
| ------------------ | ---------------- |
| `electronics`      | Electrónica      |
| `jewelery`         | Joyería          |
| `men's clothing`   | Ropa de hombre   |
| `women's clothing` | Ropa de mujer    |

Ese mapeo vive aislado en [`src/utils/mapService.ts`](src/utils/mapService.ts): cambiar
Fake Store por la API real del cliente mañana solo toca ese archivo.

### ¿Por qué TanStack Query?

El requisito clave es el **manejo de estados de la API**. TanStack Query lo resuelve de
raíz: expone `isLoading`, `isError`, `error`, `data` y `refetch` sin escribir un
`useEffect` manual, y añade _caching_, deduplicación y reintentos automáticos. El hook
[`useServices`](src/hooks/useServices.ts) encapsula la query y devuelve los productos ya
mapeados, dejando a la UI la única tarea de reaccionar a cada estado. La mutación del
formulario y la lectura del panel también usan React Query, unificando el patrón.

### ¿Por qué esta estructura de carpetas?

Separación por responsabilidad para que cada pieza sea sustituible y testeable:

```
src/
├── components/
│   ├── servicios/   → UI del catálogo (Card, List, Modal, SearchBar, filtros, estados)
│   ├── admin/       → LoginForm y ConsultasTable del panel
│   ├── layout/      → Navbar, Footer, Layout
│   └── ui/          → primitivos shadcn/ui reutilizables
├── hooks/           → useServices (datos) y useDebounce (búsqueda)
├── lib/             → api.ts (fetch + insert + listado) y supabase.ts (cliente)
├── utils/           → mapService.ts (categorías) y format.ts (precio)
├── types/           → interfaces TypeScript compartidas
└── routes/          → páginas (TanStack Router file-based): / y /admin
```

La regla es: **datos** (`hooks`/`lib`), **transformación** (`utils`), **tipos** (`types`)
y **presentación** (`components`) nunca se mezclan.

### ¿Por qué Supabase para las consultas?

Se necesitaba persistir prospectos sin montar un backend propio. Supabase da una tabla
Postgres + API REST instantánea. Con **Row Level Security** activado:

- El rol `anon` (público) **solo puede INSERT**: el formulario envía consultas pero nadie
  anónimo puede leerlas.
- El **admin autenticado** tiene una política de SELECT restringida a su email, así que
  únicamente él ve las consultas desde el panel `/admin`.

Por eso el `insert` del formulario **no** encadena `.select()` (pedir la fila de vuelta
requeriría permiso de lectura anónimo, que a propósito no existe).

## Stack

- React 19 + TypeScript
- TanStack Start (SSR) + TanStack Router + TanStack Query
- Vite (bundler)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (animaciones)
- React Hook Form + Zod (formulario y validación)
- Supabase (persistencia de consultas + Auth del panel)
- Vercel (deploy)

## Deploy

Deploy continuo en Vercel desde `main`. Configurar en Vercel las mismas variables de
entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

URL live: https://prueba-tecnica-munoz-opvf-nine.vercel.app/
