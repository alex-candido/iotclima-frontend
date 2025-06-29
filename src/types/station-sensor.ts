// src/types/station_sensor.d.ts

export type StationSensor = {
  id: number;
  uuid: string;

  station: number;
  station_id: number;
  station_uuid: string;
  station_name: string;
  station_model: string;

  sensor: number;
  sensor_id: number;
  sensor_uuid: string;
  sensor_model: string;
  sensor_type_display: string;
  sensor_unit_display: string;
  sensor_status_display: string;

  position: string | null;
  installed_date: string | null;
  removed_date: string | null; 
  is_active: boolean;
  calibrated_at: string | null;

  created_at: string;
  updated_at: string;
};

export type StationSensorListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: StationSensor[];
};