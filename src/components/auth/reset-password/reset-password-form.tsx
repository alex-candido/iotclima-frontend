// src/components/auth/reset-password/reset-password-form.tsx

'use client';

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { confirmPasswordReset } from '@/actions/auth-actions';
import { API_MESSAGES } from '@/constants/messages';
import { APP_TEXT } from '@/constants/text_content';

// NOVO: Importar o schema de validação de 'src/schemas/auth.ts'
import { resetPasswordSchema } from '@/schemas/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
  uid: string;
}

export function ResetPasswordForm({ token, uid }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError: setFormError,
  } = form;


  const onSubmit = async (data: ResetPasswordFormData) => {
    setApiError(null);
    setFormError("root", { message: "" });

    try {
      await confirmPasswordReset({
        token: token,
        uid: uid,
        new_password1: data.password,
        new_password2: data.confirmPassword,
      });
      
      setIsSuccess(true);
      toast.success(API_MESSAGES.AUTH.PASSWORD_RESET_CONFIRM_SUCCESS);
    } catch (err: any) {
      console.error('Password reset error:', err);
      // Lidar com erros de validação do backend (ex: token inválido/expirado)
      if (err.response?.data?.token) {
        setApiError(err.response.data.token[0]);
        toast.error(err.response.data.token[0]);
      } else if (err.response?.data?.uid) {
        setApiError(err.response.data.uid[0]);
        toast.error(err.response.data.uid[0]);
      } else if (err.response?.data?.new_password1) {
        setApiError(err.response.data.new_password1[0]);
        toast.error(err.response.data.new_password1[0]);
      } else if (err.response?.data?.new_password2) { // Adicionado para password2
        setApiError(err.response.data.new_password2[0]);
        toast.error(err.response.data.new_password2[0]);
      } else {
        setApiError(API_MESSAGES.COMMON.GENERIC_API_ERROR);
        toast.error(API_MESSAGES.COMMON.GENERIC_API_ERROR);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg text-green-600 font-semibold">{APP_TEXT.AUTH_PAGES.RESET_PASSWORD.SUCCESS_MESSAGE}</p>
        <Button onClick={() => router.push("/auth/sign-in")}>
          {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RETURN_TO_LOGIN_BUTTON}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(apiError || errors.root?.message) && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{apiError || errors.root?.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">{APP_TEXT.AUTH_PAGES.RESET_PASSWORD.NEW_PASSWORD_LABEL}</Label>
        <Input
          id="password"
          type="password"
          placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
          required
          disabled={isSubmitting}
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{APP_TEXT.AUTH_PAGES.RESET_PASSWORD.CONFIRM_NEW_PASSWORD_LABEL}</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
          required
          disabled={isSubmitting}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RESETTING_PASSWORD_LOADING}
          </>
        ) : (
          APP_TEXT.AUTH_PAGES.RESET_PASSWORD.RESET_PASSWORD_BUTTON
        )}
      </Button>
    </form>
  );
}