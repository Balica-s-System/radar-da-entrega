"use client";

import { Check, CreditCard, Download, Zap } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoiceHistory = [
  { id: "INV-001", date: "10 Jun, 2026", amount: "R$ 149,00", status: "Pago" },
  { id: "INV-002", date: "10 Mai, 2026", amount: "R$ 149,00", status: "Pago" },
  { id: "INV-003", date: "10 Abr, 2026", amount: "R$ 149,00", status: "Pago" },
];

export function BillingSettings() {
  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6 space-y-8">
      {/* 1. PLANO ATUAL E CONSUMO */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-0 shadow-sm border-muted/60 md:col-span-2">
          <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              Assinatura Atual
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-normal">
              Sua organização está no plano **Pro**. A próxima renovação será em
              **10 de Julho, 2026**.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-5 px-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-foreground">
                <span>Rastreamentos no Mês</span>
                <span className="text-muted-foreground">
                  7.420 / 10.000 envios
                </span>
              </div>
              <Progress value={74.2} className="h-2 bg-muted" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-0 shadow-sm border-primary/20 bg-primary/[0.02] flex flex-col justify-between">
          <CardHeader className="px-6 pt-5 pb-2">
            <Badge className="w-fit rounded-md px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary hover:bg-primary/10 border-none shadow-none">
              Plano Pro
            </Badge>
            <div className="pt-2">
              <span className="text-3xl font-bold text-foreground">R$ 149</span>
              <span className="text-xs text-muted-foreground font-normal">
                {" "}
                / mês
              </span>
            </div>
          </CardHeader>
          <CardFooter className="px-6 pb-5 pt-0">
            <Button
              variant="outline"
              className="w-full h-9 rounded-lg text-xs font-medium cursor-pointer bg-background"
            >
              Gerenciar Assinatura
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 2. UPGRADE DE PLANOS */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Zap className="size-4 text-amber-500" />
            Planos Disponíveis
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Escolha o plano ideal para escalar a operação de rastreamento da sua
            concessionária.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid gap-6 md:grid-cols-2">
          {/* Plano Atual Protegido */}
          <div className="border border-border p-5 rounded-xl space-y-4 bg-muted/20 opacity-80">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Plano Pro
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Para operações consolidadas.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Até 10.000
                rastreamentos/mês
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Integração com
                WhatsApp ativa
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Suporte prioritário
              </li>
            </ul>
            <Button disabled className="w-full h-8 text-xs rounded-lg">
              Plano Ativo
            </Button>
          </div>

          {/* Plano Enterprise/Scale */}
          <div className="border border-primary/40 p-5 rounded-xl space-y-4 relative shadow-xs bg-card">
            <div className="absolute -top-2.5 right-4">
              <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground border-none">
                Recomendado
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Plano Scale
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Rastreamento ilimitado e alta performance.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Rastreamentos
                ilimitados
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Múltiplos
                subdomínios públicos
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" /> Webhooks e API de
                Integração
              </li>
            </ul>
            <Button className="w-full h-8 text-xs rounded-lg hover:bg-primary/80 cursor-pointer">
              Fazer Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. HISTÓRICO DE FATURAMENTO */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium">
            Histórico de Faturas
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Visualize e faça o download dos recibos de pagamento anteriores.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-medium px-6 py-3">
                  Código
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3">
                  Data de Pagamento
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3">
                  Valor
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3 text-right">
                  Recibo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceHistory.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="hover:bg-muted/20 border-b border-border"
                >
                  <TableCell className="px-6 py-4 text-sm font-mono text-foreground">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-xs text-muted-foreground">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-xs font-medium text-foreground">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none rounded-md px-2 py-0.5 text-[10px] font-medium shadow-none"
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <Download className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
