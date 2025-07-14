// src/components/pages/admin/sensors/sensors-header-section.tsx
"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

export function SensorsHeaderSection() {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];

  const requiredRolesForNewSensor = APP_ROUTES.ADMIN.SENSORS.roles || [];

  const canCreateSensor = userGroups.some((group) =>
    requiredRolesForNewSensor.includes(group),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.SENSORS_LINK || "Sensores"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.ADMIN_LAYOUT.SENSORS_DESCRIPTION ||
            "Gerencie os sensores do sistema."}
        </p>
      </div>
      {canCreateSensor && (
        <Link href={APP_ROUTES.ADMIN.SENSORS.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.ADMIN_LAYOUT.NEW_SENSOR_BUTTON || "Novo Sensor"}
          </Button>
        </Link>
      )}
    </div>
  );
}
