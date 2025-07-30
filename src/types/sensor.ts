// src/types/sensor.ts

export enum SensorType {
  THERMOMETER = 1,
  HYGROMETER = 2,
  ANEMOMETER = 3,
  PLUVIOMETER = 4,
  SOLARIMETER = 5,
}

export enum UnitType {
  CELSIUS = 1,
  PERCENT = 3,
  METERS_PER_SECOND = 4,
  MILLIMETERS = 7,
  WATTS_PER_METER_SQUARED = 9,
}

export enum SensorStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export type SensorInfo = {
  min_value: number;
  max_value: number;
}

export type Sensor = {
  id: number;
  uuid: string;

  name: string;
  description: string;

  status: SensorStatus;
  info: SensorInfo;
  type: SensorType;
  unit: UnitType;

  created_at: string;
  updated_at: string;
}

export type SensorListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Sensor[];
};