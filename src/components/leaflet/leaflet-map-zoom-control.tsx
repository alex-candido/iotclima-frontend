// src/components/leaflet/leaflet-map-zoom-control.tsx

import { ZoomControl, ZoomControlProps } from "react-leaflet";

interface LeafletMapZoomControlProps {
  className?: string;
}

export function LeafletMapZoomControl({
  ...props
}: LeafletMapZoomControlProps & ZoomControlProps) {
  return (
    <ZoomControl
      {...props}
    />
  );
}
