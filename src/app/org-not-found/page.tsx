import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function OrganizationNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto max-w-md min-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Página não encontrada</CardTitle>
          <CardDescription>
            A organização que você está procurando não existe ou você não tem
            acesso a ela.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/onboarding">Ir para o início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
