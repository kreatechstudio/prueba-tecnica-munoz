# ALCANCE — Prueba Técnica Frontend Developer

## Muñoz Solutions × KreaTech Studio

**Proyecto:** Catálogo de Servicios — Muñoz Solutions  
**Responsable:** Carlos López  
**Timeline:** 1 día (22-24 julio 2026)  
**Plazo original:** 3 días  
**Fecha entrega:** 24/07/2026

---

## CONTEXTO ESTRATÉGICO

Muñoz Solutions es empresa de **servicios de instalación de seguridad electrónica** (cámaras CCTV, alarmas, control de acceso). Antes tenían carrito de e-commerce; ahora necesitan catálogo funcional que muestre servicios + capture consultas de clientes potenciales.

Esta prueba técnica sirve como **prototipo funcional** que después pueden adoptar como propuesta real.

---

## REQUISITOS MÍNIMOS (exactos del brief)

| Req        | Descripción                           | Status                                                   |
| ---------- | ------------------------------------- | -------------------------------------------------------- |
| **REQ-01** | Listar datos obtenidos de API pública | ✅ Fake Store API (mapeada como servicios)               |
| **REQ-02** | Buscador y filtros simples            | ✅ Buscar por nombre/descripción + filtrar por categoría |
| **REQ-03** | Manejo de estados en peticiones API   | ✅ Loading, error, success states                        |
| **REQ-04** | Clic en elemento → más información    | ✅ Modal con detalles + botón consulta                   |
| **REQ-05** | Stack: React/TypeScript/Tailwind      | ✅ Confirmado                                            |
| **REQ-06** | UI/UX a criterio                      | ✅ Muñoz Solutions paleta + Framer Motion                |
| **REQ-07** | GitHub público + README               | ✅ Documentación de decisiones técnicas                  |

---

## ALCANCE INCLUIDO

### Frontend

- ✅ Listado de servicios (Fake Store mapeada)
- ✅ Buscador por nombre/descripción
- ✅ Filtros por categoría
- ✅ Loading skeleton durante fetch
- ✅ Error state si API falla
- ✅ Modal/card expandible con detalles de servicio
- ✅ Botón "Consultar este servicio"
- ✅ Animaciones Framer Motion (entrada, hover, transiciones)
- ✅ Responsive design (mobile-first)
- ✅ Accesibilidad básica (alt text, ARIA labels)

### Backend (Supabase)

- ✅ Tabla `consultas` para guardar registros
- ✅ Edge Function para recibir POST del form
- ✅ Trigger para email de confirmación (opcional, nice-to-have)

### Entrega

- ✅ Repositorio GitHub público
- ✅ README con instrucciones de setup
- ✅ Documentación de decisiones técnicas (por qué Fake Store, por qué esa tabla, etc.)
- ✅ Deploy live en Vercel

---

## NO INCLUIDO (definir límites)

- ❌ Autenticación de usuarios
- ❌ Admin panel para gestionar servicios
- ❌ Sistema de pagos
- ❌ Integración con WhatsApp directa (solo email de consulta)
- ❌ Multi-idioma
- ❌ Analytics/tracking avanzado
- ❌ PWA (progressive web app)

---

## DECISIONES TÉCNICAS CLAVE

### 1. API: Fake Store API vs JSONPlaceholder

**Elegimos:** Fake Store API

**Por qué:**

- JSONPlaceholder: posts/usuarios/comments — genérico, sin contexto comercial
- REST Countries: geográfico — no aplica a seguridad
- **Fake Store:** productos con categoría, precio, descripción, imagen — **mapeable directamente a servicios de Muñoz**

**Mapeo:**

```
Fake Store "Electronics" → "Sistemas CCTV"
Fake Store "Jewelery" → "Control de Acceso"
Fake Store "price" → "Costo estimado del servicio"
Fake Store "rating" → "Disponibilidad/Calificación"
```

**Ventaja:** Cumple 100% requisitos + contexto real de cliente

---

### 2. Stack

- **React 18** — componentes funcionales, hooks
- **TypeScript** — type safety
- **Tailwind CSS** — diseño rápido + paleta Muñoz
- **Framer Motion** — animaciones suaves
- **Vercel** — deploy automático desde GitHub
- **Supabase** — tabla consultas + postgrest API

---

