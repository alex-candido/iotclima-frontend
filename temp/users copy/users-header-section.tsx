// src/components/pages/admin/users/users-header-section.tsx
"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Hero } from "@/components/base/hero";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";

export function UsersHeaderSection() {
  const { data: session } = useSession();
  const userGroups = session?.user?.groupNames || [];

  const requiredRolesForNewUser = APP_ROUTES.ADMIN.USERS.roles || [];

  const canCreateUser = userGroups.some((group) =>
    requiredRolesForNewUser.includes(group),
  );

  return (
    <Hero>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.USERS_LINK}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.ADMIN_LAYOUT.USERS_DESCRIPTION ||
            "Gerencie os usuários do sistema"}
        </p>
      </div>
      {canCreateUser && (
        <Link href={APP_ROUTES.ADMIN.USERS.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.ADMIN_LAYOUT.NEW_USER_BUTTON || "Novo Usuário"}
          </Button>
        </Link>
      )}
    </Hero>
  );
}
