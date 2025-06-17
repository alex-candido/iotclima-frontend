// src/components/auth/reset-password/invalid-link-message.tsx

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from '@/constants/text_content';
import { useRouter } from "next/navigation";


export function InvalidLinkMessage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{APP_TEXT.AUTH_PAGES.RESET_PASSWORD.INVALID_LINK_TITLE}</CardTitle>
            <CardDescription className="text-center">
              {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.INVALID_LINK_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/auth/forgot-password")}>
              {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.REQUEST_NEW_LINK_BUTTON}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}