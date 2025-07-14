// src/components/pages/admin/stations/stations-header-section.tsx
'use client';

import Link from "next/link";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { APP_TEXT } from "@/data/ui-content";
import { APP_ROUTES } from "@/data/routes";
import { UserGroup } from "@/types/next-auth";

export function StationsHeaderSection() {
  const { data: session } = useSession();
  const userGroups: UserGroup[] = (session?.user?.groupNames as UserGroup[]) || [];

  const requiredRolesForNewStation = APP_ROUTES.ADMIN.STATIONS.roles || [];

  const canCreateStation = userGroups.some(group => requiredRolesForNewStation.includes(group));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{APP_TEXT.ADMIN_LAYOUT.STATIONS_LINK || "Estações"}</h1>
        <p className="text-muted-foreground">{APP_TEXT.ADMIN_LAYOUT.STATIONS_DESCRIPTION || "Gerencie as estações meteorológicas."}</p>
      </div>
      {canCreateStation && (
        <Link href={APP_ROUTES.ADMIN.STATIONS.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.ADMIN_LAYOUT.NEW_STATION_BUTTON || "Nova Estação"}
          </Button>
        </Link>
      )}
    </div>
  );
}
