// src/types/map.ts

import { PlaceStatusData, PlaceTypeData } from "@/schemas/place-schema";
import { StationStatusData } from "@/schemas/station-schema";

export interface MapFilterParams {
  search_term?: string;
  showPlaces?: boolean;
  showStations?: boolean;
  place_status?: PlaceStatusData | "all";
  place_type?: PlaceTypeData | "all";
  station_status?: StationStatusData | "all";
  regions?: string[];
  sensorTypes?: string[];
  alertLevel?: string[];
  lastUpdate?: string;
  batteryLevel?: [number, number];
  temperature?: [number, number];
  humidity?: [number, number];
  windSpeed?: [number, number];
}
