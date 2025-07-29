// src/components/maps/actions/refresh-map-button.tsx
"use client";

import { RefreshCw } from "lucide-react";
import { useMap } from "@/providers/map-provider";
import { Button } from "@/components/ui/button";

export function RefreshMapButton() {
  const { triggerMapRefresh } = useMap();

  return (
    <Button variant="ghost" size="icon" onClick={triggerMapRefresh} className="text-muted-foreground hover:bg-muted/50 hover:text-foreground">
      <RefreshCw className="h-5 w-5" />
    </Button>
  );
}

