import type { FakeStoreProduct, Servicio } from "@/types";

/**
 * Mapeo estratégico Fake Store → categorías de seguridad de Muñoz Solutions.
 * Convierte un dataset de e-commerce genérico en un catálogo de servicios
 * con contexto comercial real para el cliente.
 */
export const categoriaMap: Record<string, string> = {
  electronics: "Sistemas CCTV",
  jewelery: "Control de Acceso",
  "men's clothing": "Alarmas Residenciales",
  "women's clothing": "Mantenimiento y Soporte",
};

/** Categoría de fallback cuando Fake Store devuelve una categoría desconocida. */
const CATEGORIA_DEFAULT = "Servicios Generales";

export function mapCategoria(categoriaFakeStore: string): string {
  return categoriaMap[categoriaFakeStore] ?? CATEGORIA_DEFAULT;
}

/** Transforma un producto de Fake Store en un Servicio de Muñoz Solutions. */
export function mapProductoAServicio(producto: FakeStoreProduct): Servicio {
  return {
    id: producto.id,
    nombre: producto.title,
    costoEstimado: producto.price,
    descripcion: producto.description,
    categoria: mapCategoria(producto.category),
    imagen: producto.image,
    calificacion: producto.rating?.rate ?? 0,
    totalReviews: producto.rating?.count ?? 0,
  };
}

export function mapProductosAServicios(productos: FakeStoreProduct[]): Servicio[] {
  return productos.map(mapProductoAServicio);
}
