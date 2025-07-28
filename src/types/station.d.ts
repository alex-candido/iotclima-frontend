// src/types/station.d.ts

export enum StationStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export interface StationInfo {
  model: string;
  firmware: string | null;
  installed_at: string | null;
}

export type Station = {
  id: number;
  uuid: string;

  name: string;
  description: string;

  status: StationStatus;
  info: StationInfo;
  place: Place;
  sensors?: Sensor[];
  records?: Record[];

  created_at: string;
  updated_at: string;
};

export type StationListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Station[];
};
