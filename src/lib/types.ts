// Tipos baseados no diagrama conceitual

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "operator" | "viewer"
  createdAt: string
  updatedAt: string
}

export interface Place {
  id: string
  name: string
  description?: string
  address: string
  city: string
  state: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
  createdAt: string
  updatedAt: string
}

export interface Station {
  id: string
  name: string
  description?: string
  placeId: string
  place?: Place
  status: "online" | "offline" | "maintenance"
  model: string
  firmware: string
  installationDate: string
  lastMaintenance?: string
  nextMaintenance?: string
  batteryLevel?: number
  signalStrength?: number
  createdAt: string
  updatedAt: string
  sensors: any[]
  lat: number;
  lng: number;
}

export interface Sensor {
  id: string
  name: string
  type: "temperature" | "humidity" | "wind" | "pressure" | "rainfall"
  unit: string
  stationId: string
  station?: Station
  status: "active" | "inactive" | "error"
  minValue?: number
  maxValue?: number
  calibrationDate?: string
  createdAt: string
  updatedAt: string
}

export interface SensorData {
  id: string
  sensorId: string
  sensor?: Sensor
  value: number
  timestamp: string
  quality: "good" | "fair" | "poor"
  createdAt: string
}

export interface Record {
  id: string
  stationId: string
  station?: Station
  timestamp: string
  temperature?: number
  humidity?: number
  windSpeed?: number
  windDirection?: number
  pressure?: number
  rainfall?: number
  createdAt: string
}

export interface Event {
  id: string
  type: "alert" | "warning" | "info" | "error"
  category: "weather" | "sensor" | "system" | "maintenance"
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  stationId?: string
  station?: Station
  sensorId?: string
  sensor?: Sensor
  userId?: string
  user?: User
  status: "open" | "acknowledged" | "resolved"
  createdAt: string
  resolvedAt?: string
  resolvedBy?: string
}

export interface Log {
  id: string
  level: "debug" | "info" | "warn" | "error"
  message: string
  stationId?: string
  station?: Station
  userId?: string
  user?: User
  metadata?: Record<string, any>
  timestamp: string
  createdAt: string
}

// Relacionamentos
export interface UserPlace {
  userId: string
  placeId: string
  role: "owner" | "manager" | "viewer"
  createdAt: string
}

export interface UserStation {
  userId: string
  stationId: string
  role: "owner" | "manager" | "operator" | "viewer"
  createdAt: string
}

export interface UserEvent {
  userId: string
  eventId: string
  action: "created" | "acknowledged" | "resolved"
  createdAt: string
}

export interface UserSensor {
  userId: string
  sensorId: string
  role: "manager" | "operator" | "viewer"
  createdAt: string
}
