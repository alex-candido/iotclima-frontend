// src/components/leaflet/leaflet-map-station-popup-content.tsx

import { cn } from "@/lib/utils";

export function LeafletMapStationPopupContent({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  )
}
