// src/components/pages/admin/station-sensors/station-sensors-list-section.tsx
"use client";

import { StationSensorsFilters } from "@/components/admin/station-sensors/station-sensors-filters";
import { StationSensorsTable } from "@/components/admin/station-sensors/station-sensors-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { APP_TEXT } from "@/data/ui-content";
import { StationSensorFilterFormData } from "@/schemas/station-sensor-schema";
import { StationSensor } from "@/types/station-sensor";

interface StationSensorsListSectionProps {
  stationSensors: StationSensor[];
  filterParams: StationSensorFilterFormData;
  onFilterChange: (newFilters: Partial<StationSensorFilterFormData>) => void;
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

export function StationSensorsListSection({
  stationSensors,
  filterParams,
  onFilterChange,
  onPageChange,
  pagination,
  isLoading,
}: StationSensorsListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.STATION_SENSORS_PAGE.LIST_TITLE || "Lista de Vínculos"}
        </CardTitle>
        <CardDescription>
          {APP_TEXT.STATION_SENSORS_PAGE.LIST_DESCRIPTION ||
            "Visualize e gerencie os vínculos entre estações e sensores."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StationSensorsFilters
          filterParams={filterParams}
          onFilterChange={onFilterChange}
        />
        <StationSensorsTable
          stationSensors={stationSensors}
          filterParams={filterParams}
          onPageChange={onPageChange}
          pagination={pagination}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
