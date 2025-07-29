// src/components/maps/map-view/map-view.tsx
"use client";

import { LeafletMap } from "@/components/leaflet/leaflet-map";
import { CustomMarkerIcon } from "@/components/maps/map-view/custom-marker-icon";
import { CustomPopupContent } from "@/components/maps/map-view/custom-popup-content";
import { MapControlsBottomLeft } from "@/components/maps/map-view/map-controls-bottom-left";
import { MapControlsBottomRight } from "@/components/maps/map-view/map-controls-bottom-right";
import { useMap } from "@/providers/map-provider";
import type { LatLngExpression } from 'leaflet';

export function MapView() {
  const { mapRefreshKey, activeMapLayerUrl } = useMap();

  // Configurações do Mapa
  const MAP_URL_LAYER = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const INITIAL_CENTER: LatLngExpression = [-3.74, -38.595];
  const INITIAL_ZOOM = 13;

  // Dados de Exemplo
  const DUMMY_ITEMS = [
    { id: 1, position: [-3.73, -38.59] as LatLngExpression, data: { name: "Ponto A" } },
    { id: 2, position: [-3.75, -38.6] as LatLngExpression, data: { name: "Ponto B" } },
  ];

  return (
    <div className="map-view absolute inset-0 z-0">
      <LeafletMap
        key={mapRefreshKey} 
        urlLayer={activeMapLayerUrl}
        centerPosition={INITIAL_CENTER}
        zoomLevel={INITIAL_ZOOM}
        items={DUMMY_ITEMS}
        renderMarkerIcon={(data) => <CustomMarkerIcon data={data} />}
        renderPopupContent={(data) => <CustomPopupContent data={data} />}
        useCluster={false}
        mapControls={
          <>
            <MapControlsBottomLeft />
            <MapControlsBottomRight />
          </>
        }
      />
    </div>
  );
}