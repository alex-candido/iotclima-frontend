// src/app/(admin)/admin/(routes)/sensors/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import { useCreateSensor } from "@/hooks/use-sensors";
import { CreateSensorFormData } from "@/schemas/sensor-schema";
import { SensorStatus, SensorType, UnitType } from "@/types/sensor";

import { SensorInput } from "@/actions/sensor-actions";
import { NewSensorFormSection } from "@/components/admin/sensors/new-sensor-form-section";
import { NewSensorHeaderSection } from "@/components/admin/sensors/new-sensor-header-section";

export default function NewSensorPage() {
  const router = useRouter();
  const {
    mutate: createSensorMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateSensor();

  const initialFormData: CreateSensorFormData = {
    type: SensorType.OTHER,
    model: "",
    unit: UnitType.OTHER,
    min_value: 0,
    max_value: 100,
    status: SensorStatus.ACTIVE,
    user: null,
  };

  const handleFormSubmit = async (data: CreateSensorFormData) => {
    const apiData: SensorInput = {
      ...data,
      type: data.type as SensorType,
      unit: data.unit as UnitType,
      status: data.status as SensorStatus,
    };
    createSensorMutation(apiData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.CREATE_SUCCESS_MESSAGE ||
          "Sensor criado com sucesso!",
      );
      router.push("/admin/sensors");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.CREATE_ERROR_MESSAGE ||
          "Erro ao criar sensor.",
      );
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <NewSensorHeaderSection isLoading={isPending} />

      <NewSensorFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
