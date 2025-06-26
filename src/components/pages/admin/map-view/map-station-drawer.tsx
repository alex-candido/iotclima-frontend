// src/components/pages/admin/map-view/map-station-drawer.tsx

// "use client"

// import { useState } from "react"
// import { X, Thermometer, Droplets, Wind, Battery, Signal, Calendar, Settings, TrendingUp } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Progress } from "@/components/ui/progress"
// import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// interface Station {
//   id: string
//   name: string
//   lat: number
//   lng: number
//   status: string
// }

// interface StationDrawerProps {
//   station: Station | null
//   isOpen: boolean
//   onClose: () => void
// }

// // Dados mockados para os gráficos
// const temperatureHistory = [
//   { time: "00:00", value: 18.5 },
//   { time: "04:00", value: 16.2 },
//   { time: "08:00", value: 22.1 },
//   { time: "12:00", value: 28.4 },
//   { time: "16:00", value: 31.2 },
//   { time: "20:00", value: 25.8 },
// ]

// const humidityHistory = [
//   { time: "00:00", value: 78 },
//   { time: "04:00", value: 82 },
//   { time: "08:00", value: 65 },
//   { time: "12:00", value: 45 },
//   { time: "16:00", value: 38 },
//   { time: "20:00", value: 55 },
// ]

// const windHistory = [
//   { time: "00:00", value: 8.2 },
//   { time: "04:00", value: 5.1 },
//   { time: "08:00", value: 12.4 },
//   { time: "12:00", value: 18.7 },
//   { time: "16:00", value: 22.3 },
//   { time: "20:00", value: 15.6 },
// ]

// export function StationDrawer({ station, isOpen, onClose }: StationDrawerProps) {
//   const [activeTab, setActiveTab] = useState("overview")

//   if (!isOpen || !station) return null

//   const isOnline = station.status === "online"
//   const currentTemp = isOnline ? (Math.random() * 15 + 15).toFixed(1) : "N/A"
//   const currentHumidity = isOnline ? (Math.random() * 40 + 40).toFixed(0) : "N/A"
//   const currentWind = isOnline ? (Math.random() * 30 + 5).toFixed(1) : "N/A"
//   const currentPressure = isOnline ? (Math.random() * 50 + 1000).toFixed(1) : "N/A"
//   const batteryLevel = isOnline ? Math.floor(Math.random() * 40 + 60) : 0
//   const signalStrength = isOnline ? Math.floor(Math.random() * 30 + 70) : 0

//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

//       {/* Drawer */}
//       <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l shadow-xl z-50 overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div>
//             <h2 className="text-2xl font-bold flex items-center gap-2">
//               {station.name}
//               <Badge variant={isOnline ? "default" : "destructive"}>{station.status}</Badge>
//             </h2>
//             <p className="text-muted-foreground">ID: {station.id}</p>
//           </div>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-auto p-6">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="overview">Visão Geral</TabsTrigger>
//               <TabsTrigger value="sensors">Sensores</TabsTrigger>
//               <TabsTrigger value="history">Histórico</TabsTrigger>
//               <TabsTrigger value="config">Config</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-6">
//               {/* Current Readings */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
//                     <Thermometer className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{currentTemp}°C</div>
//                     <p className="text-xs text-muted-foreground">{isOnline ? "Atualizado há 2 min" : "Offline"}</p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Umidade</CardTitle>
//                     <Droplets className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{currentHumidity}%</div>
//                     <p className="text-xs text-muted-foreground">{isOnline ? "Atualizado há 2 min" : "Offline"}</p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Vento</CardTitle>
//                     <Wind className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{currentWind} km/h</div>
//                     <p className="text-xs text-muted-foreground">{isOnline ? "Direção: NE" : "Offline"}</p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Pressão</CardTitle>
//                     <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{currentPressure} hPa</div>
//                     <p className="text-xs text-muted-foreground">{isOnline ? "Estável" : "Offline"}</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* System Status */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Status do Sistema</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Battery className="h-4 w-4" />
//                       <span className="text-sm">Bateria</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Progress value={batteryLevel} className="w-20" />
//                       <span className="text-sm font-medium">{batteryLevel}%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Signal className="h-4 w-4" />
//                       <span className="text-sm">Sinal</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Progress value={signalStrength} className="w-20" />
//                       <span className="text-sm font-medium">{signalStrength}%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       <span className="text-sm">Última manutenção</span>
//                     </div>
//                     <span className="text-sm">15/05/2024</span>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Location Info */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Localização</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Latitude</p>
//                       <p className="font-medium">{station.lat}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Longitude</p>
//                       <p className="font-medium">{station.lng}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="sensors" className="space-y-6">
//               <div className="grid gap-4">
//                 {[
//                   { name: "Sensor de Temperatura", id: "TEMP-001", status: "online", lastReading: "2 min" },
//                   { name: "Sensor de Umidade", id: "HUM-001", status: "online", lastReading: "2 min" },
//                   { name: "Anemômetro", id: "WIND-001", status: "online", lastReading: "1 min" },
//                   {
//                     name: "Barômetro",
//                     id: "PRESS-001",
//                     status: isOnline ? "online" : "offline",
//                     lastReading: isOnline ? "3 min" : "2h",
//                   },
//                 ].map((sensor) => (
//                   <Card key={sensor.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="font-medium">{sensor.name}</h3>
//                           <p className="text-sm text-muted-foreground">{sensor.id}</p>
//                         </div>
//                         <div className="text-right">
//                           <Badge variant={sensor.status === "online" ? "default" : "destructive"}>
//                             {sensor.status}
//                           </Badge>
//                           <p className="text-xs text-muted-foreground mt-1">Última leitura: {sensor.lastReading}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="history" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Temperatura (Últimas 24h)</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={temperatureHistory}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis />
//                         <Tooltip formatter={(value) => [`${value}°C`, "Temperatura"]} />
//                         <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Umidade (Últimas 24h)</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={humidityHistory}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis />
//                         <Tooltip formatter={(value) => [`${value}%`, "Umidade"]} />
//                         <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Vento (Últimas 24h)</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={windHistory}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis />
//                         <Tooltip formatter={(value) => [`${value} km/h`, "Vento"]} />
//                         <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="config" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Informações do Dispositivo</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Modelo</p>
//                       <p className="font-medium">MeteoSense Pro X1</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Firmware</p>
//                       <p className="font-medium">v2.4.1</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Instalação</p>
//                       <p className="font-medium">12/03/2024</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Próxima manutenção</p>
//                       <p className="font-medium">15/08/2024</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Configurações de Coleta</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Intervalo de leitura</p>
//                       <p className="font-medium">5 minutos</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Transmissão</p>
//                       <p className="font-medium">10 minutos</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Modo de energia</p>
//                       <p className="font-medium">Otimizado</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Calibração</p>
//                       <p className="font-medium">Automática</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="flex gap-2">
//                 <Button className="flex-1">
//                   <Settings className="h-4 w-4 mr-2" />
//                   Configurar
//                 </Button>
//                 <Button variant="outline" className="flex-1">
//                   Calibrar Sensores
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </>
//   )
// }


export function MapStationDrawer() {
  return (
    <div>MapStationDrawer</div>
  )
}