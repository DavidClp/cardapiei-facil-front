import { z } from "zod";

export const ConfiguracaoEstabelecimentoSchema = z.object({
    cfg_id: z.number(),
    cfgt_id: z.number(),
    numero: z.string(),
    texto: z.string(),
})

export type ConfiguracaoEstabelecimentoResponse = z.infer<typeof ConfiguracaoEstabelecimentoSchema>;