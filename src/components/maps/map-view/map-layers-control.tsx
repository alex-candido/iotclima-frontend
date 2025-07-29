// src/components/maps/map-view/map-layers-control.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { useMap } from "@/providers/map-provider";

export function MapLayersControl() {
  const { sidebarWidth, activeMapLayerUrl, setActiveMapLayerUrl } = useMap();

  const handleLayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveMapLayerUrl(event.target.value);
  };

  return (
    <FloatingCard 
      className="map-layers-control p-4 z-[400]"
      style={{ left: `${sidebarWidth + 16 + 384 + 16}px` }}
    >
      <h3 className="text-foreground font-semibold mb-2">Camadas do Mapa</h3>
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="map-layer"
            value="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Default layer
            checked={activeMapLayerUrl === "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
            onChange={handleLayerChange}
          />
          <span className="text-muted-foreground">Padrão</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="map-layer"
            value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" // Satellite layer
            checked={activeMapLayerUrl === "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
            onChange={handleLayerChange}
          />
            <span className="text-muted-foreground">Satélite</span>
        </label>
      </div>
    </FloatingCard>
  );
}


