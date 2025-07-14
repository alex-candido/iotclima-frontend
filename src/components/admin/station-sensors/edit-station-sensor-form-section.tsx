// src/components/pages/admin/station-sensors/edit-station-sensor-form-section.tsx
"use client";

import { StationSensorForm } from "@/components/admin/station-sensors/station-sensor-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { UpdateStationSensorFormData } from "@/schemas/station-sensor-schema";
import { Link2 } from "lucide-react";

interface EditStationSensorFormSectionProps {
  initialData: UpdateStationSensorFormData;
  onSubmit: (data: UpdateStationSensorFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function EditStationSensorFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: EditStationSensorFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          {APP_TEXT.STATION_SENSORS_PAGE.FORM_TITLE || "Dados do Vínculo"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.STATION_SENSORS_PAGE.EDIT_DESCRIPTION ||
            "Atualize os dados da associação."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StationSensorForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="edit"
        />
      </CardContent>
    </Card>
  );
}
