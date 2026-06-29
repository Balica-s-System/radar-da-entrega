"use client";

import {
  BarChart3,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  UserCircle,
  Users,
  Warehouse,
} from "lucide-react";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../logo";
import { SearchCommand } from "./search-command";
import { type NavItem, NavMain } from "./nav-main";

export function AppSidebar() {
  const params = useParams<{ dealershipId: string }>();
  const dealershipId = params.dealershipId;

  const base = (path: string) => `/app/${dealershipId}${path}`;

  const navData: NavItem[] = [
    { label: "Dashboard", isSection: true },
    {
      title: "Visão Geral",
      icon: LayoutDashboard,
      href: base("/dashboard"),
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: base("/analytics"),
    },

    { label: "Gestão", isSection: true },
    {
      title: "Entregas",
      icon: ShoppingBag,
      href: base("/deliveries"),
    },
    {
      title: "Frota",
      icon: Truck,
      href: base("/fleet"),
    },
    {
      title: "Clientes",
      icon: Users,
      href: base("/clients"),
    },
    {
      title: "BDC",
      icon: Package,
      href: base("/bdc"),
    },
    {
      title: "Estoque",
      icon: Warehouse,
      href: base("/stock"),
    },

    { label: "Páginas", isSection: true },
    {
      title: "Link Público",
      icon: ExternalLink,
      href: `/${dealershipId}/tracking`,
    },
    {
      title: "Perfil",
      icon: UserCircle,
      href: base("/settings/general"),
    },

    { label: "Configurações", isSection: true },
    {
      title: "Geral",
      icon: Settings,
      href: base("/settings/general"),
    },
    {
      title: "Equipe",
      icon: Users,
      href: base("/settings/team"),
    },
    {
      title: "Faturamento",
      icon: CreditCard,
      href: base("/settings/billing"),
    },
  ];

  return (
    <Sidebar variant="sidebar" className="h-full">
      <div className="flex flex-col gap-6 overflow-hidden">
        <SidebarHeader className="px-4 pt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <a
                href={base("/dashboard")}
                className="w-full h-full"
              >
                <Logo />
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-4">
            <SearchCommand />
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="px-4">
              <NavMain items={navData} />
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
