// src/components/maps/map-view/map-layers-control.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { cn } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";

// Definição das camadas do mapa, agora com mais opções
const mapLayers = [
  {
    name: "Padrão",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
  {
    name: "Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
];

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
      <div className="flex flex-col gap-2">
        {mapLayers.map((layer) => (
          <label
            key={layer.name}
            className={cn(
              "flex items-center gap-2 p-2 cursor-pointer rounded-lg border-2 transition-all",
              activeMapLayerUrl === layer.url
                ? "border-blue-500 bg-blue-50"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <input
              type="radio"
              name="map-layer"
              value={layer.url}
              checked={activeMapLayerUrl === layer.url}
              onChange={handleLayerChange}
              className="accent-blue-500"
            />
            <span className="text-sm font-medium text-muted-foreground">{layer.name}</span>
          </label>
        ))}
      </div>
    </FloatingCard>
  );
}