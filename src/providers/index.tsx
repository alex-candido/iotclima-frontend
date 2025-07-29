// src/providers/index.tsx

"use client";

import { MapProvider } from "@/providers/map-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MapProvider>
          {children}
          </MapProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
}
