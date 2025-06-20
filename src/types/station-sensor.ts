// src/types/station_sensor.d.ts

export enum SensorType {
  TEMPERATURE = 1, HUMIDITY = 2, WIND = 3, PRESSURE = 4, RAINFALL = 5, OTHER = 6,
}
export enum SensorStatus {
  ACTIVE = 1, INACTIVE = 0, ERROR = 2,
}
export enum UnitType {
  CELSIUS = 1, FAHRENHEIT = 2, PERCENT = 3, METERS_PER_SECOND = 4,
  KILOMETERS_PER_HOUR = 5, HECTOPASCAL = 6, MILLIMETERS = 7, OTHER = 8,
}
export enum StationStatus {
  ACTIVE = 1, INACTIVE = 0, ONLINE = 2, OFFLINE = 3, MAINTENANCE = 4,
}


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
  count: number;
  next: string | null;
  previous: string | null;
  results: StationSensor[];
};