### 3. Manejo de Estados (REQ-03)

Usamos **TanStack Query (React Query)** para manejar:

- `isLoading` → skeleton loader
- `isError` → error message
- `data` → lista de servicios
- `refetch` → botón retry

Alternativa simple: `useState` + `useEffect` si quieres minimal

---

### 4. Tabla Supabase: `consultas`

```sql
CREATE TABLE consultas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  servicio_id INTEGER NOT NULL,
  servicio_nombre VARCHAR(255),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  estado VARCHAR(50) DEFAULT 'nueva' -- nueva, contactado, descartado
);
```

**Por qué:**

- Captura datos útiles del prospecto
- Muñoz Solutions ve: "Cliente consultó por cámaras CCTV ayer"
- Después se conecta a CRM/WhatsApp bot

---

### 5. Componentes React (estructura)

```
src/
├── components/
│   ├── ServiceList.tsx      // Listado principal
│   ├── ServiceCard.tsx      // Card individual
│   ├── ServiceModal.tsx     // Detalle + form consulta
│   ├── SearchBar.tsx        // Buscador
│   ├── CategoryFilter.tsx   // Filtros
│   └── LoadingSkeleton.tsx  // Estado loading
├── hooks/
│   └── useServices.ts       // Custom hook para API
├── types/
│   └── index.ts             // TypeScript interfaces
├── lib/
│   └── api.ts               // Funciones API calls
└── App.tsx                  // Componente raíz
```

---

### 6. Animaciones (Framer Motion)

- **Entrada servicios:** staggered fade-in (0.1s delay entre cards)
- **Hover card:** scale 1.05 + shadow increase
- **Modal entrada:** slideIn desde derecha + fade backdrop
- **Filtro cambio:** fade out list + fade in filtered list

---

## TIMELINE — 1 DÍA

```
HORA 1-1.5: Setup + Documentación
  → Crear repo en GitHub
  → Supabase tabla + permisos RLS
  → Vercel conectado
  → Proyecto React initial setup
  → README skeleton

HORA 2-3.5: Desarrollo Core
  → Custom hook useServices (fetch Fake Store)
  → Componente ServiceList + ServiceCard
  → SearchBar + CategoryFilter
  → Modal detalle
  → Loading/Error states

HORA 4-4.5: Form Consulta + Animaciones
  → Form en modal (email, phone, notas)
  → POST a Supabase
  → Validación básica
  → Framer Motion animaciones
  → Responsive tweaks

HORA 5: Polish + Docs
  → Tests rápidos en Vercel
  → README completo (decisiones técnicas)
  → GitHub documentado
  → Checklist final
```

---

## CHECKLIST DE ENTREGA

- [ ] Repositorio GitHub público
- [ ] Main branch con código limpio
- [ ] `.env.example` con variables (VITE_SUPABASE_URL, etc.)
- [ ] README.md con:
  - Cómo clonar + instalar
  - Cómo correr localmente (`npm run dev`)
  - Cómo hacer deploy en Vercel
  - Decisiones técnicas (por qué cada tecnología)
  - Cómo conectar Supabase
- [ ] Vercel live + URL funcional
- [ ] Fake Store API consumida correctamente
- [ ] Buscador funcionando
- [ ] Filtros funcionando
- [ ] Modal con detalles
- [ ] Form de consulta guardando en Supabase
- [ ] Loading/error states visibles
- [ ] Animaciones Framer Motion
- [ ] Mobile responsive

---

## NOTAS DE ESTRATEGIA

1. **Para la entrevista:** Sé capaz de explicar:
   - Por qué Fake Store vs JSONPlaceholder (contexto cliente)
   - Decisión de TanStack Query o useState
   - Cómo manejas loading/error
   - Por qué esa estructura de carpetas
   - Framer Motion choice (smoothness vs performance)

2. **Diferencial:** Mostrar que pensaste en **el cliente real (Muñoz Solutions)**, no solo técnica pura

3. **Tiempo:** 1 día es agresivo. Si necesitas 1.5-2 días está bien. Calidad > velocidad.

---

## SIGUIENTE PASO

Generamos:

- [ ] diseño.md (paleta, componentes visuales)
- [ ] base-datos.md (schema Supabase + queries)
- [ ] prompt-base.md (para arrancar desarrollo)
