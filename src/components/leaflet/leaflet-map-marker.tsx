// src/components/leaflet/leaflet-map-marker.tsx

import {
  Marker,
  MarkerProps
} from "react-leaflet";

interface LeafletMapMarkerProps {
  children: React.ReactNode;
}

export function LeafletMapMarker({ children, ...props }: LeafletMapMarkerProps & MarkerProps) {
  return (
    <Marker {...props}>
      {children}
    </Marker>
  )
}
