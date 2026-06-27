"use client";

import { CheckCircle2, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function AcceptInvitationPage() {
  const params = useParams<{ invitationId: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "accepted" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!params.invitationId) return;

    async function accept() {
      try {
        const session = await authClient.getSession();

        if (!session.data) {
          router.push(`/login?callbackURL=/accept-invitation/${params.invitationId}`);
          return;
        }

        const { error } = await authClient.organization.acceptInvitation({
          invitationId: params.invitationId,
        });

        if (error) {
          setErrorMessage(error.message || "Erro ao aceitar convite.");
          setStatus("error");
          return;
        }

        const { data: orgs } = await authClient.organization.list();

        if (orgs && orgs.length > 0) {
          await authClient.organization.setActive({
            organizationId: orgs[0].id,
          });
        }

        setStatus("accepted");
        toast.success("Convite aceito com sucesso!");
      } catch {
        setErrorMessage("Erro inesperado ao aceitar convite.");
        setStatus("error");
      }
    }

    accept();
  }, [params.invitationId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Loader className="size-12 animate-spin text-primary" />
              </div>
              <CardTitle>Aceitando convite...</CardTitle>
              <CardDescription>
                Aguarde enquanto processamos sua solicitação.
              </CardDescription>
            </CardHeader>
          </>
        )}

        {status === "accepted" && (
          <>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="size-12 text-green-500" />
              </div>
              <CardTitle>Convite aceito!</CardTitle>
              <CardDescription>
                Agora você faz parte da organização.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/onboarding")}
                className="w-full"
              >
                Ir para o painel
              </Button>
            </CardContent>
          </>
        )}

        {status === "error" && (
          <>
            <CardHeader>
              <CardTitle>Erro ao aceitar convite</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/onboarding")}
                className="w-full"
              >
                Ir para o início
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/accept-invitation/${params.invitationId}`)}
                className="w-full"
              >
                Tentar novamente
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
