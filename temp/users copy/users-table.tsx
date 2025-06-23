// src/components/admin/users/users-table.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { APP_TEXT } from "@/data/ui-content";
import { getUserGroupColor, getUserGroupLabel } from "@/lib/user-helpers";
import { UserFilterFormData, UserGroupData } from "@/schemas/user-schema";
import { User } from "@/types/user";

import { UserRowActions } from "./user-row-actions";

interface UsersTableProps {
  users: User[];
  filterParams: UserFilterFormData;
  onPageChange: (newPage: number) => void;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    currentPage: number;
  };
}

export function UsersTable({
  users,
  filterParams,
  onPageChange,
  pagination,
}: UsersTableProps) {
  const handlePreviousPage = () => {
    if (pagination.previous) {
      onPageChange(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.next) {
      onPageChange(pagination.currentPage + 1);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_USER || "Usuário"}
            </TableHead>
            <TableHead>
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_EMAIL || "Email"}
            </TableHead>
            <TableHead>
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_GROUP || "Função"}
            </TableHead>
            <TableHead>
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_CREATED_AT || "Criado em"}
            </TableHead>
            <TableHead>
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_UPDATED_AT ||
                "Última atualização"}
            </TableHead>
            <TableHead className="text-right">
              {APP_TEXT.USERS_PAGE.TABLE_HEADER_ACTIONS || "Ações"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                {APP_TEXT.COMMON_UI.NO_RESULTS_FOUND ||
                  "Nenhum resultado encontrado."}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {user.id}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getUserGroupColor(
                      user.group_names[0] as UserGroupData,
                    )}
                  >
                    {getUserGroupLabel(user.group_names[0] as UserGroupData)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(user.date_joined).toLocaleDateString("pt-BR")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(user.updated_at).toLocaleDateString("pt-BR")}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <UserRowActions user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination.count > 0 && (
        <div className="flex items-center justify-end px-2 py-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={!pagination.previous}
          >
            {APP_TEXT.COMMON_UI.PREVIOUS_PAGE_BUTTON || "Anterior"}
          </Button>
          <span className="text-sm px-2 text-muted-foreground">
            {pagination.currentPage} /{" "}
            {Math.ceil(pagination.count / pagination.page_size)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!pagination.next}
          >
            {APP_TEXT.COMMON_UI.NEXT_PAGE_BUTTON || "Próximo"}
          </Button>
        </div>
      )}
    </div>
  );
}
