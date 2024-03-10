import { z } from "zod";

export const DoDataCategoriasProdutoListSchema = z.object({
    estId: z.number()
})

export type DoDataCategoriasProdutoListRequest = z.infer<typeof DoDataCategoriasProdutoListSchema>;