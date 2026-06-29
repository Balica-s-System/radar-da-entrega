"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { CreditCard, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Geral", href: "general", icon: Settings },
  { label: "Equipe", href: "team", icon: Users },
  { label: "Faturamento", href: "billing", icon: CreditCard },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ dealershipId: string }>();
  const currentTab = pathname.split("/").pop();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie sua organização
        </p>
      </div>

      <div className="flex gap-1 rounded-lg border p-1 bg-muted/50 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.href}
            type="button"
            onClick={() =>
              router.push(`/app/${params.dealershipId}/settings/${tab.href}`)
            }
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              currentTab === tab.href
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
}
