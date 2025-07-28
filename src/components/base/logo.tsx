// src/components/base/logo.tsx
import { Cloud } from "lucide-react";

export function Logo() {
  return (
    <div className="logo flex items-center gap-2">
      <Cloud className="h-8 w-8 text-blue-600" />
      <span className="hidden md:block text-xl font-bold">IoTClima</span>
    </div>
  );
}
