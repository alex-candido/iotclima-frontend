// src/components/leaflet/leaflet-map-container.tsx

import { MapContainer, MapContainerProps } from "react-leaflet";
import { cn } from "@/lib/utils";

interface LeafletMapContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LeafletMapContainer({ children, className, ...props }: LeafletMapContainerProps & MapContainerProps) {
  return (
    <MapContainer className={cn("absolute z-[10] h-full w-full text-white outline-0", className)} {...props}>
      {children}
    </MapContainer>
  );
}
