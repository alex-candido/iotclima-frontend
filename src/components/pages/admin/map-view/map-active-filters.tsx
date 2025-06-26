// src/components/pages/admin/map-view/map-active-filters.tsx

    //  {/* Active Filters Display */}
    //  {activeFiltersCount > 0 && (
    //   <Card>
    //     <CardContent className="p-4">
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center gap-2 flex-wrap">
    //           <span className="text-sm font-medium">Filtros ativos:</span>
    //           {filters.search && (
    //             <Badge variant="secondary" className="flex items-center gap-1">
    //               <Search className="h-3 w-3" />"{filters.search}"
    //               <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("search", "")} />
    //             </Badge>
    //           )}
    //           {filters.status.map((status) => (
    //             <Badge key={status} variant="secondary" className="flex items-center gap-1">
    //               Status: {status}
    //               <X
    //                 className="h-3 w-3 cursor-pointer"
    //                 onClick={() =>
    //                   updateFilter(
    //                     "status",
    //                     filters.status.filter((s) => s !== status),
    //                   )
    //                 }
    //               />
    //             </Badge>
    //           ))}
    //           {filters.regions.map((region) => (
    //             <Badge key={region} variant="secondary" className="flex items-center gap-1">
    //               <MapPin className="h-3 w-3" />
    //               {regions.find((r) => r.value === region)?.label}
    //               <X
    //                 className="h-3 w-3 cursor-pointer"
    //                 onClick={() =>
    //                   updateFilter(
    //                     "regions",
    //                     filters.regions.filter((r) => r !== region),
    //                   )
    //                 }
    //               />
    //             </Badge>
    //           ))}
    //           {filters.lastUpdate !== "all" && (
    //             <Badge variant="secondary" className="flex items-center gap-1">
    //               <Clock className="h-3 w-3" />
    //               {filters.lastUpdate === "1h" && "Última hora"}
    //               {filters.lastUpdate === "6h" && "Últimas 6h"}
    //               {filters.lastUpdate === "24h" && "Últimas 24h"}
    //               {filters.lastUpdate === "offline" && "Offline"}
    //               <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("lastUpdate", "all")} />
    //             </Badge>
    //           )}
    //         </div>
    //         <Button variant="ghost" size="sm" onClick={clearFilters}>
    //           Limpar todos
    //         </Button>
    //       </div>
    //     </CardContent>
    //   </Card>
    // )}

export function MapActiveFilters() {
  return (
    <div>MapActiveFilters</div>
  )
}