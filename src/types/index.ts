// Tipos TypeScript del proyecto Catálogo Muñoz Solutions

/** Respuesta cruda de Fake Store API (https://fakestoreapi.com/products). */
export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/** Servicio de Muñoz Solutions (producto de Fake Store ya mapeado). */
export interface Servicio {
  id: number;
  nombre: string;
  costoEstimado: number;
  descripcion: string;
  categoria: string;
  imagen: string;
  calificacion: number;
  totalReviews: number;
}

/** Fila de la tabla `consultas` en Supabase. */
export interface Consulta {
  id?: string;
  email: string;
  phone?: string;
  servicio_id: number;
  servicio_nombre: string;
  notas?: string;
  estado?: "nueva" | "contactado" | "descartado";
  created_at?: string;
}

/** Payload que enviamos al crear una consulta. */
export interface ConsultaInput {
  email: string;
  phone?: string;
  servicio_id: number;
  servicio_nombre: string;
  notas?: string;
}
