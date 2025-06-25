// src/components/admin/places/place-form.tsx
'use client';

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { BaseFormField } from "@/components/base/base-form-field";
import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";
import { PLACE_QUERY_KEYS, usePlaces } from "@/hooks/use-places";
import {
  CreatePlaceFormData,
  PlaceStatusEnum,
  PlaceTypeEnum,
  UpdatePlaceFormData,
  createPlaceSchema,
  getPlaceStatusLabel,
  getPlaceTypeLabel,
  updatePlaceSchema,
} from "@/schemas/place-schema";
import { PlaceStatus, PlaceType } from "@/types/place";

interface PlaceFormProps {
  initialData: CreatePlaceFormData | UpdatePlaceFormData;
  onSubmit: (data: CreatePlaceFormData | UpdatePlaceFormData) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function PlaceForm({ initialData, onSubmit, isSubmitting, formType }: PlaceFormProps) {
  const router = useRouter();

  const schema = formType === "create" ? createPlaceSchema : updatePlaceSchema;
  type FormData = z.infer<typeof schema>;

  const defaultFormValues: FieldValues = {
    ...initialData,
    status: initialData.status !== undefined && initialData.status !== null ? String(initialData.status) : undefined,
    type: initialData.type !== undefined && initialData.type !== null ? String(initialData.type) : undefined,
    user: initialData.user !== undefined && initialData.user !== null ? String(initialData.user) : undefined, 
  };

  const {
    form,
    handleSubmit,
    control,
    errors,
    apiError,
  } = useForm<FormData, any>({
    schema: schema,
    defaultValues: defaultFormValues,
    mutationFn: async (data) => {
      const apiData = {
        ...data,
        status: data.status !== undefined && data.status !== null ? parseInt(data.status.toString()) as PlaceStatus : undefined,
        type: data.type !== undefined && data.type !== null ? parseInt(data.type.toString()) as PlaceType : undefined,
        user: data.user !== undefined && data.user !== null ? parseInt(data.user.toString()) : undefined,
      };

      return onSubmit(apiData as any);
    },
    onSuccess: (result, data) => {
    },
    onError: (error, data) => {
    },
  });

  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  const { data: placesData, isLoading: isLoadingPlaces } = usePlaces({
    page_size: 100,
    customQueryKey: [PLACE_QUERY_KEYS.LIST, 'allPlacesForForm'],
  });
  const availablePlaces = placesData?.results?.features || [];


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
            label={APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome do Local"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome do Local"}
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="description"
            label={APP_TEXT.PLACES_PAGE.PLACE_DESCRIPTION_LABEL || "Descrição"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_DESCRIPTION_LABEL || "Descrição"}
            isSubmitting={isSubmitting}
            renderAs="textarea"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BaseFormField
            control={control}
            name="address"
            label={APP_TEXT.PLACES_PAGE.PLACE_ADDRESS_LABEL || "Endereço"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_ADDRESS_LABEL || "Endereço"}
            isSubmitting={isSubmitting}
            className="lg:col-span-2"
          />
          <BaseFormField
            control={control}
            name="city"
            label={APP_TEXT.PLACES_PAGE.PLACE_CITY_LABEL || "Cidade"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_CITY_LABEL || "Cidade"}
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="state"
            label={APP_TEXT.PLACES_PAGE.PLACE_STATE_LABEL || "Estado"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_STATE_LABEL || "Estado"}
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="country"
            label={APP_TEXT.PLACES_PAGE.PLACE_COUNTRY_LABEL || "País"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_COUNTRY_LABEL || "País"}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="latitude"
            label={APP_TEXT.PLACES_PAGE.PLACE_LATITUDE_LABEL || "Latitude"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_LATITUDE_LABEL || "Latitude"}
            isSubmitting={isSubmitting}
            type="number"
          />
          <BaseFormField
            control={control}
            name="longitude"
            label={APP_TEXT.PLACES_PAGE.PLACE_LONGITUDE_LABEL || "Longitude"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_LONGITUDE_LABEL || "Longitude"}
            isSubmitting={isSubmitting}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="status"
            label={APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL || "Status do Local"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL || "Selecione um status"}
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(PlaceStatusEnum.enum).filter(value => typeof value === 'number').map(value => ({
              value: value.toString(),
              label: getPlaceStatusLabel(value as PlaceStatus)
            }))}
          />
          <BaseFormField
            control={control}
            name="type"
            label={APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL || "Tipo de Local"}
            placeholder={APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL || "Selecione um tipo"}
            isSubmitting={isSubmitting}
            renderAs="select"
            selectOptions={Object.values(PlaceTypeEnum.enum).filter(value => typeof value === 'number').map(value => ({
              value: value.toString(),
              label: getPlaceTypeLabel(value as PlaceType)
            }))}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
          </Button>
          <Button type="submit" className="flex items-center gap-2" disabled={isSubmitting}>
            <Save className="h-4 w-4" />
            {isSubmitting ? (APP_TEXT.COMMON_UI.SAVING_LOADING || "Salvando...") : (formType === "create" ? (APP_TEXT.PLACES_PAGE.CREATE_PLACE_BUTTON || "Criar Local") : (APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
