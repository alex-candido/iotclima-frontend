// src/app/(auth)/auth/(routes)/sign-up/page.tsx

import { Cloud } from "lucide-react";

import { SignUpForm } from "@/components/pages/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AuthFooter } from "@/components/pages/auth/auth-footer";
import { AuthHero } from "@/components/pages/auth/auth-hero";
import { APP_TEXT } from "@/data/ui-content";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <AuthHero>
        <Cloud className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</h1>
      </AuthHero>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {APP_TEXT.AUTH_PAGES.SIGN_UP.TITLE}
          </CardTitle>
          <CardDescription className="text-center">
            {APP_TEXT.AUTH_PAGES.SIGN_UP.DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <AuthFooter>
          <div className="text-center text-sm">
            {APP_TEXT.AUTH_PAGES.SIGN_UP.HAS_ACCOUNT_QUESTION}{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary hover:underline"
            >
              {APP_TEXT.AUTH_PAGES.SIGN_UP.SIGN_IN_LINK}
            </Link>
          </div>
        </AuthFooter>
      </Card>
    </>
  );
}
