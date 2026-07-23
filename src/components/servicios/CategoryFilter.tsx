import { Checkbox } from "@/components/ui/checkbox";

export interface CategoriaOption {
  nombre: string;
  count: number;
}

interface CategoryFilterProps {
  categorias: CategoriaOption[];
  seleccionadas: string[];
  onToggle: (categoria: string) => void;
  onClear: () => void;
  totalResultados: number;
}

/** Filtro de categorías con checkboxes múltiples y contador por categoría. */
export function CategoryFilter({
  categorias,
  seleccionadas,
  onToggle,
  onClear,
  totalResultados,
}: CategoryFilterProps) {
  const hayFiltros = seleccionadas.length > 0;

  return (
    <aside className="rounded-lg border border-border bg-muted/40 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-navy">
          Filtrar por categoría
        </h2>
        {hayFiltros && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-primary hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-1">
        {categorias.map(({ nombre, count }) => {
          const checked = seleccionadas.includes(nombre);
          const id = `cat-${nombre}`;
          return (
            <li key={nombre}>
              <label
                htmlFor={id}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-background"
              >
                <Checkbox id={id} checked={checked} onCheckedChange={() => onToggle(nombre)} />
                <span className="flex-1 text-foreground">{nombre}</span>
                <span className="text-xs text-muted-foreground">({count})</span>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        {totalResultados} {totalResultados === 1 ? "producto encontrado" : "productos encontrados"}
      </p>
    </aside>
  );
}
