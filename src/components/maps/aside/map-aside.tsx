// src/components/maps/aside/map-aside.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { SearchItemList } from "@/components/maps/search-box/search-item-list";
import { Button } from "@/components/ui/button";
import { mockDashboardContent, mockRecentSearches, mockSavedLocations } from "@/data";
import { useMap } from "@/providers/map-provider";
import { X } from "lucide-react";

export function MapAside() {
  const { activeAsidePanel, closeAsidePanel, sidebarWidth, setSelectedItemForSearch } = useMap();

  const renderItem = (item: any) => (
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );

  const handleItemClick = (item: any) => {
    setSelectedItemForSearch(item);
    closeAsidePanel(); // Close aside panel after selecting an item
  };

  const panelContent = {
    dashboard: { title: "Dashboard", content: mockDashboardContent },
    saved: { title: "Locais Salvos", content: <SearchItemList items={mockSavedLocations} renderItem={renderItem} onItemClick={handleItemClick} className="flex-grow overflow-y-auto" /> },
    recent: { title: "Pesquisas Recentes", content: <SearchItemList items={mockRecentSearches} renderItem={renderItem} onItemClick={handleItemClick} className="flex-grow overflow-y-auto" /> },
  };

  const currentContent = activeAsidePanel ? panelContent[activeAsidePanel as keyof typeof panelContent] : null;

  return (
    <FloatingCard
      className={`map-aside absolute top-4 z-20 max-h-[calc(100vh-2rem)] w-96 transition-transform duration-300 ease-in-out flex flex-col`}
      style={{
        transform: activeAsidePanel ? `translateX(${sidebarWidth + 16}px)` : `translateX(-120%)`,
      }}
    >
      {currentContent && (
        <>
          <div className="map-aside-header flex items-center justify-between p-3 px-4 border-b">
            <h2 className="text-lg font-semibold">{currentContent.title}</h2>
            <Button variant="ghost" size="icon" onClick={closeAsidePanel}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="map-aside-content p-4 flex-grow flex flex-col min-h-0">
            {typeof currentContent.content === 'string' ? (
              <p>{currentContent.content}</p>
            ) : (
              currentContent.content
            )}
          </div>
        </>
      )}
    </FloatingCard>
  );
}