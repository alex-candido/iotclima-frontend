// src/components/leaflet/leaflet-map.tsx

"use client";

import { LeafletMapCustomMarkerIcon } from "@/components/leaflet/leaflet-map-custom-marker-icon";
import {
  LatLngBoundsExpression,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  PointExpression,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { TileLayer, useMapEvents } from "react-leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const LeafletMapMarker = dynamic(() => import("@/components/leaflet/leaflet-map-marker").then((mod) => mod.LeafletMapMarker), { ssr: false });
const LeafletMapPopup = dynamic(() => import("@/components/leaflet/leaflet-map-popup").then((mod) => mod.LeafletMapPopup), { ssr: false });
const LeafletMapZoomControl = dynamic(() => import("@/components/leaflet/leaflet-map-zoom-control").then((mod) => mod.LeafletMapZoomControl), { ssr: false });
const LeafletMapLegend = dynamic(() => import("@/components/leaflet/leaflet-map-legend").then((mod) => mod.LeafletMapLegend), { ssr: false });
const LeafletMapCluster = dynamic(() => import("@/components/leaflet/leaflet-map-cluster").then((mod) => mod.LeafletMapCluster), { ssr: false });

interface LeafletMapProps<TData> {
  attribution?: string;
  urlLayer?: string;
  maxZoom?: number;
  minZoom?: number;
  opacity?: number;
  centerPosition?: LatLngExpression;
  zoomLevel?: number;
  scrollWheelZoom?: boolean;
  zoomControl?: boolean;
  maxBounds?: LatLngBoundsExpression;
  maxBoundsViscosity?: number;
  attributionControl?: boolean;
  zoomControlPosition?: "topleft" | "topright" | "bottomleft" | "bottomright";
  children?: React.ReactNode;
  legendComponent?: React.ReactNode;
  useCluster?: boolean;
  onMapLoad?: (map: L.Map) => void;
  onMapZoomEnd?: (map: L.Map) => void;
  onMapMoveEnd?: (map: L.Map) => void;
  markerEventHandlers?: LeafletEventHandlerFnMap;
  popupCloseButton?: boolean;
  popupOffset?: PointExpression;
  popupMaxWidth?: number;
  items?: { id: string | number; position: LatLngExpression; data: TData }[];
  renderMarkerIcon?: (data: TData) => React.ReactNode;
  renderPopupContent?: (data: TData) => React.ReactNode;
}

export function LeafletMap<TData>({
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  urlLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  maxZoom = 19,
  minZoom = 2,
  opacity = 1.0,
  centerPosition = [-3.730793027244902, -38.593047410296776],
  zoomLevel = 13,
  scrollWheelZoom = true,
  zoomControl = false,
  maxBounds = [
    [-90, -180],
    [90, 180],
  ],
  maxBoundsViscosity = 1.0,
  attributionControl = false,
  zoomControlPosition = "topright",
  legendComponent,
  useCluster = false,
  onMapLoad,
  onMapZoomEnd,
  onMapMoveEnd,
  markerEventHandlers,
  popupCloseButton = true,
  popupOffset = [0, -10],
  popupMaxWidth = 350,
  items = [],
  renderMarkerIcon,
  renderPopupContent,
  children,
}: LeafletMapProps<TData>) {
  const MapEventsHandler = () => {
    const map = useMapEvents({
      load: () => {
        console.log("Map loaded. Initial Bounds:", map.getBounds());
        void(onMapLoad && onMapLoad(map));
      },
      zoomend: () => {
        console.log("Zoom ended. Current Bounds:", map.getBounds());
        void(onMapZoomEnd && onMapZoomEnd(map));
      },
      moveend: () => {
        console.log("Move ended. Current Bounds:", map.getBounds());
        void(onMapMoveEnd && onMapMoveEnd(map));
      },
    });
    return null;
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        className="absolute z-[10] h-full w-full text-white outline-0"
        center={centerPosition}
        zoom={zoomLevel}
        scrollWheelZoom={scrollWheelZoom}
        maxBounds={maxBounds}
        maxBoundsViscosity={maxBoundsViscosity}
        zoomControl={zoomControl}
        attributionControl={attributionControl}
      >
        <MapEventsHandler />
        <TileLayer
          attribution={attribution}
          url={urlLayer}
          maxZoom={maxZoom}
          minZoom={minZoom}
          opacity={opacity}
        />
        <LeafletMapZoomControl position={zoomControlPosition} />

        {useCluster ? (
          <LeafletMapCluster>
            {items.map((item) => (
              <LeafletMapMarker
                key={item.id}
                position={item.position}
                icon={LeafletMapCustomMarkerIcon({
                  children: renderMarkerIcon
                    ? renderMarkerIcon(item.data)
                    : null,
                })}
                eventHandlers={markerEventHandlers}
              >
                <LeafletMapPopup
                  closeButton={popupCloseButton}
                  offset={popupOffset}
                  maxWidth={popupMaxWidth}
                >
                  {renderPopupContent ? renderPopupContent(item.data) : null}
                </LeafletMapPopup>
              </LeafletMapMarker>
            ))}
            {children}
          </LeafletMapCluster>
        ) : (
          items.map((item) => (
            <LeafletMapMarker
              key={item.id}
              position={item.position}
              icon={LeafletMapCustomMarkerIcon({
                children: renderMarkerIcon
                  ? renderMarkerIcon(item.data)
                  : null,
              })}
              eventHandlers={markerEventHandlers}
            >
              <LeafletMapPopup
                closeButton={popupCloseButton}
                offset={popupOffset}
                maxWidth={popupMaxWidth}
              >
                {renderPopupContent ? renderPopupContent(item.data) : null}
              </LeafletMapPopup>
            </LeafletMapMarker>
          ))
        )}
      </MapContainer>

      <LeafletMapLegend>{legendComponent}</LeafletMapLegend>
    </div>
  );
}
