// src/components/base/nav-start.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#overview", label: "Visão Geral" },
  { href: "#architecture", label: "Arquitetura" },
  { href: "#features", label: "Funcionalidades" },
  { href: "#stations", label: "Estações" },
  { href: "#tech", label: "Tecnologia" },
];

export function NavbarStart({ className }: { className?: string }) {
  return (
    <nav className={cn("nav-start hidden md:flex items-center gap-6", className)}>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
