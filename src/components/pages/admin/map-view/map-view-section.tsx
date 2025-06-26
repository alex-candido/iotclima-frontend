// src/components/pages/admin/map-view/map-view-section.tsx
"use client";

import { MapActiveFilters } from "@/components/pages/admin/map-view/map-active-filters";
import { MapAdvancedFilters } from "@/components/pages/admin/map-view/map-advanced-filters";
import { MapStationDrawer } from "@/components/pages/admin/map-view/map-station-drawer";
import { MapView } from "@/components/pages/admin/map-view/map-view";
import { MapViewFilters } from "@/components/pages/admin/map-view/map-view-filters";

import { Place } from "@/types/place";
import { Station } from "@/types/station";

interface MapFilterParams {
  search_term?: string;
  showPlaces?: boolean;
  showStations?: boolean;
  place_status?: number | "all";
  place_type?: number | "all";
  station_status?: number | "all";
  regions?: string[];
  sensorTypes?: string[];
  alertLevel?: string[];
  lastUpdate?: string;
  batteryLevel?: [number, number];
  temperature?: [number, number];
  humidity?: [number, number];
  windSpeed?: [number, number];
}

interface MapViewSectionProps {
  places: Place[];
  stations: Station[];
  filterParams: MapFilterParams;
  onFilterChange: (newFilters: Partial<MapFilterParams>) => void;
  isLoading: boolean;
}

export function MapViewSection({
  places,
  stations,
  filterParams,
  onFilterChange,
  isLoading,
}: MapViewSectionProps) {
  return (
    <>
      <MapViewFilters />
      <MapAdvancedFilters />
      <MapActiveFilters />
      <MapView />
      <MapStationDrawer />
    </>
  );
}
