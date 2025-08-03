// src/components/maps/filter/weather-filter-tabs.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMap } from "@/providers/map-provider";

export function WeatherTabs() {
  const {
    activeWeatherFilter,
    setActiveWeatherFilter,
    toggleSearchCollapse,
    filterCounts,
  } = useMap();

  const weatherFilters = [
    { id: "all", label: "Todos", icon: "🌍", count: filterCounts.all },
    { id: "sunny", label: "Sol", icon: "☀️", count: filterCounts.sunny },
    { id: "cloudy", label: "Nublado", icon: "⛅", count: filterCounts.cloudy },
    { id: "rainy", label: "Chuva", icon: "️🌧️", count: filterCounts.rainy },
    { id: "windy", label: "Vento", icon: "💨", count: filterCounts.windy },
    { id: "stormy", label: "Tempestade", icon: "⛈️", count: filterCounts.stormy },
    { id: "foggy", label: "Nevoeiro", icon: "🌫️", count: filterCounts.foggy },
    { id: "snowy", label: "Neve", icon: "❄️", count: filterCounts.snowy },
  ];

  const handleTabClick = (filterId: string) => {
    setActiveWeatherFilter(filterId);
    toggleSearchCollapse();
  };

  return (
    <FloatingCard className="weather-filter-tabs p-2 w-full max-w-[calc(100vw-4rem)] sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-1">
          {weatherFilters.map((filter) => (
            <CarouselItem key={filter.id} className="basis-auto pl-1">
              <Button
                variant={activeWeatherFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleTabClick(filter.id)}
                className="relative h-8 px-3 whitespace-nowrap"
              >
                <span className="mr-1">{filter.icon}</span>
                <span className="hidden sm:inline">{filter.label}</span>
                {activeWeatherFilter === filter.id && (
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                    {filter.count}
                  </Badge>
                )}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </FloatingCard>
  );
}