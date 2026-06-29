"use client";

import { LanguagesIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "../mode-toggle";
import LanguageDropdown from "./dropdown-language";
import ProfileDropdown from "./dropdown-profile";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  deliveries: "Entregas",
  clients: "Clientes",
  fleet: "Frota",
  settings: "Configurações",
  general: "Geral",
  team: "Equipe",
  billing: "Faturamento",
  limits: "Limites",
  bdc: "BDC",
  stock: "Estoque",
};

function humanize(segment: string) {
  return labelMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

function useBreadcrumbs() {
  const pathname = usePathname();
  const params = useParams<{ dealershipId: string }>();
  const dealershipId = params.dealershipId;

  const segments = pathname.split("/").filter(Boolean);
  const idx = segments.indexOf(dealershipId);
  const crumbs: { label: string; href?: string }[] = [
    { label: "Home", href: `/app/${dealershipId}/dashboard` },
  ];

  if (idx !== -1) {
    const rest = segments.slice(idx + 1);
    for (let i = 0; i < rest.length; i++) {
      const href = `/app/${dealershipId}/${rest.slice(0, i + 1).join("/")}`;
      const isLast = i === rest.length - 1;
      crumbs.push({ label: humanize(rest[i]), ...(isLast ? {} : { href }) });
    }
  }

  return { crumbs, dealershipId };
}

export function Header() {
  const { data: session } = authClient.useSession();
  const { crumbs, dealershipId } = useBreadcrumbs();

  const user = {
    name: session?.user.name ?? "User",
    email: session?.user.email ?? "",
    image: session?.user.image,
  };

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="[&_svg]:size-5!" />
          <Separator
            orientation="vertical"
            className="hidden h-4! data-vertical:self-center sm:block"
          />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {crumbs.map((crumb, i) => (
                <BreadcrumbItem key={crumb.label}>
                  {crumb.href ? (
                    <>
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                      {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                    </>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageDropdown
            trigger={
              <Button variant="ghost" size="icon-lg">
                <LanguagesIcon />
              </Button>
            }
          />
          <ModeToggle />
          <ProfileDropdown
            dealershipId={dealershipId}
            user={user}
            trigger={
              <Button variant="ghost" size="icon-lg">
                <Avatar className="size-[inherit] rounded-[inherit] after:rounded-[inherit]">
                  <AvatarImage
                    src={user.image ?? ""}
                    className="rounded-[inherit]"
                  />
                  <AvatarFallback className="rounded-[inherit]">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
