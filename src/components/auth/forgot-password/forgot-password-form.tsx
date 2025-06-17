// src/components/auth/forgot-password/forgot-password-form.tsx

'use client';

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { requestPasswordReset } from '@/actions/auth-actions'; // Importar a action de reset
import { API_MESSAGES, UI_MESSAGES } from '@/constants/messages';
import { APP_TEXT } from '@/constants/text_content';

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: UI_MESSAGES.FORMS.INVALID_EMAIL }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmitSuccess: (email: string) => void;
}

export function ForgotPasswordForm({ onSubmitSuccess }: ForgotPasswordFormProps) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError: setFormError,
  } = form;


  const onSubmit = async (data: ForgotPasswordFormData) => {
    setApiError(null);
    setFormError("root", { message: "" });

    try {
      await requestPasswordReset(data.email);
      
      toast.success(API_MESSAGES.AUTH.PASSWORD_RESET_REQUEST_SUCCESS);
      onSubmitSuccess(data.email); 
    } catch (err: any) {
      console.error('Password reset request error:', err);
      if (err.response?.data?.email) {
        setApiError(err.response.data.email[0]);
        toast.error(err.response.data.email[0]);
      } else {
        setApiError(API_MESSAGES.COMMON.GENERIC_API_ERROR);
        toast.error(API_MESSAGES.COMMON.GENERIC_API_ERROR);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(apiError || errors.root?.message) && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{apiError || errors.root?.message}</AlertDescription>
        </Alert>
      )}

      {/* Campo Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.EMAIL_LABEL}</Label>
        <Input
          id="email"
          type="email"
          placeholder={APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.EMAIL_PLACEHOLDER}
          required
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Botão de Submissão */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.REQUESTING_LOADING}
          </>
        ) : (
          APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.REQUEST_BUTTON
        )}
      </Button>
    </form>
  );
}