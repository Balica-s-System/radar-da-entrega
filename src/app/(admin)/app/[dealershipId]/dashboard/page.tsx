import { headers } from "next/headers";
import Image from "next/image";
import { TrendingUp, Truck, PackageCheck, AlertTriangle } from "lucide-react";
import { auth } from "@/lib/auth";
import { EarningChart } from "@/components/dashboard/earning-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardRoute({
  params,
}: {
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug: dealershipId },
    headers: await headers(),
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        {org?.logo && (
          <Image
            src={org.logo}
            alt={org.name}
            width={48}
            height={48}
            className="size-12 rounded-xl object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{org?.name ?? "Dashboard"}</h1>
          <p className="text-sm text-muted-foreground">
            Visão geral da organização
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Entregas"
          value="1,248"
          trend={{ value: "+12.5%", direction: "up" }}
          subtitle="Últimos 30 dias"
          icon={<Truck size={18} />}
        />
        <StatCard
          title="Em Andamento"
          value="84"
          trend={{ value: "+5.2%", direction: "up" }}
          subtitle="Nesta semana"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          title="Concluídas Hoje"
          value="156"
          trend={{ value: "-3.1%", direction: "down" }}
          subtitle="Comparado a ontem"
          icon={<PackageCheck size={18} />}
        />
        <StatCard
          title="Atrasadas"
          value="12"
          trend={{ value: "+8.3%", direction: "up" }}
          subtitle="Requer atenção"
          icon={<AlertTriangle size={18} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningChart />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 min atrás", text: "Entrega #1245 concluída" },
                { time: "15 min atrás", text: "Nova entrega #1246 registrada" },
                { time: "1h atrás", text: "Entrega #1240 saiu para entrega" },
                { time: "2h atrás", text: "Cliente João alterou endereço" },
                { time: "3h atrás", text: "Entrega #1238 atrasada" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="mt-1 size-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
