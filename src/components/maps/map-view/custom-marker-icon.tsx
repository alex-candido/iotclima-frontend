// src/components/maps/map-view/custom-marker-icon.tsx

import { MapPin } from "lucide-react";
import { ReactNode } from "react";

export function CustomMarkerIcon({ children }: { children?: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Default icon if no children are provided, or as a base */}
      {!children && (
        <div className="bg-blue-500 text-white rounded-full p-1 flex items-center justify-center">
          <MapPin size={16} />
        </div>
      )}
      {children}
    </div>
  );
}
