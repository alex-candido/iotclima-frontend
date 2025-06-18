// src/types/user.d.ts

export type User = {
  id: number;
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  group_names: string[];
};

export type UserListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};