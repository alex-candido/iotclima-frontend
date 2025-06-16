// src/types/station.d.ts

export enum StationStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  ONLINE = 2,
  OFFLINE = 3,
  MAINTENANCE = 4,
}

export type StationSensorLink = {
  uuid: string;
  sensor_id: number;
  sensor_uuid: string;
  sensor_model: string;
  sensor_type_display: string;
  sensor_unit_display: string;
  sensor_status_display: string;
  position: string | null;
  installed_date: string | null;
  calibrated_at: string | null;
  is_active: boolean;
  removed_date: string | null;
};

export type Station = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  model: string;
  firmware: string | null;
  installed_at: string | null;
  last_maintenance_at: string | null;
  next_maintenance_at: string | null;
  battery_level: number | null;
  signal_strength: number | null;

  status: StationStatus;
  status_display: string;

  place: number;
  place_name: string;
  place_city: string;

  user: number | null;
  user_username: string | null;
  user_email: string | null;

  sensors: StationSensorLink[];

  created_at: string;
  updated_at: string;
};

export type StationListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Station[];
};