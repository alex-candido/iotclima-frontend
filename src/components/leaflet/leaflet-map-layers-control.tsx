// src/components/leaflet/leaflet-map-layers-control.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function LeafletMapLayersControl({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
