import { UserFilterFormData } from "@/schemas/user-schema";
import { createUser, deleteUser, fetchUserById, fetchUserCounts, fetchUsers, partialUpdateUser, updateUser } from '@/store/actions/users-actions';
import { User, UserListResponse } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UsersState {
  users: User[];
  totalUsersCount: number;
  adminUsersCount: number;
  operatorUsersCount: number;
  viewerUsersCount: number;
  isLoading: boolean;
  error: string | null;
  filterParams: UserFilterFormData;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  currentEditingUser: User | null;
}

const initialState: UsersState = {
  users: [],
  totalUsersCount: 0,
  adminUsersCount: 0,
  operatorUsersCount: 0,
  viewerUsersCount: 0,
  isLoading: false,
  error: null,
  filterParams: {
    page: 1,
    page_size: 10,
    searchTerm: "",
    role: "all",
  },
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  currentEditingUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilterParams: (
      state,
      action: PayloadAction<Partial<UserFilterFormData>>,
    ) => {
      state.filterParams = { ...state.filterParams, ...action.payload };
      if (
        action.payload.searchTerm !== undefined ||
        action.payload.role !== undefined
      ) {
        state.filterParams.page = 1;
      }
    },
    setUsersData: (state, action: PayloadAction<UserListResponse>) => {
      state.users = action.payload.results;
      state.totalUsersCount = action.payload.count;
    },
    setSpecificUserCount: (
      state,
      action: PayloadAction<{
        type: "admin" | "operator" | "viewer" | "total";
        count: number;
      }>,
    ) => {
      if (action.payload.type === "admin") {
        state.adminUsersCount = action.payload.count;
      } else if (action.payload.type === "operator") {
        state.operatorUsersCount = action.payload.count;
      } else if (action.payload.type === "viewer") {
        state.viewerUsersCount = action.payload.count;
      } else if (action.payload.type === "total") {
        state.totalUsersCount = action.payload.count;
      }
    },
    setCurrentEditingUser: (state, action: PayloadAction<User | null>) => {
      state.currentEditingUser = action.payload;
    },
  },
 extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.results;
        state.totalUsersCount = action.payload.count;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
    // fetchUserCounts 
    builder
      .addCase(fetchUserCounts.fulfilled, (state, action) => {
        const { roleType, count } = action.payload;
        console.log(action.payload)
        if (roleType === 'ADMIN') {
          state.adminUsersCount = count;
        } else if (roleType === 'OPERATOR') {
          state.operatorUsersCount = count;
        } else if (roleType === 'VIEWER') {
          state.viewerUsersCount = count;
        }
      });
    // createUser
    builder
      .addCase(createUser.pending, (state) => { state.isCreating = true; state.error = null; })
      .addCase(createUser.fulfilled, (state, action) => { 
        state.isCreating = false; 
      })
      .addCase(createUser.rejected, (state, action) => { 
        state.isCreating = false; 
        state.error = action.error.message || 'Failed to create user'; 
      });
    // updateUser & partialUpdateUser
    builder
      .addCase(updateUser.pending, (state) => { state.isUpdating = true; state.error = null; })
      .addCase(partialUpdateUser.pending, (state) => { state.isUpdating = true; state.error = null; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(partialUpdateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => { state.isUpdating = false; state.error = action.error.message || 'Failed to update user'; })
      .addCase(partialUpdateUser.rejected, (state, action) => { state.isUpdating = false; state.error = action.error.message || 'Failed to update user'; });
    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => { state.isDeleting = true; state.error = null; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error.message || 'Failed to delete user';
      });
    // fetchUserById
    builder
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentEditingUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        console.error('Failed to fetch specific user:', action.error);
        state.currentEditingUser = null; 
      });
  },
});

export const {
  setFilterParams,
  setUsersData,
  setSpecificUserCount,
  setCurrentEditingUser,
} = usersSlice.actions;
export default usersSlice.reducer;
