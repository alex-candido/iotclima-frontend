// src/app/(admin)/admin/(routes)/station-sensors/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { StationSensorInput } from "@/actions/station-sensor-actions";
import { NewStationSensorFormSection } from "@/components/admin/station-sensors/new-station-sensor-form-section";
import { NewStationSensorHeaderSection } from "@/components/admin/station-sensors/new-station-sensor-header-section";
import { APP_TEXT } from "@/data/ui-content";
import { useCreateStationSensor } from "@/hooks/use-station-sensor";
import { CreateStationSensorFormData } from "@/schemas/station-sensor-schema";

export default function NewStationSensorPage() {
  const router = useRouter();
  const {
    mutate: createStationSensorMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateStationSensor();

  const initialFormData: CreateStationSensorFormData = {
    station_id: 0,
    sensor_id: 0,
    position: null,
    installed_date: new Date().toISOString(),
    calibrated_at: null,
    is_active: true,
    removed_date: null,
  };

  const handleFormSubmit = async (data: CreateStationSensorFormData) => {
    createStationSensorMutation(data as StationSensorInput);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.CREATE_SUCCESS_MESSAGE ||
          "Vínculo criado com sucesso!",
      );
      router.push("/admin/station-sensors");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.CREATE_ERROR_MESSAGE ||
          "Erro ao criar vínculo.",
      );
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <NewStationSensorHeaderSection isLoading={isPending} />

      <NewStationSensorFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
