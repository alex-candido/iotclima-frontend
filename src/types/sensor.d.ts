// src/types/sensor.d.ts

export enum SensorType {
  TEMPERATURE = 1,
  HUMIDITY = 2,
  WIND = 3,
  PRESSURE = 4,
  RAINFALL = 5,
  OTHER = 6,
}

export enum SensorStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  ERROR = 2,
}

export enum UnitType {
  CELSIUS = 1,
  FAHRENHEIT = 2,
  PERCENT = 3,
  METERS_PER_SECOND = 4,
  KILOMETERS_PER_HOUR = 5,
  HECTOPASCAL = 6,
  MILLIMETERS = 7,
  OTHER = 8,
}

export type Sensor = {
  id: number;
  uuid: string;
  type: SensorType;
  type_display: string;
  model: string;
  unit: UnitType;
  unit_display: string;
  min_value: number;
  max_value: number;
  status: SensorStatus;
  status_display: string;

  user: number | null;
  user_username: string | null;
  user_email: string | null;

  created_at: string;
  updated_at: string;
};

export type SensorListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sensor[];
};