import type { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/data-table";

type Delivery = {
  id: string;
  client: string;
  address: string;
  status: "pending" | "in_transit" | "delivered" | "delayed";
  driver: string;
  date: string;
};

const data: Delivery[] = [
  { id: "#1245", client: "João Silva", address: "Rua A, 123", status: "delivered", driver: "Carlos", date: "28/06" },
  { id: "#1246", client: "Maria Souza", address: "Av. B, 456", status: "in_transit", driver: "Ana", date: "28/06" },
  { id: "#1247", client: "Pedro Santos", address: "Rua C, 789", status: "pending", driver: "Carlos", date: "29/06" },
  { id: "#1248", client: "Ana Costa", address: "Av. D, 321", status: "delayed", driver: "Ana", date: "28/06" },
  { id: "#1249", client: "Lucas Oliveira", address: "Rua E, 654", status: "delivered", driver: "Carlos", date: "27/06" },
  { id: "#1250", client: "Juliana Lima", address: "Av. F, 987", status: "in_transit", driver: "Ana", date: "28/06" },
  { id: "#1251", client: "Rafael Alves", address: "Rua G, 147", status: "pending", driver: "Carlos", date: "29/06" },
  { id: "#1252", client: "Fernanda Rocha", address: "Av. H, 258", status: "delivered", driver: "Ana", date: "27/06" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  in_transit: { label: "Em Trânsito", variant: "default" },
  delivered: { label: "Entregue", variant: "outline" },
  delayed: { label: "Atrasada", variant: "destructive" },
};

const columns: ColumnDef<Delivery>[] = [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "client", header: "Cliente", enableSorting: true },
  { accessorKey: "address", header: "Endereço" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = statusMap[row.getValue("status") as string];
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  { accessorKey: "driver", header: "Entregador" },
  { accessorKey: "date", header: "Data" },
];

export default function DeliveriesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Entregas</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie todas as entregas da organização
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Trânsito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {data.filter((d) => d.status === "in_transit").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {data.filter((d) => d.status === "delivered").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Atrasadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {data.filter((d) => d.status === "delayed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="client"
        searchPlaceholder="Pesquisar por cliente..."
      />
    </div>
  );
}
