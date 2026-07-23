import type { ConsultaInput, FakeStoreProduct, Servicio } from "@/types";
import { mapProductosAServicios } from "@/utils/mapService";
import { isSupabaseConfigured, supabase } from "./supabase";

const FAKE_STORE_URL = "https://fakestoreapi.com/products";

/**
 * Obtiene los productos de Fake Store API y los mapea a servicios de
 * Muñoz Solutions. Lanza un error explícito si la petición falla para que
 * TanStack Query lo exponga vía `isError`.
 */
export async function fetchServicios(signal?: AbortSignal): Promise<Servicio[]> {
  const response = await fetch(FAKE_STORE_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los servicios (HTTP ${response.status})`);
  }

  const productos = (await response.json()) as FakeStoreProduct[];

  if (!Array.isArray(productos)) {
    throw new Error("La respuesta de la API no tiene el formato esperado");
  }

  return mapProductosAServicios(productos);
}

/**
 * Inserta una consulta en Supabase. Si el cliente no está configurado
 * (faltan variables de entorno), lanza un error claro en lugar de fallar
 * de forma silenciosa.
 */
export async function crearConsulta(data: ConsultaInput) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase no está configurado. Copia .env.example a .env y agrega tus credenciales.",
    );
  }

  // Sin `.select()`: la tabla solo permite INSERT anónimo (no SELECT) por RLS,
  // así que pedir la fila de vuelta fallaría. Usamos el retorno mínimo.
  const { error } = await supabase.from("consultas").insert([data]);

  if (error) {
    throw new Error(`Error al guardar la consulta: ${error.message}`);
  }
}
