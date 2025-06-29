import { z } from "zod";

const CONFIG_ENV_SCHEMA = z.object({
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXT_PUBLIC_API_BASE_URL: z.string(),
})

export const env = CONFIG_ENV_SCHEMA.parse(process.env)

