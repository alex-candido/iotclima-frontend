// src/types/place.ts

export enum PlaceStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export interface PlaceInfo {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface Place {
  id: number;
  uuid: string;

  name: string;
  description: string;

  info: PlaceInfo;
  geometry: GeoPoint;
  status: PlaceStatus;

  latitude: number;
  longitude: number;

  created_at: string;
  updated_at: string;
}

export type PlaceListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Place[];
};
