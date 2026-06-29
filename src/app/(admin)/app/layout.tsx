import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/header/header";
import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { Separator } from "@/components/ui/separator";
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
    <SidebarProvider className="px-4 py-2 bg-muted">
      <AppSidebar />
      <div className="flex flex-1 flex-col gap-4">
        {/* <header className="flex h-14 items-center gap-4 rounded-xl bg-background px-4 shadow-sm">
          <SidebarTrigger className="cursor-pointer" />

          <div className="h-6 w-px bg-border self-center" />

          <div className="flex w-full justify-end">
            <ModeToggle />
          </div>
        </header> */}
        <Header />
        <main className="flex-1 rounded-xl bg-background">{children}</main>
      </div>
    </SidebarProvider>
  );
}
