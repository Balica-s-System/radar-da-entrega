import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface DealershipPageProps {
  params: Promise<{
    dealershipId: string;
  }>;
}

async function getDealership(id: string) {
  return {
    id,
    name: "Concessionária Central",
  };
}

export async function generateMetadata({
  params,
}: DealershipPageProps): Promise<Metadata> {
  const { dealershipId } = await params;
  const dealership = await getDealership(dealershipId);

  return {
    title: dealership
      ? `${dealership.name} | Radar da Entrega`
      : "Painel Administrativo | Radar da Entrega",
    description: `Painel de gestão e frotas da ${dealership?.name || "sua concessionária"}.`,
  };
}

export default async function DealershipPage({ params }: DealershipPageProps) {
  const { dealershipId } = await params;

  redirect(`/app/${dealershipId}/dashboard`);

  return null;
}
