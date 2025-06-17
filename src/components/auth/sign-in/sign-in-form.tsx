'use client';

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { API_MESSAGES } from '@/constants/messages';
import { APP_TEXT } from '@/constants/text_content';

import { signInSchema } from '@/schemas/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError: setFormError,
    control,
  } = form;

  const [apiError, setApiError] = React.useState<string | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    setApiError(null);
    setFormError("root", { message: "" });

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setApiError(API_MESSAGES.AUTH.LOGIN_FAILED);
        toast.error(API_MESSAGES.AUTH.LOGIN_FAILED);
      } else {
        toast.success(API_MESSAGES.AUTH.LOGIN_SUCCESS);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setApiError(API_MESSAGES.COMMON.NETWORK_ERROR);
      toast.error(API_MESSAGES.COMMON.GENERIC_API_ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {(apiError || errors.root?.message) && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{apiError || errors.root?.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">{APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_LABEL}</Label>
        <Input
          id="email"
          type="email"
          placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_PLACEHOLDER}
          required
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_LABEL}</Label>
          <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
            {APP_TEXT.AUTH_PAGES.SIGN_IN.FORGOT_PASSWORD_LINK} 
          </Link>
        </div>
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
      <div className="flex items-center space-x-2">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="remember"
              disabled={isSubmitting}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {APP_TEXT.AUTH_PAGES.SIGN_IN.REMEMBER_ME_LABEL}
        </Label>
      </div>
      {errors.rememberMe && <p className="text-sm text-destructive">{errors.rememberMe.message}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {APP_TEXT.AUTH_PAGES.SIGN_IN.LOGIN_LOADING_BUTTON}
          </>
        ) : (
          APP_TEXT.AUTH_PAGES.SIGN_IN.LOGIN_BUTTON
        )}
      </Button>

      <div className="mt-4 text-center text-sm">
        <p>
          {APP_TEXT.AUTH_PAGES.SIGN_IN.DEMO_CREDENTIALS_TITLE}
          <br />
          <span className="font-mono text-muted-foreground">{APP_TEXT.AUTH_PAGES.SIGN_IN.DEMO_CREDENTIALS_ADMIN}</span>
        </p>
      </div>
    </form>
  );
}
