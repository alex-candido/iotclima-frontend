// src/components/pages/admin/station-sensors/new-station-sensor-form-section.tsx
"use client";

import { StationSensorForm } from "@/components/pages/admin/station-sensors/station-sensor-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { CreateStationSensorFormData } from "@/schemas/station-sensor-schema";
import { Link2 } from "lucide-react";

interface NewStationSensorFormSectionProps {
  initialData: CreateStationSensorFormData;
  onSubmit: (data: CreateStationSensorFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function NewStationSensorFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: NewStationSensorFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          {APP_TEXT.STATION_SENSORS_PAGE.FORM_TITLE || "Dados do Vínculo"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.STATION_SENSORS_PAGE.NEW_DESCRIPTION ||
            "Preencha os dados da nova associação."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StationSensorForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="create"
        />
      </CardContent>
    </Card>
  );
}
