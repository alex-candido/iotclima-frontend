// src/lib/user-helpers.ts

import { UserGroupData, UserGroupEnum } from "@/schemas/user-schema";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function getUserGroupColor(role: UserGroupData): BadgeVariant {
  switch (role) {
    case UserGroupEnum.Enum.ADMIN:
      return "destructive";
    case UserGroupEnum.Enum.MANAGER:
      return "default";
    case UserGroupEnum.Enum.OPERATOR:
      return "secondary";
    case UserGroupEnum.Enum.EMPLOYEE:
      return "outline";
    case UserGroupEnum.Enum.OWNER:
      return "default";
    case UserGroupEnum.Enum.CUSTOMER:
      return "default";
    case UserGroupEnum.Enum.VIEWER:
      return "secondary";
    default:
      return "outline";
  }
}

export function getUserGroupLabel(role: UserGroupData): string {
  switch (role) {
    case UserGroupEnum.Enum.ADMIN:
      return "Administrador";
    case UserGroupEnum.Enum.CUSTOMER:
      return "Cliente";
    case UserGroupEnum.Enum.EMPLOYEE:
      return "Funcionário";
    case UserGroupEnum.Enum.MANAGER:
      return "Gerente";
    case UserGroupEnum.Enum.OPERATOR:
      return "Operador";
    case UserGroupEnum.Enum.OWNER:
      return "Proprietário";
    case UserGroupEnum.Enum.VIEWER:
      return "Visualizador";
    default:
      return role;
  }
}
