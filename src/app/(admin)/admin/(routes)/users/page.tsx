// src/app/(admin)/admin/(routes)/users/page.tsx
"use client";

import { useState } from "react";

import { useUsers } from "@/hooks/use-users";
import { UserFilterFormData } from "@/schemas/user-schema";

import { UsersHeaderSection } from "@/components/pages/admin/users/users-header-section";
import { UsersListSection } from "@/components/pages/admin/users/users-list-section";
import { UsersStatsSection } from "@/components/pages/admin/users/users-stats-section";

import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroupEnum } from "@/schemas/user-schema";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function UsersPage() {
  const { data: session } = useSession();
  const userGroups = session?.user?.groupNames || [];

  const requiredRolesForNewUser = APP_ROUTES.ADMIN.USERS.roles || [];

  const canCreateUser = userGroups.some((group) =>
    requiredRolesForNewUser.includes(group),
  );

  const [filterParams, setFilterParams] = useState<UserFilterFormData>({
    page: 1,
    page_size: 10,
    search_term: "",
    group_name: "all",
  });

  const apiQueryParams: { [key: string]: unknown } = {
    page: filterParams.page,
    page_size: filterParams.page_size,
  };

  if (filterParams.search_term) {
    apiQueryParams.search_term = filterParams.search_term;
  }

  if (filterParams.group_name && filterParams.group_name !== "all") {
    apiQueryParams.group_name = filterParams.group_name;
  }

  const {
    data: usersData,
    isLoading,
    error: listError,
  } = useUsers(apiQueryParams);

  const {
    data: usersCountData,
    isLoading: isLoadingUsersCount,
    error: usersError,
  } = useUsers({
    customQueryKey: ["adminCountData"],
  });

  const {
    data: adminCountData,
    isLoading: isLoadingAdminCount,
    error: adminError,
  } = useUsers({
    group_name: UserGroupEnum.Enum.ADMIN,
    count_only: true,
    customQueryKey: ["adminCountData"],
  });

  const {
    data: operatorCountData,
    isLoading: isLoadingOperatorCount,
    error: operatorError,
  } = useUsers({
    group_name: UserGroupEnum.Enum.OPERATOR,
    count_only: true,
    customQueryKey: ["operatorCountData"],
  });

  const {
    data: viewerCountData,
    isLoading: isLoadingViewerCount,
    error: viewerError,
  } = useUsers({
    group_name: UserGroupEnum.Enum.VIEWER,
    count_only: true,
    customQueryKey: ["viewerCountData"],
  });

  const users = usersData?.results || [];

  const usersCount = usersCountData?.total_count || 0;
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
    isLoadingUsersCount ||
    isLoadingAdminCount ||
    isLoadingOperatorCount ||
    isLoadingViewerCount;
  const overallError = usersError || adminError || operatorError || viewerError;

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
        totalUsers={usersCount}
        adminUsers={adminUsersCount}
        operatorUsers={operatorUsersCount}
        viewerUsers={viewerUsersCount}
      />

      <UsersListSection
        users={users}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        isLoading={isLoading}
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
