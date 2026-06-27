import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requireUser } from "../require-user";

export async function getOrganizationById(id: string) {
  await requireUser();

  const organization = await auth.api.getFullOrganization({
    query: {
      organizationId: id,
    },

    headers: await headers(),
  });

  return { organization };
}
