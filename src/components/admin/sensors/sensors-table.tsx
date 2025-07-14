// src/components/admin/sensors/sensors-table.tsx
"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import {
  getSensorStatusLabel,
  getSensorTypeLabel,
  getUnitTypeLabel,
  SensorFilterFormData,
} from "@/schemas/sensor-schema";
import { Sensor, SensorStatus, SensorType, UnitType } from "@/types/sensor";

interface SensorsTableProps {
  sensors: Sensor[];
  filterParams: SensorFilterFormData;
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

const columnHelper = createColumnHelper<Sensor>();

const sensorColumns: ColumnDef<Sensor, any>[] = [
  columnHelper.accessor("model", {
    header: () => APP_TEXT.SENSORS_PAGE.MODEL_LABEL || "Modelo",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.uuid}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: () => APP_TEXT.SENSORS_PAGE.TYPE_LABEL || "Tipo",
    cell: (info) => {
      const typeValue = info.getValue() as SensorType;
      const typeLabel = getSensorTypeLabel(typeValue);
      const typeColor = "outline";
      return <Badge variant={typeColor}>{typeLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("unit", {
    header: () => APP_TEXT.SENSORS_PAGE.UNIT_LABEL || "Unidade",
    cell: (info) => {
      const unitValue = info.getValue() as UnitType;
      const unitLabel = getUnitTypeLabel(unitValue);
      const unitColor = "default";
      return <Badge variant={unitColor}>{unitLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("status", {
    header: () => APP_TEXT.SENSORS_PAGE.STATUS_LABEL || "Status",
    cell: (info) => {
      const statusValue = info.getValue() as SensorStatus;
      const statusLabel = getSensorStatusLabel(statusValue);
      let statusColor: "default" | "secondary" | "destructive" | "outline" =
        "outline";
      if (statusValue === SensorStatus.ACTIVE) statusColor = "default";
      else if (statusValue === SensorStatus.INACTIVE) statusColor = "secondary";
      else if (statusValue === SensorStatus.ERROR) statusColor = "destructive";
      return <Badge variant={statusColor}>{statusLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("created_at", {
    header: () => APP_TEXT.COMMON_UI.CREATED_AT_LABEL || "Criado em",
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
          <Link href={APP_ROUTES.ADMIN.SENSORS.DETAIL(props.row.original.uuid)}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.SENSORS.EDIT(props.row.original.uuid)}>
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

export function SensorsTable({
  sensors,
  filterParams,
  onPageChange,
  pagination,
  isLoading,
}: SensorsTableProps) {
  const pageCount =
    pagination.total_count > 0
      ? Math.ceil(pagination.total_count / pagination.page_size)
      : 0;

  return (
    <DataTable
      columns={sensorColumns}
      data={sensors}
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
