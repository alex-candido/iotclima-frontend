// src/types/app-event.d.ts

export enum AppEventType {
  ALERT = 1,
  WARNING = 2,
  INFO = 3,
  ERROR = 4,
}

export enum AppEventCategory {
  WEATHER = 1,
  SENSOR = 2,
  SYSTEM = 3,
  MAINTENANCE = 4,
}

export enum AppEventSeverity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export enum AppEventStatus {
  OPEN = 1,
  ACKNOWLEDGED = 2,
  RESOLVED = 3,
}

export type AppEvent = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  occurred_at: string;
  resolved_at: string | null;

  type: AppEventType;
  type_display: string;
  category: AppEventCategory;
  category_display: string;
  severity: AppEventSeverity;
  severity_display: string;
  status: AppEventStatus;
  status_display: string;

  user: number | null;
  user_username: string | null;

  station_sensor: number | null;
  station_name: string | null;
  station_model: string | null;
  sensor_model: string | null;
  sensor_type_display: string | null;

  created_at: string;
  updated_at: string;
};

export type AppEventListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AppEvent[];
};
