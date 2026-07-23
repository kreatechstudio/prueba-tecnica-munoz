// Tipos TypeScript del proyecto Catálogo Muñoz Solutions

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen?: string;
  precio?: number;
}

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

export interface ConsultaInput {
  email: string;
  phone?: string;
  servicio_id: number;
  servicio_nombre: string;
  notas?: string;
}
