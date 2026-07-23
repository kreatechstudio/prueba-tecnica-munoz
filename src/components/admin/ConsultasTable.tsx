import { useQuery } from "@tanstack/react-query";
import { Loader2, RotateCw } from "lucide-react";

import { listarConsultas } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Consulta } from "@/types";

const dateFmt = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatFecha(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : dateFmt.format(d);
}

function EstadoBadge({ estado }: { estado?: Consulta["estado"] }) {
  const map: Record<string, string> = {
    nueva: "bg-success text-success-foreground",
    contactado: "bg-navy text-navy-foreground",
    descartado: "bg-muted text-muted-foreground",
  };
  const clase = map[estado ?? "nueva"] ?? map.nueva;
  return <Badge className={`${clase} hover:opacity-90`}>{estado ?? "nueva"}</Badge>;
}

/** Listado de consultas recibidas (solo visible para el admin autenticado). */
export function ConsultasTable() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["consultas"],
    queryFn: listarConsultas,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        Cargando consultas...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border-2 border-error/50 bg-error/5 px-6 py-10 text-center">
        <p className="font-semibold text-foreground">No se pudieron cargar las consultas</p>
        <p className="mt-1 text-sm text-muted-foreground">{error?.message}</p>
        <Button onClick={() => refetch()} className="mt-4">
          <RotateCw className="size-4" />
          Reintentar
        </Button>
      </div>
    );
  }

  const consultas = data ?? [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {consultas.length} {consultas.length === 1 ? "consulta" : "consultas"} en total
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RotateCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      {consultas.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/40 px-6 py-12 text-center text-sm text-muted-foreground">
          Aún no hay consultas registradas.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Notas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultas.map((c) => (
                <TableRow key={c.id ?? `${c.email}-${c.created_at}`}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatFecha(c.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{c.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{c.phone || "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{c.servicio_nombre}</TableCell>
                  <TableCell className="max-w-[280px] whitespace-normal text-muted-foreground">
                    {c.notas || "—"}
                  </TableCell>
                  <TableCell>
                    <EstadoBadge estado={c.estado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
