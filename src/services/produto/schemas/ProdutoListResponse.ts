import { z } from "zod";

export const ProdutoListSchema = z.object({
    id: z.number(),
    nome: z.string(),
    cat_id: z.number(),
    descricao: z.string(),
    valor: z.string().transform(Number),
    imagem: z.string()
})

export type ProdutoListResponse = z.infer<typeof ProdutoListSchema>;