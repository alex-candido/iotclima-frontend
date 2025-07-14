// src/components/admin/users/users-table.tsx
"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";

import { APP_TEXT } from "@/data/ui-content";
import { getUserGroupColor, getUserGroupLabel } from "@/lib/user-helpers";
import { UserFilterFormData, UserGroupData } from "@/schemas/user-schema";
import { User } from "@/types/user";

import { Loader2 } from "lucide-react";
import { UserRowActions } from "./user-row-actions";

interface UsersTableProps {
  users: User[];
  filterParams: UserFilterFormData;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    currentPage: number;
  };
}

const columnHelper = createColumnHelper<User>();

const userColumns: ColumnDef<User, any>[] = [
  columnHelper.accessor("username", {
    header: () => APP_TEXT.USERS_PAGE.TABLE_HEADER_USER || "Usuário",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.uuid}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: () => APP_TEXT.USERS_PAGE.TABLE_HEADER_EMAIL || "Email",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor("group_names", {
    header: () => APP_TEXT.USERS_PAGE.TABLE_HEADER_GROUP || "Função",
    cell: (info) => {
      const group = info.getValue()[0] as UserGroupData;
      return (
        <Badge variant={getUserGroupColor(group)}>
          {getUserGroupLabel(group)}
        </Badge>
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("date_joined", {
    header: () => APP_TEXT.USERS_PAGE.TABLE_HEADER_CREATED_AT || "Criado em",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleDateString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.accessor("updated_at", {
    header: () =>
      APP_TEXT.USERS_PAGE.TABLE_HEADER_UPDATED_AT || "Última atualização",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleDateString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.USERS_PAGE.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => <UserRowActions user={props.row.original} />,
    enableSorting: false,
    enableHiding: false,
  }),
];

export function UsersTable({
  users,
  filterParams,
  onPageChange,
  pagination,
  isLoading = false,
}: UsersTableProps) {
  const pageCount =
    pagination.count > 0
      ? Math.ceil(pagination.count / pagination.page_size)
      : 0;

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <DataTable
        columns={userColumns}
        data={users}
        pageIndex={pagination.currentPage - 1}
        pageSize={pagination.page_size}
        pageCount={pageCount}
        canPreviousPage={!!pagination.previous}
        canNextPage={!!pagination.next}
        onPageChange={(updater) => {
          const newPageIndex =
            typeof updater === "function"
              ? updater(pagination.currentPage - 1)
              : updater;
          onPageChange(newPageIndex + 1);
        }}
      />
    </div>
  );
}
