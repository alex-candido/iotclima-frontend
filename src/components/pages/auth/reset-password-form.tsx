// src/components/auth/reset-password/reset-password-form.tsx

"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import { confirmPasswordReset } from "@/actions/auth-actions";
import { APP_TEXT } from "@/data/ui-content";
import { resetPasswordSchema } from "@/schemas/auth-schema";

import { API_MESSAGES } from "@/data/messages";
import { useForm } from "@/hooks/use-form";
import { useState } from "react";
import { z } from "zod";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
  uid: string;
}

export function ResetPasswordForm({ token, uid }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const { form, handleSubmit, control, isSubmitting, errors, apiError } =
    useForm<ResetPasswordFormData, any>({
      schema: resetPasswordSchema,
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
      mutationFn: async (data) => {
        const result = await confirmPasswordReset({
          token,
          uid,
          new_password1: data.password,
          new_password2: data.confirmPassword,
        });

        if (!result) {
          return Promise.reject({
            message: API_MESSAGES.AUTH.LOGIN_FAILED,
          });
        }
        return result;
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.AUTH.PASSWORD_RESET_CONFIRM_SUCCESS);
        setIsSuccess(true);
      },
     onError: (err: any) => {
      const safeErr = err as any;

      if (safeErr?.response?.data?.token) {
        toast.error(safeErr.response.data.token[0]);
      } else if (safeErr?.response?.data?.uid) {
        toast.error(safeErr.response.data.uid[0]);
      } else if (safeErr?.response?.data?.new_password1) {
        toast.error(safeErr.response.data.new_password1[0]);
      } else if (safeErr?.response?.data?.new_password2) {
        toast.error(safeErr.response.data.new_password2[0]);
      } else {
        toast.error(API_MESSAGES.COMMON.GENERIC_API_ERROR);
      }
    },
  });


  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg text-green-600 font-semibold">
          {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.SUCCESS_MESSAGE}
        </p>
        <Button onClick={() => router.push("/auth/sign-in")}>
          {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RETURN_TO_LOGIN_BUTTON}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(apiError || errors.root?.message) && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {apiError || errors.root?.message}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">
                {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.NEW_PASSWORD_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
                  required
                  disabled={isSubmitting}
                  {...field}
                />
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
              <FormLabel htmlFor="confirmPassword">
                {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.CONFIRM_NEW_PASSWORD_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
                  required
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RESETTING_PASSWORD_LOADING}
            </>
          ) : (
            APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RESET_PASSWORD_BUTTON
          )}
        </Button>
      </form>
    </Form>
  );
}
