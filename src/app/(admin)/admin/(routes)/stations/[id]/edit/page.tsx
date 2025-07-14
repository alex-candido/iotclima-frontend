// src/app/(admin)/admin/(routes)/stations/[id]/edit/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import { useStation, useUpdateStation } from "@/hooks/use-stations";

import { UpdateStationFormData } from "@/schemas/station-schema";
import { StationStatus } from "@/types/station";

import { StationInput } from "@/actions/station-actions";
import { EditStationFormSection } from "@/components/admin/stations/edit-station-form-section";
import { EditStationHeaderSection } from "@/components/admin/stations/edit-station-header-section";

export default function EditStationPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const stationIdOrUuid = id;

  const {
    data: stationData,
    isLoading: isLoadingStation,
    error: fetchError,
  } = useStation(stationIdOrUuid);

  const {
    mutate: updateStationMutation,
    isPending: isUpdating,
    isSuccess,
    isError,
    error: updateError,
  } = useUpdateStation();

  const overallLoading = isLoadingStation;
  const overallError = fetchError;

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.UPDATE_SUCCESS_MESSAGE ||
          "Estação atualizada com sucesso!",
      );
      router.push(`/admin/stations/${stationData?.uuid}`);
    }
  }, [isSuccess, router, stationData?.id]);

  useEffect(() => {
    if (isError && updateError) {
      toast.error(
        updateError.message ||
          APP_TEXT.COMMON_UI.UPDATE_ERROR_MESSAGE ||
          "Erro ao atualizar estação.",
      );
    }
  }, [isError, updateError]);

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando dados da estação..."}
        </span>
      </div>
    );
  }

  if (overallError || !stationData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
            "Erro ao carregar dados da estação."}
        </span>
        <p className="text-sm">
          {overallError?.message ||
            APP_TEXT.STATIONS_PAGE.STATION_NOT_FOUND_MESSAGE ||
            "Estação não encontrada ou erro de carregamento."}
        </p>
      </div>
    );
  }

  const initialFormData: UpdateStationFormData = {
    name: stationData.name,
    description: stationData.description,
    model: stationData.model,
    firmware: stationData.firmware,
    installed_at: stationData.installed_at,
    last_maintenance_at: stationData.last_maintenance_at,
    next_maintenance_at: stationData.next_maintenance_at,
    status: stationData.status,
    place: stationData.place,
    user: stationData.user,
  };

  const handleFormSubmit = async (data: UpdateStationFormData) => {
    updateStationMutation({
      id: stationData.id,
      data: {
        name: data.name,
        description: data.description,
        model: data.model,
        firmware: data.firmware,
        installed_at: data.installed_at,
        last_maintenance_at: data.last_maintenance_at,
        next_maintenance_at: data.next_maintenance_at,
        place: data.place,
        user: data.user,
        ...(data.status !== undefined &&
          data.status !== null && { status: data.status as StationStatus }),
      } as StationInput,
    });
  };

  return (
    <div className="space-y-6">
      <EditStationHeaderSection
        isLoading={isUpdating}
        stationId={stationData.uuid}
        station={stationData}
      />

      <EditStationFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
