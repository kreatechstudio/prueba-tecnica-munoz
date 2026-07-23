import { Link } from "@tanstack/react-router";
import { ShieldCheck, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Header fijo con la identidad de Muñoz Solutions. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-navy text-navy-foreground">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-navy">
              MUÑOZ <span className="text-primary">SOLUTIONS</span>
            </p>
            <p className="text-xs text-muted-foreground">Catálogo de productos en línea</p>
          </div>
        </Link>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="ml-auto border-navy/30 text-navy hover:bg-navy hover:text-navy-foreground"
        >
          <Link to="/admin">
            <UserCog className="size-4" />
            <span className="hidden sm:inline">Administración</span>
            <span className="sm:hidden">Admin</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
