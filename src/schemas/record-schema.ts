// src/schemas/record.ts

import { UI_MESSAGES } from '@/data/messages';
import { RecordStatus } from '@/types/record'; // Enum de Record
import { z } from 'zod';


export const recordSchema = z.object({
  recorded_at: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }), // ISO string
  temperature: z.number().optional().nullable(),
  humidity: z.number().optional().nullable(),
  wind_speed: z.number().optional().nullable(),
  wind_direction: z.number().optional().nullable(),
  pressure: z.number().optional().nullable(),
  rainfall: z.number().optional().nullable(),

  status: z.nativeEnum(RecordStatus, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(RecordStatus.ACTIVE),

  station: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }), // Station ID
});
