"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Place } from "@/types/place";
import { Station } from "@/types/station";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("@/components/map/leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
  },
);

import { useMapContext } from "@/providers/map-provider";
import { AppEvent } from "@/types/app-event";
import { Record } from "@/types/record";
import { useState } from "react";

interface MapViewProps {
  places: Place[];
  stations: Station[];
  isLoading: boolean;
  onStationClick: (station: Station) => void;
  onPlaceClick: (place: Place) => void;
  centerToCoordinates: [number, number] | null;
  records: Record[];
  events: AppEvent[];
}

export function MapView() {
  const {
    places,
    stations,
    isLoading,
    onStationClick,
    onPlaceClick,
    records,
    events,
  } = useMapContext();

  const [centerCoordinates, setCenterCoordinates] = useState<
    [number, number] | null
  >(null);

  const onlineStations = stations.filter(
    (s) => s.status_display === "Online",
  ).length;
  const offlineStations = stations.length - onlineStations;

  if (isLoading) {
    return (
      <Card className="h-[75vh] flex items-center justify-center">
        <p>Loading map data...</p>
      </Card>
    );
  }

  return (
    <Card className="h-[75vh]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Mapa Interativo</CardTitle>
            <CardDescription>
              {stations.length} estações e {places.length} locais exibidos
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Online ({onlineStations})
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Offline ({offlineStations})
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative h-[calc(100%-5rem)]">
        <LeafletMap
          places={places}
          stations={stations}
          onStationClick={onStationClick}
          onPlaceClick={onPlaceClick}
          centerToCoordinates={centerCoordinates}
          records={records}
          events={events}
        />
      </CardContent>
    </Card>
  );
}
