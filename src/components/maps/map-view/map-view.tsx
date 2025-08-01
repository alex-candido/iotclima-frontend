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
import { SensorRecord } from "@/types/record";
import { SensorType } from "@/types/sensor";
import { Station } from "@/types/station";
import DUMMY_STATIONS_JSON from "@/data/stations_data.json";

const DUMMY_STATIONS: Station[] = DUMMY_STATIONS_JSON as Station[];

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

  return (
    <div className="map-view absolute inset-0 z-0">
      <LeafletMap
        key={mapRefreshKey} 
        urlLayer={activeMapLayerUrl || MAP_URL_LAYER} 
        centerPosition={INITIAL_CENTER}
        zoomLevel={INITIAL_ZOOM}
        items={DUMMY_STATIONS.map(station => ({
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