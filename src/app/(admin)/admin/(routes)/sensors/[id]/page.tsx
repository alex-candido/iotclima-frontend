// src/app/(admin)/admin/(routes)/sensors/[id]/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { APP_TEXT } from "@/data/ui-content";
import { useSensor } from "@/hooks/use-sensors";

import { SensorBasicInfoSection } from "@/components/admin/sensors/sensor-basic-info-section";
import { SensorDetailHeaderSection } from "@/components/admin/sensors/sensor-detail-header-section";
export default function SensorDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: sensorData, isLoading, error } = useSensor(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error || !sensorData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar dados."}
        </span>
        <p className="text-sm">
          {error?.message ||
            APP_TEXT.SENSORS_PAGE.SENSOR_NOT_FOUND_MESSAGE ||
            "Sensor não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SensorDetailHeaderSection
        isLoading={isLoading}
        sensorId={sensorData.uuid}
        sensor={sensorData}
      />

      <div className="flex flex-col gap-6">
        <SensorBasicInfoSection sensor={sensorData} />
      </div>
    </div>
  );
}
