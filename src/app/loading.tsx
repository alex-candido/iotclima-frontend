// src/app/loading.tsx
"use client";

import { APP_TEXT } from "@/data/ui-content";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="ml-4 text-lg text-muted-foreground">
        {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando..."}
      </span>
    </div>
  );
}
