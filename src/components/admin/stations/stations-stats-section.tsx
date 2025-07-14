// src/components/pages/admin/stations/stations-stats-section.tsx
'use client';

import { MapPin, CheckCircle, XCircle, Leaf, Wifi, BatteryCharging } from "lucide-react";
import { StatsCard } from "@/components/base/stats-card";
import { APP_TEXT } from "@/data/ui-content";

interface StationsStatsSectionProps {
  totalStations: number;
  activeStations: number;
  inactiveStations: number;
  onlineStations: number;
}

export function StationsStatsSection({
  totalStations,
  activeStations,
  inactiveStations,
  onlineStations,
}: StationsStatsSectionProps) {
  const offlineStations = totalStations - onlineStations; 

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title={APP_TEXT.STATIONS_PAGE.STATS_TOTAL_STATIONS_TITLE || "Total de Estações"}
        value={totalStations}
        description={APP_TEXT.STATIONS_PAGE.STATS_TOTAL_STATIONS_DESCRIPTION || "Estações cadastradas"}
        icon={MapPin} 
        iconColorClass="text-muted-foreground"
      />

      <StatsCard
        title={APP_TEXT.STATIONS_PAGE.STATS_ACTIVE_STATIONS_TITLE || "Estações Ativas"}
        value={activeStations}
        description={APP_TEXT.STATIONS_PAGE.STATS_ACTIVE_STATIONS_DESCRIPTION || "Atualmente ativas"}
        icon={CheckCircle}
        iconColorClass="text-green-500"
      />

      <StatsCard
        title={APP_TEXT.STATIONS_PAGE.STATS_INACTIVE_STATIONS_TITLE || "Estações Inativas"}
        value={inactiveStations}
        description={APP_TEXT.STATIONS_PAGE.STATS_INACTIVE_STATIONS_DESCRIPTION || "Atualmente inativas"}
        icon={XCircle}
        iconColorClass="text-red-500"
      />

      <StatsCard
        title={APP_TEXT.STATIONS_PAGE.STATS_ONLINE_STATIONS_TITLE || "Estações Online"}
        value={onlineStations}
        description={APP_TEXT.STATIONS_PAGE.STATS_ONLINE_STATIONS_DESCRIPTION || "Atualmente conectadas"}
        icon={Wifi} 
        iconColorClass="text-blue-500"
      />
    </div>
  );
}
