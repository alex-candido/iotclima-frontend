// src/components/admin/users/user-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { APP_TEXT } from "@/data/ui-content";
import { useForm } from "@/hooks/use-form";
import { getUserGroupLabel } from "@/lib/user-helpers";
import {
  CreateUserFormData,
  createUserSchema,
  UpdateUserFormData,
  updateUserSchema,
  UserGroupData,
  UserGroupEnum,
} from "@/schemas/user-schema";

import { BaseFormField } from "@/components/base/base-form-field";

interface UserFormProps {
  initialData: CreateUserFormData | UpdateUserFormData;
  onSubmit: (
    data: CreateUserFormData | UpdateUserFormData | any,
  ) => Promise<void> | void;
  isSubmitting: boolean;
  formType: "create" | "edit";
}

export function UserForm({
  initialData,
  onSubmit,
  isSubmitting,
  formType,
}: UserFormProps) {
  const router = useRouter();

  const schema = formType === "create" ? createUserSchema : updateUserSchema;

  type FormData = z.infer<typeof schema>;

  const { form, handleSubmit, control, errors, apiError } = useForm<
    FormData,
    any
  >({
    schema,
    defaultValues: initialData as FieldValues,
    mutationFn: (data) => Promise.resolve(onSubmit(data)),
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="username"
            label={APP_TEXT.USERS_PAGE.USERNAME_LABEL || "Nome de Usuário"}
            placeholder={
              APP_TEXT.USERS_PAGE.USERNAME_LABEL || "Nome de Usuário"
            }
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="email"
            label={APP_TEXT.USERS_PAGE.EMAIL_LABEL || "Email"}
            placeholder={APP_TEXT.USERS_PAGE.EMAIL_LABEL || "Email"}
            isSubmitting={isSubmitting}
            type="email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseFormField
            control={control}
            name="first_name"
            label={APP_TEXT.USERS_PAGE.FIRST_NAME_LABEL || "Primeiro Nome"}
            placeholder={
              APP_TEXT.USERS_PAGE.FIRST_NAME_LABEL || "Primeiro Nome"
            }
            isSubmitting={isSubmitting}
          />
          <BaseFormField
            control={control}
            name="last_name"
            label={APP_TEXT.USERS_PAGE.LAST_NAME_LABEL || "Sobrenome"}
            placeholder={APP_TEXT.USERS_PAGE.LAST_NAME_LABEL || "Sobrenome"}
            isSubmitting={isSubmitting}
          />
        </div>

        {formType === "create" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFormField
              control={control}
              name="password"
              label={APP_TEXT.AUTH_PAGES.SIGN_UP.PASSWORD_LABEL || "Senha"}
              placeholder={
                APP_TEXT.AUTH_PAGES.SIGN_UP.PASSWORD_LABEL || "Senha"
              }
              isSubmitting={isSubmitting}
              type="password"
            />
            <BaseFormField
              control={control}
              name="confirmPassword"
              label={
                APP_TEXT.AUTH_PAGES.SIGN_UP.CONFIRM_PASSWORD_LABEL ||
                "Confirmar Senha"
              }
              placeholder={
                APP_TEXT.AUTH_PAGES.SIGN_UP.CONFIRM_PASSWORD_LABEL ||
                "Confirmar Senha"
              }
              isSubmitting={isSubmitting}
              type="password"
            />
          </div>
        )}

        <BaseFormField
          control={control}
          name="groups"
          label={APP_TEXT.USERS_PAGE.ROLE_LABEL || "Função"}
          placeholder={
            APP_TEXT.USERS_PAGE.GROUP_FILTER_PLACEHOLDER ||
            "Selecione uma função"
          }
          isSubmitting={isSubmitting}
          renderAs="select"
          selectOptions={Object.values(UserGroupEnum.enum).map(
            (groupName: string) => ({
              value: groupName,
              label: getUserGroupLabel(groupName as UserGroupData),
            }),
          )}
        />

        <BaseFormField
          control={control}
          name="is_active"
          label={APP_TEXT.USERS_PAGE.IS_ACTIVE_LABEL || "Usuário Ativo"}
          description={
            APP_TEXT.USERS_PAGE.IS_ACTIVE_DESCRIPTION ||
            "O usuário pode fazer login no sistema"
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
              ? APP_TEXT.USERS_PAGE.CREATE_USER_BUTTON || "Criar Usuário"
              : APP_TEXT.COMMON_UI.SAVE_BUTTON || "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
