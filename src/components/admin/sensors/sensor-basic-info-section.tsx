// src/components/pages/admin/sensors/sensor-basic-info-section.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { Sensor, SensorStatus, SensorType } from "@/types/sensor";
import {
  Calendar,
  Clock,
  CloudRain,
  Droplet,
  Gauge,
  Mail,
  Ruler,
  Text,
  Thermometer,
  Wind,
} from "lucide-react";

import {
  getSensorStatusLabel,
  getSensorTypeLabel,
  getUnitTypeLabel,
} from "@/schemas/sensor-schema";

interface SensorBasicInfoSectionProps {
  sensor: Sensor;
}

export function SensorBasicInfoSection({
  sensor,
}: SensorBasicInfoSectionProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const getStatusColor = (
    status: SensorStatus,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case SensorStatus.ACTIVE:
        return "default";
      case SensorStatus.INACTIVE:
        return "secondary";
      case SensorStatus.ERROR:
        return "destructive";
      default:
        return "outline";
    }
  };

  const getSensorTypeIcon = (type: SensorType) => {
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

  const SensorIconComponent = getSensorTypeIcon(sensor.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.SENSORS_PAGE.BASIC_INFO_TITLE ||
            "Informações Básicas do Sensor"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="text-lg">
              {SensorIconComponent && (
                <SensorIconComponent className="h-12 w-12 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{sensor.model}</h3>
          <p className="text-sm text-muted-foreground">
            {getSensorTypeLabel(sensor.type)}
          </p>
          <Badge variant={getStatusColor(sensor.status)} className="mt-2">
            {getSensorStatusLabel(sensor.status)}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Text className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {APP_TEXT.SENSORS_PAGE.MODEL_LABEL || "Modelo"}: {sensor.model}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {SensorIconComponent && (
              <SensorIconComponent className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm">
              {APP_TEXT.SENSORS_PAGE.SENSOR_TYPE_LABEL || "Tipo"}:{" "}
              {getSensorTypeLabel(sensor.type)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {APP_TEXT.SENSORS_PAGE.SENSOR_UNIT_LABEL || "Unidade"}:{" "}
              {getUnitTypeLabel(sensor.unit)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {APP_TEXT.SENSORS_PAGE.SENSOR_VALUE_RANGE_LABEL ||
                "Faixa de Valor"}
              : {sensor.min_value} - {sensor.max_value}{" "}
              {getUnitTypeLabel(sensor.unit)}
            </Badge>
          </div>
        </div>

        {sensor.user_username && (
          <div className="pt-4 border-t space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.SENSORS_PAGE.SENSOR_USER_LABEL ||
                    "Usuário Responsável"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sensor.user_username} (
                  {sensor.user_email || APP_TEXT.COMMON_UI.NOT_AVAILABLE})
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.SENSORS_PAGE.CREATED_AT_LABEL || "Criado em"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(sensor.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.SENSORS_PAGE.UPDATED_AT_LABEL || "Atualizado em"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(sensor.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
