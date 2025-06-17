// src/app/(auth)/auth/(routes)/sign-in/page.tsx

import { Cloud } from "lucide-react";

import { SignInFooter } from "@/components/auth/sign-in/sign-in-footer";
import { SignInForm } from "@/components/auth/sign-in/sign-in-form";
import { SignInSocial } from "@/components/auth/sign-in/sign-in-social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { APP_TEXT } from '@/constants/text_content';

export default function SignInPage() {
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
            <CardTitle className="text-2xl font-bold text-center">{APP_TEXT.AUTH_PAGES.SIGN_IN.TITLE}</CardTitle> 
            <CardDescription className="text-center">
              {APP_TEXT.AUTH_PAGES.SIGN_IN.DESCRIPTION} 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm /> 

            <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{APP_TEXT.AUTH_PAGES.SIGN_IN.OR_CONTINUE_WITH}</span>
              </div>
            </div>
            <SignInSocial />
          </CardContent>
          <SignInFooter /> 
        </Card>
      </div>
    </div>
  )
}