"use server";

import { headers } from "next/headers";
import { z } from "zod/v3";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const organizationSlugSchema = z.string().min(1).max(100);
const requestIdSchema = z.string().min(1).max(100);

async function getOrgBySlug(slug: string) {
  const parsed = organizationSlugSchema.safeParse(slug);
  if (!parsed.success) return null;

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug: parsed.data },
    headers: await headers(),
  });

  return org ?? null;
}

async function getOrgBySlugWithAdminCheck(slug: string, userId: string) {
  const org = await getOrgBySlug(slug);
  if (!org) return null;

  const { members } = await auth.api.listMembers({
    query: { organizationId: org.id },
    headers: await headers(),
  });

  const callerMember = members?.find((m) => m.userId === userId);
  if (!callerMember || !["owner", "admin"].includes(callerMember.role)) {
    return null;
  }

  return org;
}

async function isMemberOfOrg(userId: string, orgId: string) {
  const { members } = await auth.api.listMembers({
    query: { organizationId: orgId },
    headers: await headers(),
  });

  return members?.some((m) => m.userId === userId) ?? false;
}

export async function getPendingJoinRequests(organizationSlug: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  const org = await getOrgBySlug(organizationSlug);
  if (!org) return [];

  const requests = await prisma.joinRequest.findMany({
    where: { status: "pending", organizationId: org.id },
    orderBy: { createdAt: "desc" },
  });

  return requests.map((r) => ({
    id: r.id,
    userId: r.userId,
    userEmail: r.userEmail,
    managerEmail: r.managerEmail,
    createdAt: r.createdAt,
  }));
}

export async function acceptJoinRequest(
  requestId: string,
  organizationSlug: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { status: "error", message: "Not authenticated" };
  }

  const parsedRequestId = requestIdSchema.safeParse(requestId);
  if (!parsedRequestId.success) {
    return { status: "error", message: "Invalid request ID" };
  }

  const request = await prisma.joinRequest.findUnique({
    where: { id: parsedRequestId.data },
  });

  if (!request) {
    return { status: "error", message: "Request not found" };
  }

  const org = await getOrgBySlugWithAdminCheck(
    organizationSlug,
    session.user.id,
  );

  if (!org) {
    return { status: "error", message: "Unauthorized" };
  }

  try {
    await auth.api.createInvitation({
      body: {
        email: request.userEmail,
        role: "member",
        organizationId: org.id,
      },
      headers: await headers(),
    });

    await prisma.joinRequest.update({
      where: { id: parsedRequestId.data },
      data: {
        status: "accepted",
        organizationId: org.id,
      },
    });

    return { status: "success", message: "Invitation sent successfully" };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Failed to send invitation";
    console.error("acceptJoinRequest error:", message);
    return { status: "error", message };
  }
}

export async function rejectJoinRequest(requestId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { status: "error", message: "Not authenticated" };
  }

  const parsedRequestId = requestIdSchema.safeParse(requestId);
  if (!parsedRequestId.success) {
    return { status: "error", message: "Invalid request ID" };
  }

  const request = await prisma.joinRequest.findUnique({
    where: { id: parsedRequestId.data },
  });

  if (!request) {
    return { status: "error", message: "Request not found" };
  }

  if (!request.organizationId) {
    return { status: "error", message: "Request has no associated organization" };
  }

  const { members } = await auth.api.listMembers({
    query: { organizationId: request.organizationId },
    headers: await headers(),
  });

  const callerMember = members?.find((m) => m.userId === session.user.id);
  if (!callerMember || !["owner", "admin"].includes(callerMember.role)) {
    return { status: "error", message: "Unauthorized" };
  }

  try {
    await prisma.joinRequest.update({
      where: { id: parsedRequestId.data },
      data: { status: "rejected" },
    });

    return { status: "success", message: "Request rejected" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to reject request" };
  }
}

export async function getActiveMembers(organizationSlug: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  const org = await getOrgBySlug(organizationSlug);
  if (!org) return [];

  const isMember = await isMemberOfOrg(session.user.id, org.id);
  if (!isMember) return [];

  const members = await auth.api.listMembers({
    query: { organizationId: org.id },
    headers: await headers(),
  });

  return members;
}
