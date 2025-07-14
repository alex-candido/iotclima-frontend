// src/providers/map-provider.tsx

"use client";

import { useEvents } from "@/hooks/use-events";
import { usePlaces } from "@/hooks/use-places";
import { useRecords } from "@/hooks/use-records";
import { useStations } from "@/hooks/use-stations";
import { PlaceFilterFormData } from "@/schemas/place-schema";
import { StationFilterFormData } from "@/schemas/station-schema";
import { AppEvent } from "@/types/app-event";
import { MapFilterParams } from "@/types/map";
import { Place } from "@/types/place";
import { Record } from "@/types/record";
import { Station } from "@/types/station";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface MapContextType {
  places: Place[];
  stations: Station[];
  records: Record[];
  events: AppEvent[];
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
  error: Error | null;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
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

  const {
    data: stationsData,
    isLoading: isLoadingStations,
    error: stationsError,
  } = useStations(apiStationQueryParams);

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: EventsError,
  } = useEvents({
    station_id: selectedStation?.id,
  });

  const {
    data: recordsData,
    isLoading: isLoadingRecords,
    error: RecordsError,
  } = useRecords({
    station: selectedStation?.id,
  });

  const places: Place[] = placesData?.results?.features || [];
  const stations: Station[] = stationsData?.results || [];
  const records: Record[] = recordsData?.results || []
  const events: AppEvent[] = eventsData?.results || [];

  const handleFilterChange = useCallback(
    (newFilters: Partial<MapFilterParams>) => {
      setFilterParams((prevParams) => ({
        ...prevParams,
        ...newFilters,
      }));
    },
    [],
  );

  const handleStationClick = useCallback((station: Station) => {
    setSelectedStation(station);
    setIsDrawerOpen(true);
  }, []);

  const handleToggleAdvancedFilters = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  const handleToggleLayersPanel = useCallback(() => {
    setShowLayersPanel((prev) => !prev);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedStation(null);
  }, []);

  const overallLoading = isLoadingPlaces || isLoadingStations;
  const overallError = placesError || stationsError;

  const handlePlaceClick = useCallback((place: Place) => {
    console.log("Place clicked from page:", place);
  }, []);

  useEffect(() => {
    console.log(selectedStation);
  }, [selectedStation]);

  const contextValue: MapContextType = {
    places,
    stations,
    records,
    events,
    filterParams,
    selectedStation,
    showAdvancedFilters,
    showLayersPanel,
    isDrawerOpen,
    isLoading: overallLoading,
    error: overallError,
    onFilterChange: handleFilterChange,
    onStationClick: handleStationClick,
    onPlaceClick: handlePlaceClick,
    onToggleAdvancedFilters: handleToggleAdvancedFilters,
    onToggleLayersPanel: handleToggleLayersPanel,
    onCloseDrawer: handleCloseDrawer,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}
