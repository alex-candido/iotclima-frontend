// src/components/pages/admin/station-sensors/station-sensors-stats-section.tsx
"use client";

import { StatsCard } from "@/components/base/stats-card";
import { APP_TEXT } from "@/data/ui-content";
import { CheckCircle, Link as LinkIcon, MapPin, XCircle } from "lucide-react";

interface StationSensorsStatsSectionProps {
  totalStationSensors: number;
  activeStationSensors: number;
  inactiveStationSensors: number;
}

export function StationSensorsStatsSection({
  totalStationSensors,
  activeStationSensors,
  inactiveStationSensors,
}: StationSensorsStatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_TOTAL_LINKS_TITLE ||
          "Total de Vínculos"
        }
        value={totalStationSensors}
        description={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_TOTAL_LINKS_DESCRIPTION ||
          "Vínculos cadastrados"
        }
        icon={LinkIcon}
        iconColorClass="text-muted-foreground"
      />

      <StatsCard
        title={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_ACTIVE_LINKS_TITLE ||
          "Vínculos Ativos"
        }
        value={activeStationSensors}
        description={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_ACTIVE_LINKS_DESCRIPTION ||
          "Atualmente ativos"
        }
        icon={CheckCircle}
        iconColorClass="text-green-500"
      />

      <StatsCard
        title={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_INACTIVE_LINKS_TITLE ||
          "Vínculos Inativos"
        }
        value={inactiveStationSensors}
        description={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_INACTIVE_LINKS_DESCRIPTION ||
          "Atualmente inativos"
        }
        icon={XCircle}
        iconColorClass="text-red-500"
      />

      <StatsCard
        title={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_TEMPERATURE_LINKS_TITLE ||
          "Sensores de Temp."
        }
        value={0}
        description={
          APP_TEXT.STATION_SENSORS_PAGE.STATS_TEMPERATURE_LINKS_DESCRIPTION ||
          "Links com sensores de temperatura"
        }
        icon={MapPin}
        iconColorClass="text-orange-500"
      />
    </div>
  );
}
