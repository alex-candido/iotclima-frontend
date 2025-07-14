// src/components/admin/stations/station-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StationInput } from "@/actions/station-actions";
import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";
import { usePlaces } from "@/hooks/use-places";
import { USER_QUERY_KEYS, useUsers } from "@/hooks/use-users";
import {
  CreateStationFormData,
  StationStatusEnum,
  UpdateStationFormData,
  createStationSchema,
  getStationStatusLabel,
  updateStationSchema,
} from "@/schemas/station-schema";

import { UserGroupEnum } from "@/schemas/user-schema";

import { BaseFormField } from "@/components/base/base-form-field";
import { PLACE_QUERY_KEYS } from "@/hooks/use-places";
import { Place } from "@/types/place";
import { StationStatus } from "@/types/station";
import { User } from "@/types/user";

interface StationFormProps {
  initialData: CreateStationFormData | UpdateStationFormData;
  onSubmit: (
    data: CreateStationFormData | UpdateStationFormData | any,
  ) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function StationForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType,
}: StationFormProps) {
  const router = useRouter();

  const schema =
    formType === "create" ? createStationSchema : updateStationSchema;
  type FormData = z.infer<typeof schema>;

  const defaultFormValues: FieldValues = {
    ...initialData,
    status:
      initialData.status !== undefined && initialData.status !== null
        ? String(initialData.status)
        : undefined,
    place:
      initialData.place !== undefined && initialData.place !== null
        ? String(initialData.place)
        : undefined,
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
      const apiData: StationInput | Partial<StationInput> = {
        name: data.name,
        description: data.description ?? undefined,
        model: data.model,
        firmware: data.firmware,
        installed_at: data.installed_at,
        last_maintenance_at: data.last_maintenance_at,
        next_maintenance_at: data.next_maintenance_at,
        place: data.place ? parseInt(data.place.toString()) : undefined,
        user: data.user ? parseInt(data.user.toString()) : undefined,
        status: data.status
          ? (parseInt(data.status.toString()) as StationStatus)
          : undefined,
      };

      return onSubmit(apiData as any);
    },
    onSuccess: (result, data) => {},
    onError: (error, data) => {},
  });

  const [placeSearchTerm, setPlaceSearchTerm] = useState("");
  const { data: placesData, isLoading: isLoadingPlaces } = usePlaces({
    search_term: placeSearchTerm || undefined,
    page_size: 10,
    customQueryKey: [
      PLACE_QUERY_KEYS.LIST,
      "allPlacesCombobox",
      placeSearchTerm,
    ],
  });
  const availablePlaces = placesData?.results?.features || [];

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const { data: operatorUsersData, isLoading: isLoadingOperatorUsers } =
    useUsers({
      group_name: UserGroupEnum.enum.OPERATOR,
      search_term: userSearchTerm || undefined,
      page_size: 10,
      customQueryKey: [
        USER_QUERY_KEYS.LIST,
        "allOperatorsCombobox",
        userSearchTerm,
      ],
    });
  const availableOperators = operatorUsersData?.results || [];

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
            name="name"
            label={APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome da Estação"}
            placeholder={
              APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome da Estação"
            }
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="model"
            label={APP_TEXT.STATIONS_PAGE.MODEL_LABEL || "Modelo"}
            placeholder={APP_TEXT.STATIONS_PAGE.MODEL_LABEL || "Modelo"}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="description"
            label={APP_TEXT.STATIONS_PAGE.DESCRIPTION_LABEL || "Descrição"}
            placeholder={
              APP_TEXT.STATIONS_PAGE.DESCRIPTION_LABEL || "Descrição"
            }
            isSubmitting={isSubmitting}
            renderAs="textarea"
            rows={3}
          />
          <BaseFormField
            control={control}
            name="firmware"
            label={APP_TEXT.STATIONS_PAGE.FIRMWARE_LABEL || "Firmware"}
            placeholder={APP_TEXT.STATIONS_PAGE.FIRMWARE_LABEL || "Firmware"}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseFormField
            control={control}
            name="installed_at"
            label={APP_TEXT.STATIONS_PAGE.INSTALLED_AT_LABEL || "Instalado em"}
            placeholder={
              APP_TEXT.STATIONS_PAGE.INSTALLED_AT_LABEL || "Instalado em"
            }
            isSubmitting={isSubmitting}
            type="datetime-local"
          />
          <BaseFormField
            control={control}
            name="last_maintenance_at"
            label={
              APP_TEXT.STATIONS_PAGE.LAST_MAINTENANCE_LABEL ||
              "Última Manutenção"
            }
            placeholder={
              APP_TEXT.STATIONS_PAGE.LAST_MAINTENANCE_LABEL ||
              "Última Manutenção"
            }
            isSubmitting={isSubmitting}
            type="datetime-local"
          />
          <BaseFormField
            control={control}
            name="next_maintenance_at"
            label={
              APP_TEXT.STATIONS_PAGE.NEXT_MAINTENANCE_LABEL ||
              "Próxima Manutenção"
            }
            placeholder={
              APP_TEXT.STATIONS_PAGE.NEXT_MAINTENANCE_LABEL ||
              "Próxima Manutenção"
            }
            isSubmitting={isSubmitting}
            type="datetime-local"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseFormField
            control={control}
            name="status"
            label={APP_TEXT.STATIONS_PAGE.STATUS_LABEL || "Status"}
            placeholder={
              APP_TEXT.STATIONS_PAGE.STATUS_LABEL || "Selecione um status"
            }
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(StationStatusEnum.enum)
              .filter((value) => typeof value === "number")
              .map((value) => ({
                value: value.toString(),
                label: getStationStatusLabel(value as StationStatus),
              }))}
          />
          <BaseFormField
            control={control}
            name="place"
            label={APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Local"}
            placeholder={
              APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Selecione um local"
            }
            isSubmitting={isSubmitting || isLoadingPlaces}
            renderAs="combobox"
            comboboxItems={availablePlaces}
            comboboxItemKeyExtractor={(placeItem: Place) => placeItem.id}
            comboboxItemDisplayExtractor={(placeItem: Place) =>
              `${placeItem.properties.name} (${placeItem.properties.city})`
            }
            comboboxItemValueExtractor={(placeItem: Place) => placeItem.id}
            onComboboxSearchTermChange={setPlaceSearchTerm}
            isLoadingComboboxItems={isLoadingPlaces}
            comboboxEmptyMessage={
              APP_TEXT.PLACES_PAGE.NO_PLACES_AVAILABLE ||
              "Nenhum local disponível."
            }
            comboboxLoadingMessage={
              APP_TEXT.COMMON_UI.LOADING_PLACES || "Carregando locais..."
            }
            comboboxPlaceholder={
              APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Buscar local..."
            }
          />

          <BaseFormField
            control={control}
            name="user"
            label={
              APP_TEXT.USERS_PAGE.PLACE_USER_LABEL || "Usuário Responsável"
            }
            placeholder={
              APP_TEXT.USERS_PAGE.PLACE_USER_LABEL || "Selecione um usuário"
            }
            isSubmitting={isSubmitting}
            renderAs="combobox"
            comboboxItems={availableOperators}
            comboboxItemKeyExtractor={(userItem: User) => userItem.id}
            comboboxItemDisplayExtractor={(userItem: User) =>
              `${userItem.username} (${userItem.email})`
            }
            comboboxItemValueExtractor={(userItem: User) => userItem.id}
            onComboboxSearchTermChange={setUserSearchTerm}
            isLoadingComboboxItems={isLoadingOperatorUsers}
            comboboxEmptyMessage={
              APP_TEXT.USERS_PAGE.NO_OPERATORS_AVAILABLE ||
              "Nenhum operador encontrado."
            }
            comboboxLoadingMessage={
              APP_TEXT.COMMON_UI.LOADING_USERS || "Carregando usuários..."
            }
            comboboxPlaceholder={
              APP_TEXT.USERS_PAGE.PLACE_USER_LABEL || "Buscar operador..."
            }
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
              ? APP_TEXT.STATIONS_PAGE.CREATE_STATION_BUTTON || "Criar Estação"
              : APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
