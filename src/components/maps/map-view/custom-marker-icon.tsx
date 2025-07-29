// src/components/maps/map-view/custom-marker-icon.tsx

import { MapPin } from "lucide-react";

export function CustomMarkerIcon({ data }: { data: any }) {
  return (
    <div className="bg-blue-500 text-white rounded-full p-1 flex items-center justify-center">
      <MapPin size={16} />
    </div>
  );
}
