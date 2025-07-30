// src/components/base/weather-info-card.tsx

"use client";

import { WeatherCardData } from "@/types/weather";
import { ReactNode } from "react";

interface WeatherInfoCardProps {
  data: WeatherCardData;
  children?: ReactNode;
}

export function WeatherInfoCard({ data, children }: WeatherInfoCardProps) {
  return (
    <div  className=" flex flex-col justify-between" style={{ minWidth: '190px' }}>
      <div  className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
        <div>{data.locationName}</div>
        <p className="text-sm text-gray-500">{data.timestamp}</p>
      </div>

      <div className="flex items-center justify-start flex-grow text-foreground mb-3">
          <div className="flex-shrink-0 mr-3">
            <span className="text-6xl leading-none">
              {data.mainWeatherIcon}
            </span>
          </div>
          <div className="flex flex-col items-start">
          <span className="text-5xl font-extrabold leading-none">{data.mainTemperature}°C</span>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{data.mainWeatherDescription}</span>
          </div>
      </div>

      <div className="grid grid-cols-4 gap-1 text-muted-foreground pt-3 border-t border-border">
          {data.sensorReadings.map((sensor, index) => (
            <div key={index} className="flex flex-col items-center">
              <sensor.icon className="h-4 w-4 mb-0.5" />
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