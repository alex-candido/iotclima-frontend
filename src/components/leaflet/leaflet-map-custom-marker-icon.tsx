// src/components/leaflet/leaflet-map-custom-marker-icon.tsx

import { cn } from "@/lib/utils";
import L from 'leaflet';
import ReactDOMServer from "react-dom/server";

interface LeafletMapCustomMarkerIconProps {
  className?: string;
  children?: React.ReactNode;
}

export const LeafletMapCustomMarkerIcon = ({ 
  className, 
  children 
}: LeafletMapCustomMarkerIconProps) => {
  if (typeof window === 'undefined') {
    return L.divIcon({
      className: 'leaflet-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  const iconHtml = (
    <div className={cn(className)}>
      {children}
    </div>
  );

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(iconHtml),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return customIcon;
}