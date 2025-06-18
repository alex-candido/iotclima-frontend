// src/components/auth/sign-up-form.tsx

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

import { signup } from "@/actions/auth-actions";
import { API_MESSAGES } from "@/data/messages";
import { APP_TEXT } from "@/data/ui-content";
import { signUpSchema } from "@/schemas/auth-schema";

import { signIn } from "next-auth/react";
import { z } from "zod";

import { useForm } from "@/hooks/use-form";

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const {
    form,
    handleSubmit,
    register,
    control,
    isSubmitting,
    errors,
    apiError,
  } = useForm<SignUpFormData, any>({
    schema: signUpSchema,
    mutationFn: async (data) => {
      const result = await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.confirmPassword,
      });

      if (!result) {
        throw new Error(API_MESSAGES.AUTH.REGISTER_FAILED);
      }

      return result;
    },
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    onSuccess: async (data, formValues) => {
      toast.success(API_MESSAGES.AUTH.REGISTER_SUCCESS);

      const login = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      if (login?.error) {
        toast.error(API_MESSAGES.AUTH.LOGIN_FAILED);
        router.push("/auth/sign-in");
      } else {
        router.push("/admin/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message || API_MESSAGES.COMMON.GENERIC_API_ERROR);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">
                {APP_TEXT.AUTH_PAGES.SIGN_UP.USERNAME_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="username"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_UP.USERNAME_PLACEHOLDER}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                {APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.EMAIL_PLACEHOLDER}
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
            <FormItem>
              <FormLabel htmlFor="password">
                {APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
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
                {APP_TEXT.AUTH_PAGES.SIGN_UP.CONFIRM_PASSWORD_LABEL}
              </FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={APP_TEXT.AUTH_PAGES.SIGN_IN.PASSWORD_PLACEHOLDER}
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
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <Checkbox
                  id="agreeTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="leading-snug text-sm">
                <FormLabel htmlFor="agreeTerms">
                  {APP_TEXT.AUTH_PAGES.SIGN_UP.AGREE_TERMS_TEXT_PART1}{" "}
                  <Link href="#" className="text-primary hover:underline">
                    {APP_TEXT.AUTH_PAGES.SIGN_UP.TERMS_OF_SERVICE_LINK_TEXT}
                  </Link>{" "}
                  {APP_TEXT.AUTH_PAGES.SIGN_UP.AGREE_TERMS_TEXT_PART2}{" "}
                  <Link href="#" className="text-primary hover:underline">
                    {APP_TEXT.AUTH_PAGES.SIGN_UP.PRIVACY_POLICY_LINK_TEXT}
                  </Link>
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
              {APP_TEXT.AUTH_PAGES.SIGN_UP.CREATING_ACCOUNT_LOADING}
            </>
          ) : (
            APP_TEXT.AUTH_PAGES.SIGN_UP.CREATE_ACCOUNT_BUTTON
          )}
        </Button>
      </form>
    </Form>
  );
}
