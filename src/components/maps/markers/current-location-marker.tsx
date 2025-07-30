// src/components/maps/markers/current-location-marker.tsx
"use client";

import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

interface CurrentLocationMarkerProps {
  className?: string;
}

export function CurrentLocationMarker({ className }: CurrentLocationMarkerProps) {
  return (
    <div className={cn(
      "current-location-marker flex items-center justify-center bg-blue-500 text-white rounded-full p-2",
      className
    )}>
      <Home className="h-4 w-4" />
    </div>
  );
}