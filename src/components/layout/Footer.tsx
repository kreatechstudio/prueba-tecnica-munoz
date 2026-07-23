import { Link } from "@tanstack/react-router";

/** Footer institucional simple. */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm sm:px-6">
        <p className="font-bold">MUÑOZ SOLUTIONS</p>
        <p className="text-navy-foreground/70">
          Catálogo de productos en línea: ropa, joyería y electrónica.
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-navy-foreground/60">
          <span>Prototipo funcional · Catálogo de productos · {new Date().getFullYear()}</span>
          <span aria-hidden="true">·</span>
          <Link to="/admin" className="underline underline-offset-2 hover:text-navy-foreground">
            Administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
