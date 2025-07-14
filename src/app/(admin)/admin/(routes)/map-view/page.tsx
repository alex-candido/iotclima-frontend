// src/app/(admin)/admin/(routes)/map-view/page.tsx
"use client";

import { MapActiveFilters } from "@/components/map-view/map-active-filters";
import { MapAdvancedFilters } from "@/components/map-view/map-advanced-filters";
import { MapView } from "@/components/map-view/map-view";
import { MapViewFilters } from "@/components/map-view/map-view-filters";
// import { MapStationDrawer } from "@/app/(admin)/admin/(routes)/map-view/_components/map-station-drawer";


export default function MapViewPage() {
  return (
    <div className="space-y-6">
      <MapViewFilters />
      <MapAdvancedFilters/>
      <MapActiveFilters/>
      <MapView/>
      {/* <MapStationDrawer
        station={selectedStation}
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
      /> */}
    </div>
  );
}