import type { FakeStoreProduct, Servicio } from "@/types";

/**
 * Traducción de las categorías reales de Fake Store al español.
 * Se respeta lo que la API realmente devuelve (ropa, joyería, electrónica)
 * en lugar de reetiquetarlo como otra cosa.
 */
export const categoriaMap: Record<string, string> = {
  electronics: "Electrónica",
  jewelery: "Joyería",
  "men's clothing": "Ropa de hombre",
  "women's clothing": "Ropa de mujer",
};

/** Categoría de fallback cuando Fake Store devuelve una categoría desconocida. */
const CATEGORIA_DEFAULT = "Otros";

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
