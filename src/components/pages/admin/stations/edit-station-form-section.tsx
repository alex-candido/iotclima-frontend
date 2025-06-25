// src/components/pages/admin/stations/edit-station-form-section.tsx
"use client";

import { StationForm } from "@/components/pages/admin/stations/station-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { UpdateStationFormData } from "@/schemas/station-schema";
import { ActivitySquare } from "lucide-react";

interface EditStationFormSectionProps {
  initialData: UpdateStationFormData;
  onSubmit: (data: UpdateStationFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function EditStationFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: EditStationFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivitySquare className="h-5 w-5" />
          {APP_TEXT.STATIONS_PAGE.STATION_INFO_TITLE ||
            "Informações da Estação"}{" "}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.STATIONS_PAGE.EDIT_STATION_DESCRIPTION ||
            "Atualize os dados da estação."}
        </CardDescription>{" "}
      </CardHeader>
      <CardContent>
        <StationForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="edit"
        />
      </CardContent>
    </Card>
  );
}
