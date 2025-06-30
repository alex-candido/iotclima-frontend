import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LeafletMapLegendProps {
  stationsCount: number;
  hasStations: boolean;
}

export const LeafletMapLegend = ({ stationsCount, hasStations }: LeafletMapLegendProps) => {
  return (
    <>
      {/* No Results Overlay */}
      {!hasStations && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg dark:bg-black">
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
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border z-[1000]
                  dark:bg-background dark:border-gray-700 dark:text-gray-100"> {/* Added dark mode styles */}
        <div className="text-xs font-medium mb-2">Legenda</div> {/* This will now inherit dark:text-gray-100 */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Normal</span> {/* This will now inherit dark:text-gray-100 */}
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
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t dark:border-gray-700"> {/* Added dark:border-gray-700 */}
          {stationsCount} estações exibidas
        </div>
      </div>
    </>
  );
};