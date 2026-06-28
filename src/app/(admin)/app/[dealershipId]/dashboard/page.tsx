import { headers } from "next/headers";
import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function DashboardRoute({
  params,
}: {
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug: dealershipId },
    headers: await headers(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {org?.logo && (
          <Image
            src={org.logo}
            alt={org.name}
            width={64}
            height={64}
            className="size-16 rounded-xl object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{org?.name ?? "Dashboard"}</h1>
          <p className="text-sm text-muted-foreground">
            Visão geral da organização
          </p>
        </div>
      </div>
    </div>
  );
}
