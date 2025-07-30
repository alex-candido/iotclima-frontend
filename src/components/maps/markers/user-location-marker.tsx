// src/components/maps/markers/user-location-marker.tsx
import { Navigation } from "lucide-react";

export function UserLocationMarker() {
  return (
    <div className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
      <Navigation className="w-3 h-3 text-white" />
    </div>
  );
}
