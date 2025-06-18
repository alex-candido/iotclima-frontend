// src/components/auth/logout-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { APP_TEXT } from "@/data/ui-content";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    router.push("/");
    setIsLoggingOut(false);
  };

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {APP_TEXT.AUTH_PAGES.LOGOUT?.LOGGING_OUT_BUTTON || "Saindo..."}
        </>
      ) : (
        APP_TEXT.AUTH_PAGES.LOGOUT?.LOGOUT_BUTTON_TEXT || "Sair"
      )}
    </Button>
  );
}
