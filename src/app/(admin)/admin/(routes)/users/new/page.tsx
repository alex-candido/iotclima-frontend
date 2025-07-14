// src/app/(admin)/admin/(routes)/users/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { UserInput } from "@/actions/user-actions";
import { APP_TEXT } from "@/data/ui-content";
import { useCreateUser } from "@/hooks/use-users";
import { CreateUserFormData } from "@/schemas/user-schema";

import { NewUserFormSection } from "@/components/admin/users/new-user-form-section";
import { NewUserHeaderSection } from "@/components/admin/users/new-user-header-section";

export default function NewUserPage() {
  const router = useRouter();
  const {
    mutate: createUserMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateUser();

  const initialFormData: CreateUserFormData = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_active: true,
  };

  const handleFormSubmit = async (data: CreateUserFormData | any) => {
    createUserMutation({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      is_active: data.is_active,
    } as UserInput);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        APP_TEXT.COMMON_UI.CREATE_SUCCESS_MESSAGE ||
          "Usuário criado com sucesso!",
      );
      router.push("/admin/users");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.CREATE_ERROR_MESSAGE ||
          "Erro ao criar usuário.",
      );
    }
  }, [isError, error]);

  return (
    <div className="space-y-6">
      <NewUserHeaderSection isLoading={isPending} />

      <NewUserFormSection
        initialData={initialFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
