"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavItem[];
};

function isActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(href + "/")) return true;
  return false;
}

function isAnyChildActive(
  children: NavItem[] | undefined,
  pathname: string,
): boolean {
  if (!children) return false;
  return children.some(
    (child) =>
      isActive(child.href, pathname) ||
      isAnyChildActive(child.children, pathname),
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item, index) => (
        <NavMainItem
          key={item.title || item.label || index}
          item={item}
          pathname={pathname}
        />
      ))}
    </>
  );
}

function NavMainItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const hasChildren = !!item.children?.length;
  const active =
    item.title
      ? isActive(item.href, pathname) ||
        isAnyChildActive(item.children, pathname)
      : false;
  const [isOpen, setIsOpen] = React.useState(active);

  React.useEffect(() => {
    if (active) {
      setIsOpen(true);
    }
  }, [active]);

  if (item.isSection && item.label) {
    return (
      <SidebarGroup className="p-0 pt-5 first:pt-0">
        <SidebarGroupLabel className="p-0 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/60">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  isActive={active}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon size={16} />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className={cn(
                      "ml-auto transition-transform duration-200",
                      isOpen && "rotate-90",
                    )}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="me-0 pe-0">
                  {item.children!.map((child, index) => (
                    <NavMainSubItem
                      key={child.title || index}
                      item={child}
                      pathname={pathname}
                    />
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
              <a href={item.href}>
                {item.icon && <item.icon size={16} />}
                {item.title}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return null;
}

function NavMainSubItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const hasChildren = !!item.children?.length;
  const active = isActive(item.href, pathname);
  const [isOpen, setIsOpen] = React.useState(active);

  React.useEffect(() => {
    if (active) setIsOpen(true);
  }, [active]);

  if (hasChildren && item.title) {
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton>
              {item.icon && <item.icon size={16} />}
              <span>{item.title}</span>
              <ChevronRight
                className={cn(
                  "ml-auto transition-transform duration-200",
                  isOpen && "rotate-90",
                )}
              />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="me-0 pe-0">
              {item.children!.map((child, index) => (
                <NavMainSubItem
                  key={child.title || index}
                  item={child}
                  pathname={pathname}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  if (item.title) {
    return (
      <SidebarMenuSubItem className="w-full">
        <SidebarMenuSubButton asChild isActive={active}>
          <a href={item.href}>
            {item.title}
          </a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return null;
}
