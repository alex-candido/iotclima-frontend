// src/app/(admin)/admin/(routes)/users/page.tsx
"use client";

import { useState } from "react";

import { useUsers } from "@/hooks/use-users";
import { UserFilterFormData } from "@/schemas/user-schema";

import { UsersHeaderSection } from "@/components/pages/admin/users/users-header-section";
import { UsersListSection } from "@/components/pages/admin/users/users-list-section";
import { UsersStatsSection } from "@/components/pages/admin/users/users-stats-section";

import { APP_TEXT } from "@/data/ui-content";
import { UserRoleEnum } from "@/schemas/user-schema";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function UsersPage() {
  const [filterParams, setFilterParams] = useState<UserFilterFormData>({
    page: 1,
    page_size: 10,
    searchTerm: "",
    role: "all",
  });

  const {
    data: usersData,
    isLoading,
    error: listError,
  } = useUsers(filterParams);

  const {
    data: adminCountData,
    isLoading: isLoadingAdminCount,
    error: adminError,
  } = useUsers({
    group_name: UserRoleEnum.Enum.ADMIN,
    count_only: true,
    customQueryKey: ["adminCountData"],
  });

  const {
    data: operatorCountData,
    isLoading: isLoadingOperatorCount,
    error: operatorError,
  } = useUsers({
    group_name: UserRoleEnum.Enum.OPERATOR,
    count_only: true,
    customQueryKey: ["operatorCountData"],
  });

  const {
    data: viewerCountData,
    isLoading: isLoadingViewerCount,
    error: viewerError,
  } = useUsers({
    group_name: UserRoleEnum.Enum.VIEWER,
    count_only: true,
    customQueryKey: ["viewerCountData"],
  });

  const users = usersData?.results || [];
  const totalUsers = usersData?.count || 0;

  const adminUsersCount = adminCountData?.count || 0;
  const operatorUsersCount = operatorCountData?.count || 0;
  const viewerUsersCount = viewerCountData?.count || 0;

  const handleFilterChange = (newFilters: Partial<UserFilterFormData>) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const overallLoading =
    isLoading ||
    isLoadingAdminCount ||
    isLoadingOperatorCount ||
    isLoadingViewerCount;
  const overallError = listError || adminError || operatorError || viewerError;

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (overallError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">{APP_TEXT.COMMON_UI.ERROR_LOADING_DATA}</span>
        <p className="text-sm">
          {overallError.message || String(overallError)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeaderSection />

      <UsersStatsSection
        totalUsers={totalUsers}
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
          count: usersData?.count || 0,
          next: usersData?.next ?? null,
          previous: usersData?.previous ?? null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
