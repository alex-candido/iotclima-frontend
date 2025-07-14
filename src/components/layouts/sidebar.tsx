// src/components/layouts/sidebar.tsx

"use client";

import { cn } from "@/lib/utils";
import { Cloud } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIconMap } from "@/data/icons";
import { ADMIN_SIDEBAR_LINKS } from "@/data/navigations";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";

import { ProfileDropdown } from "../base/profile-dropdown";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  Sidebar as UISidebar,
} from "@/components/ui/sidebar";
import { UserGroup } from "@/types/next-auth";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userGroups = session?.user?.groupNames || [];

  const filteredNavigation = ADMIN_SIDEBAR_LINKS.filter((item) => {
    if (item.authRequired && !session) {
      return false;
    }
    if (item.roles && item.roles.length > 0) {
      const hasRequiredRole = item.roles.some((role: UserGroup | string) =>
        userGroups.includes(role)
      );
      return hasRequiredRole;
    }
    return true;
  });

  const generalLinks = filteredNavigation.filter(
    (item) => item.href !== APP_ROUTES.ADMIN.SETTINGS.path
  );
  const otherLinks = filteredNavigation.filter(
    (item) => item.href === APP_ROUTES.ADMIN.SETTINGS.path
  );

  return (
    <UISidebar className="pb-2">
      <SidebarHeader>
        <Link href="/" className="flex py-2 justify-center items-center gap-2">
          <Cloud className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-6">
        <SidebarGroup className="!p-0">
          <SidebarGroupLabel>
            {APP_TEXT.ADMIN_LAYOUT.GENERAL_GROUP_LABEL}
          </SidebarGroupLabel>
          <SidebarMenu>
            {generalLinks.map((item) => {
              // const IconComponent =
              //   item.icon && LucideIconMap[item.icon]
              //     ? LucideIconMap[item.icon]
              //     : null;
              return (
                <SidebarMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {/* {IconComponent && <IconComponent className="h-5 w-5" />} */}
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {otherLinks.length > 0 && (
          <SidebarGroup className="!p-0 mt-6">
            <SidebarGroupLabel>
              {APP_TEXT.ADMIN_LAYOUT.OTHERS_GROUP_LABEL}
            </SidebarGroupLabel>
            <SidebarMenu>
              {otherLinks.map((item) => {
                // const IconComponent =
                //   item.icon && LucideIconMap[item.icon]
                //     ? LucideIconMap[item.icon]
                //     : null;
                return (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {/* {IconComponent && <IconComponent className="h-5 w-5" />} */}
                      {item.label}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem>
                <Link
                  href="/admin/help"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === "/admin/help"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted hover:text-foreground"
                  )}
                >
                  {(() => {
                    const HelpCircleIcon = LucideIconMap["HelpCircle"];
                    return (
                      HelpCircleIcon && <HelpCircleIcon className="h-5 w-5" />
                    );
                  })()}
                  {APP_TEXT.COMMON_UI.HELP_LINK || "Help"}
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ProfileDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </UISidebar>
  );
}
