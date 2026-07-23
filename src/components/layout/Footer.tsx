/** Footer institucional simple. */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm sm:px-6">
        <p className="font-bold">MUÑOZ SOLUTIONS</p>
        <p className="text-navy-foreground/70">
          Instalación de CCTV, control de acceso, alarmas y mantenimiento en Nuevo Laredo,
          Tamaulipas.
        </p>
        <p className="mt-2 text-xs text-navy-foreground/60">
          Prototipo funcional · Catálogo de servicios · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
