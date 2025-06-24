// src/components/pages/admin/users/new-user-form-section.tsx
"use client";

import { UserForm } from "@/components/pages/admin/users/user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { CreateUserFormData, UpdateUserFormData } from "@/schemas/user-schema";
import { User } from "lucide-react";

interface NewUserFormSectionProps {
  initialData: CreateUserFormData;
  onSubmit: (
    data: CreateUserFormData | UpdateUserFormData,
  ) => Promise<void> | void;
  isSubmitting: boolean;
}

export function NewUserFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: NewUserFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {APP_TEXT.USERS_PAGE.USER_INFO_TITLE || "Informações do Usuário"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.USERS_PAGE.USER_INFO_DESCRIPTION ||
            "Preencha os dados do novo usuário"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="create"
        />
      </CardContent>
    </Card>
  );
}
