import { Station } from "@/types/station";

interface LeafletMapStationPopupContentProps {
  station: Station;
}

export const LeafletMapStationPopupContent = ({ station }: LeafletMapStationPopupContentProps) => {
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
        return "#22c55e"; // green (default for 'none' or undefined)
    }
  };

  const formatLastUpdate = (lastUpdate?: string) => {
    if (!lastUpdate) return "N/A";
    const lastUpdateDate = new Date(lastUpdate);
    // Validate if the date is valid
    if (isNaN(lastUpdateDate.getTime())) return "N/A";

    const diffMs = Date.now() - lastUpdateDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}m atrás`;
    } else if (diffMinutes < 24 * 60) { // Less than 24 hours
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m atrás`;
    } else {
      // For more than 24 hours, show date and time
      return lastUpdateDate.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    }
  };

  const isOnline = station.status === "online";
  const alertColor = getAlertColor(station.alertLevel);

  return (
    <div className="p-0 min-w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{station.name}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {station.status}
          </span>
          {station.alertLevel && station.alertLevel !== "none" && (
            <span
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white border-0"
              style={{ backgroundColor: alertColor }}
            >
              {station.alertLevel}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">ID:</span>
            <span className="font-mono text-xs">{station.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Temp:</span>
            </div>
            <span className="font-medium">
              {station.temperature !== undefined ? `${station.temperature}°C` : "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Umid:</span>
            </div>
            <span className="font-medium">
              {station.humidity !== undefined ? `${station.humidity}%` : "N/A"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Vento:</span>
            </div>
            <span className="font-medium">
              {station.windSpeed !== undefined ? `${station.windSpeed} km/h` : "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
              <span>Bat:</span>
            </div>
            <span className="font-medium">
              {station.batteryLevel !== undefined ? `${station.batteryLevel}%` : "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Atualiz:</span>
            </div>
            <span className="font-medium text-xs">{formatLastUpdate(station.lastUpdate)}</span>
          </div>
        </div>
      </div>

      {station.region && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Região:</span>
            <span className="font-medium capitalize">{station.region}</span>
          </div>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">Clique no marcador para ver detalhes completos</p>
      </div>
    </div>
  );
};