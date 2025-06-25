// src/schemas/station-schema.ts

import { z } from "zod";
import { StationStatus } from '@/types/station';

export const StationStatusEnum = z.nativeEnum(StationStatus);

export const getStationStatusLabel = (status: StationStatus | "all"): string => {
  if (status === "all") return "Todas";
  switch (status) {
    case StationStatus.ACTIVE: return "Ativa";
    case StationStatus.INACTIVE: return "Inativa";
    case StationStatus.ONLINE: return "Online";
    case StationStatus.OFFLINE: return "Offline";
    case StationStatus.MAINTENANCE: return "Manutenção";
    default: return String(status);
  }
};

export const baseStationSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome da estação deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O nome da estação não pode exceder 100 caracteres." }),
  description: z.string().max(500).optional().nullable(),
  model: z.string()
    .min(2, { message: "O modelo deve ter pelo menos 2 caracteres." })
    .max(50, { message: "O modelo não pode exceder 50 caracteres." }),
  firmware: z.string().max(50).optional().nullable(),
  
  installed_at: z.string().datetime({ message: "Data de instalação inválida." }).optional().nullable(),
  last_maintenance_at: z.string().datetime({ message: "Data de última manutenção inválida." }).optional().nullable(),
  next_maintenance_at: z.string().datetime({ message: "Data de próxima manutenção inválida." }).optional().nullable(),
  
  battery_level: z.number().min(0).max(100).optional().nullable(),
  signal_strength: z.number().min(0).max(100).optional().nullable(),

  status: StationStatusEnum,
  
  place: z.number().int({ message: "ID do local deve ser um número inteiro." }),
  user: z.number().int().optional().nullable(),
});

export const createStationSchema = baseStationSchema.extend({
});

export const updateStationSchema = baseStationSchema.partial();

export const stationFilterSchema = z.object({
  search_term: z.string().optional(),
  status: z.union([StationStatusEnum, z.literal("all")]).optional().default("all"),
  model: z.string().optional(),
  firmware: z.string().optional(),
  place: z.number().int().optional(),
  user: z.number().int().optional(),
  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});

export type CreateStationFormData = z.infer<typeof createStationSchema>;
export type UpdateStationFormData = z.infer<typeof updateStationSchema>;
export type StationFilterFormData = z.infer<typeof stationFilterSchema>;

export type StationStatusData = z.infer<typeof StationStatusEnum>;

