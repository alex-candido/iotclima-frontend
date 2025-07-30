// src/providers/map-provider.tsx

"use client";

import { useReverseGeocoding } from "@/hooks/use-geocoding";
import useLocationService from "@/hooks/use-location";
import { useOpenMeteoForecast } from "@/hooks/use-open-meteo";
import { ReverseGeocodingResponse } from "@/store/actions/geocoding-actions";
import { OpenMeteoForecastResponse } from "@/store/actions/open-meteo-actions";
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

  const { location, error: locationError } = useLocationService();
  const { data: weatherData, error: weatherError } = useOpenMeteoForecast(
    currentLocation?.latitude,
    currentLocation?.longitude,
    { current_weather: true }
  );
  const { data: currentAddress, error: geocodingError } = useReverseGeocoding(
    currentLocation?.latitude,
    currentLocation?.longitude
  );

  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
    if (locationError) {
      if (locationError instanceof GeolocationPositionError && locationError.code === GeolocationPositionError.PERMISSION_DENIED) {
        console.warn("Geolocation permission denied by the user.");
      } else {
        console.error(locationError);
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
