// src/components/pages/admin/sensors/edit-sensor-form-section.tsx
"use client";

import { SensorForm } from "@/components/pages/admin/sensors/sensor-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { UpdateSensorFormData } from "@/schemas/sensor-schema";
import { Gauge } from "lucide-react";

interface EditSensorFormSectionProps {
  initialData: UpdateSensorFormData;
  onSubmit: (data: UpdateSensorFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function EditSensorFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: EditSensorFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          {APP_TEXT.SENSORS_PAGE.SENSOR_INFO_TITLE || "Informações do Sensor"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.SENSORS_PAGE.EDIT_SENSOR_DESCRIPTION ||
            "Atualize as informações do sensor."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SensorForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="edit"
        />
      </CardContent>
    </Card>
  );
}
