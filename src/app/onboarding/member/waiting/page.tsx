"use client";

import { Hourglass, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function WaitingPage() {
  const handleCheckStatus = () => {
    console.log("Verificando se o gerente já aprovou...");
    // Aqui você pode recarregar a sessão ou revalidar os dados do banco
  };

  const handleLogout = () => {
    console.log("Fazendo logout...");
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <Card className="p-0 max-w-md w-full gap-0 shadow-lg border-muted/60 text-center">
        <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-4 px-6">
          {/* Ícone de status animado */}
          <div className="w-16 h-16 rounded-full bg-accent border border-border flex items-center justify-center text-muted-foreground shadow-inner">
            <Hourglass className="size-7 text-primary/70 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-medium text-card-foreground tracking-tight">
              Aguardando Aprovação
            </h2>
            <p className="text-xs text-muted-foreground font-normal">
              Solicitação enviada com sucesso
            </p>
          </div>
        </CardHeader>

        <CardContent className="py-4 px-6 space-y-4">
          <p className="text-sm text-muted-foreground font-normal leading-relaxed">
            Seu perfil foi criado. Agora, o gerente responsável pela
            concessionária precisa aprovar a sua entrada na organização para
            você liberar o acesso ao painel.
          </p>

          <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-left">
            <p className="text-xs font-medium text-primary mb-1">
              Próximos passos:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside font-normal">
              <li>Avise o seu gerente para acessar o sistema.</li>
              <li>Peça para ele aprovar o e-mail cadastrado.</li>
              <li>Clique no botão abaixo para atualizar o status.</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="py-5 px-6 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-3 bg-card rounded-b-xl">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-lg cursor-pointer h-9 shadow-xs w-full sm:w-auto text-sm gap-2"
          >
            <LogOut className="size-4" />
            Sair da Conta
          </Button>

          <Button
            onClick={handleCheckStatus}
            className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto text-sm gap-2"
          >
            <RefreshCw className="size-4" />
            Verificar Status
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
