import type { Metadata } from "next";

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
  const dealership = await getDealership(dealershipId);

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Painel de Gestão — {dealership?.name || "Carregando..."}
        </h1>
        <p className="text-sm text-muted-foreground">
          ID da Concessionária Ativa:{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            {dealershipId}
          </code>
        </p>
      </div>

      {/* O restante do seu painel vai aqui */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Cards de métricas, frotas, entregas, etc. */}
      </div>
    </div>
  );
}
