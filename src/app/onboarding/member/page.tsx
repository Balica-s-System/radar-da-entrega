import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import MemberForm from "./_components/member-form";

export const metadata: Metadata = {
  title: "Criar Perfil de Membro | Radar da Entrega",
  description:
    "Configure seu perfil de membro ou motorista no Radar da Entrega.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MemberRoute() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <Link
        href="/onboarding"
        className="absolute top-6 right-6 group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Voltar
      </Link>

      <MemberForm />
    </div>
  );
}
