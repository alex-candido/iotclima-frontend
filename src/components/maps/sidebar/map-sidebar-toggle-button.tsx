// src/components/maps/sidebar/map-sidebar-toggle-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface MapSidebarToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export function MapSidebarToggleButton({ isExpanded, onClick }: MapSidebarToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "map-sidebar-toggle-button w-full h-10 mb-2 flex",
        isExpanded ? "justify-end pr-2" : "justify-center",
        isExpanded && "bg-muted"
      )}
    >
      <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-180"}`} />
    </Button>
  );
}