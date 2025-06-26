// src/app/not-found.tsx
"use client";

import { APP_TEXT } from "@/data/ui-content";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <Frown className="h-20 w-20 text-primary mb-4" />
      <h1 className="text-2xl font-bold mb-2">
        {APP_TEXT.COMMON_UI.NOT_FOUND_TITLE || "Página Não Encontrada"}
      </h1>
      <p className="text-xl text-muted-foreground mb-6">
        {APP_TEXT.COMMON_UI.NOT_FOUND_DESCRIPTION ||
          "Não foi possível encontrar o recurso solicitado."}
      </p>
      <Link href="/">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-base font-medium hover:bg-primary/90 transition-colors">
          {APP_TEXT.COMMON_UI.RETURN_HOME_BUTTON || "Retornar à Home"}
        </button>
      </Link>
    </div>
  );
}
