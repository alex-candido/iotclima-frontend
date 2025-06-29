// src/components/admin/station-sensors/station-sensors-table.tsx
"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { StationSensorFilterFormData } from "@/schemas/station-sensor-schema";
import { StationSensor } from "@/types/station-sensor";

interface StationSensorsTableProps {
  stationSensors: StationSensor[];
  filterParams: StationSensorFilterFormData;
  onPageChange: (newPage: number) => void;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    currentPage: number;
    total_count: number;
  };
  isLoading: boolean;
}

const columnHelper = createColumnHelper<StationSensor>();

const stationSensorsTableColumns: ColumnDef<StationSensor, any>[] = [
  columnHelper.accessor("station_name", {
    header: () =>
      APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_STATION_NAME || "Estação",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.station_model}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("sensor_model", {
    header: () =>
      APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_SENSOR_MODEL || "Sensor",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.sensor_type_display}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("position", {
    header: () =>
      APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_POSITION || "Posição",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() || APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("is_active", {
    header: () => APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_ACTIVE || "Ativo",
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
    header: () =>
      APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_INSTALLED_DATE ||
      "Instalado em",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleDateString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.STATION_SENSORS_PAGE.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={APP_ROUTES.ADMIN.STATION_SENSORS.DETAIL(
              props.row.original.uuid,
            )}
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

export function StationSensorsTable({
  stationSensors,
  filterParams,
  onPageChange,
  pagination,
  isLoading,
}: StationSensorsTableProps) {
  const pageCount =
    pagination.total_count > 0
      ? Math.ceil(pagination.total_count / pagination.page_size)
      : 0;

  return (
    <DataTable
      columns={stationSensorsTableColumns}
      data={stationSensors}
      pageIndex={pagination.currentPage - 1}
      pageSize={pagination.page_size}
      pageCount={pageCount}
      canPreviousPage={!!pagination.previous}
      canNextPage={!!pagination.next}
      onPageChange={(updater) => {
        const newPageIndex =
          typeof updater === "function"
            ? updater(pagination.currentPage - 1)
            : updater;
        onPageChange(newPageIndex + 1);
      }}
      isLoading={isLoading}
    />
  );
}
