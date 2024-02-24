import { z } from "zod";

export const ContatoSchema = z.object({
    id: z.number(),
    tipo: z.string(),
    contato: z.string()
}).array()

export type ContatoResponse = z.infer<typeof ContatoSchema>;