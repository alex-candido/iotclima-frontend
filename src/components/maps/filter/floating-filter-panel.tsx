// src/components/maps/filter/floating-filter-panel.tsx

import { FloatingCard } from "@/components/base/floating-card";
import { Button } from "@/components/ui/button";
import { useMap } from "@/providers/map-provider";
import { X } from "lucide-react";

export function FloatingFilterPanel() {
  const { isFilterPanelOpen, toggleFilterPanel } = useMap();

  if (!isFilterPanelOpen) return null;

  return (
    <FloatingCard className="floating-filter-panel absolute top-4 right-4 z-20 w-80 max-h-[calc(40vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between p-3 px-4 border-b">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="icon" onClick={toggleFilterPanel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4 flex-grow">
        {/* Conteúdo dos filtros aqui */}
        <p>Conteúdo dos filtros...</p>
      </div>
    </FloatingCard>
  );
}
