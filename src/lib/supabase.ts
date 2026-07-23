import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Las credenciales nunca se hardcodean: siempre vienen de variables de entorno.
// Copia `.env.example` a `.env` y completa estos valores.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * `true` solo si ambas variables están presentes. Permite que la app compile y
 * cargue aunque Supabase no esté configurado todavía; el formulario avisa al
 * usuario en lugar de romper la aplicación.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
