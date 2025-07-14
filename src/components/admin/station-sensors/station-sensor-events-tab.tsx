// src/components/admin/station-sensors/station-sensor-events-tab.tsx
"use client";

import { CardContent } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { useEvents } from "@/hooks/use-events";
import { AppEvent, AppEventSeverity } from "@/types/app-event";
import { AlertTriangle, Eye, Loader2 } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

interface StationSensorEventsTabProps {
  stationSensorId: number;
}

const columnHelper = createColumnHelper<AppEvent>();

const stationSensorEventsColumns: ColumnDef<AppEvent, any>[] = [
  columnHelper.accessor("occurred_at", {
    header: () => APP_TEXT.EVENTS_PAGE.TABLE_HEADER_OCCURRED_AT || "Data/Hora",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.accessor("title", {
    header: () => APP_TEXT.EVENTS_PAGE.TABLE_HEADER_TITLE || "Título",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor("severity_display", {
    header: () => APP_TEXT.EVENTS_PAGE.TABLE_HEADER_SEVERITY || "Severidade",
    cell: (info) => {
      const severity = info.row.original.severity; // Valor numérico da severidade
      let color: "default" | "secondary" | "destructive" | "outline" =
        "outline";
      if (
        severity === AppEventSeverity.CRITICAL ||
        severity === AppEventSeverity.HIGH
      )
        color = "destructive";
      else if (severity === AppEventSeverity.WARN) color = "secondary";
      return <Badge variant={color}>{info.getValue()}</Badge>;
    },
  }),
  columnHelper.accessor("status_display", {
    header: () => APP_TEXT.EVENTS_PAGE.TABLE_HEADER_STATUS || "Status",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.COMMON_UI.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.EVENTS.DETAIL(props.row.original.id)}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  }),
];

export function StationSensorEventsTab({
  stationSensorId,
}: StationSensorEventsTabProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: eventsData,
    isLoading,
    error,
  } = useEvents({
    station_sensor: stationSensorId,
    page: page,
    page_size: pageSize,
  });
  

  const events = eventsData?.results || [];
  const totalEvents = eventsData?.count || 0;

  return (
    <CardContent className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando eventos..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
              "Erro ao carregar eventos."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {APP_TEXT.STATION_SENSORS_PAGE.NO_EVENTS_FOUND ||
            "Nenhum evento encontrado para este vínculo."}{" "}
        </div>
      ) : (
        <DataTable
          columns={stationSensorEventsColumns}
          data={events}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={totalEvents > 0 ? Math.ceil(totalEvents / pageSize) : 0}
          canPreviousPage={page > 1}
          canNextPage={totalEvents > page * pageSize}
          onPageChange={(updater: number | ((old: number) => number)) => {
            if (typeof updater === "function") {
              setPage((old) => updater(old) + 1);
            } else {
              setPage(updater + 1);
            }
          }}
          isLoading={isLoading}
        />
      )}
    </CardContent>
  );
}
