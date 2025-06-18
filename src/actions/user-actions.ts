// src/actions/user-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { User, UserListResponse } from '@/types/user';

export type UserInput = {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  password?: string;
};

export async function getUsers(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<UserListResponse> {
  const response = await api.get<UserListResponse>(API_ENDPOINTS.USERS.LIST, { params });
  return response.data;
}

export async function createUser(data: UserInput): Promise<User> {
  const response = await api.post<User>(API_ENDPOINTS.USERS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await api.get<User>(API_ENDPOINTS.USERS.DETAIL(id));
  return response.data;
}

export async function updateUser(id: number, data: UserInput): Promise<User> {
  const response = await api.put<User>(API_ENDPOINTS.USERS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateUser(id: number, data: Partial<UserInput>): Promise<User> {
  const response = await api.patch<User>(API_ENDPOINTS.USERS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.USERS.DELETE(id));
  return;
}
