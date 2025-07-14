// src/components/pages/admin/stations/stations-list-section.tsx
'use client';

import { StationsFilters } from '@/components/admin/stations/stations-filters';
import { StationsTable } from '@/components/admin/stations/stations-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { APP_TEXT } from "@/data/ui-content";
import { StationFilterFormData } from "@/schemas/station-schema";
import { Station } from "@/types/station";

interface StationsListSectionProps {
  stations: Station[];
  filterParams: StationFilterFormData;
  onFilterChange: (newFilters: Partial<StationFilterFormData>) => void;
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

export function StationsListSection({
  stations,
  filterParams,
  onFilterChange,
  onPageChange,
  pagination,
  isLoading,
}: StationsListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{APP_TEXT.STATIONS_PAGE.LIST_TITLE || "Lista de Estações"}</CardTitle>
        <CardDescription>{APP_TEXT.STATIONS_PAGE.LIST_DESCRIPTION || "Visualize e gerencie todas as estações meteorológicas."}</CardDescription>
      </CardHeader>
      <CardContent>
        <StationsFilters filterParams={filterParams} onFilterChange={onFilterChange} />
        <StationsTable
          stations={stations}
          filterParams={filterParams}
          onPageChange={onPageChange}
          pagination={pagination}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
