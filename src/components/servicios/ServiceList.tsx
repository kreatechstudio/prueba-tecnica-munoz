import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { ServiceCard } from "./ServiceCard";
import type { Servicio } from "@/types";

interface ServiceListProps {
  servicios: Servicio[];
  onSelect: (servicio: Servicio) => void;
  /** Al cambiar (búsqueda/filtro), remonta el grid para re-disparar el stagger. */
  animationKey?: string;
}

/** Grid responsivo de servicios con animación stagger de entrada. */
export function ServiceList({ servicios, onSelect, animationKey }: ServiceListProps) {
  return (
    <motion.div
      key={animationKey}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {servicios.map((servicio) => (
        <ServiceCard key={servicio.id} servicio={servicio} onSelect={onSelect} />
      ))}
    </motion.div>
  );
}
