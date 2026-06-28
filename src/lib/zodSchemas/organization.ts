import { z } from "zod/v3";

export const organizationSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  cnpj: z.string().length(14, "CNPJ deve ter 14 dígitos"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres").max(100, "Cidade deve ter no máximo 100 caracteres"),
  logoUrl: z.string().url().optional(),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;
