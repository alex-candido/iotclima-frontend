// src/providers/map-provider.tsx
"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface MapContextType {
  isSidebarExpanded: boolean;
  activeAsidePanel: string | null;
  sidebarWidth: number;
  asideWidth: number;
  isSearchCollapseOpen: boolean;
  hasSearchResults: boolean;
  searchQuery: string;
  selectedSearchItem: any | null;
  isSelectingItem: boolean; 
  toggleSidebar: () => void;
  toggleAsidePanel: (panelId: string) => void;
  closeAsidePanel: () => void;
  toggleSearchCollapse: () => void;
  setHasSearchResults: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedItemForSearch: (item: any) => void;
  setSelectedSearchItem: (item: any | null) => void;
  isFilterPanelOpen: boolean;
  mapRefreshKey: number;
  activeMapLayerUrl: string; // New state for active map layer URL
  toggleFilterPanel: () => void;
  triggerMapRefresh: () => void;
  setActiveMapLayerUrl: (url: string) => void; // New function to set active map layer URL
  mapInstance: L.Map | null;
  setMapInstance: (map: L.Map) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeAsidePanel, setActiveAsidePanel] = useState<string | null>(null);
  const [isSearchCollapseOpen, setIsSearchCollapseOpen] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchItem, setSelectedSearchItem] = useState<any | null>(null);
  const [isSelectingItem, setIsSelectingItem] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [mapRefreshKey, setMapRefreshKey] = useState(0);
  const [activeMapLayerUrl, setActiveMapLayerUrl] = useState("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"); // Initialize with default layer
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

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

  const setSelectedItemForSearch = (item: any) => {
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
    activeMapLayerUrl, // Expose new state
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
    setActiveMapLayerUrl, // Expose new function
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
