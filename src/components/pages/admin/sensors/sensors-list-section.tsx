// src/components/pages/admin/sensors/sensors-list-section.tsx
"use client";

import { SensorsFilters } from "@/components/pages/admin/sensors/sensors-filters";
import { SensorsTable } from "@/components/pages/admin/sensors/sensors-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_TEXT } from "@/data/ui-content";
import { SensorFilterFormData } from "@/schemas/sensor-schema";
import { Sensor } from "@/types/sensor";

interface SensorsListSectionProps {
  sensors: Sensor[];
  filterParams: SensorFilterFormData;
  onFilterChange: (newFilters: Partial<SensorFilterFormData>) => void;
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

export function SensorsListSection({
  sensors,
  filterParams,
  onFilterChange,
  onPageChange,
  pagination,
  isLoading,
}: SensorsListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.SENSORS_PAGE.LIST_TITLE || "Lista de Sensores"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.SENSORS_PAGE.LIST_DESCRIPTION ||
            "Visualize e gerencie todos os sensores."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SensorsFilters
          filterParams={filterParams}
          onFilterChange={onFilterChange}
        />
        <SensorsTable
          sensors={sensors}
          filterParams={filterParams}
          onPageChange={onPageChange}
          pagination={pagination}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
