import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Formulario de acceso al panel de administración (Supabase Auth). */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("No se pudo iniciar sesión", { description: error.message });
    }
    // En éxito, onAuthStateChange actualiza la sesión y muestra el panel.
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col rounded-lg border border-border bg-card p-8 shadow-sm">
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
        <Lock className="size-6" aria-hidden="true" />
      </span>
      <h1 className="text-center text-xl font-bold text-navy">Panel de administración</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Acceso restringido a Muñoz Solutions.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@munozsolutions.mx"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="admin-password">Contraseña</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {loading ? "Entrando..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}
