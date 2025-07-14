// src/components/pages/admin/stations/station-basic-info-section.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { Station, StationStatus } from "@/types/station";
import {
  BatteryCharging,
  Calendar,
  Clock,
  Cloud,
  Mail,
  MapPin,
  Settings,
  Wifi,
} from "lucide-react";

import { getStationStatusLabel } from "@/schemas/station-schema";

interface StationBasicInfoSectionProps {
  station: Station;
}

export function StationBasicInfoSection({
  station,
}: StationBasicInfoSectionProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  let statusColor: "default" | "secondary" | "destructive" | "outline" =
    "outline";
  if (
    station.status === StationStatus.ACTIVE ||
    station.status === StationStatus.ONLINE
  )
    statusColor = "default";
  else if (
    station.status === StationStatus.OFFLINE ||
    station.status === StationStatus.MAINTENANCE
  )
    statusColor = "secondary";
  else if (station.status === StationStatus.INACTIVE)
    statusColor = "destructive";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.STATIONS_PAGE.BASIC_INFO_TITLE ||
            "Informações Básicas da Estação"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="text-lg">
              <Cloud className="h-12 w-12 text-primary" />{" "}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{station.name}</h3>
          <p className="text-sm text-muted-foreground">{station.model}</p>
          <Badge variant={statusColor} className="mt-2">
            {getStationStatusLabel(station.status)}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {APP_TEXT.STATIONS_PAGE.FIRMWARE_LABEL || "Firmware"}:{" "}
              {station.firmware || APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A"}
            </span>
          </div>
          {station.battery_level !== null &&
            station.battery_level !== undefined && (
              <div className="flex items-center gap-3">
                <BatteryCharging className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {APP_TEXT.STATIONS_PAGE.BATTERY_LEVEL_LABEL || "Bateria"}:{" "}
                  {station.battery_level}%
                </span>
              </div>
            )}
          {station.signal_strength !== null &&
            station.signal_strength !== undefined && (
              <div className="flex items-center gap-3">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {APP_TEXT.STATIONS_PAGE.SIGNAL_STRENGTH_LABEL || "Sinal"}:{" "}
                  {station.signal_strength}%
                </span>
              </div>
            )}
          {station.description && (
            <div className="pt-4 border-t space-y-2">
              <p className="text-sm font-medium">
                {APP_TEXT.STATIONS_PAGE.DESCRIPTION_LABEL || "Descrição"}:
              </p>
              <p className="text-sm text-muted-foreground">
                {station.description}
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Local"}:
              </p>
              <p className="text-sm text-muted-foreground">
                {station.place_name} ({station.place_city})
              </p>
            </div>
          </div>
          {station.user_username && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.PLACES_PAGE.PLACE_USER_LABEL || "Responsável"}:
                </p>{" "}
                <p className="text-sm text-muted-foreground">
                  {station.user_username} ({station.user_email})
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATIONS_PAGE.INSTALLED_AT_LABEL || "Instalado em"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(station.installed_at)}
              </p>
            </div>
          </div>
          {station.last_maintenance_at && (
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.STATIONS_PAGE.LAST_MAINTENANCE_LABEL ||
                    "Última Manutenção"}
                </p>{" "}
                <p className="text-sm text-muted-foreground">
                  {formatDate(station.last_maintenance_at)}
                </p>
              </div>
            </div>
          )}
          {station.next_maintenance_at && (
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {APP_TEXT.STATIONS_PAGE.NEXT_MAINTENANCE_LABEL ||
                    "Próxima Manutenção"}
                </p>{" "}
                <p className="text-sm text-muted-foreground">
                  {formatDate(station.next_maintenance_at)}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATIONS_PAGE.CREATED_AT_LABEL || "Criado em"}
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {formatDate(station.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.STATIONS_PAGE.UPDATED_AT_LABEL || "Atualizado em"}
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {formatDate(station.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
