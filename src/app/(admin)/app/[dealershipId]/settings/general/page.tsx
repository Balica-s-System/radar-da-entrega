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
    <div className="w-full p-6">
      <GeneralSettings
        organizationId={org?.id ?? ""}
        organizationName={org?.name ?? ""}
        organizationLogo={org?.logo ?? null}
      />
    </div>
  );
}
