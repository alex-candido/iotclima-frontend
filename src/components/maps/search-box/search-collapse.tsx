// src/components/maps/search-box/search-collapse.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { CurrentLocationWeather } from "@/components/maps/search-box/current-location-weather";
import { SearchItemDetail } from "@/components/maps/search-box/search-item-detail";
import { SearchItemList } from "@/components/maps/search-box/search-item-list";
import { useStations } from "@/hooks/use-stations";
import { cn } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";
import { Station } from "@/types/station";
import { useEffect } from "react";

export function SearchCollapse() {
  const { isSearchCollapseOpen, searchQuery, selectedSearchItem, setSelectedSearchItem, isSelectingItem, setSelectedItemForSearch } = useMap();
  const { data: stationsData, isLoading, isError } = useStations({
    query: searchQuery,
  });

  useEffect(() => {
    if (!isSelectingItem) {
      setSelectedSearchItem(null);
    }
  }, [searchQuery, setSelectedSearchItem, isSelectingItem]);

  const handleItemClick = (item: Station) => {
    setSelectedItemForSearch(item);
  };

  const renderSearchItem = (item: Station) => (
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );

  const searchResults = stationsData?.results || [];
  const hasSearchResults = searchResults.length > 0;

  return (
    <FloatingCard className={cn(
      "search-collapse absolute top-full left-0 right-0 mt-2 p-4 z-20 flex flex-col max-h-[400px]",
      !isSearchCollapseOpen && "hidden"
    )}>
      {selectedSearchItem ? (
        <SearchItemDetail item={selectedSearchItem} />
      ) : (
        <>
          <CurrentLocationWeather />
          {isLoading && <div>Carregando resultados...</div>}
          {isError && <div>Erro ao carregar resultados.</div>}
          {!isLoading && !isError && hasSearchResults ? (
            <SearchItemList items={searchResults} renderItem={renderSearchItem} onItemClick={handleItemClick} className="flex-grow overflow-y-auto min-h-0" />
          ) : (
            !isLoading && !isError && <div>Nenhum resultado encontrado.</div>
          )}
        </>
      )}
    </FloatingCard>
  );
}