// src/components/maps/search-box/search-collapse.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { CurrentLocationWeather } from "@/components/maps/search-box/current-location-weather";
import { SearchItemDetail } from "@/components/maps/search-box/search-item-detail";
import { SearchItemList } from "@/components/maps/search-box/search-item-list";
import { cn } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";
import { useEffect } from "react";

export function SearchCollapse() {
  const { isSearchCollapseOpen, hasSearchResults, searchQuery, selectedSearchItem, setSelectedSearchItem, isSelectingItem, setSelectedItemForSearch } = useMap();

  useEffect(() => {
    // Reset selectedItem when searchQuery changes, unless it's due to an item selection
    if (!isSelectingItem) {
      setSelectedSearchItem(null);
    }
  }, [searchQuery, setSelectedSearchItem, isSelectingItem]);

  interface SearchItem {
  id: number;
  name: string;
  description: string;
}

  const handleItemClick = (item: SearchItem) => {
    setSelectedItemForSearch(item);
  };

  const renderSearchItem = (item: SearchItem) => (
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );

  // Dummy data for demonstration
  const recentItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Recent Location ${i + 1}`,
    description: `Description for recent location ${i + 1}`,
  }));

  const searchResults = Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    name: `Search Result ${searchQuery || 'Default'} ${i + 1}`,
    description: `Description for search result ${searchQuery || 'Default'} ${i + 1}`,
  }));

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
          {hasSearchResults ? (
            <SearchItemList items={searchResults} renderItem={renderSearchItem} onItemClick={handleItemClick} className="flex-grow overflow-y-auto min-h-0" />
          ) : (
            <SearchItemList items={recentItems} renderItem={renderSearchItem} onItemClick={handleItemClick} className="flex-grow overflow-y-auto min-h-0" />
          )}
        </>
      )}
    </FloatingCard>
  );
}