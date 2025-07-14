// src/app/(admin)/admin/(routes)/station-sensors/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

import { APP_TEXT } from "@/data/ui-content";
import { useStationSensors } from "@/hooks/use-station-sensor";
import { StationSensorFilterFormData } from "@/schemas/station-sensor-schema";

import { StationSensorsHeaderSection } from "@/components/admin/station-sensors/station-sensors-header-section";
import { StationSensorsListSection } from "@/components/admin/station-sensors/station-sensors-list-section";
import { StationSensorsStatsSection } from "@/components/admin/station-sensors/station-sensors-stats-section";

export default function StationSensorsPage() {
  const [filterParams, setFilterParams] = useState<StationSensorFilterFormData>(
    {
      page: 1,
      page_size: 10,
      status: "all",
      type: "all",
      is_active: "all",
      station_id: "all",
      sensor_id: "all",
    },
  );

  const apiQueryParams: { [key: string]: unknown } = {
    page: filterParams.page,
    page_size: filterParams.page_size,
  };
  if (filterParams.search_term) {
    apiQueryParams.search_term = filterParams.search_term;
  }
  if (filterParams.is_active !== "all") {
    apiQueryParams.is_active = filterParams.is_active.toString();
  }
  if (filterParams.station_id && filterParams.station_id !== "all") {
    apiQueryParams.station_id = parseInt(filterParams.station_id.toString());
  }
  if (filterParams.sensor_id && filterParams.sensor_id !== "all") {
    apiQueryParams.sensor_id = parseInt(filterParams.sensor_id.toString());
  }

  const {
    data: stationSensorsData,
    isLoading,
    error: listError,
  } = useStationSensors(apiQueryParams);

  const {
    data: overallTotalStationSensorsData,
    isLoading: isLoadingOverallTotal,
    error: overallTotalError,
  } = useStationSensors({
    count_only: true,
    customQueryKey: ["overallTotalStationSensorsData"],
  });

  const {
    data: activeStationSensorsCountData,
    isLoading: isLoadingActiveStationSensorsCount,
    error: activeStationSensorsError,
  } = useStationSensors({
    is_active: true,
    count_only: true,
    customQueryKey: ["activeStationSensorsCountData"],
  });

  const {
    data: inactiveStationSensorsCountData,
    isLoading: isLoadingInactiveStationSensorsCount,
    error: inactiveStationSensorsError,
  } = useStationSensors({
    is_active: false,
    count_only: true,
    customQueryKey: ["inactiveStationSensorsCountData"],
  });

  const stationSensors = stationSensorsData?.results || [];
  const totalStationSensors = overallTotalStationSensorsData?.count || 0;
  const activeStationSensorsCount = activeStationSensorsCountData?.count || 0;
  const inactiveStationSensorsCount =
    inactiveStationSensorsCountData?.count || 0;

  const handleFilterChange = (
    newFilters: Partial<StationSensorFilterFormData>,
  ) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const overallLoading =
    isLoadingOverallTotal ||
    isLoadingActiveStationSensorsCount ||
    isLoadingInactiveStationSensorsCount;
  const overallError =
    listError ||
    overallTotalError ||
    activeStationSensorsError ||
    inactiveStationSensorsError;

  if (overallLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{APP_TEXT.COMMON_UI.LOADING_DATA}</span>
      </div>
    );
  }

  if (overallError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="h-8 w-8" />
        <span className="mt-2">{APP_TEXT.COMMON_UI.ERROR_LOADING_DATA}</span>
        <p className="text-sm">
          {overallError.message || String(overallError)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StationSensorsHeaderSection />

      <StationSensorsStatsSection
        totalStationSensors={totalStationSensors}
        activeStationSensors={activeStationSensorsCount}
        inactiveStationSensors={inactiveStationSensorsCount}
      />

      <StationSensorsListSection
        stationSensors={stationSensors}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        pagination={{
          count: stationSensorsData?.count || 0,
          total_count: stationSensorsData?.total_count || 0,
          next: stationSensorsData?.next ?? null,
          previous: stationSensorsData?.previous ?? null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
