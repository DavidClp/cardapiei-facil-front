import { z } from "zod";

export const HorarioAtendimentoSchema = z.object({
    id: z.number(),
    dia: z.string(),
    hor_abre: z.string(),
    hor_fecha: z.string(),
}).array()

export type HorarioAtendimentoResponse = z.infer<typeof HorarioAtendimentoSchema>;