// src/schemas/log.ts

import { UI_MESSAGES } from '@/data/messages';
import { LogSeverity } from '@/types/log'; // Enum de Log
import { z } from 'zod';


export const logSchema = z.object({
  message: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  level: z.nativeEnum(LogSeverity, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(LogSeverity.INFO),

  // JSONField no Django -> object ou null no Zod
  metadata: z.record(z.string(), z.any()).optional().nullable(), // Para JSONField, um objeto de chave-valor.

  user: z.number().optional().nullable(), // User ID
  station: z.number().optional().nullable(), // Station ID
});
