// src/schemas/event.ts

import { UI_MESSAGES } from '@/data/messages';
import { EventCategory, EventSeverity, EventStatus, EventType } from '@/types/event';
import { z } from 'zod';


export const eventSchema = z.object({
  title: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  description: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  occurred_at: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  resolved_at: z.string().optional().nullable(),

  type: z.nativeEnum(EventType, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  category: z.nativeEnum(EventCategory, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  severity: z.nativeEnum(EventSeverity, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  status: z.nativeEnum(EventStatus, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(EventStatus.OPEN),

  user: z.number().optional().nullable(),
  station_sensor: z.number().optional().nullable(),
});
