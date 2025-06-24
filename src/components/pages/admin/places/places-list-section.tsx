// src/components/pages/admin/places/places-list-section.tsx
"use client";

import { PlacesFilters } from "@/components/pages/admin/places/places-filters";
import { PlacesTable } from "@/components/pages/admin/places/places-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_TEXT } from "@/data/ui-content";
import { PlaceFilterFormData } from "@/schemas/place-schema";
import { Place } from "@/types/place";

interface PlacesListSectionProps {
  places: Place[];
  filterParams: PlaceFilterFormData;
  onFilterChange: (newFilters: Partial<PlaceFilterFormData>) => void;
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

export function PlacesListSection({
  places,
  filterParams,
  onFilterChange,
  onPageChange,
  pagination,
  isLoading,
}: PlacesListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.PLACES_PAGE.LIST_TITLE || "Lista de Locais"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.PLACES_PAGE.LIST_DESCRIPTION ||
            "Visualize e gerencie todos os locais."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlacesFilters
          filterParams={filterParams}
          onFilterChange={onFilterChange}
        />

        <PlacesTable
          places={places}
          filterParams={filterParams}
          onPageChange={onPageChange}
          pagination={pagination}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
