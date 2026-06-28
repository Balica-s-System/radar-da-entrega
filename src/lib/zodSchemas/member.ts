import { z } from "zod/v3";

export const memberSchema = z.object({
  managerEmail: z.string().min(5, "E-mail deve ter no mínimo 5 caracteres").max(255, "E-mail deve ter no máximo 255 caracteres").email("E-mail do gerente inválido"),
  photoUrl: z.string().url().optional(),
});

export type MemberSchemaType = z.infer<typeof memberSchema>;
