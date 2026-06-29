import { TeamSettings } from "./_components/team-settings";

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  return (
    <div className="w-full p-6">
      <TeamSettings organizationSlug={dealershipId} />
    </div>
  );
}
