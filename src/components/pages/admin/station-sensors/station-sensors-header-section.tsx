// src/components/pages/admin/station-sensors/station-sensors-header-section.tsx
"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

export function StationSensorsHeaderSection() {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];

  const requiredRolesForNewStationSensor =
    APP_ROUTES.ADMIN.STATION_SENSORS.roles || [];

  const canCreateStationSensor = userGroups.some((group) =>
    requiredRolesForNewStationSensor.includes(group),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.STATION_SENSORS_LINK ||
            "Vínculos Estação-Sensor"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.ADMIN_LAYOUT.STATION_SENSORS_DESCRIPTION ||
            "Gerencie as associações entre estações e sensores."}
        </p>
      </div>
      {canCreateStationSensor && (
        <Link href={APP_ROUTES.ADMIN.STATION_SENSORS.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.ADMIN_LAYOUT.NEW_STATION_SENSOR_BUTTON || "Novo Vínculo"}
          </Button>
        </Link>
      )}
    </div>
  );
}
