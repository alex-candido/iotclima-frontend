// src/components/pages/admin/users/user-detail-header-section.tsx
"use client";

import { ArrowLeft, Edit, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useDeleteUser } from "@/hooks/use-users";
import { UserGroup } from "@/types/next-auth";
import { User } from "@/types/user";

interface UserDetailHeaderSectionProps {
  userId: number;
  user: User;
}

export function UserDetailHeaderSection({
  userId,
  user,
}: UserDetailHeaderSectionProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const { mutate: deleteUserMutation, isPending: isDeletingUser } =
    useDeleteUser();

  const canEdit = userGroups.some((group) =>
    APP_ROUTES.ADMIN.USERS.roles?.includes(group as string),
  );
  const canDelete = userGroups.some((group) =>
    APP_ROUTES.ADMIN.USERS.roles?.includes(group as string),
  );

  const handleDelete = async () => {
    try {
      deleteUserMutation(userId);
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
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">{user.username}</h1>
        <p className="text-muted-foreground">
          {APP_TEXT.USERS_PAGE.DETAIL_DESCRIPTION || "Detalhes do usuário"}
        </p>
      </div>
      <div className="flex gap-2">
        {canEdit && (
          <Button variant="outline" asChild>
            <Link href={APP_ROUTES.ADMIN.USERS.EDIT(userId)}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Link>
          </Button>
        )}
        {canDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeletingUser}>
                {isDeletingUser ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                {APP_TEXT.COMMON_UI.DELETE_BUTTON || "Excluir"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {APP_TEXT.COMMON_UI.DELETE_CONFIRM_TITLE || "Tem certeza?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {APP_TEXT.COMMON_UI.DELETE_CONFIRM_DESCRIPTION(
                    user.username,
                  ) ||
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
    </div>
  );
}
