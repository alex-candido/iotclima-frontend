"use client"

import { Card, CardContent } from "@/components/ui/card"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Fix para ícones do Leaflet no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

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

interface LeafletMapProps {
  stations: Station[]
  onStationClick: (station: Station) => void
}

export default function LeafletMap({ stations, onStationClick }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null)

  const getAlertColor = (alertLevel?: string) => {
    switch (alertLevel) {
      case "critical":
        return "#8b5cf6" // purple
      case "high":
        return "#ef4444" // red
      case "medium":
        return "#f97316" // orange
      case "low":
        return "#eab308" // yellow
      default:
        return "#22c55e" // green
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

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar o mapa
      mapRef.current = L.map("leaflet-map", {
        center: [-23.5505, -46.6333], // São Paulo como centro
        zoom: 11,
        zoomControl: true,
      })

      // Adicionar camada CARTO
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(mapRef.current)

      // Criar grupo de marcadores
      markersRef.current = L.layerGroup().addTo(mapRef.current)
    }

    // Limpar marcadores existentes
    if (markersRef.current) {
      markersRef.current.clearLayers()
    }

    // Adicionar marcadores para cada estação
    stations.forEach((station) => {
      const isOnline = station.status === "online"
      const alertColor = getAlertColor(station.alertLevel)

      // Criar ícone customizado baseado no status e alerta
      const customIcon = L.divIcon({
        className: "custom-weather-marker",
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110" 
                 style="background-color: ${alertColor}">
              <div class="w-3 h-3 rounded-full bg-white"></div>
              ${
                station.batteryLevel !== undefined && station.batteryLevel < 20
                  ? '<div class="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"><svg class="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 7a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zM4 12a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zM4 17a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd"></path></svg></div>'
                  : ""
              }
              ${
                station.alertLevel && station.alertLevel !== "none"
                  ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center"><svg class="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg></div>'
                  : ""
              }
            </div>
            ${
              isOnline
                ? `<div class="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping opacity-75" style="background-color: ${alertColor}"></div>`
                : ""
            }
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker([station.lat, station.lng], { icon: customIcon })

      // Popup detalhado
      const popupContent = `
        <div class="p-0 min-w-[300px]">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-sm">${station.name}</h3>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }">
                ${station.status}
              </span>
              ${
                station.alertLevel && station.alertLevel !== "none"
                  ? `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white border-0" style="background-color: ${alertColor}">
                      ${station.alertLevel}
                    </span>`
                  : ""
              }
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">ID:</span>
                <span class="font-mono text-xs">${station.id}</span>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <svg class="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span>Temp:</span>
                </div>
                <span class="font-medium">
                  ${station.temperature !== undefined ? `${station.temperature}°C` : "N/A"}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <svg class="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Umid:</span>
                </div>
                <span class="font-medium">
                  ${station.humidity !== undefined ? `${station.humidity}%` : "N/A"}
                </span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <svg class="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
                  </svg>
                  <span>Vento:</span>
                </div>
                <span class="font-medium">
                  ${station.windSpeed !== undefined ? `${station.windSpeed} km/h` : "N/A"}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <svg class="h-3 w-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                  <span>Bat:</span>
                </div>
                <span class="font-medium">
                  ${station.batteryLevel !== undefined ? `${station.batteryLevel}%` : "N/A"}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <svg class="h-3 w-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span>Atualiz:</span>
                </div>
                <span class="font-medium text-xs">${formatLastUpdate(station.lastUpdate)}</span>
              </div>
            </div>
          </div>

          ${
            station.region
              ? `<div class="mt-2 pt-2 border-t border-gray-200">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-gray-600">Região:</span>
                    <span class="font-medium capitalize">${station.region}</span>
                  </div>
                </div>`
              : ""
          }

          <div class="mt-3 pt-2 border-t border-gray-200">
            <p class="text-xs text-gray-500 text-center">Clique no marcador para ver detalhes completos</p>
          </div>
        </div>
      `

      marker.bindPopup(popupContent, {
        closeButton: true,
        offset: [0, -10],
        maxWidth: 350,
        className: "custom-popup",
      })

      // Eventos do marcador
      marker.on("mouseover", function () {
        this.openPopup()
        setHoveredStation(station)
      })

      marker.on("mouseout", function () {
        this.closePopup()
        setHoveredStation(null)
      })

      marker.on("click", () => {
        onStationClick(station)
      })

      // Adicionar marcador ao grupo
      if (markersRef.current) {
        markersRef.current.addLayer(marker)
      }
    })

    // Ajustar visualização para mostrar todas as estações
    if (stations.length > 0 && mapRef.current) {
      const group = new L.featureGroup(stations.map((station) => L.marker([station.lat, station.lng])))
      mapRef.current.fitBounds(group.getBounds().pad(0.1))
    }
  }, [stations, onStationClick])

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div id="leaflet-map" className="w-full h-full rounded-lg" />

      {/* Custom CSS for markers and popups */}
      {/* <style jsx global>{`
        .custom-weather-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 12px;
          line-height: 1.4;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
        }

        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(4px) !important;
        }
      `}</style> */}

      {/* No Results Overlay */}
      {stations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
          <Card className="p-6 text-center shadow-lg">
            <CardContent>
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nenhuma estação encontrada</h3>
              <p className="text-sm text-muted-foreground">Ajuste os filtros para ver as estações no mapa</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border z-[1000]">
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
    </div>
  )
}
