// src/app/(maps)/maps/(routes)/page.tsx
"use client";

import { ActionTriggers } from "@/components/maps/actions/action-triggers";
import { FilterSidebarTrigger } from "@/components/maps/actions/filter-sidebar-trigger";
import { RefreshMapButton } from "@/components/maps/actions/refresh-map-button";
import { MapAside } from "@/components/maps/aside/map-aside";
import { FloatingFilterPanel } from "@/components/maps/filter/floating-filter-panel";
import { WeatherFilterTabs } from "@/components/maps/filter/weather-filter-tabs";
import { MapView } from "@/components/maps/map-view/map-view";
import { SearchBox } from "@/components/maps/search-box/search-box";
import { MapSidebar } from "@/components/maps/sidebar/map-sidebar";
import { TopBar } from "@/components/maps/topbar/top-bar";

export default function Page() {
  return (
    <div className="page-maps">
      <MapView />
      <MapSidebar />
      <MapAside />
      <TopBar>
          <SearchBox />  
          <WeatherFilterTabs />                                                         
        <ActionTriggers>
          <RefreshMapButton />
          <FilterSidebarTrigger />
        </ActionTriggers> 
      </TopBar>
      <FloatingFilterPanel />
    </div>
  );
}
