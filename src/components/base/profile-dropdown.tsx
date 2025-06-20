// src/components/base/profile-dropdown.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Loader2,
  LogOut,
  Monitor,
  Palette,
  User as UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileDropdownProps {
  variant?: "header" | "sidebar";
}

export function ProfileDropdown({ variant = "sidebar" }: ProfileDropdownProps) {
  const { isMobile } = useSidebar();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false });
    router.push("/");
    setIsSigningOut(false);
  };

  if (status === "loading") {
    return (
      <SidebarMenuButton size="lg" className="justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </SidebarMenuButton>
    );
  }

  const currentUser = session?.user;

  if (!currentUser) {
    return null;
  }

  const dropdownSide =
    variant === "header" ? "bottom" : isMobile ? "bottom" : "right";
  const dropdownAlign = "end";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={
                currentUser.image ||
                currentUser.avatar ||
                "/avatars/placeholder.jpg"
              }
              alt={currentUser.name || currentUser.username || "User"}
            />
            <AvatarFallback className="rounded-lg">
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : currentUser.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {currentUser.name || currentUser.username}
            </span>
            <span className="truncate text-xs">{currentUser.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={dropdownSide}
        align={dropdownAlign}
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={
                  currentUser.image ||
                  currentUser.avatar ||
                  "/avatars/placeholder.jpg"
                }
                alt={currentUser.name || currentUser.username || "User"}
              />
              <AvatarFallback className="rounded-lg">
                {currentUser.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : currentUser.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {currentUser.name || currentUser.username}
              </span>
              <span className="truncate text-xs">{currentUser.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={APP_ROUTES.ADMIN.SETTINGS.PROFILE.path}>
              <UserIcon className="mr-2 h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.PROFILE_LINK_TEXT || "Profile"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={APP_ROUTES.ADMIN.SETTINGS.ACCOUNT_DETAILS.path}>
              <BadgeCheck className="mr-2 h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.ACCOUNT_LINK_TEXT || "Account"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={APP_ROUTES.ADMIN.SETTINGS.NOTIFICATIONS.path}>
              <Bell className="mr-2 h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.NOTIFICATIONS_LINK_TEXT || "Notifications"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={APP_ROUTES.ADMIN.SETTINGS.APPEARANCE.path}>
              <Palette className="mr-2 h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.APPEARANCE_LINK_TEXT || "Appearance"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={APP_ROUTES.ADMIN.SETTINGS.DISPLAY.path}>
              <Monitor className="mr-2 h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.DISPLAY_LINK_TEXT || "Display"}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isSigningOut}>
          {isSigningOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {APP_TEXT.ADMIN_LAYOUT.LOGOUT_BUTTON || "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
