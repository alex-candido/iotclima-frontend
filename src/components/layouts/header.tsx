// src/components/admin/header.tsx

"use client";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background z-10">
      <div className="w-full flex items-center gap-4">
        <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
        <Separator orientation="vertical" className="h-6" />
        {children}
      </div>
    </header>
  );
}
