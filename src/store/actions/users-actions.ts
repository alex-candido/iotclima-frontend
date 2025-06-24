import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/api";
import { User, UserListResponse } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ( params: { page?: number; page_size?: number; [key: string]: unknown },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get<UserListResponse>(API_ENDPOINTS.USERS.LIST,{ params },);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserCounts = createAsyncThunk(
  'users/fetchUserCounts',
  async (arg: { roleType: 'ADMIN' | 'OPERATOR' | 'VIEWER' | 'total', groupName?: string }, { rejectWithValue }) => {
    try {
      const params: { [key: string]: unknown } = { page_size: 1, count_only: true };

      if (arg.groupName) {
        params.group_name = arg.groupName;
      }
      
      const response = await api.get<UserListResponse>(API_ENDPOINTS.USERS.LIST, { params });
      return { roleType: arg.roleType, count: response.data.count }; 

    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: UserInput, { rejectWithValue }) => {
    try {
      const response = await api.post<User>(API_ENDPOINTS.USERS.CREATE, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get<User>(API_ENDPOINTS.USERS.DETAIL(id));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    params: { id: number; data: UserInput }, { rejectWithValue }) => {
    try {
      const response = await api.put<User>(API_ENDPOINTS.USERS.UPDATE(params.id), params.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const partialUpdateUser = createAsyncThunk(
  "users/partialUpdateExistingUser",
  async (params: { id: number; data: Partial<UserInput> }, { rejectWithValue },
  ) => {
    try {
      const response = await api.patch<User>(API_ENDPOINTS.USERS.PARTIAL_UPDATE(params.id), params.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(API_ENDPOINTS.USERS.DELETE(id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
