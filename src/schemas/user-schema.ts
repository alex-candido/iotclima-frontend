// src/schemas/user-schema.ts

import { z } from "zod";

// Definições para os diferentes roles (funções) de usuário que podem vir da API.
// Usar um enum Zod para garantir que os roles sejam válidos.
// Estas strings devem corresponder aos `group_names` retornados pela API do backend.
export const UserRoleEnum = z.enum([
  "ADMIN",
  "CUSTOMER",
  "EMPLOYEE",
  "MANAGER",
  "OPERATOR",
  "OWNER",
  "VIEWER",
]);

// Esquema base para os dados de entrada do usuário (comum para criação e edição)
export const baseUserSchema = z.object({
  username: z.string()
    .min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome de usuário não pode exceder 50 caracteres." }),
  first_name: z.string().max(150, { message: "O primeiro nome não pode exceder 150 caracteres." }).optional().nullable(),
  last_name: z.string().max(150, { message: "O sobrenome não pode exceder 150 caracteres." }).optional().nullable(),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

export const createUserSchema = baseUserSchema.extend({
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(128, { message: "A senha não pode exceder 128 caracteres." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

export const updateUserSchema = baseUserSchema.extend({
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(128, { message: "A senha não pode exceder 128 caracteres." })
    .optional(),
  roles: z.array(UserRoleEnum).optional(),
});

export const userFilterSchema = z.object({
  searchTerm: z.string().optional(),
  role: z.union([UserRoleEnum, z.literal("all")]).optional().default("all"),
  is_active: z.boolean().optional(),
  page: z.number().int().min(1).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(10),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UserFilterFormData = z.infer<typeof userFilterSchema>;
