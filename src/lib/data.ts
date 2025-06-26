// Dados mockados para simular as APIs

export const stationsSummary = {
  total: 24,
  online: 21,
  offline: 3,
  regions: {
    norte: 6,
    sul: 5,
    leste: 7,
    oeste: 6,
  },
}

export const sensorsSummary = {
  total: 96,
  active: 92,
  inactive: 4,
  types: {
    temperatura: 24,
    umidade: 24,
    vento: 24,
    chuva: 24,
  },
}

export const eventsLatest = [
  {
    id: "evt-001",
    type: "Chuva Intensa",
    station: "Estação Centro",
    severity: "Alta",
    timestamp: "2024-06-04T14:30:00Z",
    description: "Precipitação acima de 50mm/h detectada",
  },
  {
    id: "evt-002",
    type: "Vento Forte",
    station: "Estação Norte",
    severity: "Média",
    timestamp: "2024-06-04T13:45:00Z",
    description: "Rajadas de vento superiores a 60 km/h",
  },
  {
    id: "evt-003",
    type: "Sensor Offline",
    station: "Estação Leste",
    severity: "Baixa",
    timestamp: "2024-06-04T12:15:00Z",
    description: "Sensor de umidade não responde",
  },
  {
    id: "evt-004",
    type: "Temp. Extrema",
    station: "Estação Sul",
    severity: "Média",
    timestamp: "2024-06-04T11:20:00Z",
    description: "Temperatura acima de 40°C registrada",
  },
  {
    id: "evt-005",
    type: "Bateria Baixa",
    station: "Estação Oeste",
    severity: "Baixa",
    timestamp: "2024-06-04T10:05:00Z",
    description: "Bateria abaixo de 20%",
  },
  {
    id: "evt-006",
    type: "Chuva Intensa",
    station: "Estação Parque",
    severity: "Alta",
    timestamp: "2024-06-04T09:30:00Z",
    description: "Precipitação acima de 45mm/h detectada",
  },
  {
    id: "evt-007",
    type: "Conexão Instável",
    station: "Estação Montanha",
    severity: "Média",
    timestamp: "2024-06-04T08:15:00Z",
    description: "Perda intermitente de conexão",
  },
  {
    id: "evt-008",
    type: "Umidade Crítica",
    station: "Estação Praia",
    severity: "Alta",
    timestamp: "2024-06-04T07:40:00Z",
    description: "Umidade abaixo de 15% detectada",
  },
  {
    id: "evt-009",
    type: "Manutenção",
    station: "Estação Aeroporto",
    severity: "Baixa",
    timestamp: "2024-06-04T06:20:00Z",
    description: "Manutenção preventiva agendada",
  },
  {
    id: "evt-010",
    type: "Temp. Extrema",
    station: "Estação Centro",
    severity: "Alta",
    timestamp: "2024-06-04T05:10:00Z",
    description: "Temperatura abaixo de 0°C registrada",
  },
]

export const recordsAggregates = {
  temperatureDaily: [
    { day: "Seg", value: 22.5 },
    { day: "Ter", value: 24.1 },
    { day: "Qua", value: 21.8 },
    { day: "Qui", value: 23.4 },
    { day: "Sex", value: 25.2 },
    { day: "Sáb", value: 26.8 },
    { day: "Dom", value: 24.9 },
  ],
  rainfallByStation: [
    { name: "Centro", value: 89.4 },
    { name: "Norte", value: 76.8 },
    { name: "Sul", value: 65.3 },
    { name: "Leste", value: 58.7 },
    { name: "Oeste", value: 42.1 },
    { name: "Parque", value: 37.9 },
  ],
  eventDistribution: [
    { name: "Chuva Intensa", value: 35, color: "#3b82f6" },
    { name: "Vento Forte", value: 28, color: "#10b981" },
    { name: "Temp. Extrema", value: 22, color: "#f59e0b" },
    { name: "Sensor Offline", value: 15, color: "#ef4444" },
  ],
  highlights: {
    highestRainfall: {
      station: "Centro",
      value: 89.4,
      unit: "mm",
    },
    highestWind: {
      station: "Norte",
      value: 76.2,
      unit: "km/h",
    },
    failingSensors: [
      { id: "TEMP-001", station: "Centro", lastReading: "2024-06-03T23:45:00Z" },
      { id: "HUM-007", station: "Norte", lastReading: "2024-06-04T01:30:00Z" },
      { id: "WIND-012", station: "Sul", lastReading: "2024-06-04T02:15:00Z" },
    ],
  },
}

export const stationsLocations = [
  { id: "est-001", name: "Estação Centro", lat: -23.5505, lng: -46.6333, status: "online" },
  { id: "est-002", name: "Estação Norte", lat: -23.5105, lng: -46.6233, status: "online" },
  { id: "est-003", name: "Estação Sul", lat: -23.5905, lng: -46.6433, status: "online" },
  { id: "est-004", name: "Estação Leste", lat: -23.5405, lng: -46.5933, status: "offline" },
  { id: "est-005", name: "Estação Oeste", lat: -23.5605, lng: -46.6733, status: "online" },
  { id: "est-006", name: "Estação Parque", lat: -23.5305, lng: -46.6633, status: "online" },
  { id: "est-007", name: "Estação Montanha", lat: -23.5705, lng: -46.6133, status: "online" },
  { id: "est-008", name: "Estação Praia", lat: -23.5805, lng: -46.5833, status: "offline" },
  { id: "est-009", name: "Estação Aeroporto", lat: -23.5205, lng: -46.7033, status: "online" },
  { id: "est-010", name: "Estação Industrial", lat: -23.5405, lng: -46.6533, status: "online" },
  { id: "est-011", name: "Estação Universitária", lat: -23.5605, lng: -46.6233, status: "online" },
  { id: "est-012", name: "Estação Residencial", lat: -23.5305, lng: -46.6433, status: "offline" },
]
