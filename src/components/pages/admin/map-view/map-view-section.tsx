// src/components/pages/admin/map-view/map-view-section.tsx

"use client";

import { MapActiveFilters } from "@/components/pages/admin/map-view/map-active-filters";
import { MapAdvancedFilters } from "@/components/pages/admin/map-view/map-advanced-filters";
import { MapStationDrawer } from "@/components/pages/admin/map-view/map-station-drawer";
import { MapView } from "@/components/pages/admin/map-view/map-view";
import { MapViewFilters } from "@/components/pages/admin/map-view/map-view-filters";

import { Place } from "@/types/place";
import { Station } from "@/types/station";

import { MapFilterParams } from "@/types/map";
import { useState } from "react";

interface MapViewSectionProps {
  places: Place[];
  stations: Station[];
  filterParams: MapFilterParams;
  onFilterChange: (newFilters: Partial<MapFilterParams>) => void;
  isLoading: boolean;
  onStationClick: (station: Station) => void;
  onPlaceClick: (place: Place) => void;
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: (open: boolean) => void;
  showLayersPanel: boolean;
  onToggleLayersPanel: () => void;
  selectedStation: Station | null;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export function MapViewSection({
  places,
  stations,
  filterParams,
  onFilterChange,
  isLoading,
  onStationClick,
  onPlaceClick,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  showLayersPanel,
  onToggleLayersPanel,
  selectedStation,
  isDrawerOpen,
  onCloseDrawer,
}: MapViewSectionProps) {
  const [centerCoordinates, setCenterCoordinates] = useState<[number, number] | null>(null);

  const handleSearchItemSelected = (coordinates: [number, number]) => {
    setCenterCoordinates(coordinates);
  };

  return (
    <>
      <MapViewFilters
        filterParams={filterParams}
        onFilterChange={onFilterChange}
        isLoading={isLoading}
        onToggleAdvancedFilters={onToggleAdvancedFilters}
        onToggleLayersPanel={onToggleLayersPanel}
        places={places}
        stations={stations}
        onSearchItemSelected={handleSearchItemSelected}
      />
      <MapAdvancedFilters
        filterParams={filterParams}
        onFilterChange={onFilterChange}
        places={places}
        stations={stations}
        isVisible={showAdvancedFilters}
        onToggleAdvancedFilters={onToggleAdvancedFilters}
      />

      <MapActiveFilters
        filterParams={filterParams}
        onFilterChange={onFilterChange}
      />
      <MapView
        places={places}
        stations={stations}
        isLoading={isLoading}
        onStationClick={onStationClick}
        onPlaceClick={onPlaceClick}
        centerToCoordinates={centerCoordinates}
      />
      {selectedStation && (
        <MapStationDrawer
          station={selectedStation}
          isOpen={isDrawerOpen}
          onClose={onCloseDrawer}
        />
      )}
    </>
  );
}
