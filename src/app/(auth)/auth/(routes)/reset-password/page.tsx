// src/app/(auth)/auth/(routes)/reset-password/page.tsx

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { InvalidLinkMessage } from "@/components/auth/invalid-link-message";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

import { AuthHero } from "@/components/auth/auth-hero";
import { AuthLayout } from "@/components/auth/auth-layout";
import { APP_TEXT } from "@/data/ui-content";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  if (!token || !uid) {
    return <InvalidLinkMessage />;
  }

  return (
    <AuthLayout>
      <AuthHero>
        <Cloud className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</h1>
      </AuthHero>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.TITLE}
          </CardTitle>
          <CardDescription className="text-center">
            {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} uid={uid} />
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
