// src/components/maps/search-box/sensor-details-card.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getSensorTypeLabel, getStatusLabel, getUnitTypeLabel } from "@/lib/utils";
import { Sensor } from "@/types/sensor";
import { GaugeCircle, Info, Thermometer } from "lucide-react";

interface SensorDetailsCardProps {
  sensors: Sensor[] | undefined;
}

export function SensorDetailsCard({ sensors }: SensorDetailsCardProps) {
  if (!sensors || sensors.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-semibold text-foreground mb-2">Detalhes dos Sensores</h3>
        <p className="text-sm text-muted-foreground">Nenhum sensor encontrado para esta estação.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold text-foreground mb-2">Detalhes dos Sensores</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-4">
          {sensors.map(sensor => (
            <CarouselItem key={sensor.uuid} className="basis-auto pl-4">
              <div className="flex-shrink-0 h-full w-[280px] p-3 rounded-lg bg-background">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    {sensor.name}
                  </h4>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {getStatusLabel(sensor.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{sensor.description}</p>
                <div className="grid grid-cols-1 gap-2 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <GaugeCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Tipo:</span> {getSensorTypeLabel(sensor.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Unidade:</span> {getUnitTypeLabel(sensor.unit)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-foreground mt-2">
                  <p>
                    <span className="font-medium">Valor Mínimo:</span> {sensor.info.min_value}
                  </p>
                  <p>
                    <span className="font-medium">Valor Máximo:</span> {sensor.info.max_value}
                  </p>
                </div>
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