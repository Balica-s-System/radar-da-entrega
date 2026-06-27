"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getPendingJoinRequests(organizationSlug: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug },
    headers: await headers(),
  });

  if (!org) return [];

  const requests = await prisma.joinRequest.findMany({
    where: { status: "pending" },
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

  const request = await prisma.joinRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return { status: "error", message: "Request not found" };
  }

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug },
    headers: await headers(),
  });

  if (!org) {
    return { status: "error", message: "Organization not found" };
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
      where: { id: requestId },
      data: {
        status: "accepted",
        organizationId: org.id,
      },
    });

    return { status: "success", message: "Invitation sent successfully" };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Failed to send invitation";
    console.error("acceptJoinRequest error:", message);
    return { status: "error", message };
  }
}

export async function rejectJoinRequest(requestId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { status: "error", message: "Not authenticated" };
  }

  try {
    await prisma.joinRequest.update({
      where: { id: requestId },
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

  const org = await auth.api.getFullOrganization({
    query: { organizationSlug },
    headers: await headers(),
  });

  if (!org) return [];

  const members = await auth.api.listMembers({
    query: { organizationId: org.id },
    headers: await headers(),
  });

  return members;
}
