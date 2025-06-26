// src/components/pages/admin/map-view/map-view-filters.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_TEXT } from "@/data/ui-content";
import { ArrowLeft, Layers, RefreshCw, SearchIcon } from "lucide-react";

export function MapViewFilters() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.ADMIN_LAYOUT.MAP_VIEW_LINK || "Visualização no Mapa"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.PLACES_PAGE.MAP_VIEW_DESCRIPTION ||
            "Visualização geográfica das estações meteorológicas."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 w-full sm:w-auto">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER || "Buscar..."}
            className="pl-8"
          />
        </div>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Layers className="h-4 w-4 mr-2" />
          Camadas
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
        <Button asChild size="sm" className="flex items-center gap-2">
          <a href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
}
