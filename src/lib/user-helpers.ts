// src/lib/user-helpers.ts

import { UserGroupData, UserGroupEnum } from '@/schemas/user-schema';

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type PermissionItem = {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
};

export function getUserGroupColor(group: UserGroupData): BadgeVariant {
  switch (group) {
    case UserGroupEnum.enum.ADMIN:
      return "destructive";
    case UserGroupEnum.enum.MANAGER:
      return "default";
    case UserGroupEnum.enum.OPERATOR:
      return "secondary";
    case UserGroupEnum.enum.EMPLOYEE:
      return "outline";
    case UserGroupEnum.enum.OWNER:
      return "default";
    case UserGroupEnum.enum.CUSTOMER:
      return "default";
    case UserGroupEnum.enum.VIEWER:
      return "secondary";
    default:
      return "outline";
  }
}

export function getUserGroupLabel(group: UserGroupData): string {
  switch (group) {
    case UserGroupEnum.enum.ADMIN:
      return "Administrador";
    case UserGroupEnum.enum.CUSTOMER:
      return "Cliente";
    case UserGroupEnum.enum.EMPLOYEE:
      return "Funcionário";
    case UserGroupEnum.enum.MANAGER:
      return "Gerente";
    case UserGroupEnum.enum.OPERATOR:
      return "Operador";
    case UserGroupEnum.enum.OWNER:
      return "Proprietário";
    case UserGroupEnum.enum.VIEWER:
      return "Visualizador";
    default:
      return group;
  }
}

export function getPermissionsByGroups(userGroups: UserGroupData[]): PermissionItem[] {
  const basePermissions: { [key: string]: PermissionItem } = {
    "Dashboard": { module: "Dashboard", read: false, write: false, delete: false },
    "Estações": { module: "Estações", read: false, write: false, delete: false },
    "Sensores": { module: "Sensores", read: false, write: false, delete: false },
    "Registros": { module: "Registros", read: false, write: false, delete: false },
    "Eventos": { module: "Eventos", read: false, write: false, delete: false },
    "Logs": { module: "Logs", read: false, write: false, delete: false },
    "Usuários": { module: "Usuários", read: false, write: false, delete: false },
    "Locais": { module: "Locais", read: false, write: false, delete: false },
    "Configurações": { module: "Configurações", read: false, write: false, delete: false },
  };

  let currentPermissions = { ...basePermissions };

  userGroups.forEach(group => {
    switch (group) {
      case UserGroupEnum.enum.ADMIN:
        Object.keys(currentPermissions).forEach(module => {
          currentPermissions[module] = { ...currentPermissions[module], read: true, write: true, delete: true };
        });
        break;
      case UserGroupEnum.enum.OWNER:
      case UserGroupEnum.enum.MANAGER:
        currentPermissions["Dashboard"].read = true;
        currentPermissions["Estações"].read = true; currentPermissions["Estações"].write = true;
        currentPermissions["Sensores"].read = true; currentPermissions["Sensores"].write = true;
        currentPermissions["Registros"].read = true; currentPermissions["Registros"].write = true;
        currentPermissions["Eventos"].read = true; currentPermissions["Eventos"].write = true;
        currentPermissions["Locais"].read = true; currentPermissions["Locais"].write = true;
        currentPermissions["Usuários"].read = true; currentPermissions["Usuários"].write = true;
        break;
      case UserGroupEnum.enum.OPERATOR:
        currentPermissions["Dashboard"].read = true;
        currentPermissions["Estações"].read = true; currentPermissions["Estações"].write = true;
        currentPermissions["Sensores"].read = true; currentPermissions["Sensores"].write = true;
        currentPermissions["Registros"].read = true; currentPermissions["Registros"].write = true;
        currentPermissions["Eventos"].read = true; currentPermissions["Eventos"].write = true;
        break;
      case UserGroupEnum.enum.EMPLOYEE:
        currentPermissions["Dashboard"].read = true;
        currentPermissions["Registros"].read = true; currentPermissions["Registros"].write = true;
        break;
      case UserGroupEnum.enum.CUSTOMER:
      case UserGroupEnum.enum.VIEWER:
        currentPermissions["Dashboard"].read = true;
        currentPermissions["Estações"].read = true;
        currentPermissions["Sensores"].read = true;
        currentPermissions["Registros"].read = true;
        currentPermissions["Eventos"].read = true;
        break;
      default:
        break;
    }
  });

  return Object.values(currentPermissions);
}
