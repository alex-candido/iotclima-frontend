// src/components/pages/admin/station-sensors/station-sensor-basic-info-section.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { StationSensor } from "@/types/station-sensor";
import {
  Calendar,
  Clock,
  CloudRain,
  Droplet,
  Factory,
  Gauge,
  Text,
  Thermometer,
  Wind,
} from "lucide-react";

import { getSensorTypeLabel } from "@/schemas/sensor-schema";
import { SensorType } from "@/types/sensor";

interface StationSensorBasicInfoSectionProps {
  stationSensor: StationSensor;
}

export function StationSensorBasicInfoSection({
  stationSensor,
}: StationSensorBasicInfoSectionProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const getSensorDisplayIcon = (type: SensorType) => {
    switch (type) {
      case SensorType.TEMPERATURE:
        return Thermometer;
      case SensorType.HUMIDITY:
        return Droplet;
      case SensorType.WIND:
        return Wind;
      case SensorType.PRESSURE:
        return Gauge;
      case SensorType.RAINFALL:
        return CloudRain;
      default:
        return Text;
    }
  };
  const SensorIconComponent = getSensorDisplayIcon(
    stationSensor.sensor_id as SensorType,
  );

  const getIsActiveColor = (
    isActive: boolean,
  ): "default" | "secondary" | "destructive" | "outline" => {
    return isActive ? "default" : "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.STATION_SENSORS_PAGE.BASIC_INFO_TITLE ||
            "Informações do Vínculo"}
        </CardTitle>{" "}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <p className="text-sm font-medium">
            {APP_TEXT.STATION_SENSORS_PAGE.STATION_LABEL || "Estação Associada"}
            :
          </p>{" "}
          <div className="flex items-center gap-2">
            <Factory className="h-4 w-4 text-muted-foreground" />{" "}
            <span className="text-base font-bold">
              {stationSensor.station_name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            ({stationSensor.station_model})
          </p>
          <p className="text-xs text-muted-foreground">
            {stationSensor.station_uuid}
          </p>
        </div>

        <div className="grid gap-2 pt-4 border-t">
          <p className="text-sm font-medium">
            {APP_TEXT.STATION_SENSORS_PAGE.SENSOR_LABEL || "Sensor Associado"}:
          </p>{" "}
          <div className="flex items-center gap-2">
            {SensorIconComponent && (
              <SensorIconComponent className="h-4 w-4 text-primary" />
            )}
            <span className="text-base font-bold">
              {stationSensor.sensor_model}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            ({getSensorTypeLabel(stationSensor.sensor_id as SensorType)})
          </p>{" "}
          <p className="text-xs text-muted-foreground">
            {stationSensor.sensor_uuid}
          </p>
        </div>

        <div className="grid gap-2 pt-4 border-t">
          <p className="text-sm font-medium">
            {APP_TEXT.STATION_SENSORS_PAGE.POSITION_LABEL || "Posição"}:
          </p>
          <p className="text-sm text-muted-foreground">
            {stationSensor.position ||
              APP_TEXT.COMMON_UI.NOT_APPLICABLE ||
              "N/A"}
          </p>
        </div>

        <div className="grid gap-2 pt-4 border-t">
          <p className="text-sm font-medium">
            {APP_TEXT.STATION_SENSORS_PAGE.STATUS_LABEL || "Status do Vínculo"}:
          </p>{" "}
          <Badge variant={getIsActiveColor(stationSensor.is_active)}>
            {stationSensor.is_active
              ? APP_TEXT.COMMON_UI.STATUS_ACTIVE || "Ativo"
              : APP_TEXT.COMMON_UI.STATUS_INACTIVE || "Inativo"}
          </Badge>
        </div>

        {stationSensor.calibrated_at && (
          <div className="grid gap-2 pt-4 border-t">
            <p className="text-sm font-medium">
              {APP_TEXT.STATION_SENSORS_PAGE.CALIBRATED_AT_LABEL ||
                "Calibrado em"}
              :
            </p>{" "}
            <p className="text-sm text-muted-foreground">
              {formatDate(stationSensor.calibrated_at)}
            </p>
          </div>
        )}

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATION_SENSORS_PAGE.INSTALLED_DATE_LABEL ||
                  "Instalado em"}
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {formatDate(stationSensor.installed_date)}
              </p>
            </div>
          </div>
          {stationSensor.removed_date && (
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.STATION_SENSORS_PAGE.REMOVED_DATE_LABEL ||
                    "Removido em"}
                </p>{" "}
                <p className="text-sm text-muted-foreground">
                  {formatDate(stationSensor.removed_date)}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATION_SENSORS_PAGE.CREATED_AT_LABEL || "Criado em"}:
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {formatDate(stationSensor.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATION_SENSORS_PAGE.UPDATED_AT_LABEL ||
                  "Atualizado em"}
                :
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {formatDate(stationSensor.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
