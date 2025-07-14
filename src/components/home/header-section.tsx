// src/components/pages/home/header-section.tsx

import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";
import Link from "next/link";

export function HeaderSection() {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background">
      <div className="w-full max-w-4/5 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">MeteoIoT</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Recursos
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Como Funciona
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Benefícios
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Depoimentos
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Planos
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">Começar Agora</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
