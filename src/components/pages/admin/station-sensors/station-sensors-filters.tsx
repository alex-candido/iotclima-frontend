// src/components/admin/station-sensors/station-sensors-filters.tsx
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
import { StationSensorFilterFormData } from "@/schemas/station-sensor-schema";

import { useSensors } from "@/hooks/use-sensors";
import { useStations } from "@/hooks/use-stations";
import { getSensorTypeLabel } from "@/schemas/sensor-schema";
import { Sensor } from "@/types/sensor";
import { Station } from "@/types/station";
interface StationSensorsFiltersProps {
  filterParams: StationSensorFilterFormData;
  onFilterChange: (newFilters: Partial<StationSensorFilterFormData>) => void;
}

export function StationSensorsFilters({
  filterParams,
  onFilterChange,
}: StationSensorsFiltersProps) {
  const [searchTermLocal, setSearchTermLocal] = useState(
    filterParams.search_term || "",
  );

  const { data: stationsData, isLoading: isLoadingStations } = useStations({
    page_size: 100,
    customQueryKey: ["allStationsForFilter"],
  });
  const availableStations = stationsData?.results || [];

  const { data: sensorsData, isLoading: isLoadingSensors } = useSensors({
    page_size: 100,
    customQueryKey: ["allSensorsForFilter"],
  });
  const availableSensors = sensorsData?.results || [];

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

  const handleStationFilterChange = (value: string) => {
    onFilterChange({
      station_id: value as StationSensorFilterFormData["station_id"],
    });
  };

  const handleSensorFilterChange = (value: string) => {
    onFilterChange({
      sensor_id: value as StationSensorFilterFormData["sensor_id"],
    });
  };

  const handleIsActiveFilterChange = (value: string) => {
    const isActiveValue =
      value === "true" ? true : value === "false" ? false : "all";
    onFilterChange({
      is_active: isActiveValue as StationSensorFilterFormData["is_active"],
    });
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
        value={filterParams.station_id?.toString() || "all"}
        onValueChange={handleStationFilterChange}
        disabled={isLoadingStations}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.STATION_FILTER_PLACEHOLDER ||
              "Filtrar por Estação"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.STATION_SENSORS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {availableStations.map((station: Station) => (
            <SelectItem
              key={station.id.toString()}
              value={station.id.toString()}
            >
              {station.name} ({station.model})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterParams.sensor_id?.toString() || "all"}
        onValueChange={handleSensorFilterChange}
        disabled={isLoadingSensors}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.SENSOR_FILTER_PLACEHOLDER ||
              "Filtrar por Sensor"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.STATION_SENSORS_PAGE.ROLE_FILTER_ALL || "Todos"}
          </SelectItem>
          {availableSensors.map((sensor: Sensor) => (
            <SelectItem key={sensor.id.toString()} value={sensor.id.toString()}>
              {sensor.model} ({getSensorTypeLabel(sensor.type)})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterParams.is_active?.toString() || "all"}
        onValueChange={handleIsActiveFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.STATION_SENSORS_PAGE.ACTIVE_FILTER_PLACEHOLDER ||
              "Vínculo Ativo"
            }
          />{" "}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.STATION_SENSORS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          <SelectItem value="true">
            {APP_TEXT.COMMON_UI.STATUS_ACTIVE || "Ativo"}
          </SelectItem>
          <SelectItem value="false">
            {APP_TEXT.COMMON_UI.STATUS_INACTIVE || "Inativo"}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
