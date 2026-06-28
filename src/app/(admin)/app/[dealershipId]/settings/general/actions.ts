"use server";

import { headers } from "next/headers";
import { z } from "zod/v3";
import { auth } from "@/lib/auth";
import type { ApiResponse } from "@/lib/types";

const updateOrganizationSchema = z.object({
  organizationId: z.string().min(1),
  name: z.string().min(2).max(100),
  logo: z.string().url().optional().nullable(),
});

export async function updateOrganization(
  data: z.infer<typeof updateOrganizationSchema>,
): Promise<ApiResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { status: "error", message: "Not authenticated" };
  }

  const validation = updateOrganizationSchema.safeParse(data);
  if (!validation.success) {
    return { status: "error", message: "Invalid form data" };
  }

  try {
    await auth.api.updateOrganization({
      body: {
        data: {
          name: validation.data.name,
          logo: validation.data.logo ?? undefined,
        },
        organizationId: validation.data.organizationId,
      },
      headers: await headers(),
    });

    return { status: "success", message: "Organização atualizada com sucesso" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Erro ao atualizar organização" };
  }
}
