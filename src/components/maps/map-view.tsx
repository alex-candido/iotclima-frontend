"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/leaflet/leaflet-map").then((mod) => mod.LeafletMap),{ssr: false});

export function MapView() {
  return (
    <div className="map-view w-full h-screen">
      <LeafletMap />
    </div>
  );
}