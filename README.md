# Catálogo de Servicios — Muñoz Solutions

Cliente web que presenta los servicios de seguridad electrónica de **Muñoz Solutions**
(Nuevo Laredo, México) como un catálogo navegable, con buscador, filtros por categoría,
detalle en modal y un formulario de consulta que persiste los prospectos en Supabase.

Los datos del catálogo provienen de [Fake Store API](https://fakestoreapi.com/products),
**mapeados** a servicios de seguridad. Es una prueba técnica que funciona además como
prototipo real adoptable por el cliente.

## Descripción

- **Listado** de servicios obtenidos de una API pública y mapeados al dominio de Muñoz.
- **Buscador** por nombre o descripción (case-insensitive, con _debounce_ de 300 ms).
- **Filtro** por categoría con selección múltiple y contador de resultados.
- **Estados de petición** explícitos: _loading_ (skeletons), _error_ (con reintento),
  _empty_ (sin resultados) y _success_.
- **Modal de detalle** con imagen, descripción, calificación, costo estimado y un
  **formulario de consulta** validado que guarda en Supabase.
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
   > El proyecto compila y carga aunque falten estas variables; solo el envío del
   > formulario mostrará un aviso hasta configurarlas.
4. Levantar el entorno de desarrollo:
   ```sh
   npm run dev
   ```

> El proyecto usa Bun como package manager (existe `bun.lock`). `bun install` / `bun dev`
> también funcionan; los scripts de npm quedan documentados por compatibilidad.

## Configurar Supabase

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecutar el esquema de la tabla `consultas` (ver más abajo).
   Como regla del proyecto, el SQL se corre **manualmente** en el dashboard, nunca
   con auto-ejecución.
3. Copiar `Project URL` y `anon public key` (Settings → API) al archivo `.env`.

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

-- Solo INSERT anónimo: el frontend puede enviar consultas, nunca leerlas.
create policy "Cualquiera puede crear consultas"
  on consultas for insert to anon with check (true);
```

## Decisiones técnicas

### ¿Por qué Fake Store API?

El brief pedía consumir una API pública. Entre las opciones (JSONPlaceholder, REST
Countries, Fake Store), **Fake Store** fue la única con la forma de datos que se mapea
de forma natural a un catálogo comercial: cada producto tiene `title`, `description`,
`category`, `price`, `image` y `rating`. Eso permite un **mapeo estratégico** al dominio
de Muñoz Solutions en lugar de datos genéricos sin contexto:

| Fake Store         | Muñoz Solutions             |
| ------------------ | --------------------------- |
| `electronics`      | Sistemas CCTV               |
| `jewelery`         | Control de Acceso           |
| `men's clothing`   | Alarmas Residenciales       |
| `women's clothing` | Mantenimiento y Soporte     |
| `price`            | Costo estimado del servicio |
| `rating`           | Calificación / reseñas      |

El mapeo vive aislado en [`src/utils/mapService.ts`](src/utils/mapService.ts), así que
sustituir Fake Store por la API real de Muñoz mañana solo toca ese archivo.

### ¿Por qué TanStack Query?

El requisito clave es el **manejo de estados de la API**. TanStack Query lo resuelve de
raíz: expone `isLoading`, `isError`, `error`, `data` y `refetch` sin escribir un
`useEffect` manual, y añade _caching_, deduplicación y reintentos automáticos. El hook
[`useServices`](src/hooks/useServices.ts) encapsula la query y devuelve los servicios ya
mapeados, dejando a la UI la única tarea de reaccionar a cada estado. La mutación del
formulario también usa `useMutation`, unificando el patrón de datos en toda la app.

### ¿Por qué esta estructura de carpetas?

Separación por responsabilidad para que cada pieza sea sustituible y testeable:

```
src/
├── components/
│   ├── servicios/   → UI del catálogo (Card, List, Modal, SearchBar, filtros, estados)
│   ├── layout/      → Navbar, Footer, Layout
│   └── ui/          → primitivos shadcn/ui reutilizables
├── hooks/           → useServices (datos) y useDebounce (búsqueda)
├── lib/             → api.ts (fetch + insert) y supabase.ts (cliente)
├── utils/           → mapService.ts (mapeo de dominio) y format.ts (formato de costo)
├── types/           → interfaces TypeScript compartidas
└── routes/          → páginas (TanStack Router file-based)
```

La regla es: **datos** (`hooks`/`lib`), **transformación de dominio** (`utils`),
**tipos** (`types`) y **presentación** (`components`) nunca se mezclan.

### ¿Por qué Supabase para las consultas?

Se necesitaba persistir prospectos sin montar un backend propio. Supabase da una tabla
Postgres + API REST instantánea. Con **Row Level Security** activado y **una sola
política de INSERT** para el rol `anon`, el frontend puede _escribir_ consultas pero
nunca _leer_ las de otros usuarios (no existe política `SELECT`, así que queda bloqueado
por defecto). Muñoz Solutions revisa los prospectos desde el dashboard de Supabase. Por
eso el `insert` **no** encadena `.select()`: pedir la fila de vuelta requeriría permiso
de lectura que a propósito no otorgamos.

## Stack

- React 19 + TypeScript
- TanStack Start (SSR) + TanStack Router + TanStack Query
- Vite (bundler)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (animaciones)
- React Hook Form + Zod (formulario y validación)
- Supabase (persistencia de consultas)
- Vercel (deploy)

## Deploy

Deploy continuo en Vercel desde `main`. Configurar en Vercel las mismas variables de
entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

URL live: _(pendiente de publicar)_
