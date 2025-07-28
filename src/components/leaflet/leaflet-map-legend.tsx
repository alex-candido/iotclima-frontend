// src/components/leaflet/leaflet-map-legend.tsx

import { cn } from "@/lib/utils";

export function LeafletMapLegend({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  )
}
