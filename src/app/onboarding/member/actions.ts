"use server";

import { headers } from "next/headers";
import { requireUser } from "@/app/data/require-user";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ApiResponse } from "@/lib/types";
import { type MemberSchemaType, memberSchema } from "@/lib/zodSchemas/member";

export async function SubmitJoinRequest(
  values: MemberSchemaType,
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    const validation = memberSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.joinRequest.create({
      data: {
        userId: session.user.id,
        userEmail: session.user.email,
        managerEmail: validation.data.managerEmail,
        status: "pending",
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });

    return {
      status: "success",
      message: "Join request submitted successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Failed to submit join request",
    };
  }
}
