// src/schemas/station.ts

import { UI_MESSAGES } from '@/data/messages';
import { StationStatus } from '@/types/station'; // Enum de Station
import { z } from 'zod';


// Schema para o link StationSensor (aninhado)
export const stationSensorLinkSchema = z.object({
  sensor: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }), // Sensor ID
  position: z.string().optional().nullable(),
  installed_date: z.string().optional().nullable(), // ISO string
  removed_date: z.string().optional().nullable(),   // ISO string
  is_active: z.boolean().optional().default(true),
  calibrated_at: z.string().optional().nullable(), // ISO string
});


// Schema para o formulário de Station
export const stationSchema = z.object({
  name: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  description: z.string().optional().nullable(),
  model: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  firmware: z.string().optional().nullable(),

  installed_at: z.string().optional().nullable(), // ISO string
  last_maintenance_at: z.string().optional().nullable(), // ISO string
  next_maintenance_at: z.string().optional().nullable(), // ISO string

  battery_level: z.number().optional().nullable(),
  signal_strength: z.number().optional().nullable(),

  status: z.nativeEnum(StationStatus, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(StationStatus.ACTIVE),

  place: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }), // Place ID (required)
  user: z.number().optional().nullable(), // User ID

  // Para o Many-to-Many: lista de schemas aninhados
  sensors_data: z.array(stationSensorLinkSchema).optional(),
});
