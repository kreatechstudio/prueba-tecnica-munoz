# DISEÑO — Catálogo de Servicios Muñoz Solutions

**Paleta:** Identidad Muñoz Solutions  
**Tema:** Profesional B2B  
**Animaciones:** Framer Motion  
**Responsividad:** Mobile-first

---

## PALETA DE COLORES

Extraída de Muñoz Solutions branding:

```css
--color-primary: #dc143c; /* Rojo corporativo — CTA, highlights */
--color-secondary: #1a3a52; /* Azul marino — backgrounds, headings */
--color-accent: #f39c12; /* Naranja cálido — estados activos, hover */
--color-neutral-dark: #2d3436; /* Gris oscuro — texto principal */
--color-neutral-light: #ecf0f1; /* Gris muy claro — backgrounds, borders */
--color-white: #ffffff; /* Blanco — cards, modales */
--color-success: #27ae60; /* Verde — confirmación */
--color-error: #e74c3c; /* Rojo oscuro — errores */
--color-muted: #95a5a6; /* Gris — texto secundario */
```

---

## TIPOGRAFÍA

```
Familia principal: "Inter" o "Poppins"
  → Descargar via Google Fonts
  → Weights: 400 (regular), 600 (semibold), 700 (bold)

Heading 1: 2.5rem (40px) — 700 bold
Heading 2: 2rem (32px) — 700 bold
Heading 3: 1.5rem (24px) — 600 semibold
Body: 1rem (16px) — 400 regular
Small: 0.875rem (14px) — 400 regular
```

---

## ESTRUCTURA DE LAYOUT

### 1. Header (fijo)

```
┌─────────────────────────────────────┐
│ 🏢 MUÑOZ SOLUTIONS | SERVICIOS      │
│              [Buscar...]            │
└─────────────────────────────────────┘
```

- Logo Muñoz Solutions (izquierda)
- Título "Catálogo de Servicios"
- Buscador (derecha)
- Fondo: blanco, border-bottom: 2px solid #DC143C

---

### 2. Sidebar Filters (izquierda, mobile: collapse)

```
┌──────────────────┐
│ FILTRAR POR:     │
├──────────────────┤
│ ☑ Todos          │
│ ☐ CCTV (4)       │
│ ☐ Alarmas (3)    │
│ ☐ Control (5)    │
│ ☐ Mantenimiento (2)
└──────────────────┘
```

- Fondo: #ECF0F1
- Checkboxes → color primario #DC143C cuando activo
- Counter dinámico entre paréntesis

---

### 3. Main Grid (servicios)

```
┌─────────────────────────────────────────┐
│                                         │
│  [Service Card] [Service Card] [Card]   │
│  [Service Card] [Service Card] [Card]   │
│  [Service Card] [Service Card] [Card]   │
│                                         │
└─────────────────────────────────────────┘
```

- Grid: 3 columnas en desktop, 2 en tablet, 1 en mobile
- Gap: 1.5rem
- Padding: 2rem

---

## COMPONENTES VISUALES

### Service Card (componente principal)

```
┌─────────────────────────────────────┐
│  [Imagen del servicio - 200px high]  │
├─────────────────────────────────────┤
│ 🏷️  Instalación CCTV 4K             │  (Heading 3)
│                                     │
│ Monitoreo profesional con cámaras   │  (Body — 2 líneas max)
│ IP de última generación...          │
│                                     │
│ ⭐ 4.8 (23 reviews)                 │  (Rating)
│ 💰 $450 - $1,200 MXN               │  (Precio range)
│                                     │
│ [Ver detalles y consultar →]        │  (CTA button)
└─────────────────────────────────────┘
```

**Estilos:**

- Fondo: blanco
- Border: 1px solid #ECF0F1
- Radius: 0.5rem
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Hover:
  - Scale: 1.05
  - Shadow: 0 8px 16px rgba(0,0,0,0.12)
  - Border-color: #DC143C
  - Transición: 0.3s ease

**CTA Button:**

- Fondo: #1A3A52 (azul marino)
- Color texto: blanco
- Hover: Fondo #DC143C (rojo)
- Padding: 0.75rem 1.5rem
- Radius: 0.375rem
- Font-weight: 600
- Cursor: pointer

---

### Modal — Detalles Servicio

