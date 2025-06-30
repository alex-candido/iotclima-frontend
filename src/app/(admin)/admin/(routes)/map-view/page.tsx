// src/app/(admin)/admin/(routes)/map-view/page.tsx
"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { MapViewSection } from "@/components/pages/admin/map-view/map-view-section";
import { APP_TEXT } from "@/data/ui-content";
import { usePlaces } from "@/hooks/use-places";
import { useStations } from "@/hooks/use-stations";
import {
  PlaceFilterFormData
} from "@/schemas/place-schema";
import {
  StationFilterFormData
} from "@/schemas/station-schema";
import { Place } from "@/types/place";
import { Station } from "@/types/station";

import { MapFilterParams } from "@/types/map";

export default function MapViewPage() {
  const [filterParams, setFilterParams] = useState<MapFilterParams>({
    search_term: "",
    showPlaces: true,
    showStations: true,
    place_status: "all",
    place_type: "all",
    station_status: "all",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleAdvancedFilters = () => {
    setShowAdvancedFilters((prev) => !prev);
  };

  const handleToggleLayersPanel = () => {
    setShowLayersPanel((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedStation(null);
  };

  const apiPlaceQueryParams: Partial<PlaceFilterFormData> = {
    page_size: 9999,
  };
  if (filterParams.search_term) {
    apiPlaceQueryParams.search_term = filterParams.search_term;
  }
  if (filterParams.place_status && filterParams.place_status !== "all") {
    apiPlaceQueryParams.status = filterParams.place_status;
  }
  if (filterParams.place_type && filterParams.place_type !== "all") {
    apiPlaceQueryParams.type = filterParams.place_type;
  }

  const apiStationQueryParams: Partial<StationFilterFormData> = {
    page_size: 9999,
  };
  if (filterParams.search_term) {
    apiStationQueryParams.search_term = filterParams.search_term;
  }
  if (filterParams.station_status && filterParams.station_status !== "all") {
    apiStationQueryParams.status = filterParams.station_status;
  }

  const {
    data: placesData,
    isLoading: isLoadingPlaces,
    error: placesError,
  } = usePlaces(apiPlaceQueryParams);
  const places: Place[] = placesData?.results?.features || [];

  const {
    data: stationsData,
    isLoading: isLoadingStations,
    error: stationsError,
  } = useStations(apiStationQueryParams);
  const stations: Station[] = stationsData?.results || [];

  const handleFilterChange = (newFilters: Partial<MapFilterParams>) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
    }));
  };

  const handleStationClick = (station: Station) => {
    console.log("MapViewPage: Station clicked from page:", station);
    setSelectedStation(station);
    setIsDrawerOpen(true);
  };

  const handlePlaceClick = (place: Place) => {
    console.log("Place clicked from page:", place);
  };

  const overallLoading = isLoadingPlaces || isLoadingStations;
  const overallError = placesError || stationsError;

  // if (overallLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //       <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
  //     </div>
  //   );
  // }

  if (overallError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">{APP_TEXT.COMMON_UI.ERROR_LOADING_DATA}</span>
        <p className="text-sm">
          {overallError.message || String(overallError)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MapViewSection
        places={filterParams.showPlaces ? places : []}
        stations={filterParams.showStations ? stations : []}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        isLoading={overallLoading}
        onStationClick={handleStationClick}
        onPlaceClick={handlePlaceClick}
        showAdvancedFilters={showAdvancedFilters}
        onToggleAdvancedFilters={handleToggleAdvancedFilters}
        showLayersPanel={showLayersPanel}
        onToggleLayersPanel={handleToggleLayersPanel}
        selectedStation={selectedStation}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
      />
    </div>
  );
}