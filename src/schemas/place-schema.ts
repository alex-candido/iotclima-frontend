// src/schemas/place.ts

import { UI_MESSAGES } from '@/data/ui-content';
import { PlaceStatus, PlaceType } from '@/types/place'; // Enums de Place
import { z } from 'zod';

export const placeSchema = z.object({
  name: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  description: z.string().optional(), // TextField, blank=True, null=True
  address: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  city: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  state: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  country: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  
  latitude: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).refine(val => val !== null, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  longitude: z.number({ invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).refine(val => val !== null, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),

  status: z.nativeEnum(PlaceStatus, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(PlaceStatus.ACTIVE),
  type: z.nativeEnum(PlaceType, { invalid_type_error: UI_MESSAGES.FORMS.REQUIRED_FIELD }).default(PlaceType.OTHER),
  
  user: z.number().optional().nullable(), // user pode ser null
});