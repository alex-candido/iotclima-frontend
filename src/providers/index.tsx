"use client";

import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/providers/next-auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import type { Session } from "next-auth";
import React from "react";

interface AppProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function AppProviders({ children, session }: AppProvidersProps) {
  return (
    <NextAuthProvider session={session ?? null}>
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
