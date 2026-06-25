import { Building2, ChevronRight, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Onboarding | Radar da Entrega",
  description:
    "Selecione como deseja começar no Radar da Entrega: criando uma nova organização ou configurando seu perfil de membro.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-xl mx-auto p-4">
      <Card className="w-full shadow-lg border-muted/60">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Como deseja começar?
          </CardTitle>
          <CardDescription>
            Selecione uma das opções abaixo para configurar o seu acesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">
          <Link
            href="/onboarding/dealership"
            className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Building2 className="size-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground">
                  Criar Organização
                </span>
                <span className="text-xs text-muted-foreground">
                  Cadastre sua empresa, concessionária.
                </span>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* Opção 2: Criar Perfil */}
          <Link
            href="/onboarding/member"
            className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <UserPlus className="size-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground">
                  Criar Perfil
                </span>
                <span className="text-xs text-muted-foreground">
                  Entre como membro de um grupo existente.
                </span>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
