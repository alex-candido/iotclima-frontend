// src/schemas/auth.ts

import { UI_MESSAGES } from '@/data/messages';
import { APP_TEXT } from '@/data/ui-content';
import { z } from 'zod';


export const signInSchema = z.object({
  email: z.string().email({ message: UI_MESSAGES.FORMS.INVALID_EMAIL }),
  password: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  rememberMe: z.boolean().optional()
});

export const signUpSchema = z.object({
  username: z.string().min(3, { message: APP_TEXT.AUTH_PAGES.SIGN_UP.USERNAME_TOO_SHORT || "Username must be at least 3 characters." }),
  email: z.string().email({ message: UI_MESSAGES.FORMS.INVALID_EMAIL }),
  password: z.string().min(8, { message: UI_MESSAGES.FORMS.PASSWORD_TOO_SHORT }),
  confirmPassword: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
  agreeTerms: z.boolean().refine(data => data === true, {
    message: APP_TEXT.AUTH_PAGES.SIGN_UP.AGREE_TERMS_REQUIRED || "You must agree to the terms of service.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: UI_MESSAGES.FORMS.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: UI_MESSAGES.FORMS.PASSWORD_TOO_SHORT }),
  confirmPassword: z.string().min(1, { message: UI_MESSAGES.FORMS.REQUIRED_FIELD }),
}).refine((data) => data.password === data.confirmPassword, {
  message: UI_MESSAGES.FORMS.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: UI_MESSAGES.FORMS.INVALID_EMAIL }),
});
