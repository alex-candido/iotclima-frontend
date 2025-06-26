// src/app/global-error.tsx
"use client"; // Este deve ser um Client Component para capturar erros

import { Frown, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { APP_TEXT } from "@/data/ui-content";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Erro global capturado:", error);
  }, [error]);

  const handleGoHome = () => {
    router.push("/");
    reset();
  };

  return (
    <html lang="pt-BR">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
          <Frown className="h-24 w-24 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold mb-2">
            {APP_TEXT.COMMON_UI.GLOBAL_ERROR_TITLE ||
              "Ocorreu um Erro Inesperado"}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {APP_TEXT.COMMON_UI.GLOBAL_ERROR_DESCRIPTION ||
              "Algo deu muito errado. Por favor, tente novamente mais tarde."}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              {APP_TEXT.COMMON_UI.TRY_AGAIN_BUTTON || "Tentar Novamente"}
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gray-600 text-white rounded-md text-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              {APP_TEXT.COMMON_UI.RETURN_HOME_BUTTON || "Retornar à Home"}
            </button>
          </div>
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-left text-sm text-red-400 overflow-auto max-w-full">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
              {error.stack && `\nStack:\n${error.stack}`}
            </pre>
          )}
        </div>
      </body>
    </html>
  );
}
