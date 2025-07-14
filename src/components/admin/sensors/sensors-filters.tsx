// src/components/admin/sensors/sensors-filters.tsx
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
  SensorFilterFormData,
  getSensorStatusLabel,
  getSensorTypeLabel,
  getUnitTypeLabel,
} from "@/schemas/sensor-schema";
import type {
  SensorStatus as SensorStatusType,
  SensorType as SensorTypeType,
  UnitType as UnitTypeType,
} from "@/types/sensor";
import { SensorStatus, SensorType, UnitType } from "@/types/sensor";

interface SensorsFiltersProps {
  filterParams: SensorFilterFormData;
  onFilterChange: (newFilters: Partial<SensorFilterFormData>) => void;
}

export function SensorsFilters({
  filterParams,
  onFilterChange,
}: SensorsFiltersProps) {
  const [searchTermLocal, setSearchTermLocal] = useState(
    filterParams.search_term || "",
  );
  const [modelFilterLocal, setModelFilterLocal] = useState(
    filterParams.model || "",
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelFilterLocal(e.target.value);
  };
  const handleStatusFilterChange = (value: string) => {
    onFilterChange({ status: value as SensorStatusType | "all" });
  };

  const handleTypeFilterChange = (value: string) => {
    onFilterChange({ type: value as SensorTypeType | "all" });
  };

  const handleUnitFilterChange = (value: string) => {
    onFilterChange({ unit: value as UnitTypeType | "all" });
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
        placeholder={APP_TEXT.SENSORS_PAGE.SENSOR_MODEL_LABEL || "Modelo"}
        value={modelFilterLocal}
        onChange={handleModelChange}
        className="w-full sm:w-[160px]"
      />

      <Select
        value={filterParams.status?.toString()}
        onValueChange={handleStatusFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={APP_TEXT.SENSORS_PAGE.SENSOR_STATUS_LABEL || "Status"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.SENSORS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(SensorStatus)
            .filter((value) => typeof value === "number")
            .map((statusValue) => (
              <SelectItem
                key={statusValue.toString()}
                value={statusValue.toString()}
              >
                {getSensorStatusLabel(statusValue as SensorStatus)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        value={filterParams.type?.toString()}
        onValueChange={handleTypeFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={APP_TEXT.SENSORS_PAGE.SENSOR_TYPE_LABEL || "Tipo"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.SENSORS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(SensorType)
            .filter((value) => typeof value === "number")
            .map((typeValue) => (
              <SelectItem
                key={typeValue.toString()}
                value={typeValue.toString()}
              >
                {getSensorTypeLabel(typeValue as SensorType)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        value={filterParams.unit?.toString()}
        onValueChange={handleUnitFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={APP_TEXT.SENSORS_PAGE.SENSOR_UNIT_LABEL || "Unidade"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.SENSORS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(UnitType)
            .filter((value) => typeof value === "number")
            .map((unitValue) => (
              <SelectItem
                key={unitValue.toString()}
                value={unitValue.toString()}
              >
                {getUnitTypeLabel(unitValue as UnitType)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
