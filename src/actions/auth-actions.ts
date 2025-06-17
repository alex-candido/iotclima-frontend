// src/actions/auth-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';

export type UserCredentials = {
  email?: string;
  username?: string;
  password: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type UserProfile = {
  id: number;
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  group_names: string[];
};

export type AuthResponse = AuthTokens & { user: UserProfile };

export type SignUpData = {
  username?: string;
  email: string;
  password: string; 
  password2: string; 
};

export async function login(credentials: UserCredentials): Promise<AuthResponse> {
  const payload = credentials.email ?
    { email: credentials.email, password: credentials.password } :
    { username: credentials.username, password: credentials.password };

  const response = await api.post<AuthResponse>('/auth/login/', payload, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function signup(userData: SignUpData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/registration/', {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    password2: userData.password2,
  }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function requestPasswordReset(email: string): Promise<void> {
  await api.post('/auth/password/reset/', { email }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function confirmPasswordReset(data: { token: string; uid: string; new_password1: string; new_password2: string }): Promise<void> {
  await api.post('/auth/password/reset/confirm/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function changePassword(data: { old_password: string; new_password1: string; new_password2: string }): Promise<void> {
  await api.post('/auth/password/change/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>('/auth/user/', {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
  const response = await api.put<UserProfile>('/auth/user/', profileData, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post('/auth/logout/', { refresh: refreshToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
  const response = await api.post<{ access: string }>('/auth/token/refresh/', { refresh: refreshToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function verifyAccessToken(accessToken: string): Promise<void> {
  await api.post('/auth/token/verify/', { token: accessToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}