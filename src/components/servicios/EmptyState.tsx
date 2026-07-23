import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClear?: () => void;
}

/** Se muestra cuando búsqueda/filtros no arrojan resultados. */
export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-lg border border-border bg-muted/40 px-6 py-12 text-center">
      <SearchX className="mb-4 size-12 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-xl font-semibold text-foreground">No se encontraron servicios</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Prueba con otros términos de búsqueda o ajusta los filtros de categoría.
      </p>
      {onClear && (
        <Button variant="outline" onClick={onClear} className="mt-6">
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
