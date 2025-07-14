// src/schemas/event-schema.ts

import { AppEventCategory, AppEventSeverity, AppEventStatus, AppEventType } from '@/types/app-event';
import { z } from "zod";

export const AppEventTypeEnum = z.nativeEnum(AppEventType);
export const AppEventCategoryEnum = z.nativeEnum(AppEventCategory);
export const AppEventSeverityEnum = z.nativeEnum(AppEventSeverity);
export const AppEventStatusEnum = z.nativeEnum(AppEventStatus);


export const getAppEventTypeLabel = (type: AppEventType | "all"): string => {
  if (type === "all") return "Todos";
  switch (type) {
    case AppEventType.ALERT: return "Alerta";
    case AppEventType.WARNING: return "Aviso";
    case AppEventType.INFO: return "Informação";
    case AppEventType.ERROR: return "Erro";
    default: return String(type);
  }
};

export const getAppEventCategoryLabel = (category: AppEventCategory | "all"): string => {
  if (category === "all") return "Todas";
  switch (category) {
    case AppEventCategory.WEATHER: return "Clima";
    case AppEventCategory.SENSOR: return "Sensor";
    case AppEventCategory.SYSTEM: return "Sistema";
    case AppEventCategory.MAINTENANCE: return "Manutenção";
    default: return String(category);
  }
};

export const getAppEventSeverityLabel = (severity: AppEventSeverity | "all"): string => {
  if (severity === "all") return "Todas";
  switch (severity) {
    case AppEventSeverity.LOW: return "Baixa";
    case AppEventSeverity.MEDIUM: return "Média";
    case AppEventSeverity.HIGH: return "Alta";
    case AppEventSeverity.CRITICAL: return "Crítica";
    case AppEventSeverity.WARN: return "Aviso"; 
    default: return String(severity);
  }
};

export const getAppEventStatusLabel = (status: AppEventStatus | "all"): string => {
  if (status === "all") return "Todos";
  switch (status) {
    case AppEventStatus.OPEN: return "Aberto";
    case AppEventStatus.ACKNOWLEDGED: return "Reconhecido";
    case AppEventStatus.RESOLVED: return "Resolvido";
    default: return String(status);
  }
};


export const baseEventSchema = z.object({
  title: z.string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O título não pode exceder 100 caracteres." }),
  description: z.string().max(500, { message: "A descrição não pode exceder 500 caracteres." }).optional().nullable(),
  
  occurred_at: z.string().datetime({ message: "Data e hora de ocorrência inválidas." }), // String ISO 8601
  resolved_at: z.string().datetime({ message: "Data e hora de resolução inválidas." }).optional().nullable(),

  type: AppEventTypeEnum,
  category: AppEventCategoryEnum,
  severity: AppEventSeverityEnum,
  status: AppEventStatusEnum.optional(), 

  user: z.number().int().optional().nullable(), 
  station_sensor: z.number().int().optional().nullable(), 
});


export const createEventSchema = baseEventSchema.extend({
  status: AppEventStatusEnum.default(AppEventStatus.OPEN), 
});

export const updateEventSchema = baseEventSchema.partial();


export const eventFilterSchema = z.object({
  search_term: z.string().optional(), 
  type: z.union([AppEventTypeEnum, z.literal("all")]).optional().default("all"),
  category: z.union([AppEventCategoryEnum, z.literal("all")]).optional().default("all"),
  severity: z.union([AppEventSeverityEnum, z.literal("all")]).optional().default("all"),
  status: z.union([AppEventStatusEnum, z.literal("all")]).optional().default("all"),
  user: z.number().int().optional(),
  station_sensor: z.number().int().optional(),
  
  occurred_at__gte: z.string().datetime().optional(),
  occurred_at__lte: z.string().datetime().optional(),
  resolved_at__gte: z.string().datetime().optional(),
  resolved_at__lte: z.string().datetime().optional(),

  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});


// Exportar tipos inferidos para uso em componentes e hooks
export type CreateEventFormData = z.infer<typeof createEventSchema>;
export type UpdateEventFormData = z.infer<typeof updateEventSchema>;
export type EventFilterFormData = z.infer<typeof eventFilterSchema>;
