// src/components/auth/forgot-password/forgot-password-footer.tsx

import { CardFooter } from "@/components/ui/card";
import { APP_TEXT } from '@/constants/text_content';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export function ForgotPasswordFooter() {
  return (
    <CardFooter className="flex justify-center">
      <Link href="/auth/sign-in" className="flex items-center text-sm text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.RETURN_TO_LOGIN_BUTTON}
      </Link>
    </CardFooter>
  );
}