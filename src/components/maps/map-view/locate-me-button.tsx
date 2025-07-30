// src/components/maps/map-view/locate-me-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useMap } from "@/providers/map-provider";
import { LocateFixed } from "lucide-react";
import { useMap as useLeafletMap } from "react-leaflet";

export function LocateMeButton() {
  const map = useLeafletMap();
  const { currentLocation } = useMap();

  const handleLocateMe = () => {
    if (map && currentLocation) {
      map.flyTo([currentLocation.latitude, currentLocation.longitude], 15);
    } else {
      console.warn("Map instance or current location not available.");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleLocateMe}
      className="text-muted-foreground cursor-pointer hover:bg-muted/50 hover:text-foreground"
    >
      <LocateFixed className="h-5 w-5" />
    </Button>
  );
}
