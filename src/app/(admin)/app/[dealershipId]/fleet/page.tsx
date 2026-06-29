import { Truck, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Vehicle = {
  model: string;
  chassis: string;
  plate: string;
  status: "active" | "maintenance" | "inactive";
  driver: string;
  registrationStatus: string;
};

const data: Vehicle[] = [
  { model: "Honda CG 160", chassis: "9C2KC0810P1000001", plate: "ABC-1234", status: "active", driver: "Carlos", registrationStatus: "Plated" },
  { model: "Yamaha Factor 150", chassis: "9C2KC0810P1000002", plate: "DEF-5678", status: "active", driver: "Ana", registrationStatus: "Plated" },
  { model: "Honda Biz 125", chassis: "9C2KC0810P1000003", plate: "GHI-9012", status: "maintenance", driver: "Carlos", registrationStatus: "Plating" },
  { model: "Suzuki Intruder 150", chassis: "9C2KC0810P1000004", plate: "JKL-3456", status: "active", driver: "Ana", registrationStatus: "Plated" },
  { model: "Honda Pop 110", chassis: "9C2KC0810P1000005", plate: "MNO-7890", status: "inactive", driver: "Carlos", registrationStatus: "No Plate" },
  { model: "Yamaha YBR 150", chassis: "9C2KC0810P1000006", plate: "PQR-1234", status: "active", driver: "Ana", registrationStatus: "Plated" },
];

const statusStyle = {
  active: "bg-emerald-500",
  maintenance: "bg-amber-500",
  inactive: "bg-gray-400",
};

export default function FleetPage() {
  const activeCount = data.filter((v) => v.status === "active").length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Frota</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os veículos da organização
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Veículos
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
          <CardContent className="space-y-2">
            <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
            <Progress value={(activeCount / data.length) * 100} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Manutenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {data.filter((v) => v.status === "maintenance").length}
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
              {data.filter((v) => v.status === "inactive").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((vehicle) => (
          <Card key={vehicle.chassis} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Truck size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{vehicle.model}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.plate}
                    </p>
                  </div>
                </div>
                <span
                  className={`mt-1 block size-2.5 rounded-full ${statusStyle[vehicle.status]}`}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chassi</span>
                <span className="font-mono text-xs">{vehicle.chassis.slice(0, 15)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condutor</span>
                <span>{vehicle.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Placa</span>
                <Badge variant="outline" className="text-xs">
                  {vehicle.registrationStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
