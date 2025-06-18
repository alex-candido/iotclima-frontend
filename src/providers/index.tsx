"use client";

import type { Session } from "next-auth";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { NextAuthProvider } from "./next-auth-provider";

export function Providers({
  session,
  children,
}: Readonly<{
  session: Session | null;
  children: ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider session={session}>
        {children}
        <Toaster />
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
