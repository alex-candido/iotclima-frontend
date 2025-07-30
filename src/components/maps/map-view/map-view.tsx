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

import { PlaceStatus } from "@/types/place";
import { SensorRecord } from "@/types/record";
import { SensorType, UnitType } from "@/types/sensor";
import { Station, StationStatus } from "@/types/station";
import { CurrentLocationMarker } from "../markers/current-location-marker";

function getWeatherIconForMarker(
  sensors: SensorRecord[]
): string {
  const pluviometer = sensors.find((s) => s.sensor_type === SensorType.PLUVIOMETER);
  const solarimeter = sensors.find((s) => s.sensor_type === SensorType.SOLARIMETER);

  const getNumericValue = (sensorRecord: SensorRecord | undefined) =>
    typeof sensorRecord?.value === 'string' ? parseFloat(sensorRecord.value) : sensorRecord?.value;

  const pluviometerValue = getNumericValue(pluviometer);
  const solarimeterValue = getNumericValue(solarimeter);

  if (pluviometerValue !== undefined && pluviometerValue > 0) {
    return "🌧️"; 
  }
  if (solarimeterValue !== undefined && solarimeterValue > 500) {
    return "☀️"; 
  }
  return "☁️"; 
}

export function MapView() {
  const { mapRefreshKey, activeMapLayerUrl, currentLocation: currentLocationMarker } = useMap();

  const MAP_URL_LAYER = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const INITIAL_CENTER: LatLngExpression = [-3.74, -38.595];
  const INITIAL_ZOOM = 13;

  const DUMMY_ITEMS: Station[] = [
    {
      id: 1,
      uuid: "uuid-1",
      name: "Estação A",
      description: "Estação de monitoramento A",
      status: StationStatus.ACTIVE,
      info: { model: "Model A", firmware: "1.0", installed_at: "2023-01-01T10:00:00Z" },
      place: { id: 1, uuid: "place-uuid-1", name: "Local A", description: "Desc A", info: { address: "", city: "", state: "", country: "" }, geometry: { type: "Point", coordinates: [-3.73, -38.59] }, status: PlaceStatus.ACTIVE, latitude: -3.73, longitude: -38.59, created_at: "", updated_at: "" },
      records: [
        {
          id: 1,
          uuid: "record-uuid-1",
          sensors: [
            { sensor_type: SensorType.THERMOMETER, value: 28.5, unit: UnitType.CELSIUS },
            { sensor_type: SensorType.HYGROMETER, value: 70, unit: UnitType.PERCENT },
            { sensor_type: SensorType.ANEMOMETER, value: 5.2, unit: UnitType.METERS_PER_SECOND },
            { sensor_type: SensorType.PLUVIOMETER, value: 0.0, unit: UnitType.MILLIMETERS },
            { sensor_type: SensorType.SOLARIMETER, value: 700, unit: UnitType.WATTS_PER_METER_SQUARED },
          ],
          created_at: "2024-07-30T18:25:00Z",
          updated_at: "",
        },
      ],
      created_at: "",
      updated_at: "",
    },
    {
      id: 2,
      uuid: "uuid-2",
      name: "Estação B",
      description: "Estação de monitoramento B",
      status: StationStatus.INACTIVE,
      info: { model: "Model B", firmware: "1.0", installed_at: "2023-02-01T11:00:00Z" },
      place: { id: 2, uuid: "place-uuid-2", name: "Local B", description: "Desc B", info: { address: "", city: "", state: "", country: "" }, geometry: { type: "Point", coordinates: [-3.75, -38.6] }, status: PlaceStatus.ACTIVE, latitude: -3.75, longitude: -38.6, created_at: "", updated_at: "" },
      records: [
        {
          id: 2,
          uuid: "record-uuid-2",
          sensors: [
            { sensor_type: SensorType.THERMOMETER, value: 25.0, unit: UnitType.CELSIUS },
            { sensor_type: SensorType.HYGROMETER, value: 85, unit: UnitType.PERCENT },
            { sensor_type: SensorType.PLUVIOMETER, value: 0.0, unit: UnitType.MILLIMETERS },
            { sensor_type: SensorType.SOLARIMETER, value: 100, unit: UnitType.WATTS_PER_METER_SQUARED },
          ],
          created_at: "2024-07-30T18:20:00Z",
          updated_at: "",
        },
      ],
      created_at: "",
      updated_at: "",
    },
    {
      id: 3,
      uuid: "uuid-3",
      name: "Estação C",
      description: "Estação de monitoramento C",
      status: StationStatus.ACTIVE,
      info: { model: "Model C", firmware: "1.0", installed_at: "2023-03-01T12:00:00Z" },
      place: { id: 3, uuid: "place-uuid-3", name: "Local C", description: "Desc C", info: { address: "", city: "", state: "", country: "" }, geometry: { type: "Point", coordinates: [-3.72, -38.58] }, status: PlaceStatus.ACTIVE, latitude: -3.72, longitude: -38.58, created_at: "", updated_at: "" },
      records: [
        {
          id: 3,
          uuid: "record-uuid-3",
          sensors: [
            { sensor_type: SensorType.THERMOMETER, value: 22.0, unit: UnitType.CELSIUS },
            { sensor_type: SensorType.PLUVIOMETER, value: 1.5, unit: UnitType.MILLIMETERS }, // Exemplo de chuva
            { sensor_type: SensorType.HYGROMETER, value: 90, unit: UnitType.PERCENT },
            { sensor_type: SensorType.SOLARIMETER, value: 300, unit: UnitType.WATTS_PER_METER_SQUARED },
          ],
          created_at: "2024-07-30T18:15:00Z",
          updated_at: "",
        },
      ],
      created_at: "",
      updated_at: "",
    },
  ];

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
        items={DUMMY_ITEMS.map(station => ({
          id: station.id,
          position: [station.place.latitude, station.place.longitude] as LatLngExpression,
          data: station,
        }))}
        renderMarkerIcon={(data: Station) => {
          const latestRecord = data.records && data.records.length > 0
            ? data.records.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
            : null;

          const temperatureSensor = latestRecord?.sensors.find(
            (s) => s.sensor_type === SensorType.THERMOMETER
          );
          
          const temperature = temperatureSensor ? `${typeof temperatureSensor.value === 'string' ? parseFloat(temperatureSensor.value) : temperatureSensor.value}°C` : "N/A";
          const weatherIcon = getWeatherIconForMarker(latestRecord?.sensors || []); 

          return (
            <CustomMarkerIcon>
              <WeatherStationMarker
                temperature={temperature} 
                weatherIcon={weatherIcon} 
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
            <MapControlsBottomLeft />
            <MapControlsBottomRight />
          </>
        }
      >
      </LeafletMap>
    </div>
  );
}