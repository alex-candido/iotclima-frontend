// src/components/maps/map-view/map-legend.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { Badge } from "@/components/ui/badge";
import { useMap } from "@/providers/map-provider";

const weatherLegendItems = [
  { id: "sunny", label: "Sol", icon: "☀️", color: "bg-yellow-400" },
  { id: "cloudy", label: "Nublado", icon: "⛅", color: "bg-gray-400" },
  { id: "rainy", label: "Chuva", icon: "️🌧️", color: "bg-blue-400" },
  { id: "windy", label: "Vento", icon: "💨", color: "bg-gray-300" },
  { id: "stormy", label: "Tempestade", icon: "⛈️", color: "bg-slate-700 text-white" },
  { id: "foggy", label: "Nevoeiro", icon: "🌫️", color: "bg-gray-200" },
  { id: "snowy", label: "Neve", icon: "❄️", color: "bg-white text-blue-500" },
];

export function MapLegend() {
  const { filterCounts } = useMap();
  const totalStations = filterCounts.all;

  if (totalStations === 0) {
    return (
      <FloatingCard 
        className="map-legend p-4 z-[400]"
      >
        <h3 className="text-sm font-semibold mb-2 text-foreground">Nenhuma estação encontrada</h3>
        <p className="text-sm text-muted-foreground">Ajuste os filtros para ver as estações no mapa</p>
      </FloatingCard>
    );
  }

  return (
    <FloatingCard 
      className="map-legend p-4 z-[400]"
    >
      <h3 className="text-sm font-semibold mb-2 text-foreground">Condições do Tempo</h3>
      <div className="grid grid-cols-3 gap-2">
        {weatherLegendItems.map(item => (
          <div key={item.id} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <Badge className="ml-auto" variant="secondary">{filterCounts[item.id as keyof typeof filterCounts]}</Badge>
          </div>
        ))}
      </div>
    </FloatingCard>
  );
}