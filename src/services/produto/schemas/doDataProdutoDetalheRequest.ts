import { z } from "zod";

export const DoDataProdutoDetalheSchema = z.object({
    proId: z.string()
})

export type DoDataProdutoDetalheRequest = z.infer<typeof DoDataProdutoDetalheSchema>;