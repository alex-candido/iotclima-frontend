// src/components/base/logo.tsx
import Link from "next/link";
import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isExpanded?: boolean;
  href?: string;
}

export function Logo({ className, isExpanded = true, href }: LogoProps) {
  const LogoContent = (
    <div className={cn("logo flex items-center gap-2", className)}>
      <Cloud className="h-8 w-8 text-blue-600" />
      {isExpanded && <span className="text-xl font-bold">IoTClima</span>}
    </div>
  );

  if (href) {
    return <Link href={href}>{LogoContent}</Link>;
  }

  return LogoContent;
}