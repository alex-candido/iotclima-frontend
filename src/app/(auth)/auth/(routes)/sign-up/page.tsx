// src/app/(auth)/auth/(routes)/sign-up/page.tsx

import { Cloud } from "lucide-react";

import { SignUpFooter } from "@/components/auth/sign-up/sign-up-footer";
import { SignUpForm } from "@/components/auth/sign-up/sign-up-form";
import { SignUpSocial } from "@/components/auth/sign-up/sign-up-social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { APP_TEXT } from '@/constants/text_content';

export default function SignUpPage() {
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
            <CardTitle className="text-2xl font-bold text-center">{APP_TEXT.AUTH_PAGES.SIGN_UP.TITLE}</CardTitle> 
            <CardDescription className="text-center">
              {APP_TEXT.AUTH_PAGES.SIGN_UP.DESCRIPTION} 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm /> 

            <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{APP_TEXT.AUTH_PAGES.SIGN_UP.OR_CONTINUE_WITH}</span>
              </div>
            </div>
            <SignUpSocial />
          </CardContent>
          <SignUpFooter /> 
        </Card>
      </div>
    </div>
  )
}
