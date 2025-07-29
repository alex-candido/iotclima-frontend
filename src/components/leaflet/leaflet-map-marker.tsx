// src/components/leaflet/leaflet-map-marker.tsx
"use client";

import L, { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import { useMemo } from 'react';
import ReactDOMServer from "react-dom/server";
import { Marker as ReactLeafletMarker } from 'react-leaflet';

import { LeafletMapCustomMarkerIcon } from "./leaflet-map-custom-marker-icon";

interface LeafletMapMarkerProps {
  position: LatLngExpression;
  children?: React.ReactNode;
  renderIconContent?: React.ReactNode;
  iconClassName?: string;
  eventHandlers?: LeafletEventHandlerFnMap;
}

export function LeafletMapMarker({
  position,
  children,
  renderIconContent,
  iconClassName,
  eventHandlers,
}: LeafletMapMarkerProps) {
  const customIcon = useMemo(() => {
    if (typeof window === 'undefined') {
      return L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    }

    const iconHtml = ReactDOMServer.renderToStaticMarkup(
      <LeafletMapCustomMarkerIcon className={iconClassName}>
        {renderIconContent}
      </LeafletMapCustomMarkerIcon>
    );

    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, [renderIconContent, iconClassName]);

  return (
    <ReactLeafletMarker position={position} icon={customIcon} eventHandlers={eventHandlers}>
      {children}
    </ReactLeafletMarker>
  );
}