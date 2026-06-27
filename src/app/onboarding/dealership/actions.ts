"use server";

import { headers } from "next/headers";
import { requireUser } from "@/app/data/require-user";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ApiResponse } from "@/lib/types";
import {
  type OrganizationSchemaType,
  organizationSchema,
} from "@/lib/zodSchemas/organization";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function CreateOrganization(
  values: OrganizationSchemaType,
): Promise<ApiResponse & { slug?: string }> {
  const session = await requireUser();

  try {
    const validation = organizationSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const slug = generateSlug(validation.data.name);

    const org = await auth.api.createOrganization({
      body: {
        name: validation.data.name,
        slug,
        logo: validation.data.logoUrl,
        userId: session.user.id,
        cnpj: validation.data.cnpj,
        city: validation.data.city,
      },
      headers: await headers(),
    });

    await auth.api.setActiveOrganization({
      body: { organizationId: org.id },
      headers: await headers(),
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        onboardingCompleted: true,
      },
    });

    return {
      status: "success",
      message: "Organization created successfully",
      slug: org.slug,
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Failed to create organization",
    };
  }
}
