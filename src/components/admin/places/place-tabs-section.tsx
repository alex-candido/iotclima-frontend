// src/components/pages/admin/places/place-tabs-section.tsx
"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_TEXT } from "@/data/ui-content";
import { Place } from "@/types/place";

import { PlaceMapTab } from "@/components/admin/places/place-map-tab";
import { PlaceStationsTab } from "@/components/admin/places/place-stations-tab";

interface PlaceTabsSectionProps {
  place: Place;
}

export function PlaceTabsSection({ place }: PlaceTabsSectionProps) {
  return (
    <Tabs defaultValue="map" className="space-y-4">
      <TabsList>
        <TabsTrigger value="map">
          {APP_TEXT.PLACES_PAGE.TAB_MAP || "Mapa"}
        </TabsTrigger>{" "}
        <TabsTrigger value="stations">
          {APP_TEXT.PLACES_PAGE.TAB_STATIONS || "Estações Associadas"}
        </TabsTrigger>{" "}
      </TabsList>

      <TabsContent value="map">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.PLACES_PAGE.MAP_VIEW_TITLE || "Visualização no Mapa"}
            </CardTitle>{" "}
            <CardDescription>
              {APP_TEXT.PLACES_PAGE.MAP_VIEW_DESCRIPTION ||
                "Localização do ponto de instalação."}
            </CardDescription>{" "}
          </CardHeader>
          <PlaceMapTab place={place} />
        </Card>
      </TabsContent>

      <TabsContent value="stations">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.PLACES_PAGE.ASSOCIATED_STATIONS_TITLE ||
                "Estações Associadas"}
            </CardTitle>{" "}
            <CardDescription>
              {APP_TEXT.PLACES_PAGE.ASSOCIATED_STATIONS_DESCRIPTION ||
                "Estações meteorológicas vinculadas a este local."}
            </CardDescription>{" "}
          </CardHeader>
          <PlaceStationsTab placeId={place.id} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
