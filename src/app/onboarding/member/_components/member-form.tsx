"use client";

import { UserPlus } from "lucide-react";
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

export default function MemberForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Foto salva e convite enviado ao gerente!");
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4">
      <Card className="p-0 w-full gap-0 shadow-lg border-muted/60">
        <CardHeader className="gap-6 px-6 pt-5 border-b border-border pb-4">
          <h2 className="text-base font-medium text-card-foreground">
            Concluir Perfil de Membro
          </h2>
        </CardHeader>

        <CardContent className="py-6 px-6 flex flex-col gap-6">
          {/* Seção da Foto de Perfil */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5 border-b border-border pb-6">
            <div className="w-20 h-20 shrink-0 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground shadow-inner">
              <UserPlus className="size-8 text-muted-foreground/60" />
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="text-sm text-muted-foreground font-normal">
                Foto de Perfil
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="dark:bg-background text-xs shadow-xs text-muted-foreground font-normal file:mr-2 file:text-xs file:font-medium"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Vinculação da Concessionária */}
            <Field className="gap-1.5">
              <FieldLabel
                htmlFor="managerEmail"
                className="text-sm text-muted-foreground font-normal"
              >
                E-mail do Gerente da Concessionária
              </FieldLabel>
              <Input
                id="managerEmail"
                type="email"
                placeholder="gerente@concessionaria.com"
                required
                className="dark:bg-background h-9 shadow-xs text-sm text-muted-foreground font-normal"
              />
              <p className="text-xs text-muted-foreground font-normal leading-normal mt-0.5">
                Insira o e-mail do responsável para que ele possa aprovar seu
                vínculo com a organização.
              </p>
            </Field>
          </form>
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
            Vincular e Concluir
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
