// src/components/pages/admin/users/users-stats-section.tsx
"use client";

import { StatsCard } from "@/components/base/stats-card";
import { APP_TEXT } from "@/data/ui-content";
import { Eye, Shield, Users } from "lucide-react";

interface UsersStatsSectionProps {
  totalUsers: number;
  adminUsers: number;
  operatorUsers: number;
  viewerUsers: number;
}

export function UsersStatsSection({
  totalUsers,
  adminUsers,
  operatorUsers,
  viewerUsers,
}: UsersStatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title={APP_TEXT.USERS_PAGE.STATS_TOTAL_USERS_TITLE || "Total"}
        value={totalUsers}
        description={
          APP_TEXT.USERS_PAGE.STATS_TOTAL_USERS_DESCRIPTION ||
          "Usuários cadastrados"
        }
        icon={Users}
        iconColorClass="text-muted-foreground"
      />

      <StatsCard
        title={APP_TEXT.USERS_PAGE.STATS_ADMINS_TITLE || "Administradores"}
        value={adminUsers}
        description={
          APP_TEXT.USERS_PAGE.STATS_ADMINS_DESCRIPTION || "Acesso total"
        }
        icon={Shield}
        iconColorClass="text-red-500"
      />

      <StatsCard
        title={APP_TEXT.USERS_PAGE.STATS_OPERATORS_TITLE || "Operadores"}
        value={operatorUsers}
        description={
          APP_TEXT.USERS_PAGE.STATS_OPERATORS_DESCRIPTION ||
          "Operação do sistema"
        }
        icon={Users}
        iconColorClass="text-blue-500"
      />

      <StatsCard
        title={APP_TEXT.USERS_PAGE.STATS_VIEWERS_TITLE || "Visualizadores"}
        value={viewerUsers}
        description={
          APP_TEXT.USERS_PAGE.STATS_VIEWERS_DESCRIPTION || "Apenas leitura"
        }
        icon={Eye}
        iconColorClass="text-green-500"
      />
    </div>
  );
}
