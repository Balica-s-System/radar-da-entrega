import { TrainTrackIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <TrainTrackIcon className="size-6" />
              </div>
              <span className="sr-only">Radar da Entrega</span>
            </Link>
            <h1 className="text-xl font-bold">Bem Vindo ao Radar da Entrega</h1>
            <FieldDescription>
              Já tem uma conta?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Entrar
              </Link>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          <Field>
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
          </Field>

          <FieldSeparator>Ou</FieldSeparator>

          <Field className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="gap-2">
              <Image
                src="/icons/apple-icon.svg"
                alt="Apple Logo"
                width="20"
                height="20"
              />
              Apple
            </Button>
            <Button variant="outline" type="button" className="gap-2">
              <Image
                src="/icons/google-icon.svg"
                alt="Google Logo"
                width="20"
                height="20"
              />
              Google
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center text-xs">
        Ao continuar, você concorda com nossos{" "}
        <Link href="/termos" className="underline underline-offset-4">
          Termos de Serviço
        </Link>{" "}
        e{" "}
        <Link href="/privacidade" className="underline underline-offset-4">
          Política de Privacidade
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
