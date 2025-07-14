// src/components/pages/admin/map-view/map-active-filters.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMapContext } from "@/providers/map-provider";
import { getPlaceTypeLabel, PlaceTypeData } from "@/schemas/place-schema";
import {
  getStationStatusLabel,
  StationStatusData,
} from "@/schemas/station-schema";
import { Clock, MapPin, Search, X } from "lucide-react";

interface MapFilterParams {
  search_term?: string;
  place_type?: PlaceTypeData | "all";
  station_status?: StationStatusData | "all";
  regions?: string[];
  lastUpdate?: string;
}

interface MapActiveFiltersProps {
  filterParams: MapFilterParams;
  onFilterChange: (newFilters: Partial<MapFilterParams>) => void;
}

export function MapActiveFilters() {
  const { filterParams, onFilterChange } = useMapContext();

  const { search_term, place_type, station_status, regions, lastUpdate } =
    filterParams;

  const activeFiltersCount = [
    search_term,
    place_type !== "all",
    station_status !== "all",
    regions?.length,
    lastUpdate && lastUpdate !== "all",
  ].filter(Boolean).length;

  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">Filtros ativos:</span>
            {search_term && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                {search_term}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange({ search_term: "" })}
                />
              </Badge>
            )}
            {place_type && place_type !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Tipo: {getPlaceTypeLabel(place_type)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange({ place_type: "all" })}
                />
              </Badge>
            )}
            {station_status && station_status !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Status: {getStationStatusLabel(station_status)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange({ station_status: "all" })}
                />
              </Badge>
            )}
            {regions?.map((region) => (
              <Badge
                key={region}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <MapPin className="h-3 w-3" />
                {region}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    onFilterChange({
                      regions: regions.filter((r) => r !== region),
                    })
                  }
                />
              </Badge>
            ))}
            {lastUpdate && lastUpdate !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lastUpdate === "1h" && "Última hora"}
                {lastUpdate === "6h" && "Últimas 6h"}
                {lastUpdate === "24h" && "Últimas 24h"}
                {lastUpdate === "offline" && "Offline"}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange({ lastUpdate: "all" })}
                />
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onFilterChange({
                search_term: "",
                place_type: "all",
                station_status: "all",
                regions: [],
                lastUpdate: "all",
              })
            }
          >
            Limpar todos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
