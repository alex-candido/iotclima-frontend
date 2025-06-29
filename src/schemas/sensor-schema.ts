// src/schemas/sensor-schema.ts

import { SensorStatus, SensorType, UnitType } from '@/types/sensor';
import { z } from "zod";

export const SensorTypeEnum = z.nativeEnum(SensorType);
export const SensorStatusEnum = z.nativeEnum(SensorStatus);
export const UnitTypeEnum = z.nativeEnum(UnitType);

export const getSensorTypeLabel = (type: SensorType | "all"): string => {
  if (type === "all") return "Todos";
  switch (type) {
    case SensorType.TEMPERATURE: return "Temperatura";
    case SensorType.HUMIDITY: return "Umidade";
    case SensorType.WIND: return "Vento";
    case SensorType.PRESSURE: return "Pressão";
    case SensorType.RAINFALL: return "Chuva";
    case SensorType.OTHER: return "Outro";
    default: return String(type);
  }
};

export const getSensorStatusLabel = (status: SensorStatus | "all"): string => {
  if (status === "all") return "Todos";
  switch (status) {
    case SensorStatus.ACTIVE: return "Ativo";
    case SensorStatus.INACTIVE: return "Inativo";
    case SensorStatus.ERROR: return "Erro";
    default: return String(status);
  }
};

export const getUnitTypeLabel = (unit: UnitType | "all"): string => {
  if (unit === "all") return "Todas";
  switch (unit) {
    case UnitType.CELSIUS: return "Celsius (°C)";
    case UnitType.FAHRENHEIT: return "Fahrenheit (°F)";
    case UnitType.PERCENT: return "Porcentagem (%)";
    case UnitType.METERS_PER_SECOND: return "Metros/Segundo (m/s)";
    case UnitType.KILOMETERS_PER_HOUR: return "Km/Hora (km/h)";
    case UnitType.HECTOPASCAL: return "Hectopascal (hPa)";
    case UnitType.MILLIMETERS: return "Milímetros (mm)";
    case UnitType.OTHER: return "Outra";
    default: return String(unit);
  }
};

export const baseSensorSchema = z.object({
  type: SensorTypeEnum,
  model: z.string()
    .min(2, { message: "O modelo deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O modelo não pode exceder 100 caracteres." }),
  unit: UnitTypeEnum,
  min_value: z.number({ invalid_type_error: "Valor mínimo deve ser um número." }),
  max_value: z.number({ invalid_type_error: "Valor máximo deve ser um número." }),
  status: SensorStatusEnum.optional(),
  user: z.number().int().optional().nullable(),
});

export const createSensorSchema = baseSensorSchema.extend({
});

export const updateSensorSchema = baseSensorSchema.partial();


export const sensorFilterSchema = z.object({
  search_term: z.string().optional(),
  status: z.union([SensorStatusEnum, z.literal("all")]).optional().default("all"),
  type: z.union([SensorTypeEnum, z.literal("all")]).optional().default("all"),
  model: z.string().optional(),
  unit: z.union([UnitTypeEnum, z.literal("all")]).optional().default("all"),
  user: z.number().int().optional(),
  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});

export type CreateSensorFormData = z.infer<typeof createSensorSchema>;
export type UpdateSensorFormData = z.infer<typeof updateSensorSchema>;
export type SensorFilterFormData = z.infer<typeof sensorFilterSchema>;
