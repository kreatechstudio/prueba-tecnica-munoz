import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

/** Estado de error con mensaje claro y botón "Reintentar". */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center rounded-lg border-2 border-error/50 bg-error/5 px-6 py-10 text-center"
    >
      <AlertTriangle className="mb-4 size-12 text-error" aria-hidden="true" />
      <h2 className="text-xl font-bold text-foreground">Error al cargar los servicios</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {message ?? "Verifica tu conexión o intenta de nuevo en unos momentos."}
      </p>
      <Button onClick={onRetry} className="mt-6 bg-error text-error-foreground hover:bg-error/90">
        <RotateCw className="size-4" />
        Reintentar
      </Button>
    </div>
  );
}
