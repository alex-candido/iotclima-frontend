// src/schemas/record-schema.ts

import { RecordStatus } from '@/types/record';
import { z } from "zod";

export const RecordStatusEnum = z.nativeEnum(RecordStatus);

export const getRecordStatusLabel = (status: RecordStatus | "all"): string => {
  if (status === "all") return "Todas";
  switch (status) {
    case RecordStatus.ACTIVE: return "Ativo";
    case RecordStatus.INACTIVE: return "Inativo";
    default: return String(status);
  }
};

export const baseRecordSchema = z.object({
  recorded_at: z.string().datetime({ message: "Data e hora da medição inválidas." }), 
  temperature: z.number().nullable().optional(),
  humidity: z.number().nullable().optional(),
  wind_speed: z.number().nullable().optional(),
  wind_direction: z.number().nullable().optional(), 
  pressure: z.number().nullable().optional(),
  rainfall: z.number().nullable().optional(),

  status: RecordStatusEnum, 

  station: z.number().int({ message: "ID da estação deve ser um número inteiro." }), 
});

export const createRecordSchema = baseRecordSchema.extend({
});

export const updateRecordSchema = baseRecordSchema.partial();


export const recordFilterSchema = z.object({
  search_term: z.string().optional(), 
  status: z.union([RecordStatusEnum, z.literal("all")]).optional().default("all"),
  station: z.number().int().optional(), 
  
  recorded_at__gte: z.string().datetime().optional(),
  recorded_at__lte: z.string().datetime().optional(),

  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});


export type CreateRecordFormData = z.infer<typeof createRecordSchema>;
export type UpdateRecordFormData = z.infer<typeof updateRecordSchema>;
export type RecordFilterFormData = z.infer<typeof recordFilterSchema>;
