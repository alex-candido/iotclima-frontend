// src/components/pages/admin/users/user-tabs-section.tsx
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_TEXT } from "@/data/ui-content";
import { User } from "@/types/user";

import { UserActivityLogTab } from "@/components/pages/admin/users/user-activity-log-tab";
import { UserPermissionsTab } from "@/components/pages/admin/users/user-permissions-tab";

interface UserTabsSectionProps {
  user: User;
}

export function UserTabsSection({ user }: UserTabsSectionProps) {
  console.log(user);
  return (
    <Tabs defaultValue="activity" className="space-y-4">
      <TabsList>
        <TabsTrigger value="activity">
          {APP_TEXT.USERS_PAGE.TAB_ACTIVITY || "Atividades"}
        </TabsTrigger>
        <TabsTrigger value="permissions">
          {APP_TEXT.USERS_PAGE.TAB_PERMISSIONS || "Permissões"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="activity">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.USERS_PAGE.RECENT_ACTIVITY_TITLE ||
                "Atividades Recentes"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.USERS_PAGE.RECENT_ACTIVITY_DESCRIPTION ||
                "Últimas ações realizadas pelo usuário"}
            </CardDescription>
          </CardHeader>
          <UserActivityLogTab userId={user.id} />
        </Card>
      </TabsContent>

      <TabsContent value="permissions">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.USERS_PAGE.SYSTEM_PERMISSIONS_TITLE ||
                "Permissões do Sistema"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.USERS_PAGE.SYSTEM_PERMISSIONS_DESCRIPTION ||
                "Controle de acesso aos módulos do sistema"}
            </CardDescription>
          </CardHeader>
          <UserPermissionsTab userGroups={user.group_names} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
