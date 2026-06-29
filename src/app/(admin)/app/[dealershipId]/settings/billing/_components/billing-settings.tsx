"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function BillingSettings() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Faturamento</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie seu plano e métodos de pagamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plano Atual</CardTitle>
          <CardDescription>
            Você está no plano Profissional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Profissional</p>
                <Badge>Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                R$ 97,90/mês — até 500 entregas/mês
              </p>
            </div>
            <Button variant="outline" size="sm">
              Gerenciar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Método de Pagamento</CardTitle>
          <CardDescription>
            Cartão de crédito utilizado para cobranças
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-sm font-bold">
                MC
              </div>
              <div>
                <p className="text-sm font-medium">Mastercard •••• 2356</p>
                <p className="text-xs text-muted-foreground">
                  Vence 12/2027
                </p>
              </div>
            </div>
            <Badge variant="outline">Principal</Badge>
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              Adicionar cartão
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "01/06/2026", amount: "R$ 97,90", status: "pago" },
              { date: "01/05/2026", amount: "R$ 97,90", status: "pago" },
              { date: "01/04/2026", amount: "R$ 97,90", status: "pago" },
            ].map((invoice) => (
              <div
                key={invoice.date}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground">{invoice.amount}</p>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  {invoice.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
