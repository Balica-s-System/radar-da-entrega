import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getOrganizationById } from "@/app/data/organization/get-organization-by-id";
import { auth } from "@/lib/auth";
import { LoginForm } from "./_components/LoginForm";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    if (!session.user.onboardingCompleted) {
      redirect("/onboarding");
    }

    if (session.session.activeOrganizationId) {
      const { organization } = await getOrganizationById(
        session.session.activeOrganizationId,
      );

      if (organization) {
        redirect(`/app/${organization.slug}/dashboard`);
      }
    }

    redirect("/onboarding/member/awaiting-approval");
  }

  return <LoginForm />;
}
