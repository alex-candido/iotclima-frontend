// src/components/admin/users/user-permissions-tab.tsx
"use client";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { APP_TEXT } from "@/data/ui-content";
import { getPermissionsByGroups, PermissionItem } from "@/lib/user-helpers";
import { UserGroupData } from "@/schemas/user-schema";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

interface UserPermissionsTabProps {
  userGroups: string[];
}

const columnHelper = createColumnHelper<PermissionItem>();

const permissionColumns: ColumnDef<PermissionItem, any>[] = [
  columnHelper.accessor("module", {
    header: () =>
      APP_TEXT.USERS_PAGE.PERMISSIONS_TABLE_HEADER_MODULE || "Módulo",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("read", {
    header: () =>
      APP_TEXT.USERS_PAGE.PERMISSIONS_TABLE_HEADER_READ || "Leitura",
    cell: (info) => (
      <Badge variant={info.getValue() ? "default" : "secondary"}>
        {info.getValue()
          ? APP_TEXT.COMMON_UI.YES_TEXT || "Sim"
          : APP_TEXT.COMMON_UI.NO_TEXT || "Não"}
      </Badge>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("write", {
    header: () =>
      APP_TEXT.USERS_PAGE.PERMISSIONS_TABLE_HEADER_WRITE || "Escrita",
    cell: (info) => (
      <Badge variant={info.getValue() ? "default" : "secondary"}>
        {info.getValue()
          ? APP_TEXT.COMMON_UI.YES_TEXT || "Sim"
          : APP_TEXT.COMMON_UI.NO_TEXT || "Não"}
      </Badge>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("delete", {
    header: () =>
      APP_TEXT.USERS_PAGE.PERMISSIONS_TABLE_HEADER_DELETE || "Exclusão",
    cell: (info) => (
      <Badge variant={info.getValue() ? "destructive" : "secondary"}>
        {info.getValue()
          ? APP_TEXT.COMMON_UI.YES_TEXT || "Sim"
          : APP_TEXT.COMMON_UI.NO_TEXT || "Não"}
      </Badge>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
];

export function UserPermissionsTab({ userGroups }: UserPermissionsTabProps) {
  const userGroupEnums: UserGroupData[] = userGroups.map(
    (group) => group as UserGroupData,
  );
  const permissions: PermissionItem[] = getPermissionsByGroups(userGroupEnums);

  return (
    <div className="rounded-md p-4">
      <DataTable
        columns={permissionColumns}
        data={permissions}
        pageIndex={0}
        pageSize={permissions.length || 1}
        pageCount={1}
        canPreviousPage={false}
        canNextPage={false}
        onPageChange={() => {}}
      />
    </div>
  );
}
