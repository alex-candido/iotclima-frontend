// src/components/pages/admin/places/edit-place-form-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { APP_TEXT } from "@/data/ui-content";
import { PlaceForm } from "@/components/pages/admin/places/place-form";
import { UpdatePlaceFormData } from "@/schemas/place-schema";

interface EditPlaceFormSectionProps {
  initialData: UpdatePlaceFormData;
  onSubmit: (data: UpdatePlaceFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function EditPlaceFormSection({ initialData, onSubmit, isSubmitting }: EditPlaceFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {APP_TEXT.PLACES_PAGE.PLACE_INFO_TITLE || "Informações do Local"}
        </CardTitle>
        <CardDescription>{APP_TEXT.PLACES_PAGE.EDIT_PLACE_DESCRIPTION || "Atualize os dados do local"}</CardDescription>
      </CardHeader>
      <CardContent>
        <PlaceForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="edit"
        />
      </CardContent>
    </Card>
  );
}
