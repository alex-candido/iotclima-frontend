// src/components/base/weather-info-card.tsx
"use client";

import { useMap } from "@/providers/map-provider";
import { Record } from "@/types/record";
import { WeatherCardData } from "@/types/weather";
import { format } from "date-fns";
import { ReactNode, useEffect } from "react";

interface WeatherInfoCardProps {
  data: WeatherCardData;
  latestRecord?: Record;
  children?: ReactNode;
}

export function PopUpWeatherCard({ data, latestRecord, children }: WeatherInfoCardProps) {
  const { animateWeatherCard, setAnimateWeatherCard } = useMap();

  useEffect(() => {
    if (latestRecord) {
      console.log('latestRecord updated:', latestRecord);
      setAnimateWeatherCard(true);
      const timer = setTimeout(() => {
        setAnimateWeatherCard(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [latestRecord, setAnimateWeatherCard]);
  
  const sensorReadingsToDisplay = latestRecord && Array.isArray(latestRecord.sensors)
  ? latestRecord.sensors.map(sensor => ({
      ...sensor,
      icon: data.sensorReadings.find(s => s.name === sensor.name)?.icon 
    }))
  : data.sensorReadings;

  const timestampToDisplay = latestRecord ? format(new Date(latestRecord.created_at), "HH:mm:ss") : data.timestamp;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-card">
      <div  className="flex justify-between items-center text-xs font-semibold text-muted-foreground h-[2.5rem]">
        <div>{data.locationName}</div>
        <p className="text-sm text-gray-500">{timestampToDisplay}</p>
      </div>

      <div className="flex items-center justify-start flex-grow text-foreground mb-3">
          <div className="flex-shrink-0 mr-3">
          <span className={`text-6xl leading-none ${animateWeatherCard ? 'animate-pulse-scale' : ''}`}>  
              {data.mainWeatherIcon}
            </span>
          </div>
          <div className="flex flex-col items-start">
          <span className="text-5xl font-extrabold leading-none">{data.mainTemperature}<span className="text-2xl align-top">°C</span></span>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{data.mainWeatherDescription}</span>
          </div>
      </div>

      <div className="grid grid-cols-4 gap-1 text-muted-foreground pt-3 border-t border-border">
          {sensorReadingsToDisplay.map((sensor, index) => (
            <div key={index} className="flex flex-col items-center">
              {sensor.icon && <sensor.icon className="h-4 w-4 mb-0.5" />}
              <span className="text-xs font-semibold whitespace-nowrap">
                {sensor.value} {sensor.unit}
              </span>
            </div>
          ))}
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
  );
}