import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/data-table";

type Client = {
  name: string;
  cpf: string;
  seller: string;
  city: string;
  billingDate: string;
  status: "active" | "inactive";
};

const data: Client[] = [
  { name: "João Silva", cpf: "123.456.789-00", seller: "Carlos", city: "São Paulo", billingDate: "15/06", status: "active" },
  { name: "Maria Souza", cpf: "987.654.321-00", seller: "Ana", city: "Rio de Janeiro", billingDate: "20/06", status: "active" },
  { name: "Pedro Santos", cpf: "456.789.123-00", seller: "Carlos", city: "Belo Horizonte", billingDate: "10/06", status: "inactive" },
  { name: "Ana Costa", cpf: "321.654.987-00", seller: "Ana", city: "Curitiba", billingDate: "25/06", status: "active" },
  { name: "Lucas Oliveira", cpf: "789.123.456-00", seller: "Carlos", city: "Porto Alegre", billingDate: "05/06", status: "active" },
  { name: "Juliana Lima", cpf: "654.321.789-00", seller: "Ana", city: "Salvador", billingDate: "30/06", status: "inactive" },
  { name: "Rafael Alves", cpf: "147.258.369-00", seller: "Carlos", city: "Fortaleza", billingDate: "12/06", status: "active" },
  { name: "Fernanda Rocha", cpf: "258.369.147-00", seller: "Ana", city: "Recife", billingDate: "18/06", status: "active" },
];

const columns: ColumnDef<Client>[] = [
  { accessorKey: "name", header: "Nome", enableSorting: true },
  { accessorKey: "cpf", header: "CPF" },
  { accessorKey: "seller", header: "Vendedor" },
  { accessorKey: "city", header: "Cidade" },
  { accessorKey: "billingDate", header: "Data Cobrança" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("status") === "active";
      return (
        <Badge variant={active ? "outline" : "secondary"}>
          {active ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Ver entregas</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Desativar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os clientes da organização
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
              Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {data.filter((c) => c.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-muted-foreground">
              {data.filter((c) => c.status === "inactive").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Pesquisar por nome..."
      />
    </div>
  );
}
