// src/types/log.d.ts

export enum LogSeverity {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export type LogMetadata = {
  [key: string]: any;
};

export type Log = {
  id: number;
  uuid: string;
  message: string;

  level: LogSeverity;
  level_display: string;

  metadata: LogMetadata | null;

  user: number | null;
  user_username: string | null;

  station: number | null;
  station_name: string | null;

  created_at: string;
  updated_at: string;
};

export type LogListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Log[];
};