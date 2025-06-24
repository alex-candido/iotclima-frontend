// src/app/(admin)/admin/(routes)/places/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { APP_TEXT } from "@/data/ui-content";
import { useCreatePlace } from "@/hooks/use-places";
import {
  CreatePlaceFormData,
  PlaceStatusEnum,
  PlaceTypeEnum,
  UpdatePlaceFormData,
} from "@/schemas/place-schema";

import { NewPlaceFormSection } from "@/components/pages/admin/places/new-place-form-section";
import { NewPlaceHeaderSection } from "@/components/pages/admin/places/new-place-header-section";

export default function NewPlacePage() {
  const router = useRouter();
  const {
    mutate: createPlaceMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreatePlace();

  const initialFormData: CreatePlaceFormData = {
    name: "",
    description: null,
    address: "",
    city: "",
    state: "",
    country: "",
    latitude: 0,
    longitude: 0,
    status: PlaceStatusEnum.enum.ACTIVE,
    type: PlaceTypeEnum.enum.OTHER,
    user: null,
  };

  const handleFormSubmit = async (
    data: CreatePlaceFormData | UpdatePlaceFormData,
  ) => {
    createPlaceMutation(data as CreatePlaceFormData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.CREATE_SUCCESS_MESSAGE ||
          "Local criado com sucesso!",
      );
      router.push("/admin/places");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.CREATE_ERROR_MESSAGE ||
          "Erro ao criar local.",
      );
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <NewPlaceHeaderSection isLoading={isPending} />

      <NewPlaceFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
