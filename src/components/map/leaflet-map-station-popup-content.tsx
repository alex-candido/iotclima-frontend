// src/components/map/leaflet-map-station-popup-content.tsx

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppEvent } from "@/types/app-event";
import { Record } from "@/types/record";
import { Station } from "@/types/station";

import {
  getEventSeverityColorClass,
  getEventSeverityLabel,
  getStationStatusColorClass,
  getStationStatusLabel,
} from "@/lib/maps-helpers.tsx";

interface LeafletMapStationPopupContentProps {
  station: Station;
  records: Record[] | null;
  events: AppEvent[] | null;
}

export const LeafletMapStationPopupContent = ({
  station,
  records,
  events,
}: LeafletMapStationPopupContentProps) => {
  const formatLastUpdate = (lastUpdate?: string) => {
    if (!lastUpdate) return "N/A";
    const date = new Date(lastUpdate);
    if (isNaN(date.getTime())) return "N/A";

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes}m atrás`;
    if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m atrás`;
    }

    return date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const latestRecord = records?.[0] ?? null;
  const mostSevereAppEvent =
    events?.length ? events.reduce((a, b) => (a.severity > b.severity ? a : b)) : null;

  return (
    <Card className="min-w-[321px] border-none shadow-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-semibold">{station.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge className={getStationStatusColorClass(station.status)}>
            {getStationStatusLabel(station.status)}
          </Badge>
          {mostSevereAppEvent && (
            <Badge className={getEventSeverityColorClass(mostSevereAppEvent.severity)}>
              {getEventSeverityLabel(mostSevereAppEvent.severity)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-xs">{station.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Temp:</span>
              <span className="font-medium">
                {latestRecord?.temperature != null
                  ? `${latestRecord.temperature}°C`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Umid:</span>
              <span className="font-medium">
                {latestRecord?.humidity != null
                  ? `${latestRecord.humidity}%`
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Vento:</span>
              <span className="font-medium">
                {latestRecord?.wind_speed != null
                  ? `${latestRecord.wind_speed} km/h`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bat:</span>
              <span className="font-medium">
                {station.battery_level != null
                  ? `${station.battery_level}%`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-muted-foreground">Atualiz:</span>
              <span className="font-medium text-xs">
                {formatLastUpdate(latestRecord?.recorded_at || station.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="!mt-0">
        <p className="text-xs pt-4 border-t text-muted-foreground text-center w-full">
          Clique no marcador para ver detalhes
        </p>
      </CardFooter>
    </Card>
  );
};
