// src/app/(admin)/admin/(routes)/sensors/[id]/edit/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import { useSensor, useUpdateSensor } from "@/hooks/use-sensors";
import { UpdateSensorFormData } from "@/schemas/sensor-schema";
import { SensorStatus } from "@/types/sensor";

import { SensorInput } from "@/actions/sensor-actions";
import { EditSensorFormSection } from "@/components/pages/admin/sensors/edit-sensor-form-section";
import { EditSensorHeaderSection } from "@/components/pages/admin/sensors/edit-sensor-header-section";

export default function EditSensorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const sensorIdOrUuid = id;

  const {
    data: sensorData,
    isLoading: isLoadingSensor,
    error: fetchError,
  } = useSensor(sensorIdOrUuid);

  const {
    mutate: updateSensorMutation,
    isPending: isUpdating,
    isSuccess,
    isError,
    error: updateError,
  } = useUpdateSensor();

  const overallLoading = isLoadingSensor;
  const overallError = fetchError;

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.UPDATE_SUCCESS_MESSAGE ||
          "Sensor atualizado com sucesso!",
      );
      router.push(`/admin/sensors/${sensorData?.id}`);
    }
  }, [isSuccess, router, sensorData?.id]);

  useEffect(() => {
    if (isError && updateError) {
      toast.error(
        updateError.message ||
          APP_TEXT.COMMON_UI.UPDATE_ERROR_MESSAGE ||
          "Erro ao atualizar sensor.",
      );
    }
  }, [isError, updateError]);

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando dados do sensor..."}
        </span>
      </div>
    );
  }

  if (overallError || !sensorData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
            "Erro ao carregar dados do sensor."}
        </span>
        <p className="text-sm">
          {overallError?.message ||
            APP_TEXT.SENSORS_PAGE.SENSOR_NOT_FOUND_MESSAGE ||
            "Sensor não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  const initialFormData: UpdateSensorFormData = {
    type: sensorData.type,
    model: sensorData.model,
    unit: sensorData.unit,
    min_value: sensorData.min_value,
    max_value: sensorData.max_value,
    status: sensorData.status,
    user: sensorData.user,
  };

  const handleFormSubmit = async (data: UpdateSensorFormData) => {
    updateSensorMutation({
      id: sensorData.id,
      data: {
        type: data.type,
        model: data.model,
        unit: data.unit,
        min_value: data.min_value,
        max_value: data.max_value,
        user: data.user,
        ...(data.status !== undefined &&
          data.status !== null && { status: data.status as SensorStatus }),
      } as SensorInput,
    });
  };

  return (
    <div className="space-y-6">
      <EditSensorHeaderSection
        isLoading={isUpdating}
        sensorId={sensorData.id}
        sensor={sensorData}
      />

      <EditSensorFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
