// src/components/pages/admin/stations/new-station-form-section.tsx
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
import { CreateStationFormData } from "@/schemas/station-schema";
import { ActivitySquare } from "lucide-react";

interface NewStationFormSectionProps {
  initialData: CreateStationFormData;
  onSubmit: (data: CreateStationFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function NewStationFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: NewStationFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivitySquare className="h-5 w-5" />
          {APP_TEXT.STATIONS_PAGE.STATION_INFO_TITLE ||
            "Informações da Estação"}{" "}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.STATIONS_PAGE.NEW_STATION_DESCRIPTION ||
            "Preencha os dados da nova estação."}
        </CardDescription>{" "}
      </CardHeader>
      <CardContent>
        <StationForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="create"
        />
      </CardContent>
    </Card>
  );
}
