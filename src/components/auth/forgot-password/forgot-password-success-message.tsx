// src/components/auth/forgot-password/forgot-password-success-message.tsx

'use client';

import { Button } from "@/components/ui/button";
import { APP_TEXT } from '@/constants/text_content';


interface ForgotPasswordSuccessMessageProps {
  email: string;
  onTryAgain: () => void; // Callback para permitir que o usuário tente novamente
}

export function ForgotPasswordSuccessMessage({ email, onTryAgain }: ForgotPasswordSuccessMessageProps) {
  return (
    <div className="text-center space-y-4">
      <div className="bg-primary/10 text-primary p-4 rounded-md">
        <p>
          {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.SUCCESS_MESSAGE_PART1}{" "}
          <span className="font-medium">{email}</span>.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.DID_NOT_RECEIVE_EMAIL}{" "}
        <Button variant="link" className="p-0 h-auto" onClick={onTryAgain}>
          {APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.TRY_AGAIN_LINK}
        </Button>
        .
      </p>
    </div>
  );
}