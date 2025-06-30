// src/components/pages/admin/map-view/map-view-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { APP_TEXT } from "@/data/ui-content";
import { ArrowLeft, Filter, Layers, RefreshCw, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { MapFilterParams } from "@/types/map";

interface MapViewFiltersProps {
  filterParams: MapFilterParams;
  onFilterChange: (newFilters: Partial<MapFilterParams>) => void;
  isLoading: boolean;
  onToggleAdvancedFilters: () => void;
  onToggleLayersPanel: () => void;
}

export function MapViewFilters({
  filterParams,
  onFilterChange,
  isLoading,
  onToggleAdvancedFilters,
  onToggleLayersPanel,
}: MapViewFiltersProps) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.MAP_VIEW_LINK || "Visualização no Mapa"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.PLACES_PAGE.MAP_VIEW_DESCRIPTION ||
            "Visualização geográfica das estações meteorológicas."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 w-full sm:w-auto">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER || "Buscar..."}
            className="pl-8"
            value={filterParams.search_term || ""}
            onChange={(e) => onFilterChange({ search_term: e.target.value })}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onToggleAdvancedFilters}
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Layers className="h-4 w-4" />
              Camadas
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showPlaces"
                checked={filterParams.showPlaces}
                onCheckedChange={(checked) =>
                  onFilterChange({ showPlaces: checked as boolean })
                }
              />
              <Label htmlFor="showPlaces">Mostrar Locais</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showStations"
                checked={filterParams.showStations}
                onCheckedChange={(checked) =>
                  onFilterChange({ showStations: checked as boolean })
                }
              />
              <Label htmlFor="showStations">Mostrar Estações</Label>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
        <Button asChild size="sm" className="flex items-center gap-2">
          <a href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
}