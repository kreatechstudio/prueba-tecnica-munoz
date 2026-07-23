import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/admin/LoginForm";
import { ConsultasTable } from "@/components/admin/ConsultasTable";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  // La sesión vive en el cliente (localStorage). Renderizamos un estado neutro
  // hasta montar para evitar desajustes de hidratación con el SSR.
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase?.auth.signOut();
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {!mounted ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Cargando…</div>
        ) : !isSupabaseConfigured ? (
          <div className="mx-auto max-w-md rounded-lg border-2 border-error/50 bg-error/5 px-6 py-10 text-center">
            <p className="font-semibold text-foreground">Supabase no está configurado</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el entorno.
            </p>
          </div>
        ) : !session ? (
          <LoginForm />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-navy">Consultas recibidas</h1>
                <p className="text-sm text-muted-foreground">Sesión: {session.user.email}</p>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="size-4" />
                Cerrar sesión
              </Button>
            </div>
            <ConsultasTable />
          </>
        )}
      </section>
    </Layout>
  );
}
