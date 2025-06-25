// src/components/admin/places/places-filters.tsx
"use client";

import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { APP_TEXT } from "@/data/ui-content";
import {
  PlaceFilterFormData,
  PlaceStatusData,
  PlaceTypeData,
  getPlaceStatusLabel,
  getPlaceTypeLabel,
} from "@/schemas/place-schema";
import { PlaceStatus, PlaceType } from "@/types/place";

interface PlacesFiltersProps {
  filterParams: PlaceFilterFormData;
  onFilterChange: (newFilters: Partial<PlaceFilterFormData>) => void;
}

export function PlacesFilters({
  filterParams,
  onFilterChange,
}: PlacesFiltersProps) {
  const [searchTermLocal, setSearchTermLocal] = useState(
    filterParams.search_term || "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTermLocal !== filterParams.search_term) {
        onFilterChange({ search_term: searchTermLocal });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTermLocal, onFilterChange, filterParams.search_term]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    onFilterChange({ status: value as PlaceStatusData | "all" });
  };

  const handleTypeFilterChange = (value: string) => {
    onFilterChange({ type: value as PlaceTypeData | "all" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
      <div className="relative flex-1 w-full sm:w-auto">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER || "Buscar..."}
          value={searchTermLocal}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>

      <Select
        value={filterParams.status?.toString()}
        onValueChange={handleStatusFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL || "Status do Local"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.PLACES_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(PlaceStatus).map((statusValue) => {
            if (typeof statusValue === "number") {
              return (
                <SelectItem
                  key={statusValue.toString()}
                  value={statusValue.toString()}
                >
                  {getPlaceStatusLabel(statusValue)}
                </SelectItem>
              );
            }
            return null;
          })}
        </SelectContent>
      </Select>

      <Select
        value={filterParams.type?.toString()}
        onValueChange={handleTypeFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL || "Tipo de Local"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.PLACES_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(PlaceType).map((typeValue) => {
            if (typeof typeValue === "number") {
              return (
                <SelectItem
                  key={typeValue.toString()}
                  value={typeValue.toString()}
                >
                  {getPlaceTypeLabel(typeValue)}
                </SelectItem>
              );
            }
            return null;
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
