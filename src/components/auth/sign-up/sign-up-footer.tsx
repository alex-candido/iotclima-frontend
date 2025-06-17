// src/components/auth/sign-up/sign-up-footer.tsx

import { CardFooter } from "@/components/ui/card";
import { APP_TEXT } from '@/constants/text_content';
import Link from "next/link";


export function SignUpFooter() {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-center text-sm">
        {APP_TEXT.AUTH_PAGES.SIGN_UP.HAS_ACCOUNT_QUESTION}{" "}
        <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
          {APP_TEXT.AUTH_PAGES.SIGN_UP.SIGN_IN_LINK}
        </Link>
      </div>
    </CardFooter>
  );
}