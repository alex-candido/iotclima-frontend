import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="absolute bottom-4 p-0 gap-0 left-4 z-[1000]">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-xs font-medium">Legenda</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-2">
            {/* Status das estações */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Ativa</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-xs">Inativa</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs">Offline</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Manutenção</span>
              </div>
            </div>

            {/* Severidade dos eventos */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Normal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Alerta Baixo</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs">Alerta Médio</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Alerta Alto</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs">Crítico</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs">Aviso</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3 !pt-2 border-t">
          <p className="text-xs text-muted-foreground">{stationsCount} estações exibidas</p>
        </CardFooter>
      </Card>
    </>
  );
};
