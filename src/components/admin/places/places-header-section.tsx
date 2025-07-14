// src/components/pages/admin/places/places-header-section.tsx
"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

export function PlacesHeaderSection() {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];

  const requiredRolesForNewPlace = APP_ROUTES.ADMIN.PLACES.roles || [];

  const canCreatePlace = userGroups.some((group) =>
    requiredRolesForNewPlace.includes(group),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.PLACES_LINK || "Locais"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.ADMIN_LAYOUT.PLACES_DESCRIPTION ||
            "Gerencie os locais de instalação das estações."}
        </p>
      </div>
      {canCreatePlace && (
        <Link href={APP_ROUTES.ADMIN.PLACES.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.ADMIN_LAYOUT.NEW_PLACE_BUTTON || "Novo Local"}
          </Button>
        </Link>
      )}
    </div>
  );
}
