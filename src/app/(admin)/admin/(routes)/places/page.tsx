// src/app/(admin)/admin/(routes)/places/page.tsx
"use client";

import { useState } from "react";

import { AlertTriangle, Loader2 } from "lucide-react";

import { APP_TEXT } from "@/data/ui-content";
import { usePlaces } from "@/hooks/use-places";
import { PlaceFilterFormData } from "@/schemas/place-schema";

import { PlacesHeaderSection } from "@/components/pages/admin/places/places-header-section";
import { PlacesListSection } from "@/components/pages/admin/places/places-list-section";
import { PlacesStatsSection } from "@/components/pages/admin/places/places-stats-section";

import { PlaceStatus } from "@/types/place";

export default function PlacesPage() {
  const [filterParams, setFilterParams] = useState<PlaceFilterFormData>({
    page: 1,
    page_size: 10,
    search_term: "",
    status: "all",
    type: "all",
    city: "",
    state: "",
    country: "",
  });

  const apiQueryParams: { [key: string]: unknown } = {
    page: filterParams.page,
    page_size: filterParams.page_size,
  };
  if (filterParams.search_term) {
    apiQueryParams.search_term = filterParams.search_term;
  }
  if (filterParams.status && filterParams.status !== "all") {
    apiQueryParams.status = filterParams.status;
  }
  if (filterParams.type && filterParams.type !== "all") {
    apiQueryParams.type = filterParams.type;
  }
  if (filterParams.city) {
    apiQueryParams.city = filterParams.city;
  }
  if (filterParams.state) {
    apiQueryParams.state = filterParams.state;
  }
  if (filterParams.country) {
    apiQueryParams.country = filterParams.country;
  }

  const {
    data: placesData,
    isLoading,
    error: listError,
  } = usePlaces(apiQueryParams);

  const {
    data: overallTotalPlacesData,
    isLoading: isLoadingOverallTotal,
    error: overallTotalError,
  } = usePlaces({
    count_only: true,
    customQueryKey: ["overallTotalPlacesData"],
  });

  const {
    data: activePlacesCountData,
    isLoading: isLoadingActivePlacesCount,
    error: activePlacesError,
  } = usePlaces({
    status: PlaceStatus.ACTIVE,
    count_only: true,
    customQueryKey: ["activePlacesCountData"],
  });

  const {
    data: inactivePlacesCountData,
    isLoading: isLoadingInactivePlacesCount,
    error: inactivePlacesError,
  } = usePlaces({
    status: PlaceStatus.INACTIVE,
    count_only: true,
    customQueryKey: ["inactivePlacesCountData"],
  });

  const places = placesData?.results?.features || [];
  const totalPlaces = overallTotalPlacesData?.count || 0;
  const activePlacesCount = activePlacesCountData?.count || 0;
  const inactivePlacesCount = inactivePlacesCountData?.count || 0;

  const handleFilterChange = (newFilters: Partial<PlaceFilterFormData>) => {
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
    isLoading ||
    isLoadingOverallTotal ||
    isLoadingActivePlacesCount ||
    isLoadingInactivePlacesCount;
  const overallError =
    listError || overallTotalError || activePlacesError || inactivePlacesError;

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
      <PlacesHeaderSection />

      <PlacesStatsSection
        totalPlaces={totalPlaces}
        activePlaces={activePlacesCount}
        inactivePlaces={inactivePlacesCount}
      />

      <PlacesListSection
        places={places}
        filterParams={filterParams}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        pagination={{
          count: placesData?.count || 0,
          total_count: placesData?.total_count || 0,
          next: placesData?.next ?? null,
          previous: placesData?.previous ?? null,
          page_size: filterParams.page_size,
          currentPage: filterParams.page,
        }}
      />
    </div>
  );
}
