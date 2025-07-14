// src/components/map/leaflet-map.tsx

"use client";

import { AppEvent } from "@/types/app-event";
import { Place } from "@/types/place";
import { Record } from "@/types/record";
import { Station } from "@/types/station";
import { LatLngBoundsExpression, LatLngExpression, LeafletEventHandlerFnMap, PointExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LeafletMapStationPopupContent } from "./leaflet-map-station-popup-content";

const LeafletMapMarker = dynamic(() => import("@/components/map/leaflet-map-marker").then((mod) => mod.LeafletMapMarker), { ssr: false });
const LeafletMapPopup = dynamic(() => import("@/components/map/leaflet-map-popup").then((mod) => mod.LeafletMapPopup), { ssr: false });
const LeafletMapZoomControl = dynamic(() => import("@/components/map/leaflet-map-zoom-control").then((mod) => mod.LeafletMapZoomControl), { ssr: false });
const LeafletMapLegend = dynamic(() => import("@/components/map/leaflet-map-legend").then((mod) => mod.LeafletMapLegend), { ssr: false });


import { LeafletMapCustomMarkerIcon } from "@/components/map/leaflet-map-custom-marker-icon";

interface LeafletMapProps {
  stations: Station[];
  places: Place[];
  onStationClick: (station: Station) => void;
  onPlaceClick: (place: Place) => void;
  centerToCoordinates: [number, number] | null;
  records: Record[];
  events: AppEvent[];
}

export function LeafletMap({
  stations,
  places,
  onStationClick,
  onPlaceClick,
  centerToCoordinates,
  records,
  events,
}: LeafletMapProps) {
  const markerHoverTimeouts = useRef(new Map<number, NodeJS.Timeout>()).current;

  // Configurações do Mapa
  const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const URL_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const MAX_ZOOM = 19;
  const MIN_ZOOM = 2;
  const OPACITY = 1.0;
  const CENTER_POSITION: LatLngExpression = [-15.7801, -47.9292];
  const ZOOM_LEVEL = 13;
  const SCROLL_WHELL_ZOOM = true;
  const ZOOM_CONTROL = false;
  const MAX_BOUNDS: LatLngBoundsExpression = [[-90, -180], [90, 180]];
  const MAX_BOUNDS_VISCOSITY = 1.0;
  const ATTRIBUTION_CONTROL = false;
  const ZOOM_CONTROL_POSITION: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'topright';

  // Configurações do Popup
  const POPUP_CLOSE_BUTTON = true;
  const POPUP_OFFSET: PointExpression = [0, -10];
  const POPUP_MAX_WIDTH = 350;

  const MapEventsHandler = () => {
    const map = useMapEvents({
      load: () => console.log("Map loaded. Initial Bounds:", map.getBounds()),
      zoomend: () => console.log("Zoom ended. Current Bounds:", map.getBounds()),
      moveend: () => console.log("Move ended. Current Bounds:", map.getBounds()),
    });
    return null;
  }

  const MapMarkerEventsHandler = (station: Station): LeafletEventHandlerFnMap => ({
    click: () => onStationClick(station),
    mouseover: (e: any) => {
      if (markerHoverTimeouts.has(station.id)) {
        clearTimeout(markerHoverTimeouts.get(station.id)!);
      }
      markerHoverTimeouts.set(station.id, setTimeout(() => {
        e.target.openPopup();
      }, 500));
    },
    mouseout: (e: any) => {
      if (markerHoverTimeouts.has(station.id)) {
        clearTimeout(markerHoverTimeouts.get(station.id)!);
      }
      markerHoverTimeouts.set(station.id, setTimeout(() => {
        e.target.closePopup();
      }, 300));
    },
  });

  return (
    <div className="relative w-full h-full">
      <MapContainer
        className="absolute z-[10] h-full w-full text-white outline-0"
        center={CENTER_POSITION}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={SCROLL_WHELL_ZOOM}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={MAX_BOUNDS_VISCOSITY}
        zoomControl={ZOOM_CONTROL}
        attributionControl={ATTRIBUTION_CONTROL}
      >
        <MapEventsHandler />
        <TileLayer
          attribution={ATTRIBUTION}
          url={URL_LAYER}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          opacity={OPACITY}
        />
        <LeafletMapZoomControl position={ZOOM_CONTROL_POSITION} />
        
        {stations.map((station) => {
          return (
            <LeafletMapMarker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={LeafletMapCustomMarkerIcon({ station, events })}
              eventHandlers={MapMarkerEventsHandler(station)}
            >
              <LeafletMapPopup
                closeButton={POPUP_CLOSE_BUTTON}
                offset={POPUP_OFFSET}
                maxWidth={POPUP_MAX_WIDTH}
                className="shadcn-popup"
              >
                <LeafletMapStationPopupContent station={station} records={records} events={events} />
              </LeafletMapPopup>
            </LeafletMapMarker>
          );
        })}

      </MapContainer>

      <LeafletMapLegend
        stationsCount={stations.length}
        hasStations={stations.length > 0}
      />
    </div>
  );
}