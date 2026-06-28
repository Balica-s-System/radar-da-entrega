import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DealershipLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  const org = organizations?.find((org) => org.slug === dealershipId);

  if (!org) redirect("/org-not-found");

  return <>{children}</>;
}
