// src/components/maps/map-view/zoom-control.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useMap } from "react-leaflet";

export function ZoomControl() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="zoom-control flex flex-col gap-1">
      <Button variant="outline" size="icon" onClick={handleZoomIn} className="text-muted-foreground cursor-pointer hover:bg-muted/50 hover:text-foreground">
        <Plus className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" onClick={handleZoomOut} className="text-muted-foreground cursor-pointer hover:bg-muted/50 hover:text-foreground">
        <Minus className="h-5 w-5" />
      </Button>
    </div>
  );
}
