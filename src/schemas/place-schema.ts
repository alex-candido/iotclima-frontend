// src/schemas/place.ts

import { PlaceStatus, PlaceType } from '@/types/place';
import { z } from "zod";

export const PlaceStatusEnum = z.nativeEnum(PlaceStatus);
export const PlaceTypeEnum = z.nativeEnum(PlaceType);

export const getPlaceStatusLabel = (status: PlaceStatus | "all"): string => {
  if (status === "all") return "Todas";
  switch (status) {
    case PlaceStatus.ACTIVE: return "Ativo";
    case PlaceStatus.INACTIVE: return "Inativo";
    default: return String(status);
  }
};

export const getPlaceTypeLabel = (type: PlaceType | "all"): string => {
  if (type === "all") return "Todos";
  switch (type) {
    case PlaceType.FARM: return "Fazenda";
    case PlaceType.CAMPUS: return "Campus";
    case PlaceType.CITY: return "Cidade";
    case PlaceType.RESERVE: return "Reserva";
    case PlaceType.OTHER: return "Outro";
    default: return String(type);
  }
};

export const GeoPointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number())
    .length(2, { message: "Coordenadas devem conter longitude e latitude." })
    .refine(coords => coords[0] >= -180 && coords[0] <= 180, { message: "Longitude deve ser entre -180 e 180." })
    .refine(coords => coords[1] >= -90 && coords[1] <= 90, { message: "Latitude deve ser entre -90 e 90." }),
});

export const placePropertiesSchema = z.object({
  uuid: z.string().uuid({ message: "UUID inválido." }),
  name: z.string()
    .min(3, { message: "O nome do local deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O nome do local não pode exceder 100 caracteres." }),
  description: z.string().max(500).optional().nullable(),
  address: z.string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." })
    .max(200, { message: "O endereço não pode exceder 200 caracteres." }),
  city: z.string()
    .min(2, { message: "A cidade deve ter pelo menos 2 caracteres." })
    .max(100, { message: "A cidade não pode exceder 100 caracteres." }),
  state: z.string()
    .min(2, { message: "O estado deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O estado não pode exceder 100 caracteres." }),
  country: z.string()
    .min(2, { message: "O país deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O país não pode exceder 100 caracteres." }),
  
  status_display: z.string().optional(),
  type_display: z.string().optional(),

  user: z.number().int().optional().nullable(),
  user_username: z.string().optional().nullable(),
  user_email: z.string().email().optional().nullable(),

  created_at: z.string(),
  updated_at: z.string(),

  status: PlaceStatusEnum.optional(),
  type: PlaceTypeEnum.optional(),
});

export const placeSchema = z.object({
  id: z.number().int(),
  type: z.literal("Feature"),
  geometry: GeoPointSchema,
  properties: placePropertiesSchema,
});

export const createPlaceSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome do local deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O nome do local não pode exceder 100 caracteres." }),
  description: z.string().max(500).optional().nullable(),
  address: z.string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." })
    .max(200, { message: "O endereço não pode exceder 200 caracteres." }),
  city: z.string()
    .min(2, { message: "A cidade deve ter pelo menos 2 caracteres." })
    .max(100, { message: "A cidade não pode exceder 100 caracteres." }),
  state: z.string()
    .min(2, { message: "O estado deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O estado não pode exceder 100 caracteres." }),
  country: z.string()
    .min(2, { message: "O país deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O país não pode exceder 100 caracteres." }),
  
  latitude: z.number({ invalid_type_error: "Latitude deve ser um número válido." })
    .min(-90, { message: "Latitude deve ser entre -90 e 90." })
    .max(90, { message: "Latitude deve ser entre -90 e 90." }),
  longitude: z.number({ invalid_type_error: "Longitude deve ser um número válido." })
    .min(-180, { message: "Longitude deve ser entre -180 e 180." })
    .max(180, { message: "Longitude deve ser entre -180 e 180." }),

  status: PlaceStatusEnum,
  type: PlaceTypeEnum,
  user: z.number().int().optional().nullable(),
});

export const updatePlaceSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  address: z.string().min(5).max(200).optional(),
  city: z.string().min(2).max(100).optional(),
  state: z.string().min(2).max(100).optional(),
  country: z.string().min(2).max(100).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: PlaceStatusEnum.optional(),
  type: PlaceTypeEnum.optional(),
  user: z.number().int().optional().nullable(),
});

export const placeFilterSchema = z.object({
  search_term: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  status: z.union([z.nativeEnum(PlaceStatus), z.literal("all")]).optional().default("all"),
  type: z.union([z.nativeEnum(PlaceType), z.literal("all")]).optional().default("all"),
  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});

export type CreatePlaceFormData = z.infer<typeof createPlaceSchema>;
export type UpdatePlaceFormData = z.infer<typeof updatePlaceSchema>;
export type PlaceFilterFormData = z.infer<typeof placeFilterSchema>;

export type PlaceStatusData = z.infer<typeof PlaceStatusEnum>;
export type PlaceTypeData = z.infer<typeof PlaceTypeEnum>;