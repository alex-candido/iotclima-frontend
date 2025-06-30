// src/components/pages/admin/map-view/map-advanced-filters.tsx

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { getPlaceTypeLabel, PlaceTypeData } from "@/schemas/place-schema";
import { Place, PlaceType } from "@/types/place";
import { Station } from "@/types/station";
import { X } from "lucide-react";
import { useMemo } from "react";

import { MapFilterParams } from "@/types/map";

interface MapAdvancedFiltersProps {
  filterParams: MapFilterParams;
  onFilterChange: (newFilters: Partial<MapFilterParams>) => void;
  places: Place[];
  stations: Station[];
  isVisible: boolean;
  onToggleAdvancedFilters: (open: boolean) => void;
}

export function MapAdvancedFilters({
  filterParams,
  onFilterChange,
  places,
  stations,
  isVisible,
  onToggleAdvancedFilters,
}: MapAdvancedFiltersProps) {
  const regions = useMemo(() => {
    const allRegions = new Set<string>();
    places.forEach((place) => allRegions.add(place.properties.city));
    return Array.from(allRegions).map((region) => ({
      value: region,
      label: region,
    }));
  }, [places]);

  const sensorTypes = useMemo(() => {
    const allSensorTypes = new Set<string>();
    stations.forEach((station) => {
      station.sensors?.forEach((sensor) =>
        allSensorTypes.add(sensor.sensor_type_display),
      );
    });
    return Array.from(allSensorTypes).map((type) => ({
      value: type,
      label: type,
    }));
  }, [stations]);

  const alertLevels = useMemo(() => {
    return [
      { value: "low", label: "Baixo", color: "bg-green-500" },
      { value: "medium", label: "Médio", color: "bg-yellow-500" },
      { value: "high", label: "Alto", color: "bg-red-500" },
    ];
  }, []);

  const clearFilters = () => {
    onFilterChange({
      place_type: "all",
      station_status: "all",
      regions: [],
      sensorTypes: [],
      alertLevel: [],
      lastUpdate: "all",
      batteryLevel: [0, 100],
      temperature: [-10, 50],
      humidity: [0, 100],
      windSpeed: [0, 100],
    });
  };

  return (
    <Sheet open={isVisible} onOpenChange={onToggleAdvancedFilters}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
          <SheetDescription>
            Configure os filtros para personalizar a visualização do mapa
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 px-4">
          {/* Station Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Status da Estação</Label>
            <Select
              value={filterParams.station_status || "all"}
              onValueChange={(value) => onFilterChange({ station_status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Place Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo de Local</Label>
            <Select
              value={String(filterParams.place_type ?? "all")}
              onValueChange={(value) =>
                onFilterChange({ place_type: value as PlaceTypeData | "all" })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.values(PlaceType).map((type) => (
                  <SelectItem key={String(type)} value={String(type)}>
                    {getPlaceTypeLabel(type as PlaceTypeData)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sensor Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipos de Sensores</Label>
            <div className="grid grid-cols-1 gap-2">
              {sensorTypes.map((sensor) => (
                <div key={sensor.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sensor-${sensor.value}`}
                    checked={filterParams.sensorTypes?.includes(sensor.value)}
                    onCheckedChange={(checked) => {
                      const currentSensorTypes = filterParams.sensorTypes || [];
                      if (checked) {
                        onFilterChange({
                          sensorTypes: [...currentSensorTypes, sensor.value],
                        });
                      } else {
                        onFilterChange({
                          sensorTypes: currentSensorTypes.filter(
                            (s) => s !== sensor.value,
                          ),
                        });
                      }
                    }}
                  />
                  <Label
                    htmlFor={`sensor-${sensor.value}`}
                    className="flex items-center gap-2"
                  >
                    {sensor.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Levels */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Nível de Alerta</Label>
            <div className="grid grid-cols-1 gap-2">
              {alertLevels.map((alert) => (
                <div key={alert.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`alert-${alert.value}`}
                    checked={filterParams.alertLevel?.includes(alert.value)}
                    onCheckedChange={(checked) => {
                      const currentAlertLevels = filterParams.alertLevel || [];
                      if (checked) {
                        onFilterChange({
                          alertLevel: [...currentAlertLevels, alert.value],
                        });
                      } else {
                        onFilterChange({
                          alertLevel: currentAlertLevels.filter(
                            (a) => a !== alert.value,
                          ),
                        });
                      }
                    }}
                  />
                  <Label
                    htmlFor={`alert-${alert.value}`}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${alert.color}`}></div>
                    {alert.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Last Update */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Última Atualização</Label>
            <Select
              value={filterParams.lastUpdate || "all"}
              onValueChange={(value) => onFilterChange({ lastUpdate: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="1h">Última hora</SelectItem>
                <SelectItem value="6h">Últimas 6 horas</SelectItem>
                <SelectItem value="24h">Últimas 24 horas</SelectItem>
                <SelectItem value="offline">Mais de 24h (Offline)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Battery Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Nível da Bateria ({(filterParams.batteryLevel || [0, 100])[0]}% -{" "}
              {(filterParams.batteryLevel || [0, 100])[1]}%)
            </Label>
            <Slider
              value={filterParams.batteryLevel || [0, 100]}
              onValueChange={(value) =>
                onFilterChange({ batteryLevel: value as [number, number] })
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Temperature Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Temperatura ({(filterParams.temperature || [-10, 50])[0]}°C -{" "}
              {(filterParams.temperature || [-10, 50])[1]}°C)
            </Label>
            <Slider
              value={filterParams.temperature || [-10, 50]}
              onValueChange={(value) =>
                onFilterChange({ temperature: value as [number, number] })
              }
              max={50}
              min={-10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Humidity Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Umidade ({(filterParams.humidity || [0, 100])[0]}% -{" "}
              {(filterParams.humidity || [0, 100])[1]}%)
            </Label>
            <Slider
              value={filterParams.humidity || [0, 100]}
              onValueChange={(value) =>
                onFilterChange({ humidity: value as [number, number] })
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Wind Speed Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Velocidade do Vento ({(filterParams.windSpeed || [0, 100])[0]} -{" "}
              {(filterParams.windSpeed || [0, 100])[1]} km/h)
            </Label>
            <Slider
              value={filterParams.windSpeed || [0, 100]}
              onValueChange={(value) =>
                onFilterChange({ windSpeed: value as [number, number] })
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={clearFilters} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Limpar Todos os Filtros
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
