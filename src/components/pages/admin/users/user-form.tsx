// src/components/admin/users/user-form.tsx
"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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
import { useState } from "react";

interface UserFormProps {
  initialData: CreateUserFormData | UpdateUserFormData;
  onSubmit: (
    data: CreateUserFormData | UpdateUserFormData,
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.USERS_PAGE.USERNAME_LABEL || "Nome de Usuário"} *
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.USERS_PAGE.EMAIL_LABEL || "Email"} *
                </FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.USERS_PAGE.FIRST_NAME_LABEL || "Primeiro Nome"}
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
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {APP_TEXT.USERS_PAGE.LAST_NAME_LABEL || "Sobrenome"}
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

        {formType === "create" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {APP_TEXT.AUTH_PAGES.SIGN_UP.PASSWORD_LABEL || "Senha"} *
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {APP_TEXT.AUTH_PAGES.SIGN_UP.CONFIRM_PASSWORD_LABEL ||
                      "Confirmar Senha"}{" "}
                    *
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={control}
          name="groups"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {APP_TEXT.USERS_PAGE.ROLE_LABEL || "Função"} *
              </FormLabel>
              <Select
                value={
                  field.value && field.value.length > 0 ? field.value[0] : ""
                }
                onValueChange={(value) => field.onChange([value])}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      APP_TEXT.USERS_PAGE.GROUP_FILTER_PLACEHOLDER ||
                      "Selecione uma função"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserGroupEnum.enum).map(
                    (groupName: string) => (
                      <SelectItem key={groupName} value={groupName}>
                        {getUserGroupLabel(groupName as UserGroupData)}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  {APP_TEXT.USERS_PAGE.IS_ACTIVE_LABEL || "Usuário Ativo"}
                </FormLabel>
                <FormDescription>
                  {APP_TEXT.USERS_PAGE.IS_ACTIVE_DESCRIPTION ||
                    "O usuário pode fazer login no sistema"}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formType === "create" && (
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>
                {APP_TEXT.USERS_PAGE.SEND_WELCOME_EMAIL_LABEL ||
                  "Enviar Email de Boas-vindas"}
              </Label>
              <p className="text-sm text-muted-foreground">
                {APP_TEXT.USERS_PAGE.SEND_WELCOME_EMAIL_DESCRIPTION ||
                  "Enviar instruções de acesso por email"}
              </p>
            </div>
            <Switch
              checked={sendWelcomeEmail}
              onCheckedChange={setSendWelcomeEmail}
              disabled={isSubmitting}
            />
          </div>
        )}

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
