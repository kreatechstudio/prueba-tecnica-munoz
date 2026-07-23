/**
 * Formatea el costo estimado como rango en pesos mexicanos.
 * Fake Store entrega un precio único; lo presentamos como rango "desde"
 * para reflejar que un servicio real se cotiza según alcance.
 */
export function formatCosto(precio: number): string {
  const nf = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
  return `Desde ${nf.format(precio)} MXN`;
}
