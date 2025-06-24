// src/components/pages/admin/users/users-list-section.tsx
"use client";

import { UsersFilters } from "@/components/pages/admin/users/users-filters";
import { UsersTable } from "@/components/pages/admin/users/users-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_TEXT } from "@/data/ui-content";
import { UserFilterFormData } from "@/schemas/user-schema";
import { User } from "@/types/user";

interface UsersListSectionProps {
  users: User[];
  filterParams: UserFilterFormData;
  onFilterChange: (newFilters: Partial<UserFilterFormData>) => void;
  onPageChange: (newPage: number) => void;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    currentPage: number;
  };
}

export function UsersListSection({
  users,
  filterParams,
  onFilterChange,
  onPageChange,
  pagination,
}: UsersListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.USERS_PAGE.LIST_TITLE || "Lista de Usuários"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.USERS_PAGE.LIST_DESCRIPTION ||
            "Visualize e gerencie todos os usuários do sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersFilters
          filterParams={filterParams}
          onFilterChange={onFilterChange}
        />
        <UsersTable
          users={users}
          filterParams={filterParams}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </CardContent>
    </Card>
  );
}
