// src/components/maps/map-view/custom-popup-content.tsx
"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CloudRain,
  Droplet,
  Sun,
  Thermometer,
  Wind
} from "lucide-react";

import { SensorRecord } from "@/types/record";
import { SensorType, UnitType } from "@/types/sensor";
import { Station } from "@/types/station";

// --- Funções Utilitárias (Mantidas como estão) ---
const sensorDisplayMap = {
  [SensorType.THERMOMETER]: { name: "Temperatura", icon: Thermometer },
  [SensorType.HYGROMETER]: { name: "Umidade", icon: Droplet },
  [SensorType.ANEMOMETER]: { name: "Vento", icon: Wind },
  [SensorType.PLUVIOMETER]: { name: "Chuva", icon: CloudRain },
  [SensorType.SOLARIMETER]: { name: "Radiação Solar", icon: Sun },
};

function getWeatherIconAndDescription(
  sensors: SensorRecord[]
): { icon: string; description: string } {
  const getNumericValue = (sensorRecord: SensorRecord | undefined) =>
    typeof sensorRecord?.value === 'string' ? parseFloat(sensorRecord.value) : sensorRecord?.value;

  const thermometer = sensors.find((s) => s.sensor_type === SensorType.THERMOMETER);
  const pluviometer = sensors.find((s) => s.sensor_type === SensorType.PLUVIOMETER);
  const hygrometer = sensors.find((s) => s.sensor_type === SensorType.HYGROMETER);
  const solarimeter = sensors.find((s) => s.sensor_type === SensorType.SOLARIMETER); 

  const pluviometerValue = getNumericValue(pluviometer);
  const hygrometerValue = getNumericValue(hygrometer);
  const thermometerValue = getNumericValue(thermometer);
  const solarimeterValue = getNumericValue(solarimeter);

  if (pluviometerValue !== undefined && pluviometerValue > 0) {
    return { icon: "🌧️", description: "Chuva Forte" }; 
  }
  if (hygrometerValue !== undefined && hygrometerValue > 80 && (thermometerValue === undefined || thermometerValue < 20)) {
    return { icon: "🌫️", description: "Neblina/Úmido" };
  }
  if (thermometerValue !== undefined && thermometerValue > 30) {
    return { icon: "☀️", description: "Ensolarado" };
  }
  if (thermometerValue !== undefined && thermometerValue < 10) {
    return { icon: "❄️", description: "Frio" };
  }
  if (solarimeterValue !== undefined && solarimeterValue < 200) {
    return { icon: "☁️", description: "Nublado" };
  }
  if (solarimeterValue !== undefined && solarimeterValue >= 200 && solarimeterValue <= 600) {
    return { icon: "⛅", description: "Parcialmente Nublado" };
  }

  return { icon: "☀️", description: "Ensolarado" }; 
}

const getUnitSymbol = (unit: UnitType | undefined): string => {
    if (unit === undefined) return "";
    switch (unit) {
        case UnitType.CELSIUS: return "°C";
        case UnitType.PERCENT: return "%";
        case UnitType.METERS_PER_SECOND: return "m/s";
        case UnitType.MILLIMETERS: return "mm";
        case UnitType.WATTS_PER_METER_SQUARED: return "W/m²";
        default: return String(unit);
    }
};

// --- Props do Componente ---
interface CustomPopupContentProps {
  data: Station; 
}

export function CustomPopupContent({ data }: CustomPopupContentProps) {
  const latestRecord = data.records && data.records.length > 0
    ? data.records.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    : null;

  const temperatureSensor = latestRecord?.sensors.find(
    (s) => s.sensor_type === SensorType.THERMOMETER
  );

  const { icon: weatherEmoji, description: weatherDescription } =
    getWeatherIconAndDescription(latestRecord?.sensors || []);

  const temperatureValue = typeof temperatureSensor?.value === 'string' ? parseFloat(temperatureSensor.value) : temperatureSensor?.value;

  return (
    <div className=" flex flex-col justify-between" style={{ minWidth: '190px' }}>
      {/* Seção Superior */}
      <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-3">
        <span>Current Weather</span>
        <span className="text-muted-foreground">
          {latestRecord?.created_at ? format(new Date(latestRecord.created_at), "p", { locale: ptBR }) : 'N/A'}
        </span>
      </div>

      {/* Seção Central: Ícone Principal e Temperatura */}
      <div className="flex items-center justify-start flex-grow text-foreground mb-3">
        <div className="flex-shrink-0 mr-3">
          <span className="text-6xl leading-none">{weatherEmoji}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-5xl font-extrabold leading-none">
            {temperatureValue !== undefined ? temperatureValue : 'N/A'}
            <span className="text-2xl align-top">{getUnitSymbol(temperatureSensor?.unit)}</span>
          </span>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {weatherDescription}
          </span>
        </div>
      </div>

      {/* Seção Inferior: Ícones e Valores dos Sensores (EXATAMENTE COMO SOLICITADO) */}
      <div className="grid grid-cols-4 gap-1 text-muted-foreground pt-3 border-t border-border"> {/* GRID E PADDING */}
        {latestRecord?.sensors.map((sensor, index) => {
          const displayInfo = sensorDisplayMap[sensor.sensor_type];
          if (!displayInfo) return null;

          const IconComponent = displayInfo.icon;
          const sensorValue = typeof sensor.value === 'string' ? parseFloat(sensor.value) : sensor.value;
          const sensorUnit = getUnitSymbol(sensor.unit);

          return (
            // Conteúdo interno do item do grid, EXATAMENTE como no snippet fornecido.
            <div key={index} className="flex flex-col items-center">
              <IconComponent className="h-4 w-4 mb-0.5" /> {/* Tamanho e margem do ícone */}
              <span className="text-xs font-semibold whitespace-nowrap"> {/* Valor e unidade, sem a label do sensor */}
                {sensorValue} {sensorUnit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}