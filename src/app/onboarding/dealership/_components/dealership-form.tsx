"use client";

import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function DealershipForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organização cadastrada!");
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4">
      <Card className="p-0 w-full gap-0 shadow-lg">
        <CardHeader className="gap-6 px-6 pt-5 border-b border-border pb-4">
          <h2 className="text-base font-medium text-card-foreground">
            Cadastrar Nova Organização
          </h2>
        </CardHeader>

        <CardContent className="py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Coluna da Esquerda: Formulário Principal */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="name"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Nome da Concessionária / Empresa
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex: Concessionária Central"
                      required
                      className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                    />
                  </Field>

                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="document"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      CNPJ
                    </FieldLabel>
                    <Input
                      id="document"
                      type="text"
                      placeholder="00.000.000/0001-00"
                      required
                      className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                    />
                  </Field>

                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="city"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Cidade / UF
                    </FieldLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Ex: São Paulo - SP"
                      required
                      className="dark:bg-background h-9 shadow-xs text-sm text-muted-foreground font-normal"
                    />
                  </Field>
                </div>

                {/* Seção de Toggles */}
                <div className="flex flex-col gap-5 border-t border-border pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <Label
                        htmlFor="multi-fleet"
                        className="text-primary text-sm font-medium"
                      >
                        Gerenciar Múltiplas Frotas
                      </Label>
                      <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                        Permite segmentar veículos e motoristas por filiais ou
                        setores distintos.
                      </p>
                    </div>
                    <Switch id="multi-fleet" className="mt-0.5" />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <Label
                        htmlFor="notifications"
                        className="text-primary text-sm font-medium"
                      >
                        Alertas em Tempo Real
                      </Label>
                      <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                        Notificar os administradores do Radar sobre atrasos
                        automaticamente.
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      defaultChecked
                      className="mt-0.5"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Coluna da Direita: Identidade Visual da Organização */}
            <div className="md:col-span-5 flex flex-col justify-center items-center border-t md:border-t-0 md:border-s border-border pt-6 md:pt-0 md:ps-6 lg:ps-8">
              <div className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-1">
                  <h6 className="text-primary text-sm font-medium">
                    Logotipo da Empresa
                  </h6>
                  <p className="text-xs text-muted-foreground font-normal max-w-[220px] leading-relaxed">
                    Insira uma imagem quadrada (PNG ou JPG) para identificar sua
                    frota no sistema.
                  </p>
                </div>

                <div className="w-28 h-28 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground shadow-inner">
                  <Building2 className="size-10 text-muted-foreground/60" />
                </div>

                <div className="flex flex-col items-center">
                  <h5 className="text-primary text-base font-medium">
                    Radar da Entrega
                  </h5>
                  <p className="text-xs text-muted-foreground font-normal">
                    Módulo de Gestão Corporativa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="[.border-t]:pt-5 py-5 px-6 border-t border-border flex sm:flex-row flex-col justify-end sm:items-center items-start gap-3 bg-card rounded-b-xl">
          <Button
            variant="outline"
            className="rounded-lg cursor-pointer h-9 shadow-xs w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto"
          >
            Criar Organização
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
