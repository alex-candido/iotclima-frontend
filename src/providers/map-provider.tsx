// src/providers/map-provider.tsx
"use client";

import { useReverseGeocoding } from "@/hooks/use-geocoding";
import { useLocationService } from "@/hooks/use-location";
import { useOpenMeteoForecast } from "@/hooks/use-open-meteo";
import { useStations } from "@/hooks/use-stations";
import { weatherCodeToFilterId } from "@/lib/utils";
import { ReverseGeocodingResponse } from "@/store/actions/geocoding-actions";
import { OpenMeteoForecastResponse } from "@/store/actions/open-meteo-actions";
import { Station } from "@/types/station";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface SearchItem {
  id: string | number;
  name: string;
  description: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface MapContextType {
  isSidebarExpanded: boolean;
  activeAsidePanel: string | null;
  sidebarWidth: number;
  asideWidth: number;
  isSearchCollapseOpen: boolean;
  hasSearchResults: boolean;
  searchQuery: string;
  selectedSearchItem: SearchItem | null;
  isSelectingItem: boolean;
  toggleSidebar: () => void;
  toggleAsidePanel: (panelId: string) => void;
  closeAsidePanel: () => void;
  toggleSearchCollapse: () => void;
  setHasSearchResults: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedItemForSearch: (item: SearchItem) => void;
  setSelectedSearchItem: (item: SearchItem | null) => void;
  isFilterPanelOpen: boolean;
  mapRefreshKey: number;
  activeMapLayerUrl: string;
  activeWeatherFilter: string;
  toggleFilterPanel: () => void;
  triggerMapRefresh: () => void;
  setActiveMapLayerUrl: (url: string) => void;
  setActiveWeatherFilter: (filter: string) => void;
  mapInstance: L.Map | null;
  setMapInstance: (map: L.Map) => void;
  currentLocation: Location | null;
  weatherData: OpenMeteoForecastResponse | null | undefined;
  currentAddress: ReverseGeocodingResponse | null | undefined;
  allStations: Station[] | null;
  filteredStations: Station[] | null;
  animateWeatherCard: boolean;
  setAnimateWeatherCard: (value: boolean) => void;
  filterCounts: Record<string, number>;
  flyToCoordinates: Location | null;
  setFlyToCoordinates: (coordinates: Location | null) => void;
  locationError: GeolocationPositionError | string | null;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeAsidePanel, setActiveAsidePanel] = useState<string | null>(null);
  const [isSearchCollapseOpen, setIsSearchCollapseOpen] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchItem, setSelectedSearchItem] = useState<SearchItem | null>(
    null
  );
  const [isSelectingItem, setIsSelectingItem] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [mapRefreshKey, setMapRefreshKey] = useState(0);
  const [activeMapLayerUrl, setActiveMapLayerUrl] = useState(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  );
  const [activeWeatherFilter, setActiveWeatherFilter] = useState("all");
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [animateWeatherCard, setAnimateWeatherCard] = useState(false);
  const [flyToCoordinates, setFlyToCoordinates] = useState<Location | null>(null);

  const { location, error: locationError } = useLocationService();
  const { data: stationsData } = useStations();
  const allStations = stationsData?.results || [];

  const { data: weatherData, error: weatherError } = useOpenMeteoForecast(
    currentLocation?.latitude,
    currentLocation?.longitude,
    { current_weather: true }
  );
  const { data: currentAddress, error: geocodingError } = useReverseGeocoding(
    currentLocation?.latitude, currentLocation?.longitude
  );

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allStations.length,
      sunny: 0,
      cloudy: 0,
      rainy: 0,
      windy: 0,
      stormy: 0,
      foggy: 0,
      snowy: 0,
    };
    
    allStations.forEach(station => {
      const latestRecord = station.records && station.records.length > 0
        ? station.records.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
        : null;
      
      if (latestRecord && latestRecord.weather_code !== undefined) {
        if (weatherCodeToFilterId.sunny.includes(latestRecord.weather_code)) counts.sunny++;
        if (weatherCodeToFilterId.cloudy.includes(latestRecord.weather_code)) counts.cloudy++;
        if (weatherCodeToFilterId.rainy.includes(latestRecord.weather_code)) counts.rainy++;
        if (weatherCodeToFilterId.windy.includes(latestRecord.weather_code)) counts.windy++;
        if (weatherCodeToFilterId.stormy.includes(latestRecord.weather_code)) counts.stormy++;
        if (weatherCodeToFilterId.foggy.includes(latestRecord.weather_code)) counts.foggy++;
        if (weatherCodeToFilterId.snowy.includes(latestRecord.weather_code)) counts.snowy++;
      }
    });

    return counts;
  }, [allStations]);

  const filteredStations = useMemo(() => {
    let results = allStations || [];

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      return results.filter(station =>
        station.name.toLowerCase().includes(lowercasedQuery) ||
        (station.description && station.description.toLowerCase().includes(lowercasedQuery)) ||
        (station.place?.info?.city && station.place.info.city.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    if (activeWeatherFilter !== 'all' && weatherCodeToFilterId[activeWeatherFilter]) {
      const allowedCodes = weatherCodeToFilterId[activeWeatherFilter];
      return results.filter(station => {
        const latestRecord = station.records?.[0];
        return latestRecord && allowedCodes.includes(latestRecord.weather_code);
      });
    }

    return results;

  }, [allStations, activeWeatherFilter, searchQuery]);


  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
    // AQUI ESTÁ A CORREÇÃO FINAL:
    if (locationError) {
      if (
        (locationError instanceof GeolocationPositionError &&
          locationError.code === GeolocationPositionError.PERMISSION_DENIED) ||
        locationError === "User denied Geolocation"
      ) {
        console.warn("Geolocation permission denied by the user.");
      } else {
        console.error("Error getting location:", locationError);
      }
    }
    if (weatherError) {
      console.error(weatherError);
    }
    if (geocodingError) {
      console.error(geocodingError);
    }
  }, [location, locationError, weatherError, geocodingError]);

  const sidebarWidth = useMemo(
    () => (isSidebarExpanded ? 256 : 64),
    [isSidebarExpanded]
  );
  const asideWidth = useMemo(
    () => (activeAsidePanel ? 384 : 0),
    [activeAsidePanel]
  );

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  const toggleAsidePanel = (panelId: string) => {
    setActiveAsidePanel((currentPanel) =>
      currentPanel === panelId ? null : panelId
    );
  };

  const closeAsidePanel = () => {
    setActiveAsidePanel(null);
  };

  const toggleSearchCollapse = () => {
    setIsSearchCollapseOpen((prev) => !prev);
  };

  const setSearchQueryAndFlag = (query: string) => {
    setSearchQuery(query);
    if (isSelectingItem) {
      setIsSelectingItem(false);
    }
  };

  const setSelectedItemForSearch = (item: SearchItem) => {
    setIsSelectingItem(true);
    setSearchQuery(item.name || "");
    setSelectedSearchItem(item);
    setIsSearchCollapseOpen(true);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  const triggerMapRefresh = () => {
    setMapRefreshKey((prev) => prev + 1);
  };

  const value = {
    isSidebarExpanded,
    activeAsidePanel,
    sidebarWidth,
    asideWidth,
    isSearchCollapseOpen,
    hasSearchResults,
    searchQuery,
    selectedSearchItem,
    isSelectingItem,
    isFilterPanelOpen,
    mapRefreshKey,
    activeMapLayerUrl,
    activeWeatherFilter,
    currentLocation,
    weatherData,
    currentAddress,
    toggleSidebar,
    toggleAsidePanel,
    closeAsidePanel,
    toggleSearchCollapse,
    setHasSearchResults,
    setSearchQuery: setSearchQueryAndFlag,
    setSelectedItemForSearch,
    setSelectedSearchItem,
    toggleFilterPanel,
    triggerMapRefresh,
    setActiveMapLayerUrl,
    setActiveWeatherFilter,
    mapInstance,
    setMapInstance,
    allStations,
    filteredStations,
    animateWeatherCard,
    setAnimateWeatherCard,
    filterCounts,
    flyToCoordinates,
    setFlyToCoordinates,
    locationError,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}