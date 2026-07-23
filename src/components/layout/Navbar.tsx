import { ShieldCheck } from "lucide-react";

/** Header fijo con la identidad de Muñoz Solutions. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <span className="flex size-10 items-center justify-center rounded-md bg-navy text-navy-foreground">
          <ShieldCheck className="size-6" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight text-navy">
            MUÑOZ <span className="text-primary">SOLUTIONS</span>
          </p>
          <p className="text-xs text-muted-foreground">Seguridad electrónica · Nuevo Laredo</p>
        </div>
      </div>
    </header>
  );
}
