import type { Metadata } from "next";
import { SignupForm } from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Radar da Entrega - Cadastro",
  description: "Crie sua conta no Radar da Entrega",
};

export default function SignUpRoute() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
