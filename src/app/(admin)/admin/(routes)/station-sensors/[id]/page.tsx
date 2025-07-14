// src/app/(admin)/admin/(routes)/station-sensors/[id]/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { APP_TEXT } from "@/data/ui-content";
import { useStationSensor } from "@/hooks/use-station-sensor";

import { StationSensorBasicInfoSection } from "@/components/admin/station-sensors/station-sensor-basic-info-section";
import { StationSensorDetailHeaderSection } from "@/components/admin/station-sensors/station-sensor-detail-header-section";
import { StationSensorTabsSection } from "@/components/admin/station-sensors/station-sensor-tabs-section";

export default function StationSensorDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: stationSensorData, isLoading, error } = useStationSensor(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error || !stationSensorData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar dados."}
        </span>
        <p className="text-sm">
          {error?.message ||
            APP_TEXT.STATION_SENSORS_PAGE.LINK_NOT_FOUND_MESSAGE ||
            "Vínculo não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StationSensorDetailHeaderSection
        isLoading={isLoading}
        stationSensorId={stationSensorData.uuid}
        stationSensor={stationSensorData}
      />

      <div className="flex flex-col gap-6">
          <StationSensorBasicInfoSection stationSensor={stationSensorData} />
          <StationSensorTabsSection stationSensor={stationSensorData} />{" "}
      </div>
    </div>
  );
}
