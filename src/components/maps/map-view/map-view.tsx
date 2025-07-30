// src/components/maps/map-view/map-view.tsx
"use client";

import { LeafletMap } from "@/components/leaflet/leaflet-map";
import { CustomMarkerIcon } from "@/components/maps/map-view/custom-marker-icon"; // Componente wrapper do ícone
import { CustomPopupContent } from "@/components/maps/map-view/custom-popup-content"; // O conteúdo do popup
import { MapControlsBottomLeft } from "@/components/maps/map-view/map-controls-bottom-left";
import { MapControlsBottomRight } from "@/components/maps/map-view/map-controls-bottom-right";
import { useMap } from "@/providers/map-provider";
import type { LatLngExpression } from 'leaflet';
import { WeatherStationMarker } from "./weather-station-marker"; // O marcador em formato de pílula

// Tipos necessários (já corrigidos para usar alias @/types)
import { PlaceStatus } from "@/types/place";
import { SensorRecord } from "@/types/record";
import { SensorType, UnitType } from "@/types/sensor";
import { Station, StationStatus } from "@/types/station";

// Removido: getWeatherIconAndDescription foi movido para custom-popup-content.tsx

// Helper para obter o ícone do clima para o WeatherStationMarker
// (simplificado, apenas para o marcador. Lógica completa está no popup)
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
    return "🌧️"; // Chuva
  }
  if (solarimeterValue !== undefined && solarimeterValue > 500) {
    return "☀️"; // Sol forte
  }
  return "☁️"; // Padrão
}

export function MapView() {
  const { mapRefreshKey, activeMapLayerUrl } = useMap();

  const MAP_URL_LAYER = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const INITIAL_CENTER: LatLngExpression = [-3.74, -38.595];
  const INITIAL_ZOOM = 13;

  // Dados de Exemplo (Tipados como Station[])
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
      status: StationStatus.INACTIVE, // Exemplo de inativa
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
        centerPosition={INITIAL_CENTER}
        zoomLevel={INITIAL_ZOOM}
        items={DUMMY_ITEMS.map(station => ({
          id: station.id,
          position: [station.place.latitude, station.place.longitude] as LatLngExpression,
          data: station,
        }))}
        // renderMarkerIcon agora passa a prop `data` diretamente para WeatherStationMarker
        renderMarkerIcon={(data: Station) => {
          // Lógica para obter os dados para o WeatherStationMarker
          const latestRecord = data.records && data.records.length > 0
            ? data.records.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
            : null;

          const temperatureSensor = latestRecord?.sensors.find(
            (s) => s.sensor_type === SensorType.THERMOMETER
          );
          
          const temperature = temperatureSensor ? `${typeof temperatureSensor.value === 'string' ? parseFloat(temperatureSensor.value) : temperatureSensor.value}°C` : "N/A";
          const weatherIcon = getWeatherIconForMarker(latestRecord?.sensors || []); 

          return (
            // Assumimos que CustomMarkerIcon é um wrapper que aceita children
            // e WeatherStationMarker é o ícone real.
            // OU: Se CustomMarkerIcon for o próprio ícone e precisar de props:
            // <CustomMarkerIcon data={{ temperature: temperature, weatherIcon: weatherIcon }} />
            <CustomMarkerIcon>
              <WeatherStationMarker
                temperature={temperature} // Prop 'temperature' de WeatherStationMarker
                weatherIcon={weatherIcon} // Prop 'weatherIcon' de WeatherStationMarker
                // Se WeatherStationMarker precisar de outros dados como status ou ID:
                // status={data.status === StationStatus.ACTIVE ? "online" : "offline"}
                // id={data.id}
              />
            </CustomMarkerIcon>
          );
        }}
        // renderPopupContent agora passa a prop `data: Station` corretamente
        renderPopupContent={(data: Station) => <CustomPopupContent data={data} />} 
        useCluster={false}
        mapControls={
          <>
            <MapControlsBottomLeft />
            <MapControlsBottomRight />
          </>
        }
      />
    </div>
  );
}