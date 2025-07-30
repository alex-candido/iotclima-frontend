// src/components/maps/markers/weather-station-marker.tsx
interface WeatherStationMarkerProps {
  icon: React.ReactNode; // Ex: <Sun />
  temperature: string;   // Ex: "29°C"
}

export function WeatherStationMarker({ icon, temperature }: WeatherStationMarkerProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full shadow-md">
      <div className="text-blue-500">{icon}</div>
      <span className="text-sm font-semibold text-gray-800">{temperature}</span>
    </div>
  );
}
