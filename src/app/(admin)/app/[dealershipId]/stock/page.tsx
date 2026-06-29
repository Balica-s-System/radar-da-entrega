import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table/data-table";

type Product = {
  model: string;
  brand: string;
  year: number;
  chassis: string;
  quantity: number;
  status: "available" | "reserved" | "sold";
};

const data: Product[] = [
  { model: "CG 160", brand: "Honda", year: 2025, chassis: "9C2KC0810P1000001", quantity: 5, status: "available" },
  { model: "Factor 150", brand: "Yamaha", year: 2025, chassis: "9C2KC0810P1000002", quantity: 3, status: "available" },
  { model: "Biz 125", brand: "Honda", year: 2024, chassis: "9C2KC0810P1000003", quantity: 1, status: "reserved" },
  { model: "Intruder 150", brand: "Suzuki", year: 2025, chassis: "9C2KC0810P1000004", quantity: 2, status: "available" },
  { model: "Pop 110", brand: "Honda", year: 2024, chassis: "9C2KC0810P1000005", quantity: 0, status: "sold" },
  { model: "YBR 150", brand: "Yamaha", year: 2025, chassis: "9C2KC0810P1000006", quantity: 4, status: "available" },
  { model: "FZ15", brand: "Yamaha", year: 2025, chassis: "9C2KC0810P1000007", quantity: 2, status: "reserved" },
  { model: "CB 300F", brand: "Honda", year: 2025, chassis: "9C2KC0810P1000008", quantity: 1, status: "available" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  available: { label: "Disponível", variant: "outline" },
  reserved: { label: "Reservado", variant: "secondary" },
  sold: { label: "Vendido", variant: "default" },
};

const columns: ColumnDef<Product>[] = [
  { accessorKey: "model", header: "Modelo", enableSorting: true },
  { accessorKey: "brand", header: "Marca" },
  { accessorKey: "year", header: "Ano" },
  {
    accessorKey: "chassis",
    header: "Chassi",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("chassis")}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Qtd",
    cell: ({ row }) => {
      const qty = row.getValue("quantity") as number;
      return (
        <span className={qty === 0 ? "text-destructive font-medium" : ""}>
          {qty}
        </span>
      );
    },
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Histórico</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function StockPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Estoque</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie o estoque de veículos
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
            <p className="text-2xl font-bold">
              {data.reduce((acc, p) => acc + p.quantity, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {data.filter((p) => p.status === "available").reduce((acc, p) => acc + p.quantity, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {data.filter((p) => p.status === "reserved").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Marcas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Set(data.map((p) => p.brand)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="model"
        searchPlaceholder="Pesquisar por modelo..."
      />
    </div>
  );
}
