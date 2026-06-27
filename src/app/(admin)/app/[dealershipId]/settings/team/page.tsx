import { TeamSettings } from "./_components/team-settings";

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <TeamSettings organizationSlug={dealershipId} />
    </div>
  );
}
