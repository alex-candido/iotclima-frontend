// src/components/admin/places/place-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { PlaceInput } from "@/actions/place-actions";
import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";
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
  onSubmit: (
    data: CreatePlaceFormData | UpdatePlaceFormData,
  ) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function PlaceForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType,
}: PlaceFormProps) {
  const router = useRouter();

  const schema = formType === "create" ? createPlaceSchema : updatePlaceSchema;
  type FormData = z.infer<typeof schema>;

  const defaultFormValues: FieldValues = {
    ...initialData,
    status:
      initialData.status !== undefined && initialData.status !== null
        ? String(initialData.status)
        : undefined,
    type:
      initialData.type !== undefined && initialData.type !== null
        ? String(initialData.type)
        : undefined,
  };

  const { form, handleSubmit, control, errors, apiError } = useForm<
    FormData,
    any
  >({
    schema: schema,
    defaultValues: defaultFormValues,
    mutationFn: async (data) => {
      const apiData: PlaceInput | Partial<PlaceInput> = {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        status:
          data.status !== undefined && data.status !== null
            ? (parseInt(data.status.toString()) as PlaceStatus)
            : undefined,
        type:
          data.type !== undefined && data.type !== null
            ? (parseInt(data.type.toString()) as PlaceType)
            : undefined,
        user: data.user,
      };

      return onSubmit(apiData as any);
    },
    onSuccess: (result, data) => {},
    onError: (error, data) => {},
  });

  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

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
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome do Local"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_DESCRIPTION_LABEL || "Descrição"}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_ADDRESS_LABEL || "Endereço"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_CITY_LABEL || "Cidade"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_STATE_LABEL || "Estado"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_COUNTRY_LABEL || "País"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_LATITUDE_LABEL || "Latitude"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_LONGITUDE_LABEL || "Longitude"} *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="any"
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL || "Status do Local"}{" "}
                  *
                </FormLabel>
                <Select
                  value={
                    field.value !== undefined && field.value !== null
                      ? String(field.value)
                      : ""
                  }
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL ||
                        "Selecione um status"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PlaceStatusEnum.enum)
                      .filter((value) => typeof value === "number")
                      .map((statusValue) => {
                        const status = statusValue as PlaceStatus;
                        return (
                          <SelectItem
                            key={status.toString()}
                            value={status.toString()}
                          >
                            {getPlaceStatusLabel(status)}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL || "Tipo de Local"} *
                </FormLabel>
                <Select
                  value={
                    field.value !== undefined && field.value !== null
                      ? String(field.value)
                      : ""
                  }
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL ||
                        "Selecione um tipo"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PlaceTypeEnum.enum)
                      .filter((value) => typeof value === "number")
                      .map((typeValue) => {
                        const type = typeValue as PlaceType;
                        return (
                          <SelectItem
                            key={type.toString()}
                            value={type.toString()}
                          >
                            {getPlaceTypeLabel(type)}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
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
              ? APP_TEXT.PLACES_PAGE.CREATE_PLACE_BUTTON || "Criar Local"
              : APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
