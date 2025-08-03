// src/components/maps/map-view/map-view.tsx
"use client";

import { LeafletMap } from "@/components/leaflet/leaflet-map";
import { CustomMarkerIcon } from "@/components/maps/map-view/custom-marker-icon";
import { CustomPopupContent } from "@/components/maps/map-view/custom-popup-content";
import { MapControlsBottomLeft } from "@/components/maps/map-view/map-controls-bottom-left";
import { MapControlsBottomRight } from "@/components/maps/map-view/map-controls-bottom-right";
import { useMap } from "@/providers/map-provider";
import type { LatLngExpression } from 'leaflet';
import { WeatherStationMarker } from "./weather-station-marker";

import { MapFlyToHandler } from "@/components/maps/map-view/map-fly-to-handler";
import { CurrentLocationMarker } from "@/components/maps/markers/current-location-marker";
import { stationToWeatherCardData } from "@/lib/utils";
import { Station } from "@/types/station";

export function MapView() {
  const { mapRefreshKey, activeMapLayerUrl, currentLocation: currentLocationMarker, allStations } = useMap();

  const MAP_URL_LAYER = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const INITIAL_CENTER: LatLngExpression = [-3.74, -38.595];
  const INITIAL_ZOOM = 13;

  return (
    <div className="map-view absolute inset-0 z-0">
      <LeafletMap
        key={mapRefreshKey} 
        urlLayer={activeMapLayerUrl || MAP_URL_LAYER} 
        centerPosition={
          currentLocationMarker
            ? [currentLocationMarker.latitude, currentLocationMarker.longitude]
            : INITIAL_CENTER
        }
        zoomLevel={INITIAL_ZOOM}
        items={allStations ? allStations.map(station => ({
          id: station.id,
          position: [station.place.latitude, station.place.longitude] as LatLngExpression,
          data: station,
        })) : []}
        renderMarkerIcon={(data: Station) => {
          const weatherCardData = stationToWeatherCardData(data);

          return (
            <CustomMarkerIcon>
              <WeatherStationMarker
                temperature={`${weatherCardData.mainTemperature}°C`} 
                weatherIcon={weatherCardData.mainWeatherIcon} 
              />
            </CustomMarkerIcon>
          );
        }}
        renderPopupContent={(data: Station) => <CustomPopupContent data={data} />} 
        useCluster={false}
        currentLocation={currentLocationMarker ? [currentLocationMarker.latitude, currentLocationMarker.longitude] : undefined}
        renderCurrentLocationMarkerIcon={() => {
          return (
            <CustomMarkerIcon>
              <CurrentLocationMarker />
            </CustomMarkerIcon>
          );
        }}
        mapControls={
          <>
            <MapFlyToHandler />
            <MapControlsBottomLeft />
            <MapControlsBottomRight />
          </>
        }
      >
      </LeafletMap>
    </div>
  );
}