"use client";

import { Store } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { FileUpload } from "@/components/file-upload";
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
import { updateOrganization } from "../actions";

export function GeneralSettings({
  organizationId,
  organizationName: initialName,
  organizationLogo: initialLogo,
}: {
  organizationId: string;
  organizationName: string;
  organizationLogo: string | null;
}) {
  const [name, setName] = React.useState(initialName);
  const [logo, setLogo] = React.useState<string | null>(initialLogo);
  const [saving, setSaving] = React.useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const result = await updateOrganization({
      organizationId,
      name,
      logo,
    });

    if (result.status === "error") {
      toast.error(result.message);
    } else {
      toast.success("Configurações salvas com sucesso!");
    }

    setSaving(false);
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 space-y-6">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground overflow-hidden shadow-inner relative group">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="size-8 text-muted-foreground/60" />
                )}
              </div>

              <FileUpload
                value={logo}
                onChange={(url) => setLogo(url)}
                folder={`organizations/${organizationId}`}
              />
            </div>

            <div className="grid gap-5 border-t border-border pt-6">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: AutoVanguard Premium"
                  required
                  className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                />
              </Field>

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
              disabled={saving}
              className="rounded-lg cursor-pointer h-9 shadow-xs w-full sm:w-auto text-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto text-sm"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
