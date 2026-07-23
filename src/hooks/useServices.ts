import { useQuery } from "@tanstack/react-query";
import { fetchServicios } from "@/lib/api";
import type { Servicio } from "@/types";

/**
 * Hook central de datos: consume Fake Store API vía TanStack Query, expone
 * los servicios ya mapeados y todos los estados de la petición
 * (isLoading, isError, error, refetch) para que la UI reaccione a cada uno.
 */
export function useServices() {
  const query = useQuery<Servicio[], Error>({
    queryKey: ["servicios"],
    queryFn: ({ signal }) => fetchServicios(signal),
    staleTime: 1000 * 60 * 5, // 5 min: el catálogo cambia poco
    retry: 2,
  });

  return {
    servicios: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
