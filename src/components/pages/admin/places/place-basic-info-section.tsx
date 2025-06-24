// src/components/pages/admin/places/place-basic-info-section.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TEXT } from "@/data/ui-content";
import { Place, PlaceStatus } from "@/types/place";
import { Calendar, Clock } from "lucide-react";

import { getPlaceStatusLabel, getPlaceTypeLabel } from "@/schemas/place-schema";

interface PlaceBasicInfoSectionProps {
  place: Place;
}

export function PlaceBasicInfoSection({ place }: PlaceBasicInfoSectionProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return APP_TEXT.COMMON_UI.NOT_APPLICABLE || "N/A";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {APP_TEXT.PLACES_PAGE.BASIC_INFO_TITLE ||
            "Informações Básicas do Local"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <p className="text-sm font-medium">
            {APP_TEXT.PLACES_PAGE.PLACE_NAME_LABEL || "Nome do Local"}:
          </p>
          <p className="text-xl font-bold">{place.properties.name}</p>
          {place.properties.description && (
            <p className="text-sm text-muted-foreground">
              {place.properties.description}
            </p>
          )}
        </div>

        <div className="grid gap-2 pt-4 border-t">
          <p className="text-sm font-medium">
            {APP_TEXT.PLACES_PAGE.PLACE_ADDRESS_LABEL || "Endereço"}:
          </p>
          <p className="text-sm text-muted-foreground">
            {place.properties.address}, {place.properties.city} -{" "}
            {place.properties.state}, {place.properties.country}
          </p>
        </div>

        <div className="grid gap-4 pt-4 border-t sm:grid-cols-2">
          <div className="grid gap-2">
            <p className="text-sm font-medium">
              {APP_TEXT.PLACES_PAGE.PLACE_STATUS_LABEL || "Status"}:
            </p>
            <Badge
              variant={
                place.properties.status === PlaceStatus.ACTIVE
                  ? "default"
                  : "secondary"
              }
            >
              {getPlaceStatusLabel(place.properties.status || "all")}{" "}
            </Badge>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">
              {APP_TEXT.PLACES_PAGE.PLACE_TYPE_LABEL || "Tipo"}:
            </p>
            <Badge variant="outline">
              {getPlaceTypeLabel(place.properties.type || "all")}{" "}
            </Badge>
          </div>
        </div>

        <div className="grid gap-2 pt-4 border-t">
          <p className="text-sm font-medium">
            {APP_TEXT.PLACES_PAGE.PLACE_LOCATION_LABEL || "Coordenadas"}:
          </p>{" "}
          <p className="text-sm text-muted-foreground">
            {APP_TEXT.PLACES_PAGE.PLACE_LATITUDE_LABEL || "Latitude"}:{" "}
            {place.geometry.coordinates[1]}
            <br />
            {APP_TEXT.PLACES_PAGE.PLACE_LONGITUDE_LABEL || "Longitude"}:{" "}
            {place.geometry.coordinates[0]}
          </p>
        </div>

        {place.properties.user_username && (
          <div className="grid gap-2 pt-4 border-t">
            <p className="text-sm font-medium">
              {APP_TEXT.PLACES_PAGE.PLACE_USER_LABEL || "Usuário Responsável"}:
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  {place.properties.user_username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{place.properties.user_username}</span>
              {place.properties.user_email && (
                <span className="text-xs text-muted-foreground">
                  ({place.properties.user_email})
                </span>
              )}
            </div>
          </div>
        )}

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.PLACES_PAGE.CREATED_AT_LABEL || "Criado em"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(place.properties.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {APP_TEXT.PLACES_PAGE.UPDATED_AT_LABEL || "Atualizado em"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(place.properties.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
