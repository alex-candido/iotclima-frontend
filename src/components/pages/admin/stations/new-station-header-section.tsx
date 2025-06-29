// src/components/pages/admin/stations/new-station-header-section.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

interface NewStationHeaderSectionProps {
  isLoading: boolean;
}

export function NewStationHeaderSection({
  isLoading,
}: NewStationHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const requiredRolesForNewStation = APP_ROUTES.ADMIN.STATIONS.roles || [];

  const canCreateStation = userGroups.some((group) =>
    requiredRolesForNewStation.includes(group),
  );

  return (
    <div className="flex items-center gap-4">
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
          {APP_TEXT.STATIONS_PAGE.NEW_STATION_TITLE || "Nova Estação"}
        </h1>{" "}
        <p className="text-muted-foreground">
          {APP_TEXT.STATIONS_PAGE.NEW_STATION_DESCRIPTION ||
            "Adicione uma nova estação meteorológica."}
        </p>{" "}
      </div>
    </div>
  );
}
