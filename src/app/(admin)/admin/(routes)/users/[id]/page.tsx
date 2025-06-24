// src/app/(admin)/admin/(routes)/users/[id]/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { APP_TEXT } from "@/data/ui-content";
import { useUser } from "@/hooks/use-users";

import { UserBasicInfoSection } from "@/components/pages/admin/users/user-basic-info-section";
import { UserDetailHeaderSection } from "@/components/pages/admin/users/user-detail-header-section";
import { UserTabsSection } from "@/components/pages/admin/users/user-tabs-section";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: userData, isLoading, error } = useUser(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">
          {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar dados."}
        </span>
        <p className="text-sm">
          {error?.message ||
            APP_TEXT.USERS_PAGE.USER_NOT_FOUND_MESSAGE ||
            "Usuário não encontrado ou erro de carregamento."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserDetailHeaderSection
        userId={userData.uuid}
        user={userData}
        isLoading={isLoading}
      />

      <div className="flex flex-col gap-6">
        <div className="">
          <UserBasicInfoSection user={userData} />
        </div>

        <div className="">
          <UserTabsSection user={userData} />
        </div>
      </div>
    </div>
  );
}
