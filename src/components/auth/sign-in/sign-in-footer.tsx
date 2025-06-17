// src/components/auth/sign-in/sign-in-footer.tsx

import { CardFooter } from "@/components/ui/card";
import { APP_TEXT } from '@/constants/text_content';
import Link from "next/link";

export function SignInFooter() {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-center text-sm">
        {APP_TEXT.AUTH_PAGES.SIGN_IN.NO_ACCOUNT_QUESTION}{" "} 
        <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
          {APP_TEXT.AUTH_PAGES.SIGN_IN.SIGN_UP_LINK} 
        </Link>
      </div>
    </CardFooter>
  );
}