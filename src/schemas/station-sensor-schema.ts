// src/schemas/station-sensor-schema.ts

import { SensorStatus, SensorType, UnitType } from '@/types/sensor';
import { z } from "zod";

export const SensorStatusEnum = z.nativeEnum(SensorStatus);
export const SensorTypeEnum = z.nativeEnum(SensorType);
export const UnitTypeEnum = z.nativeEnum(UnitType);


export const baseStationSensorSchema = z.object({
  station_id: z.number().int({ message: "ID da estação deve ser um número inteiro." }),
  sensor_id: z.number().int({ message: "ID do sensor deve ser um número inteiro." }),
  position: z.string().max(100, { message: "A posição não pode exceder 100 caracteres." }).optional().nullable(),
  installed_date: z.string().datetime({ message: "Data de instalação inválida." }).optional().nullable(),
  calibrated_at: z.string().datetime({ message: "Data de calibração inválida." }).optional().nullable(),
  is_active: z.boolean().optional(), 
  removed_date: z.string().datetime({ message: "Data de remoção inválida." }).optional().nullable(),
});

export const createStationSensorSchema = baseStationSensorSchema.extend({
  is_active: z.boolean().default(true), 
});

export const updateStationSensorSchema = baseStationSensorSchema.partial();


export const stationSensorFilterSchema = z.object({
  search_term: z.string().optional(),
  station_id: z.union([z.number().int(), z.literal("all")]).optional().default("all"), 
  sensor_id: z.union([z.number().int(), z.literal("all")]).optional().default("all"), 
  status: z.union([z.nativeEnum(SensorStatus), z.literal("all")]).optional().default("all"), 
  type: z.union([z.nativeEnum(SensorType), z.literal("all")]).optional().default("all"),   
  is_active: z.union([z.boolean(), z.literal("all")]).optional().default("all"),

  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});


export type CreateStationSensorFormData = z.infer<typeof createStationSensorSchema>;
export type UpdateStationSensorFormData = z.infer<typeof updateStationSensorSchema>;
export type StationSensorFilterFormData = z.infer<typeof stationSensorFilterSchema>;
