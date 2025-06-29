"use client";

import type { Session } from "next-auth";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { NextAuthProvider } from "@/providers/next-auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({
  session,
  children,
}: Readonly<{
  session: Session | null;
  children: ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextAuthProvider session={session}>
          {children}
          <Toaster />
        </NextAuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
