// src/components/pages/admin/places/new-place-form-section.tsx
"use client";

import { PlaceForm } from "@/components/admin/places/place-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import {
    CreatePlaceFormData,
    UpdatePlaceFormData,
} from "@/schemas/place-schema";
import { MapPin } from "lucide-react";

interface NewPlaceFormSectionProps {
  initialData: CreatePlaceFormData;
  onSubmit: (
    data: CreatePlaceFormData | UpdatePlaceFormData,
  ) => Promise<void> | void;
  isSubmitting: boolean;
}

export function NewPlaceFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: NewPlaceFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {APP_TEXT.PLACES_PAGE.PLACE_INFO_TITLE || "Informações do Local"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.PLACES_PAGE.PLACE_INFO_DESCRIPTION ||
            "Preencha os dados do novo local"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlaceForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="create"
        />
      </CardContent>
    </Card>
  );
}
