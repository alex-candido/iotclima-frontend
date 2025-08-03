// src/components/maps/map-view/locate-me-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMap } from "@/providers/map-provider";
import { LocateFixed } from "lucide-react";
import { useState } from "react";
import { useMap as useLeafletMap } from "react-leaflet";

export function LocateMeButton() {
  const map = useLeafletMap();
  const { currentLocation, locationError } = useMap();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleLocateMe = () => {
    if (map && currentLocation) {
      map.flyTo([currentLocation.latitude, currentLocation.longitude], 15);
    } else {
      console.warn("Map instance or current location not available.");
    }
  };

  const getButtonState = () => {
    if (locationError) {
      return {
        disabled: true,
        tooltipMessage: "Permissão de localização negada.",
      };
    }
    if (!currentLocation) {
      return {
        disabled: true,
        tooltipMessage: "Localização não disponível.",
      };
    }
    return {
      disabled: false,
      tooltipMessage: "Centralizar no meu local.",
    };
  };

  const buttonState = getButtonState();

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleLocateMe}
            className="text-muted-foreground cursor-pointer hover:bg-muted/50 hover:text-foreground"
            disabled={buttonState.disabled}
          >
            <LocateFixed className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{buttonState.tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}