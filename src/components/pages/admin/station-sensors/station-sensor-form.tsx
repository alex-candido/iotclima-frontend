// src/components/admin/station-sensors/station-sensor-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StationSensorInput } from "@/actions/station-sensor-actions";
import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";
import {
  CreateStationSensorFormData,
  UpdateStationSensorFormData,
  createStationSensorSchema,
  updateStationSensorSchema,
} from "@/schemas/station-sensor-schema";

import { BaseFormField } from "@/components/base/base-form-field";
import { SENSOR_QUERY_KEYS, useSensors } from "@/hooks/use-sensors";
import { STATION_QUERY_KEYS, useStations } from "@/hooks/use-stations";
import { getSensorTypeLabel } from "@/schemas/sensor-schema";
import { Sensor } from "@/types/sensor";
import { Station } from "@/types/station";
import { useState } from "react";

interface StationSensorFormProps {
  initialData: CreateStationSensorFormData | UpdateStationSensorFormData;
  onSubmit: (
    data: CreateStationSensorFormData | UpdateStationSensorFormData,
  ) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function StationSensorForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType,
}: StationSensorFormProps) {
  const router = useRouter();

  const schema =
    formType === "create"
      ? createStationSensorSchema
      : updateStationSensorSchema;
  type FormData = z.infer<typeof schema>;

  const [stationSearchTerm, setStationSearchTerm] = useState("");
  const [sensorSearchTerm, setSensorSearchTerm] = useState("");

  const defaultFormValues: FieldValues = {
    ...initialData,
    station:
      initialData.station_id !== undefined && initialData.station_id !== null
        ? String(initialData.station_id)
        : undefined,
    sensor:
      initialData.sensor_id !== undefined && initialData.sensor_id !== null
        ? String(initialData.sensor_id)
        : undefined,
    installed_date:
      initialData.installed_date || new Date().toISOString().split("T")[0],
    is_active: (initialData as CreateStationSensorFormData).is_active ?? true,
  };

  const { form, handleSubmit, control, errors, apiError } = useForm<
    FormData,
    any
  >({
    schema: schema,
    defaultValues: defaultFormValues,
    mutationFn: async (data) => {
      const apiData: StationSensorInput | Partial<StationSensorInput> = {
        station_id:
          data?.station_id !== undefined
            ? parseInt(data.station_id.toString())
            : 0,
        sensor_id:
          data?.sensor_id !== undefined
            ? parseInt(data.sensor_id.toString())
            : 0,
        position: data.position,
        installed_date: data.installed_date,
        calibrated_at: data.calibrated_at,
        removed_date: data.removed_date,
        ...(data.is_active !== undefined &&
          data.is_active !== null && { is_active: data.is_active }),
      };

      return onSubmit(apiData as any);
    },
  });

  const { data: stationsData, isLoading: isLoadingStations } = useStations({
    page_size: 999,
    search_term: stationSearchTerm,
    customQueryKey: [
      STATION_QUERY_KEYS.LIST,
      stationSearchTerm,
      "allStationsForStationSensorForm",
    ],
  });
  const availableStations = stationsData?.results || [];

  const { data: sensorsData, isLoading: isLoadingSensors } = useSensors({
    page_size: 999,
    search_term: sensorSearchTerm,
    customQueryKey: [
      SENSOR_QUERY_KEYS.LIST,
      sensorSearchTerm,
      "allSensorsForStationSensorForm",
    ],
  });
  const availableSensors = sensorsData?.results || [];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="station_id"
            label={APP_TEXT.STATION_SENSORS_PAGE.STATION_LABEL || "Estação"}
            placeholder={
              isLoadingStations
                ? APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando estações..."
                : APP_TEXT.STATION_SENSORS_PAGE.STATION_FILTER_PLACEHOLDER ||
                  "Selecione uma estação"
            }
            isSubmitting={isSubmitting || isLoadingStations}
            renderAs="combobox"
            comboboxItems={availableStations}
            comboboxItemKeyExtractor={(stationItem: Station) =>
              stationItem.id.toString()
            }
            comboboxItemDisplayExtractor={(stationItem: Station) =>
              `${stationItem.name} (${stationItem.model})`
            }
            comboboxItemValueExtractor={(stationItem: Station) =>
              stationItem.id.toString()
            }
            onComboboxSearchTermChange={setStationSearchTerm}
            isLoadingComboboxItems={isLoadingStations}
            comboboxEmptyMessage={
              APP_TEXT.COMMON_UI.NO_RESULTS_FOUND ||
              "Nenhuma estação disponível."
            }
            comboboxLoadingMessage={
              APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando estações..."
            }
            comboboxPlaceholder={
              APP_TEXT.STATION_SENSORS_PAGE.STATION_FILTER_PLACEHOLDER ||
              "Buscar estação..."
            }
          />
          <BaseFormField
            control={control}
            name="sensor_id"
            label={APP_TEXT.STATION_SENSORS_PAGE.SENSOR_LABEL || "Sensor"}
            placeholder={
              isLoadingSensors
                ? APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando sensores..."
                : APP_TEXT.STATION_SENSORS_PAGE.SENSOR_FILTER_PLACEHOLDER ||
                  "Selecione um sensor"
            }
            isSubmitting={isSubmitting || isLoadingSensors}
            renderAs="select"
            selectOptions={availableSensors.map((sensor: Sensor) => ({
              value: sensor.id.toString(),
              label: `${sensor.model} (${getSensorTypeLabel(sensor.type)})`,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="position"
            label={APP_TEXT.STATION_SENSORS_PAGE.POSITION_LABEL || "Posição"}
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.POSITION_LABEL ||
              "Ex: Topo, Base, Externo"
            }
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="installed_date"
            label={
              APP_TEXT.STATION_SENSORS_PAGE.INSTALLED_DATE_LABEL ||
              "Data de Instalação"
            }
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.INSTALLED_DATE_LABEL || "DD/MM/AAAA"
            }
            isSubmitting={isSubmitting}
            type="date"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="calibrated_at"
            label={
              APP_TEXT.STATION_SENSORS_PAGE.CALIBRATED_AT_LABEL ||
              "Calibrado em"
            }
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.CALIBRATED_AT_LABEL || "DD/MM/AAAA"
            }
            isSubmitting={isSubmitting}
            type="date"
          />
          <BaseFormField
            control={control}
            name="removed_date"
            label={
              APP_TEXT.STATION_SENSORS_PAGE.REMOVED_DATE_LABEL || "Removido em"
            }
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.REMOVED_DATE_LABEL || "DD/MM/AAAA"
            }
            isSubmitting={isSubmitting}
            type="date"
          />
        </div>

        <BaseFormField
          control={control}
          name="is_active"
          label={
            APP_TEXT.STATION_SENSORS_PAGE.IS_ACTIVE_LABEL || "Vínculo Ativo"
          }
          description={
            APP_TEXT.STATION_SENSORS_PAGE.IS_ACTIVE_DESCRIPTION ||
            "O vínculo está ativo e coletando dados."
          }
          isSubmitting={isSubmitting}
          renderAs="switch"
        />

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
              ? APP_TEXT.STATION_SENSORS_PAGE.CREATE_BUTTON || "Criar Vínculo"
              : APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
