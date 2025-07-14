// src/components/pages/admin/stations/stations-filters.tsx
'use client';

import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { APP_TEXT } from "@/data/ui-content";
import { StationFilterFormData, StationStatusData, StationStatusEnum, getStationStatusLabel } from "@/schemas/station-schema";
import { StationStatus } from '@/types/station';

interface StationsFiltersProps {
  filterParams: StationFilterFormData;
  onFilterChange: (newFilters: Partial<StationFilterFormData>) => void;
}

export function StationsFilters({ filterParams, onFilterChange }: StationsFiltersProps) {
  const [searchTermLocal, setSearchTermLocal] = useState(filterParams.search_term || "");
  const [modelFilterLocal, setModelFilterLocal] = useState(filterParams.model || "");
  const [firmwareFilterLocal, setFirmwareFilterLocal] = useState(filterParams.firmware || "");


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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (modelFilterLocal !== filterParams.model) {
        onFilterChange({ model: modelFilterLocal });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [modelFilterLocal, onFilterChange, filterParams.model]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (firmwareFilterLocal !== filterParams.firmware) {
        onFilterChange({ firmware: firmwareFilterLocal });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [firmwareFilterLocal, onFilterChange, filterParams.firmware]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelFilterLocal(e.target.value);
  };
  const handleFirmwareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirmwareFilterLocal(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    onFilterChange({ status: value as StationStatusData | "all" });
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
      
      <Input
        placeholder={APP_TEXT.STATIONS_PAGE.MODEL_LABEL || "Modelo"}
        value={modelFilterLocal}
        onChange={handleModelChange}
        className="w-full sm:w-[160px]"
      />
      <Input
        placeholder={APP_TEXT.STATIONS_PAGE.FIRMWARE_LABEL || "Firmware"}
        value={firmwareFilterLocal}
        onChange={handleFirmwareChange}
        className="w-full sm:w-[160px]"
      />

      <Select value={filterParams.status?.toString()} onValueChange={handleStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder={APP_TEXT.STATIONS_PAGE.STATUS_LABEL || "Status"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{APP_TEXT.STATIONS_PAGE.ROLE_FILTER_ALL || "Todas"}</SelectItem>
          {Object.values(StationStatus).map((statusValue) => {
            if (typeof statusValue === 'number') {
              return (
                <SelectItem key={statusValue.toString()} value={statusValue.toString()}>
                  {getStationStatusLabel(statusValue)}
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
