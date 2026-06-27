import { z } from "zod/v3";

export const memberSchema = z.object({
  managerEmail: z.string().email("E-mail do gerente inválido"),
  photoUrl: z.string().url().optional(),
});

export type MemberSchemaType = z.infer<typeof memberSchema>;
