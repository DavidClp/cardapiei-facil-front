import { z } from "zod";

export const doDataEstabelecimentoDetalheSchema = z.object({
    estUrl: z.string()
})

export type doDataEstabelecimentoDetalheRequest = z.infer<typeof doDataEstabelecimentoDetalheSchema>;