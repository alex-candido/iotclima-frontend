// src/app/(auth)/auth/(routes)/reset-password/page.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { InvalidLinkMessage } from "@/components/auth/reset-password/invalid-link-message";
import { ResetPasswordForm } from "@/components/auth/reset-password/reset-password-form";

import { APP_TEXT } from '@/constants/text_content';


export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 
  const uid = searchParams.get("uid");     

  if (!token || !uid) {
    return <InvalidLinkMessage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{APP_TEXT.AUTH_PAGES.RESET_PASSWORD.TITLE}</CardTitle>
            <CardDescription className="text-center">
              {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} uid={uid} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}