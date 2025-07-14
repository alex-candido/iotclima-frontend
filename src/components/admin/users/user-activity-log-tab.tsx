// src/components/pages/admin/users/user-activity-log-tab.tsx
"use client";

import { CardContent } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { useLogs } from "@/hooks/use-logs";
import { formatTimeAgo } from "@/lib/utils";
import { LogSeverity } from "@/types/log";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface UserActivityLogTabProps {
  userId: number;
}

export function UserActivityLogTab({ userId }: UserActivityLogTabProps) {
  const [logPage, setLogPage] = useState(1);
  const pageSize = 10;

  const {
    data: logsData,
    isLoading,
    error,
  } = useLogs({
    user_id: userId,
    page: logPage,
    page_size: pageSize,
  });

  console.log(logsData);

  const logs = logsData?.results || [];
  // const totalLogs = logsData?.count || 0;

  const getLogIconAndColor = (level: LogSeverity) => {
    switch (level) {
      case LogSeverity.ERROR:
        return { icon: XCircle, color: "text-red-500" };
      case LogSeverity.WARN:
        return { icon: AlertCircle, color: "text-yellow-500" };
      case LogSeverity.INFO:
        return { icon: Info, color: "text-blue-500" };
      case LogSeverity.DEBUG:
        return { icon: Info, color: "text-gray-500" };
      default:
        return { icon: Info, color: "text-gray-500" };
    }
  };

  return (
    <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando atividades..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-48 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
              "Erro ao carregar atividades."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground">
          {APP_TEXT.USERS_PAGE.NO_ACTIVITIES_FOUND ||
            "Nenhuma atividade encontrada para este usuário."}
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => {
            const { icon: LogIcon, color: logColor } = getLogIconAndColor(
              log.level,
            );
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 pb-4 border-b last:border-b-0"
              >
                <div className="w-4 h-4 rounded-full mt-2 flex-shrink-0">
                  {LogIcon && <LogIcon className={logColor} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{log.message}</p>
                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {Object.entries(log.metadata)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimeAgo(log.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CardContent>
  );
}
