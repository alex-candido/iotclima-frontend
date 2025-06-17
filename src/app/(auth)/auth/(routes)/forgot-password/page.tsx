// src/app/(auth)/auth/(routes)/forgot-password/page.tsx

'use client'; // Client Component pois usa estado e manipula o fluxo

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { useState } from "react"; // Para controlar o estado isSubmitted

// Importar os componentes do novo diretório
import { ForgotPasswordFooter } from "@/components/auth/forgot-password/forgot-password-footer";
import { ForgotPasswordForm } from "@/components/auth/forgot-password/forgot-password-form";
import { ForgotPasswordSuccessMessage } from "@/components/auth/forgot-password/forgot-password-success-message";

import { APP_TEXT } from '@/constants/text_content';


export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [submittedEmail, setSubmittedEmail] = useState(""); 

  const handleSubmissionSuccess = (email: string) => {
    setIsSubmitted(true);
    setSubmittedEmail(email);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setSubmittedEmail("");
  };

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
            <CardTitle className="text-2xl font-bold text-center">{APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.TITLE}</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted ? 
                APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.DESCRIPTION_SUCCESS : 
                APP_TEXT.AUTH_PAGES.FORGOT_PASSWORD.DESCRIPTION
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <ForgotPasswordSuccessMessage email={submittedEmail} onTryAgain={handleTryAgain} />
            ) : (
              <ForgotPasswordForm onSubmitSuccess={handleSubmissionSuccess} />
            )}
          </CardContent>
          <ForgotPasswordFooter /> 
        </Card>
      </div>
    </div>
  )
}