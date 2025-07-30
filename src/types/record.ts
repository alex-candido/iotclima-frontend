// src/types/record.ts

import { SensorType, UnitType } from "./sensor";

export enum RecordStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export type SensorRecord = {
  sensor_type: SensorType;
  value: number | string;
  unit: UnitType;
};

export interface Record {
  id: number;
  uuid: string;

  sensors: SensorRecord[];

  created_at: string;
  updated_at: string;
}

export type RecordListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Record[];
};