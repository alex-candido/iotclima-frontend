// src/components/admin/places/place-stations-tab.tsx
"use client";

import { CardContent } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { useStations } from "@/hooks/use-stations";
import { Station, StationStatus } from "@/types/station";
import { AlertTriangle, Eye, Loader2 } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

interface PlaceStationsTabProps {
  placeId: number;
}

const columnHelper = createColumnHelper<Station>();

const stationColumns: ColumnDef<Station, any>[] = [
  columnHelper.accessor("name", {
    header: () => APP_TEXT.ADMIN_LAYOUT.STATIONS_LINK || "Nome da Estação",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.uuid}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("model", {
    header: () => APP_TEXT.STATIONS_PAGE.MODEL_LABEL || "Modelo",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor("status", {
    header: () => APP_TEXT.STATIONS_PAGE.STATUS_LABEL || "Status",
    cell: (info) => {
      const statusValue = info.getValue() as StationStatus;
      let statusColor: "default" | "secondary" | "destructive" | "outline" =
        "outline";
      if (
        statusValue === StationStatus.ACTIVE ||
        statusValue === StationStatus.ONLINE
      )
        statusColor = "default";
      else if (
        statusValue === StationStatus.OFFLINE ||
        statusValue === StationStatus.MAINTENANCE
      )
        statusColor = "secondary";
      else if (statusValue === StationStatus.INACTIVE)
        statusColor = "destructive";

      const statusLabel =
        Object.keys(StationStatus).find(
          (key) =>
            StationStatus[key as keyof typeof StationStatus] === statusValue,
        ) || String(statusValue);
      return (
        <Badge variant={statusColor}>
          {statusLabel.charAt(0).toUpperCase() +
            statusLabel.slice(1).toLowerCase()}
        </Badge>
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("installed_at", {
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
            href={APP_ROUTES.ADMIN.STATIONS.DETAIL(props.row.original.uuid)}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
];

export function PlaceStationsTab({ placeId }: PlaceStationsTabProps) {
  const [stationPage, setStationPage] = useState(1);
  const pageSize = 10;

  const {
    data: stationsData,
    isLoading,
    error,
  } = useStations({
    place_id: placeId,
    page: stationPage,
    page_size: pageSize,
  });

  const stations = stationsData?.results || [];
  const totalStations = stationsData?.count || 0;

  return (
    <CardContent className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">
            {APP_TEXT.COMMON_UI.LOADING_DATA || "Carregando estações..."}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-8 w-8" />
          <span className="mt-2">
            {APP_TEXT.COMMON_UI.ERROR_LOADING_DATA ||
              "Erro ao carregar estações."}
          </span>
          <p className="text-sm">{error.message || String(error)}</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {APP_TEXT.PLACES_PAGE.NO_ASSOCIATED_STATIONS ||
            "Nenhuma estação associada a este local."}
        </div>
      ) : (
        <DataTable
          columns={stationColumns}
          data={stations}
          noPagination={false}
          pageIndex={stationPage - 1}
          pageSize={pageSize}
          pageCount={
            totalStations > 0 ? Math.ceil(totalStations / pageSize) : 0
          }
          canPreviousPage={stationPage > 1}
          canNextPage={totalStations > stationPage * pageSize}
          onPageChange={(newPageIndex) =>
            setStationPage(Number(newPageIndex) + 1)
          }
          isLoading={isLoading}
        />
      )}
    </CardContent>
  );
}
