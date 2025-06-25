// src/app/(admin)/admin/(routes)/stations/page.tsx
'use client';

import { useState } from "react";

import { Loader2, AlertTriangle } from "lucide-react";

import { APP_TEXT } from "@/data/ui-content";
import { useStations } from "@/hooks/use-stations";
import { StationFilterFormData } from "@/schemas/station-schema"; 
import { StationsHeaderSection } from "@/components/pages/admin/stations/stations-header-section";
import { StationsStatsSection } from "@/components/pages/admin/stations/stations-stats-section";
import { StationsListSection } from "@/components/pages/admin/stations/stations-list-section";

import { StationStatus } from '@/types/station';

export default function StationsPage() {
  const [filterParams, setFilterParams] = useState<StationFilterFormData>({
    page: 1,
    page_size: 10,
    search_term: "",
    status: "all",  
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
  if (filterParams.model) {
    apiQueryParams.model = filterParams.model;
  }
  if (filterParams.firmware) {
    apiQueryParams.firmware = filterParams.firmware;
  }


  const { data: stationsData, isLoading, error: listError } = useStations(apiQueryParams);

  const { data: overallTotalStationsData, isLoading: isLoadingOverallTotal, error: overallTotalError } = useStations({
    count_only: true,
    customQueryKey: ['overallTotalStationsData'],
  });

  const { data: activeStationsCountData, isLoading: isLoadingActiveStationsCount, error: activeStationsError } = useStations({
    status: StationStatus.ACTIVE, 
    count_only: true,
    customQueryKey: ['activeStationsCountData'],
  });

  const { data: inactiveStationsCountData, isLoading: isLoadingInactiveStationsCount, error: inactiveStationsError } = useStations({
    status: StationStatus.INACTIVE,
    count_only: true,
    customQueryKey: ['inactiveStationsCountData'],
  });

  const { data: onlineStationsCountData, isLoading: isLoadingOnlineStationsCount, error: onlineStationsError } = useStations({
    status: StationStatus.ONLINE,
    count_only: true,
    customQueryKey: ['onlineStationsCountData'], 
  });


  const stations = stationsData?.results || [];
  const totalStations = overallTotalStationsData?.count || 0;
  const activeStationsCount = activeStationsCountData?.count || 0;
  const inactiveStationsCount = inactiveStationsCountData?.count || 0;
  const onlineStationsCount = onlineStationsCountData?.count || 0;


  const handleFilterChange = (newFilters: Partial<StationFilterFormData>) => {
    setFilterParams(prevParams => ({
      ...prevParams,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams(prevParams => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const overallLoading = isLoading || isLoadingOverallTotal || isLoadingActiveStationsCount || isLoadingInactiveStationsCount || isLoadingOnlineStationsCount;
  const overallError = listError || overallTotalError || activeStationsError || inactiveStationsError || onlineStationsError;

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
      <StationsHeaderSection />

      <StationsStatsSection
        totalStations={totalStations}
        activeStations={activeStationsCount}
        inactiveStations={inactiveStationsCount}
        onlineStations={onlineStationsCount} 
      />

      <StationsListSection
        stations={stations}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        pagination={{
          count: stationsData?.count || 0,
          total_count: stationsData?.total_count || 0,
          next: stationsData?.next ?? null,
          previous: stationsData?.previous ?? null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
