// src/app/(admin)/admin/(routes)/places/[id]/edit/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { PlaceInput } from "@/actions/place-actions";
import { EditPlaceFormSection } from "@/components/pages/admin/places/edit-place-form-section";
import { EditPlaceHeaderSection } from "@/components/pages/admin/places/edit-place-header-section";
import { APP_TEXT } from "@/data/ui-content";
import { usePlace, useUpdatePlace } from "@/hooks/use-places";
import { UpdatePlaceFormData } from "@/schemas/place-schema";
import { PlaceStatus, PlaceType } from "@/types/place";

interface EditPlacePageProps {
  params: {
    id: string;
  };
}

export default function EditPlacePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const placeIdOrUuid = id;

  const {
    data: placeData,
    isLoading: isLoadingPlace,
    error: fetchError,
  } = usePlace(placeIdOrUuid);

  const {
    mutate: updatePlaceMutation,
    isPending: isUpdating,
    isSuccess,
    isError,
    error: updateError,
  } = useUpdatePlace();

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.UPDATE_SUCCESS_MESSAGE ||
          "Local atualizado com sucesso!",
      );
      if (placeData?.properties.uuid) {
        router.push(`/admin/places/${placeData.properties.uuid}`);
      } else {
        router.push("/admin/places");
      }
    }
  }, [isSuccess, router, placeData?.id]);

  useEffect(() => {
    if (isError && updateError) {
      toast.error(
        updateError.message ||
          APP_TEXT.COMMON_UI.UPDATE_ERROR_MESSAGE ||
          "Erro ao atualizar local.",
      );
    }
  }, [isError, updateError]);

  const overallLoading = isLoadingPlace;
  const overallError = fetchError;

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando dados do local..."}
        </span>
      </div>
    );
  }

  if (overallError || !placeData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
            "Erro ao carregar dados do local."}
        </span>
        <p className="text-sm">
          {overallError?.message ||
            APP_TEXT.PLACES_PAGE.PLACE_NOT_FOUND_MESSAGE ||
            "Local não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  const initialFormData: UpdatePlaceFormData = {
    name: placeData.properties.name,
    description: placeData.properties.description,
    address: placeData.properties.address,
    city: placeData.properties.city,
    state: placeData.properties.state,
    country: placeData.properties.country,
    latitude: placeData.geometry.coordinates[1],
    longitude: placeData.geometry.coordinates[0],
    status: placeData.properties.status,
    type: placeData.properties.type,
    user: placeData.properties.user,
  };

  const handleFormSubmit = async (data: UpdatePlaceFormData) => {
    updatePlaceMutation({
      id: placeData.id,
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        user: data.user,
        ...(data.status !== undefined &&
          data.status !== null && { status: data.status as PlaceStatus }),
        ...(data.type !== undefined &&
          data.type !== null && { type: data.type as PlaceType }),
      } as PlaceInput,
    });
  };

  return (
    <div className="space-y-6">
      <EditPlaceHeaderSection
        isLoading={isUpdating}
        placeId={placeData.properties.uuid}
        place={placeData}
      />

      <EditPlaceFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
