// src/types/user.ts

export enum UserRole {
  ADMIN = 1,
  OPERATOR = 2,
  VIEWER = 3,
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export interface User {
  id: number;
  uuid: string;

  first_name: string;
  last_name: string;
  email: string;

  role: UserRole;
  status: UserStatus;

  created_at: string;
  updated_at: string;
}

export type UserListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};