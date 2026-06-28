import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { GeneralSettings } from "./_components/general-settings";

export default async function GeneralRoute({
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
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <GeneralSettings
        organizationId={org?.id ?? ""}
        organizationName={org?.name ?? ""}
        organizationLogo={org?.logo ?? null}
      />
    </div>
  );
}
