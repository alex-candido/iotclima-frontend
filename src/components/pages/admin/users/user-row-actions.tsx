// src/components/admin/users/user-row-actions.tsx
"use client";

import { Edit, Eye, Loader2, Trash2 } from "lucide-react"; // Loader2 adicionado para o disabled state
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";
import { User } from "@/types/user";

import { useDeleteUser } from "@/hooks/use-users";

interface UserRowActionsProps {
  user: User;
}

export function UserRowActions({ user }: UserRowActionsProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];

  const { mutate: deleteUserMutation, isPending: isDeletingUser } =
    useDeleteUser();

  const canView = userGroups.some((group: UserGroup) =>
    [UserGroup.ADMIN, UserGroup.MANAGER, UserGroup.VIEWER].includes(group),
  );
  const canEdit = userGroups.some((group: UserGroup) =>
    [UserGroup.ADMIN, UserGroup.MANAGER].includes(group),
  );
  const canDelete = userGroups.some((group: UserGroup) =>
    [UserGroup.ADMIN].includes(group),
  );

  const handleDelete = async () => {
    try {
      deleteUserMutation(user.id);
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo usuário...",
      );
    } catch (error: any) {
      console.error(
        "Erro ao tentar deletar usuário (acionado no componente):",
        error,
      );
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {canView && (
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.USERS.DETAIL(user.uuid)}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      )}
      {canEdit && (
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.USERS.EDIT(user.uuid)}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      )}
      {canDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              disabled={isDeletingUser}
            >
              {isDeletingUser ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {APP_TEXT.COMMON_UI.DELETE_CONFIRM_TITLE || "Tem certeza?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {APP_TEXT.COMMON_UI.DELETE_CONFIRM_DESCRIPTION(user.username) ||
                  `Esta ação excluirá o usuário ${user.username}. Você não poderá desfazê-la.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletingUser}>
                {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600"
                disabled={isDeletingUser}
              >
                {APP_TEXT.COMMON_UI.DELETE_BUTTON || "Deletar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
