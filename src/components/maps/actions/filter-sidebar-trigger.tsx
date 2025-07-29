// src/components/maps/actions/filter-sidebar-trigger.tsx
"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMap } from "@/providers/map-provider";
import { Button } from "@/components/ui/button";

export function FilterSidebarTrigger() {
  const { toggleFilterPanel } = useMap();

  return (
    <Button variant="ghost" size="icon" onClick={toggleFilterPanel} className="text-muted-foreground hover:bg-muted/50 hover:text-foreground">
      <SlidersHorizontal className="h-5 w-5" />
    </Button>
  );
}
