"use client";

import {
  ClipboardList,
  CreditCard,
  Gauge,
  History,
  PieChart,
  Radar,
  Settings,
  Table,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { type NavItem, NavMain } from "./nav-main";
import { Button } from "./ui/button";

export function AppSidebar({
  organizationLogo,
  organizationName,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  organizationLogo?: string | null;
  organizationName?: string | null;
}) {
  const params = useParams();
  const dealershipId = params.dealershipId as string;

  const navData: NavItem[] = [
    // Dashboards Section
    { label: "Dashboards", isSection: true },
    {
      title: "Analytics",
      icon: PieChart,
      href: `/app/${dealershipId}/dashboard`,
    },
    { title: "CRM Dashboard", icon: ClipboardList, href: "#" },

    // Pages Section
    { label: "Radar", isSection: true },
    { title: "BDC", icon: Table, href: `/app/${dealershipId}/bdc` },
    {
      title: "Estoque",
      icon: ClipboardList,
      href: `/app/${dealershipId}/stock`,
    },

    // Rastreamento Section
    { label: "Rastreamento", isSection: true },
    {
      title: "Jornada da Entrega",
      icon: Radar,
      href: `/${dealershipId}/tracking`,
    },
    {
      title: "Histórico de Envios",
      icon: History,
      href: `/app/${dealershipId}/tracking/history`,
    },

    // Settings Section
    {
      label: "Configurações",
      isSection: true,
    },
    {
      title: "Geral",
      icon: Settings,
      href: `/app/${dealershipId}/settings/general`,
    },
    {
      title: "Time",
      icon: Users,
      href: `/app/${dealershipId}/settings/team`,
    },
    {
      title: "Billing",
      icon: CreditCard,
      href: `/app/${dealershipId}/settings/billing`,
    },
    {
      title: "Limites",
      icon: Gauge,
      href: `/app/${dealershipId}/settings/limits`,
    },
  ];

  return (
    <Sidebar className="px-0 h-full **:data-[slot=sidebar-inner]:h-full">
      <div className="flex flex-col gap-6">
        <SidebarHeader className="px-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="#" className="w-full h-full">
                {organizationLogo ? (
                  <Image
                    src={organizationLogo}
                    alt={organizationName ?? "Logo"}
                    width={32}
                    height={32}
                    className="size-8 rounded-lg object-cover"
                  />
                ) : (
                  <Logo />
                )}
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="px-4">
              <NavMain items={navData} />
            </div>
            {/* card */}
            <div className="pt-5 px-4">
              <Card className="shadow-none ring-0 bg-secondary px-4 py-6">
                <CardContent className="p-0 flex flex-col gap-3 items-center">
                  <Image
                    src="https://images.shadcnspace.com/assets/backgrounds/download-img.png"
                    alt="sidebar-img"
                    width={74}
                    height={74}
                    className="h-20 w-20"
                  />
                  <div className="flex flex-col gap-4 items-center">
                    <div>
                      <p className="text-base font-semibold text-card-foreground text-center">
                        Grab Pro Now
                      </p>
                      <p className="text-sm font-regular text-muted-foreground text-center">
                        Customize your admin
                      </p>
                    </div>
                    <Button className="w-fit h-9 px-4 py-2 shadow-none cursor-pointer rounded-xl">
                      Get Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
