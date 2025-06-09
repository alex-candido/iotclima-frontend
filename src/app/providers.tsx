"use client";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  );
}
