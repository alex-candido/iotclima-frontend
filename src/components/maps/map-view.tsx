"use client";

import { LeafletMap } from "@/components/leaflet/leaflet-map";
import { MapPin } from "lucide-react";

interface MapItemData {
  name: string;
  description: string;
}

export function MapView() {
  const dummyItems: { id: number; position: [number, number]; data: MapItemData }[] = [
    {
      id: 1,
      position: [-3.730793027244902, -38.593047410296776],
      data: { name: "Ponto A", description: "Descrição do Ponto A" },
    },
    {
      id: 2,
      position: [-3.75, -38.6],
      data: { name: "Ponto B", description: "Descrição do Ponto B" },
    },
  ];

  const renderCustomMarkerIcon = () => {
    return (
      <div className="bg-blue-500 text-white rounded-full p-1 flex items-center justify-center">
        <MapPin size={16} />
      </div>
    );
  };

  const renderCustomPopupContent = (data: MapItemData) => {
    return (
      <div className="p-2">
        <h3 className="font-bold text-lg">{data.name}</h3>
        <p className="text-sm">{data.description}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-screen">
      <LeafletMap
        centerPosition={[-3.730793027244902, -38.593047410296776]}
        zoomLevel={13}
        items={dummyItems}
        renderMarkerIcon={renderCustomMarkerIcon}
        renderPopupContent={renderCustomPopupContent}
        useCluster={true} // Testando com cluster
      />
    </div>
  );
}
