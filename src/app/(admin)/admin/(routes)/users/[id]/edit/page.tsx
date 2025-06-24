// src/app/(admin)/admin/(routes)/users/[id]/edit/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { UserInput } from "@/actions/user-actions";
import { APP_TEXT } from "@/data/ui-content";
import { useUpdateUser, useUser } from "@/hooks/use-users";
import {
  UpdateUserFormData,
  UserGroupData,
  UserGroupEnum,
} from "@/schemas/user-schema";

import { EditUserFormSection } from "@/components/pages/admin/users/edit-user-form-section";
import { EditUserHeaderSection } from "@/components/pages/admin/users/edit-user-header-section";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const userIdOrUuid = id;

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: fetchError,
  } = useUser(userIdOrUuid);

  const {
    mutate: updateUserMutation,
    isPending: isUpdating,
    isSuccess,
    isError,
    error: updateError,
  } = useUpdateUser();

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.UPDATE_SUCCESS_MESSAGE ||
          "Usuário atualizado com sucesso!",
      );
      if (userData?.id) {
        router.push(`/admin/users/${userData.id}`);
      } else {
        router.push("/admin/users");
      }
    }
  }, [isSuccess, router, userData?.id]);

  useEffect(() => {
    if (isError && updateError) {
      toast.error(
        updateError.message ||
          APP_TEXT.COMMON_UI.UPDATE_ERROR_MESSAGE ||
          "Erro ao atualizar usuário.",
      );
    }
  }, [isError, updateError]);

  const overallLoading = isLoadingUser;
  const overallError = fetchError;

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando dados do usuário..."}
        </span>
      </div>
    );
  }

  if (overallError || !userData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
            "Erro ao carregar dados do usuário."}
        </span>
        <p className="text-sm">
          {overallError?.message ||
            APP_TEXT.USERS_PAGE.USER_NOT_FOUND_MESSAGE ||
            "Usuário não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  const validUserGroupNames = Object.values(
    UserGroupEnum.enum,
  ) as readonly string[];

  const initialFormData: UpdateUserFormData = {
    username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    is_active: userData.is_active,
    is_staff: userData.is_staff,
    is_superuser: userData.is_superuser,
    password: "",
    groups: userData.group_names.filter(
      (groupName): groupName is (typeof validUserGroupNames)[number] =>
        validUserGroupNames.includes(groupName),
    ) as UserGroupData[],
  };

  const handleFormSubmit = async (data: UpdateUserFormData) => {
    updateUserMutation({
      id: userData.id,
      data: {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        is_active: data.is_active,
        is_staff: data.is_staff,
        is_superuser: data.is_superuser,
        password: data.password || undefined,
        groups: data.groups,
      } as UserInput,
    });
  };

  return (
    <div className="space-y-6">
      <EditUserHeaderSection
        isLoading={isUpdating}
        userId={userData.uuid}
        user={userData}
      />

      <EditUserFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
