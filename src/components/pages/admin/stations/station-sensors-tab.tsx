// src/components/admin/stations/station-sensors-tab.tsx
"use client";

import { AlertTriangle, Edit, Eye, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import { APP_TEXT } from "@/data/ui-content";
import { useStationSensors } from "@/hooks/use-station-sensor";
import { StationSensor } from "@/types/station-sensor";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

interface StationSensorsTabProps {
  stationId: number;
}

const columnHelper = createColumnHelper<StationSensor>();

const stationSensorColumns: ColumnDef<StationSensor, any>[] = [
  columnHelper.accessor("sensor_model", {
    header: () =>
      APP_TEXT.STATIONS_PAGE.SENSOR_MODEL_LABEL || "Modelo do Sensor",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.sensor_uuid}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("sensor_type_display", {
    header: () => APP_TEXT.STATIONS_PAGE.SENSOR_TYPE_LABEL || "Tipo de Sensor",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor("position", {
    header: () => APP_TEXT.STATIONS_PAGE.SENSOR_POSITION_LABEL || "Posição",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() || APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("is_active", {
    header: () => APP_TEXT.COMMON_UI.STATUS_LABEL || "Ativo",
    cell: (info) => {
      const isActive = info.getValue();
      const statusLabel = isActive
        ? APP_TEXT.COMMON_UI.STATUS_ACTIVE
        : APP_TEXT.COMMON_UI.STATUS_INACTIVE;
      const statusColor = isActive ? "default" : "secondary";
      return <Badge variant={statusColor}>{statusLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("installed_date", {
    header: () => APP_TEXT.STATIONS_PAGE.INSTALLED_AT_LABEL || "Instalado em",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleDateString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.COMMON_UI.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={
              APP_ROUTES.ADMIN.STATIONS.DETAIL(props.row.original.station) +
              `/sensors/${props.row.original.uuid}`
            }
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={APP_ROUTES.ADMIN.STATION_SENSORS.EDIT(
              props.row.original.uuid,
            )}
          >
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
];

export function StationSensorsTab({ stationId }: StationSensorsTabProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: stationSensorsData,
    isLoading,
    error,
  } = useStationSensors({
    station_id: stationId,
    page: page,
    page_size: pageSize,
  });

  const stationSensors = stationSensorsData?.results || [];
  const totalStationSensors = stationSensorsData?.count || 0;

  return (
    <div className="p-4 space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA ||
              "Carregando sensores associados..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
              "Erro ao carregar sensores associados."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : stationSensors.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {APP_TEXT.STATIONS_PAGE.NO_ASSOCIATED_SENSORS ||
            "Nenhum sensor associado a esta estação."}
        </div>
      ) : (
        <DataTable
          columns={stationSensorColumns}
          data={stationSensors}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={
            totalStationSensors > 0
              ? Math.ceil(totalStationSensors / pageSize)
              : 0
          }
          canPreviousPage={page > 1}
          canNextPage={totalStationSensors > page * pageSize}
          onPageChange={(newPageIndex) => {
            if (typeof newPageIndex === "number") {
              setPage(newPageIndex + 1);
            } else if (typeof newPageIndex === "function") {
              setPage((old) => (newPageIndex(old) as number) + 1);
            }
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
