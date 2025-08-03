// src/components/maps/search-box/sensor-charts-card.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    
    const getSensorValue = (type: SensorType) => {
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

  const chartItems = [
    { id: 'temperature', title: `Temperatura (${unitTemperature})`, component: LineChart, dataKey: 'temperature', stroke: '#FF5733', type: 'line' },
    { id: 'humidity', title: `Umidade (${unitHumidity})`, component: LineChart, dataKey: 'humidity', stroke: '#337AFF', type: 'line' },
    { id: 'wind', title: `Vento (${unitWind})`, component: LineChart, dataKey: 'windSpeed', stroke: '#C45A3C', type: 'line' },
    { id: 'solar', title: `Radiação Solar (${unitSolar})`, component: LineChart, dataKey: 'solarRadiation', stroke: '#FEE140', type: 'line' },
    { id: 'precipitation', title: `Precipitação (${unitPrecipitation})`, component: BarChart, dataKey: 'precipitation', fill: '#00C49F', type: 'bar' },
  ];

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold text-foreground mb-2">Dados Históricos</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-4">
          {chartItems.map(item => (
            <CarouselItem key={item.id} className="basis-full pl-4">
              <div className="min-h-[250px]">
                <h4 className="font-semibold mb-2 text-sm">{item.title}</h4>
                <ResponsiveContainer width="100%" height={200}>
                  {item.type === 'line' ? (
                    <LineChart data={data} margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey={item.dataKey} stroke={item.stroke} strokeWidth={2} dot={false} />
                    </LineChart>
                  ) : (
                    <BarChart data={data} margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey={item.dataKey} fill={item.fill} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
}