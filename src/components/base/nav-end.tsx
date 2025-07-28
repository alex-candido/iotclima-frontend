// src/components/base/nav-end.tsx
"use client";

import { ThemeSwitch } from "@/components/base/theme-switch";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function NavbarEnd({ className }: { className?: string }) {
  return (
    <div className={cn("nav-end flex items-center gap-4", className)}>
      <ThemeSwitch />
      <Button
        variant="outline"
        className="hidden md:inline-flex bg-transparent  text-sm font-medium hover:bg-gray-100/5"
        asChild
      >
        <Link href="/docs">Ver Documentação</Link>
      </Button>
      <Button variant="ghost" className="md:hidden">
        <Menu className="w-5 h-5" />
      </Button>
      <Button asChild>
        <Link
          href="/maps"
          className="flex items-center gap-2 font-semibold text-sm"
        >
          Explorar Sistema
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </Button>
    </div>
  );
}
