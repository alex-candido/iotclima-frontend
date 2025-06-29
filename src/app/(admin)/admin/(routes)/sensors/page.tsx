// src/app/(admin)/admin/(routes)/sensors/page.tsx
"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

import { APP_TEXT } from "@/data/ui-content";
import { useSensors } from "@/hooks/use-sensors";
import { SensorFilterFormData } from "@/schemas/sensor-schema";
import { SensorStatus } from "@/types/sensor";

import { SensorsHeaderSection } from "@/components/pages/admin/sensors/sensors-header-section";
import { SensorsListSection } from "@/components/pages/admin/sensors/sensors-list-section";
import { SensorsStatsSection } from "@/components/pages/admin/sensors/sensors-stats-section";

export default function SensorsPage() {
  const [filterParams, setFilterParams] = useState<SensorFilterFormData>({
    page: 1,
    page_size: 10,
    search_term: "",
    status: "all",
    type: "all",
    model: "",
    unit: "all",
  });

  const apiQueryParams: { [key: string]: unknown } = {
    page: filterParams.page,
    page_size: filterParams.page_size,
  };
  if (filterParams.search_term) {
    apiQueryParams.search_term = filterParams.search_term;
  }
  if (filterParams.status && filterParams.status !== "all") {
    apiQueryParams.status = parseInt(filterParams.status.toString());
  }
  if (filterParams.type && filterParams.type !== "all") {
    apiQueryParams.type = parseInt(filterParams.type.toString());
  }
  if (filterParams.model) {
    apiQueryParams.model = filterParams.model;
  }
  if (filterParams.unit && filterParams.unit !== "all") {
    apiQueryParams.unit = parseInt(filterParams.unit.toString());
  }

  const {
    data: sensorsData,
    isLoading,
    error: listError,
  } = useSensors(apiQueryParams);

  const {
    data: overallTotalSensorsData,
    isLoading: isLoadingOverallTotal,
    error: overallTotalError,
  } = useSensors({
    count_only: true,
    customQueryKey: ["overallTotalSensorsData"],
  });

  const {
    data: activeSensorsCountData,
    isLoading: isLoadingActiveSensorsCount,
    error: activeSensorsError,
  } = useSensors({
    status: SensorStatus.ACTIVE,
    count_only: true,
    customQueryKey: ["activeSensorsCountData"],
  });

  const {
    data: inactiveSensorsCountData,
    isLoading: isLoadingInactiveSensorsCount,
    error: inactiveSensorsError,
  } = useSensors({
    status: SensorStatus.INACTIVE,
    count_only: true,
    customQueryKey: ["inactiveSensorsCountData"],
  });

  const {
    data: errorSensorsCountData,
    isLoading: isLoadingErrorSensorsCount,
    error: errorSensorsError,
  } = useSensors({
    status: SensorStatus.ERROR,
    count_only: true,
    customQueryKey: ["errorSensorsCountData"],
  });

  const sensors = sensorsData?.results || [];
  const totalSensors = overallTotalSensorsData?.count || 0;
  const activeSensorsCount = activeSensorsCountData?.count || 0;
  const inactiveSensorsCount = inactiveSensorsCountData?.count || 0;
  const errorSensorsCount = errorSensorsCountData?.count || 0;

  const handleFilterChange = (newFilters: Partial<SensorFilterFormData>) => {
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
    isLoadingActiveSensorsCount ||
    isLoadingInactiveSensorsCount ||
    isLoadingErrorSensorsCount;
  const overallError =
    listError ||
    overallTotalError ||
    activeSensorsError ||
    inactiveSensorsError ||
    errorSensorsError;

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
      <SensorsHeaderSection />

      <SensorsStatsSection
        totalSensors={totalSensors}
        activeSensors={activeSensorsCount}
        inactiveSensors={inactiveSensorsCount}
        errorSensors={errorSensorsCount}
      />

      <SensorsListSection
        sensors={sensors}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        pagination={{
          count: sensorsData?.count || 0,
          total_count: sensorsData?.total_count || 0,
          next: sensorsData?.next ?? null,
          previous: sensorsData?.previous ?? null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
