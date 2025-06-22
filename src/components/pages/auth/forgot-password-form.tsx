// src/components/auth/forgot-password/forgot-password-form.tsx

'use client';

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

import { requestPasswordReset } from "@/actions/auth-actions";
import { API_MESSAGES } from "@/data/messages";
import { APP_TEXT } from "@/data/ui-content";
import { forgotPasswordSchema } from "@/schemas/auth-schema";

import { useForm } from "@/hooks/use-form";
import { z } from "zod";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmitSuccess: (email: string) => void;
}

export function ForgotPasswordForm({
  onSubmitSuccess,
}: ForgotPasswordFormProps) {
  const router = useRouter();

  const {
    form,
    handleSubmit,
    register,
    control,
    isSubmitting,
    errors,
    apiError,
  } = useForm<ForgotPasswordFormData, any>({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: "",
    },
    mutationFn: async (data) => {
      await requestPasswordReset(data.email);
      return { success: true };
    },
    onSuccess: (data, formValues) => {
      toast.success(API_MESSAGES.AUTH.PASSWORD_RESET_REQUEST_SUCCESS);
      onSubmitSuccess(formValues.email);
    },
    onError: (err: any) => {
      if (err.response?.data?.email) {
        toast.error(err.response.data.email[0]);
      } else {
        toast.error(err.message || API_MESSAGES.COMMON.GENERIC_API_ERROR);
      }
    },
  });

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.EMAIL_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.EMAIL_PLACEHOLDER
                  }
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
              {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.REQUESTING_LOADING}
            </>
          ) : (
            APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.REQUEST_BUTTON
          )}
        </Button>
      </form>
    </Form>
  );
}
