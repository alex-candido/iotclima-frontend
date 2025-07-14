"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import {
    useStationSensor,
    useUpdateStationSensor,
} from "@/hooks/use-station-sensor";
import { UpdateStationSensorFormData } from "@/schemas/station-sensor-schema";

import { StationSensorInput } from "@/actions/station-sensor-actions";
import { EditStationSensorFormSection } from "@/components/admin/station-sensors/edit-station-sensor-form-section";
import { EditStationSensorHeaderSection } from "@/components/admin/station-sensors/edit-station-sensor-header-section";

export default function EditStationSensorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const stationSensorIdOrUuid = id;

  const {
    data: stationSensorData,
    isLoading: isLoadingStationSensor,
    error: fetchError,
  } = useStationSensor(stationSensorIdOrUuid);

  const {
    mutate: updateStationSensorMutation,
    isPending: isUpdating,
    isSuccess,
    isError,
    error: updateError,
  } = useUpdateStationSensor();

  const initialFormData: UpdateStationSensorFormData = {
    station_id: stationSensorData?.station_id,
    sensor_id: stationSensorData?.sensor_id,
    position: stationSensorData?.position ?? null,
    installed_date: stationSensorData?.installed_date ?? null,
    calibrated_at: stationSensorData?.calibrated_at ?? null,
    is_active: stationSensorData?.is_active ?? true,
    removed_date: stationSensorData?.removed_date ?? null,
  };

  const handleFormSubmit = async (data: UpdateStationSensorFormData) => {
    if (!stationSensorData?.id) {
      toast.error("Erro: ID do vínculo não disponível para atualização.");
      return;
    }

    updateStationSensorMutation({
      id: stationSensorData.id,
      data: {
        station_id: data.station_id,
        sensor_id: data.sensor_id,
        position: data.position,
        installed_date: data.installed_date,
        calibrated_at: data.calibrated_at,
        removed_date: data.removed_date,
        ...(data.is_active !== undefined &&
          data.is_active !== null && { is_active: data.is_active }),
      } as StationSensorInput,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.UPDATE_SUCCESS_MESSAGE ||
          "Vínculo atualizado com sucesso!",
      );
      if (stationSensorData?.id) {
        router.push(`/admin/station-sensors/${stationSensorData.id}`);
      } else {
        router.push("/admin/station-sensors");
      }
    }
  }, [isSuccess, router, stationSensorData?.id]);

  useEffect(() => {
    if (isError && updateError) {
      toast.error(
        updateError.message ||
          APP_TEXT.COMMON_UI.UPDATE_ERROR_MESSAGE ||
          "Erro ao atualizar vínculo.",
      );
    }
  }, [isError, updateError]);

  const overallLoading = isLoadingStationSensor;
  const overallError = fetchError;

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando dados do vínculo..."}
        </span>
      </div>
    );
  }

  if (overallError || !stationSensorData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
            "Erro ao carregar dados do vínculo."}
        </span>
        <p className="text-sm">
          {overallError?.message ||
            APP_TEXT.STATION_SENSORS_PAGE.LINK_NOT_FOUND_MESSAGE ||
            "Vínculo não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EditStationSensorHeaderSection
        isLoading={isUpdating}
        stationSensorId={stationSensorData.id}
        stationSensor={stationSensorData}
      />

      <EditStationSensorFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
