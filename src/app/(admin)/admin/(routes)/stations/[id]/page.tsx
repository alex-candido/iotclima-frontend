// src/app/(admin)/admin/(routes)/stations/[id]/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { APP_TEXT } from "@/data/ui-content";
import { useStation } from "@/hooks/use-stations";

import { StationBasicInfoSection } from "@/components/pages/admin/stations/station-basic-info-section";
import { StationDetailHeaderSection } from "@/components/pages/admin/stations/station-detail-header-section";
import { StationTabsSection } from "@/components/pages/admin/stations/station-tabs-section";

export default function StationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: stationData, isLoading, error } = useStation(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error || !stationData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar dados."}
        </span>
        <p className="text-sm">
          {error?.message ||
            APP_TEXT.STATIONS_PAGE.STATION_NOT_FOUND_MESSAGE ||
            "Estação não encontrada ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StationDetailHeaderSection
        stationId={stationData.uuid}
        station={stationData}
        isLoading={isLoading}
      />

      <div className="flex flex-col gap-6">
        <StationBasicInfoSection station={stationData} />
        <StationTabsSection station={stationData} />
      </div>
    </div>
  );
}
