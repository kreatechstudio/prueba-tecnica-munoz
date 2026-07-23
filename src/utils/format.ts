/** Formatea el precio del producto en pesos mexicanos. */
export function formatCosto(precio: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(precio);
}
