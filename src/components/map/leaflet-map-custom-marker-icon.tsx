import { AppEvent, AppEventSeverity } from "@/types/app-event";
import { Station, StationStatus } from "@/types/station";
import L from "leaflet";
import { AlertTriangle, BatteryWarning } from "lucide-react";
import ReactDOMServer from "react-dom/server";

import {
  getEventSeverityColorClass,
  getStationStatusColorClass
} from "@/lib/maps-helpers";

interface LeafletMapCustomMarkerIconProps {
  station: Station;
  events: AppEvent[] | null;
}

export const LeafletMapCustomMarkerIcon = ({
  station,
  events,
}: LeafletMapCustomMarkerIconProps) => {
  const mostSevereAppEvent =
    events?.length ? events.reduce((a, b) => (a.severity > b.severity ? a : b)) : null;

  const stationStatusClass = getStationStatusColorClass(station.status);
  const alertSeverityClass = mostSevereAppEvent ? getEventSeverityColorClass(mostSevereAppEvent.severity) : null;

  const isOnline = station.status_display === "ONLINE";

  const isRaining = Boolean(
    events?.some((e) => e.severity === AppEventSeverity.HIGH && e.type_display === "rain_alert")
  );
  const isSunny = Boolean(
    events?.some((e) => e.severity === AppEventSeverity.LOW && e.type_display === "sunny")
  );
  const isWindy = Boolean(
    events?.some((e) => e.severity === AppEventSeverity.MEDIUM && e.type_display === "wind_alert")
  );
  const hasMaintenance = station.status === StationStatus.MAINTENANCE;
  const hasCriticalAlert = mostSevereAppEvent?.severity === AppEventSeverity.CRITICAL;
  const hasLowBattery = station.battery_level !== null && station.battery_level < 20;

  // const weatherIconName = getWeatherIconName({
  //   isRaining,
  //   isSunny,
  //   isWindy,
  //   hasMaintenance,
  //   hasCriticalAlert,
  //   hasLowBattery,
  // });

  // const WeatherIcon = getWeatherIconComponent(weatherIconName);

  const iconHtml = (
    <div className="relative">
      <div
        className={`${stationStatusClass} w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110`}
      >
        {/* <WeatherIcon className="w-5 h-5 text-white" /> */}

        {hasLowBattery && (
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <BatteryWarning className="h-2 w-2 text-white" />
          </div>
        )}

        {mostSevereAppEvent && alertSeverityClass && (
          <div
            className={`${alertSeverityClass} absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center`}
          >
            <AlertTriangle className="h-2 w-2 text-white" />
          </div>
        )}
      </div>

      {isOnline && (
        <div
          className={`${stationStatusClass} absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping opacity-75`}
        ></div>
      )}
    </div>
  );

  const customIcon = L.divIcon({
    className: "",
    html: ReactDOMServer.renderToStaticMarkup(iconHtml),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return customIcon;
};
