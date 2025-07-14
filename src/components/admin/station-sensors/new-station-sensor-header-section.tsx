// src/components/pages/admin/station-sensors/new-station-sensor-header-section.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

interface NewStationSensorHeaderSectionProps {
  isLoading: boolean;
}

export function NewStationSensorHeaderSection({
  isLoading,
}: NewStationSensorHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const requiredRolesForNewStationSensor =
    APP_ROUTES.ADMIN.STATION_SENSORS.roles || [];

  const canCreateStationSensor = userGroups.some((group) =>
    requiredRolesForNewStationSensor.includes(group),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.STATION_SENSORS_PAGE.NEW_TITLE || "Novo Vínculo"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.STATION_SENSORS_PAGE.NEW_DESCRIPTION ||
            "Crie uma nova associação entre estação e sensor."}
        </p>
      </div>
    </div>
  );
}
