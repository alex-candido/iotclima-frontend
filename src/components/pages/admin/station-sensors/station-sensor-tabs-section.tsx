// src/components/pages/admin/station-sensors/station-sensor-tabs-section.tsx
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_TEXT } from "@/data/ui-content";
import { StationSensor } from "@/types/station-sensor";

import { StationSensorEventsTab } from "@/components/pages/admin/station-sensors/station-sensor-events-tab";
import { StationSensorRecordsTab } from "@/components/pages/admin/station-sensors/station-sensor-records-tab";

interface StationSensorTabsSectionProps {
  stationSensor: StationSensor;
}

export function StationSensorTabsSection({
  stationSensor,
}: StationSensorTabsSectionProps) {
  return (
    <Tabs defaultValue="records" className="space-y-4">
      <TabsList>
        <TabsTrigger value="records">
          {APP_TEXT.STATION_SENSORS_PAGE.TAB_RECORDS || "Registros"}
        </TabsTrigger>
        <TabsTrigger value="events">
          {APP_TEXT.STATION_SENSORS_PAGE.TAB_EVENTS || "Eventos"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="records">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.STATION_SENSORS_PAGE.RECORDS_TITLE ||
                "Registros de Dados"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.STATION_SENSORS_PAGE.RECORDS_DESCRIPTION ||
                "Dados de medição relacionados a este sensor e estação."}
            </CardDescription>
          </CardHeader>
          <StationSensorRecordsTab
            stationId={stationSensor.station_id}
            sensorType={stationSensor.sensor_type_display}
          />
        </Card>
      </TabsContent>

      <TabsContent value="events">
        <Card>
          <CardHeader>
            <CardTitle>
              {APP_TEXT.STATION_SENSORS_PAGE.EVENTS_TITLE ||
                "Eventos Relacionados"}
            </CardTitle>
            <CardDescription>
              {APP_TEXT.STATION_SENSORS_PAGE.EVENTS_DESCRIPTION ||
                "Eventos gerados por este vínculo estação-sensor."}
            </CardDescription>
          </CardHeader>
          <StationSensorEventsTab stationSensorId={stationSensor.id} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
