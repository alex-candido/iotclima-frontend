// src/components/base/nav-start.tsx
import Link from "next/link";

const navLinks = [
  { href: "#overview", label: "Visão Geral" },
  { href: "#architecture", label: "Arquitetura" },
  { href: "#features", label: "Funcionalidades" },
  { href: "#stations", label: "Estações" },
  { href: "#tech", label: "Tecnologia" },
];

export function NavbarStart() {
  return (
    <nav className="nav-start hidden md:flex items-center gap-6">
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
