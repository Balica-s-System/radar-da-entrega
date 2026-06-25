import { TrainTrackIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <TrainTrackIcon className="size-6" />
              </div>
              <span className="sr-only">Radar da Entrega</span>
            </Link>
            <h1 className="text-xl font-bold">
              Acesse sua conta no Radar da Entrega
            </h1>
            <FieldDescription>
              Não tem uma conta? <Link href="/sign-up">Cadastre-se</Link>
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
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Link
                href="#"
                className="text-sm underline-offset-4 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </Field>

          <Field>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </Field>

          <div className="relative text-center text-sm after:absolute after:inset-x-0 after:top-1/2 after:z-0 after:h-px after:bg-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Ou continuar com
            </span>
          </div>

          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              <Image
                src="/icons/apple-icon.svg"
                alt="Apple Logo"
                width="20"
                height="20"
              />
              Apple
            </Button>
            <Button variant="outline" type="button">
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
      <FieldDescription className="px-6 text-center">
        Ao continuar, você concorda com nossos{" "}
        <Link href="#">Termos de Serviço</Link> e{" "}
        <Link href="#">Política de Privacidade</Link>.
      </FieldDescription>
    </div>
  );
}
