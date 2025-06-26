"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const LeafletMapContainer = dynamic(
  () =>
    import("@/components/map/leaflet-map-container").then(
      (mod) => mod.LeafletMapContainer,
    ),
  {
    ssr: false,
  },
);

const LeafletMapCluster = dynamic(
  () =>
    import("@/components/map/leaflet-map-cluster").then(
      (mod) => mod.LeafletMapCluster,
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

export function LeafletMap() {
  const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const URL_LAYER = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const MAX_ZOOM = 19;
  const MIN_ZOOM = 2;
  const OPACITY = 1.0;

  return (
    <div>
      <LeafletMapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <LeafletMapTileLayer
          attribution={ATTRIBUTION}
          url={URL_LAYER}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          opacity={OPACITY}
        />
        <LeafletMapZoomControl />
        <LeafletMapCluster>
          <LeafletMapMarker position={[51.505, -0.09]}>
            <LeafletMapPopup>
              A pretty CSS3 LeafletMapPopup. <br /> Easily customizable.
            </LeafletMapPopup>
          </LeafletMapMarker>
        </LeafletMapCluster>
      </LeafletMapContainer>
    </div>
  );
}
