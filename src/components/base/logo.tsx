// src/components/base/logo.tsx
import { Cloud } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("logo flex items-center gap-2", className)}>
      <Cloud className="h-8 w-8 text-blue-600" />
      <span className="hidden md:block text-xl font-bold">IoTClima</span>
    </div>
  );
}
