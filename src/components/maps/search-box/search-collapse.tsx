// src/components/maps/search-box/search-collapse.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { CurrentLocationWeather } from "@/components/maps/search-box/current-location-weather";
import { SearchItemDetail } from "@/components/maps/search-box/search-item-detail";
import { SearchItemList } from "@/components/maps/search-box/search-item-list";
import { cn, stationToWeatherCardData } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";
import { Station } from "@/types/station";
import { useEffect } from "react";

export function SearchCollapse() {
  const { 
    isSearchCollapseOpen, 
    searchQuery, 
    selectedSearchItem, 
    setSelectedSearchItem, 
    isSelectingItem, 
    setSelectedItemForSearch,
    filteredStations,
  } = useMap();
  
  useEffect(() => {
    if (!isSelectingItem) {
      setSelectedSearchItem(null);
    }
  }, [searchQuery, setSelectedSearchItem, isSelectingItem]);

  const handleItemClick = (item: Station) => {
    setSelectedItemForSearch(item);
  };

  // Melhoria na função de renderização do item
  const renderSearchItem = (item: Station) => {
    const weatherCardData = stationToWeatherCardData(item);
    return (
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-3xl leading-none">{weatherCardData.mainWeatherIcon}</div>
        <div>
          <h4 className="font-semibold text-base">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{weatherCardData.mainWeatherDescription}</p>
        </div>
      </div>
    );
  };

  const hasSearchResults = filteredStations && filteredStations.length > 0;

  return (
    <FloatingCard className={cn(
      "search-collapse max-h-[calc(100vh-100px)] absolute top-full left-0 right-0 mt-2 z-20 flex flex-col",
      !isSearchCollapseOpen && "hidden"
    )}>
      {selectedSearchItem ? (
        <SearchItemDetail item={selectedSearchItem} />
      ) : (
        <div className="p-4">
          <CurrentLocationWeather />
          <div className="mt-4">
            {!hasSearchResults && (
              <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
            )}
            {hasSearchResults && (
              <SearchItemList 
                items={filteredStations} 
                renderItem={renderSearchItem} 
                onItemClick={handleItemClick} 
                className="flex-grow overflow-y-auto min-h-0" 
              />
            )}
          </div>
        </div>
      )}
    </FloatingCard>
  );
}