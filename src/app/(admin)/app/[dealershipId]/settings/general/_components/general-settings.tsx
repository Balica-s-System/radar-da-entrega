"use client";

import { Store, Upload } from "lucide-react";
import * as React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function GeneralSettings() {
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Configurações da concessionária salvas com sucesso!");
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 space-y-6">
      {/* Seção de Preferências de Aparência (Tema) */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium">
            Aparência do Sistema
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Escolha o tema visual de sua preferência para navegar na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5 px-6 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-foreground">
              Tema da Interface
            </span>
            <p className="text-xs text-muted-foreground font-normal">
              Alternar entre o modo claro, escuro ou o padrão do sistema.
            </p>
          </div>
          <ModeToggle />
        </CardContent>
      </Card>

      {/* Formulário de Identidade da Concessionária */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium">
            Dados da Concessionária
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Atualize as informações públicas e a identidade visual da sua
            organização.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSave}>
          <CardContent className="py-6 px-6 space-y-6">
            {/* Upload de Logo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground overflow-hidden shadow-inner relative group">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="size-8 text-muted-foreground/60" />
                )}
              </div>

              <div className="flex flex-col gap-2 w-full max-w-md">
                <FieldLabel
                  htmlFor="logo-upload"
                  className="text-sm font-medium text-foreground"
                >
                  Logotipo da Empresa
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="dark:bg-background text-xs shadow-xs text-muted-foreground font-normal file:mr-2 file:text-xs file:font-medium cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground font-normal">
                  Recomendado: PNG ou SVG quadrado de pelo menos 256x256px.
                </p>
              </div>
            </div>

            <div className="grid gap-5 border-t border-border pt-6">
              {/* Nome da Concessionária */}
              <Field className="gap-1.5">
                <FieldLabel
                  htmlFor="dealershipName"
                  className="text-sm text-muted-foreground font-normal"
                >
                  Nome da Concessionária
                </FieldLabel>
                <Input
                  id="dealershipName"
                  type="text"
                  placeholder="Ex: AutoVanguard Premium"
                  required
                  className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                />
              </Field>

              {/* Descrição */}
              <Field className="gap-1.5">
                <FieldLabel
                  htmlFor="dealershipDescription"
                  className="text-sm text-muted-foreground font-normal"
                >
                  Descrição ou Slogan
                </FieldLabel>
                <Textarea
                  id="dealershipDescription"
                  placeholder="Ex: Líder em veículos premium e entregas personalizadas na região metropolitana."
                  rows={3}
                  className="dark:bg-background text-sm shadow-xs text-muted-foreground font-normal resize-none"
                />
                <p className="text-xs text-muted-foreground font-normal leading-normal mt-0.5">
                  Uma breve introdução sobre a loja. Ela poderá aparecer na
                  página pública de rastreamento de seus clientes.
                </p>
              </Field>
            </div>
          </CardContent>

          <CardFooter className="[.border-t]:pt-5 py-5 px-6 border-t border-border flex sm:flex-row flex-col justify-end sm:items-center items-start gap-3 bg-card rounded-b-xl">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg cursor-pointer h-9 shadow-xs w-full sm:w-auto text-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto text-sm"
            >
              Salvar Alterações
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
