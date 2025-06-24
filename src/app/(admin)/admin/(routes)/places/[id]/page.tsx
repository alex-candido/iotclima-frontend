// src/app/(admin)/admin/(routes)/places/[id]/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { APP_TEXT } from "@/data/ui-content";
import { usePlace } from "@/hooks/use-places";

import { PlaceBasicInfoSection } from "@/components/pages/admin/places/place-basic-info-section";
import { PlaceDetailHeaderSection } from "@/components/pages/admin/places/place-detail-header-section";
import { PlaceTabsSection } from "@/components/pages/admin/places/place-tabs-section";

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: placeData, isLoading, error } = usePlace(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error || !placeData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar dados."}
        </span>
        <p className="text-sm">
          {error?.message ||
            APP_TEXT.PLACES_PAGE.PLACE_NOT_FOUND_MESSAGE ||
            "Local não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PlaceDetailHeaderSection
        placeId={placeData.properties.uuid}
        place={placeData}
        isLoading={isLoading}
      />

      <div className="flex flex-col gap-6">
        <div className="">
          <PlaceBasicInfoSection place={placeData} />
        </div>

        <div className="">
          <PlaceTabsSection place={placeData} />
        </div>
      </div>
    </div>
  );
}
