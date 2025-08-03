// src/components/maps/search-box/sensor-charts-card.tsx
"use client";

import { getSensorTypeLabel, getUnitSymbol } from "@/lib/utils";
import { Record } from "@/types/record";
import { SensorType } from "@/types/sensor";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface SensorChartsCardProps {
  records: Record[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function SensorChartsCard({ records, isLoading, isError }: SensorChartsCardProps) {
  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-card flex items-center justify-center min-h-[120px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (isError || !records || records.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">Dados históricos não disponíveis.</p>
      </div>
    );
  }

  const latestRecords = records
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-50);

  const data = latestRecords.map((record) => {
    const timestamp = new Date(record.created_at);
    const timeLabel = format(timestamp, "HH:mm");
    
    // Lógica corrigida para converter o enum em string antes de buscar
    const getSensorValue = (type: SensorType) => {
      // Converte o enum para a string correspondente
      const typeString = getSensorTypeLabel(type).toLowerCase();
      const sensor = record.sensors.find((s) => String(s.type) === typeString);
      
      if (!sensor || sensor.value === null) {
          return undefined;
      }
      
      const parsedValue = typeof sensor.value === 'string' ? parseFloat(sensor.value) : sensor.value;
      return isNaN(parsedValue) ? undefined : parsedValue;
    };

    return {
      time: timeLabel,
      temperature: getSensorValue(SensorType.THERMOMETER),
      humidity: getSensorValue(SensorType.HYGROMETER),
      windSpeed: getSensorValue(SensorType.ANEMOMETER),
      precipitation: getSensorValue(SensorType.PLUVIOMETER),
      solarRadiation: getSensorValue(SensorType.SOLARIMETER),
    };
  });

  const getUnit = (type: SensorType) => {
    const typeString = getSensorTypeLabel(type).toLowerCase();
    const sensor = latestRecords[0]?.sensors.find((s) => String(s.type) === typeString);
    return getUnitSymbol(sensor?.unit);
  };
  
  const unitTemperature = getUnit(SensorType.THERMOMETER);
  const unitHumidity = getUnit(SensorType.HYGROMETER);
  const unitWind = getUnit(SensorType.ANEMOMETER);
  const unitPrecipitation = getUnit(SensorType.PLUVIOMETER);
  const unitSolar = getUnit(SensorType.SOLARIMETER);

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
      {/* Gráfico de Linha para Temperatura */}
      <h3 className="font-semibold mb-2">Temperatura ({unitTemperature})</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#FF5733" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Linha para Umidade */}
      <h3 className="font-semibold mb-2">Umidade ({unitHumidity})</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="humidity" stroke="#337AFF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Gráfico de Linha para Velocidade do Vento */}
      <h3 className="font-semibold mb-2">Velocidade do Vento ({unitWind})</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="windSpeed" stroke="#C45A3C" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Linha para Radiação Solar */}
      <h3 className="font-semibold mb-2">Radiação Solar ({unitSolar})</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="solarRadiation" stroke="#FEE140" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Barras para Precipitação */}
      <h3 className="font-semibold mb-2">Precipitação ({unitPrecipitation})</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="precipitation" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}