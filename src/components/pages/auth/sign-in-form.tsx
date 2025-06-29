// src/components/auth/sign-in-form.tsx

"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { API_MESSAGES } from "@/data/messages";
import { APP_TEXT } from "@/data/ui-content";

import { useForm } from "@/hooks/use-form";
import { signInSchema } from "@/schemas/auth-schema";
import { signIn } from "next-auth/react";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();

  const {
    form,
    handleSubmit,
    register,
    control,
    isSubmitting,
    errors,
    apiError,
  } = useForm<SignInFormData, any>({
    schema: signInSchema,
    mutationFn: async (data) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.ok) {
        return Promise.reject({
          message: API_MESSAGES.AUTH.LOGIN_FAILED,
        });
      }
      return result;
    },
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSuccess: (data, formValues) => {
      toast.success(API_MESSAGES.AUTH.LOGIN_SUCCESS);
      router.push("/admin/dashboard");
    },
    onError: (error, formValues) => {
      toast.error(error.message || API_MESSAGES.AUTH.LOGIN_FAILED);
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
            <FormItem className="space-y-2">
              <FormLabel htmlFor="email">
                {APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_PLACEHOLDER}
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
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">
                  {APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_LABEL}
                </FormLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {APP_TEXT.AUTH_PAGES.SIGN_IN.FORGOT_PASSWORD_LINK}
                </Link>
              </div>
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
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  id="remember"
                  disabled={isSubmitting}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {APP_TEXT.AUTH_PAGES.SIGN_IN.REMEMBER_ME_LABEL}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {APP_TEXT.AUTH_PAGES.SIGN_IN.LOGIN_LOADING_BUTTON}
            </>
          ) : (
            APP_TEXT.AUTH_PAGES.SIGN_IN.LOGIN_BUTTON
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          <p>
            {APP_TEXT.AUTH_PAGES.SIGN_IN.DEMO_CREDENTIALS_TITLE}
            <br />
            <span className="font-mono text-muted-foreground">
              {APP_TEXT.AUTH_PAGES.SIGN_IN.DEMO_CREDENTIALS_ADMIN}
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
}
