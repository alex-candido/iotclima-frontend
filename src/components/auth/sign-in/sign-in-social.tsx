// src/components/auth/sign-in/sign-in-social.tsx

'use client'; 

import { Button } from "@/components/ui/button";
import { APP_TEXT } from '@/constants/text_content';

export function SignInSocial() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline">
        {APP_TEXT.AUTH_PAGES.SIGN_IN.GOOGLE_LOGIN_BUTTON} 
      </Button>
      <Button variant="outline">
        {APP_TEXT.AUTH_PAGES.SIGN_IN.MICROSOFT_LOGIN_BUTTON} 
      </Button>
    </div>
  );
}