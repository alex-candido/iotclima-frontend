// src/app/(admin)/admin/(routes)/users/page.tsx
"use client";

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UsersHeaderSection } from "@/components/pages/admin/users/users-header-section";
import { UsersStatsSection } from "@/components/pages/admin/users/users-stats-section";

import { fetchUserCounts, fetchUsers } from "@/store/actions/users-actions";
import { setFilterParams } from "@/store/slices/users-slice";

import { AppDispatch, RootState } from "@/store";

import { UsersListSection } from "@/components/pages/admin/users/users-list-section";
import { APP_TEXT } from "@/data/ui-content";
import { UserRoleEnum } from "@/schemas/user-schema";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function UsersPage() {
  const dispatch: AppDispatch = useDispatch();

  const {
    users,
    totalUsersCount,
    adminUsersCount,
    operatorUsersCount,
    viewerUsersCount,
    isLoading,
    error,
    filterParams,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(filterParams));
  }, [dispatch, filterParams]);

  useEffect(() => {
    dispatch(
      fetchUserCounts({
        roleType: "ADMIN",
        groupName: UserRoleEnum.Enum.ADMIN,
      }),
    );
    dispatch(
      fetchUserCounts({
        roleType: "OPERATOR",
        groupName: UserRoleEnum.Enum.OPERATOR,
      }),
    );
    dispatch(
      fetchUserCounts({
        roleType: "VIEWER",
        groupName: UserRoleEnum.Enum.VIEWER,
      }),
    );
  }, [dispatch]);

  const handleFilterChange = (newFilters: Partial<typeof filterParams>) => {
    dispatch(setFilterParams(newFilters));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setFilterParams({ page: newPage }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">{APP_TEXT.COMMON_UI.ERROR_LOADING_DATA}</span>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeaderSection />
      <UsersStatsSection
        totalUsers={totalUsersCount}
        adminUsers={adminUsersCount}
        operatorUsers={operatorUsersCount}
        viewerUsers={viewerUsersCount}
      />
      <UsersListSection
        users={users}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        pagination={{
          count: totalUsersCount,
          next: null,
          previous: null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
