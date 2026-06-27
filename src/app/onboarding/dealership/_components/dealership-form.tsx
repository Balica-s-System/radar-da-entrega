"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/lib/try-catch";
import {
  type OrganizationSchemaType,
  organizationSchema,
} from "@/lib/zodSchemas/organization";
import { CreateOrganization } from "../actions";

export default function DealershipForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<OrganizationSchemaType>({
    resolver: zodResolver(organizationSchema),
  });

  const name = form.watch("name");
  const cnpj = form.watch("cnpj");
  const city = form.watch("city");

  const currentSlug = useMemo(() => {
    return (name ?? "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [name]);

  async function onSubmit(values: OrganizationSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        CreateOrganization(values),
      );

      if (error) {
        toast.error("Ocorreu um erro inesperado.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        const slug = result.slug || currentSlug;
        router.push(`/app/${slug}/dashboard`);
        return;
      }

      toast.error(result.message);
    });
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <Card className="gap-0 p-0 shadow-lg">
        <CardHeader className="gap-2 border-b px-6 pt-5 pb-4">
          <h2 className="text-base font-medium">Cadastrar Nova Organização</h2>

          <p className="text-sm text-muted-foreground">
            Informe os dados da sua empresa para concluir o cadastro.
          </p>
        </CardHeader>

        <CardContent className="px-6 py-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
            {/* Formulário */}
            <div className="md:col-span-7">
              <form
                id="organization-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="name">Nome da Organização</FieldLabel>

                  <Input
                    id="name"
                    placeholder="Concessionária Central"
                    {...form.register("name")}
                  />

                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>

                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-00"
                    {...form.register("cnpj")}
                  />

                  {form.formState.errors.cnpj && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.cnpj.message}
                    </p>
                  )}
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field className="col-span-2 gap-1.5">
                    <FieldLabel htmlFor="city">Cidade</FieldLabel>

                    <Input
                      id="city"
                      placeholder="Sobral"
                      {...form.register("city")}
                    />

                    {form.formState.errors.city && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </Field>
                </div>

                <Field className="gap-1.5">
                  <FieldLabel>URL da Organização</FieldLabel>

                  <Input
                    disabled
                    value={`radardaentrega.com.br/${currentSlug || "seu-slug"}`}
                    className="bg-muted"
                  />
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel htmlFor="logoUrl">Logo (opcional)</FieldLabel>

                  <Input
                    id="logoUrl"
                    placeholder="https://..."
                    {...form.register("logoUrl")}
                  />

                  {form.formState.errors.logoUrl && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.logoUrl.message}
                    </p>
                  )}
                </Field>
              </form>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center border-t pt-6 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-xl border bg-accent">
                  <Building2 className="size-10 text-muted-foreground/60" />
                </div>

                <div className="space-y-2">
                  <h5 className="text-base font-semibold">
                    {name || "Radar da Entrega"}
                  </h5>

                  {cnpj && (
                    <p className="text-xs text-muted-foreground">CNPJ {cnpj}</p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    radardaentrega.com.br/
                    {currentSlug || "seu-slug"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch justify-end gap-3 border-t px-6 py-5 sm:flex-row sm:items-center">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            Cancelar
          </Button>

          <Button
            form="organization-form"
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Criando..." : "Criar Organização"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
