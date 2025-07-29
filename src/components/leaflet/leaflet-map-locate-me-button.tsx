// src/components/leaflet/leaflet-map-locate-me-button.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function LeafletMapLocateMeButton({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
