// src/components/admin/sensors/sensor-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { BaseFormField } from "@/components/base/base-form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";

import { SensorInput } from "@/actions/sensor-actions";
import {
  CreateSensorFormData,
  SensorStatusEnum,
  SensorTypeEnum,
  UnitTypeEnum,
  UpdateSensorFormData,
  createSensorSchema,
  getSensorStatusLabel,
  getSensorTypeLabel,
  getUnitTypeLabel,
  updateSensorSchema,
} from "@/schemas/sensor-schema";
import { SensorStatus, SensorType, UnitType } from "@/types/sensor";

interface SensorFormProps {
  initialData: CreateSensorFormData | UpdateSensorFormData;
  onSubmit: (
    data: CreateSensorFormData | UpdateSensorFormData | any,
  ) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function SensorForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType,
}: SensorFormProps) {
  const router = useRouter();

  const schema =
    formType === "create" ? createSensorSchema : updateSensorSchema;
  type FormData = z.infer<typeof schema>;

  const defaultFormValues: FieldValues = {
    ...initialData,
    type:
      initialData.type !== undefined && initialData.type !== null
        ? String(initialData.type)
        : undefined,
    unit:
      initialData.unit !== undefined && initialData.unit !== null
        ? String(initialData.unit)
        : undefined,
    status:
      initialData.status !== undefined && initialData.status !== null
        ? String(initialData.status)
        : undefined,
    min_value: initialData.min_value ?? 0,
    max_value: initialData.max_value ?? 0,
    user:
      initialData.user !== undefined && initialData.user !== null
        ? String(initialData.user)
        : undefined,
  };

  const { form, handleSubmit, control, errors, apiError } = useForm<
    FormData,
    any
  >({
    schema: schema,
    defaultValues: defaultFormValues,
    mutationFn: async (data) => {
      const apiData: SensorInput | Partial<SensorInput> = {
        type: data.type
          ? (parseInt(data.type.toString()) as SensorType)
          : undefined,
        model: data.model,
        unit: data.unit
          ? (parseInt(data.unit.toString()) as UnitType)
          : undefined,
        min_value: data.min_value,
        max_value: data.max_value,
        user: data.user ? parseInt(data.user.toString()) : undefined,
        status: data.status
          ? (parseInt(data.status.toString()) as SensorStatus)
          : undefined,
      };

      return onSubmit(apiData as any);
    },
    onSuccess: (result, data) => {},
    onError: (error, data) => {},
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {(apiError || errors.root?.message) && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {apiError || errors.root?.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseFormField
            control={control}
            name="model"
            label={APP_TEXT.SENSORS_PAGE.MODEL_LABEL || "Modelo"}
            placeholder={APP_TEXT.SENSORS_PAGE.MODEL_LABEL || "Modelo"}
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="min_value"
            label={
              APP_TEXT.SENSORS_PAGE.SENSOR_MIN_VALUE_LABEL || "Valor Mínimo"
            }
            placeholder={
              APP_TEXT.SENSORS_PAGE.SENSOR_MIN_VALUE_LABEL || "Valor Mínimo"
            }
            isSubmitting={isSubmitting}
            type="number"
          />
          <BaseFormField
            control={control}
            name="max_value"
            label={
              APP_TEXT.SENSORS_PAGE.SENSOR_MAX_VALUE_LABEL || "Valor Máximo"
            }
            placeholder={
              APP_TEXT.SENSORS_PAGE.SENSOR_MAX_VALUE_LABEL || "Valor Máximo"
            }
            isSubmitting={isSubmitting}
            type="number"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseFormField
            control={control}
            name="type"
            label={APP_TEXT.SENSORS_PAGE.SENSOR_TYPE_LABEL || "Tipo de Sensor"}
            placeholder={
              APP_TEXT.SENSORS_PAGE.SENSOR_TYPE_LABEL || "Selecione um tipo"
            }
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(SensorTypeEnum.enum)
              .filter((value) => typeof value === "number")
              .map((typeValue) => ({
                value: typeValue.toString(),
                label: getSensorTypeLabel(typeValue as SensorType),
              }))}
          />

          <BaseFormField
            control={control}
            name="unit"
            label={APP_TEXT.SENSORS_PAGE.SENSOR_UNIT_LABEL || "Unidade"}
            placeholder={
              APP_TEXT.SENSORS_PAGE.SENSOR_UNIT_LABEL || "Selecione uma unidade"
            }
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(UnitTypeEnum.enum)
              .filter((value) => typeof value === "number")
              .map((unitValue) => ({
                value: unitValue.toString(),
                label: getUnitTypeLabel(unitValue as UnitType),
              }))}
          />

          <BaseFormField
            control={control}
            name="status"
            label={
              APP_TEXT.SENSORS_PAGE.SENSOR_STATUS_LABEL || "Status do Sensor"
            }
            placeholder={
              APP_TEXT.SENSORS_PAGE.SENSOR_STATUS_LABEL || "Selecione um status"
            }
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(SensorStatusEnum.enum)
              .filter((value) => typeof value === "number")
              .map((statusValue) => ({
                value: statusValue.toString(),
                label: getSensorStatusLabel(statusValue as SensorStatus),
              }))}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" />
            {isSubmitting
              ? APP_TEXT.COMMON_UI.SAVING_LOADING || "Salvando..."
              : formType === "create"
              ? APP_TEXT.SENSORS_PAGE.CREATE_SENSOR_BUTTON || "Criar Sensor"
              : APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
