import { redirect } from "next/navigation";

export default async function DealershipPage({
  params,
}: {
  params: Promise<{ dealershipId: string }>;
}) {
  const { dealershipId } = await params;

  redirect(`/app/${dealershipId}/dashboard`);
}
