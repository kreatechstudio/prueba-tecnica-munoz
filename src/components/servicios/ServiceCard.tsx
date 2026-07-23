import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { slideUp } from "@/lib/animations";
import { formatCosto } from "@/utils/format";
import type { Servicio } from "@/types";

interface ServiceCardProps {
  servicio: Servicio;
  onSelect: (servicio: Servicio) => void;
}

/** Card individual de un servicio. Abre el modal de detalle al hacer clic. */
export function ServiceCard({ servicio, onSelect }: ServiceCardProps) {
  return (
    <motion.button
      type="button"
      variants={slideUp}
      onClick={() => onSelect(servicio)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={`Ver detalles y consultar: ${servicio.nombre}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-colors hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex h-48 items-center justify-center overflow-hidden bg-white p-6">
        <img
          src={servicio.imagen}
          alt={servicio.nombre}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Badge className="mb-2 w-fit bg-navy text-navy-foreground hover:bg-navy">
          {servicio.categoria}
        </Badge>

        <h3 className="line-clamp-2 text-base font-semibold text-foreground">{servicio.nombre}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{servicio.descripcion}</p>

        <div className="mt-3 flex items-center gap-1 text-sm">
          <Star className="size-4 fill-orange text-orange" aria-hidden="true" />
          <span className="font-medium text-foreground">{servicio.calificacion.toFixed(1)}</span>
          <span className="text-muted-foreground">({servicio.totalReviews} reseñas)</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-bold text-primary">
            {formatCosto(servicio.costoEstimado)}
          </span>
          <span className="text-sm font-medium text-navy transition-colors group-hover:text-primary">
            Ver detalles →
          </span>
        </div>
      </div>
    </motion.button>
  );
}
