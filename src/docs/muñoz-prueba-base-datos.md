# BASE DE DATOS — Catálogo de Servicios Muñoz Solutions

**Motor:** Supabase (PostgreSQL)
**Alcance:** Mínimo — solo 1 tabla necesaria para capturar consultas de clientes

---

## TABLA: `consultas`

Guarda cada consulta que un visitante hace sobre un servicio del catálogo.

```sql
CREATE TABLE consultas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  servicio_id INTEGER NOT NULL,
  servicio_nombre VARCHAR(255) NOT NULL,
  notas TEXT,
  estado VARCHAR(50) DEFAULT 'nueva', -- nueva | contactado | descartado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para consultas rápidas por fecha (dashboard futuro)
CREATE INDEX idx_consultas_created_at ON consultas(created_at DESC);

-- Índice para filtrar por estado (seguimiento)
CREATE INDEX idx_consultas_estado ON consultas(estado);
```

---

## ROW LEVEL SECURITY (RLS)

Como es un form público (sin login), habilitamos RLS pero permitimos **INSERT anónimo** y bloqueamos lectura pública (solo Muñoz Solutions vería las consultas desde el dashboard de Supabase, no expuesto en frontend).

```sql
-- Habilitar RLS
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede INSERTAR (form público)
CREATE POLICY "Cualquiera puede crear consultas"
ON consultas
FOR INSERT
TO anon
WITH CHECK (true);

-- Política: nadie puede LEER desde el cliente (solo admin vía dashboard)
-- (no se crea política SELECT para 'anon' → bloqueado por default)
```

**Nota de seguridad:** Esto asegura que el frontend solo puede escribir (enviar consultas), nunca leer las consultas de otros usuarios. Muñoz Solutions revisaría los datos desde el Table Editor de Supabase directamente.

---

## VARIABLES DE ENTORNO NECESARIAS

```bash
# .env.example
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...tu_anon_key_aqui
```

**Importante:** Solo se usa la `anon key` (pública, segura para frontend) — nunca la `service_role key` en el cliente.

---

## CLIENTE SUPABASE (lib/supabase.ts)

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## FUNCIÓN DE INSERT (lib/api.ts)

```typescript
import { supabase } from "./supabase";

interface ConsultaInput {
  email: string;
  phone?: string;
  servicio_id: number;
  servicio_nombre: string;
  notas?: string;
}

export async function crearConsulta(data: ConsultaInput) {
  const { data: result, error } = await supabase.from("consultas").insert([data]).select();

  if (error) {
    throw new Error(`Error al guardar consulta: ${error.message}`);
  }

  return result;
}
```

---

## VALIDACIÓN ANTES DE ENVIAR (frontend)

Reglas mínimas antes de hacer INSERT:

```typescript
function validarConsulta(email: string, phone: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return "Ingresa un email válido";
  }

  if (phone && phone.length < 10) {
    return "El teléfono debe tener al menos 10 dígitos";
  }

  return null; // sin errores
}
```

---

## DATOS DE PRUEBA (opcional, para testing local)

```sql
INSERT INTO consultas (email, phone, servicio_id, servicio_nombre, notas) VALUES
('cliente1@example.com', '8671234567', 1, 'Instalación CCTV 4K', 'Necesito 4 cámaras para local comercial'),
('cliente2@example.com', '8679876543', 3, 'Sistema de Alarmas', 'Casa habitación, 3 recámaras');
```

---

## QUERIES ÚTILES PARA MUÑOZ SOLUTIONS (futuro dashboard)

```sql
-- Consultas nuevas sin atender
SELECT * FROM consultas WHERE estado = 'nueva' ORDER BY created_at DESC;

-- Servicios más consultados (qué le interesa a la gente)
SELECT servicio_nombre, COUNT(*) as total_consultas
FROM consultas
GROUP BY servicio_nombre
ORDER BY total_consultas DESC;

-- Consultas de esta semana
SELECT * FROM consultas
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

Esto es justo el tipo de dato que después se puede vender como "propuesta real" — Muñoz Solutions vería en automático qué servicios generan más interés.

---

## RESUMEN — POR QUÉ ESTE DISEÑO ES MÍNIMO Y SUFICIENTE

- ✅ 1 sola tabla — cumple el propósito sin sobre-ingeniería
- ✅ RLS activado — seguro para producción real
- ✅ Solo INSERT público — no expone datos de otros usuarios
- ✅ Índices en los campos que se van a consultar después
- ✅ Estructura escalable — se puede agregar `atendido_por`, `prioridad`, etc. sin romper nada

---

## SIGUIENTE PASO

Generamos:

- [ ] prompt-base.md (instrucciones completas para Claude Code / desarrollo)
