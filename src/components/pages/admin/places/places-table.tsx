// src/components/admin/places/places-table.tsx
"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

import { DataTable } from "@/components/base/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { PlaceFilterFormData } from "@/schemas/place-schema";
import { Place, PlaceStatus } from "@/types/place";

interface PlacesTableProps {
  places: Place[];
  filterParams: PlaceFilterFormData;
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

const columnHelper = createColumnHelper<Place>();

const placeColumns: ColumnDef<Place, any>[] = [
  columnHelper.accessor("properties.name", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_NAME || "Nome",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-sm text-muted-foreground font-mono">
          {info.row.original.properties.uuid}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("properties.city", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_CITY || "Cidade",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor("properties.state", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_STATE || "Estado",
    cell: (info) => <div className="text-sm">{info.getValue()}</div>,
  }),
  columnHelper.accessor("properties.status_display", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_STATUS || "Status",
    cell: (info) => {
      const statusValue = info.row.original.properties.status;
      const statusLabel = info.getValue() as string;
      const statusColor =
        statusValue === PlaceStatus.ACTIVE ? "default" : "secondary";
      return <Badge variant={statusColor}>{statusLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("properties.type_display", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_TYPE || "Tipo",
    cell: (info) => {
      const typeLabel = info.getValue() as string;
      const typeColor = "outline";
      return <Badge variant={typeColor}>{typeLabel}</Badge>;
    },
    enableSorting: false,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("properties.created_at", {
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_CREATED_AT || "Criado em",
    cell: (info) => (
      <div className="text-sm">
        {new Date(info.getValue()).toLocaleDateString("pt-BR")}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => APP_TEXT.PLACES_PAGE.TABLE_HEADER_ACTIONS || "Ações",
    cell: (props) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={APP_ROUTES.ADMIN.PLACES.DETAIL(
              props.row.original.properties.uuid,
            )}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={APP_ROUTES.ADMIN.PLACES.EDIT(
              props.row.original.properties.uuid,
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

export function PlacesTable({
  places,
  filterParams,
  onPageChange,
  pagination,
  isLoading,
}: PlacesTableProps) {
  const pageCount =
    pagination.total_count > 0
      ? Math.ceil(pagination.total_count / pagination.page_size)
      : 0;

  return (
    <DataTable
      columns={placeColumns}
      data={places}
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
