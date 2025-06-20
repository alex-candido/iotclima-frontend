import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud } from "lucide-react";

import { AuthHero } from "@/components/auth/auth-hero";
import { InvalidLinkMessage } from "@/components/auth/invalid-link-message";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { APP_TEXT } from "@/data/ui-content";

interface ResetPasswordPageProps {
  params: {
    uid: string;
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { uid, token } = params;

  console.log("Valores brutos dos params:", { uid, token });

  if (!token || !uid) {
    return <InvalidLinkMessage />;
  }

  return (
    <>
      <AuthHero>
        <Cloud className="h-8 w-8 text-primary" />
        <h1 className="2xl font-bold">{APP_TEXT.GLOBAL.APP_NAME}</h1>
      </AuthHero>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="2xl font-bold text-center">
            {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.TITLE}
          </CardTitle>
          <CardDescription className="text-center">
            {APP_TEXT.AUTH_PAGES.RESET_PASSWORD.DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} uid={uid} />
        </CardContent>
      </Card>
    </>
  );
}
