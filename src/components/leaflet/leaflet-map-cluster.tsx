// src/components/leaflet/leaflet-map-cluster.tsx

import MarkerClusterGroup, { MarkerClusterGroupProps } from "react-leaflet-markercluster";

import { cn } from "@/lib/utils";

interface LeafletMapClusterProps {
  children: React.ReactNode;
  className?: string;
}

export function LeafletMapCluster({ children, className, ...props }: LeafletMapClusterProps & MarkerClusterGroupProps) {
  return (
    <MarkerClusterGroup className={cn(className)} {...props}>
      { children }
    </MarkerClusterGroup>
  )
}
