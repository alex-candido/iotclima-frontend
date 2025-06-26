// src/components/pages/admin/map-view/map-advanced-filters.tsx

// {/* <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
// <SheetTrigger asChild>
//   <Button variant="outline" size="sm" className="flex items-center gap-2">
//     <Filter className="h-4 w-4" />
//     Filtros
//     {activeFiltersCount > 0 && (
//       <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
//         {activeFiltersCount}
//       </Badge>
//     )}
//   </Button>
// </SheetTrigger>
// <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
//   <SheetHeader>
//     <SheetTitle>Filtros Avançados</SheetTitle>
//     <SheetDescription>Configure os filtros para personalizar a visualização do mapa</SheetDescription>
//   </SheetHeader>

//   <div className="space-y-6 mt-6">
//     {/* Status */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">Status da Estação</Label>
//       <div className="flex flex-wrap gap-2">
//         {["online", "offline"].map((status) => (
//           <div key={status} className="flex items-center space-x-2">
//             <Checkbox
//               id={`status-${status}`}
//               checked={filters.status.includes(status)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   updateFilter("status", [...filters.status, status])
//                 } else {
//                   updateFilter(
//                     "status",
//                     filters.status.filter((s) => s !== status),
//                   )
//                 }
//               }}
//             />
//             <Label htmlFor={`status-${status}`} className="capitalize">
//               {status}
//             </Label>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Regions */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">Regiões</Label>
//       <div className="grid grid-cols-2 gap-2">
//         {regions.map((region) => (
//           <div key={region.value} className="flex items-center space-x-2">
//             <Checkbox
//               id={`region-${region.value}`}
//               checked={filters.regions.includes(region.value)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   updateFilter("regions", [...filters.regions, region.value])
//                 } else {
//                   updateFilter(
//                     "regions",
//                     filters.regions.filter((r) => r !== region.value),
//                   )
//                 }
//               }}
//             />
//             <Label htmlFor={`region-${region.value}`}>{region.label}</Label>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Sensor Types */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">Tipos de Sensores</Label>
//       <div className="grid grid-cols-1 gap-2">
//         {sensorTypes.map((sensor) => (
//           <div key={sensor.value} className="flex items-center space-x-2">
//             <Checkbox
//               id={`sensor-${sensor.value}`}
//               checked={filters.sensorTypes.includes(sensor.value)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   updateFilter("sensorTypes", [...filters.sensorTypes, sensor.value])
//                 } else {
//                   updateFilter(
//                     "sensorTypes",
//                     filters.sensorTypes.filter((s) => s !== sensor.value),
//                   )
//                 }
//               }}
//             />
//             <Label htmlFor={`sensor-${sensor.value}`} className="flex items-center gap-2">
//               {sensor.icon && <sensor.icon className="h-4 w-4" />}
//               {sensor.label}
//             </Label>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Alert Levels */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">Nível de Alerta</Label>
//       <div className="grid grid-cols-1 gap-2">
//         {alertLevels.map((alert) => (
//           <div key={alert.value} className="flex items-center space-x-2">
//             <Checkbox
//               id={`alert-${alert.value}`}
//               checked={filters.alertLevel.includes(alert.value)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   updateFilter("alertLevel", [...filters.alertLevel, alert.value])
//                 } else {
//                   updateFilter(
//                     "alertLevel",
//                     filters.alertLevel.filter((a) => a !== alert.value),
//                   )
//                 }
//               }}
//             />
//             <Label htmlFor={`alert-${alert.value}`} className="flex items-center gap-2">
//               <div className={`w-3 h-3 rounded-full ${alert.color}`}></div>
//               {alert.label}
//             </Label>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Last Update */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">Última Atualização</Label>
//       <Select value={filters.lastUpdate} onValueChange={(value) => updateFilter("lastUpdate", value)}>
//         <SelectTrigger>
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">Todas</SelectItem>
//           <SelectItem value="1h">Última hora</SelectItem>
//           <SelectItem value="6h">Últimas 6 horas</SelectItem>
//           <SelectItem value="24h">Últimas 24 horas</SelectItem>
//           <SelectItem value="offline">Mais de 24h (Offline)</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>

//     {/* Battery Level */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">
//         Nível da Bateria ({filters.batteryLevel[0]}% - {filters.batteryLevel[1]}%)
//       </Label>
//       <Slider
//         value={filters.batteryLevel}
//         onValueChange={(value) => updateFilter("batteryLevel", value)}
//         max={100}
//         min={0}
//         step={5}
//         className="w-full"
//       />
//     </div>

//     {/* Temperature Range */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">
//         Temperatura ({filters.temperature[0]}°C - {filters.temperature[1]}°C)
//       </Label>
//       <Slider
//         value={filters.temperature}
//         onValueChange={(value) => updateFilter("temperature", value)}
//         max={50}
//         min={-10}
//         step={1}
//         className="w-full"
//       />
//     </div>

//     {/* Humidity Range */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">
//         Umidade ({filters.humidity[0]}% - {filters.humidity[1]}%)
//       </Label>
//       <Slider
//         value={filters.humidity}
//         onValueChange={(value) => updateFilter("humidity", value)}
//         max={100}
//         min={0}
//         step={5}
//         className="w-full"
//       />
//     </div>

//     {/* Wind Speed Range */}
//     <div className="space-y-3">
//       <Label className="text-sm font-medium">
//         Velocidade do Vento ({filters.windSpeed[0]} - {filters.windSpeed[1]} km/h)
//       </Label>
//       <Slider
//         value={filters.windSpeed}
//         onValueChange={(value) => updateFilter("windSpeed", value)}
//         max={100}
//         min={0}
//         step={5}
//         className="w-full"
//       />
//     </div>

//     {/* Clear Filters */}
//     <div className="pt-4 border-t">
//       <Button variant="outline" onClick={clearFilters} className="w-full">
//         <X className="h-4 w-4 mr-2" />
//         Limpar Todos os Filtros
//       </Button>
//     </div>
//   </div>
// </SheetContent>
// </Sheet> */}


export function MapAdvancedFilters() {
  return (
    <div>MapAdvancedFilters</div>
  )
}