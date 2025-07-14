// src/components/pages/admin/users/user-basic-info-section.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { User } from "@/types/user";
// Correção: Renomeado imports de funções auxiliares para getUserGroupLabel e getUserGroupColor
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserGroupColor, getUserGroupLabel } from "@/lib/user-helpers";
import { UserGroupData } from "@/schemas/user-schema";
import { Calendar, Clock, Mail } from "lucide-react";

interface UserBasicInfoSectionProps {
  user: User;
}

export function UserBasicInfoSection({ user }: UserBasicInfoSectionProps) {
  const primaryRole =
    user.group_names && user.group_names.length > 0
      ? user.group_names[0]
      : null;
  const roleLabel = primaryRole
    ? getUserGroupLabel(primaryRole as UserGroupData)
    : APP_TEXT.COMMON_UI.NO_ROLE_ASSIGNED;
  const roleColor = primaryRole
    ? getUserGroupColor(primaryRole as UserGroupData)
    : "outline";

  const formatDate = (dateString: string | null) => {
    if (!dateString) return APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.USERS_PAGE.BASIC_INFO_TITLE || "Informações Básicas"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={"/avatars/placeholder.jpg"} alt={user.username} />
            <AvatarFallback className="text-lg">
              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{user.username}</h3>
          <Badge variant={roleColor} className="mt-2">
            {roleLabel}
          </Badge>
          <Badge
            variant={user.is_active ? "default" : "secondary"}
            className="mt-1"
          >
            {user.is_active
              ? APP_TEXT.COMMON_UI.STATUS_ACTIVE || "Ativo"
              : APP_TEXT.COMMON_UI.STATUS_INACTIVE || "Inativo"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.email}</span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.USERS_PAGE.DATE_JOINED_LABEL || "Data de Registro"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(user.date_joined)}
              </p>
            </div>
          </div>
          {user.last_login && (
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.USERS_PAGE.LAST_LOGIN_LABEL || "Último acesso"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(user.last_login)}
                </p>
              </div>
            </div>
          )}
        </div>

        {user.first_name || user.last_name ? (
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">
              {APP_TEXT.USERS_PAGE.FULL_NAME_LABEL || "Nome Completo"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {user.first_name} {user.last_name}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
