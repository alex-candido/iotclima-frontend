// src/components/pages/admin/sensors/new-sensor-form-section.tsx
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
import { CreateSensorFormData } from "@/schemas/sensor-schema";
import { Gauge } from "lucide-react";

interface NewSensorFormSectionProps {
  initialData: CreateSensorFormData;
  onSubmit: (data: CreateSensorFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function NewSensorFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: NewSensorFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          {APP_TEXT.SENSORS_PAGE.SENSOR_INFO_TITLE || "Informações do Sensor"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.SENSORS_PAGE.SENSOR_INFO_DESCRIPTION ||
            "Preencha os dados do novo sensor."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SensorForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="create"
        />
      </CardContent>
    </Card>
  );
}
