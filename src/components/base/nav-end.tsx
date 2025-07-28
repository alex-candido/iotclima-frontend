// src/components/base/nav-end.tsx
"use client";

import { ThemeSwitch } from "@/components/base/theme-switch";
import { Button } from "@/components/ui/button";
import { Map, Menu } from "lucide-react";
import Link from "next/link";

export function NavbarEnd() {
  return (
    <div className="nav-end flex items-center gap-4">
      <ThemeSwitch />
      <Button asChild>
        <Link
          href="/maps"
          className="flex items-center gap-2 font-semibold text-sm"
        >
          <Map className="w-4 h-4 stroke-[2.5]" />
          <span>Acessar Maps</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        className="hidden md:inline-flex bg-transparent border-gray-700 text-sm font-medium hover:bg-gray-100/5"
        asChild
      >
        <Link href="/docs">Documentação</Link>
      </Button>
      <Button variant="ghost" className="md:hidden">
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  );
}
