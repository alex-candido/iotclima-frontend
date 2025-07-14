// src/components/pages/admin/users/edit-user-header-section.tsx
"use client";

import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";

interface EditUserHeaderSectionProps {
  isLoading: boolean;
  userId: number | string;
  user: User;
}

export function EditUserHeaderSection({
  isLoading,
  userId,
  user,
}: EditUserHeaderSectionProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.USERS_PAGE.EDIT_USER_TITLE || "Editar Usuário"}
          <span className="text-muted-foreground ml-2">({user.username})</span>
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.USERS_PAGE.EDIT_USER_DESCRIPTION ||
            "Atualize as informações do usuário"}
        </p>
      </div>
      <div className="flex gap-2">
        <Link href={APP_ROUTES.ADMIN.USERS.DETAIL(userId)}>
          <Button variant="outline" disabled={isLoading}>
            {APP_TEXT.USERS_PAGE.VIEW_DETAILS_BUTTON || "Ver Detalhes"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
