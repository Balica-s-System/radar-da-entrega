import { headers } from "next/headers";
import { DollarSign, PackageCheck, ShoppingBag, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { EarningChart } from "@/components/dashboard/earning-chart";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function AnalyticsPage({
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
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Métricas e indicadores {org?.name ? `da ${org.name}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita Total"
          value="$42.5k"
          trend={{ value: "+22%", direction: "up" }}
          subtitle="Último ano"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          title="Entregas"
          value="155K"
          trend={{ value: "+12%", direction: "up" }}
          subtitle="Últimos 4 meses"
          icon={<ShoppingBag size={18} />}
        />
        <StatCard
          title="Concluídas"
          value="89.3K"
          trend={{ value: "-16%", direction: "down" }}
          subtitle="Último ano"
          icon={<PackageCheck size={18} />}
        />
        <StatCard
          title="Clientes"
          value="1.2K"
          trend={{ value: "+38%", direction: "up" }}
          subtitle="Últimos 6 meses"
          icon={<Users size={18} />}
        />
      </div>

      <EarningChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Top Serviços por Demanda
          </h3>
          <div className="space-y-4">
            {[
              { label: "Entrega Expressa", value: 92 },
              { label: "Entrega Agendada", value: 78 },
              { label: "Coleta Programada", value: 65 },
              { label: "Devolução", value: 45 },
              { label: "Troca Rápida", value: 30 },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Conversão
          </h3>
          <div className="space-y-6">
            {[
              { label: "Impressões", value: "12.2K", pct: 100 },
              { label: "Visitas", value: "8.4K", pct: 69 },
              { label: "Solicitações", value: "2.3K", pct: 19 },
              { label: "Orçamentos", value: "856", pct: 7 },
              { label: "Contratos", value: "328", pct: 2.7 },
            ].map((item, i) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {i + 1}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
