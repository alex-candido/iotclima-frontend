// src/components/maps/map-view/map-legend.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";

export function MapLegend() {
  return (
    <FloatingCard 
      className="map-legend p-4 z-[400]"
    >
      <h3 className="text-sm font-semibold mb-2 text-foreground">Nenhuma estação encontrada</h3>
      <p className="text-sm text-muted-foreground">Ajuste os filtros para ver as estações no mapa</p>
    </FloatingCard>
  );
}
