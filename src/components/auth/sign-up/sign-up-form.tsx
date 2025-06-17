// src/components/auth/sign-up/sign-up-form.tsx

'use client'; 

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signup } from '@/actions/auth-actions';
import { API_MESSAGES } from '@/constants/messages';
import { APP_TEXT } from '@/constants/text_content';
import { signIn } from "next-auth/react";

import { signUpSchema } from '@/schemas/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";


type SignUpFormData = z.infer<typeof signUpSchema>;


export function SignUpForm() {
  const router = useRouter();
  
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError: setFormError,
    control, 
  } = form;

  const [apiError, setApiError] = React.useState<string | null>(null);


  const onSubmit = async (data: SignUpFormData) => {
    setApiError(null);
    setFormError("root", { message: "" });

    try {
      const result = await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.confirmPassword,
      });

      if (result) {
        toast.success(API_MESSAGES.AUTH.REGISTER_SUCCESS);
        
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult?.error) {
          console.error('Auto sign-in after registration failed:', signInResult.error);
          toast.error(API_MESSAGES.AUTH.LOGIN_FAILED);
          router.push("/auth/sign-in");
        } else {
          router.push("/admin/dashboard");
        }

      } else {
        setApiError(API_MESSAGES.AUTH.REGISTER_FAILED); 
        toast.error(API_MESSAGES.AUTH.REGISTER_FAILED);
      }
    } catch (err: any) {
      console.error('Sign-up error:', err);
      if (err.response?.data?.email) {
        setFormError('email', { message: err.response.data.email[0] });
        toast.error(err.response.data.email[0]);
      } else if (err.response?.data?.username) {
        setFormError('username', { message: err.response.data.username[0] });
        toast.error(err.response.data.username[0]);
      } else if (err.response?.data?.password) {
        setFormError('password', { message: err.response.data.password[0] });
        toast.error(err.response.data.password[0]);
      } else if (err.response?.data?.password2) { 
        setFormError('confirmPassword', { message: err.response.data.password2[0] });
        toast.error(err.response.data.password2[0]);
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

      <div className="space-y-2">
        <Label htmlFor="username">{APP_TEXT.AUTH_PAGES.SIGN_UP.USERNAME_LABEL}</Label>
        <Input
          id="username"
          type="text"
          placeholder={APP_TEXT.AUTH_PAGES.SIGN_UP.USERNAME_PLACEHOLDER}
          required
          disabled={isSubmitting}
          {...register("username")}
        />
        {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
      </div>

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
        <Label htmlFor="password">{APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_LABEL}</Label>
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
        <Label htmlFor="confirmPassword">{APP_TEXT.AUTH_PAGES.SIGN_UP.CONFIRM_PASSWORD_LABEL}</Label>
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

      <div className="flex items-center space-x-2">
        <Controller
          name="agreeTerms"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="agreeTerms"
              disabled={isSubmitting}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label
          htmlFor="agreeTerms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {APP_TEXT.AUTH_PAGES.SIGN_UP.AGREE_TERMS_TEXT_PART1}{" "}
          <Link href="#" className="text-primary hover:underline">
            {APP_TEXT.AUTH_PAGES.SIGN_UP.TERMS_OF_SERVICE_LINK_TEXT}
          </Link>{" "}
          {APP_TEXT.AUTH_PAGES.SIGN_UP.AGREE_TERMS_TEXT_PART2}{" "}
          <Link href="#" className="text-primary hover:underline">
            {APP_TEXT.AUTH_PAGES.SIGN_UP.PRIVACY_POLICY_LINK_TEXT}
          </Link>
        </Label>
        {errors.agreeTerms && <p className="text-sm text-destructive">{errors.agreeTerms.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {APP_TEXT.AUTH_PAGES.SIGN_UP.CREATING_ACCOUNT_LOADING}
          </>
        ) : (
          APP_TEXT.AUTH_PAGES.SIGN_UP.CREATE_ACCOUNT_BUTTON
        )}
      </Button>
    </form>
  );
}