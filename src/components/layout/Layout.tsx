import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Estructura de página: header fijo + contenido + footer. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
