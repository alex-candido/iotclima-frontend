// src/components/pages/admin/stations/station-tabs-section.tsx
"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_TEXT } from "@/data/ui-content";
import { Station } from "@/types/station";

import { StationDataLogTab } from "@/components/admin/stations/station-data-log-tab";
import { StationDataRecordsTab } from "@/components/admin/stations/station-data-records-tab";
import { StationSensorsTab } from "@/components/admin/stations/station-sensors-tab";

interface StationTabsSectionProps {
  station: Station;
}

export function StationTabsSection({ station }: StationTabsSectionProps) {
  return (
    <Tabs defaultValue="sensors" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sensors">
          {APP_TEXT.STATIONS_PAGE.TAB_SENSORS || "Sensores"}
        </TabsTrigger>
        <TabsTrigger value="data-records">
          {APP_TEXT.STATIONS_PAGE.TAB_DATA_RECORDS || "Registros de Dados"}
        </TabsTrigger>
        <TabsTrigger value="data-log">
          {APP_TEXT.STATIONS_PAGE.TAB_DATA_LOG || "Logs da Estação"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sensors">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.STATIONS_PAGE.ASSOCIATED_SENSORS_TITLE ||
                "Sensores Associados"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.STATIONS_PAGE.ASSOCIATED_SENSORS_DESCRIPTION ||
                "Sensores conectados a esta estação."}
            </CardDescription>
          </CardHeader>
          <StationSensorsTab stationId={station.id} />
        </Card>
      </TabsContent>

      <TabsContent value="data-records">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.STATIONS_PAGE.DATA_RECORDS_TITLE ||
                "Registros de Dados Históricos"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.STATIONS_PAGE.DATA_RECORDS_DESCRIPTION ||
                "Dados de medição coletados por esta estação."}
            </CardDescription>
          </CardHeader>
          <StationDataRecordsTab stationId={station.id} />
        </Card>
      </TabsContent>

      <TabsContent value="data-log">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.STATIONS_PAGE.DATA_LOG_TITLE || "Logs da Estação"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.STATIONS_PAGE.DATA_LOG_DESCRIPTION ||
                "Logs de eventos e operações da estação."}
            </CardDescription>
          </CardHeader>
          <StationDataLogTab stationId={station.id} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
