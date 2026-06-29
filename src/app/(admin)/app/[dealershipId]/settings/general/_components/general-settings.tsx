"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Props = {
  organizationId: string;
  organizationName: string;
  organizationLogo: string | null;
};

export function GeneralSettings({
  organizationId,
  organizationName,
  organizationLogo,
}: Props) {
  const [name, setName] = useState(organizationName);
  const [logo, setLogo] = useState(organizationLogo ?? "");

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Configurações Gerais</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie as informações da sua organização
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Organização</CardTitle>
          <CardDescription>
            Estas informações serão exibidas publicamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Organização</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">URL do Logo</Label>
            <Input
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          <CardDescription>
            Ações irreversíveis — cuidado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
            <div>
              <p className="text-sm font-medium">Excluir Organização</p>
              <p className="text-xs text-muted-foreground">
                Remove永久mente todos os dados
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
