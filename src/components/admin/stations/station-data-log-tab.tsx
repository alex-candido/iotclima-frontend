// src/components/admin/stations/station-data-log-tab.tsx
"use client";

import { CardContent } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { useLogs } from "@/hooks/use-logs";
import { cn, formatTimeAgo } from "@/lib/utils";
import { LogSeverity } from "@/types/log";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface StationDataLogTabProps {
  stationId: number;
}

export function StationDataLogTab({ stationId }: StationDataLogTabProps) {
  const [logPage, setLogPage] = useState(1);
  const pageSize = 10;

  const {
    data: logsData,
    isLoading,
    error,
  } = useLogs({
    station: stationId,
    page: logPage,
    page_size: pageSize,
  });

  const logs = logsData?.results || [];
  const totalLogs = logsData?.count || 0;

  const getLogIconAndColor = (level: LogSeverity) => {
    switch (level) {
      case LogSeverity.ERROR:
        return { icon: XCircle, iconClass: "text-red-500", dotClass: "" };
      case LogSeverity.WARN:
        return {
          icon: AlertCircle,
          iconClass: "text-yellow-500",
          dotClass: "",
        };
      case LogSeverity.INFO:
        return { icon: Info, iconClass: "text-blue-500", dotClass: "" };
      case LogSeverity.DEBUG:
        return { icon: null, iconClass: "", dotClass: "bg-gray-500" };
      default:
        return { icon: null, iconClass: "", dotClass: "bg-gray-500" };
    }
  };

  return (
    <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando logs..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA || "Erro ao carregar logs."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {APP_TEXT.STATIONS_PAGE.NO_LOGS_FOUND ||
            "Nenhum log encontrado para esta estação."}
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => {
            const {
              icon: LogIconComponent,
              iconClass,
              dotClass,
            } = getLogIconAndColor(log.level);
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 pb-4 border-b last:border-b-0"
              >
                <div
                  className={cn(
                    "flex-shrink-0 mt-2",
                    LogIconComponent
                      ? "w-4 h-4 flex items-center justify-center"
                      : "w-2 h-2 rounded-full",
                    LogIconComponent ? iconClass : dotClass,
                  )}
                >
                  {LogIconComponent ? (
                    <LogIconComponent className={cn("h-4 w-4", iconClass)} />
                  ) : (
                    <div
                      className={cn("w-full h-full rounded-full", dotClass)}
                    ></div>
                  )}
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
