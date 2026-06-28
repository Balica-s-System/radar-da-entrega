import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding");
  }

  let organizationLogo: string | null = null;
  let organizationName: string | null = null;

  if (session.session.activeOrganizationId) {
    try {
      const org = await auth.api.getFullOrganization({
        query: { organizationId: session.session.activeOrganizationId },
        headers: await headers(),
      });
      if (org) {
        organizationLogo = org.logo ?? null;
        organizationName = org.name ?? null;
      }
    } catch {
      // org not found — just use defaults
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar
        organizationLogo={organizationLogo}
        organizationName={organizationName}
      />
      <div className="flex flex-1 flex-col">
        <TopNav
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }}
        />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
