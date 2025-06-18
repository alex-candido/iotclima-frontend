// src/schemas/sensor.ts

import { UI_MESSAGES } from '@/data/messages';
import { SensorStatus, SensorType, UnitType } from '@/types/sensor'; // Enums de Sensor
import { z } from 'zod';


export const sensorSchema = z.object({
  type: z.nativeEnum(SensorType, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  model: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  unit: z.nativeEnum(UnitType, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  min_value: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  max_value: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  status: z.nativeEnum(SensorStatus, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(SensorStatus.ACTIVE),

  user: z.number().optional().nullable(), // User ID
});
