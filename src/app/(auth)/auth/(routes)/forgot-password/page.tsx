// src/app/(auth)/auth/(routes)/forgot-password/page.tsx

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Cloud } from "lucide-react";
import { useState } from "react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ForgotPasswordSuccessMessage } from "@/components/auth/forgot-password-success-message";

import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHero } from "@/components/auth/auth-hero";
import { APP_TEXT } from "@/data/ui-content";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmissionSuccess = (email: string) => {
    setIsSubmitted(true);
    setSubmittedEmail(email);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setSubmittedEmail("");
  };

  return (
    <>
      <AuthHero>
        <Cloud className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</h1>
      </AuthHero>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.TITLE}
          </CardTitle>
          <CardDescription className="text-center">
            {isSubmitted
              ? APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.DESCRIPTION_SUCCESS
              : APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <ForgotPasswordSuccessMessage
              email={submittedEmail}
              onTryAgain={handleTryAgain}
            />
          ) : (
            <ForgotPasswordForm onSubmitSuccess={handleSubmissionSuccess} />
          )}
        </CardContent>
        <AuthFooter>
          <Link
            href="/auth/sign-in"
            className="flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />{" "}
            {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.RETURN_TO_LOGIN_BUTTON}
          </Link>
        </AuthFooter>
      </Card>
    </>
  );
}
