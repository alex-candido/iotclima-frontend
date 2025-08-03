// src/components/maps/map-view/map-fly-to-handler.tsx
"use client";

import { useMap } from "@/providers/map-provider";
import { useEffect } from "react";
import { useMap as useLeafletMap } from "react-leaflet";

export function MapFlyToHandler() {
  const map = useLeafletMap();
  const { flyToCoordinates, setFlyToCoordinates } = useMap();

  useEffect(() => {
    console.log("MapFlyToHandler: flyToCoordinates changed", flyToCoordinates);
    if (map && flyToCoordinates) {
      map.flyTo([flyToCoordinates.latitude, flyToCoordinates.longitude], 15);
      setFlyToCoordinates(null);
    }
  }, [map, flyToCoordinates, setFlyToCoordinates]);

  return null;
}