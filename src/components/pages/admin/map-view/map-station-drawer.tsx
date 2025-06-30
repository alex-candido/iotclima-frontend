// src/components/pages/admin/map-view/map-station-drawer.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Station } from "@/types/station";
import {
  Battery,
  Calendar,
  Droplets,
  Signal,
  Thermometer,
  Wind,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Area,  AreaChart,  CartesianGrid,  Line,  LineChart,  ResponsiveContainer,  Tooltip,  XAxis,  YAxis,} from "recharts";

interface StationDrawerProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for charts
const temperatureHistory = [
  { time: "00:00", value: 18.5 },
  { time: "04:00", value: 16.2 },
  { time: "08:00", value: 22.1 },
  { time: "12:00", value: 28.4 },
  { time: "16:00", value: 31.2 },
  { time: "20:00", value: 25.8 },
];

const humidityHistory = [
  { time: "00:00", value: 78 },
  { time: "04:00", value: 82 },
  { time: "08:00", value: 65 },
  { time: "12:00", value: 45 },
  { time: "16:00", value: 38 },
  { time: "20:00", value: 55 },
];

const windHistory = [
  { time: "00:00", value: 8.2 },
  { time: "04:00", value: 5.1 },
  { time: "08:00", value: 12.4 },
  { time: "12:00", value: 18.7 },
  { time: "16:00", value: 22.3 },
  { time: "20:00", value: 15.6 },
];

export function MapStationDrawer({
  station,
  isOpen,
  onClose,
}: StationDrawerProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen || !station) return null;

  const isOnline = station.status === "ONLINE";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {station.name}
            <Badge variant={isOnline ? "default" : "destructive"}>
              {station.status}
            </Badge>
          </SheetTitle>
          <p className="text-muted-foreground">ID: {station.id}</p>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="sensors">Sensores</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Current Readings */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Temperatura
                    </CardTitle>
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {station.last_record?.temperature ?? "N/A"}°C
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isOnline ? "Atualizado há 2 min" : "Offline"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Umidade</CardTitle>
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {station.last_record?.humidity ?? "N/A"}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isOnline ? "Atualizado há 2 min" : "Offline"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vento</CardTitle>
                    <Wind className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {station.last_record?.wind_speed ?? "N/A"} km/h
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isOnline ? "Direção: NE" : "Offline"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pressão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {station.last_record?.pressure ?? "N/A"} hPa
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isOnline ? "Estável" : "Offline"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4" />
                      <span className="text-sm">Bateria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={station.battery_level ?? 0}
                        className="w-20"
                      />
                      <span className="text-sm font-medium">
                        {station.battery_level ?? "N/A"}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4" />
                      <span className="text-sm">Sinal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={station.signal_strength ?? 0}
                        className="w-20"
                      />
                      <span className="text-sm font-medium">
                        {station.signal_strength ?? "N/A"}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Última manutenção</span>
                    </div>
                    <span className="text-sm">
                      {station.last_maintenance_at ?? "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-6">
              <div className="grid gap-4">
                {station.sensors.map((sensor) => (
                  <Card key={sensor.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{sensor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {sensor.id}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={sensor.status === "ACTIVE" ? "default" : "destructive"}
                          >
                            {sensor.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Última leitura: {sensor.last_reading_at ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temperatura (Últimas 24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value}°C`, "Temperatura"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Umidade (Últimas 24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={humidityHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, "Umidade"]} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vento (Últimas 24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={windHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value} km/h`, "Vento"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#f59e0b"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
