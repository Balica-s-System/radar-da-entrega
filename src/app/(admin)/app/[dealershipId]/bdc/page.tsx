import type { ColumnDef } from "@tanstack/react-table";
import { Phone, Mail, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";

type Lead = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  date: string;
  status: "new" | "contacted" | "qualified" | "lost";
};

const data: Lead[] = [
  { name: "Carlos Eduardo", phone: "(11) 99999-0001", email: "carlos@email.com", interest: "CG 160", date: "28/06", status: "new" },
  { name: "Ana Beatriz", phone: "(11) 99999-0002", email: "ana@email.com", interest: "Factor 150", date: "28/06", status: "contacted" },
  { name: "Roberto Lima", phone: "(11) 99999-0003", email: "roberto@email.com", interest: "Biz 125", date: "27/06", status: "qualified" },
  { name: "Juliana Mendes", phone: "(11) 99999-0004", email: "juliana@email.com", interest: "Pop 110", date: "27/06", status: "lost" },
  { name: "Fernando Alves", phone: "(11) 99999-0005", email: "fernando@email.com", interest: "YBR 150", date: "26/06", status: "new" },
  { name: "Patrícia Souza", phone: "(11) 99999-0006", email: "patricia@email.com", interest: "Intruder 150", date: "26/06", status: "contacted" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Novo", variant: "default" },
  contacted: { label: "Contactado", variant: "secondary" },
  qualified: { label: "Qualificado", variant: "outline" },
  lost: { label: "Perdido", variant: "destructive" },
};

const columns: ColumnDef<Lead>[] = [
  { accessorKey: "name", header: "Nome", enableSorting: true },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Phone size={14} className="text-muted-foreground" />
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Mail size={14} className="text-muted-foreground" />
        {row.getValue("email")}
      </div>
    ),
  },
  { accessorKey: "interest", header: "Interesse" },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Calendar size={14} className="text-muted-foreground" />
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = statusMap[row.getValue("status") as string];
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm">Ligar</Button>
        <Button variant="ghost" size="sm">Email</Button>
      </div>
    ),
  },
];

export default function BDCPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">BDC</h1>
        <p className="text-sm text-muted-foreground">
          Business Development Center — Gestão de leads e prospecção
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {data.filter((l) => l.status === "new").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Qualificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {data.filter((l) => l.status === "qualified").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {Math.round((data.filter((l) => l.status === "qualified").length / data.length) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Pesquisar leads..."
      />
    </div>
  );
}
