import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { crearConsulta } from "@/lib/api";
import { formatCosto } from "@/utils/format";
import type { Servicio } from "@/types";

const consultaSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Ingresa un email válido"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 10,
      "El teléfono debe tener al menos 10 dígitos",
    ),
  notas: z.string().optional(),
});

type ConsultaFormValues = z.infer<typeof consultaSchema>;

interface ServiceModalProps {
  servicio: Servicio | null;
  onClose: () => void;
}

/**
 * Modal de detalle de servicio + formulario de consulta.
 * La accesibilidad (ESC, clic fuera, focus trap, role=dialog) la aporta Radix
 * Dialog; la entrada anima con slide desde la derecha.
 */
export function ServiceModal({ servicio, onClose }: ServiceModalProps) {
  const open = servicio !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
    defaultValues: { email: "", phone: "", notas: "" },
  });

  const mutation = useMutation({
    mutationFn: crearConsulta,
    onSuccess: () => {
      toast.success("Consulta enviada", {
        description: "Muñoz Solutions te contactará muy pronto.",
      });
    },
    onError: (error: Error) => {
      toast.error("No se pudo enviar la consulta", { description: error.message });
    },
  });

  // Al cerrar el modal, reseteamos formulario y estado de la mutación.
  useEffect(() => {
    if (!open) {
      reset();
      mutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Tras un envío exitoso, cerramos automáticamente a los 2 segundos.
  useEffect(() => {
    if (!mutation.isSuccess) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [mutation.isSuccess, onClose]);

  function onSubmit(values: ConsultaFormValues) {
    if (!servicio) return;
    mutation.mutate({
      email: values.email,
      phone: values.phone || undefined,
      notas: values.notas || undefined,
      servicio_id: servicio.id,
      servicio_nombre: servicio.nombre,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto data-[state=open]:slide-in-from-right-8 data-[state=closed]:slide-out-to-right-8">
        {servicio && (
          <>
            <div className="flex h-56 items-center justify-center rounded-lg bg-white p-6">
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="h-full w-full object-contain"
              />
            </div>

            <DialogHeader>
              <Badge className="mb-1 w-fit bg-navy text-navy-foreground hover:bg-navy">
                {servicio.categoria}
              </Badge>
              <DialogTitle className="text-2xl text-navy">{servicio.nombre}</DialogTitle>
              <DialogDescription className="sr-only">
                Detalle del producto y formulario de consulta
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-orange text-orange" aria-hidden="true" />
                <span className="font-medium">{servicio.calificacion.toFixed(1)}</span>
                <span className="text-muted-foreground">({servicio.totalReviews} reseñas)</span>
              </span>
              <span className="font-bold text-primary">{formatCosto(servicio.costoEstimado)}</span>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Descripción</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {servicio.descripcion}
              </p>
            </div>

            {mutation.isSuccess ? (
              <div className="flex flex-col items-center rounded-lg border-2 border-success/40 bg-success/5 px-6 py-8 text-center">
                <CheckCircle2 className="mb-3 size-12 text-success" aria-hidden="true" />
                <p className="text-lg font-semibold text-foreground">
                  ¡Consulta enviada con éxito!
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <h3 className="text-sm font-bold uppercase tracking-wide text-navy">
                  Solicitar información
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="867 123 4567"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notas">Notas (opcional)</Label>
                  <Textarea
                    id="notas"
                    rows={3}
                    placeholder="Cuéntanos qué necesitas: ubicación, número de cámaras, tipo de inmueble..."
                    {...register("notas")}
                  />
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {mutation.isPending && (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    )}
                    {mutation.isPending ? "Enviando..." : "Enviar consulta"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
