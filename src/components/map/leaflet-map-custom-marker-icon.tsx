import { Station } from "@/types/station";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

interface LeafletMapCustomMarkerIconProps {
  station: Station;
}

const getAlertColor = (alertLevel?: string) => {
  switch (alertLevel) {
    case "critical":
      return "#8b5cf6"; // purple
    case "high":
      return "#ef4444"; // red
    case "medium":
      return "#f97316"; // orange
    case "low":
      return "#eab308"; // yellow
    default:
      return "#22c55e"; // green
  }
};

export const LeafletMapCustomMarkerIcon = ({ station }: LeafletMapCustomMarkerIconProps) => {
  const isOnline = station.status === "online";
  const alertColor = getAlertColor(station.alertLevel);

  const iconHtml = (
    <div className="relative">
      <div
        className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: alertColor }}
      >
        <div className="w-3 h-3 rounded-full bg-white"></div>
        {station.batteryLevel !== undefined && station.batteryLevel < 20 && (
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 7a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zM4 12a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zM4 17a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
        {station.alertLevel && station.alertLevel !== "none" && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {isOnline && (
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping opacity-75"
          style={{ backgroundColor: alertColor }}
        ></div>
      )}
    </div>
  );

  const customIcon = L.divIcon({
    className: "", // Removed custom-weather-marker class
    html: ReactDOMServer.renderToStaticMarkup(iconHtml),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return customIcon;
};