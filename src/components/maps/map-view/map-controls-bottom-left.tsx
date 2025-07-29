// src/components/maps/map-view/map-controls-bottom-left.tsx
"use client";

import { useMap } from "@/providers/map-provider";
import { MapLayersControl } from "./map-layers-control";
import { MapLegend } from "./map-legend";

export function MapControlsBottomLeft() {
  const { sidebarWidth } = useMap();

  return (
    <div 
      className="absolute bottom-4 flex items-stretch gap-4"
      style={{ left: `${sidebarWidth + 16}px` }}
    >
      <MapLegend />
      <MapLayersControl />
    </div>
  );
}
