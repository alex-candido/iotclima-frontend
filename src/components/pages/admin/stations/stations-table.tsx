// src/components/admin/stations/stations-table.tsx
'use client';

import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import Link from "next/link";
import { Eye, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from '@/components/base/data-table';

import { APP_TEXT } from "@/data/ui-content";
import { Station, StationStatus } from "@/types/station";
import { StationFilterFormData } from "@/schemas/station-schema";
import { getStationStatusLabel } from "@/schemas/station-schema"; // Importar getStationStatusLabel
import { APP_ROUTES } from "@/data/routes";

// Se você tiver um componente para ações de linha de Station (similar ao UserRowActions)
// import { StationRowActions } from "./station-row-actions";

interface StationsTableProps {
  stations: Station[];
  filterParams: StationFilterFormData;
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

const columnHelper = createColumnHelper<Station>();

const stationColumns: ColumnDef<Station, any>[] = [
  columnHelper.accessor('name', {
    header: () => APP_TEXT.STATIONS_PAGE.TABLE_HEADER_NAME || "Nome da Estação", // NOVO TEXTO
    cell: info => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">{info.row.original.uuid}</div>
      </div>
    ),
  }),
  columnHelper.accessor('model', {
    header: () => APP_TEXT.STATIONS_PAGE.MODEL_LABEL || "Modelo",
    cell: info => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor('firmware', { 
    header: () => APP_TEXT.STATIONS_PAGE.FIRMWARE_LABEL || "Firmware", 
    cell: info => <div className="text-sm">{info.getValue() || "N/A"}</div>,
  }),
  columnHelper.accessor('status', {
    header: () => APP_TEXT.STATIONS_PAGE.STATUS_LABEL || "Status",
    cell: info => {
      const statusValue = info.getValue() as StationStatus;
      let statusColor: 'default' | 'secondary' | 'destructive' | 'outline' = 'outline';
      if (statusValue === StationStatus.ACTIVE || statusValue === StationStatus.ONLINE) statusColor = 'default';
      else if (statusValue === StationStatus.OFFLINE || statusValue === StationStatus.MAINTENANCE) statusColor = 'secondary';
      else if (statusValue === StationStatus.INACTIVE) statusColor = 'destructive';

      return (
        <Badge variant={statusColor}>
          {getStationStatusLabel(statusValue)} 
        </Badge>
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('installed_at', {
    header: () => APP_TEXT.STATIONS_PAGE.INSTALLED_AT_LABEL || "Instalado em",
    cell: info => <div className="text-sm">{new Date(info.getValue()).toLocaleDateString("pt-BR")}</div>,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => APP_TEXT.COMMON_UI.TABLE_HEADER_ACTIONS || "Ações",
    cell: props => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.STATIONS.DETAIL(props.row.original.uuid)}> 
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.STATIONS.EDIT(props.row.original.uuid)}>
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


export function StationsTable({ stations, filterParams, onPageChange, pagination, isLoading }: StationsTableProps) {
  const pageCount = pagination.total_count > 0 ? Math.ceil(pagination.total_count / pagination.page_size) : 0;

  return (
    <DataTable
      columns={stationColumns}
      data={stations}
      pageIndex={pagination.currentPage - 1}
      pageSize={pagination.page_size}
      pageCount={pageCount}
      canPreviousPage={!!pagination.previous}
      canNextPage={!!pagination.next}
      onPageChange={(updater) => {
        const newPageIndex = typeof updater === 'function' ? updater(pagination.currentPage - 1) : updater;
        onPageChange(newPageIndex + 1);
      }}
      isLoading={isLoading}
    />
  );
}
