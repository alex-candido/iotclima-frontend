// src/types/record.d.ts

export enum RecordStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export type Record = {
  id: number;
  uuid: string;
  recorded_at: string;
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  wind_direction: number | null;
  pressure: number | null;
  rainfall: number | null;

  status: RecordStatus;
  status_display: string;

  station: number;
  station_name: string;
  station_model: string;
  station_firmware: string | null;
  station_status_display: string;

  created_at: string;
  updated_at: string;
};

export type RecordListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Record[];
};