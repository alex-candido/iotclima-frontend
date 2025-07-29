// src/components/leaflet/leaflet-map-custom-marker-icon.tsx

import { cn } from "@/lib/utils";
import React from "react";

interface LeafletMapCustomMarkerIconProps {
  children?: React.ReactNode;
  className?: string;
}

export function LeafletMapCustomMarkerIcon({ className, children }: LeafletMapCustomMarkerIconProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
