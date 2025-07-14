// src/components/admin/stations/station-data-records-tab.tsx
"use client";

import { AlertTriangle, Eye, Loader2 } from "lucide-react";
import { useState } from "react";

import { APP_TEXT } from "@/data/ui-content";
import { useRecords } from "@/hooks/use-records"; // Hook para buscar Records
import { Record } from "@/types/record"; // Importar Record type

import { DataTable } from "@/components/base/data-table";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes"; // Para links de detalhes do Record
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

interface StationDataRecordsTabProps {
  stationId: number | string;
}

const columnHelper = createColumnHelper<Record>();

const stationDataRecordsColumns: ColumnDef<Record, any>[] = [
  columnHelper.accessor("recorded_at", {
    header: () => APP_TEXT.RECORD_FORM.RECORDED_AT_LABEL || "Data e Hora",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.accessor("temperature", {
    header: () => APP_TEXT.RECORD_FORM.TEMPERATURE_LABEL || "Temperatura (°C)",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() !== null
          ? `${info.getValue()} °C`
          : APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("humidity", {
    header: () => APP_TEXT.RECORD_FORM.HUMIDITY_LABEL || "Umidade (%)",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() !== null
          ? `${info.getValue()} %`
          : APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("wind_speed", {
    header: () => APP_TEXT.RECORD_FORM.WIND_SPEED_LABEL || "Vento (m/s)",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() !== null
          ? `${info.getValue()} m/s`
          : APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("pressure", {
    header: () => APP_TEXT.RECORD_FORM.PRESSURE_LABEL || "Pressão (hPa)",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() !== null
          ? `${info.getValue()} hPa`
          : APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.accessor("rainfall", {
    header: () => APP_TEXT.RECORD_FORM.RAINFALL_LABEL || "Chuva (mm)",
    cell: (info) => (
      <div className="text-sm">
        {info.getValue() !== null
          ? `${info.getValue()} mm`
          : APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.COMMON_UI.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={APP_ROUTES.ADMIN.RECORDS.DETAIL(props.row.original.uuid)}>
            {" "}
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
];

export function StationDataRecordsTab({
  stationId,
}: StationDataRecordsTabProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: recordsData,
    isLoading,
    error,
  } = useRecords({
    station: stationId,
    page: page,
    page_size: pageSize,
  });

  const records = recordsData?.results || [];
  const totalRecords = recordsData?.count || 0;

  return (
    <div className="p-4 space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando registros..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
              "Erro ao carregar registros."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : records.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {APP_TEXT.STATIONS_PAGE.NO_RECORDS_FOUND ||
            "Nenhum registro de dados encontrado para esta estação."}{" "}
        </div>
      ) : (
        <DataTable
          columns={stationDataRecordsColumns}
          data={records}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : 0}
          canPreviousPage={page > 1}
          canNextPage={totalRecords > page * pageSize}
          onPageChange={(updater) => {
            if (typeof updater === "number") {
              setPage(updater + 1);
            } else {
              setPage((old) => updater(old - 1) + 1);
            }
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
