// src/schemas/log-schema.ts

import { LogSeverity } from '@/types/log'; // Importar LogSeverity enum
import { z } from "zod";

// Zod Enum para LogSeverity (baseado no enum numérico)
export const LogSeverityEnum = z.nativeEnum(LogSeverity);

export const getLogSeverityLabel = (severity: LogSeverity | "all"): string => {
  if (severity === "all") return "Todas";
  switch (severity) {
    case LogSeverity.DEBUG: return "Debug";
    case LogSeverity.INFO: return "Informação";
    case LogSeverity.WARN: return "Aviso";
    case LogSeverity.ERROR: return "Erro";
    default: return String(severity);
  }
};

export const baseLogSchema = z.object({
  id: z.number().int(),
  uuid: z.string().uuid(),
  message: z.string().max(1000, { message: "A mensagem não pode exceder 1000 caracteres." }),
  
  level: LogSeverityEnum,
  level_display: z.string(), 
  metadata: z.record(z.any()).nullable(), 

  user: z.number().int().optional().nullable(),
  user_username: z.string().optional().nullable(),

  station: z.number().int().optional().nullable(),
  station_name: z.string().optional().nullable(),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const logFilterSchema = z.object({
  search_term: z.string().optional(),
  level: z.union([LogSeverityEnum, z.literal("all")]).optional().default("all"), 
  user: z.number().int().optional(), 
  station: z.number().int().optional(), 
  
  created_at__gte: z.string().datetime().optional(),
  created_at__lte: z.string().datetime().optional(),

  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});


export type LogFormData = z.infer<typeof baseLogSchema>; 
export type LogFilterFormData = z.infer<typeof logFilterSchema>;
