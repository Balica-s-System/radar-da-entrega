import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import DealershipForm from "./_components/dealership-form";

export const metadata: Metadata = {
  title: "Cadastrar Concessionária | Radar da Entrega",
  description:
    "Cadastre sua concessionária no Radar da Entrega para gerenciar frotas, motoristas e otimizar suas operações de entrega.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DealershipRoute() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Link
        href="/onboarding"
        className="absolute top-6 right-6 group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Voltar
      </Link>

      <DealershipForm />
    </div>
  );
}
