// src/components/pages/admin/users/user-detail-header-section.tsx
"use client";

import { ArrowLeft, Edit, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";
import { User } from "@/types/user";

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

import { useDeleteUser } from "@/hooks/use-users"; // Importar hook de exclusão

interface UserDetailHeaderSectionProps {
  isLoading: boolean;
  userId: number | string;
  user: User;
}

export function UserDetailHeaderSection({
  isLoading,
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
    if (!user || !user.id) {
      toast.error(
        APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "ID do usuário não encontrado para exclusão.",
      );
      return;
    }
    try {
      deleteUserMutation(user.id);
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo usuário...",
      );
      router.push(APP_ROUTES.ADMIN.USERS.LIST);
    } catch (error: any) {
      console.error("Erro ao tentar deletar usuário:", error);
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "Erro ao excluir usuário.",
      );
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading || isDeletingUser}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.USERS_PAGE.DETAIL_TITLE || "Detalhes do Usuário"}
          <span className="text-muted-foreground ml-2">({user.username})</span>
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.USERS_PAGE.DETAIL_DESCRIPTION ||
            "Informações detalhadas do perfil do usuário."}
        </p>
      </div>
      <div className="flex gap-2">
        {canEdit && (
          <Link href={APP_ROUTES.ADMIN.USERS.EDIT(userId)} passHref>
            <Button variant="outline" disabled={isLoading || isDeletingUser}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Button>
          </Link>
        )}
        {canDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isLoading || isDeletingUser}
              >
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
                <AlertDialogCancel disabled={isLoading || isDeletingUser}>
                  {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isLoading || isDeletingUser}
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
