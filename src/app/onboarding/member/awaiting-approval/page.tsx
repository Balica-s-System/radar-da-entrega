import type { Metadata } from "next";
import WaitingApprovalPage from "./_components/waiting-approval-form";

export const metadata: Metadata = {
  title: "Aguardando Aprovação | Radar da Entrega",
  description:
    "Seu perfil de membro está criado e aguardando a aprovação do gerente da concessionária.",
  robots: {
    index: false,
  },
};

export default function Page() {
  return <WaitingApprovalPage />;
}
