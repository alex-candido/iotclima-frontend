// src/components/admin/places/place-map-tab.tsx
"use client";

import { APP_TEXT } from "@/data/ui-content";
import { Place } from "@/types/place";
import { MapPin } from "lucide-react";

interface PlaceMapTabProps {
  place: Place;
}

export function PlaceMapTab({ place }: PlaceMapTabProps) {
  const latitude = place.geometry.coordinates[1];
  const longitude = place.geometry.coordinates[0];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-lg font-medium">
        <MapPin className="h-5 w-5 text-primary" />
        {APP_TEXT.PLACES_PAGE.MAP_COORDINATES_LABEL || "Coordenadas"}:
        <span className="text-muted-foreground ml-2">
          {latitude}, {longitude}
        </span>
      </div>
      <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center text-muted-foreground text-sm border border-dashed">
        {/* Placeholder para o mapa */}
        {/* Aqui você integraria um componente de mapa (Leaflet, Google Maps, Mapbox) */}
        {/* Por exemplo:
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          allowFullScreen
        ></iframe>
        */}
        {APP_TEXT.PLACES_PAGE.MAP_PLACEHOLDER_TEXT || "Integração do Mapa aqui"}
      </div>
    </div>
  );
}