```
╔═══════════════════════════════════════╗
║    X [Cerrar]                        ║
╠═══════════════════════════════════════╣
║                                       ║
║  [Imagen grande - 300px]              ║
║                                       ║
║  Instalación CCTV 4K                  ║  (H2)
║  ⭐ 4.8 (23 reviews) | $450-$1,200    ║
║                                       ║
║  DESCRIPCIÓN:                         ║  (H3)
║  Ofrecemos instalación profesional    ║
║  de sistemas de vigilancia de         ║
║  última generación...                 ║
║                                       ║
║  ESPECIFICACIONES:                    ║  (H3)
║  • Resolución: 4K (8MP)               ║
║  • Grabación: 7/24                    ║
║  • Conexión: PoE                      ║
║  • Garantía: 2 años                   ║
║                                       ║
║  ┌─────────────────────────────────┐  ║
║  │ TU EMAIL: [.....................]  │  (Input)
║  │ TELÉFONO: [.....................]  │  (Input)
║  │ NOTAS:   [.....................]  │  (Textarea)
║  │ [.................................]│
║  │ [.................................]│
║  └─────────────────────────────────┘  ║
║                                       ║
║  [ENVIAR CONSULTA]  [Cancelar]        ║
║                                       ║
╚═══════════════════════════════════════╝
```

**Estilos Modal:**

- Backdrop: rgba(0,0,0,0.5)
- Card: blanco, radius 0.75rem
- Max-width: 600px
- Padding: 2rem
- Animación entrada: slideIn (derecha) + fade (backdrop)
- Animación salida: slideOut + fade

**Inputs:**

- Border: 1px solid #ECF0F1
- Radius: 0.375rem
- Padding: 0.75rem 1rem
- Focus: border-color #DC143C, outline: none, shadow: 0 0 0 3px rgba(220,20,60,0.1)

---

### Loading State

```
┌─────────────────────────────────────┐
│  [Skeleton card shimmer]             │
├─────────────────────────────────────┤
│ [░░░░░░░░░░░░]                       │  (Pulse animation)
│ [░░░░░░░░░░░░░░░░░░]                 │
│ [░░░░░░░░░░]                         │
│                                     │
│ [░░░░░░░░░░░░]                       │
└─────────────────────────────────────┘
```

**Animación Pulse:**

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

### Error State

```
┌─────────────────────────────────────┐
│  ⚠️  Error al cargar servicios       │
│                                     │
│  Verifica tu conexión o intenta     │
│  más tarde.                         │
│                                     │
│         [Reintentar]                │
└─────────────────────────────────────┘
```

- Fondo: #FFE5E5 (rojo muy claro)
- Border: 2px solid #E74C3C
- Ícono: ⚠️ (emoji o SVG)
- Texto: #2D3436
- Botón: fondo #E74C3C, texto blanco

---

## ANIMACIONES (Framer Motion)

### 1. Entrada de servicios (Stagger)

```javascript
// Cada card entra con delay
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
```

### 2. Hover en cards

```javascript
// Aplica scale + shadow
whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.12)" }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### 3. Modal entrada/salida

```javascript
// Slideín desde derecha + fade backdrop
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 50 }}
transition={{ duration: 0.3, ease: "easeOut" }}
```

### 4. Cambio de filtro

```javascript
// Fade out actual, fade in filtered
animate={{ opacity: filteredServices.length > 0 ? 1 : 0.5 }}
transition={{ duration: 0.2 }}
```

---

## RESPONSIVE BREAKPOINTS

| Breakpoint | Width          | Layout                  |
| ---------- | -------------- | ----------------------- |
| Mobile     | < 640px        | 1 col, sidebar collapse |
| Tablet     | 640px - 1024px | 2 cols                  |
| Desktop    | > 1024px       | 3 cols                  |

```css
/* Mobile-first approach */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ACCESIBILIDAD

- [ ] Imágenes: alt text descriptivo
- [ ] Botones: aria-label donde no hay texto
- [ ] Inputs: label asociado con htmlFor
- [ ] Colores: ratio contraste >= 4.5:1 (WCAG AA)
- [ ] Focus: outline visible en navegación teclado
- [ ] Modales: trap focus, ESC cierra, rol="dialog"
- [ ] Links: underline visible, no solo color

---

## REFERENCE VISUAL (Ejemplos similares)

- Vercel Marketplace: https://vercel.com/marketplace
- Stripe Dashboard: https://dashboard.stripe.com
- Supabase Storage: https://app.supabase.com/project/_/storage

Estilo: Clean, minimalista, profesional, con una toque de color corporativo.

---

## SIGUIENTE PASO

Generamos:

- [ ] base-datos.md (schema SQL)
- [ ] prompt-base.md (instrucciones React)
