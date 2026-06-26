"use client";

import { GalleryVerticalEnd, Map, Radar, Settings2 } from "lucide-react";
import { useParams } from "next/navigation";
import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const dealershipId = params.dealershipId as string;

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Radar",
        url: `/app/${dealershipId}/dashboard`,
        icon: Radar,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: `/app/${dealershipId}/dashboard`,
          },
          {
            title: "BDC",
            url: `/app/${dealershipId}/bdc`,
          },
          {
            title: "Estoque",
            url: `/app/${dealershipId}/stock`,
          },
        ],
      },
      {
        title: "Rastreamento",
        url: "#",
        icon: Map,
        items: [
          {
            title: "Jornada da Entrega (Pública)",
            url: `/${dealershipId}/tracking`,
          },
          {
            title: "Histórico de Envios",
            url: `/app/${dealershipId}/tracking/history`,
          },
        ],
      },
      {
        title: "Configuração",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Geral",
            url: `/app/${dealershipId}/settings/general`,
          },
          {
            title: "Time",
            url: `/app/${dealershipId}/settings/team`,
          },
          {
            title: "Billing",
            url: `/app/${dealershipId}/settings/billing`,
          },
          {
            title: "Limites",
            url: `/app/${dealershipId}/settings/limits`,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
