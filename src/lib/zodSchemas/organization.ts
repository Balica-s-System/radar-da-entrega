import { z } from "zod/v3";

export const organizationSchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  city: z.string(),
  logoUrl: z.string().url().optional(),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;
