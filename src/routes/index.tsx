import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/servicios/SearchBar";
import { CategoryFilter } from "@/components/servicios/CategoryFilter";
import { ServiceList } from "@/components/servicios/ServiceList";
import { ServiceModal } from "@/components/servicios/ServiceModal";
import { LoadingSkeleton } from "@/components/servicios/LoadingSkeleton";
import { ErrorState } from "@/components/servicios/ErrorState";
import { EmptyState } from "@/components/servicios/EmptyState";
import { useServices } from "@/hooks/useServices";
import { useDebounce } from "@/hooks/useDebounce";
import { fadeIn } from "@/lib/animations";
import type { Servicio } from "@/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { servicios, isLoading, isError, error, refetch } = useServices();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [categoriasSel, setCategoriasSel] = useState<string[]>([]);
  const [seleccionado, setSeleccionado] = useState<Servicio | null>(null);

  // Servicios que coinciden con la búsqueda (nombre o descripción).
  const porBusqueda = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return servicios;
    return servicios.filter(
      (s) => s.nombre.toLowerCase().includes(q) || s.descripcion.toLowerCase().includes(q),
    );
  }, [servicios, debouncedSearch]);

  // Categorías disponibles con su conteo (según la búsqueda actual).
  const categorias = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const s of porBusqueda) {
      conteo.set(s.categoria, (conteo.get(s.categoria) ?? 0) + 1);
    }
    return Array.from(conteo, ([nombre, count]) => ({ nombre, count })).sort((a, b) =>
      a.nombre.localeCompare(b.nombre),
    );
  }, [porBusqueda]);

  // Resultado final: búsqueda + filtro de categorías combinados.
  const resultado = useMemo(() => {
    if (categoriasSel.length === 0) return porBusqueda;
    return porBusqueda.filter((s) => categoriasSel.includes(s.categoria));
  }, [porBusqueda, categoriasSel]);

  function toggleCategoria(categoria: string) {
    setCategoriasSel((prev) =>
      prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria],
    );
  }

  function limpiarFiltros() {
    setSearch("");
    setCategoriasSel([]);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-navy to-navy/85 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Catálogo de servicios de seguridad electrónica
            </h1>
            <p className="mt-3 max-w-xl text-navy-foreground/80">
              CCTV, control de acceso, alarmas residenciales y mantenimiento. Explora nuestros
              servicios y solicita una consulta sin compromiso.
            </p>
            <div className="mt-6 max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : isError ? (
          <ErrorState message={error?.message} onRetry={() => refetch()} />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CategoryFilter
                categorias={categorias}
                seleccionadas={categoriasSel}
                onToggle={toggleCategoria}
                onClear={() => setCategoriasSel([])}
                totalResultados={resultado.length}
              />
            </div>

            <div>
              {resultado.length === 0 ? (
                <EmptyState onClear={limpiarFiltros} />
              ) : (
                <ServiceList
                  servicios={resultado}
                  onSelect={setSeleccionado}
                  animationKey={`${debouncedSearch}|${categoriasSel.join(",")}`}
                />
              )}
            </div>
          </div>
        )}
      </section>

      <ServiceModal servicio={seleccionado} onClose={() => setSeleccionado(null)} />
    </Layout>
  );
}
