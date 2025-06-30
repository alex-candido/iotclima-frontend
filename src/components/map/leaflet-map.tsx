// src/components/map/leaflet-map.tsx

"use client";

import { Place } from "@/types/place";
import { Station } from "@/types/station";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LeafletMapContainer = dynamic(
  () =>
    import("@/components/map/leaflet-map-container").then(
      (mod) => mod.LeafletMapContainer,
    ),
  {
    ssr: false,
  },
);

const LeafletMapMarker = dynamic(
  () =>
    import("@/components/map/leaflet-map-marker").then(
      (mod) => mod.LeafletMapMarker,
    ),
  {
    ssr: false,
  },
);

const LeafletMapPopup = dynamic(
  () =>
    import("@/components/map/leaflet-map-popup").then(
      (mod) => mod.LeafletMapPopup,
    ),
  {
    ssr: false,
  },
);

const LeafletMapTileLayer = dynamic(
  () =>
    import("@/components/map/leaflet-map-tile-layer").then(
      (mod) => mod.LeafletMapTileLayer,
    ),
  {
    ssr: false,
  },
);

const LeafletMapZoomControl = dynamic(
  () =>
    import("@/components/map/leaflet-map-zoom-control").then(
      (mod) => mod.LeafletMapZoomControl,
    ),
  {
    ssr: false,
  },
);

import { LeafletMapCustomMarkerIcon } from "@/components/map/leaflet-map-custom-marker-icon";

const LeafletMapStationPopupContent = dynamic(
  () =>
    import("@/components/map/leaflet-map-station-popup-content").then(
      (mod) => mod.LeafletMapStationPopupContent,
    ),
  {
    ssr: false,
  },
);

const LeafletMapLegend = dynamic(
  () =>
    import("@/components/map/leaflet-map-legend").then(
      (mod) => mod.LeafletMapLegend,
    ),
  {
    ssr: false,
  },
);

interface LeafletMapProps {
  stations: Station[];
  places: Place[];
  onStationClick: (station: Station) => void;
  onPlaceClick: (place: Place) => void;
  centerToCoordinates: [number, number] | null;
}

export function LeafletMap({
  stations,
  places,
  onStationClick,
  onPlaceClick,
  centerToCoordinates,
}: LeafletMapProps) {
  const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const URL_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const MAX_ZOOM = 19;
  const MIN_ZOOM = 2;
  const OPACITY = 1.0;

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      if (centerToCoordinates) {
        mapRef.current.setView([centerToCoordinates[1], centerToCoordinates[0]], 13);
      } else if (stations.length > 0) {
        const stationMarkers = stations.map((station) =>
          L.marker([station.latitude, station.longitude]),
        );
        const group = new L.featureGroup(stationMarkers);
        mapRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [centerToCoordinates, stations]);

  return (
    <div className="relative w-full h-full">
      <LeafletMapContainer
        center={[-15.7801, -47.9292]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={false}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <LeafletMapTileLayer
          attribution={ATTRIBUTION}
          url={URL_LAYER}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          opacity={OPACITY}
        />
        <LeafletMapZoomControl />

        {stations.map((station) => (
          <LeafletMapMarker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={LeafletMapCustomMarkerIcon({ station })}
            eventHandlers={{
              click: () => onStationClick(station),
            }}
          >
            <LeafletMapPopup
              closeButton={true}
              offset={[0, -10]}
              maxWidth={350}
              className="custom-popup"
            >
              {ReactDOMServer.renderToStaticMarkup(
                <LeafletMapStationPopupContent station={station} />,
              )}
            </LeafletMapPopup>
          </LeafletMapMarker>
        ))}

        {/* {places.map((place) => (
          <LeafletMapMarker
            key={place.properties.uuid}
            position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
            eventHandlers={{
              click: () => onPlaceClick(place),
            }}
          >
            <LeafletMapPopup>
              <b>{place.properties.name}</b>
              <p>{place.properties.description}</p>
            </LeafletMapPopup>
          </LeafletMapMarker>
        ))} */}
      </LeafletMapContainer>

      <LeafletMapLegend stationsCount={stations.length} hasStations={stations.length > 0} />
    </div>
  );
}