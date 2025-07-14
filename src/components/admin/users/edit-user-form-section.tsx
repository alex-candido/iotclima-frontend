// src/components/pages/admin/users/edit-user-form-section.tsx
"use client";

import { UserForm } from "@/components/admin/users/user-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { UpdateUserFormData } from "@/schemas/user-schema";
import { User } from "lucide-react";

interface EditUserFormSectionProps {
  initialData: UpdateUserFormData;
  onSubmit: (data: UpdateUserFormData) => Promise<void> | void;
  isSubmitting: boolean;
}

export function EditUserFormSection({
  initialData,
  onSubmit,
  isSubmitting,
}: EditUserFormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {APP_TEXT.USERS_PAGE.USER_INFO_TITLE || "Informações do Usuário"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.USERS_PAGE.EDIT_USER_DESCRIPTION ||
            "Atualize os dados do usuário"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formType="edit"
        />
      </CardContent>
    </Card>
  );
}
