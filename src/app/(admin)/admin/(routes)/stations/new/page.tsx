// src/app/(admin)/admin/(routes)/stations/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import { useCreateStation } from "@/hooks/use-stations";
import {
  CreateStationFormData,
  StationStatusData,
  StationStatusEnum,
} from "@/schemas/station-schema";

import { StationInput } from "@/actions/station-actions";
import { NewStationFormSection } from "@/components/pages/admin/stations/new-station-form-section";
import { NewStationHeaderSection } from "@/components/pages/admin/stations/new-station-header-section";

export default function NewStationPage() {
  const router = useRouter();
  const {
    mutate: createStationMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateStation();

  const initialFormData: CreateStationFormData = {
    name: "",
    description: null,
    model: "",
    firmware: null,
    installed_at: null,
    last_maintenance_at: null,
    next_maintenance_at: null,
    battery_level: null,
    signal_strength: null,
    status: StationStatusEnum.enum.ACTIVE as StationStatusData,
    place: 0,
    user: null,
  };

  const handleFormSubmit = async (data: CreateStationFormData) => {
    createStationMutation(data as StationInput);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.CREATE_SUCCESS_MESSAGE ||
          "Estação criada com sucesso!",
      );
      router.push("/admin/stations");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.CREATE_ERROR_MESSAGE ||
          "Erro ao criar estação.",
      );
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <NewStationHeaderSection isLoading={isPending} />

      <NewStationFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
