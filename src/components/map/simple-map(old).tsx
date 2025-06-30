"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Thermometer, Droplets, Wind, Battery, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Station {
  id: string
  name: string
  lat: number
  lng: number
  status: string
  batteryLevel?: number
  temperature?: number
  humidity?: number
  windSpeed?: number
  lastUpdate?: string
  region?: string
  alertLevel?: string
  activeSensors?: string[]
}

interface SimpleMapProps {
  stations: Station[]
  onStationClick: (station: Station) => void
}

export function SimpleMap({ stations, onStationClick }: SimpleMapProps) {
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 })
  const [zoom, setZoom] = useState(11)
  const mapRef = useRef<HTMLDivElement>(null)

  // Calculate bounds to fit all stations
  useEffect(() => {
    if (stations.length > 0) {
      const lats = stations.map((s) => s.lat)
      const lngs = stations.map((s) => s.lng)
      const minLat = Math.min(...lats)
      const maxLat = Math.max(...lats)
      const minLng = Math.min(...lngs)
      const maxLng = Math.max(...lngs)

      setMapCenter({
        lat: (minLat + maxLat) / 2,
        lng: (minLng + maxLng) / 2,
      })
    }
  }, [stations])

  // Convert lat/lng to pixel coordinates for display
  const getStationPosition = (station: Station) => {
    const mapWidth = 800
    const mapHeight = 600

    // Simple projection (not geographically accurate but works for demo)
    const latRange = 0.1 // Approximate range for São Paulo area
    const lngRange = 0.15

    const x = ((station.lng - (mapCenter.lng - lngRange / 2)) / lngRange) * mapWidth
    const y = ((mapCenter.lat + latRange / 2 - station.lat) / latRange) * mapHeight

    return {
      x: Math.max(20, Math.min(mapWidth - 20, x)),
      y: Math.max(20, Math.min(mapHeight - 20, y)),
    }
  }

  const getAlertColor = (alertLevel?: string) => {
    switch (alertLevel) {
      case "critical":
        return "bg-purple-500"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const getAlertBorder = (alertLevel?: string) => {
    switch (alertLevel) {
      case "critical":
        return "border-purple-300"
      case "high":
        return "border-red-300"
      case "medium":
        return "border-orange-300"
      case "low":
        return "border-yellow-300"
      default:
        return "border-green-300"
    }
  }

  const formatLastUpdate = (lastUpdate?: string) => {
    if (!lastUpdate) return "N/A"
    const diff = Date.now() - new Date(lastUpdate).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) return `${hours}h ${minutes}m atrás`
    return `${minutes}m atrás`
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-muted-foreground">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Região Metropolitana de São Paulo
        </h3>
        <p className="text-xs text-muted-foreground">Estações Meteorológicas IoT</p>
        <div className="text-xs text-muted-foreground mt-1">
          {stations.length} estações {stations.length !== 12 && "filtradas"}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm"
          onClick={() => setZoom(Math.min(zoom + 1, 15))}
        >
          +
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm"
          onClick={() => setZoom(Math.max(zoom - 1, 8))}
        >
          -
        </Button>
      </div>

      {/* Stations */}
      {stations.map((station) => {
        const position = getStationPosition(station)
        const isOnline = station.status === "online"
        const alertColor = getAlertColor(station.alertLevel)
        const alertBorder = getAlertBorder(station.alertLevel)

        return (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            onMouseEnter={() => setHoveredStation(station)}
            onMouseLeave={() => setHoveredStation(null)}
            onClick={() => onStationClick(station)}
          >
            {/* Station Marker */}
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${alertColor} ${alertBorder}`}
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>

                {/* Battery indicator */}
                {station.batteryLevel !== undefined && station.batteryLevel < 20 && (
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <Battery className="h-2 w-2 text-white" />
                  </div>
                )}

                {/* Alert indicator */}
                {station.alertLevel && station.alertLevel !== "none" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>

              {/* Pulse animation for online stations */}
              {isOnline && (
                <div
                  className={`absolute -top-1 -right-1 w-4 h-4 ${alertColor} rounded-full animate-ping opacity-75`}
                ></div>
              )}

              {/* Station Label */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium shadow-sm border whitespace-nowrap">
                {station.name.replace("Estação ", "")}
              </div>
            </div>

            {/* Hover Popup */}
            {hoveredStation?.id === station.id && (
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
                <Card className="w-80 shadow-lg border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">{station.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={isOnline ? "default" : "destructive"}>{station.status}</Badge>
                        {station.alertLevel && station.alertLevel !== "none" && (
                          <Badge variant="outline" className={`${alertColor} text-white border-0`}>
                            {station.alertLevel}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">ID:</span>
                          <span className="font-mono text-xs">{station.id}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-orange-500" />
                            <span>Temp:</span>
                          </div>
                          <span className="font-medium">
                            {station.temperature !== undefined ? `${station.temperature}°C` : "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Droplets className="h-3 w-3 text-blue-500" />
                            <span>Umid:</span>
                          </div>
                          <span className="font-medium">
                            {station.humidity !== undefined ? `${station.humidity}%` : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Wind className="h-3 w-3 text-green-500" />
                            <span>Vento:</span>
                          </div>
                          <span className="font-medium">
                            {station.windSpeed !== undefined ? `${station.windSpeed} km/h` : "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Battery className="h-3 w-3 text-gray-500" />
                            <span>Bat:</span>
                          </div>
                          <span className="font-medium">
                            {station.batteryLevel !== undefined ? `${station.batteryLevel}%` : "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>Atualiz:</span>
                          </div>
                          <span className="font-medium text-xs">{formatLastUpdate(station.lastUpdate)}</span>
                        </div>
                      </div>
                    </div>

                    {station.region && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Região:</span>
                          <span className="font-medium capitalize">{station.region}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <p className="text-xs text-muted-foreground text-center">Clique para ver detalhes completos</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )
      })}

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border">
        <div className="text-xs font-medium mb-2">Legenda</div>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Normal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Alerta Baixo</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">Alerta Médio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Alerta Alto</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Crítico</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-xs">Offline</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">{stations.length} estações exibidas</div>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm border">
        <div className="text-xs text-muted-foreground mb-1">Escala</div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-0.5 bg-gray-400"></div>
          <span className="text-xs">5 km</span>
        </div>
      </div>

      {/* No Results Message */}
      {stations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="p-6 text-center">
            <CardContent>
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nenhuma estação encontrada</h3>
              <p className="text-sm text-muted-foreground">Ajuste os filtros para ver as estações no mapa</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
